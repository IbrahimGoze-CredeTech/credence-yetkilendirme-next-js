import { RolYetkiView } from '@prisma/client'
import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter } from 'devextreme-react/cjs/data-grid'
import React from 'react'

interface Props {
  roleYetkiView: RolYetkiView[]
}

export default function RoleYetkiView({ roleYetkiView }: Props) {
  return (
    <DataGrid dataSource={roleYetkiView} >
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <Column dataField="RolId" caption="Kişi ID" visible={false} />
      <Column dataField="YetkiId" caption="Sayfa ID" visible={false} />
      <Column dataField="RolAdi" caption="Rol Adı" />
      <Column dataField="SupervizorRolId" caption="Supervizor Rol Id" />
      <Column dataField="RolRisk" caption="Rol Risk" />
      {/* <Column dataField="RolDeleted" caption="Silindi" /> */}
      <Column dataField="YetkiAdi" caption="Yetki Adı" />
      <Column dataField="YetkiRisk" caption="Yetki Risk" />
      {/* <Column dataField="YetkiDeleted" caption="Yetki Silindi" /> */}
    </DataGrid>
  )
}
