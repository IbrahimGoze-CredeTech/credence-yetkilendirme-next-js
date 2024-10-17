import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RolAtamaGridType } from '@/types';
import React from 'react'

interface Props {
  data: RolAtamaGridType[];
}

export default function RolAtamaGrid({ data }: Props) {
  function onClick(approved: boolean, item: RolAtamaGridType) {
    if (approved) {
      console.log('Onaylandı: ', item);
    }
  }
  return (
    <Table className='border rounded-md'>
      <TableHeader className='rounded-md'>
        <TableRow>
          <TableHead className="w-[100px]">Rol Adı</TableHead>
          <TableHead>Kişi Ad</TableHead>
          <TableHead>Rol Başlangıç Tarihi</TableHead>
          <TableHead className="text-right">Rol Bitiş Tarihi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.rolAdi}</TableCell>
            <TableCell>{item.kisiAdi}</TableCell>
            <TableCell>{item.rolBaslangicTarihi?.toLocaleDateString('tr-TR')}</TableCell>
            <TableCell className="text-right">{item.rolBitisTarihi?.toLocaleDateString('tr-TR')}</TableCell>
            <TableCell className="space-x-4">
              <Button onClick={() => onClick(true, item)}>Onay</Button>
              <Button onClick={() => onClick(false, item)}>Ret</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>Onay Bekleyen Talepler</TableCaption>
    </Table>
    // <DataGrid dataSource={data}></DataGrid>
  )
}
