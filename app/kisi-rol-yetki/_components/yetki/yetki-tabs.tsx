import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import YetkiEkleForm from "./yetki-ekle-form"
import YetkiSilForm from "./yetki-sil-form"

export default function YetkiTabs() {
  return (
    <Tabs defaultValue="yetki-ekle" className="w-[95vw] flex flex-col items-center justify-center p-4" >
      <TabsList className='bg-gray-200 p-2 py-6'>
        <TabsTrigger className='text-xl' value="yetki-ekle">Yetki Ekle</TabsTrigger>
        <TabsTrigger className='text-xl' value="yetki-sil">Yetki Sil</TabsTrigger>
      </TabsList>
      <TabsContent value="yetki-ekle"><YetkiEkleForm /></TabsContent>
      <TabsContent value="yetki-sil"><YetkiSilForm /></TabsContent>
    </Tabs>
  )
}
