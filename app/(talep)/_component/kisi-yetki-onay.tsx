import { talepOnayla } from '@/actions/talep-onaylama';
import { ToastAction } from '@/components/ui/toast';
// import { ekstraYetkilerDataGridConfig } from '@/configs/ekstra-yetkiler-data-grid-config';
import { toast } from '@/hooks/use-toast';
import { EylemTuruEnum } from '@/modals/eylemTuru';
import { KisiYetkiEditGridType } from '@/types';
import DataGrid, {
  Button, Column, Editing,
  SearchPanel
} from 'devextreme-react/data-grid';
import { ColumnButtonClickEvent } from 'devextreme/ui/data_grid';
import React from 'react';

const eylemTuruLookup = [
  { eylemTuruId: EylemTuruEnum.Oku, eylemAdi: "Oku" },
  { eylemTuruId: EylemTuruEnum.Yaz, eylemAdi: "Yaz" },
  { eylemTuruId: EylemTuruEnum.Engel, eylemAdi: "Engelle" },
];

interface Props {
  data: KisiYetkiEditGridType[];
}

export default function KisiYetkiOnay({ data }: Props) {

  function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      // console.log('Onaylandı: ', item.row.data);
      talepOnayla(true, item.row.data.kisiYetkiEditId);
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
      talepOnayla(false, item.row.data.kisiYetkiEditId);
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
    <DataGrid dataSource={data} >
      <SearchPanel visible={true} placeholder='Arama Yapın...' />
      <Editing
        mode="row"
        useIcons={true}
      />
      <Column dataField="yetkiAdi" caption="Yetki Adı" />
      <Column dataField="kisiAdi" caption="Kişi Ad" />
      <Column dataField="eylemTuruId" caption="Eylem Turu" lookup={{ dataSource: eylemTuruLookup, valueExpr: "eylemTuruId", displayExpr: "eylemAdi" }} />
      <Column dataField="yetkiBaslamaTarihi" caption="Yetki Başlama Tarihi" />
      <Column dataField="yetkiBitisTarihi" caption="Yetki Bitiş Tarihi" />
      <Column type='buttons' width={120}>
        <Button hint='Onay' visible={true} onClick={(e) => onClick(true, e)} text='Onay' />
        <Button hint='Ret' visible={true} onClick={(e) => onClick(false, e)} text='Ret' />

      </Column>
    </DataGrid>
  )
}
