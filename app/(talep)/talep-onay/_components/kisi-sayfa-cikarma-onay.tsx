import type { ColumnButtonClickEvent } from "devextreme/ui/data_grid";
import DataGrid, {
  Button,
  Column,
  Editing,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import React, { useState } from "react";
import { PreviousKisiSayfaCikarma } from "@/actions/previous-demands";
import { talepOnayla } from "@/actions/talep-onaylama";
import { WaitingKisiSayfaCikarma } from "@/actions/waiting-demands";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import type { IPreviousKisiSayfaCikarma, IWaitingKisiSayfaCikarma } from "@/types";

interface IProps {
  data: IWaitingKisiSayfaCikarma[];
  previousKisiSayfaAtama: IPreviousKisiSayfaCikarma[];
}

export default function KisiSayfaCikarmaOnay({
  data,
  previousKisiSayfaAtama,
}: IProps) {
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
          <ToastAction altText="Goto schedule to undo" onClick={() => { }}>
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
          <ToastAction altText="Goto schedule to undo" onClick={() => { }}>
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
          <Column caption="Kişi Adı" dataField="KisiAdi" />
          <Column caption="Sayfa" dataField="SayfaRoute" />
          <Column caption="Başlama Tarihi" dataField="BaslangicTarihi" />
          <Column caption="Bitiş Tarihi" dataField="BitisTarihi" />
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
          dataSource={previousGrid}
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
