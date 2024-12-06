import { PreviousKisiYetkiEdit } from "@/actions/previous-demands";
import { talepOnayla } from "@/actions/talep-onaylama";
import { WaitingKisiYetkiEdit } from "@/actions/waiting-demands";
import { ToastAction } from "@/components/ui/toast";
// import { ekstraYetkilerDataGridConfig } from '@/configs/ekstra-yetkiler-data-grid-config';
import { toast } from "@/hooks/use-toast";
import { EylemTuruEnum } from "@/modals/eylemTuru";
import { IPreviousKisiYetkiEdit, IWaitingKisiYetkiEdit } from "@/types";
import DataGrid, {
  Button,
  Column,
  Editing,
  SearchPanel,
  Pager,
  Paging,
} from "devextreme-react/data-grid";
import { ColumnButtonClickEvent } from "devextreme/ui/data_grid";
import React, { useEffect, useState } from "react";

const eylemTuruLookup = [
  { eylemTuruId: EylemTuruEnum.Oku, eylemAdi: "Oku" },
  { eylemTuruId: EylemTuruEnum.Yaz, eylemAdi: "Yaz" },
  { eylemTuruId: EylemTuruEnum.Engel, eylemAdi: "Engelle" },
];

interface Props {
  data: IWaitingKisiYetkiEdit[];
  kisiYetkiEditTalepler: IPreviousKisiYetkiEdit[];
}

export default function KisiYetkiOnay({ data, kisiYetkiEditTalepler }: Props) {
  const [gridData, setGridData] = useState<IWaitingKisiYetkiEdit[]>(data);
  const [talepGrid, setTalepGrid] = useState<IPreviousKisiYetkiEdit[]>([]);

  useEffect(() => {
    setGridData(data);
    setTalepGrid(kisiYetkiEditTalepler);
  }, [data, kisiYetkiEditTalepler]);

  async function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      const response = await talepOnayla(true, item.row.data.KisiYetkiEditId);
      if (!response) return;
      const prevGrid = await PreviousKisiYetkiEdit();
      setTalepGrid(prevGrid);
      const grid = await WaitingKisiYetkiEdit();
      setGridData(grid);
      toast({
        variant: "success",
        title: "Onaylandı",
        description: "Talebiniz başarıyla onaylandı",
        action: (
          <ToastAction
            altText="Goto schedule to undo"
            onClick={() => {
            }}
          >
            Iptal
          </ToastAction>
        ),
      });
    } else {
      const response = await talepOnayla(false, item.row.data.kisiYetkiEditId);
      if (!response) return;
      setGridData((prevData) =>
        prevData.filter(
          (row) =>
            item.row && row.KisiYetkiEditId !== item.row.data.kisiYetkiEditId
        )
      );
      const responseJson = await PreviousKisiYetkiEdit();
      setTalepGrid(responseJson);
      toast({
        variant: "destructive",
        title: "Reddedildi",
        description: "Talebiniz başarıyla reddedildi.",
        action: (
          <ToastAction
            altText="Goto schedule to undo"
            onClick={() => {
            }}
          >
            Iptal
          </ToastAction>
        ),
      });
    }
  }
  return (
    <>
      <div className="border-2 p-2 rounded-md">
        <DataGrid
          dataSource={gridData}
          noDataText="Şu anda bekleyen talep bulunmamaktadır."
        >
          <SearchPanel visible={true} placeholder="Arama Yapın..." />
          <Editing mode="row" useIcons={true} />
          <Column dataField="YetkiAdi" caption="Yetki Adı" />
          <Column dataField="KisiAdi" caption="Kişi Ad" />
          <Column
            dataField="EylemTuruId"
            caption="Eylem Turu"
            lookup={{
              dataSource: eylemTuruLookup,
              valueExpr: "eylemTuruId",
              displayExpr: "eylemAdi",
            }}
          />
          <Column
            dataField="YetkiBaslamaTarihi"
            caption="Yetki Başlama Tarihi"
          />
          <Column dataField="YetkiBitisTarihi" caption="Yetki Bitiş Tarihi" />
          <Column type="buttons" width={120}>
            <Button
              hint="Onay"
              visible={true}
              onClick={(e) => onClick(true, e)}
              text="Onay"
            />
            <Button
              hint="Ret"
              visible={true}
              onClick={(e) => onClick(false, e)}
              text="Ret"
            />
          </Column>
        </DataGrid>
      </div>
      <div className="w-full mt-8">
        <p className="font-semibold text-xl mb-4">Kisi Yetki Geçmiş Talepler</p>
        <DataGrid
          dataSource={talepGrid}
          noDataText="Şu anda geçmiş talep bulunmamaktadır."
        >
          <Paging defaultPageSize={5} />
          <Pager
            visible={true}
            allowedPageSizes={"auto"}
            displayMode={"compact"}
          />
        </DataGrid>
      </div>
    </>
  );
}
