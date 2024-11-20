'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import RolAtamaGrid from "./_components/rol-atama-onay"
import RolCikarmaGrid from "./_components/rol-cikarma-onay"
import KisiYetkiOnay from "./_components/kisi-yetki-onay"
// import KisiSayfaEditOnay from "./_components/kisi-sayfa-edit-onay"
import { PreviousKisiSayfaEditDetails, PreviousKisiYetkiEditDetails, PreviousRolAtamaDetails, PreviousRolCikarmaDetails, WaitingKisiSayfaEditGridType, WaitingKisiYetkiEditGridType, WaitingRolAtamaGridType, WaitingRolCikarmaGridType } from "@/types"
import KisiSayfaEditOnay from "./_components/kisi-sayfa-edit-onay"

interface Props {
  rolAtamalar: WaitingRolAtamaGridType[]
  rolCikarmalar: WaitingRolCikarmaGridType[]
  kisiYetkiEdit: WaitingKisiYetkiEditGridType[]
  rolAtamaTalepler: PreviousRolAtamaDetails[]
  rolCikarmaTalepler: PreviousRolCikarmaDetails[]
  kisiYetkiEditTalepler: PreviousKisiYetkiEditDetails[]
  kisiSayfaEdit: WaitingKisiSayfaEditGridType[]
  previousKisiSayfaEdit: PreviousKisiSayfaEditDetails[];
}

export function TalepOnayClient({
  rolAtamalar,
  rolCikarmalar,
  kisiYetkiEdit,
  rolAtamaTalepler,
  rolCikarmaTalepler,
  kisiYetkiEditTalepler,
  kisiSayfaEdit,
  previousKisiSayfaEdit
}: Props) {
  return (
    <Tabs defaultValue="rol-atama" className="w-[95vw] flex flex-col items-center justify-center p-4">
      <TabsList className='bg-gray-200 p-2 py-6'>
        <TabsTrigger className='text-xl' value="rol-atama">Rol Atama</TabsTrigger>
        <TabsTrigger className='text-xl' value="rol-cikarma">Rol Çıkarma</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-yetki">Kişi Yetki</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-sayfa-edit">Kişi Sayfa Edit</TabsTrigger>
      </TabsList>
      <TabsContent value="rol-atama"><RolAtamaGrid data={rolAtamalar} rolAtamaTalepler={rolAtamaTalepler} /></TabsContent>
      <TabsContent value="rol-cikarma"><RolCikarmaGrid data={rolCikarmalar} rolCikarmaTalepler={rolCikarmaTalepler} /></TabsContent>
      <TabsContent value="kisi-yetki"><KisiYetkiOnay data={kisiYetkiEdit} kisiYetkiEditTalepler={kisiYetkiEditTalepler} /></TabsContent>
      <TabsContent value="kisi-sayfa-edit"><KisiSayfaEditOnay data={kisiSayfaEdit} previousKisiSayfaEdit={previousKisiSayfaEdit} /></TabsContent>
    </Tabs>
  )
}