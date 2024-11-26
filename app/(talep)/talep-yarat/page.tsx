"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaleplerKisiTabs from "./_components/kisi/talepler-kisi-tabs";
import TaleplerRolTabs from "./_components/rol/talepler-rol-tabs";

export default function TalepYaratPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 space-y-8">
      <h1 className="font-bold text-4xl">Atama ve Yönetim</h1>
      <Tabs
        defaultValue="talep-kisi-form"
        className="w-[95vw] flex flex-col items-center justify-center p-4"
      >
        <TabsList className="bg-gray-200 p-2 py-6">
          <TabsTrigger className="text-xl" value="talep-kisi-form">
            Kişi
          </TabsTrigger>
          <TabsTrigger className="text-xl" value="talep-rol-form">
            Rol
          </TabsTrigger>
        </TabsList>
        <TabsContent value="talep-kisi-form">
          <TaleplerKisiTabs />
        </TabsContent>
        <TabsContent value="talep-rol-form">
          <TaleplerRolTabs />
        </TabsContent>
      </Tabs>
    </div>
  );
}
