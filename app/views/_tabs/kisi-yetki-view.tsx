import { KisiYetkiView } from '@prisma/client'
import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter } from 'devextreme-react/cjs/data-grid'
import React from 'react'

interface KisiSayfaViewProps {
  kisiYetkiView: KisiYetkiView[]
}

export default function KisiYetki_View({ kisiYetkiView }: KisiSayfaViewProps) {
  return (
    <DataGrid dataSource={kisiYetkiView} >
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <Column dataField="KisiId" caption="Kişi ID" visible={false} />
      <Column dataField="YetkiId" caption="Sayfa ID" visible={false} />
      <Column dataField="Ad" caption="Kişi Adı" />
      <Column dataField="Soyad" caption="Kişi Soyadı" />
      <Column dataField="YetkiAdi" caption="Yetki Adı" />
      <Column dataField="EylemAdi" caption="Eylem" />
    </DataGrid>
  )
}
