// pages/index.tsx
import KisiDataGridOzet from "./anasayfa/KisiDataGridOzet";
import RolYetkiDataGridOzet from "./anasayfa/RolYetkiDataGridOzet";
import TalepOzet from "./anasayfa/TalepOzet";
import "devextreme/dist/css/dx.light.css";

export default function Home() {
  return (
    <div className="h-screen w-full grid grid-cols-2 grid-rows-2 gap-4 p-4">
      <div className="border p-4"> {/* İlk alan */}
        <KisiDataGridOzet />
      </div>
      <div className="border p-4"> {/* İkinci alan */}
        <RolYetkiDataGridOzet />
      </div>
      <div className="border p-4"> {/* Üçüncü alan */}
        <TalepOzet />
      </div>
      <div className="border p-4"> {/* Dördüncü alan */}
        {/* Buraya başka bir component koyabilirsin */}
      </div>
    </div>
  );
}
