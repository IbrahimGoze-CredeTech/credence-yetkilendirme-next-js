import { IDataGridOptions } from "devextreme-react/data-grid";
import { yetkiler } from "../modals/yetkiler";
import { eylemTuru } from "../modals/eylemTuru";

export const ekstraYetkilerDataGridConfig: IDataGridOptions = {
  id: "ekstraYetkilerdatagrid",
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: false,
  columnAutoWidth: true,
  showRowLines: true,
  columns: [
    {
      dataField: "yetkiAdi",
      caption: "Yetki",
      lookup: {
        dataSource: yetkiler,
        valueExpr: "yetkiAdi",
        displayExpr: "yetkiAdi",
      },
    },
    {
      dataField: "eylemTuruId",
      caption: "Eylemler Türü",
      lookup: {
        dataSource: eylemTuru,
        valueExpr: "eylemTuruId",
        displayExpr: "eylemAdi",
      },
    },
    {
      dataField: "ekstraYetkiBaslangicTarihi",
      caption: "Başlangıç Tarihi",
      dataType: "date",
      format: "dd.MM.yyyy",
    },
    {
      dataField: "ekstraYetkiBitisTarihi",
      caption: "Bitiş Tarihi",
      dataType: "date",
      format: "dd.MM.yyyy",
    },
    { dataField: "ekstraYetkiTalepEden", caption: "Talep Eden" },
    { dataField: "ekstraYetkiOnaylayan", caption: "Onaylayan" },
  ],
};
