import { IDataGridOptions } from "devextreme-react/data-grid";
import { yetkiler } from "../modals/yetkiler";
import { EylemTuruEnum } from "../modals/eylemTuru";

// const eylemTuruLookup = Object.keys(EylemTuruEnum)
//   .filter((key) => isNaN(Number(key))) // Get only string keys (names)
//   .map((key) => ({
//     eylemTuruId: EylemTuruEnum[key as keyof typeof EylemTuruEnum],
//     eylemTuruAdi: key,
//   }));

const eylemTuruLookup = [
  { eylemTuruId: EylemTuruEnum.Oku, eylemAdi: "Oku" },
  { eylemTuruId: EylemTuruEnum.Yaz, eylemAdi: "Yaz" },
  { eylemTuruId: EylemTuruEnum.Engel, eylemAdi: "Engelle" },
];

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
        dataSource: eylemTuruLookup,
        valueExpr: "eylemTuruId",
        displayExpr: "eylemAdi",
      },
    },
  ],
};
