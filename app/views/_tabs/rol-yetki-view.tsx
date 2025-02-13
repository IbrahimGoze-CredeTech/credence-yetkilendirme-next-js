import type { RolYetkiView } from '@prisma/client'
import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter } from 'devextreme-react/cjs/data-grid'
import React from 'react'

interface IProps {
  roleYetkiView: RolYetkiView[]
}

export default function RoleYetkiView({ roleYetkiView }: IProps) {
  return (
    <DataGrid dataSource={roleYetkiView} >
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <Column caption="Kişi ID" dataField="RolId" visible={false} />
      <Column caption="Sayfa ID" dataField="YetkiId" visible={false} />
      <Column caption="Rol Adı" dataField="RolAdi" />
      <Column caption="Supervizor Rol Id" dataField="SupervizorRolId" />
      <Column caption="Rol Risk" dataField="RolRisk" />
      {/* <Column dataField="RolDeleted" caption="Silindi" /> */}
      <Column caption="Yetki Adı" dataField="YetkiAdi" />
      <Column caption="Yetki Risk" dataField="YetkiRisk" />
      {/* <Column dataField="YetkiDeleted" caption="Yetki Silindi" /> */}
    </DataGrid>
  )
}
