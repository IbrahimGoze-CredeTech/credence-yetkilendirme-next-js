'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import RolAtamaGrid from "./_components/rol-atama-onay"
import RolCikarmaGrid from "./_components/rol-cikarma-onay"
import KisiYetkiOnay from "./_components/kisi-yetki-onay"
import { IPreviousKisiSayfaAtama, IPreviousKisiSayfaEdit, IPreviousKisiYetkiEdit, IPreviousRolAtama, IPreviousRolCikarma, IWaitingKisiSayfaAtama, IWaitingKisiSayfaEdit, IWaitingKisiYetkiEdit, IWaitingRolAtama, IWaitingRolCikarma } from "@/types"
import KisiSayfaEditOnay from "./_components/kisi-sayfa-edit-onay"
import KisiSayfaAtamaOnay from "./_components/kisi-sayfa-atama-onay"

interface Props {
  waitingRolAtamalar: IWaitingRolAtama[]
  waitingRolCikarmalar: IWaitingRolCikarma[]
  waitingKisiYetkiEdit: IWaitingKisiYetkiEdit[]
  waitingKisiSayfaAtama: IWaitingKisiSayfaAtama[]
  waitingKisiSayfaEdit: IWaitingKisiSayfaEdit[]
  previousRolAtama: IPreviousRolAtama[]
  previousRolCikarma: IPreviousRolCikarma[]
  previousKisiYetkiEdit: IPreviousKisiYetkiEdit[]
  previousKisiSayfaAtama: IPreviousKisiSayfaAtama[]
  previousKisiSayfaEdit: IPreviousKisiSayfaEdit[]
}

export function TalepOnayClient({
  waitingRolAtamalar,
  waitingRolCikarmalar,
  waitingKisiYetkiEdit,
  waitingKisiSayfaAtama,
  waitingKisiSayfaEdit,
  previousRolAtama,
  previousRolCikarma,
  previousKisiYetkiEdit,
  previousKisiSayfaAtama,
  previousKisiSayfaEdit
}: Props) {

  return (
    <Tabs defaultValue="rol-atama" className="w-[95vw] flex flex-col items-center justify-center p-4">
      <TabsList className='bg-gray-200 p-2 py-6'>
        <TabsTrigger className='text-xl' value="rol-atama">Rol Atama</TabsTrigger>
        <TabsTrigger className='text-xl' value="rol-cikarma">Rol Çıkarma</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-yetki">Kişi Yetki</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-sayfa-atama">Kişi Sayfa Atama</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-sayfa-edit">Kişi Sayfa Edit</TabsTrigger>
      </TabsList>
      <TabsContent value="rol-atama"><RolAtamaGrid data={waitingRolAtamalar} rolAtamaTalepler={previousRolAtama} /></TabsContent>
      <TabsContent value="rol-cikarma"><RolCikarmaGrid data={waitingRolCikarmalar} rolCikarmaTalepler={previousRolCikarma} /></TabsContent>
      <TabsContent value="kisi-yetki"><KisiYetkiOnay data={waitingKisiYetkiEdit} kisiYetkiEditTalepler={previousKisiYetkiEdit} /></TabsContent>
      <TabsContent value="kisi-sayfa-edit"><KisiSayfaEditOnay data={waitingKisiSayfaEdit} previousKisiSayfaEdit={previousKisiSayfaEdit} /></TabsContent>
      <TabsContent value="kisi-sayfa-atama"><KisiSayfaAtamaOnay data={waitingKisiSayfaAtama} previousKisiSayfaAtama={previousKisiSayfaAtama} /></TabsContent>
    </Tabs>
  )
}