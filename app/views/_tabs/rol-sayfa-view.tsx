import { RoleAccessibleRoutes } from '@prisma/client'
import React from 'react'
import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter } from 'devextreme-react/cjs/data-grid'

interface ViewsClientProps {
  roleAccessibleRoutes: RoleAccessibleRoutes[]
}

export default function RolSayfaView({ roleAccessibleRoutes }: ViewsClientProps) {
  return (
    <DataGrid dataSource={roleAccessibleRoutes} >
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <Column dataField="RolId" caption="Kişi ID" visible={false} />
      <Column dataField="SayfaId" caption="Sayfa ID" visible={false} />
      <Column dataField="RolAdi" caption="Rol Adı" />
      <Column dataField="SayfaRoute" caption="Sayfa" />
    </DataGrid>
  )
}
