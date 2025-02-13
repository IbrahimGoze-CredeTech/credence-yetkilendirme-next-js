'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { IPreviousKisiSayfaAtama, IPreviousKisiSayfaCikarma, IPreviousKisiSayfaEdit, IPreviousKisiYetkiEdit, IPreviousRolAtama, IPreviousRolCikarma, IPreviousRolSayfaAtama, IPreviousRolSayfaCikarma, IPreviousRolYetkiEdit, IWaitingKisiSayfaAtama, IWaitingKisiSayfaCikarma, IWaitingKisiSayfaEdit, IWaitingKisiYetkiEditType, IWaitingRolAtamaType, IWaitingRolCikarmaType, IWaitingRolSayfaAtama, IWaitingRolSayfaCikarma, IWaitingRolYetkiEdit } from "@/types"
import KisiSayfaAtamaOnay from "./_components/kisi-sayfa-atama-onay"
import KisiSayfaCikarmaOnay from "./_components/kisi-sayfa-cikarma-onay"
import KisiSayfaEditOnay from "./_components/kisi-sayfa-edit-onay"
import KisiYetkiOnay from "./_components/kisi-yetki-onay"
import RolAtamaGrid from "./_components/rol-atama-onay"
import RolCikarmaGrid from "./_components/rol-cikarma-onay"
import RolSayfaAtamaOnay from "./_components/rol-sayfa-atama-onay"
import RolSayfaCikarmaOnay from "./_components/rol-sayfa-cikarma-onay"
import RolYetkiGrid from "./_components/rol-yetki-onay"

interface IProps {
  waitingRolAtamalar: IWaitingRolAtamaType[]
  waitingRolCikarmalar: IWaitingRolCikarmaType[]
  waitingKisiYetkiEdit: IWaitingKisiYetkiEditType[]
  waitingKisiSayfaAtama: IWaitingKisiSayfaAtama[]
  waitingKisiSayfaCikarma: IWaitingKisiSayfaCikarma[]
  waitingKisiSayfaEdit: IWaitingKisiSayfaEdit[]
  waitingRolSayfaAtama: IWaitingRolSayfaAtama[]
  waitingRolSayfaCikarma: IWaitingRolSayfaCikarma[]
  waitingRolYetkiEdit: IWaitingRolYetkiEdit[]
  previousRolAtama: IPreviousRolAtama[]
  previousRolCikarma: IPreviousRolCikarma[]
  previousKisiYetkiEdit: IPreviousKisiYetkiEdit[]
  previousKisiSayfaAtama: IPreviousKisiSayfaAtama[]
  previousKisiSayfaCikarma: IPreviousKisiSayfaCikarma[]
  previousKisiSayfaEdit: IPreviousKisiSayfaEdit[]
  previousRolSayfaAtama: IPreviousRolSayfaAtama[]
  previousRolSayfaCikarma: IPreviousRolSayfaCikarma[]
  previousRolYetkiEdit: IPreviousRolYetkiEdit[]
}

export function TalepOnayClient({
  waitingRolAtamalar,
  waitingRolCikarmalar,
  waitingKisiYetkiEdit,
  waitingKisiSayfaAtama,
  waitingKisiSayfaCikarma,
  waitingKisiSayfaEdit,
  waitingRolSayfaAtama,
  waitingRolSayfaCikarma,
  waitingRolYetkiEdit,
  previousRolAtama,
  previousRolCikarma,
  previousKisiYetkiEdit,
  previousKisiSayfaAtama,
  previousKisiSayfaCikarma,
  previousKisiSayfaEdit,
  previousRolSayfaAtama,
  previousRolSayfaCikarma,
  previousRolYetkiEdit
}: IProps) {

  return (
    <Tabs className="w-[95vw] flex flex-col items-center justify-center p-4" defaultValue="rol-atama">
      <TabsList className='bg-gray-200 p-2 py-6'>
        <TabsTrigger className='text-xl' value="rol-atama">Rol Atama</TabsTrigger>
        <TabsTrigger className='text-xl' value="rol-cikarma">Rol Çıkarma</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-yetki">Kişi Yetki</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-sayfa-atama">Kişi Sayfa Atama</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-sayfa-cikarma">Kişi Sayfa Cikarma</TabsTrigger>
        <TabsTrigger className='text-xl' value="kisi-sayfa-edit">Kişi Sayfa Edit</TabsTrigger>
        <TabsTrigger className='text-xl' value="rol-sayfa-atama">Rol Sayfa Atama</TabsTrigger>
        <TabsTrigger className='text-xl' value="rol-sayfa-cikarma">Rol Sayfa Çıkarma</TabsTrigger>
        <TabsTrigger className='text-xl' value="rol-yetki-edit">Rol Yetki Edit</TabsTrigger>
      </TabsList>
      <TabsContent value="rol-atama"><RolAtamaGrid data={waitingRolAtamalar} rolAtamaTalepler={previousRolAtama} /></TabsContent>
      <TabsContent value="rol-cikarma"><RolCikarmaGrid data={waitingRolCikarmalar} rolCikarmaTalepler={previousRolCikarma} /></TabsContent>
      <TabsContent value="kisi-yetki"><KisiYetkiOnay data={waitingKisiYetkiEdit} kisiYetkiEditTalepler={previousKisiYetkiEdit} /></TabsContent>
      <TabsContent value="kisi-sayfa-atama"><KisiSayfaAtamaOnay data={waitingKisiSayfaAtama} previousKisiSayfaAtama={previousKisiSayfaAtama} /></TabsContent>
      <TabsContent value="kisi-sayfa-cikarma"><KisiSayfaCikarmaOnay data={waitingKisiSayfaCikarma} previousKisiSayfaAtama={previousKisiSayfaCikarma} /></TabsContent>
      <TabsContent value="kisi-sayfa-edit"><KisiSayfaEditOnay data={waitingKisiSayfaEdit} previousKisiSayfaEdit={previousKisiSayfaEdit} /></TabsContent>
      <TabsContent value="rol-sayfa-atama"><RolSayfaAtamaOnay data={waitingRolSayfaAtama} previousKisiSayfaAtama={previousRolSayfaAtama} /></TabsContent>
      <TabsContent value="rol-sayfa-cikarma"><RolSayfaCikarmaOnay data={waitingRolSayfaCikarma} previousKisiSayfaAtama={previousRolSayfaCikarma} /></TabsContent>
      <TabsContent value="rol-yetki-edit"><RolYetkiGrid data={waitingRolYetkiEdit} rolYetkiEdits={previousRolYetkiEdit} /></TabsContent>
    </Tabs>
  )
}