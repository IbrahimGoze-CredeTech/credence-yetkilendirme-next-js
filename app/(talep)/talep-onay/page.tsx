import { Suspense } from 'react'
import { PreviousKisiSayfaAtama, PreviousKisiSayfaCikarma, PreviousKisiSayfaEdit, PreviousKisiYetkiEdit, PreviousRolAtama, PreviousRolCikarma, PreviousRolSayfaAtama, PreviousRolSayfaCikarma, PreviousRolYetkiEdit } from '@/actions/previous-demands';
import { WaitingKisiSayfaAtama, WaitingKisiSayfaCikarma, WaitingKisiSayfaEdit, WaitingKisiYetkiEdit, WaitingRolAtamalar, WaitingRolCikarmalar, WaitingRolSayfaAtama, WaitingRolSayfaCikarma, WaitingRolYetkiEdit } from '@/actions/waiting-demands';
import { TalepOnayClient } from './talep-onay-client';

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
    waitingRolYetkiEdit,
    previousRolAtama,
    previousRolCikarma,
    previousKisiYetkiEdit,
    previousKisiSayfaAtama,
    previousKisiSayfaCikarma,
    previousKisiSayfaEdit,
    previousRolSayfaAtama,
    previousRolSayfaCikarma,
    previousRolYetkiEdit
  ] = await Promise.all([
    WaitingRolAtamalar(),
    WaitingRolCikarmalar(),
    WaitingKisiYetkiEdit(),
    WaitingKisiSayfaAtama(),
    WaitingKisiSayfaCikarma(),
    WaitingKisiSayfaEdit(),
    WaitingRolSayfaAtama(),
    WaitingRolSayfaCikarma(),
    WaitingRolYetkiEdit(),
    PreviousRolAtama(),
    PreviousRolCikarma(),
    PreviousKisiYetkiEdit(),
    PreviousKisiSayfaAtama(),
    PreviousKisiSayfaCikarma(),
    PreviousKisiSayfaEdit(),
    PreviousRolSayfaAtama(),
    PreviousRolSayfaCikarma(),
    PreviousRolYetkiEdit()
  ]);

  return (
    <TalepOnayClient
      previousKisiSayfaAtama={previousKisiSayfaAtama}
      previousKisiSayfaCikarma={previousKisiSayfaCikarma}
      previousKisiSayfaEdit={previousKisiSayfaEdit}
      previousKisiYetkiEdit={previousKisiYetkiEdit}
      previousRolAtama={previousRolAtama}
      previousRolCikarma={previousRolCikarma}
      previousRolSayfaAtama={previousRolSayfaAtama}
      previousRolSayfaCikarma={previousRolSayfaCikarma}
      previousRolYetkiEdit={previousRolYetkiEdit}
      waitingKisiSayfaAtama={waitingKisiSayfaAtama}
      waitingKisiSayfaCikarma={waitingKisiSayfaCikarma}
      waitingKisiSayfaEdit={waitingKisiSayfaEdit}
      waitingKisiYetkiEdit={waitingKisiYetkiEdit}
      waitingRolAtamalar={waitingRolAtamalar}
      waitingRolCikarmalar={waitingRolCikarmalar}
      waitingRolSayfaAtama={waitingRolSayfaAtama}
      waitingRolSayfaCikarma={waitingRolSayfaCikarma}
      waitingRolYetkiEdit={waitingRolYetkiEdit} />
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