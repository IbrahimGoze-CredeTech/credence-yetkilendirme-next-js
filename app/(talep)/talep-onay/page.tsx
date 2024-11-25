import { Suspense } from 'react'
import { TalepOnayClient } from './talep-onay-client';
import { PreviousKisiSayfaAtama, PreviousKisiSayfaCikarma, PreviousKisiSayfaEdit, PreviousKisiYetkiEdit, PreviousRolAtama, PreviousRolCikarma, PreviousRolSayfaAtama, PreviousRolSayfaCikarma } from '@/actions/previous-demands';
import { WaitingRolAtamalar, WaitingRolCikarmalar, WaitingKisiYetkiEdit, WaitingKisiSayfaAtama, WaitingKisiSayfaEdit, WaitingKisiSayfaCikarma, WaitingRolSayfaAtama, WaitingRolSayfaCikarma } from '@/actions/waiting-demands';

async function TalepOnayData() {
  const [
    waitingRolAtamalar,
    waitingRolCikarmalar,
    waitingKisiYetkiEdit,
    waitingKisiSayfaAtama,
    waitingKisiSayfaCikarma,
    waitingKisiSayfaEdit,
    waitingRolSayfaAtama,
    waitingRolSayfaCikarma,
    previousRolAtama,
    previousRolCikarma,
    previousKisiYetkiEdit,
    previousKisiSayfaAtama,
    previousKisiSayfaCikarma,
    previousKisiSayfaEdit,
    previousRolSayfaAtama,
    previousRolSayfaCikarma
  ] = await Promise.all([
    WaitingRolAtamalar(),
    WaitingRolCikarmalar(),
    WaitingKisiYetkiEdit(),
    WaitingKisiSayfaAtama(),
    WaitingKisiSayfaCikarma(),
    WaitingKisiSayfaEdit(),
    WaitingRolSayfaAtama(),
    WaitingRolSayfaCikarma(),
    PreviousRolAtama(),
    PreviousRolCikarma(),
    PreviousKisiYetkiEdit(),
    PreviousKisiSayfaAtama(),
    PreviousKisiSayfaCikarma(),
    PreviousKisiSayfaEdit(),
    PreviousRolSayfaAtama(),
    PreviousRolSayfaCikarma()
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
      waitingRolSayfaCikarma={waitingRolSayfaCikarma}
      previousRolAtama={previousRolAtama}
      previousRolCikarma={previousRolCikarma}
      previousKisiYetkiEdit={previousKisiYetkiEdit}
      previousKisiSayfaAtama={previousKisiSayfaAtama}
      previousKisiSayfaCikarma={previousKisiSayfaCikarma}
      previousKisiSayfaEdit={previousKisiSayfaEdit}
      previousRolSayfaAtama={previousRolSayfaAtama}
      previousRolSayfaCikarma={previousRolSayfaCikarma}
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