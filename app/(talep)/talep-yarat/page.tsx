'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RolAtamaForm from '../_component/rol-atama-form';


export default function TalepYaratPage() {

  return (
    <div className='flex items-center justify-center p-4'>
      <Tabs defaultValue="rol-atama" className="w-[95vw] flex flex-col items-center justify-center p-4" >
        <TabsList className='bg-gray-200 p-2 py-6'>
          <TabsTrigger className='text-xl' value="rol-atama">Rol Atama</TabsTrigger>
          <TabsTrigger className='text-xl' value="rol-cikarma">Rol Çıkarma</TabsTrigger>
        </TabsList>
        <TabsContent value="rol-atama"><RolAtamaForm /></TabsContent>
        <TabsContent value="rol-cikarma">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}


