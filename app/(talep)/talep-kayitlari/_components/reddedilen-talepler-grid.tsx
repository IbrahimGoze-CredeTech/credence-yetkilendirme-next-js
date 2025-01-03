"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import { fetcherGet } from "@/utils";
import { TalepKayit } from "@/types";
import dayjs from "dayjs";
export default function ReddedilenTaleplerGrid() {
  const session = useSession();
  const [onaylananTalepler, setOnaylananTalepler] = useState<TalepKayit[]>([]);

  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      try {
        const response = await fetcherGet(
          "/Talep/kisi-reddedilen-talepler",
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
      noDataText="Şu anda reddedilen talep kaydı bulunmamaktadır."
    >
      <Paging defaultPageSize={10} />
      <Pager visible={true} allowedPageSizes={"auto"} displayMode={"compact"} />

      <Column
        dataField="talep_Olusturulma_Tarihi"
        caption="Oluşturulma Tarihi"
        dataType="date"
        calculateCellValue={(data) =>
          dayjs(data.talep_Olusturulma_Tarihi).format("DD-MM-YYYY - HH:mm")
        }
      />
      <Column
        dataField="talep_Durum_Tarihi"
        caption="Durum Tarihi"
        dataType="date"
        calculateCellValue={(data) =>
          dayjs(data.talep_Olusturulma_Tarihi).format("DD-MM-YYYY - HH:mm")
        }
      />
      <Column dataField="talep_Eden_Ad" caption="Talep Eden Ad" />
      <Column dataField="talep_Eden_Soyad" caption="Talep Eden Soyad" />
      <Column
        dataField="imza_Durum_Tarih"
        caption="İmza Durum Tarih"
        dataType="date"
        calculateCellValue={(data) =>
          dayjs(data.talep_Olusturulma_Tarihi).format("DD-MM-YYYY - HH:mm")
        }
      />
      <Column dataField="talep_Tipi" caption="Talep Tipi" />
    </DataGrid>
  );
}
