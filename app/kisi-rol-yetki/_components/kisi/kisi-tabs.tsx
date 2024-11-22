import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import KisiEkleForm from "./kisi-ekle-form"
import KisiSilForm from "./kisi-sil-form"

export default function KisiTabs() {
  return (
    <Tabs defaultValue="kisi-ekle" className="w-[95vw] flex flex-col items-center justify-center p-4" >
      <TabsList className='bg-gray-200 p-2 py-6'>
        <TabsTrigger className='text-xl' value="kisi-ekle">Kişi Ekle</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-sil">Kişi Sil</TabsTrigger>
      </TabsList>
      <TabsContent value="kisi-ekle"><KisiEkleForm /></TabsContent>
      <TabsContent value="kisi-sil"><KisiSilForm /></TabsContent>
    </Tabs>
  )
}
