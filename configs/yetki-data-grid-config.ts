import { IDataGridOptions } from "devextreme-react/data-grid";
import { yetkiler } from "../modals/yetkiler";
import { eylemTuru } from "../modals/eylemTuru";

export const yetkiDataGridConfig: IDataGridOptions = {
  id: "yekidatagrid",
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: false,
  columnAutoWidth: true,
  showRowLines: true,
  columns: [
    // { dataField: "yetkiId", caption: "Yetki ID", visible: false },
    {
      dataField: "yetkiAdi",
      caption: "Yetki",
      lookup: {
        dataSource: yetkiler,
        valueExpr: "yetkiAdi",
        displayExpr: "yetkiAdi",
      },
    },
    { dataField: "rolAdi", caption: "Rol" },
    {
      dataField: "eylemlerTuruId",
      caption: "Eylem Türü",
      lookup: {
        dataSource: eylemTuru,
        valueExpr: "eylemTuruId",
        displayExpr: "eylemAdi",
      },
    },
  ],
};
