'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RolAtamaForm from './_components/rol-atama-form';
import YetkiEditForm from './_components/yetki-edit-form';
import RolCikarmaForm from './_components/rol-cikarma-form';

import RolSayfaAtamaForm from './_components/rol-sayfa-atama-form';
import KisiSayfaAtamaForm from './_components/kisi-sayfa-atama-form';

export default function TalepYaratPage() {

  return (
    <div className='flex flex-col items-center justify-center w-full p-4 space-y-8'>
      <h1 className='font-bold text-4xl'>Talep Yarat</h1>
      <Tabs defaultValue="rol-atama" className="w-[95vw] flex flex-col items-center justify-center p-2" >
        <TabsList className='bg-gray-200 p-2 py-6'>
          <TabsTrigger className='text-xl' value="rol-atama">Rol Atama</TabsTrigger>
          <TabsTrigger className='text-xl' value="rol-cikarma">Rol Çıkarma</TabsTrigger>
          <TabsTrigger className='text-xl' value="yetki">Yetki</TabsTrigger>
          <TabsTrigger className='text-xl' value="kisi-sayfa">Kişi Sayfa Atama</TabsTrigger>
          <TabsTrigger className='text-xl' value="rol-sayfa">Rol Sayfa Atama</TabsTrigger>

        </TabsList>
        <TabsContent value="rol-atama"><RolAtamaForm /></TabsContent>
        <TabsContent value="rol-cikarma"><RolCikarmaForm /></TabsContent>
        <TabsContent value="yetki"><YetkiEditForm /></TabsContent>
        <TabsContent value="kisi-sayfa"><KisiSayfaAtamaForm /></TabsContent>
        <TabsContent value="rol-sayfa"><RolSayfaAtamaForm /></TabsContent>

      </Tabs>
    </div>
  )
}


