/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
"use client";
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  Pager, Paging, Scrolling
} from "devextreme-react/data-grid";
import { useEffect, useState } from "react";
import { KisiOzet } from "../../types";
import { roles, rollerAdi } from "../../modals/roller";
// import { yetkilerAdi } from "../../modals/yetkiler";
import { useModalContext } from "../../context";
import { useRouter } from "next/navigation";
import { fetcherGet } from "@/utils";
import { useSession } from "next-auth/react";

export default function KisiDataGrid() {
  const session = useSession();

  const modalContext = useModalContext();
  const router = useRouter();
  const [kisiOzet, setKisiOzet] = useState<KisiOzet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetcherGet(
        "/Kisi/ozet-bilgi",
        session.data?.token
      );
      setKisiOzet(response);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  ///-----

  const rolesFilterOperations = ["contains", "endswith", "=", "startswith"];
  function rolesToFilterItem(item: string) {
    return {
      text: item,
      value: item,
    };
  }
  const rolesHeaderFilter = {
    dataSource: {
      store: {
        type: "array",
        data: rollerAdi,
      },
      map: rolesToFilterItem,
    },
  };

  function calculateFilterExpression(
    this: any,
    filterValue: string,
    selectedFilterOperation: string | null = "="
  ) {
    const column = this;

    if (filterValue) {
      const selector = (data: KisiOzet) => {
        const applyOperation = (arg1: string, arg2: string, op: string) => {
          if (op === "=") return arg1 === arg2;
          if (op === "contains") return arg1.includes(arg2);
          if (op === "startswith") return arg1.startsWith(arg2);
          if (op === "endswith") return arg1.endsWith(arg2);
        };

        const values = column.calculateCellValue(data);
        return (
          values &&
          !!values.find((v: string) =>
            applyOperation(v, filterValue, selectedFilterOperation ?? "=")
          )
        );
      };
      return [selector, "=", true];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }

  return (
    <>
      <h1
        className="text-3xl font-medium my-4 cursor-pointer"
        onClick={() => router.push("/kisi-bilgileri")}
      >
        {" "}
        {/* Başlığa tıklanınca yönlendirme */}
        Kişi Bilgileri
      </h1>
      <DataGrid
        id="kisiOzet"
        keyExpr="id"
        dataSource={kisiOzet}
        showRowLines={true}
        showBorders={true}
        onRowClick={(e) => {
          modalContext.setId(e.data.id);
          modalContext.toggle();
        }}
      >
        <Scrolling rowRenderingMode='virtual'></Scrolling>
        <Paging defaultPageSize={6} />
        <Pager
          visible={true}
          allowedPageSizes={"auto"}
          displayMode={"compact"}
        />


        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <Column
          caption="Ad Soyad"
          calculateCellValue={(rowData) => `${rowData.ad} ${rowData.soyad}`}
          allowFiltering={true}
          allowHeaderFiltering={false}
        />
        <Column
          dataField="departman"
          caption="Departman"
          allowHeaderFiltering={false}
          allowFiltering={false}
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

        {/* <Column
          dataField="yetkiler"
          caption="Yetki"
          dataType="string"
          calculateFilterExpression={calculateFilterExpression}
          filterOperations={rolesFilterOperations}
          headerFilter={yetkilerHeaderFilter}
        ><HeaderFilter dataSource={yetkilerAdi} /></Column> */}
      </DataGrid>
    </>
  );
}
