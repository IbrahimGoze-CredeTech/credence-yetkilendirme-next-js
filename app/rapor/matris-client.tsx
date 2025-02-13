// /* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IImzaOraniMatris } from "@/types";
import { AreaChartComp } from "./_components/area-chart";
import ImzaAtananGrid from "./_components/imza-atanan-grid";
import ImzaAtmaGrid from "./_components/imza-atma-grid";
import ImzaOraniGrid from "./_components/imza-orani-grid";
import { PieChartComp } from "./_components/pie-chart";
import RiskGrid from "./_components/risk-grid";
import RolDagilimiPieChart from "./_components/rol-dagilimi-piechart";
import TalepYaratmaGrid from "./_components/talep-yaratma-grid";
import VerimlilikGrid from "./_components/verimlilik-grid";

interface IProps {
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
}: IProps) {
  return (
    <Tabs
      className="w-[95vw] flex flex-col items-center justify-center p-4"
      defaultValue="gunluk"
    >
      <TabsList className="bg-gray-200 p-2 py-6">
        <TabsTrigger className="text-xl" value="talep-yaratma">
          Talep Yaratma
        </TabsTrigger>
        <TabsTrigger className="text-xl" value="imza-atma">
          İmza Atma
        </TabsTrigger>
        <TabsTrigger className="text-xl" value="imza-atanan">
          İmza Atanan
        </TabsTrigger>
        <TabsTrigger className="text-xl" value="imza-atma-oranı">
          İmza Oranı
        </TabsTrigger>
        <TabsTrigger className="text-xl" value="risk">
          Risk
        </TabsTrigger>
        <TabsTrigger className="text-xl" value="gunluk">
          Günlük
        </TabsTrigger>
        <TabsTrigger className="text-xl" value="talep-tipleri">
          Talep Tipleri
        </TabsTrigger>
        <TabsTrigger className="text-xl" value="rol-dagilimi">
          Rol Dağılımı
        </TabsTrigger>
        <TabsTrigger className="text-xl" value="kisi-verimlilik">
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
      <TabsContent className="flex gap-4" value="gunluk">
        <AreaChartComp
          chartLabel="Günlük Talep Yaratma"
          data={talepYaratmaGunluk}
          quantityLabel="Talep Sayısı"
          quantityValue="talepSayisi"
        />
        <AreaChartComp
          chartLabel="Günlük İmza Atma"
          data={imzaAtmaGunluk}
          quantityLabel="İmza Sayısı"
          quantityValue="imzaSayisi"
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
