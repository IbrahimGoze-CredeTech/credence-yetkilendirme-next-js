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
import { PreviousRolAtama } from "@/actions/previous-demands";
import { talepOnayla } from "@/actions/talep-onaylama";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import type { IPreviousRolAtama, IWaitingRolAtamaType } from "@/types";

interface IProps {
  data: IWaitingRolAtamaType[];
  rolAtamaTalepler: IPreviousRolAtama[];
}

export default function RolAtamaGrid({ data, rolAtamaTalepler }: IProps) {
  const [gridData, setGridData] = useState<IWaitingRolAtamaType[]>(data);
  const [talepGrid, setTalepGrid] = useState<IPreviousRolAtama[]>([]);

  useEffect(() => {
    setGridData(data);
    setTalepGrid(rolAtamaTalepler);
  }, [data, rolAtamaTalepler]);

  async function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      const response = await talepOnayla(true, item.row.data.RolAtamaId);

      if (!response) return;
      setGridData((prevData) =>
        prevData.filter(
          (row) => item.row && row.RolAtamaId !== item.row.data.RolAtamaId
        )
      );
      const responseJson = await PreviousRolAtama();
      setTalepGrid(responseJson);

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
      const response = await talepOnayla(false, item.row.data.RolAtamaId);
      if (!response) return;
      setGridData((prevData) =>
        prevData.filter(
          (row) => item.row && row.RolAtamaId !== item.row.data.RolAtamaId
        )
      );
      const responseJson = await PreviousRolAtama();
      setTalepGrid(responseJson);
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
      <div className=" p-2 rounded-md">
        <DataGrid
          dataSource={gridData}
          noDataText="Şu anda bekleyen talep bulunmamaktadır."
          showBorders
        >
          <SearchPanel placeholder="Arama Yapın..." visible={true} />
          <Editing mode="row" useIcons={true} />
          {/* Make RolAtamaId Column hidden */}

          <Column caption="Rol Adı" dataField="RolAtamaId" visible={false} />
          <Column caption="Rol Adı" dataField="RolAdi" />
          <Column caption="Kişi Ad" dataField="KisiAdi" />
          <Column
            caption="Rol Başlangıç Tarihi"
            dataField="RolBaslangicTarihi"
          />
          <Column caption="Rol Bitiş Tarihi" dataField="RolBitisTarihi" />
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
      <Separator className="h-1" />
      <div className="w-full mt-8">
        <p className="font-semibold text-xl mb-4">Rol Atama Geçmiş Talepler</p>
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
