"use client";

import React, {
  startTransition,
  useEffect,
  useState,
  useTransition,
} from "react";
import { DataGrid } from "devextreme-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExtendedUser } from "@/next-auth";
import TalepOnayDatagrid from "../anasayfa/talep-onay/TalepOnayDatagrid";
import KisiDataGridOzet from "../anasayfa/KisiDataGridOzet";
import TalepOzet from "../anasayfa/TalepOzet";
import ImzaAtmaGrid from "./_components/imza-atma-grid";
import { DataItem, fetcherGet, formatDataList } from "@/utils";
import { useSession } from "next-auth/react";
import { PieChartComp } from "./_components/pie-chart";

export default function ProfilePage() {
  const user = {
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
  const currentUser = useCurrentUser();
  // const [user, setUser] = useState<ExtendedUser | undefined>(undefined);
  const session = useSession();

  const [risk, setRisk] = useState<[]>([]);
  const [verimlilik, setVerimlilik] = useState<[]>([]);
  const [yaratma, setYaratma] = useState<[]>([]);
  const [imzaAtma, setImzaAtma] = useState<[]>([]);
  const [imzaAtanan, setImzaAtanan] = useState<[]>([]);
  const [gunlukTalepYaratma, setGunlukTalepYaratma] = useState<DataItem[]>([]);
  const [gunlukImzaAtma, setGunlukImzaAtma] = useState<DataItem[]>([]);
  const [talepTipi, setTalepTipi] = useState<[]>([]);
  const [combineArray, setCombineArray] = useState([]);

  const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   setUser(currentUser);
  // }, [currentUser]);
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
      console.log("Object 3: ", object3);
      setCombineArray(object3);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4">
          {/* Profil Resmi */}
          <img
            className="w-24 h-24 rounded-full mx-auto"
            src="/user.png"
            alt="User Avatar"
          />

          {/* Temel Bilgiler */}
          <h2 className="text-lg font-bold text-center">{user.name}</h2>
          <p className="text-sm text-center text-gray-500">
            {user.position} - {user.department}
          </p>
          <p className="text-xs text-center text-gray-400">
            Son Giriş: {user.lastLogin}
          </p>

          {/* Performans Göstergeleri */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-blue-500">
                {user.requestCount}
              </p>
              <p className="text-sm text-gray-500">Tamamlanan Talepler</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-500">
                {user.approvalCount}
              </p>
              <p className="text-sm text-gray-500">Onaylanan Talepler</p>
            </div>
          </div>

          {/* Rol ve Yetki Bilgileri */}
          <div>
            <p className="font-semibold text-gray-800">Rol ve Yetkiler:</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>{user.role}</li>
            </ul>
            <p className="font-semibold text-gray-800 mt-2">Yetkiler:</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {user.permissions.map((perm, index) => (
                <li key={index}>{perm}</li>
              ))}
            </ul>
          </div>

          {/* İşlem Geçmişi */}
          <div className="mt-4">
            <p className="font-semibold text-gray-800">İşlem Geçmişi:</p>
            <p className="text-sm text-gray-600">
              Tamamlanan Görevler: {user.tasksCompleted}
            </p>
            <p className="text-sm text-gray-600">
              Aktif Görevler: {user.activeTasks}
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
            <TalepOnayDatagrid />
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
