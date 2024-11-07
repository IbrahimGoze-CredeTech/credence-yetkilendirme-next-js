import React from 'react'
import { DataGrid } from 'devextreme-react';


interface Props {
  data: unknown[];
}

export default function ImzaAtmaGrid({ data }: Props) {
  return (
    <div><DataGrid dataSource={data}></DataGrid></div>
  )
}
