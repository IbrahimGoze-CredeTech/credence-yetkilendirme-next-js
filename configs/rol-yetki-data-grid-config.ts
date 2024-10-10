import { IDataGridOptions } from "devextreme-react/data-grid";
import { roles } from "../modals/roller";
import { yetkiler } from "../modals/yetkiler";
import { eylemTuru } from "../modals/eylemTuru";

export const rolyetkiDataGridConfig: IDataGridOptions = {
  id: "rolyetkidatagrid",
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: false,
  columnAutoWidth: true,
  showRowLines: true,
  columns: [
    {
      dataField: "yetkiAdi",
      caption: "Yetki",
      allowEditing: true,
      lookup: {
        dataSource: yetkiler,
        valueExpr: "yetkiAdi",
        displayExpr: "yetkiAdi",
      },
    },

    {
      dataField: "eylemlerTuruId",
      caption: "Eylem Türü",
      allowEditing: true,
      lookup: {
        dataSource: eylemTuru,
        valueExpr: "eylemTuruId",
        displayExpr: "eylemAdi",
      },
    },
  ],
};
