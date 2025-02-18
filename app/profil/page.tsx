/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import React, {
  startTransition,
  useEffect,
  useState,
  useTransition,
} from "react";
import { UseCurrentUser } from "@/hooks/use-current-user";
import type { ExtendedUser } from "@/next-auth";
// import type { IDataItem } from "@/utils";
import { FetcherGet, FormatDataList, type IDataItem } from "@/utils";
import KisiDataGridOzet from "../_anasayfa/KisiDataGridOzet";
import TalepOzet from "../_anasayfa/TalepOzet";
import TalepOnayDatagrid from "../_anasayfa/talep-onay/TalepOnayDatagrid";
import ImzaAtmaGrid from "./_components/imza-atma-grid";
import { PieChartComp } from "./_components/pie-chart";

export default function ProfilePage() {
  const kullanıcı = {
    name: "Can Emir Dilber",
    position: "Yönetici",
    department: "IT Departmanı",
    avatar: "/user-avatar.png",
    requestCount: 58,
    approvalCount: 26,
    permissions: ["Rol Atama", "Yetki Edit", "Kişi Sayfa Edit"],
    lastLogin: "2024-11-20",
    role: "Admin",
    tasksCompleted: 35,
    activeTasks: 5,
  };
  const currentUser = UseCurrentUser();
  const [user, setUser] = useState<ExtendedUser | undefined>(undefined);
  const session = useSession();

  const [kisiselRoller, setKisiselRoller] = useState<[]>([]);
  const [risk, setRisk] = useState<[]>([]);
  const [verimlilik, setVerimlilik] = useState<[]>([]);
  const [yaratma, setYaratma] = useState<[]>([]);
  const [imzaAtma, setImzaAtma] = useState<[]>([]);
  const [imzaAtanan, setImzaAtanan] = useState<[]>([]);
  const [gunlukTalepYaratma, setGunlukTalepYaratma] = useState<IDataItem[]>([]);
  const [gunlukImzaAtma, setGunlukImzaAtma] = useState<IDataItem[]>([]);
  const [talepTipi, setTalepTipi] = useState<[]>([]);
  const [combineArray, setCombineArray] = useState([]);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
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
        kisiselRoller,
      ] = await Promise.all([
        FetcherGet("/Matris/talep-yaratma-matris", session.data?.token),
        FetcherGet("/Matris/imza-atma-matris", session.data?.token),
        FetcherGet("/Matris/imza-atanan-matris", session.data?.token),
        FetcherGet("/Matris/talep-yaratma-gunluk-matris", session.data?.token),
        FetcherGet("/Matris/imza-atma-gunluk-matris", session.data?.token),
        FetcherGet("/Matris/talep-tipi-matris", session.data?.token),
        FetcherGet("/Matris/kisi-verimlilik-matris", session.data?.token),
        FetcherGet("/Matris/kisi-risk-matris", session.data?.token),
        FetcherGet("/Kisi/ozet-bilgi", session.data?.token),
      ]);
      setTalepTipi(talepTipi);
      setYaratma(rolAtamalar);
      setImzaAtma(imzaAtma);
      setImzaAtanan(imzaAtanan);
      setVerimlilik(verimlilik);
      setRisk(risk);
      setKisiselRoller(kisiselRoller);

      const roller = kisiselRoller[0]?.roller || [];
      setKisiselRoller(roller);

      const formattedGunlukTalepYaratma = FormatDataList(gunlukTalepYaratma);
      setGunlukTalepYaratma(formattedGunlukTalepYaratma);

      const formattedGunlukImzaAtma = FormatDataList(gunlukImzaAtma);
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4">
          {/* Profil Resmi */}
          <Image
            alt="User Avatar"
            className="rounded-full mx-auto"
            height={96}
            src="/user.png"
            width={96}
          />

          {/* Temel Bilgiler */}
          <h2 className="text-lg font-bold text-center">{kullanıcı.name}</h2>
          <p className="text-sm text-center text-gray-500">
            {kullanıcı.position} - {kullanıcı.department}
          </p>
          <p className="text-xs text-center text-gray-400">
            Son Giriş: {kullanıcı.lastLogin}
          </p>

          {/* Performans Göstergeleri */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-blue-500">
                {kullanıcı.requestCount}
              </p>
              <p className="text-sm text-gray-500">Tamamlanan Talepler</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-500">
                {kullanıcı.approvalCount}
              </p>
              <p className="text-sm text-gray-500">Onaylanan Talepler</p>
            </div>
          </div>

          {/* Rol ve Yetki Bilgileri */}
          <div>
            <p className="font-semibold text-gray-800">Roller:</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {kisiselRoller.map((rol: string, index: number) => (
                <li key={index}>{rol}</li>
              ))}
            </ul>
            <p className="font-semibold text-gray-800 mt-2">Yetkiler:</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {kullanıcı.permissions.map((perm, index) => (
                <li key={index}>{perm}</li>
              ))}
            </ul>
          </div>

          {/* İşlem Geçmişi */}
          <div className="mt-4">
            <p className="font-semibold text-gray-800">İşlem Geçmişi:</p>
            <p className="text-sm text-gray-600">
              Tamamlanan Görevler: {kullanıcı.tasksCompleted}
            </p>
            <p className="text-sm text-gray-600">
              Aktif Görevler: {kullanıcı.activeTasks}
            </p>
          </div>
        </div>

        {/* Profilin sağındaki gridler */}
        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <ImzaAtmaGrid data={imzaAtma} />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <PieChartComp data={talepTipi} />
          </div>
        </div>

        {/* Profilin altındaki gridler */}
        <div className="lg:col-span-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <TalepOnayDatagrid
              waitingKisiYetkiEdit={[]}
              waitingRolAtamalar={[]}
              waitingRolCikarmalar={[]}
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <KisiDataGridOzet />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <TalepOzet />
          </div>
        </div>
      </div>
    </>
  );
}
