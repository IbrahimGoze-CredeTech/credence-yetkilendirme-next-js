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
import RolDagilimiPieChart from "./_components/rol-dagilimi-piechart";
import VerimlilikGrid from "./_components/verimlilik-grid";

export default function RaporPage() {
  const session = useSession();
  const [risk, setRisk] = useState<[]>([]);
  const [verimlilik, setVerimlilik] = useState<[]>([]);
  const [yaratma, setYaratma] = useState<[]>([]);
  const [imzaAtma, setImzaAtma] = useState<[]>([]);
  const [imzaAtanan, setImzaAtanan] = useState<[]>([]);
  const [gunlukTalepYaratma, setGunlukTalepYaratma] = useState<DataItem[]>([]);
  const [gunlukImzaAtma, setGunlukImzaAtma] = useState<DataItem[]>([]);
  const [talepTipi, setTalepTipi] = useState<DataItem[]>([]);
  const [combineArray, setCombineArray] = useState([]);
  const [rolDagilimi, setRolDagilimi] = useState<DataItem[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const [
          rolAtamalar,
          imzaAtmaData,
          imzaAtananData,
          gunlukTalepYaratmaData,
          gunlukImzaAtmaData,
          talepTipiData,
          riskData,
          rolDagilimiData,
          verimlilik,
        ] = await Promise.all([
          fetcherGet("/Matris/talep-yaratma-matris", session.data?.token),
          fetcherGet("/Matris/imza-atma-matris", session.data?.token),
          fetcherGet("/Matris/imza-atanan-matris", session.data?.token),
          fetcherGet(
            "/Matris/talep-yaratma-gunluk-matris",
            session.data?.token
          ),
          fetcherGet("/Matris/imza-atma-gunluk-matris", session.data?.token),
          fetcherGet("/Matris/talep-tipi-matris", session.data?.token),
          fetcherGet("/Matris/kisi-risk-matris", session.data?.token),
          fetcherGet("/Matris/rol-dagilimi-matris", session.data?.token),
          fetcherGet("/Matris/kisi-verimlilik-matris", session.data?.token),
        ]);

        setYaratma(rolAtamalar);
        setImzaAtma(imzaAtmaData);
        setImzaAtanan(imzaAtananData);
        setTalepTipi(talepTipiData);
        setRisk(riskData);
        setRolDagilimi(rolDagilimiData);
        setVerimlilik(verimlilik);

        setGunlukTalepYaratma(formatDataList(gunlukTalepYaratmaData));
        setGunlukImzaAtma(formatDataList(gunlukImzaAtmaData));

        // Imza atma ve atanma kombinasyonu
        const combined = imzaAtananData.map((item1: { id: any }) => {
          const matchingItem = imzaAtmaData.find(
            (item2: { id: any }) => item2.id === item1.id
          );
          return {
            ...item1,
            imzaAtilanTalepSayısı: matchingItem?.imzaAtilanTalepSayısı || 0,
          };
        });

        setCombineArray(combined);
      } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
      }
    });
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 space-y-8">
      <h1 className="font-bold text-4xl">Matrisler</h1>
      <Tabs
        defaultValue="ozet"
        className="w-[95vw] flex flex-col items-center justify-center p-4"
      >
        <TabsList className="bg-gray-200 p-2 py-6">
          <TabsTrigger
            value="talep-yaratma"
            className="text-xl"
            disabled={isPending}
          >
            Talep Yaratma
          </TabsTrigger>
          <TabsTrigger
            value="imza-atma"
            className="text-xl"
            disabled={isPending}
          >
            İmza Atma
          </TabsTrigger>
          <TabsTrigger
            value="imza-atanan"
            className="text-xl"
            disabled={isPending}
          >
            İmza Atanan
          </TabsTrigger>
          <TabsTrigger
            value="imza-atma-oranı"
            className="text-xl"
            disabled={isPending}
          >
            İmza Oranı
          </TabsTrigger>
          <TabsTrigger
            value="verimlilik"
            className="text-xl"
            disabled={isPending}
          >
            Verimlilik
          </TabsTrigger>
          <TabsTrigger value="risk" className="text-xl" disabled={isPending}>
            Risk
          </TabsTrigger>
          <TabsTrigger value="gunluk" className="text-xl" disabled={isPending}>
            Günlük
          </TabsTrigger>
          <TabsTrigger
            value="talep-tipleri"
            className="text-xl"
            disabled={isPending}
          >
            Talep Tipleri
          </TabsTrigger>
          <TabsTrigger
            value="rol-dagilimi"
            className="text-xl"
            disabled={isPending}
          >
            Rol Dağılımı
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
        <TabsContent value="verimlilik">
          <VerimlilikGrid data={verimlilik} />
        </TabsContent>
        <TabsContent value="risk">
          <RiskGrid data={risk} />
        </TabsContent>
        <TabsContent value="gunluk" className="flex gap-4">
          <AreaChartComp
            data={gunlukTalepYaratma}
            chartLabel="Günlük Talep Yaratma"
            quantityValue="talepSayisi"
            quantityLabel="Talep Sayısı"
          />
          <AreaChartComp
            data={gunlukImzaAtma}
            chartLabel="Günlük İmza Atma"
            quantityValue="imzaSayisi"
            quantityLabel="İmza Sayısı"
          />
        </TabsContent>
        <TabsContent value="talep-tipleri">
          <PieChartComp data={talepTipi} />
        </TabsContent>
        <TabsContent value="rol-dagilimi">
          <RolDagilimiPieChart data={rolDagilimi} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
