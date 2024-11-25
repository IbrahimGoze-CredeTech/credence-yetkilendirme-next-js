'use client'

import { KisiAccessibleRoutes, RoleAccessibleRoutes } from '@prisma/client'
import { DataGrid } from 'devextreme-react'
import { FilterRow, HeaderFilter } from 'devextreme-react/cjs/data-grid'
import React from 'react'

interface ViewsClientProps {
  kisiAccessibleRoutes: KisiAccessibleRoutes[]
  roleAccessibleRoutes: RoleAccessibleRoutes[]
}

export default function ViewsClient({ kisiAccessibleRoutes, roleAccessibleRoutes }: ViewsClientProps) {
  return (
    <div>
      <DataGrid dataSource={kisiAccessibleRoutes} >
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
      </DataGrid>
      <DataGrid dataSource={roleAccessibleRoutes} >
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
      </DataGrid>
    </div>
  )
}
