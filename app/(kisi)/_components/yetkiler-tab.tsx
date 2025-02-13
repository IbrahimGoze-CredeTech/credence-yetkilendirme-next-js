'use client';

import type { RolYetki } from '@prisma/client';
import DataGrid, { FilterRow, Pager, Paging, Scrolling } from 'devextreme-react/data-grid';
import React from 'react'
import { yetkiDataGridConfig } from '@/configs/yetki-data-grid-config';

interface IProps {
  yetkiler: RolYetki[] | undefined;
}

export default function YetkilerTab({ yetkiler }: IProps) {

  return (
    <DataGrid
      dataSource={yetkiler} // Nested data from yetkiler
      showBorders={true}
      {...yetkiDataGridConfig}
    >
      <FilterRow visible={true} />
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
