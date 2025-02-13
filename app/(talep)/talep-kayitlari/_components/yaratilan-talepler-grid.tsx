"use client";
import dayjs from "dayjs";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import type { ITalepKayit } from "@/types";
import { FetcherGet } from "@/utils";

export default function YaratilanTaleplerGrid() {
  const session = useSession();
  const [onaylananTalepler, setOnaylananTalepler] = useState<ITalepKayit[]>([]);

  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      try {
        const response = await FetcherGet(
          "/Talep/kisi-yaratilan-talepler",
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
      noDataText="Şu anda yaratılan talep kaydı bulunmamaktadır."
    >
      <Paging defaultPageSize={10} />
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
      <Column caption="Talep Eden Ad" dataField="talepEdenAd" />
      <Column caption="Talep Eden Soyad" dataField="talepEdenSoyad" />
      <Column
        calculateCellValue={(data) =>
          dayjs(data.talep_Olusturulma_Tarihi).format("DD-MM-YYYY - HH:mm")
        }
        caption="İmza Durum Tarih"
        dataField="imza_Durum_Tarih"
        dataType="date"
      />
      <Column caption="Talep Tipi" dataField="talepTipi" />
    </DataGrid>
  );
}
