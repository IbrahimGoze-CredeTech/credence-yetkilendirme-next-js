'use client';

import React from 'react'
import DataGrid, { FilterRow, Pager, Paging, Scrolling } from 'devextreme-react/data-grid';
import { RolYetki } from '@prisma/client';
import { yetkiDataGridConfig } from '@/configs/yetki-data-grid-config';

interface Props {
  yetkiler: RolYetki[] | undefined;
}

export default function YetkilerTab({ yetkiler }: Props) {
  console.log("yetkiler: ", yetkiler);

  return (
    <DataGrid
      dataSource={yetkiler} // Nested data from yetkiler
      showBorders={true}
      {...yetkiDataGridConfig}
    >
      <FilterRow visible={true} />
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
