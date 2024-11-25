import KisiDataGridOzet from "./_anasayfa/KisiDataGridOzet";
import TalepOnayDatagrid from "./_anasayfa/talep-onay/TalepOnayDatagrid";
import TalepOzet from "./_anasayfa/TalepOzet";
import YaklasanYetkiler from "./_anasayfa/YaklasanYetkiler";
import "devextreme/dist/css/dx.light.css";
import config from "devextreme/core/config";
// import { GetKisiAccessibleRoutes } from "@/actions/views";

export default function Home() {
  config({
    forceIsoDateParsing: true,
    // ...
  });

  // await GetKisiAccessibleRoutes();

  return (
    <div className="h-screen w-full grid grid-rows-2 gap-4 p-4">

      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="border rounded-xl p-4 shadow-lg overflow-auto">
          <TalepOnayDatagrid />
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
