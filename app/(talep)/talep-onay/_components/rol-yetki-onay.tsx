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
import { PreviousRolYetkiEdit } from "@/actions/previous-demands";
import { talepOnayla } from "@/actions/talep-onaylama";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { EylemTuruEnum } from "@/modals/eylemTuru";
import type { IPreviousRolYetkiEdit, IWaitingRolYetkiEdit } from "@/types";


const eylemTuruLookup = [
  { eylemTuruId: EylemTuruEnum.Oku, eylemAdi: "Oku" },
  { eylemTuruId: EylemTuruEnum.Yaz, eylemAdi: "Yaz" },
  { eylemTuruId: EylemTuruEnum.Engel, eylemAdi: "Engelle" },
];

interface IProps {
  data: IWaitingRolYetkiEdit[];
  rolYetkiEdits: IPreviousRolYetkiEdit[];
}

export default function RolYetkiGrid({ data, rolYetkiEdits }: IProps) {

  const [gridData, setGridData] = useState<IWaitingRolYetkiEdit[]>(data);
  const [talepGrid, setTalepGrid] = useState<IPreviousRolYetkiEdit[]>([]);

  useEffect(() => {
    setGridData(data);
    setTalepGrid(rolYetkiEdits);
  }, [data, rolYetkiEdits]);

  async function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      const response = await talepOnayla(true, item.row.data.RolYetkiEditId);
      // If response is successful these will update the datagrids
      if (!response) return;
      setGridData((prevData) =>
        prevData.filter(
          (row) => item.row && row.RolYetkiEditId !== item.row.data.RolYetkiEditId
        )
      );
      const responseJson = await PreviousRolYetkiEdit();
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
      const response = await talepOnayla(false, item.row.data.RolYetkiEditId);
      if (!response) return;
      setGridData((prevData) =>
        prevData.filter(
          (row) => item.row && row.RolYetkiEditId !== item.row.data.RolYetkiEditId
        )
      );
      const responseJson = await PreviousRolYetkiEdit();
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
      <div className="p-2 rounded-md">
        <DataGrid
          dataSource={gridData}
          noDataText="Şu anda bekleyen talep bulunmamaktadır."
          showBorders
        >
          <SearchPanel placeholder="Arama Yapın..." visible={true} />
          <Editing mode="row" useIcons={true} />
          <Column caption="Rol Adı" dataField="RolAdi" />
          <Column caption="Yetki Adı" dataField="YetkiAdi" />
          <Column
            caption="Eylem Turu"
            dataField="EylemTuruId"
            lookup={{
              dataSource: eylemTuruLookup,
              valueExpr: "eylemTuruId",
              displayExpr: "eylemAdi",
            }}
          />
          <Column caption="Başlangıç Tarihi" dataField="BaslangicTarihi" />
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
            allowedPageSizes="auto"
            displayMode="compact"
            visible={true}
          />
        </DataGrid>
      </div>
    </>
  );
}
