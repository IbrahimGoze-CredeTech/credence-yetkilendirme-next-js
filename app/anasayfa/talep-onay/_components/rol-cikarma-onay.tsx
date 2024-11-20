import { talepOnayla } from '@/actions/talep-onaylama';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import { WaitingRolCikarmaGridType, RolCikarmaTalepler } from '@/types';
import { fetcherGet } from '@/utils';
import DataGrid, {
  Button, Column, Editing,
  SearchPanel, Pager, Paging
} from 'devextreme-react/data-grid';
import { ColumnButtonClickEvent } from 'devextreme/ui/data_grid';
import { useSession } from 'next-auth/react';
import { Separator } from "@/components/ui/separator"

import React, { useEffect, useState } from 'react';

interface Props {
  data: WaitingRolCikarmaGridType[];
  rolCikarmaTalepler: RolCikarmaTalepler[];

}

export default function RolCikarmaGrid({ data, rolCikarmaTalepler }: Props) {
  const session = useSession();

  const [gridData, setGridData] = useState<WaitingRolCikarmaGridType[]>(data);
  const [talepGrid, setTalepGrid] = useState<RolCikarmaTalepler[]>([]);

  useEffect(() => {
    setGridData(data);
    setTalepGrid(rolCikarmaTalepler);
  }, [data, rolCikarmaTalepler])

  async function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    console.log("item1: ");
    if (item.row === undefined) return;
    console.log("item2: ");

    if (approved) {
      console.log('Onaylandı: ', item.row.data);
      const response = await talepOnayla(true, item.row.data.RolCikarmaId);
      if (!response) return;
      setGridData(prevData => prevData.filter(row => item.row && row.RolCikarmaId !== item.row.data.RolCikarmaId));
      const responseJson = await fetcherGet("/Talep/kisi-rolCikarma-talepler", session.data?.token);
      setTalepGrid(responseJson);
      toast({
        variant: "success",
        title: "Onaylandı",
        description: "Talebiniz başarıyla onaylandı",
        action: (
          <ToastAction altText="Goto schedule to undo" onClick={() => {
            console.log("undo clicked");
          }}>Iptal</ToastAction>
        )
      });
    }
    else {
      console.log('Reddedildi: ', item.row.data);
      await talepOnayla(false, item.row.data.RolCikarmaId);
      toast({
        variant: "destructive",
        title: "Reddedildi",
        description: "Talebiniz başarıyla reddedildi ve supervisor onayı beklemektedir.",
        action: (
          <ToastAction altText="Goto schedule to undo" onClick={() => {
            console.log("undo clicked");
          }}>Iptal</ToastAction>
        )
      });
    }
  }

  return (
    <>
      <div className='p-2 rounded-md'>
        <DataGrid dataSource={gridData} showBorders>
          <SearchPanel visible={true} placeholder='Arama Yapın...' />
          <Editing
            mode="row"
            useIcons={true}
          />
          <Column dataField="RolCikarmaId" caption='Rol Cikarma Id' visible={false} />
          <Column dataField="RolAdi" caption="Rol Adı" />
          <Column dataField="KisiAdi" caption="Kişi Ad" />
          <Column dataField="RolCikarmaTarihi" caption="Rol Bitiş Tarihi" />
          <Column type='buttons' width={120}>
            <Button hint='Onay' visible={true} onClick={(e) => onClick(true, e)} text='Onay' />
            <Button hint='Ret' visible={true} onClick={(e) => onClick(false, e)} text='Ret' />

          </Column>
        </DataGrid>
      </div>

    </>
  )
}
