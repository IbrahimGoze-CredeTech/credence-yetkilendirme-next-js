"use client";
import { TalepKayit } from "@/types";
import { fetcherGet } from "@/utils";
import { useSession } from "next-auth/react";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function YaratilanTaleplerGrid() {
  const session = useSession();
  const [onaylananTalepler, setOnaylananTalepler] = useState<TalepKayit[]>([]);

  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      try {
        const response = await fetcherGet(
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
      <Column dataField="talepEdenAd" caption="Talep Eden Ad" />
      <Column dataField="talepEdenSoyad" caption="Talep Eden Soyad" />
      <Column
        dataField="imza_Durum_Tarih"
        caption="İmza Durum Tarih"
        dataType="date"
        calculateCellValue={(data) =>
          dayjs(data.talep_Olusturulma_Tarihi).format("DD-MM-YYYY - HH:mm")
        }
      />
      <Column dataField="talepTipi" caption="Talep Tipi" />
    </DataGrid>
  );
}
