import { talepOnayla } from "@/actions/talep-onaylama";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { IPreviousRolYetkiEdit, IWaitingRolYetkiEdit } from "@/types";
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
import { PreviousRolYetkiEdit } from "@/actions/previous-demands";
import { EylemTuruEnum } from "@/modals/eylemTuru";

const eylemTuruLookup = [
  { eylemTuruId: EylemTuruEnum.Oku, eylemAdi: "Oku" },
  { eylemTuruId: EylemTuruEnum.Yaz, eylemAdi: "Yaz" },
  { eylemTuruId: EylemTuruEnum.Engel, eylemAdi: "Engelle" },
];

interface Props {
  data: IWaitingRolYetkiEdit[];
  rolYetkiEdits: IPreviousRolYetkiEdit[];
}

export default function RolYetkiGrid({ data, rolYetkiEdits }: Props) {

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
          showBorders
          noDataText="Şu anda bekleyen talep bulunmamaktadır."
        >
          <SearchPanel visible={true} placeholder="Arama Yapın..." />
          <Editing mode="row" useIcons={true} />
          <Column dataField="RolAdi" caption="Rol Adı" />
          <Column dataField="YetkiAdi" caption="Yetki Adı" />
          <Column
            dataField="EylemTuruId"
            caption="Eylem Turu"
            lookup={{
              dataSource: eylemTuruLookup,
              valueExpr: "eylemTuruId",
              displayExpr: "eylemAdi",
            }}
          />
          <Column dataField="BaslangicTarihi" caption="Başlangıç Tarihi" />
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
