import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import RolAtamaForm from "./rol-atama-form";
import RolCikarmaForm from "./rol-cikarma-form";
import YetkiEditForm from "./yetki-edit-form";
import KisiSayfaAtamaForm from "./kisi-sayfa-atama-form";
import KisiSayfaCikarmaForm from "./kisi-sayfa-cikarma-form";
import KisiSayfaEditForm from "./kisi-sayfa-edit-form";
import KisiYetkiAtamaFrom from "./kisi-yetki-atama-form";

export default function TaleplerKisiTabs() {
  return (
    <Tabs defaultValue="rol-atama" className="w-[95vw] flex flex-col items-center justify-center p-4">
      <TabsList className="bg-gray-200 p-2 py-6">
        <TabsTrigger className="text-xl" value="rol-atama">Rol Atama</TabsTrigger>
        <TabsTrigger className="text-xl" value="rol-cikarma">Rol Çıkarma</TabsTrigger>
        <TabsTrigger className="text-xl" value="yetki-edit">Yetki</TabsTrigger>
        <TabsTrigger className="text-xl" value="yetki-atama">Yetki Atama</TabsTrigger>
        <TabsTrigger className="text-xl" value="kisi-sayfa-atama">Sayfa Atama</TabsTrigger>
        <TabsTrigger className="text-xl" value="kisi-sayfa-cikarma">Sayfa Çıkarma</TabsTrigger>
        <TabsTrigger className="text-xl" value="kisi-sayfa-edit">Sayfa Edit</TabsTrigger>
      </TabsList>
      <TabsContent value="rol-atama"><RolAtamaForm /></TabsContent>
      <TabsContent value="rol-cikarma"><RolCikarmaForm /></TabsContent>
      <TabsContent value="yetki-edit"><YetkiEditForm /></TabsContent>
      <TabsContent value="yetki-atama"><KisiYetkiAtamaFrom /></TabsContent>
      <TabsContent value="kisi-sayfa-atama"><KisiSayfaAtamaForm /></TabsContent>
      <TabsContent value="kisi-sayfa-cikarma"><KisiSayfaCikarmaForm /></TabsContent>
      <TabsContent value="kisi-sayfa-edit"><KisiSayfaEditForm /></TabsContent>
    </Tabs>
  );
}
