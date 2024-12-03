'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useModalContext } from '@/context';
import { Kisi } from '@/types';
import { fetcherGet } from '@/utils';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import OzetTab from '../../_components/ozet-tab';
import { useRouter } from 'next/navigation';
import RolTab from '../../_components/rol-tab';
import YetkilerTab from '../../_components/yetkiler-tab';
import EkstraYetkilerTab from '../../_components/ekstra-yetkiler-tab';

export default function KisiPage() {
  const session = useSession();
  const modalContext = useModalContext();

  const router = useRouter();

  const [employee, setEmployee] = useState<Kisi>(); // API'den gelecek roller için state
  // const [selectedRowData, setSelectedRowData] = useState<Kisi | null>(null); // Seçili satır verisi için state

  useEffect(() => {
    if (!modalContext?.id) router.push('/kisi-bilgileri');
    const fetchData = async () => {
      const bilgilerFetch = await fetcherGet(`/Kisi/butun-bilgiler/${modalContext.id}`, session.data?.token);

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
      <Tabs defaultValue="ozet" className="w-[95vw] p-4">
        <TabsList className='bg-gray-200 p-2 py-6'>
          <TabsTrigger className='text-xl' value="ozet">Ozet</TabsTrigger>
          <TabsTrigger className='text-xl' value="rol">Roller</TabsTrigger>
          <TabsTrigger className='text-xl' value="yetkiler">Yetkiler</TabsTrigger>
          <TabsTrigger className='text-xl' value="ekstra-yetkiler">Ekstra Yetkiler</TabsTrigger>
        </TabsList>
        <TabsContent value="ozet"><OzetTab roller={employee?.roller} yetkiler={employee?.yetkiler} ekstraYetkiler={employee?.ekstraYetkiler} /></TabsContent>
        <TabsContent value="rol"><RolTab roller={employee?.roller} /></TabsContent>
        <TabsContent value="yetkiler"><YetkilerTab yetkiler={employee?.yetkiler} /></TabsContent>
        <TabsContent value="ekstra-yetkiler"><EkstraYetkilerTab ekstraYetkiler={employee?.ekstraYetkiler} /></TabsContent>
      </Tabs>
    </div>
  )
}
