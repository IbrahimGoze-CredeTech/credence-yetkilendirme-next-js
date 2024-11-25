import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import SayfaEkleForm from "./sayfa-ekle-form"
import SayfaSilForm from "./sayfa-sil-form"

export default function SayfaTabs() {
  return (
    <Tabs defaultValue="sayfa-ekle" className="w-[95vw] flex flex-col items-center justify-center p-4" >
      <TabsList className='bg-gray-200 p-2 py-6'>
        <TabsTrigger className='text-xl' value="sayfa-ekle">Sayfa Ekle</TabsTrigger>
        <TabsTrigger className='text-xl' value="sayfa-sil">Sayfa Sil</TabsTrigger>
      </TabsList>
      <TabsContent value="sayfa-ekle"><SayfaEkleForm /></TabsContent>
      <TabsContent value="sayfa-sil"><SayfaSilForm /></TabsContent>
    </Tabs>
  )
}
