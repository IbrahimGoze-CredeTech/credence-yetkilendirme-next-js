'use client';

import { talepDataGridConfig } from '@/configs/talep-data-grid-config';
import { Talep } from '@/types';
// import { DataGrid } from 'devextreme-react';
import DataGrid, { Column, Editing, MasterDetail, Form, Popup } from 'devextreme-react/cjs/data-grid';
import { Item } from 'devextreme-react/form';
import Link from 'next/link';

import React, { useEffect, useState } from 'react'

export default function TalepEkranPage() {
  const [isRolAtama, setIsRolAtama] = useState<boolean>(false);

  const [talepler, setTalepler] = useState<Talep[]>()

  useEffect(() => {
    const fetchData = async () => {
      const talepler = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Talep`).then((response) => {
        if (!response.ok) throw new Error('Network response was not ok')
        return response.json()
      });
      console.log("talepler: ", talepler);
      setTalepler(talepler);

    }

    fetchData();
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onFieldDataChanged(e: any) {
    // console.log('called');
    console.log(e.value);
    if (e.value === 1) {
      setIsRolAtama(true);
    }
  }

  return (
    <div className='p-4'>
      <h1 className="text-3xl font-medium my-4">Talepler</h1>
      <Link href="/talep-ekran/talep-yarat">Talep Yarat</Link>
      <DataGrid dataSource={talepler}
        {...talepDataGridConfig}
      >
        <Editing
          mode="popup"
          allowAdding={true}
          // allowUpdating={true}
          allowDeleting={true}>
          <Popup title="Talep Yarat" showTitle={true} width={700} height={525} />
          <Form >
            <Item dataField="talepTipiId" editorType="dxSelectBox"
              editorOptions={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onValueChanged: (e: any) => onFieldDataChanged(e)
              }}
            />
            {isRolAtama && (
              <Item dataField="rolAtama"
              />
            )
            }
          </Form>
        </Editing>
        <MasterDetail enabled={true}
          component={({ data }) => {
            console.log("MasterDetail Data: ", data); // Add this line to inspect the data
            const detailData = data.data;
            return (
              <>
                <h4 className="text-3xl font-semibold">Imzalar</h4>
                <DataGrid dataSource={detailData.imza} showBorders={true}>
                  <Column dataField="durumTarihi" caption="Imza Tarihi" dataType="date" />
                  <Column dataField="kisiAdi" caption="Imza Veren" />
                  <Column dataField="durum" caption="Imza Durumu" />
                </DataGrid>

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
