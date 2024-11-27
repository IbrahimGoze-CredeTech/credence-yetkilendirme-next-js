import { KisiAccessibleRoutes } from '@prisma/client'
import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter } from 'devextreme-react/cjs/data-grid'
import React from 'react'

interface KisiSayfaViewProps {
  kisiAccessibleRoutes: KisiAccessibleRoutes[]
}

export default function KisiSayfaView({ kisiAccessibleRoutes }: KisiSayfaViewProps) {
  return (
    <DataGrid dataSource={kisiAccessibleRoutes} >
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <Column dataField="KisiId" caption="Kişi ID" visible={false} />
      <Column dataField="SayfaId" caption="Sayfa ID" visible={false} />
      <Column dataField="KisiAd" caption="Kişi Adı" />
      <Column dataField="KisiSoyad" caption="Kişi Soyadı" />
      <Column dataField="SayfaRoute" caption="Sayfa" />
      <Column dataField="IsPermitted" caption="İzin" />
    </DataGrid>
  )
}
