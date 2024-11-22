import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import RolEkleForm from "./rol-ekle-form"
import RolSilForm from "./rol-sil-form"

export default function RolTabs() {
  return (
    <Tabs defaultValue="rol-ekle" className="w-[95vw] flex flex-col items-center justify-center p-4" >
      <TabsList className='bg-gray-200 p-2 py-6'>
        <TabsTrigger className='text-xl' value="rol-ekle">Rol Ekle</TabsTrigger>
        <TabsTrigger className='text-xl' value="rol-sil">Rol Sil</TabsTrigger>
      </TabsList>
      <TabsContent value="rol-ekle"><RolEkleForm /></TabsContent>
      <TabsContent value="rol-sil"><RolSilForm /></TabsContent>
    </Tabs>
  )
}
