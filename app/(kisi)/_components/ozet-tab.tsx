import type { KisiYetki, Rol, RolYetki } from '@prisma/client'
import DataGrid, { Pager, Paging, Scrolling } from 'devextreme-react/data-grid';
import React from 'react'
import { ekstraYetkilerDataGridConfig } from '@/configs/ekstra-yetkiler-data-grid-config'
import { rolDataGridConfig } from '@/configs/rol-data-grid-config'
import { yetkiDataGridConfig } from '@/configs/yetki-data-grid-config'

interface IProps {
  roller: Rol[] | undefined
  yetkiler: RolYetki[] | undefined;
  ekstraYetkiler: KisiYetki[] | undefined;
}

export default function OzetTab({ roller, yetkiler, ekstraYetkiler }: IProps) {
  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-4'>

      <div className=" border rounded-xl p-4 shadow-lg">
        <h2 className='font-semibold text-2xl'>Roller</h2>
        <DataGrid
          dataSource={roller} // Nested data from roller
          showBorders={true}
          {...rolDataGridConfig}
        >
          <Scrolling rowRenderingMode='virtual' />
          <Paging defaultPageSize={7} />
          <Pager
            allowedPageSizes="auto"
            displayMode="compact"
            visible={true}
          />
        </DataGrid>
      </div>
      <div className="border rounded-xl  p-4 shadow-lg">
        <h2 className='font-semibold text-2xl'>Yetkiler</h2>
        <DataGrid
          dataSource={yetkiler} // Nested data from yetkiler
          showBorders={true}
          {...yetkiDataGridConfig}
        >
          <Scrolling rowRenderingMode='virtual' />
          <Paging defaultPageSize={7} />
          <Pager
            allowedPageSizes="auto"
            displayMode="compact"
            visible={true}
          />
        </DataGrid>
      </div>
      <div className="border rounded-xl  p-4 shadow-lg">
        <h2 className='font-semibold text-2xl'>Ekstra Yetkiler</h2>
        <DataGrid
          dataSource={ekstraYetkiler} // Nested data from ekstraYetkiler
          showBorders={true}
          {...ekstraYetkilerDataGridConfig}
        >
          <Scrolling rowRenderingMode='virtual' />
          <Paging defaultPageSize={7} />
          <Pager
            allowedPageSizes="auto"
            displayMode="compact"
            visible={true}
          />
        </DataGrid>
      </div>
    </div>
  )
}
