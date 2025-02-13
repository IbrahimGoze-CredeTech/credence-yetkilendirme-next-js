'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useModalContext } from '@/context';
import type { KisiType } from '@/types';
import { FetcherGet } from '@/utils';
import EkstraYetkilerTab from '../../_components/ekstra-yetkiler-tab';
import OzetTab from '../../_components/ozet-tab';
import RolTab from '../../_components/rol-tab';
import YetkilerTab from '../../_components/yetkiler-tab';

export default function KisiPage() {
  const session = useSession();
  const modalContext = useModalContext();

  const router = useRouter();

  const [employee, setEmployee] = useState<KisiType>(); // API'den gelecek roller için state
  // const [selectedRowData, setSelectedRowData] = useState<Kisi | null>(null); // Seçili satır verisi için state

  useEffect(() => {
    if (!modalContext?.id) router.push('/kisi-bilgileri');
    const fetchData = async () => {
      const bilgilerFetch = await FetcherGet(`/Kisi/butun-bilgiler/${modalContext.id}`, session.data?.token);

      try {
        const [bilgilerData] = await Promise.all([bilgilerFetch]);
        if (bilgilerData) {
          setEmployee(bilgilerData);
        }
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=' p-4'>
      <h1 className='font-bold text-3xl my-4 ml-5'>{employee?.kisiAdi + " " + employee?.kisiSoyadi}</h1>
      <Tabs className="w-[95vw] p-4" defaultValue="ozet">
        <TabsList className='bg-gray-200 p-2 py-6'>
          <TabsTrigger className='text-xl' value="ozet">Ozet</TabsTrigger>
          <TabsTrigger className='text-xl' value="rol">Roller</TabsTrigger>
          <TabsTrigger className='text-xl' value="yetkiler">Yetkiler</TabsTrigger>
          <TabsTrigger className='text-xl' value="ekstra-yetkiler">Ekstra Yetkiler</TabsTrigger>
        </TabsList>
        <TabsContent value="ozet"><OzetTab ekstraYetkiler={employee?.ekstraYetkiler} roller={employee?.roller} yetkiler={employee?.yetkiler} /></TabsContent>
        <TabsContent value="rol"><RolTab roller={employee?.roller} /></TabsContent>
        <TabsContent value="yetkiler"><YetkilerTab yetkiler={employee?.yetkiler} /></TabsContent>
        <TabsContent value="ekstra-yetkiler"><EkstraYetkilerTab ekstraYetkiler={employee?.ekstraYetkiler} /></TabsContent>
      </Tabs>
    </div>
  )
}
