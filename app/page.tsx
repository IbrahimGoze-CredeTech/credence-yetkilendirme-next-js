// pages/index.tsx
import KisiDataGridOzet from "./anasayfa/KisiDataGridOzet";
import RolYetkiDataGridOzet from "./anasayfa/RolYetkiDataGridOzet";
import TalepOzet from "./anasayfa/TalepOzet";
import "devextreme/dist/css/dx.light.css";
import config from "devextreme/core/config";


export default function Home() {
  config({
    forceIsoDateParsing: true,
    // ...
  })
  return (
    <div className="h-screen w-full grid grid-cols-2 grid-rows-2 gap-4 p-4">
      <div className="border rounded-xl  p-4 shadow-lg"> {/* İlk alan */}
        <KisiDataGridOzet />
      </div>
      <div className="border  rounded-xl  p-4 shadow-lg"> {/* İkinci alan */}
        <RolYetkiDataGridOzet />
      </div>
      <div className="border  rounded-xl  p-4 shadow-lg"> {/* Üçüncü alan */}
        <TalepOzet />
      </div>
      <div className="border rounded-xl  p-4 shadow-lg"> {/* Dördüncü alan */}
        {/* Buraya başka bir component koyabilirsin */}
      </div>
    </div>
  );
}
