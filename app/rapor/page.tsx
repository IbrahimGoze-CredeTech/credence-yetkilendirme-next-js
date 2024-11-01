'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetcherGet } from '@/utils';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState, useTransition } from 'react'
import TalepYaratmaGrid from './_components/talep-yaratma-grid';

export default function RaporPage() {
  const session = useSession();
  const [yaratma, setYaratma] = useState<[]>([]);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const [rolAtamalar] = await Promise.all([
        fetcherGet("/Talep/talep-yaratma-matris", session.data?.token),
      ]);

      setYaratma(rolAtamalar);
      console.log(rolAtamalar);


    });
  }, [])

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full p-4 space-y-8'>
        <h1 className='font-bold text-4xl'>Onay Bekleyen Talepler</h1>
        <Tabs defaultValue="rol-atama" className="w-[95vw] flex flex-col items-center justify-center p-4" >
          <TabsList className='bg-gray-200 p-2 py-6'>
            <TabsTrigger className='text-xl' value="talep-yaratma" disabled={isPending}>Talep Yaratma</TabsTrigger>
            <TabsTrigger className='text-xl' value="rol-cikarma" disabled={isPending}>Rol Çıkarma</TabsTrigger>
            <TabsTrigger className='text-xl' value="kisi-yetki" disabled={isPending}>Kişi Yetki</TabsTrigger>
          </TabsList>
          <TabsContent value="talep-yaratma"><TalepYaratmaGrid data={yaratma} /></TabsContent>
          <TabsContent value="rol-cikarma"></TabsContent>
          <TabsContent value="kisi-yetki"></TabsContent>
        </Tabs>

      </div>
    </>
  )
}
