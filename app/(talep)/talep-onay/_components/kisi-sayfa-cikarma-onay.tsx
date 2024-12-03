import { PreviousKisiSayfaCikarma } from "@/actions/previous-demands";
import { talepOnayla } from "@/actions/talep-onaylama";
import { WaitingKisiSayfaCikarma } from "@/actions/waiting-demands";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { IPreviousKisiSayfaCikarma, IWaitingKisiSayfaCikarma } from "@/types";
import DataGrid, {
  Button,
  Column,
  Editing,
  SearchPanel,
  Pager,
  Paging,
} from "devextreme-react/data-grid";
import { ColumnButtonClickEvent } from "devextreme/ui/data_grid";
import React, { useState } from "react";

interface Props {
  data: IWaitingKisiSayfaCikarma[];
  previousKisiSayfaAtama: IPreviousKisiSayfaCikarma[];
}

export default function KisiSayfaCikarmaOnay({
  data,
  previousKisiSayfaAtama,
}: Props) {
  const [gridData, setGridData] = useState<IWaitingKisiSayfaCikarma[]>(data);
  const [previousGrid, setPreviousGrid] = useState<IPreviousKisiSayfaCikarma[]>(
    previousKisiSayfaAtama
  );

  async function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      const response = await talepOnayla(
        true,
        item.row.data.KisiSayfaCikarmaId
      );
      if (!response) return;
      const prevGrid = await PreviousKisiSayfaCikarma();
      setPreviousGrid(prevGrid);
      const grid = await WaitingKisiSayfaCikarma();
      setGridData(grid);
      // fetcher();
      toast({
        variant: "success",
        title: "Onaylandı",
        description: "Talebiniz başarıyla onaylandı",
        action: (
          <ToastAction altText="Goto schedule to undo" onClick={() => {}}>
            Iptal
          </ToastAction>
        ),
      });
    } else {
      const response = await talepOnayla(
        false,
        item.row.data.KisiSayfaCikarmaId
      );
      if (!response) return;
      const prevGrid = await PreviousKisiSayfaCikarma();
      setPreviousGrid(prevGrid);
      const grid = await WaitingKisiSayfaCikarma();
      setGridData(grid);
      toast({
        variant: "destructive",
        title: "Reddedildi",
        description:
          "Talebiniz başarıyla reddedildi ve supervisor onayı beklemektedir.",
        action: (
          <ToastAction altText="Goto schedule to undo" onClick={() => {}}>
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
          <Column dataField="KisiAdi" caption="Kişi Adı" />
          <Column dataField="SayfaRoute" caption="Sayfa" />
          <Column dataField="BaslangicTarihi" caption="Başlama Tarihi" />
          <Column dataField="BitisTarihi" caption="Bitiş Tarihi" />
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
          dataSource={previousGrid}
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
