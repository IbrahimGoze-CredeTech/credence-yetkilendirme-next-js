import { TalepTipiEnum } from "@/enums";
import { IDataGridOptions } from "devextreme-react/data-grid";

const talepTipiLookup = Object.keys(TalepTipiEnum)
  .filter((key) => isNaN(Number(key))) // Get only string keys (names)
  .map((key) => ({
    talepTipiId: TalepTipiEnum[key as keyof typeof TalepTipiEnum],
    talepAdi: key,
  }));

export const talepDataGridConfig: IDataGridOptions = {
  id: "talepDataGridConfig",
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: false,
  columnAutoWidth: true,
  showRowLines: true,

  columns: [
    // { dataField: "talepId", visible: false, allowEditing: false },
    // { dataField: "talepEdenKisiId", visible: false, allowEditing: false },
    {
      dataField: "talepEdenKisiAdi",
      caption: "Talep Eden Kişi",
      allowEditing: false,
    },
    {
      dataField: "olusturulmaTarihi",
      caption: "Oluşturulma Tarihi",
      allowEditing: false,
      dataType: "date",
      format: "dd.MM.yyyy - HH:mm ",
    },
    { dataField: "durum", caption: "Durum", allowEditing: false },
    {
      dataField: "durumTarihi",
      caption: "Durum Tarihi",
      allowEditing: false,
      dataType: "date",
      format: "dd.MM.yyyy - HH:mm ",
    },
    {
      dataField: "talepTipiId",
      caption: "Talep Tipi",
      lookup: {
        dataSource: talepTipiLookup,
        valueExpr: "talepTipiId",
        displayExpr: "talepAdi",
      },
    },
  ],
};
