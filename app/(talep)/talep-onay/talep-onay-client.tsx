'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import RolAtamaGrid from "./_components/rol-atama-onay"
import RolCikarmaGrid from "./_components/rol-cikarma-onay"
import KisiYetkiOnay from "./_components/kisi-yetki-onay"
import { IPreviousKisiSayfaAtama, IPreviousKisiSayfaCikarma, IPreviousKisiSayfaEdit, IPreviousKisiYetkiEdit, IPreviousRolAtama, IPreviousRolCikarma, IPreviousRolSayfaAtama, IWaitingKisiSayfaAtama, IWaitingKisiSayfaCikarma, IWaitingKisiSayfaEdit, IWaitingKisiYetkiEdit, IWaitingRolAtama, IWaitingRolCikarma, IWaitingRolSayfaAtama } from "@/types"
import KisiSayfaEditOnay from "./_components/kisi-sayfa-edit-onay"
import KisiSayfaAtamaOnay from "./_components/kisi-sayfa-atama-onay"
import KisiSayfaCikarmaOnay from "./_components/kisi-sayfa-cikarma-onay"
import RolSayfaAtamaOnay from "./_components/rol-sayfa-atama-onay"

interface Props {
  waitingRolAtamalar: IWaitingRolAtama[]
  waitingRolCikarmalar: IWaitingRolCikarma[]
  waitingKisiYetkiEdit: IWaitingKisiYetkiEdit[]
  waitingKisiSayfaAtama: IWaitingKisiSayfaAtama[]
  waitingKisiSayfaCikarma: IWaitingKisiSayfaCikarma[]
  waitingKisiSayfaEdit: IWaitingKisiSayfaEdit[]
  waitingRolSayfaAtama: IWaitingRolSayfaAtama[]
  previousRolAtama: IPreviousRolAtama[]
  previousRolCikarma: IPreviousRolCikarma[]
  previousKisiYetkiEdit: IPreviousKisiYetkiEdit[]
  previousKisiSayfaAtama: IPreviousKisiSayfaAtama[]
  previousKisiSayfaCikarma: IPreviousKisiSayfaCikarma[]
  previousKisiSayfaEdit: IPreviousKisiSayfaEdit[]
  previousRolSayfaAtama: IPreviousRolSayfaAtama[]
}

export function TalepOnayClient({
  waitingRolAtamalar,
  waitingRolCikarmalar,
  waitingKisiYetkiEdit,
  waitingKisiSayfaAtama,
  waitingKisiSayfaCikarma,
  waitingKisiSayfaEdit,
  waitingRolSayfaAtama,
  previousRolAtama,
  previousRolCikarma,
  previousKisiYetkiEdit,
  previousKisiSayfaAtama,
  previousKisiSayfaCikarma,
  previousKisiSayfaEdit,
  previousRolSayfaAtama
}: Props) {

  return (
    <Tabs defaultValue="rol-atama" className="w-[95vw] flex flex-col items-center justify-center p-4">
      <TabsList className='bg-gray-200 p-2 py-6'>
        <TabsTrigger className='text-xl' value="rol-atama">Rol Atama</TabsTrigger>
        <TabsTrigger className='text-xl' value="rol-cikarma">Rol Çıkarma</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-yetki">Kişi Yetki</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-sayfa-atama">Kişi Sayfa Atama</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-sayfa-cikarma">Kişi Sayfa Cikarma</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-sayfa-edit">Kişi Sayfa Edit</TabsTrigger>
        <TabsTrigger className='text-xl' value="rol-sayfa-atama">Rol Sayfa Atama</TabsTrigger>
      </TabsList>
      <TabsContent value="rol-atama"><RolAtamaGrid data={waitingRolAtamalar} rolAtamaTalepler={previousRolAtama} /></TabsContent>
      <TabsContent value="rol-cikarma"><RolCikarmaGrid data={waitingRolCikarmalar} rolCikarmaTalepler={previousRolCikarma} /></TabsContent>
      <TabsContent value="kisi-yetki"><KisiYetkiOnay data={waitingKisiYetkiEdit} kisiYetkiEditTalepler={previousKisiYetkiEdit} /></TabsContent>
      <TabsContent value="kisi-sayfa-atama"><KisiSayfaAtamaOnay data={waitingKisiSayfaAtama} previousKisiSayfaAtama={previousKisiSayfaAtama} /></TabsContent>
      <TabsContent value="kisi-sayfa-cikarma"><KisiSayfaCikarmaOnay data={waitingKisiSayfaCikarma} previousKisiSayfaAtama={previousKisiSayfaCikarma} /></TabsContent>
      <TabsContent value="kisi-sayfa-edit"><KisiSayfaEditOnay data={waitingKisiSayfaEdit} previousKisiSayfaEdit={previousKisiSayfaEdit} /></TabsContent>
      <TabsContent value="rol-sayfa-atama"><RolSayfaAtamaOnay data={waitingRolSayfaAtama} previousKisiSayfaAtama={previousRolSayfaAtama} /></TabsContent>
    </Tabs>
  )
}