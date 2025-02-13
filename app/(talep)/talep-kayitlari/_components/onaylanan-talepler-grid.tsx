"use client";

import dayjs from "dayjs";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import type { ITalepKayit } from "@/types";
import { FetcherGet } from "@/utils";

interface IProps {
  pageSize?: number;
}

export default function OnaylananTaleplerGrid({ pageSize = 10 }: IProps) {
  const session = useSession();
  const [onaylananTalepler, setOnaylananTalepler] = useState<ITalepKayit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetcherGet(
          "/Talep/kisi-onaylanan-talepler",
          session.data?.token
        );
        setOnaylananTalepler(response);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    };
    fetchData();
  }, [session.data?.token]);

  return (
    <DataGrid
      dataSource={onaylananTalepler}
      noDataText="Şu anda onaylanan talep kaydı bulunmamaktadır."
    >
      <Paging defaultPageSize={pageSize} />
      <Pager allowedPageSizes="auto" displayMode="compact" visible={true} />

      <Column
        calculateCellValue={(data) =>
          dayjs(data.talep_Olusturulma_Tarihi).format("DD-MM-YYYY - HH:mm")
        }
        caption="Oluşturulma Tarihi"
        dataField="talep_Olusturulma_Tarihi"
        dataType="date"
      />
      <Column
        calculateCellValue={(data) =>
          dayjs(data.talep_Olusturulma_Tarihi).format("DD-MM-YYYY - HH:mm")
        }
        caption="Durum Tarihi"
        dataField="talep_Durum_Tarihi"
        dataType="date"
      />
      <Column caption="Talep Eden Ad" dataField="talep_Eden_Ad" />
      <Column caption="Talep Eden Soyad" dataField="talep_Eden_Soyad" />
      <Column
        calculateCellValue={(data) =>
          dayjs(data.talep_Olusturulma_Tarihi).format("DD-MM-YYYY - HH:mm")
        }
        caption="İmza Durum Tarih"
        dataField="imza_Durum_Tarih"
        dataType="date"
      />
      <Column caption="Talep Tipi" dataField="talep_Tipi" />
    </DataGrid>
  );
}
