import { DataGrid } from 'devextreme-react';
import React from 'react'

interface Props {
  data: unknown[];
}

export default function TalepYaratmaGrid({ data }: Props) {
  return (
    <div><DataGrid dataSource={data}></DataGrid></div>
  )
}
