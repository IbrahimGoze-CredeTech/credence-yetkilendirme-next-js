"use client";

import DataGrid, { Column, FilterRow, HeaderFilter, Editing, Popup, Form } from "devextreme-react/data-grid";
import { useEffect, useState } from "react";
import { RolYetkiOzet } from "../../types";
import { yetkiler, yetkilerAdi } from "../../modals/yetkiler"; // Yetkiler listesi
import { useModalContext } from "../../context";
import { RowClickEvent } from "devextreme/ui/data_grid";
import { Item } from "devextreme-react/form"; // Form item'larını eklemek için kullanacağız
import { TagBox } from "devextreme-react";
import { roles, rollerAdi } from "@/modals/roller";

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

  function rolesToFilterItem(item: string) {
    // console.log('item: ', item);
    return {
      text: item,
      value: item
    };
  }
  function yetkilerToFilterItem(item: string) {

    return {
      text: item, // rollerin adını döndürüyoruz
      value: item     // rollerin id'sini döndürüyoruz
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
      map: yetkilerToFilterItem
    }
  };
  // Yetki hücresini formatlama fonksiyonu
  const formatYetkiler = (yetkilerArray: string[]) => {
    return yetkilerArray.join(', '); // Dizi elemanlarını virgülle birleştirir
  };

  // TagBox için yetki listesi (çoklu seçim)
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
        keyExpr="rolAdi"
        dataSource={rolYetki}
        showRowLines={true}
        showBorders={true}
        onRowClick={(e) => {
          // console.log('e: ', e.data);

          modalContext.setId(e.data.id);
          modalContext.toggle();
        }}
      >

        <FilterRow visible={true} />
        <HeaderFilter visible={true} />

        {/* Rol sütunu */}
        <Column
          dataField="rolAdi"
          caption="Rol"
          dataType="string"
          headerFilter={rolesHeaderFilter}
          calculateFilterExpression={calculateFilterExpression}
          filterOperations={rolesFilterOperations}
          allowEditing={true}
        >
          <HeaderFilter dataSource={roles} />
        </Column>

        {/* Yetkiler sütunu */}
        <Column
          dataField="yetkiler"
          caption="Yetki"
          dataType="string"
          allowEditing={true}
          calculateFilterExpression={calculateFilterExpression}
          filterOperations={rolesFilterOperations}
          headerFilter={yetkilerHeaderFilter}
        ><HeaderFilter dataSource={yetkilerAdi} /></Column>


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