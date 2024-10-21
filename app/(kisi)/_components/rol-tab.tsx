import { rolDataGridConfig } from '@/configs/rol-data-grid-config';
import { Rol } from '@prisma/client';
import DataGrid, { Pager, Paging, Scrolling } from 'devextreme-react/data-grid';
import Link from 'next/link';
import React from 'react'

interface Props {
  roller: Rol[] | undefined

}

export default function RolTab({ roller }: Props) {
  return (
    <div>

      <DataGrid
        dataSource={roller} // Nested data from roller
        showBorders={true}
        {...rolDataGridConfig}
      >
        <Scrolling rowRenderingMode='virtual'></Scrolling>
        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          allowedPageSizes={"auto"}
          displayMode={"compact"}
        />
      </DataGrid>
      <div className='space-x-8'>
        <Link href='/talep-yarat'
          className='bg-azure-radiance-500 text-white p-4 rounded-md hover:bg-azure-radiance-400 active:bg-azure-radiance-600'>Rol Atama Talebi Oluştur</Link>
        <Link href='/talep-yarat'
          className='bg-azure-radiance-500 text-white p-4 rounded-md hover:bg-azure-radiance-400 active:bg-azure-radiance-600'>Rol Çıkarma Talebi Oluştur</Link>
      </div>
    </div>

  )
}
