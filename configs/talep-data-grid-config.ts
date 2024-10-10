import { IDataGridOptions } from "devextreme-react/data-grid";

export const talepDataGridConfig: IDataGridOptions = {
  id: "talepDataGridConfig",
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: false,
  columnAutoWidth: true,
  showRowLines: true,
  columns: [
    { dataField: "talepId", visible: false },
    { dataField: "talepEdenKisiId", visible: false },
    { dataField: "talepEdenKisiAdi", caption: "Talep Eden Kişi" },
    { dataField: "olusturulmaTarihi", caption: "Oluşturulma Tarihi" },
    { dataField: "durum", caption: "Durum" },
    { dataField: "durumTarihi", caption: "Durum Tarihi" },
  ],
};
