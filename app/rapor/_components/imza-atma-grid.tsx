import { DataGrid } from 'devextreme-react';
import React from 'react'
import { BarChartComp, type IBarChartData } from './bar-chart';
// import { BarChartComp } from './bar-chart';


interface IProps {
  data: IBarChartData[];
}

export default function ImzaAtmaGrid({ data }: IProps) {

  return (
    <>
      <div>
        <DataGrid dataSource={data} />
      </div><div className='mt-4'>
        <BarChartComp chartDescription='En çok imza atan' chartLabel="En Çok Imza Atanlar" data={data} quantityLabel='Imza Sayısı' quantityValue='imzaAtilanTalepSayısı' />
      </div>
    </>
  )
}
