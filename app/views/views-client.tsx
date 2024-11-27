'use client'

import { KisiAccessibleRoutes, RoleAccessibleRoutes, RolYetkiView } from '@prisma/client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import React from 'react'
import KisiSayfaView from './_tabs/kisi-sayfa-view'
import RolSayfaView from './_tabs/rol-sayfa-view'
import RoleYetkiView from './_tabs/rol-yetki-view'

interface ViewsClientProps {
  kisiAccessibleRoutes: KisiAccessibleRoutes[]
  roleAccessibleRoutes: RoleAccessibleRoutes[]
  roleYetkiView: RolYetkiView[]
}

export default function ViewsClient({ kisiAccessibleRoutes, roleAccessibleRoutes, roleYetkiView }: ViewsClientProps) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Tabs defaultValue="kisi-sayfa-view" className="w-[95vw] flex flex-col items-center justify-center p-4">
        <TabsList className='bg-gray-200 p-2 py-6'>
          <TabsTrigger className='text-xl' value="kisi-sayfa-view">Kişiler ve Sayfalar</TabsTrigger>
          <TabsTrigger className='text-xl' value="rol-sayfa-view">Roller ve Sayfalar</TabsTrigger>
          <TabsTrigger className='text-xl' value="rol-yetki-view">Roller ve Yetkiler</TabsTrigger>
        </TabsList>
        <TabsContent value="kisi-sayfa-view"><KisiSayfaView kisiAccessibleRoutes={kisiAccessibleRoutes} /></TabsContent>
        <TabsContent value="rol-sayfa-view"><RolSayfaView roleAccessibleRoutes={roleAccessibleRoutes} /></TabsContent>
        <TabsContent value="rol-yetki-view"><RoleYetkiView roleYetkiView={roleYetkiView} /></TabsContent>
      </Tabs>
    </div>
  )
}
