import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import KisiTabs from './_components/kisi/kisi-tabs';
import RolTabs from './_components/rol/rol-tabs';
import YetkiTabs from './_components/yetki/yetki-tabs';
import SayfaTabs from './_components/sayfa/sayfa-tabs';

export default function KisiRolYetkiPage() {
  // TODO: get kisi rol yetki in staticTableContext
  return (
    <div className='flex flex-col items-center justify-center w-full p-4 space-y-8'>
      <h1 className='font-bold text-4xl'>Ekle-Sil</h1>
      <Tabs
        defaultValue='kisi-form'
        className='w-[95vw] flex flex-col items-center justify-center p-4'>
        <TabsList className='bg-gray-200 p-2 py-6'>
          <TabsTrigger className='text-xl' value='kisi-form'>
            Kişi
          </TabsTrigger>
          <TabsTrigger className='text-xl' value='rol-form'>
            Rol
          </TabsTrigger>
          <TabsTrigger className='text-xl' value='yetki-form'>
            Yetki
          </TabsTrigger>
          <TabsTrigger className='text-xl' value='sayfa-form'>
            Sayfa
          </TabsTrigger>
        </TabsList>
        <TabsContent value='kisi-form'>
          <KisiTabs />
        </TabsContent>
        <TabsContent value='rol-form'>
          <RolTabs />
        </TabsContent>
        <TabsContent value='yetki-form'>
          <YetkiTabs />
        </TabsContent>
        <TabsContent value='sayfa-form'>
          <SayfaTabs />
        </TabsContent>
      </Tabs>
    </div>
  );
}
