'use client';

import React from 'react'
import { IWaitingKisiYetkiEdit, IWaitingRolAtama, IWaitingRolCikarma } from '@/types';

interface Props {
  waitingRolAtamalar: IWaitingRolAtama[]
  waitingRolCikarmalar: IWaitingRolCikarma[]
  waitingKisiYetkiEdit: IWaitingKisiYetkiEdit[]
}

export default function TalepOnayPage({ waitingRolAtamalar, waitingRolCikarmalar, waitingKisiYetkiEdit }: Props) {


  // const [rolAtamalar, setRolAtamalar] = useState<IWaitingRolAtama[]>(waitingRolAtamalar)
  // const [rolCikarmalar, setRolCikarmalar] = useState<IWaitingRolCikarma[]>(waitingRolCikarmalar)
  // const [kisiYetkiEdit, setKisiYetkiEdit] = useState<IWaitingKisiYetkiEdit[]>(waitingKisiYetkiEdit)
  // const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   startTransition(async () => {
  //     const [rolAtamalar, rolCikarmalar, kisiYetkiEdit] = await Promise.all([
  //       WaitingRolAtamalar(),
  //       WaitingRolCikarmalar(),
  //       WaitingKisiYetkiEdit(),
  //     ]);

  //     setRolAtamalar(rolAtamalar);
  //     setRolCikarmalar(rolCikarmalar);
  //     setKisiYetkiEdit(kisiYetkiEdit);
  //   });
  // }, [])

  // Giriş yapan kullanıcının taleplerini almak için filtreleme
  const getPendingCount = () => {
    // Giriş yapan kullanıcıya ait onay bekleyen talepler
    const pendingRolAtama = waitingRolAtamalar.length;

    const pendingRolCikarma = waitingRolCikarmalar.length;

    const pendingKisiYetki = waitingKisiYetkiEdit.length;

    return {
      rolAtama: pendingRolAtama,
      rolCikarma: pendingRolCikarma,
      kisiYetki: pendingKisiYetki,
    };
  };

  const pendingCounts = getPendingCount();

  // if (isPending) {
  //   return (
  //     <div className='flex flex-col items-center justify-center w-full p-4 space-y-8 animate-pulse'>
  //       {/* Summary Table */}
  //       <div className="w-full mb-6 bg-gray-200 p-4 rounded-lg">
  //         <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
  //         <table className="min-w-full table-auto">
  //           <thead>
  //             <tr className="bg-gray-200">
  //               <th className="px-4 py-2 text-left">
  //                 <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  //               </th>
  //               <th className="px-4 py-2 text-left">
  //                 <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  //               </th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr>
  //               <td className="px-4 py-2">
  //                 <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  //               </td>
  //               <td className="px-4 py-2">
  //                 <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  //               </td>
  //             </tr>
  //             <tr>
  //               <td className="px-4 py-2">
  //                 <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  //               </td>
  //               <td className="px-4 py-2">
  //                 <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  //               </td>
  //             </tr>
  //             <tr>
  //               <td className="px-4 py-2">
  //                 <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  //               </td>
  //               <td className="px-4 py-2">
  //                 <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   )
  // }

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
