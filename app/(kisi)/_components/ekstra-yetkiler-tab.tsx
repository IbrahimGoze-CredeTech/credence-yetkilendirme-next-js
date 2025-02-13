import type { KisiYetki } from '@prisma/client';
import DataGrid, { FilterRow, Pager, Paging, Scrolling } from 'devextreme-react/data-grid';
import React from 'react'
import { ekstraYetkilerDataGridConfig } from '@/configs/ekstra-yetkiler-data-grid-config';

interface IProps {
  ekstraYetkiler: KisiYetki[] | undefined;
}

export default function EkstraYetkilerTab({ ekstraYetkiler }: IProps) {
  return (
    <DataGrid
      dataSource={ekstraYetkiler} // Nested data from ekstraYetkiler
      showBorders={true}
      {...ekstraYetkilerDataGridConfig}
    ><FilterRow visible={true} />
      <Scrolling rowRenderingMode='virtual' />
      <Paging defaultPageSize={10} />
      <Pager
        allowedPageSizes="auto"
        displayMode="compact"
        visible={true}
      />
    </DataGrid>
  )
}
