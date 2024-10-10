"use client";
import DataGrid, { Column, FilterRow, HeaderFilter } from "devextreme-react/data-grid";
import { useEffect, useState } from "react";
import { KisiOzet } from "../types";
import { roles } from "../modals/roller";
import { yetkilerAdi } from "../modals/yetkiler";
import { useModalContext } from "../context";

export default function SummaryDataGrid() {
  const [kisiOzet, setKisiOzet] = useState<KisiOzet[]>([])
  const modalContext = useModalContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://192.168.30.90:98/api/Kisi/ozet-bilgi").then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      // const data = response;
      console.log('kisiOzet: ', response);
      setKisiOzet(response)
    }
    fetchData();
  }, [])

  ///-----

  const rolesFilterOperations = ["contains", "endswith", "=", "startswith"];
  function rolesToFilterItem(item: string) {
    // console.log('item: ', item);
    return {
      text: item,
      value: item
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
        data: yetkilerAdi
      },
      map: rolesToFilterItem
    }
  };
  function calculateFilterExpression(filterValue: string, selectedFilterOperation: string | null = '=') {
    const column = this;

    if (filterValue) {
      const selector = (data: KisiOzet) => {
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
        id="kisiOzet"
        keyExpr="id"
        dataSource={kisiOzet}
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

        <Column
          dataField="ad"
          caption="Ad"
          allowHeaderFiltering={false} />
        <Column
          dataField="soyad"
          caption="Soyad"
          allowHeaderFiltering={false} />
        <Column
          dataField="departman"
          caption="Departman"
          allowHeaderFiltering={false}
        />
        <Column
          dataField="roller"
          caption="Rol"
          dataType="string"
          headerFilter={rolesHeaderFilter}
          calculateFilterExpression={calculateFilterExpression}
          filterOperations={rolesFilterOperations}
        >
          <HeaderFilter dataSource={roles} />
        </Column>

        <Column
          dataField="yetkiler"
          caption="Yetki"
          dataType="string"
          calculateFilterExpression={calculateFilterExpression}
          filterOperations={rolesFilterOperations}
          headerFilter={yetkilerHeaderFilter}
        ><HeaderFilter dataSource={yetkilerAdi} /></Column>

      </DataGrid>
    </>
  )
}
