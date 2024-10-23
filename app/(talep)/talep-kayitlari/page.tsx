import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OnaylananTaleplerGrid from './_components/onaylanan-talepler-grid';
import ReddedilenTaleplerGrid from './_components/reddedilen-talepler-grid';
import YaratilanTaleplerGrid from './_components/yaratilan-talepler-grid';

export default function TalepKayitlariPage() {

  return (
    <div className='flex flex-col items-center justify-center w-full p-4 space-y-8'>
      <h1 className='font-bold text-4xl'>Talep Kayıtları</h1>
      <Tabs defaultValue="onaylanan-talepler" className=" flex flex-col items-center justify-center p-2" >
        <TabsList className='bg-gray-200 p-2 py-6'>
          <TabsTrigger className='text-xl' value="onaylanan-talepler">Onaylanan Talepler</TabsTrigger>
          <TabsTrigger className='text-xl' value="reddedilen-talepler">Reddedilen Talepler</TabsTrigger>
          <TabsTrigger className='text-xl' value="yaratilan-talepler">Yaratılan Talepler</TabsTrigger>
        </TabsList>
        <div className='w-[95vw]'>
          <TabsContent value="onaylanan-talepler"><OnaylananTaleplerGrid /></TabsContent>
          <TabsContent value="reddedilen-talepler"><ReddedilenTaleplerGrid /></TabsContent>
          <TabsContent value="yaratilan-talepler"><YaratilanTaleplerGrid /></TabsContent>
        </div >
      </Tabs>
    </div>
  )
}
