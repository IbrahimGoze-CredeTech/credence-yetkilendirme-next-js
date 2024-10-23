'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import DataGrid, { Pager, Paging } from 'devextreme-react/data-grid';
import { fetcherGet } from '@/utils';
import { TalepKayit } from '@/types';

export default function ReddedilenTaleplerGrid() {
  const session = useSession();
  const [onaylananTalepler, setOnaylananTalepler] = useState<TalepKayit[]>([]);


  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      try {
        const response = await fetcherGet("/Talep/kisi-reddedilen-talepler", session.data?.token)
        console.log("Data: ", response)
        setOnaylananTalepler(response)
      } catch (error) {
        console.error("Failed to fetch data: ", error)
      }
    }
    fetchData();
  }, [session.data?.token])
  return (
    <DataGrid dataSource={onaylananTalepler}>
      <Paging defaultPageSize={10} />
      <Pager
        visible={true}
        allowedPageSizes={"auto"}
        displayMode={"compact"}
      />
    </DataGrid>
  )
}
