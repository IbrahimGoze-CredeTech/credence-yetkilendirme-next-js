"use client";
import DataGrid, { Column, FilterRow, HeaderFilter } from "devextreme-react/data-grid";
import { useEffect, useState } from "react";
import { RolYetki } from "../../types"; // KisiOzet tipi güncellenmeli
import { roles, rollerAdi } from "../../modals/roller";
import { yetkilerAdi } from "../../modals/yetkiler";
import { useModalContext } from "../../context";

export default function RolYetkiDataGrid() {
  const [rolYetki, setRolYetki] = useState<RolYetki[]>([]);
  const modalContext = useModalContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://192.168.30.90:98/api/Rol/rol-yetki").then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      });
      // console.log('rol-yetki: ', response);
      setRolYetki(response);
    };
    fetchData();
  }, []);

  const rolesFilterOperations = ["contains", "endswith", "=", "startswith"];
  function rolesToFilterItem(item: string) {
    return {
      text: item,
      value: item
    };
  }

  const rolesHeaderFilter = {
    dataSource: {
      store: {
        type: "array",
        data: rollerAdi
      },
      map: rolesToFilterItem
    }
  };

  const yetkilerHeaderFilter = {
    dataSource: {
      store: {
        type: "array",
        data: yetkilerAdi
      },
      map: rolesToFilterItem
    }
  };

  const handleRowClick = (e) => {

    modalContext.setId(e.data.id); // Seçilen satırın rol adını ayarlayın
    modalContext.toggle(); // Modalı aç
    console.log("e data: ", e.data);

  };

  // Rol ve Yetkileri formatlamak için yardımcı fonksiyon
  const formatRolYetkiData = (data) => {
    const formattedData = {};

    data.forEach(item => {
      const key = item.rolAdi; // Rol adı ile grupluyoruz

      if (!formattedData[key]) {
        formattedData[key] = {
          rolId: item.rolId,
          rolAdi: item.rolAdi,
          yetkiAdi: [item.yetkiAdi], // Yetki adı dizisi
          eylemlerTuruId: item.eylemlerTuruId
        };
      } else {
        // Eğer rol zaten varsa, yalnızca o rol için yetkileri ekliyoruz
        if (!formattedData[key].yetkiAdi.includes(item.yetkiAdi)) {
          formattedData[key].yetkiAdi.push(item.yetkiAdi); // Var olan rol için yetkileri ekliyoruz
        }
      }
    });

    // Tekrar eden rollerden kurtulup virgüllü yetkileri oluşturuyoruz
    return Object.values(formattedData).map(item => ({
      rolId: item.rolId, // ID'leri kaybetmeden aynen tutuyoruz
      rolAdi: item.rolAdi,
      yetkiAdi: item.yetkiAdi.join(', '), // Virgülle ayırıyoruz
      eylemlerTuruId: item.eylemlerTuruId
    }));
  };

  // Örnek veri ile çağırma
  const formattedRolYetki = formatRolYetkiData(rolYetki);
  console.log(formattedRolYetki);


  return (
    <>
      <DataGrid
        id="rolYetki"
        keyExpr="rolAdi" // Anahtar olarak rolAdını kullan
        dataSource={formattedRolYetki} // Formatlanmış veriyi kullan
        showRowLines={true}
        showBorders={true}
        onRowClick={handleRowClick} // Satıra tıklandığında bilgileri al
        editing={{
          allowAdding: true,
          allowUpdating: true,
          allowDeleting: true,
          mode: "popup",
        }}
      >
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <Column dataField="rolId" visible={false} />

        <Column dataField="rolAdi" caption="Rol" dataType="string"
          headerFilter={rolesHeaderFilter}
          filterOperations={rolesFilterOperations}
        />
        <Column
          dataField="yetkiAdi"
          caption="Yetki"
          dataType="string"
          filterOperations={rolesFilterOperations}
          headerFilter={yetkilerHeaderFilter}
        />
        <Column
          dataField="eylemlerTuruId"
          caption="Eylem Türü"
          dataType="string"
        />
      </DataGrid>

      {/* Detayların gösterileceği modal burada açılacak */}
      {/* Modal içeriğini burada ayarlayın */}
      {/* Örnek bir modal yapısını entegre edebilirsiniz */}
    </>
  );
}
