import { talepOnayla } from '@/actions/talep-onaylama';
import { Separator } from '@/components/ui/separator';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import { RolAtamaGridType, RolAtamaTalepler } from '@/types';
import { fetcherGet } from '@/utils';
import DataGrid, {
  Button, Column, Editing,
  SearchPanel, Pager, Paging
} from 'devextreme-react/data-grid';
import { ColumnButtonClickEvent } from 'devextreme/ui/data_grid';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

interface Props {
  data: RolAtamaGridType[];
  rolAtamaTalepler: RolAtamaTalepler[];
}

export default function RolAtamaGrid({ data, rolAtamaTalepler }: Props) {
  const session = useSession();

  const [gridData, setGridData] = useState<RolAtamaGridType[]>(data);
  const [talepGrid, setTalepGrid] = useState<RolAtamaTalepler[]>([]);

  useEffect(() => {
    setGridData(data);
    setTalepGrid(rolAtamaTalepler);
  }, [data, rolAtamaTalepler])


  async function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      // console.log('Onaylandı: ', item.row.data);
      const response = await talepOnayla(true, item.row.data.rolAtamaId);

      if (!response) return;
      setGridData(prevData => prevData.filter(row => item.row && row.rolAtamaId !== item.row.data.rolAtamaId));
      const responseJson = await fetcherGet("/Talep/kisi-rolAtama-talepler", session.data?.token);
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
      // console.log('Reddedildi: ', item.row.data);
      talepOnayla(false, item.row.data.rolAtamaId);

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
      <div className=' p-2 rounded-md'>
        <DataGrid dataSource={gridData} showBorders>
          <SearchPanel visible={true} placeholder='Arama Yapın...' />
          <Editing
            mode="row"
            useIcons={true}
          />
          <Column dataField="rolAdi" caption="Rol Adı" />
          <Column dataField="kisiAdi" caption="Kişi Ad" />
          <Column dataField="rolBaslangicTarihi" caption="Rol Başlangıç Tarihi" />
          <Column dataField="rolBitisTarihi" caption="Rol Bitiş Tarihi" />
          <Column type='buttons' width={120}>
            <Button hint='Onay' visible={true} onClick={(e) => onClick(true, e)} text='Onay' />
            <Button hint='Ret' visible={true} onClick={(e) => onClick(false, e)} text='Ret' />

          </Column>
        </DataGrid>
      </div>


    </>
  )
}
