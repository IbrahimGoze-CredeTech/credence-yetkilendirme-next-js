import type { IDataGridOptions } from "devextreme-react/data-grid";
import { roles } from "@/modals/roller";
import { yetkiler } from "../modals/yetkiler";

export const rolyetkiAtamaConfig: IDataGridOptions = {
  id: "rolyetkiatama",
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: false,
  columnAutoWidth: true,
  showRowLines: true,

  columns: [
    {
      dataField: "rolAdi",
      caption: "Rol",
      lookup: {
        dataSource: roles,
        valueExpr: "rolAdi",
        displayExpr: "rolAdi",
      },
    },
    {
      dataField: "yetkiAdi",
      caption: "Yetki",
      lookup: {
        dataSource: yetkiler,
        valueExpr: "yetkiAdi",
        displayExpr: "yetkiAdi",
      },
    },
  ],
};
