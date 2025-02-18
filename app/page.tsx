import config from "devextreme/core/config";
import { Suspense } from "react";
import { WaitingKisiYetkiEdit, WaitingRolAtamalar, WaitingRolCikarmalar } from "@/actions/waiting-demands";
import KisiDataGridOzet from "./_anasayfa/KisiDataGridOzet";
import TalepOzet from "./_anasayfa/TalepOzet";
import YaklasanYetkiler from "./_anasayfa/YaklasanYetkiler";
import TalepOnayDatagrid from "./_anasayfa/talep-onay/TalepOnayDatagrid";
import "devextreme/dist/css/dx.light.css";
import TalepOnaySkeleton from "./_anasayfa/talep-onay/talep-onay-skeleton";
// import { GetKisiAccessibleRoutes } from "@/actions/views";

export default function Home() {
  config({
    forceIsoDateParsing: true,
    // ...
  });

  async function TalepOnayData() {
    // wait 2 seconds
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const [waitingRolAtamalar, waitingRolCikarmalar, waitingKisiYetkiEdit] = await Promise.all([
      WaitingRolAtamalar(),
      WaitingRolCikarmalar(),
      WaitingKisiYetkiEdit()
    ]);
    return (
      <TalepOnayDatagrid
        waitingKisiYetkiEdit={waitingKisiYetkiEdit}
        waitingRolAtamalar={waitingRolAtamalar}
        waitingRolCikarmalar={waitingRolCikarmalar}
      />
    )
  }

  return (
    <div className="h-screen w-full grid grid-rows-2 gap-4 p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="border rounded-xl p-4 shadow-lg overflow-auto">
          <Suspense fallback={<TalepOnaySkeleton />}>
            <TalepOnayData />
          </Suspense>
        </div>
        <div className="border rounded-xl p-4 shadow-lg overflow-auto">
          <YaklasanYetkiler />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="border rounded-xl p-4 shadow-lg overflow-auto">
          <KisiDataGridOzet />
        </div>
        <div className="border rounded-xl p-4 shadow-lg overflow-auto">
          <TalepOzet />
        </div>
      </div>
    </div>
  );
}
