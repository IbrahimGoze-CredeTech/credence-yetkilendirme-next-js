// pages/index.tsx
import KisiDataGrid from "../../components/KisiDataGrid";
import KisiDetailModal from "../../components/KisiDetailModal";
import "devextreme/dist/css/dx.light.css";

export default function Home() {


  return (
    <div className="h-screen w-full">
      <KisiDetailModal />
      <div className="flex flex-col p-4">
        <KisiDataGrid />
      </div>
    </div>
  );
}
