// /* eslint-disable @typescript-eslint/no-explicit-any */

import { Suspense } from "react";
import MatrisClient from "./matris-client";
import { TalepYaratmaMatris, ImzaAtmaMatris, ImzaAtananMatris, TalepYaratmaGunlukMatris, TalepTipiMatris, KisiRiskMatris, RolDagilimiMatris, ImzaAtmaGunlukMatris, ImzaOraniMatris, KisiVerimlilikMatris } from "@/actions/matris";

async function MatrisData() {
  const [
    talepYaratma,
    imzaAtma,
    imzaAtanan,
    talepYaratmaGunluk,
    imzaAtmaGunluk,
    talepTipi,
    kisiRisk,
    rolDagilimi,
    imzaOrani,
    kisiVerimlilik
  ] = await Promise.all([
    TalepYaratmaMatris(),
    ImzaAtmaMatris(),
    ImzaAtananMatris(),
    TalepYaratmaGunlukMatris(),
    ImzaAtmaGunlukMatris(),
    TalepTipiMatris(),
    KisiRiskMatris(),
    RolDagilimiMatris(),
    ImzaOraniMatris(),
    KisiVerimlilikMatris()
  ]);
  return (
    <MatrisClient talepYaratma={talepYaratma} imzaAtma={imzaAtma} imzaAtanan={imzaAtanan} talepYaratmaGunluk={talepYaratmaGunluk} imzaAtmaGunluk={imzaAtmaGunluk} talepTipi={talepTipi} kisiRisk={kisiRisk} rolDagilimi={rolDagilimi} imzaOrani={imzaOrani} kisiVerimlilik={kisiVerimlilik} />
  )
}

export default function MatrisPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 space-y-8">
      <h1 className="font-bold text-4xl">Matrisler</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MatrisData />
      </Suspense>
    </div>
  )
}
