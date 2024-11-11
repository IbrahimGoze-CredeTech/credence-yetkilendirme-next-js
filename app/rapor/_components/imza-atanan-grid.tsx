import React from 'react'
import { DataGrid } from 'devextreme-react';
import { BarChartComp, ChartDataItem } from './bar-chart';

interface Props {
  data: ChartDataItem[];
}

export default function ImzaAtananGrid({ data }: Props) {
  // console.log("data in imza atanan grid: ", data);

  return (
    <>
      <div>
        <DataGrid dataSource={data}></DataGrid>
      </div>
      <div className='mt-4'>
        <BarChartComp chartLabel={'En Çok Imza Atananlar'} chartDescription='En çok imza atanan kişiler' data={data} quantityValue='imzaSayısı' quantityLabel='Imza Sayısı' />
      </div>
    </>
  )
}
