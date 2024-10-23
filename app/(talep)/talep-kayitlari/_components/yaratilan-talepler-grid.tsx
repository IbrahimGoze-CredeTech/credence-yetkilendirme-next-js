'use client';

import { fetcherGet } from '@/utils';
import { useSession } from 'next-auth/react';
import DataGrid, { Pager, Paging } from 'devextreme-react/data-grid';
import React, { useEffect, useState } from 'react'


export default function YaratilanTaleplerGrid() {
  const session = useSession();
  const [onaylananTalepler, setOnaylananTalepler] = useState<[]>([]);

  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      try {
        const response = await fetcherGet("/Talep/kisi-yaratilan-talepler", session.data?.token)
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
