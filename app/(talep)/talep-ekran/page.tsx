'use client';

import DataGrid, { Column, Editing, Form, MasterDetail, Popup } from 'devextreme-react/cjs/data-grid';
import { Item } from 'devextreme-react/form';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { talepDataGridConfig } from '@/configs/talep-data-grid-config';
import type { TalepType } from '@/types';
import { FetcherGet } from '@/utils';



export default function TalepEkranPage() {
  const session = useSession();
  const [isRolAtama, setIsRolAtama] = useState<boolean>(false);
  const [talepler, setTalepler] = useState<TalepType[]>()

  useEffect(() => {

    const fetchData = async () => {
      const taleplerResponse = await FetcherGet('/Talep', session.data?.token);
      setTalepler(taleplerResponse);
    }

    fetchData();
  }, [session.data?.token])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onFieldDataChanged(e: any) {
    if (e.value === 1) {
      setIsRolAtama(true);
    }
  }

  return (
    <div className='p-4'>
      <h1 className="text-3xl font-medium my-4">Talepler</h1>


      <DataGrid dataSource={talepler}
        {...talepDataGridConfig}
      >
        <Editing
          allowAdding={true}
          allowDeleting={true}
          mode="popup"
        >
          <Popup height={525} showTitle={true} title="Talep Yarat" width={700} />
          <Form >
            <Item dataField="talepTipiId" editorOptions={{
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onValueChanged: (e: any) => onFieldDataChanged(e)
            }}
              editorType="dxSelectBox"
            />
            {isRolAtama && (
              <Item dataField="rolAtama"
              />
            )
            }
          </Form>
        </Editing>
        <MasterDetail component={({ data }) => {
          const detailData = data.data;
          return (
            <>
              <h4 className="text-3xl font-semibold">Imzalar</h4>
              <DataGrid dataSource={detailData.imza} showBorders={true}>
                <Column caption="Imza Tarihi" dataField="durumTarihi" dataType="date" format="dd.MM.yyyy" />
                <Column caption="Imza Veren" dataField="kisiAdi" />
                <Column caption="Imza Durumu" dataField="durum" />
              </DataGrid>

              {/* Conditional rendering based on rolAtama or rolCikarma */}
              {detailData.rolAtama ? (
                <>
                  <h4 className="text-3xl font-semibold">Rol Atama</h4>
                  <DataGrid dataSource={[detailData.rolAtama]} showBorders={true}>
                    <Column caption="Rol Adı" dataField="rolAdi" />
                    <Column caption="Kişi Adı" dataField="kisiAdi" />
                    <Column caption="Rol Başlangıç Tarihi" dataField="rolBaslangicTarihi" dataType="date" format="dd.MM.yyyy" />
                    <Column caption="Rol Bitiş Tarihi" dataField="rolBitisTarihi" dataType="date" format="dd.MM.yyyy" />
                  </DataGrid>
                </>
              ) : detailData.rolCikarma ? (
                <>
                  <h4 className="text-3xl font-semibold">Rol Çıkarma</h4>
                  <DataGrid dataSource={[detailData.rolCikarma]} showBorders={true}>
                    <Column caption="Rol Adı" dataField="rolAdi" />
                    <Column caption="Kişi Adı" dataField="kisiAdi" />
                    <Column caption="Rol Çıkarma Tarihi" dataField="rolCikarmaTarihi" dataType="date" format="dd.MM.yyyy" />
                  </DataGrid>
                </>
              ) : (
                <p className="text-xl font-light">No details available</p>
              )}
            </>
          )
        }}
          enabled={true} />
      </DataGrid>

    </div>
  )
}
