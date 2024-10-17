import { RolAtamaGridType } from '@/actions/bekleyen-talepler'
import { DataGrid } from 'devextreme-react';
import React from 'react'

interface Props {
  data: RolAtamaGridType[];
}

export default function RolAtamaGrid({ data }: Props) {
  return (
    <DataGrid dataSource={data}></DataGrid>
  )
}
