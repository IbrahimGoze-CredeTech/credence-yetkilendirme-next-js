import type { RoleAccessibleRoutes } from '@prisma/client'
import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter } from 'devextreme-react/cjs/data-grid'
import React from 'react'

interface IViewsClientProps {
  roleAccessibleRoutes: RoleAccessibleRoutes[]
}

export default function RolSayfaView({ roleAccessibleRoutes }: IViewsClientProps) {
  return (
    <DataGrid dataSource={roleAccessibleRoutes} >
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <Column caption="Kişi ID" dataField="RolId" visible={false} />
      <Column caption="Sayfa ID" dataField="SayfaId" visible={false} />
      <Column caption="Rol Adı" dataField="RolAdi" />
      <Column caption="Sayfa" dataField="SayfaRoute" />
    </DataGrid>
  )
}
