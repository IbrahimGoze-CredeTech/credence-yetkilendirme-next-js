// /* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { PieChartComp } from "./_components/pie-chart";
import { AreaChartComp } from "./_components/area-chart";
import RiskGrid from "./_components/risk-grid";
import ImzaAtananGrid from "./_components/imza-atanan-grid";
import ImzaOraniGrid from "./_components/imza-orani-grid";
import RolDagilimiPieChart from "./_components/rol-dagilimi-piechart";
import TalepYaratmaGrid from "./_components/talep-yaratma-grid";
import ImzaAtmaGrid from "./_components/imza-atma-grid";
import { MultipleBarChartData } from "./_components/bar-chart-multiple";
import { IImzaOraniMatris, ImzaAtmaKisi } from "@/types";
import VerimlilikGrid from "./_components/verimlilik-grid";

interface Props {
  talepYaratma: [];
  imzaAtma: [];
  imzaAtanan: [];
  talepYaratmaGunluk: [];
  imzaAtmaGunluk: [];
  talepTipi: [];
  kisiRisk: [];
  rolDagilimi: [];
  imzaOrani: IImzaOraniMatris[];
  kisiVerimlilik: [];
}

export default function MatrisClient({
  talepYaratma,
  imzaAtma,
  imzaAtanan,
  talepYaratmaGunluk,
  imzaAtmaGunluk,
  talepTipi,
  kisiRisk,
  rolDagilimi,
  imzaOrani,
  kisiVerimlilik,
}: Props) {
  const [combinedArray, setCombinedArray] = useState<MultipleBarChartData[]>(
    []
  );

  useEffect(() => {
    // Imza atma ve atanma kombinasyonu
    const combined = imzaAtanan.map((item1: { id: number }) => {
      const matchingItem = imzaAtma.find(
        (item2: { id: number }) => item2.id === item1.id
      );
      return {
        ...item1,
        imzaAtilanTalepSayısı: matchingItem?.imzaAtilanTalepSayısı || 0,
      };
    });

    setCombinedArray(combined);
  }, [imzaAtanan, imzaAtma]);

  return (
    <Tabs
      defaultValue="gunluk"
      className="w-[95vw] flex flex-col items-center justify-center p-4"
    >
      <TabsList className="bg-gray-200 p-2 py-6">
        <TabsTrigger value="talep-yaratma" className="text-xl">
          Talep Yaratma
        </TabsTrigger>
        <TabsTrigger value="imza-atma" className="text-xl">
          İmza Atma
        </TabsTrigger>
        <TabsTrigger value="imza-atanan" className="text-xl">
          İmza Atanan
        </TabsTrigger>
        <TabsTrigger value="imza-atma-oranı" className="text-xl">
          İmza Oranı
        </TabsTrigger>
        <TabsTrigger value="risk" className="text-xl">
          Risk
        </TabsTrigger>
        <TabsTrigger value="gunluk" className="text-xl">
          Günlük
        </TabsTrigger>
        <TabsTrigger value="talep-tipleri" className="text-xl">
          Talep Tipleri
        </TabsTrigger>
        <TabsTrigger value="rol-dagilimi" className="text-xl">
          Rol Dağılımı
        </TabsTrigger>
        <TabsTrigger value="kisi-verimlilik" className="text-xl">
          Kişi Verimlilik
        </TabsTrigger>
      </TabsList>

      <TabsContent value="talep-yaratma">
        <TalepYaratmaGrid data={talepYaratma} />
      </TabsContent>
      <TabsContent value="imza-atma">
        <ImzaAtmaGrid data={imzaAtma} />
      </TabsContent>
      <TabsContent value="imza-atanan">
        <ImzaAtananGrid data={imzaAtanan} />
      </TabsContent>
      <TabsContent value="imza-atma-oranı">
        <ImzaOraniGrid data={imzaOrani} />
      </TabsContent>
      <TabsContent value="risk">
        <RiskGrid data={kisiRisk} />
      </TabsContent>
      <TabsContent value="gunluk" className="flex gap-4">
        <AreaChartComp
          data={talepYaratmaGunluk}
          chartLabel="Günlük Talep Yaratma"
          quantityValue="talepSayisi"
          quantityLabel="Talep Sayısı"
        />
        <AreaChartComp
          data={imzaAtmaGunluk}
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
      <TabsContent value="kisi-verimlilik">
        <VerimlilikGrid data={kisiVerimlilik} />
      </TabsContent>
    </Tabs>
  );
}
