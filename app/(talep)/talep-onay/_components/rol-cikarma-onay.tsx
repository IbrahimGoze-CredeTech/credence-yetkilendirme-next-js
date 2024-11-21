import { talepOnayla } from "@/actions/talep-onaylama";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { IPreviousRolCikarma, IWaitingRolCikarma } from "@/types";
import DataGrid, {
  Button,
  Column,
  Editing,
  SearchPanel,
  Pager,
  Paging,
} from "devextreme-react/data-grid";
import { ColumnButtonClickEvent } from "devextreme/ui/data_grid";
import { Separator } from "@/components/ui/separator";

import React, { useEffect, useState } from "react";
import { PreviousRolCikarma } from "@/actions/previous-demands";

interface Props {
  data: IWaitingRolCikarma[];
  rolCikarmaTalepler: IPreviousRolCikarma[];
}

export default function RolCikarmaGrid({ data, rolCikarmaTalepler }: Props) {

  const [gridData, setGridData] = useState<IWaitingRolCikarma[]>(data);
  const [talepGrid, setTalepGrid] = useState<IPreviousRolCikarma[]>([]);

  useEffect(() => {
    setGridData(data);
    setTalepGrid(rolCikarmaTalepler);
  }, [data, rolCikarmaTalepler]);

  async function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      // console.log('Onaylandı: ', item.row.data);
      const response = await talepOnayla(true, item.row.data.RolCikarmaId);
      // If response is successful these will update the datagrids
      if (!response) return;
      setGridData((prevData) =>
        prevData.filter(
          (row) => item.row && row.RolCikarmaId !== item.row.data.RolCikarmaId
        )
      );
      const responseJson = await PreviousRolCikarma();
      setTalepGrid(responseJson);
      toast({
        variant: "success",
        title: "Onaylandı",
        description: "Talebiniz başarıyla onaylandı",
        action: (
          <ToastAction
            altText="Goto schedule to undo"
            onClick={() => {
              console.log("undo clicked");
            }}
          >
            Iptal
          </ToastAction>
        ),
      });
    } else {
      // console.log('Reddedildi: ', item.row.data);
      const response = await talepOnayla(false, item.row.data.RolCikarmaId);
      if (!response) return;
      setGridData((prevData) =>
        prevData.filter(
          (row) => item.row && row.RolCikarmaId !== item.row.data.RolCikarmaId
        )
      );
      const responseJson = await PreviousRolCikarma();
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
              console.log("undo clicked");
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
      <div className="p-2 rounded-md">
        <DataGrid
          dataSource={gridData}
          showBorders
          noDataText="Şu anda bekleyen talep bulunmamaktadır."
        >
          <SearchPanel visible={true} placeholder="Arama Yapın..." />
          <Editing mode="row" useIcons={true} />
          <Column dataField="RolAdi" caption="Rol Adı" />
          <Column dataField="KisiAdi" caption="Kişi Ad" />
          <Column dataField="RolCikarmaTarihi" caption="Rol Bitiş Tarihi" />
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
      <Separator className="h-1" />
      <div className="w-full mt-8">
        <p className="font-semibold text-xl mb-4">
          Rol Çıkarma Geçmiş Talepler
        </p>
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
