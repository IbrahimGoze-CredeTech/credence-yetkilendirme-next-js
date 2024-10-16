import { IDataGridOptions } from "devextreme-react/data-grid";
import { yetkiler } from "../modals/yetkiler";
import { EylemTuruEnum } from "../modals/eylemTuru";

// Convert enum to an array of objects for lookup
const eylemTuruLookup = Object.keys(EylemTuruEnum)
  .filter((key) => isNaN(Number(key))) // Get only string keys (names)
  .map((key) => ({
    eylemTuruId: EylemTuruEnum[key as keyof typeof EylemTuruEnum],
    eylemAdi: key,
  }));

export const rolYetkiDataGridConfig: IDataGridOptions = {
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
      //allowEditing: true,
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
      dataType: "number",
      lookup: {
        dataSource: eylemTuruLookup,
        valueExpr: "eylemTuruId",
        displayExpr: "eylemAdi",
      },
    },
  ],
};
