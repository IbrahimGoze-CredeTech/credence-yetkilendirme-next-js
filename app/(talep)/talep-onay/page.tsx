import { Suspense } from 'react'
import { TalepOnayClient } from './talep-onay-client';
import { PreviousKisiSayfaAtama, PreviousKisiSayfaCikarma, PreviousKisiSayfaEdit, PreviousKisiYetkiEdit, PreviousRolAtama, PreviousRolCikarma, PreviousRolSayfaAtama } from '@/actions/previous-demands';
import { WaitingRolAtamalar, WaitingRolCikarmalar, WaitingKisiYetkiEdit, WaitingKisiSayfaAtama, WaitingKisiSayfaEdit, WaitingKisiSayfaCikarma, WaitingRolSayfaAtama } from '@/actions/waiting-demands';


async function TalepOnayData() {
  const [
    waitingRolAtamalar,
    waitingRolCikarmalar,
    waitingKisiYetkiEdit,
    waitingKisiSayfaAtama,
    waitingKisiSayfaCikarma,
    waitingKisiSayfaEdit,
    waitingRolSayfaAtama,
    previousRolAtama,
    previousRolCikarma,
    previousKisiYetkiEdit,
    previousKisiSayfaAtama,
    previousKisiSayfaCikarma,
    previousKisiSayfaEdit,
    previousRolSayfaAtama
  ] = await Promise.all([
    WaitingRolAtamalar(),
    WaitingRolCikarmalar(),
    WaitingKisiYetkiEdit(),
    WaitingKisiSayfaAtama(),
    WaitingKisiSayfaCikarma(),
    WaitingKisiSayfaEdit(),
    WaitingRolSayfaAtama(),
    PreviousRolAtama(),
    PreviousRolCikarma(),
    PreviousKisiYetkiEdit(),
    PreviousKisiSayfaAtama(),
    PreviousKisiSayfaCikarma(),
    PreviousKisiSayfaEdit(),
    PreviousRolSayfaAtama()
  ]);

  return (
    <TalepOnayClient
      waitingRolAtamalar={waitingRolAtamalar}
      waitingRolCikarmalar={waitingRolCikarmalar}
      waitingKisiYetkiEdit={waitingKisiYetkiEdit}
      waitingKisiSayfaAtama={waitingKisiSayfaAtama}
      waitingKisiSayfaCikarma={waitingKisiSayfaCikarma}
      waitingKisiSayfaEdit={waitingKisiSayfaEdit}
      waitingRolSayfaAtama={waitingRolSayfaAtama}
      previousRolAtama={previousRolAtama}
      previousRolCikarma={previousRolCikarma}
      previousKisiYetkiEdit={previousKisiYetkiEdit}
      previousKisiSayfaAtama={previousKisiSayfaAtama}
      previousKisiSayfaCikarma={previousKisiSayfaCikarma}
      previousKisiSayfaEdit={previousKisiSayfaEdit}
      previousRolSayfaAtama={previousRolSayfaAtama}
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