/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
"use client";

import DataGrid, { Column, FilterRow, HeaderFilter } from "devextreme-react/data-grid";
import { useEffect, useState } from "react";
import { RolYetkiOzet } from "../../types";
import { yetkilerAdi } from "../../modals/yetkiler"; // Yetkiler listesi
import { useModalContext, useStaticTablesContext } from "../../context";


import { roles } from "@/modals/roller";
import { fetcherGet } from "@/utils";
import { useSession } from "next-auth/react";

export default function RolYetkiDataGrid() {
  const session = useSession();
  const [rolYetki, setRolYetki] = useState<RolYetkiOzet[]>([]);
  const modalContext = useModalContext();
  const staticTablesContext = useStaticTablesContext();

  const rolNames = staticTablesContext.roller.map(rol => rol.rolAdi);
  const yetkiNames = staticTablesContext.yetkiler.map(yetki => yetki.yetkiAdi);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetcherGet('/Rol/ozet-rol-yetki', session.data?.token);
      setRolYetki(response);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rolesFilterOperations = ["contains", "endswith", "=", "startswith"];

  function rolesToFilterItem(item: string) {
    //console.log('item: ', item);
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
        data: rolNames
      },
      map: rolesToFilterItem
    }
  };
  const yetkilerHeaderFilter = {
    dataSource: {
      store: {
        type: "array",
        data: yetkiNames
      },
      map: yetkilerToFilterItem
    }
  };
  // Yetki hücresini formatlama fonksiyonu


  // TagBox için yetki listesi (çoklu seçim)
  function calculateFilterExpression(this: any, filterValue: string, selectedFilterOperation: string | null = '=') {
    const column = this;

    if (filterValue) {
      const selector = (data: RolYetkiOzet) => {
        const applyOperation = (arg1: string, arg2: string, op: string) => {
          if (op === "=") return arg1 === arg2;
          if (op === "contains") return arg1.includes(arg2);
          if (op === "startswith") return arg1.startsWith(arg2);
          if (op === "endswith") return arg1.endsWith(arg2);
        };

        // values'i kontrol ederek, dizi değilse bir diziye çeviriyoruz
        const values = column.calculateCellValue(data);
        if (!Array.isArray(values)) {
          return applyOperation(values, filterValue, selectedFilterOperation ?? '=');
        }

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
          console.log('e: ', e.data);

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
          allowEditing={false}
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


        {/* Popup düzenleme ayarları 
        <Editing
          mode="popup"
          allowAdding={false}
          allowUpdating={true}
          allowDeleting={true}
          useIcons={true}
        >
          <Popup title="Rol ve Yetki Düzenle" showTitle={true} width={800} height={500} />
          <Form>
            */}
        {/* Rol alanı
        <Item dataField="rolAdi" editorType="dxTextBox" />

          */}
        {/* Yetkiler alanı
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
    </Editing >
            */}
      </DataGrid >
    </>
  );
}