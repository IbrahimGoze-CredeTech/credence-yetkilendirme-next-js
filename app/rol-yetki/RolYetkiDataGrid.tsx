"use client";

import DataGrid, { Column, FilterRow, HeaderFilter, Editing, Popup, Form } from "devextreme-react/data-grid";
import { useEffect, useState } from "react";
import { RolYetkiOzet } from "../../types";
import { yetkiler } from "../../modals/yetkiler"; // Yetkiler listesi
import { useModalContext } from "../../context";
import { RowClickEvent } from "devextreme/ui/data_grid";
import { Item } from "devextreme-react/form"; // Form item'larını eklemek için kullanacağız
import { TagBox } from "devextreme-react";
import { roles } from "@/modals/roller";

export default function RolYetkiDataGrid() {
  const [rolYetki, setRolYetki] = useState<RolYetkiOzet[]>([]);
  const modalContext = useModalContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://192.168.30.90:98/api/Rol/ozet-rol-yetki").then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      });
      setRolYetki(response);
    };
    fetchData();
  }, []);

  const rolesFilterOperations = ["contains", "endswith", "=", "startswith"];

  const handleRowClick = (e: RowClickEvent<RolYetkiOzet>) => {
    modalContext.setId(e.data.id);
    modalContext.toggle();
    console.log('Seçili Rol:', e.data);
  };
  function rolesToFilterItem(item: { id: number; rolAdi: string }) {

    return {
      text: item.rolAdi, // rollerin adını döndürüyoruz
      value: item.id     // rollerin id'sini döndürüyoruz
    };
  }
  function yetkilerToFilterItem(item: { id: number; yetkiAdi: string }) {

    return {
      text: item.yetkiAdi, // rollerin adını döndürüyoruz
      value: item.id     // rollerin id'sini döndürüyoruz
    };
  }

  const rolesHeaderFilter = {
    dataSource: {
      store: {
        type: "array",
        data: roles
      },
      map: rolesToFilterItem
    }
  };
  const yetkilerHeaderFilter = {
    dataSource: {
      store: {
        type: "array",
        data: yetkiler
      },
      map: yetkilerToFilterItem
    }
  };
  // Yetki hücresini formatlama fonksiyonu
  const formatYetkiler = (yetkilerArray: string[]) => {
    return yetkilerArray.join(', '); // Dizi elemanlarını virgülle birleştirir
  };

  // TagBox için yetki listesi (çoklu seçim)

  return (
    <>
      <DataGrid
        id="rolYetki"
        keyExpr="rolAdi"
        dataSource={rolYetki}
        showRowLines={true}
        showBorders={true}
        onRowClick={handleRowClick}
      >

        <FilterRow visible={true} />
        <HeaderFilter visible={true} />

        {/* Rol sütunu */}
        <Column
          dataField="rolAdi"
          caption="Rol"
          dataType="string"

          allowEditing={true}
          headerFilter={rolesHeaderFilter}
        />

        {/* Yetkiler sütunu */}
        <Column
          dataField="yetkiler"
          caption="Yetki"
          allowHeaderFiltering={true}
          allowEditing={true}
          headerFilter={yetkilerHeaderFilter}

        />


        {/* Popup düzenleme ayarları */}
        <Editing
          mode="popup"
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
          useIcons={true}
        >
          <Popup title="Rol ve Yetki Düzenle" showTitle={true} width={800} height={500} />
          <Form>
            {/* Rol alanı */}
            <Item dataField="rolAdi" editorType="dxTextBox" />

            {/* Yetkiler alanı */}
            <Item
              dataField="yetkiler"
              editorType="dxTagBox"
              editorOptions={{
                items: yetkiler, // Yetki listesini buraya ekliyoruz
                displayExpr: "yetkiAdi",
                valueExpr: "yetkiAdi",
                selectAllMode: "allPages",
                showSelectionControls: true,
              }}
            />
          </Form>
        </Editing>
      </DataGrid>
    </>
  );
}