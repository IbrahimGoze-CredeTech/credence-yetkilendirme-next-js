// /* eslint-disable @typescript-eslint/no-explicit-any */

import { Suspense } from "react";
import { ImzaAtananMatris, ImzaAtmaGunlukMatris, ImzaAtmaMatris, ImzaOraniMatris, KisiRiskMatris, KisiVerimlilikMatris, RolDagilimiMatris, TalepTipiMatris, TalepYaratmaGunlukMatris, TalepYaratmaMatris } from "@/actions/matris";
import MatrisClient from "./matris-client";

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
    <MatrisClient imzaAtanan={imzaAtanan} imzaAtma={imzaAtma} imzaAtmaGunluk={imzaAtmaGunluk} imzaOrani={imzaOrani} kisiRisk={kisiRisk} kisiVerimlilik={kisiVerimlilik} rolDagilimi={rolDagilimi} talepTipi={talepTipi} talepYaratma={talepYaratma} talepYaratmaGunluk={talepYaratmaGunluk} />
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
