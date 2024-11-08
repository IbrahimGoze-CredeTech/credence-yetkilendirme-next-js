// 'use client';

// import { bekleyenKisiYetkiEdit, bekleyenRolAtamalar, bekleyenRolCikarmalar } from '@/actions/bekleyen-talepler'
// import React, { useEffect, useState, useTransition } from 'react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import RolAtamaGrid from './_components/rol-atama-onay';
// import { KisiYetkiEditGridType, KisiYetkiEditTalepler, RolAtamaGridType, RolAtamaTalepler, RolCikarmaGridType, RolCikarmaTalepler } from '@/types';
// import RolCikarmaGrid from './_components/rol-cikarma-onay';
// import KisiYetkiOnay from './_components/kisi-yetki-onay';
// import { fetcherGet } from '@/utils';
// import { useSession } from 'next-auth/react';


// export default function TalepOnayPage() {
//   const session = useSession();

//   const [rolAtamalar, setRolAtamalar] = useState<RolAtamaGridType[]>([])
//   const [rolCikarmalar, setRolCikarmalar] = useState<RolCikarmaGridType[]>([])
//   const [kisiYetkiEdit, setKisiYetkiEdit] = useState<KisiYetkiEditGridType[]>([])
//   const [rolAtamaTalepler, setRolAtamaTalepler] = useState<RolAtamaTalepler[]>([]);
//   const [rolCikarmaTalepler, setRolCikarmaTalepler] = useState<RolCikarmaTalepler[]>([]);
//   const [kisiYetkiEditTalepler, setKisiYetkiEditTalepler] = useState<KisiYetkiEditTalepler[]>([]);
//   const [isPending, startTransition] = useTransition();

//   useEffect(() => {
//     startTransition(async () => {
//       const [rolAtamalar, rolCikarmalar, kisiYetkiEdit, rolAtamaTalepler, rolCikarmaTalepler, kisiYetkiEditTalepler] = await Promise.all([
//         bekleyenRolAtamalar(),
//         bekleyenRolCikarmalar(),
//         bekleyenKisiYetkiEdit(),
//         fetcherGet("/Talep/kisi-rolAtama-talepler", session.data?.token),
//         fetcherGet("/Talep/kisi-rolCikarma-talepler", session.data?.token),
//         fetcherGet("/Talep/kisi-kisiYetkiEdit-talepler", session.data?.token)
//       ]);

//       setRolAtamalar(rolAtamalar);
//       setRolCikarmalar(rolCikarmalar);
//       setKisiYetkiEdit(kisiYetkiEdit);
//       setRolAtamaTalepler(rolAtamaTalepler);
//       setRolCikarmaTalepler(rolCikarmaTalepler);
//       setKisiYetkiEditTalepler(kisiYetkiEditTalepler);
//     });
//   }, [])

//   return (
//     <>
//       <div className='flex flex-col items-center justify-center w-full p-4 space-y-8'>
//         <h1 className='font-bold text-4xl'>Onay Bekleyen Talepler</h1>
//         <Tabs defaultValue="rol-atama" className="w-[95vw] flex flex-col items-center justify-center p-4" >
//           <TabsList className='bg-gray-200 p-2 py-6'>
//             <TabsTrigger className='text-xl' value="rol-atama" disabled={isPending}>Rol Atama</TabsTrigger>
//             <TabsTrigger className='text-xl' value="rol-cikarma" disabled={isPending}>Rol Çıkarma</TabsTrigger>
//             <TabsTrigger className='text-xl' value="kisi-yetki" disabled={isPending}>Kişi Yetki</TabsTrigger>
//           </TabsList>
//           <TabsContent value="rol-atama"><RolAtamaGrid data={rolAtamalar} rolAtamaTalepler={rolAtamaTalepler} /></TabsContent>
//           <TabsContent value="rol-cikarma"><RolCikarmaGrid data={rolCikarmalar} rolCikarmaTalepler={rolCikarmaTalepler} /></TabsContent>
//           <TabsContent value="kisi-yetki"><KisiYetkiOnay data={kisiYetkiEdit} kisiYetkiEditTalepler={kisiYetkiEditTalepler} /></TabsContent>
//         </Tabs>

