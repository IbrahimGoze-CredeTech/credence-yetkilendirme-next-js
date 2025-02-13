import type { KisiYetkiView } from '@prisma/client'
import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter } from 'devextreme-react/cjs/data-grid'
import React from 'react'

interface IKisiYetkiViewGridProps {
  kisiYetkiView: KisiYetkiView[]
}

export default function KisiYetkiViewGrid({ kisiYetkiView }: IKisiYetkiViewGridProps) {
  return (
    <DataGrid dataSource={kisiYetkiView} >
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <Column caption="Kişi ID" dataField="KisiId" visible={false} />
      <Column caption="Sayfa ID" dataField="YetkiId" visible={false} />
      <Column caption="Kişi Adı" dataField="Ad" />
      <Column caption="Kişi Soyadı" dataField="Soyad" />
      <Column caption="Yetki Adı" dataField="YetkiAdi" />
      <Column caption="Eylem" dataField="EylemAdi" />
    </DataGrid>
  )
}
