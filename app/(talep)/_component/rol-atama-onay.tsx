import { talepOnayla } from '@/actions/talep-onaylama';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import { RolAtamaGridType } from '@/types';
import DataGrid, {
  Button, Column, Editing,
  SearchPanel
} from 'devextreme-react/data-grid';
import { ColumnButtonClickEvent } from 'devextreme/ui/data_grid';
import React from 'react';

interface Props {
  data: RolAtamaGridType[];
}

export default function RolAtamaGrid({ data }: Props) {

  function onClick(approved: boolean, item: ColumnButtonClickEvent) {
    if (item.row === undefined) return;
    if (approved) {
      // console.log('Onaylandı: ', item.row.data);
      talepOnayla(true, item.row.data.rolAtamaId);
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
    <DataGrid dataSource={data}>
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
  )
}
