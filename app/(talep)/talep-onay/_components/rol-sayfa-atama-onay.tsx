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
import { PreviousRolSayfaAtama } from "@/actions/previous-demands";
import { talepOnayla } from "@/actions/talep-onaylama";
import { WaitingRolSayfaAtama } from "@/actions/waiting-demands";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import type { IPreviousRolSayfaAtama, IWaitingRolSayfaAtama } from "@/types";

interface IProps {
  data: IWaitingRolSayfaAtama[];
  previousKisiSayfaAtama: IPreviousRolSayfaAtama[];
}

export default function RolSayfaAtamaOnay({
  data,
  previousKisiSayfaAtama,
}: IProps) {
  const [gridData, setGridData] = useState<IWaitingRolSayfaAtama[]>(data);
  const [previousGrid, setPreviousGrid] = useState<IPreviousRolSayfaAtama[]>(
    previousKisiSayfaAtama
  );

  async function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      const response = await talepOnayla(true, item.row.data.RolSayfaAtamaId);
      if (!response) return;
      const prevGrid = await PreviousRolSayfaAtama();
      setPreviousGrid(prevGrid);
      const grid = await WaitingRolSayfaAtama();
      setGridData(grid);
      // fetcher();
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
      const response = await talepOnayla(false, item.row.data.RolSayfaAtamaId);
      if (!response) return;
      const prevGrid = await PreviousRolSayfaAtama();
      setPreviousGrid(prevGrid);
      const grid = await WaitingRolSayfaAtama();
      setGridData(grid);
      toast({
        variant: "destructive",
        title: "Reddedildi",
        description:
          "Talebiniz başarıyla reddedildi ve supervisor onayı beklemektedir.",
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
          <Column caption="Rol Adı" dataField="RolAdi" />
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
        <p className="font-semibold text-xl mb-4">
          Rol Sayfa Atama Geçmiş Talepler
        </p>
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
