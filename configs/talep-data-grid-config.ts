import { TalepTipiEnum } from "@/enums";
import { IDataGridOptions } from "devextreme-react/data-grid";

const talepTipiLookup = Object.keys(TalepTipiEnum)
  .filter((key) => isNaN(Number(key))) // Get only string keys (names)
  .map((key) => ({
    eylemTuruId: TalepTipiEnum[key as keyof typeof TalepTipiEnum],
    eylemAdi: key,
  }));

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
    {
      dataField: "talepTipiId",
      caption: "Talep Tipi",
      lookup: {
        dataSource: talepTipiLookup,
        valueExpr: "eylemTuruId",
        displayExpr: "eylemAdi",
      },
    },
  ],
};
