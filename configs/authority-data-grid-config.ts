import type { IDataGridOptions } from "devextreme-react/data-grid";
import { yetkiler } from "../modals/yetkiler";

const authorityDataGridConfig: IDataGridOptions = {
  id: "debtordatagrid",
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: false,
  columnAutoWidth: true,
  showRowLines: true,
  // height: "100%",
  onCellPrepared(e) {
    e.cellElement.style.borderColor = "#D1D5DB";
  },
  columns: [
    {
      dataField: "kisiAdi",
      caption: "Ad",
    },
    {
      dataField: "kisiSoyadi",
      caption: "Soyad",
    },
    {
      dataField: "rolAdi",
      caption: "Rol",
    },
    {
      dataField: "baslangicTarihi",
      caption: "Başlangıç Tarihi",
      dataType: "date",
    },
    {
      dataField: "bitisTarihi",
      caption: "Bitiş Tarihi",
      dataType: "date",
    },
    {
      dataField: "talepEden",
      caption: "Talep Eden",
      allowEditing: false,
    },
    {
      dataField: "onaylayan",
      caption: "Onaylayan",
      allowEditing: false,
    },
    {
      dataField: "onaylanmaTarihi",
      caption: "Onaylanma Tarihi",
      dataType: "date",
      allowEditing: false,
    },
    {
      dataField: "yetkiAdi",
      caption: "Yetki",
      lookup: {
        dataSource: yetkiler,
        valueExpr: "yetkiId",
        displayExpr: "yetkiAdi",
      },
    },
    {
      dataField: "departman",
      caption: "Departman",
    },
    {
      dataField: "siniflandirmaSeviyesi",
      caption: "Sınıflandırma Seviyesi",
    },
  ],
};

export default authorityDataGridConfig;
