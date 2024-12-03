import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import RolSayfaAtamaForm from "./rol-sayfa-atama-form";
import RolSayfaCikarmaForm from "./rol-sayfa-cikarma-form";
import RolYetkiForm from "./rol-yetki-form";

export default function TaleplerRolTabs() {
  return (
    <Tabs
      defaultValue="rol-sayfa-ata"
      className="w-[95vw] flex flex-col items-center justify-center p-4"
    >
      <TabsList className="bg-gray-200 p-2 py-6">
        <TabsTrigger className="text-xl" value="rol-sayfa-ata">
          Sayfa Atama
        </TabsTrigger>
        <TabsTrigger className="text-xl" value="rol-sayfa-çıkar">
          Sayfa Çıkarma
        </TabsTrigger>
        <TabsTrigger className="text-xl" value="rol-yetki">
          Yetki
        </TabsTrigger>
      </TabsList>
      <TabsContent value="rol-sayfa-ata">
        <RolSayfaAtamaForm />
      </TabsContent>
      <TabsContent value="rol-sayfa-çıkar">
        <RolSayfaCikarmaForm />
      </TabsContent>
      <TabsContent value="rol-yetki">
        <RolYetkiForm />
      </TabsContent>
    </Tabs>
  );
}
