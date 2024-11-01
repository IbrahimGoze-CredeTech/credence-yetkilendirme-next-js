'use client';

import { talepDataGridConfig } from '@/configs/talep-data-grid-config';
import { Talep } from '@/types';
import { fetcherGet } from '@/utils';
// import { DataGrid } from 'devextreme-react';
import DataGrid, { Pager, Paging, Scrolling } from 'devextreme-react/data-grid';
import { useSession } from 'next-auth/react';

import React, { useEffect, useState } from 'react'

export default function TalepEkranPage() {
  const session = useSession();
  // const [isRolAtama, setIsRolAtama] = useState<boolean>(false);

  const [talepler, setTalepler] = useState<Talep[]>()

  useEffect(() => {
    const fetchData = async () => {
      const talepler = await fetcherGet('/Talep', session.data?.token);
      // console.log("talepler: ", talepler);
      setTalepler(talepler);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // function onFieldDataChanged(e: any) {
  //   // console.log('called');
  //   console.log(e.value);
  //   if (e.value === 1) {
  //     // setIsRolAtama(true);
  //   }
  // }

  return (
    <div>
      <h1 className="text-3xl font-medium my-4">Geçmiş Talepler</h1>

      <DataGrid dataSource={talepler}
        {...talepDataGridConfig}
        className='overflow-hidden'
      >
        <Scrolling rowRenderingMode='virtual'></Scrolling>
        <Paging defaultPageSize={7} />
        <Pager
          visible={true}
          allowedPageSizes={"auto"}
          displayMode={"compact"}
        />
      </DataGrid>

    </div>
  )
}