//       </div>
//     </>
//   )
// }
'use client';
import { bekleyenKisiYetkiEdit, bekleyenRolAtamalar, bekleyenRolCikarmalar } from '@/actions/bekleyen-talepler'
import React, { useEffect, useState, useTransition } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RolAtamaGrid from './_components/rol-atama-onay';
import { KisiYetkiEditGridType, KisiYetkiEditTalepler, RolAtamaGridType, RolAtamaTalepler, RolCikarmaGridType, RolCikarmaTalepler } from '@/types';
import RolCikarmaGrid from './_components/rol-cikarma-onay';
import KisiYetkiOnay from './_components/kisi-yetki-onay';
import { fetcherGet } from '@/utils';
import { useSession } from 'next-auth/react';

export default function TalepOnayPage() {
  const session = useSession();

  const [rolAtamalar, setRolAtamalar] = useState<RolAtamaGridType[]>([])
  const [rolCikarmalar, setRolCikarmalar] = useState<RolCikarmaGridType[]>([])
  const [kisiYetkiEdit, setKisiYetkiEdit] = useState<KisiYetkiEditGridType[]>([])
  const [rolAtamaTalepler, setRolAtamaTalepler] = useState<RolAtamaTalepler[]>([]);
  const [rolCikarmaTalepler, setRolCikarmaTalepler] = useState<RolCikarmaTalepler[]>([]);
  const [kisiYetkiEditTalepler, setKisiYetkiEditTalepler] = useState<KisiYetkiEditTalepler[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const [rolAtamalar, rolCikarmalar, kisiYetkiEdit, rolAtamaTalepler, rolCikarmaTalepler, kisiYetkiEditTalepler] = await Promise.all([
        bekleyenRolAtamalar(),
        bekleyenRolCikarmalar(),
        bekleyenKisiYetkiEdit(),
        fetcherGet("/Talep/kisi-rolAtama-talepler", session.data?.token),
        fetcherGet("/Talep/kisi-rolCikarma-talepler", session.data?.token),
        fetcherGet("/Talep/kisi-kisiYetkiEdit-talepler", session.data?.token)
      ]);

      setRolAtamalar(rolAtamalar);
      setRolCikarmalar(rolCikarmalar);
      setKisiYetkiEdit(kisiYetkiEdit);
      setRolAtamaTalepler(rolAtamaTalepler);
      setRolCikarmaTalepler(rolCikarmaTalepler);
      setKisiYetkiEditTalepler(kisiYetkiEditTalepler);
    });
  }, [])

  useEffect(() => {
    console.log("Giriş yapan kullanıcı:", session.data?.user);
  }, [session]);




  // Giriş yapan kullanıcının taleplerini almak için filtreleme
  const getPendingCount = () => {
    const userName = session.data?.user.name;
    const [userFirstName, userLastName] = userName?.split(" ") || ["", ""];

    // Giriş yapan kullanıcıya ait onay bekleyen talepler
    const pendingRolAtama = rolAtamaTalepler.filter(
      talep => talep.imzaAd === userFirstName && talep.imzaSoyad === userLastName && talep.durumAd === "Bekliyor" // "Bekliyor" onay durumu eklenebilir
    ).length;

    const pendingRolCikarma = rolCikarmaTalepler.filter(
      talep => talep.imzaAd === userFirstName && talep.imzaSoyad === userLastName && talep.imzaDurumu === "Bekliyor" // "Bekliyor" onay durumu eklenebilir
    ).length;

    const pendingKisiYetki = kisiYetkiEditTalepler.filter(
      talep => talep.imzaAd === userFirstName && talep.imzaSoyad === userLastName && talep.imzaDurumu === "Bekliyor" // "Bekliyor" onay durumu eklenebilir
    ).length;

    return {
      rolAtama: pendingRolAtama,
      rolCikarma: pendingRolCikarma,
      kisiYetki: pendingKisiYetki,
    };
  };

  const pendingCounts = getPendingCount();


  return (
    <div className='flex flex-col items-center justify-center w-full p-4 space-y-8'>
      {/* Özet Tablosu */}
      <div className="w-full mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="font-semibold text-xl mb-4">Onay Bekleyen Talepler Özeti</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Talep Türü</th>
              <th className="px-4 py-2 text-left">Bekleyen Sayısı</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Rol Atama</td>
              <td className="px-4 py-2">{pendingCounts.rolAtama}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Rol Çıkarma</td>
              <td className="px-4 py-2">{pendingCounts.rolCikarma}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Kişi Yetki</td>
              <td className="px-4 py-2">{pendingCounts.kisiYetki}</td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>
  );
}
