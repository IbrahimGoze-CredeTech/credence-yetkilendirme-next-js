import { Suspense } from 'react'
import { GetWaitingKisiSayfaEdit, GetWaitingKisiYetkiEdit, GetWaitingRolAtamalar, GetWaitingRolCikarmalar } from '@/actions/bekleyen-talepler';
import { GetPreviousKisiSayfaEditDetails, GetPreviousKisiYetkiEditDetails, GetPreviousRolAtamaDetails, GetPreviousRolCikarmaDetails } from '@/actions/eski-talepler';
import { TalepOnayClient } from './talep-onay-client';


async function TalepOnayData() {
  const [
    rolAtamalar,
    rolCikarmalar,
    kisiYetkiEdit,
    kisiSayfaEdit,
    rolAtamaTalepler,
    rolCikarmaTalepler,
    kisiYetkiEditTalepler,
    previousKisiSayfaEdit
    // kisiSayfaEdit
  ] = await Promise.all([
    GetWaitingRolAtamalar(),
    GetWaitingRolCikarmalar(),
    GetWaitingKisiYetkiEdit(),
    GetWaitingKisiSayfaEdit(),
    GetPreviousRolAtamaDetails(),
    GetPreviousRolCikarmaDetails(),
    GetPreviousKisiYetkiEditDetails(),
    GetPreviousKisiSayfaEditDetails()
    // fetcherGet("/Talep/kisi-sayfaEdit-bekleyen").then(res => res.json())
  ]);

  return (
    <TalepOnayClient
      rolAtamalar={rolAtamalar}
      rolCikarmalar={rolCikarmalar}
      kisiYetkiEdit={kisiYetkiEdit}
      rolAtamaTalepler={rolAtamaTalepler}
      rolCikarmaTalepler={rolCikarmaTalepler}
      kisiYetkiEditTalepler={kisiYetkiEditTalepler}
      kisiSayfaEdit={kisiSayfaEdit}
      previousKisiSayfaEdit={previousKisiSayfaEdit}
    />
  )
}

export default function TalepOnayPage() {
  return (
    <div className='flex flex-col items-center justify-center w-full p-4 space-y-8'>
      <h1 className='font-bold text-4xl'>Onay Bekleyen Talepler</h1>
      <Suspense fallback={<p className='text-2xl font-bold'>Yükleniyor...</p>}>
        <TalepOnayData />
      </Suspense>
    </div>
  )
}