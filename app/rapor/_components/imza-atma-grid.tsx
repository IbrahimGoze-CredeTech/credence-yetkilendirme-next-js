import React from 'react'
import { DataGrid } from 'devextreme-react';
import { BarChartComp, ChartDataItem } from './bar-chart';


interface Props {
  data: ChartDataItem[];
}

export default function ImzaAtmaGrid({ data }: Props) {
  // console.log("data in imza atma grid: ", data);

  return (
    <>
      <div>
        <DataGrid dataSource={data}></DataGrid>
      </div><div className='mt-4'>
        <BarChartComp chartLabel={'En Çok Imza Atanlar'} chartDescription='En çok imza atan' data={data} quantityValue='imzaAtilanTalepSayısı' quantityLabel='Imza Sayısı' />
      </div>
    </>
  )
}
