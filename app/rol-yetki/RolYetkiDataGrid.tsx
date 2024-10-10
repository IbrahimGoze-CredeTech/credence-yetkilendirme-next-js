"use client";

import DataGrid, { Column, FilterRow, HeaderFilter } from "devextreme-react/data-grid";
import { useEffect, useState } from "react";
import { RolYetkiOzet } from "../../types"; // KisiOzet tipi güncellenmeli
import { yetkilerAdi } from "../../modals/yetkiler";
import { useModalContext } from "../../context";
import { RowClickEvent } from "devextreme/ui/data_grid";

export default function RolYetkiDataGrid() {
  const [rolYetki, setRolYetki] = useState<RolYetkiOzet[]>([]);
  const modalContext = useModalContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://192.168.30.90:98/api/Rol/ozet-rol-yetki").then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      });
      console.log('rol-yetki: ', response);
      setRolYetki(response);
    };
    fetchData();
  }, []);

  const rolesFilterOperations = ["contains", "endswith", "=", "startswith"];
  function rolesToFilterItem(item: string) {
    console.log('item: ', item);

    return {
      text: item,
      value: item
    };
  }

  const yetkilerHeaderFilter = {
    dataSource: {
      store: {
        type: "array",
        // data: yetkilerAdi
        data: yetkilerAdi
      },
      map: rolesToFilterItem
    }
  };

  const handleRowClick = (e: RowClickEvent<RolYetkiOzet>) => {

    modalContext.setId(e.data.id); // Seçilen satırın rol adını ayarlayın
    modalContext.toggle(); // Modalı aç
    console.log("e data: ", e.data);

  };

  function calculateFilterExpression(filterValue: string, selectedFilterOperation: string | null = '=') {
    const column = this;

    if (filterValue) {
      const selector = (data: RolYetkiOzet) => {
        const applyOperation = (arg1: string, arg2: string, op: string) => {
          if (op === "=") return arg1 === arg2;
          if (op === "contains") return arg1.includes(arg2);
          if (op === "startswith") return arg1.startsWith(arg2);
          if (op === "endswith") return arg1.endsWith(arg2);
        };

        // console.log('v: ', v);
        const values = column.calculateCellValue(data);
        return (
          values &&
          !!values.find((v: string) => applyOperation(v, filterValue, selectedFilterOperation ?? '='))
        );
      };
      return [selector, "=", true];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }


  return (
    <>
      <DataGrid
        id="rolYetki"
        keyExpr="rolAdi" // Anahtar olarak rolAdını kullan
        dataSource={rolYetki} // Formatlanmış veriyi kullan
        showRowLines={true}
        showBorders={true}
        onRowClick={handleRowClick} // Satıra tıklandığında bilgileri al
        editing={{
          allowAdding: true,
          allowUpdating: true,
          allowDeleting: true,
          mode: "row",
        }}
      >
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />

        <Column dataField="rolAdi" caption="Rol" dataType="string"
          // headerFilter={rolesHeaderFilter}
          // filterOperations={rolesFilterOperations}
          allowHeaderFiltering={false}
        />
        <Column
          dataField="yetkiler"
          caption="Yetki"
          dataType="string"
          filterOperations={rolesFilterOperations}
          headerFilter={yetkilerHeaderFilter}
          calculateFilterExpression={calculateFilterExpression}
          allowEditing={false}
        />
        {/* <Column
          dataField="eylemlerTuruId"
          caption="Eylem Türü"
          dataType="string"
        /> */}
      </DataGrid>

      {/* Detayların gösterileceği modal burada açılacak */}
      {/* Modal içeriğini burada ayarlayın */}
      {/* Örnek bir modal yapısını entegre edebilirsiniz */}
    </>
  );
}
