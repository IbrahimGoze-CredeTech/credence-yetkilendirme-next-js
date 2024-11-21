import { Suspense } from 'react'
import { TalepOnayClient } from './talep-onay-client';
import { PreviousKisiSayfaAtama, PreviousKisiSayfaEdit, PreviousKisiYetkiEdit, PreviousRolAtama, PreviousRolCikarma } from '@/actions/previous-demands';
import { WaitingRolAtamalar, WaitingRolCikarmalar, WaitingKisiYetkiEdit, WaitingKisiSayfaAtama, WaitingKisiSayfaEdit } from '@/actions/waiting-demands';


async function TalepOnayData() {
  // MAke promise awawit for 2 seconds
  // await new Promise(resolve => setTimeout(resolve, 2000));
  const [
    waitingRolAtamalar,
    waitingRolCikarmalar,
    waitingKisiYetkiEdit,
    waitingKisiSayfaAtama,
    waitingKisiSayfaEdit,
    previousRolAtama,
    previousRolCikarma,
    previousKisiYetkiEdit,
    previousKisiSayfaAtama,
    previousKisiSayfaEdit
  ] = await Promise.all([
    WaitingRolAtamalar(),
    WaitingRolCikarmalar(),
    WaitingKisiYetkiEdit(),
    WaitingKisiSayfaAtama(),
    WaitingKisiSayfaEdit(),
    PreviousRolAtama(),
    PreviousRolCikarma(),
    PreviousKisiYetkiEdit(),
    PreviousKisiSayfaAtama(),
    PreviousKisiSayfaEdit()
  ]);

  return (
    <TalepOnayClient
      waitingRolAtamalar={waitingRolAtamalar}
      waitingRolCikarmalar={waitingRolCikarmalar}
      waitingKisiYetkiEdit={waitingKisiYetkiEdit}
      waitingKisiSayfaAtama={waitingKisiSayfaAtama}
      waitingKisiSayfaEdit={waitingKisiSayfaEdit}
      previousRolAtama={previousRolAtama}
      previousRolCikarma={previousRolCikarma}
      previousKisiYetkiEdit={previousKisiYetkiEdit}
      previousKisiSayfaAtama={previousKisiSayfaAtama}
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