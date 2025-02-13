import type { KisiAccessibleRoutes } from '@prisma/client'
import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter } from 'devextreme-react/cjs/data-grid'
import React from 'react'

interface IKisiSayfaViewProps {
  kisiAccessibleRoutes: KisiAccessibleRoutes[]
}

export default function KisiSayfaView({ kisiAccessibleRoutes }: IKisiSayfaViewProps) {
  return (
    <DataGrid dataSource={kisiAccessibleRoutes} >
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <Column caption="Kişi ID" dataField="KisiId" visible={false} />
      <Column caption="Sayfa ID" dataField="SayfaId" visible={false} />
      <Column caption="Kişi Adı" dataField="KisiAd" />
      <Column caption="Kişi Soyadı" dataField="KisiSoyad" />
      <Column caption="Sayfa" dataField="SayfaRoute" />
      <Column caption="İzin" dataField="IsPermitted" />
    </DataGrid>
  )
}
