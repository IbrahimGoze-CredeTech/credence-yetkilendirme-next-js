import type { Rol } from '@prisma/client';
import DataGrid, { Pager, Paging, Scrolling } from 'devextreme-react/data-grid';
import Link from 'next/link';
import React from 'react'
import { rolDataGridConfig } from '@/configs/rol-data-grid-config';

interface IProps {
  roller: Rol[] | undefined

}

export default function RolTab({ roller }: IProps) {
  return (
    <div>

      <DataGrid
        dataSource={roller} // Nested data from roller
        showBorders={true}
        {...rolDataGridConfig}
      >
        <Scrolling rowRenderingMode='virtual' />
        <Paging defaultPageSize={10} />
        <Pager
          allowedPageSizes="auto"
          displayMode="compact"
          visible={true}
        />
      </DataGrid>
      <div className='space-x-8'>
        <Link className='bg-azure-radiance-500 text-white p-4 rounded-md hover:bg-azure-radiance-400 active:bg-azure-radiance-600'
          href='/talep-yarat'>Rol Atama Talebi Oluştur</Link>
        <Link className='bg-azure-radiance-500 text-white p-4 rounded-md hover:bg-azure-radiance-400 active:bg-azure-radiance-600'
          href='/talep-yarat'>Rol Çıkarma Talebi Oluştur</Link>
      </div>
    </div>

  )
}
