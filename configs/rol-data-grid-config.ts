import type { IDataGridOptions } from "devextreme-react/data-grid";
import { roles } from "../modals/roller";

export const rolDataGridConfig: IDataGridOptions = {
  id: "roldatagrid",
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
      dataField: "baslangicTarihi",
      caption: "Başlangıç Tarihi",
      dataType: "date",
      format: "dd.MM.yyyy",
    },
    {
      dataField: "bitisTarihi",
      caption: "Bitiş Tarihi",
      dataType: "date",
      format: "dd.MM.yyyy",
    },
    { dataField: "talepEden", caption: "Talep Eden" },
    { dataField: "onaylayan", caption: "Onaylayan" },
    {
      dataField: "onaylanmaTarihi",
      caption: "Onaylanma Tarihi",
      dataType: "date",
      format: "dd.MM.yyyy",
    },
  ],
};
