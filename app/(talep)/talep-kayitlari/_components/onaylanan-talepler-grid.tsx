"use client";

import { TalepKayit } from "@/types";
import { fetcherGet } from "@/utils";
import DataGrid, { Pager, Paging } from "devextreme-react/data-grid";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Props {
  pageSize?: number;
}

export default function OnaylananTaleplerGrid({ pageSize = 10 }: Props) {
  const session = useSession();
  const [onaylananTalepler, setOnaylananTalepler] = useState<TalepKayit[]>([]);

  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      try {
        const response = await fetcherGet(
          "/Talep/kisi-onaylanan-talepler",
          session.data?.token
        );
        console.log("Data: ", response);
        setOnaylananTalepler(response);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    };
    fetchData();
  }, [session.data?.token]);
  return (
    <DataGrid dataSource={onaylananTalepler}>

      <Paging defaultPageSize={pageSize} />
      <Pager visible={true} allowedPageSizes={"auto"} displayMode={"compact"} />
    </DataGrid>
  );
}
