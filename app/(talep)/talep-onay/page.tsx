'use client';

import { bekleyenRolAtamalar, bekleyenRolCikarmalar } from '@/actions/bekleyen-talepler'
import React, { useEffect, useState, useTransition } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RolAtamaGrid from '../_component/rol-atama-onay';
import { RolAtamaGridType, RolCikarmaGridType } from '@/types';
import RolCikarmaGrid from '../_component/rol-cikarma-onay';


export default function TalepOnayPage() {
  // const [talepler, setTalepler] = useState<ExpendedTalep[]>([])
  const [rolAtamalar, setRolAtamalar] = useState<RolAtamaGridType[]>([])
  const [rolCikarmalar, setRolCikarmalar] = useState<RolCikarmaGridType[]>([])
  // const [Imzalar, setImzalar] = useState<Imza[]>([])
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const [rolAtamalar, rolCikarmalar] = await Promise.all([
        bekleyenRolAtamalar(),
        bekleyenRolCikarmalar()
      ]);
      setRolAtamalar(rolAtamalar);
      setRolCikarmalar(rolCikarmalar);
    });
  }, [])


  return (
    <>
      <div className='flex items-center justify-center w-full p-4'>
        <Tabs defaultValue="rol-atama" className="w-[95vw] flex flex-col items-center justify-center p-4 border rounded-md" >
          <TabsList className='bg-gray-200 p-2 py-6'>
            <TabsTrigger className='text-xl' value="rol-atama" disabled={isPending}>Rol Atama</TabsTrigger>
            <TabsTrigger className='text-xl' value="rol-cikarma" disabled={isPending}>Rol Çıkarma</TabsTrigger>
          </TabsList>
          <TabsContent value="rol-atama"><RolAtamaGrid data={rolAtamalar} /></TabsContent>
          <TabsContent value="rol-cikarma"><RolCikarmaGrid data={rolCikarmalar} /></TabsContent>
        </Tabs>
        <div>

        </div>
      </div>
    </>
  )
}
