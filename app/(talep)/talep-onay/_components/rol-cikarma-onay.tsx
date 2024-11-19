import { talepOnayla } from "@/actions/talep-onaylama";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { RolCikarmaGridType, RolCikarmaTalepler } from "@/types";
import { fetcherGet } from "@/utils";
import DataGrid, {
  Button,
  Column,
  Editing,
  SearchPanel,
  Pager,
  Paging,
} from "devextreme-react/data-grid";
import { ColumnButtonClickEvent } from "devextreme/ui/data_grid";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

import React, { useEffect, useState } from "react";

interface Props {
  data: RolCikarmaGridType[];
  rolCikarmaTalepler: RolCikarmaTalepler[];
}

export default function RolCikarmaGrid({ data, rolCikarmaTalepler }: Props) {
  const session = useSession();

  const [gridData, setGridData] = useState<RolCikarmaGridType[]>(data);
  const [talepGrid, setTalepGrid] = useState<RolCikarmaTalepler[]>([]);

  useEffect(() => {
    setGridData(data);
    setTalepGrid(rolCikarmaTalepler);
  }, [data, rolCikarmaTalepler]);

  async function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      // console.log('Onaylandı: ', item.row.data);
      const response = await talepOnayla(true, item.row.data.rolCikarmaId);
      if (!response) return;
      setGridData((prevData) =>
        prevData.filter(
          (row) => item.row && row.rolCikarmaId !== item.row.data.rolCikarmaId
        )
      );
      const responseJson = await fetcherGet(
        "/Talep/kisi-rolCikarma-talepler",
        session.data?.token
      );
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
      talepOnayla(false, item.row.data.rolCikarmaId);
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
          <Column dataField="rolAdi" caption="Rol Adı" />
          <Column dataField="kisiAdi" caption="Kişi Ad" />
          <Column dataField="rolCikarmaTarihi" caption="Rol Bitiş Tarihi" />
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
