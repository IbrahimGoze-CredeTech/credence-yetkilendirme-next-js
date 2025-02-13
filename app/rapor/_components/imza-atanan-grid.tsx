import { DataGrid } from 'devextreme-react';
import React from 'react'
import { BarChartComp, type IBarChartData } from './bar-chart';

interface IProps {
  data: IBarChartData[];
}

export default function ImzaAtananGrid({ data }: IProps) {

  return (
    <>
      <div>
        <DataGrid dataSource={data} />
      </div>
      <div className='mt-4'>
        <BarChartComp chartDescription='En çok imza atanan kişiler' chartLabel="En Çok Imza Atananlar" data={data} quantityLabel='Imza Sayısı' quantityValue='imzaSayısı' />
      </div>
    </>
  )
}
