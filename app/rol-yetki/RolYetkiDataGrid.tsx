"use client";

import DataGrid, { Column, FilterRow, HeaderFilter, Editing, Popup, Form } from "devextreme-react/data-grid";
import { useEffect, useState } from "react";
import { RolYetkiOzet } from "../../types";
import { yetkiler } from "../../modals/yetkiler"; // Yetkiler listesi
import { useModalContext } from "../../context";
import { RowClickEvent } from "devextreme/ui/data_grid";
import { Item } from "devextreme-react/form"; // Form item'larını eklemek için kullanacağız
import { TagBox } from "devextreme-react";

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
    console.log("e data: ", e.data);
  };

  // TagBox için yetki listesi (çoklu seçim)
  const renderYetkilerCell = (cellData: any) => {
    return (
      <TagBox
        items={yetkiler}
        displayExpr="yetkiAdi"
        valueExpr="yetkiId"
        value={cellData.value}
        onValueChanged={(e) => {
          cellData.setValue(e.value);
        }}
        selectAllMode="allPages"
        showSelectionControls={true}
        maxDisplayedTags={2}
      />
    );
  };

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
          allowHeaderFiltering={false}
          allowEditing={true}
        />

        {/* Yetkiler sütunu */}
        <Column
          dataField="yetkiler"
          caption="Yetki"
          dataType="object"
          allowHeaderFiltering={false}
          allowEditing={true}
          cellRender={renderYetkilerCell}
        />

        {/* Popup düzenleme ayarları */}
        <Editing
          mode="popup"
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
          useIcons={true}
        >
          <Popup title="Rol ve Yetki Düzenle" showTitle={true} width={700} height={400} />
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
                valueExpr: "yetkiId",
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
