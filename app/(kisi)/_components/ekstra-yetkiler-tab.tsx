import React from 'react'
import DataGrid, { FilterRow, Pager, Paging, Scrolling } from 'devextreme-react/data-grid';
import { ekstraYetkilerDataGridConfig } from '@/configs/ekstra-yetkiler-data-grid-config';
import { KisiYetki } from '@prisma/client';

interface Props {
  ekstraYetkiler: KisiYetki[] | undefined;
}

export default function EkstraYetkilerTab({ ekstraYetkiler }: Props) {
  return (
    <DataGrid
      dataSource={ekstraYetkiler} // Nested data from ekstraYetkiler
      showBorders={true}
      {...ekstraYetkilerDataGridConfig}
    ><FilterRow visible={true} />
      <Scrolling rowRenderingMode='virtual'></Scrolling>
      <Paging defaultPageSize={10} />
      <Pager
        visible={true}
        allowedPageSizes={"auto"}
        displayMode={"compact"}
      />
    </DataGrid>
  )
}
