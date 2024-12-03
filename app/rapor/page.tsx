/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataItem, fetcherGet, formatDataList } from "@/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useTransition } from "react";
import TalepYaratmaGrid from "./_components/talep-yaratma-grid";
import ImzaAtmaGrid from "./_components/imza-atma-grid";
import ImzaAtananGrid from "./_components/imza-atanan-grid";
import { AreaChartComp } from "./_components/area-chart";
import { PieChartComp } from "./_components/pie-chart";
import RiskGrid from "./_components/risk-grid";
import ImzaOranıGrid from "./_components/imza-orani-grid";

export default function RaporPage() {
  const session = useSession();

  const [risk, setRisk] = useState<[]>([]);
  const [, setVerimlilik] = useState<[]>([]);
  const [yaratma, setYaratma] = useState<[]>([]);
  const [imzaAtma, setImzaAtma] = useState<[]>([]);
  const [imzaAtanan, setImzaAtanan] = useState<[]>([]);
  const [gunlukTalepYaratma, setGunlukTalepYaratma] = useState<DataItem[]>([]);
  const [gunlukImzaAtma, setGunlukImzaAtma] = useState<DataItem[]>([]);
  const [talepTipi, setTalepTipi] = useState<[]>([]);
  const [combineArray, setCombineArray] = useState([]);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const [
        rolAtamalar,
        imzaAtma,
        imzaAtanan,
        gunlukTalepYaratma,
        gunlukImzaAtma,
        talepTipi,
        verimlilik,
        risk,
      ] = await Promise.all([
        fetcherGet("/Matris/talep-yaratma-matris", session.data?.token),
        fetcherGet("/Matris/imza-atma-matris", session.data?.token),
        fetcherGet("/Matris/imza-atanan-matris", session.data?.token),
        fetcherGet("/Matris/talep-yaratma-gunluk-matris", session.data?.token),
        fetcherGet("/Matris/imza-atma-gunluk-matris", session.data?.token),
        fetcherGet("/Matris/talep-tipi-matris", session.data?.token),
        fetcherGet("/Matris/kisi-verimlilik-matris", session.data?.token),
        fetcherGet("/Matris/kisi-risk-matris", session.data?.token),
      ]);
      // console.log(talepTipi);
      setTalepTipi(talepTipi);
      setYaratma(rolAtamalar);
      setImzaAtma(imzaAtma);
      setImzaAtanan(imzaAtanan);
      setVerimlilik(verimlilik);
      setRisk(risk);
      // console.log(risk);

      const formattedGunlukTalepYaratma = formatDataList(gunlukTalepYaratma);
      setGunlukTalepYaratma(formattedGunlukTalepYaratma);

      const formattedGunlukImzaAtma = formatDataList(gunlukImzaAtma);
      setGunlukImzaAtma(formattedGunlukImzaAtma);

      const object3 = imzaAtanan.map((item1: { id: any }) => {
        const matchingItem = imzaAtma.find(
          (item2: { id: any }) => item2.id === item1.id
        );
        return {
          ...item1,
          imzaAtilanTalepSayısı: matchingItem?.imzaAtilanTalepSayısı,
        };
      });
      setCombineArray(object3);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full p-4 space-y-8">
        <h1 className="font-bold text-4xl">Matrisler</h1>
        <Tabs
          defaultValue="ozet"
          className="w-[95vw] flex flex-col items-center justify-center p-4"
        >
          <TabsList className="bg-gray-200 p-2 py-6">
            <TabsTrigger
              className="text-xl"
              value="talep-yaratma"
              disabled={isPending}
            >
              Talep Yaratma
            </TabsTrigger>
            <TabsTrigger
              className="text-xl"
              value="imza-atma"
              disabled={isPending}
            >
              Imza Atma
            </TabsTrigger>
            <TabsTrigger
              className="text-xl"
              value="imza-atanan"
              disabled={isPending}
            >
              Imza Atanan
            </TabsTrigger>
            <TabsTrigger
              className="text-xl"
              value="imza-atma-oranı"
              disabled={isPending}
            >
              İmza Oranı
            </TabsTrigger>
            <TabsTrigger className="text-xl" value="risk" disabled={isPending}>
              Risk
            </TabsTrigger>
            <TabsTrigger
              className="text-xl"
              value="gunluk"
              disabled={isPending}
            >
              Gunluk
            </TabsTrigger>
            <TabsTrigger className="text-xl" value="ozet" disabled={isPending}>
              Talep Tipleri
            </TabsTrigger>
          </TabsList>
          <TabsContent value="talep-yaratma">
            <TalepYaratmaGrid data={yaratma} />
          </TabsContent>
          <TabsContent value="imza-atma">
            <ImzaAtmaGrid data={imzaAtma} />
          </TabsContent>
          <TabsContent value="imza-atanan">
            <ImzaAtananGrid data={imzaAtanan} />
          </TabsContent>
          <TabsContent value="imza-atma-oranı">
            <ImzaOranıGrid data={combineArray} />
          </TabsContent>
          <TabsContent value="risk">
            <RiskGrid data={risk} />
          </TabsContent>
          <TabsContent value="gunluk" className="flex gap-4">
            <AreaChartComp
              data={gunlukTalepYaratma}
              chartLabel={"Gunluk Talep Yaratma"}
              quantityValue={"talepSayisi"}
              quantityLabel={"Talep Sayisi"}
            />
            <AreaChartComp
              data={gunlukImzaAtma}
              chartLabel={"Gunluk Imza Atma"}
              quantityValue={"imzaSayisi"}
              quantityLabel={"Imza Sayisi"}
            />
          </TabsContent>
          <TabsContent value="ozet">
            <PieChartComp data={talepTipi}></PieChartComp>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
