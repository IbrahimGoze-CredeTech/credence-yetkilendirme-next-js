'use client'

import { KisiAccessibleRoutes, KisiYetkiView, RoleAccessibleRoutes, RolYetkiView } from '@prisma/client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import React from 'react'
import KisiSayfaView from './_tabs/kisi-sayfa-view'
import RolSayfaView from './_tabs/rol-sayfa-view'
import RoleYetkiView from './_tabs/rol-yetki-view'
import KisiYetki_View from './_tabs/kisi-yetki-view'

interface ViewsClientProps {
  kisiAccessibleRoutes: KisiAccessibleRoutes[]
  roleAccessibleRoutes: RoleAccessibleRoutes[]
  roleYetkiView: RolYetkiView[]
  kisiYetkiView: KisiYetkiView[]
}

export default function ViewsClient({ kisiAccessibleRoutes, roleAccessibleRoutes, roleYetkiView, kisiYetkiView }: ViewsClientProps) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Tabs defaultValue="kisi-sayfa-view" className="w-[95vw] flex flex-col items-center justify-center p-4">
        <TabsList className='bg-gray-200 p-2 py-6'>
          <TabsTrigger className='text-xl' value="kisi-sayfa-view">Kişiler ve Sayfalar</TabsTrigger>
          <TabsTrigger className='text-xl' value="rol-sayfa-view">Roller ve Sayfalar</TabsTrigger>
          <TabsTrigger className='text-xl' value="rol-yetki-view">Roller ve Yetkiler</TabsTrigger>
          <TabsTrigger className='text-xl' value="kisi-yetki-view">Kişi ve Yetkiler</TabsTrigger>
        </TabsList>
        <TabsContent value="kisi-sayfa-view"><KisiSayfaView kisiAccessibleRoutes={kisiAccessibleRoutes} /></TabsContent>
        <TabsContent value="rol-sayfa-view"><RolSayfaView roleAccessibleRoutes={roleAccessibleRoutes} /></TabsContent>
        <TabsContent value="rol-yetki-view"><RoleYetkiView roleYetkiView={roleYetkiView} /></TabsContent>
        <TabsContent value="kisi-yetki-view"><KisiYetki_View kisiYetkiView={kisiYetkiView} /></TabsContent>
      </Tabs>
    </div>
  )
}
