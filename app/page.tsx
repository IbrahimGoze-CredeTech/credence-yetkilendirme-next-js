// pages/index.tsx
import KisiDataGridOzet from "./anasayfa/KisiDataGridOzet";
import TaleOnayDatagrid from "./anasayfa/talep-onay/TalepOnayDatagrid";
import TalepOzet from "./anasayfa/TalepOzet";

import "devextreme/dist/css/dx.light.css";
import config from "devextreme/core/config";

export default function Home() {
  config({
    forceIsoDateParsing: true,
    // ...
  });

  return (
    <div className="h-screen w-full grid grid-rows-2 gap-4 p-4">
      {/* Üst alan (tek parça) */}
      <div className="border rounded-xl p-4 shadow-lg overflow-auto">
        <TaleOnayDatagrid />
      </div>

      {/* Alt alan (iki parça) */}
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="border rounded-xl p-4 shadow-lg overflow-auto">
          < KisiDataGridOzet />
        </div>

        <div className="border rounded-xl p-4 shadow-lg overflow-auto">
          <TalepOzet />
        </div>
      </div>
    </div>
  );
}
