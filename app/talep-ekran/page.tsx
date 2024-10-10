'use client';

import { talepDataGridConfig } from '@/configs/talep-data-grid-config';
import { Talep } from '@/types';
import { DataGrid } from 'devextreme-react';
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
    }

    fetchData();
  }, [])

  return (
    <div className='p-4'>
      <h1 className="text-3xl font-medium my-4">Talepler</h1>
      <DataGrid dataSource={talepler}
        {...talepDataGridConfig}
      />

    </div>
  )
}
