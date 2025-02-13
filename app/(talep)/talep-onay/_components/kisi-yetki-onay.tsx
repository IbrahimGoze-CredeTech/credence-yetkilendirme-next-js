import type { ColumnButtonClickEvent } from "devextreme/ui/data_grid";
import DataGrid, {
  Button,
  Column,
  Editing,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { PreviousKisiYetkiEdit } from "@/actions/previous-demands";
import { talepOnayla } from "@/actions/talep-onaylama";
import { WaitingKisiYetkiEdit } from "@/actions/waiting-demands";
import { ToastAction } from "@/components/ui/toast";
// import { ekstraYetkilerDataGridConfig } from '@/configs/ekstra-yetkiler-data-grid-config';
import { toast } from "@/hooks/use-toast";
import { EylemTuruEnum } from "@/modals/eylemTuru";
import type { IPreviousKisiYetkiEdit, IWaitingKisiYetkiEditType } from "@/types";

const eylemTuruLookup = [
  { eylemTuruId: EylemTuruEnum.Oku, eylemAdi: "Oku" },
  { eylemTuruId: EylemTuruEnum.Yaz, eylemAdi: "Yaz" },
  { eylemTuruId: EylemTuruEnum.Engel, eylemAdi: "Engelle" },
];

interface IProps {
  data: IWaitingKisiYetkiEditType[];
  kisiYetkiEditTalepler: IPreviousKisiYetkiEdit[];
}

export default function KisiYetkiOnay({ data, kisiYetkiEditTalepler }: IProps) {
  const [gridData, setGridData] = useState<IWaitingKisiYetkiEditType[]>(data);
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
          <SearchPanel placeholder="Arama Yapın..." visible={true} />
          <Editing mode="row" useIcons={true} />
          <Column caption="Yetki Adı" dataField="YetkiAdi" />
          <Column caption="Kişi Ad" dataField="KisiAdi" />
          <Column
            caption="Eylem Turu"
            dataField="EylemTuruId"
            lookup={{
              dataSource: eylemTuruLookup,
              valueExpr: "eylemTuruId",
              displayExpr: "eylemAdi",
            }}
          />
          <Column
            caption="Yetki Başlama Tarihi"
            dataField="YetkiBaslamaTarihi"
          />
          <Column caption="Yetki Bitiş Tarihi" dataField="YetkiBitisTarihi" />
          <Column type="buttons" width={120}>
            <Button
              hint="Onay"
              onClick={(e) => onClick(true, e)}
              text="Onay"
              visible={true}
            />
            <Button
              hint="Ret"
              onClick={(e) => onClick(false, e)}
              text="Ret"
              visible={true}
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
            allowedPageSizes="auto"
            displayMode="compact"
            visible={true}
          />
        </DataGrid>
      </div>
    </>
  );
}
