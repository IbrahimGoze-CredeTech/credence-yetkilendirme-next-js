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
      <div className='mt-4'>
        <BarChartComp chartLabel={'En Çok Talep Yaratanlar'} chartDescription='En çok talep yaratan kişiler (rol atama, rol çıkarma ve yetki atama toplamları.' data={data} quantityValue='yaratılanTalepSayısı' quantityLabel='Yaratılan Talep Sayısı' />
      </div>
    </>
  )
}
