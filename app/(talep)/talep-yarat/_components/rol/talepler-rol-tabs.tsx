import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import RolSayfaAtamaForm from "./rol-sayfa-atama-form";
import RolSayfaCikarmaForm from "./rol-sayfa-cikarma-form";

export default function TaleplerRolTabs() {
  return (
    <Tabs
      defaultValue="rol-sayfa-ata"
      className="w-[95vw] flex flex-col items-center justify-center p-4"
    >
      <TabsList className="bg-gray-200 p-2 py-6">
        <TabsTrigger className="text-xl" value="rol-sayfa-ata">
          Rol Sayfa Atama
        </TabsTrigger>
        <TabsTrigger className="text-xl" value="rol-sayfa-çıkar">
          Rol Sayfa Çıkarma
        </TabsTrigger>
      </TabsList>
      <TabsContent value="rol-sayfa-ata">
        <RolSayfaAtamaForm />
      </TabsContent>
      <TabsContent value="rol-sayfa-çıkar">
        <RolSayfaCikarmaForm />
      </TabsContent>
    </Tabs>
  );
}
