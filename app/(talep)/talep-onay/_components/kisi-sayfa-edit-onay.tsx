import { talepOnayla } from '@/actions/talep-onaylama';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import { fetcherGet } from '@/utils';
import DataGrid, {
  Button, Column, Editing,
  SearchPanel, Pager, Paging
} from 'devextreme-react/data-grid';
import { ColumnButtonClickEvent } from 'devextreme/ui/data_grid';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'

type KisiSayfaEdit = {
  kisiSayfaEditId: number;
  kisiId: number;
  ad: string;
  soyad: string;
  sayfaId: number;
  sayfaRoute: string;
  isPermitted: boolean | null; // Use `null` to explicitly allow it
  baslangicTarihi: string | null; // Assuming null or an ISO date string
  bitisTarihi: string | null;     // Assuming null or an ISO date string
};

interface Props {
  data: KisiSayfaEdit[];
}

export default function KisiSayfaEditOnay({ data }: Props) {
  const session = useSession();

  const [gridData, setGridData] = useState<KisiSayfaEdit[]>(data);
  const [eskiTalepler, setEskiTalepler] = useState([]);

  async function fetcher() {
    const responseJson = await fetcherGet("/Talep/kisi-sayfaEdit-eski-talepler", session.data?.token);
    console.log("responseJson: ", responseJson);

    setEskiTalepler(responseJson);
  }

  useEffect(() => {
    console.log("data: ", data);

    setGridData(data);
    fetcher();

  }, [data])

  async function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      // console.log('Onaylandı: ', item.row.data);
      const response = await talepOnayla(true, item.row.data.kisiSayfaEditId);
      if (!response) return;
      fetcher();
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
      talepOnayla(false, item.row.data.kisiSayfaEditId);
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
      <div className='border-2 p-2 rounded-md'>
        <DataGrid dataSource={gridData} >
          <SearchPanel visible={true} placeholder='Arama Yapın...' />
          <Editing
            mode="row"
            useIcons={true}
          />
          <Column dataField="ad" caption="Ad" />
          <Column dataField="soyad" caption="Soyad" />
          <Column dataField="sayfaRoute" caption="Sayfa" />
          <Column dataField="isPermitted" caption="Izin" />
          <Column dataField="baslangicTarihi" caption="Başlama Tarihi" />
          <Column dataField="bitisTarihi" caption="Bitiş Tarihi" />
          <Column type='buttons' width={120}>
            <Button hint='Onay' visible={true} onClick={(e) => onClick(true, e)} text='Onay' />
            <Button hint='Ret' visible={true} onClick={(e) => onClick(false, e)} text='Ret' />

          </Column>
        </DataGrid>
      </div>
      <div className='w-full mt-8'>
        <p className='font-semibold text-xl mb-4'>Kisi Yetki Geçmiş Talepler</p>
        <DataGrid dataSource={eskiTalepler}>
          <Paging defaultPageSize={5} />
          <Pager
            visible={true}
            allowedPageSizes={"auto"}
            displayMode={"compact"}
          />
        </DataGrid>
      </div>
    </>
  )
}
