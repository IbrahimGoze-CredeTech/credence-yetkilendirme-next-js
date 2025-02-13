import { DataGrid } from 'devextreme-react';
import React from 'react'
import { BarChartComp, type IBarChartData } from './bar-chart';

interface IProps {
  data: IBarChartData[];
}

export default function TalepYaratmaGrid({ data }: IProps) {
  return (
    <>
      <div>
        <DataGrid dataSource={data} />
      </div>
      <div className='mt-4'>
        <BarChartComp chartDescription='En çok talep yaratan kişiler (rol atama, rol çıkarma ve yetki atama toplamları.' chartLabel="En Çok Talep Yaratanlar" data={data} quantityLabel='Yaratılan Talep Sayısı' quantityValue='yaratılanTalepSayısı' />
      </div>
    </>
  )
}
