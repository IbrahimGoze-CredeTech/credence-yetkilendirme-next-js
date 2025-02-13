/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */

"use client";
import DataGrid, { Column, FilterRow, HeaderFilter } from "devextreme-react/data-grid";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FetcherGet } from "@/utils";
import { useModalContext } from "../context";
import { roles, rollerAdi } from "../modals/roller";
import { yetkilerAdi } from "../modals/yetkiler";
import type { KisiOzetType } from "../types";


export default function KisiDataGrid() {
  const session = useSession();
  const modalContext = useModalContext();
  const router = useRouter();

  const [kisiOzet, setKisiOzet] = useState<KisiOzetType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await FetcherGet('/Kisi/ozet-bilgi', session.data?.token);
      setKisiOzet(response)
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // /-----

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
  function calculateFilterExpression(this: any, filterValue: string, selectedFilterOperation: string | null = '=') {
    const column = this;

    if (filterValue) {
      const selector = (data: KisiOzetType) => {
        const applyOperation = (arg1: string, arg2: string, op: string) => {
          if (op === "=") return arg1 === arg2;
          if (op === "contains") return arg1.includes(arg2);
          if (op === "startswith") return arg1.startsWith(arg2);
          if (op === "endswith") return arg1.endsWith(arg2);
        };

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
      <h1 className="text-3xl font-medium my-4">Kişi Bilgileri</h1>
      <DataGrid
        dataSource={kisiOzet}
        id="kisiOzet"
        keyExpr="id"
        onRowClick={(e) => {

          modalContext.setId(e.data.id);
          // modalContext.toggle();
          router.push("/kisi-bilgileri/kisi");
        }}
        showBorders={true}
        showRowLines={true}
      >
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />

        <Column
          allowHeaderFiltering={false}
          caption="Ad"
          dataField="ad" />
        <Column
          allowHeaderFiltering={false}
          caption="Soyad"
          dataField="soyad" />
        <Column
          allowHeaderFiltering={false}
          caption="Departman"
          dataField="departman"
        />
        <Column
          calculateFilterExpression={calculateFilterExpression}
          caption="Rol"
          dataField="roller"
          dataType="string"
          filterOperations={rolesFilterOperations}
          headerFilter={rolesHeaderFilter}
        >
          <HeaderFilter dataSource={roles} />
        </Column>

        <Column
          calculateFilterExpression={calculateFilterExpression}
          caption="Yetki"
          dataField="yetkiler"
          dataType="string"
          filterOperations={rolesFilterOperations}
          headerFilter={yetkilerHeaderFilter}
        ><HeaderFilter dataSource={yetkilerAdi} /></Column>

      </DataGrid>
    </>
  )
}
