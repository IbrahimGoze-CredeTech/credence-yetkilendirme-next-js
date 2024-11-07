import React from 'react'
import { DataGrid } from 'devextreme-react';
import { BarChartComp, ChartDataItem } from './bar-chart';

interface Props {
  data: ChartDataItem[];
}

export default function ImzaAtananGrid({ data }: Props) {
  return (
    <>
      <div>
        <DataGrid dataSource={data}></DataGrid>
      </div>
      <div>
        <BarChartComp data={data} quantityValue='imzaSayısı' quantityLabel='Imza Sayısı' />
      </div>
    </>
  )
}
