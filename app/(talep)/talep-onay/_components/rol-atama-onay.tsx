import { GetPreviousRolAtamaDetails } from "@/actions/eski-talepler";
import { talepOnayla } from "@/actions/talep-onaylama";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { PreviousRolAtamaDetails, WaitingRolAtamaGridType } from "@/types";
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

interface Props {
  data: WaitingRolAtamaGridType[];
  rolAtamaTalepler: PreviousRolAtamaDetails[];
}

export default function RolAtamaGrid({ data, rolAtamaTalepler }: Props) {
  const [gridData, setGridData] = useState<WaitingRolAtamaGridType[]>(data);
  const [talepGrid, setTalepGrid] = useState<PreviousRolAtamaDetails[]>([]);

  useEffect(() => {
    setGridData(data);
    setTalepGrid(rolAtamaTalepler);
  }, [data, rolAtamaTalepler]);

  async function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      // console.log('Onaylandı: ', item.row.data);
      const response = await talepOnayla(true, item.row.data.RolAtamaId);

      if (!response) return;
      setGridData((prevData) =>
        prevData.filter(
          (row) => item.row && row.RolAtamaId !== item.row.data.RolAtamaId
        )
      );
      const responseJson = await GetPreviousRolAtamaDetails();
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
      const response = await talepOnayla(false, item.row.data.RolAtamaId);
      if (!response) return;
      setGridData((prevData) =>
        prevData.filter(
          (row) => item.row && row.RolAtamaId !== item.row.data.RolAtamaId
        )
      );
      const responseJson = await GetPreviousRolAtamaDetails();
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
      <div className=" p-2 rounded-md">
        <DataGrid
          dataSource={gridData}
          showBorders
          noDataText="Şu anda bekleyen talep bulunmamaktadır."
        >
          <SearchPanel visible={true} placeholder="Arama Yapın..." />
          <Editing mode="row" useIcons={true} />
          {/*Make RolAtamaId Column hidden */}

          <Column dataField="RolAtamaId" caption="Rol Adı" visible={false} />
          <Column dataField="RolAdi" caption="Rol Adı" />
          <Column dataField="KisiAdi" caption="Kişi Ad" />
          <Column
            dataField="RolBaslangicTarihi"
            caption="Rol Başlangıç Tarihi"
          />
          <Column dataField="RolBitisTarihi" caption="Rol Bitiş Tarihi" />
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
        <p className="font-semibold text-xl mb-4">Rol Atama Geçmiş Talepler</p>
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
