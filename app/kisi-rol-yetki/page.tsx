import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import KisiForm from './_components/kisi-form'


export default function KisiRolYetkiPage() {
  // TODO: get kisi rol yetki in staticTableContext
  return (
    <div className='flex flex-col items-center justify-center w-full p-4 space-y-8'>
      <h1 className='font-bold text-4xl'>Onay Bekleyen Talepler</h1>
      <Tabs defaultValue="kisi-form" className="w-[95vw] flex flex-col items-center justify-center p-4" >
        <TabsList className='bg-gray-200 p-2 py-6'>
          <TabsTrigger className='text-xl' value="kisi-form">Kişi</TabsTrigger>
          <TabsTrigger className='text-xl' value="rol-cikarma">Rol Çıkarma</TabsTrigger>
          <TabsTrigger className='text-xl' value="kisi-yetki">Kişi Yetki</TabsTrigger>
        </TabsList>
        <TabsContent value="kisi-form"><KisiForm /></TabsContent>
        <TabsContent value="rol-cikarma">rol</TabsContent>
        <TabsContent value="kisi-yetki">yetki</TabsContent>
      </Tabs>

    </div>
  )
}
