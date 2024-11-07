import { DataGrid } from 'devextreme-react';
import React from 'react'
import { BarChartComp, ChartDataItem } from './bar-chart';

interface Props {
  data: ChartDataItem[];
}

export default function TalepYaratmaGrid({ data }: Props) {
  return (
    <>
      <div>
        <DataGrid dataSource={data}></DataGrid>
      </div>
      <div>
        <BarChartComp data={data} quantityValue='yaratılanTalepSayısı' quantityLabel='Yaratılan Talep Sayısı' />
      </div>
    </>
  )
}
