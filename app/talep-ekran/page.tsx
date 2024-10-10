'use client';

import { talepDataGridConfig } from '@/configs/talep-data-grid-config';
import { Talep } from '@/types';
import { DataGrid } from 'devextreme-react';
import { Column, MasterDetail } from 'devextreme-react/cjs/data-grid';
import React, { useEffect, useState } from 'react'

export default function TalepEkranPage() {

  const [talepler, setTalepler] = useState<Talep[]>()

  useEffect(() => {
    const fetchData = async () => {
      const talepler = await fetch('https://localhost:7210/api/Talep').then((response) => {
        if (!response.ok) throw new Error('Network response was not ok')
        return response.json()
      });
      setTalepler(talepler);
      console.log("talepler: ", talepler);

    }

    fetchData();
  }, [])

  return (
    <div className='p-4'>
      <h1 className="text-3xl font-medium my-4">Talepler</h1>
      <DataGrid dataSource={talepler}
        {...talepDataGridConfig}
      >
        <MasterDetail enabled={true}
          component={({ data }) => {
            console.log("MasterDetail Data: ", data); // Add this line to inspect the data
            const detailData = data.data;
            return (
              <>
                {/* Conditional rendering based on rolAtama or rolCikarma */}
                {detailData.rolAtama ? (
                  <>
                    <h4 className="text-3xl font-semibold">Rol Atama</h4>
                    <DataGrid dataSource={[detailData.rolAtama]} showBorders={true}>
                      <Column dataField="rolAdi" caption="Rol Adı" />
                      <Column dataField="kisiAdi" caption="Kişi Adı" />
                      <Column dataField="rolBaslangicTarihi" caption="Rol Başlangıç Tarihi" dataType="date" />
                      <Column dataField="rolBitisTarihi" caption="Rol Bitiş Tarihi" dataType="date" />
                    </DataGrid>
                  </>
                ) : detailData.rolCikarma ? (
                  <>
                    <h4 className="text-3xl font-semibold">Rol Çıkarma</h4>
                    <DataGrid dataSource={[detailData.rolCikarma]} showBorders={true}>
                      <Column dataField="rolAdi" caption="Rol Adı" />
                      <Column dataField="kisiAdi" caption="Kişi Adı" />
                      <Column dataField="rolCikarmaTarihi" caption="Rol Çıkarma Tarihi" dataType="date" />
                    </DataGrid>
                  </>
                ) : (
                  <p className="text-xl font-light">No details available</p>
                )}
              </>
            )
          }} />
      </DataGrid>

    </div>
  )
}
