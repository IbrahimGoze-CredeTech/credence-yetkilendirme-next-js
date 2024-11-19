'use client';

import { bekleyenKisiYetkiEdit, bekleyenRolAtamalar, bekleyenRolCikarmalar } from '@/actions/bekleyen-talepler'
import React, { useEffect, useState, useTransition } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RolAtamaGrid from './_components/rol-atama-onay';
import { KisiYetkiEditGridType, KisiYetkiEditTalepler, RolAtamaGridType, RolAtamaTalepler, RolCikarmaGridType, RolCikarmaTalepler } from '@/types';
import RolCikarmaGrid from './_components/rol-cikarma-onay';
import KisiYetkiOnay from './_components/kisi-yetki-onay';
import { fetcherGet } from '@/utils';
import { useSession } from 'next-auth/react';
import KisiSayfaEditOnay from './_components/kisi-sayfa-edit-onay';


export default function TalepOnayPage() {
  const session = useSession();

  const [rolAtamalar, setRolAtamalar] = useState<RolAtamaGridType[]>([])
  const [rolCikarmalar, setRolCikarmalar] = useState<RolCikarmaGridType[]>([])
  const [kisiYetkiEdit, setKisiYetkiEdit] = useState<KisiYetkiEditGridType[]>([])
  const [rolAtamaTalepler, setRolAtamaTalepler] = useState<RolAtamaTalepler[]>([]);
  const [rolCikarmaTalepler, setRolCikarmaTalepler] = useState<RolCikarmaTalepler[]>([]);
  const [kisiYetkiEditTalepler, setKisiYetkiEditTalepler] = useState<KisiYetkiEditTalepler[]>([]);
  const [kisiSayfaEdit, setKisiSayfaEdit] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const [rolAtamalar, rolCikarmalar, kisiYetkiEdit, rolAtamaTalepler, rolCikarmaTalepler, kisiYetkiEditTalepler,
        kisiSayfaEdit
      ] = await Promise.all([
        bekleyenRolAtamalar(),
        bekleyenRolCikarmalar(),
        bekleyenKisiYetkiEdit(),
        fetcherGet("/Talep/kisi-rolAtama-talepler", session.data?.token),
        fetcherGet("/Talep/kisi-rolCikarma-talepler", session.data?.token),
        fetcherGet("/Talep/kisi-kisiYetkiEdit-talepler", session.data?.token),
        fetcherGet("/Talep/kisi-sayfaEdit-bekleyen", session.data?.token)
      ]);

      setRolAtamalar(rolAtamalar);
      setRolCikarmalar(rolCikarmalar);
      setKisiYetkiEdit(kisiYetkiEdit);
      setRolAtamaTalepler(rolAtamaTalepler);
      setRolCikarmaTalepler(rolCikarmaTalepler);
      setKisiYetkiEditTalepler(kisiYetkiEditTalepler);
      setKisiSayfaEdit(kisiSayfaEdit);
    });
  }, [])

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full p-4 space-y-8'>
        <h1 className='font-bold text-4xl'>Onay Bekleyen Talepler</h1>
        <Tabs defaultValue="rol-atama" className="w-[95vw] flex flex-col items-center justify-center p-4" >
          <TabsList className='bg-gray-200 p-2 py-6'>
            <TabsTrigger className='text-xl' value="rol-atama" disabled={isPending}>Rol Atama</TabsTrigger>
            <TabsTrigger className='text-xl' value="rol-cikarma" disabled={isPending}>Rol Çıkarma</TabsTrigger>
            <TabsTrigger className='text-xl' value="kisi-yetki" disabled={isPending}>Kişi Yetki</TabsTrigger>
            <TabsTrigger className='text-xl' value="kisi-sayfa-edit" disabled={isPending}>Kişi Sayfa Edit</TabsTrigger>
          </TabsList>
          <TabsContent value="rol-atama"><RolAtamaGrid data={rolAtamalar} rolAtamaTalepler={rolAtamaTalepler} /></TabsContent>
          <TabsContent value="rol-cikarma"><RolCikarmaGrid data={rolCikarmalar} rolCikarmaTalepler={rolCikarmaTalepler} /></TabsContent>
          <TabsContent value="kisi-yetki"><KisiYetkiOnay data={kisiYetkiEdit} kisiYetkiEditTalepler={kisiYetkiEditTalepler} /></TabsContent>
          <TabsContent value="kisi-sayfa-edit"><KisiSayfaEditOnay data={kisiSayfaEdit} /></TabsContent>
        </Tabs>

      </div>
    </>
  )
}
