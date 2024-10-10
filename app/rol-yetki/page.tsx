import RolYetkiDataGrid from "./RolYetkiDataGrid";
import RolYetkiDetailModal from "./RolYetkiDetailModal";
import "devextreme/dist/css/dx.light.css";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-medium my-4">Rol Bilgileri</h1>
      <div className="h-screen w-full">
        <RolYetkiDetailModal />
        <div className="flex flex-col p-4">
          <RolYetkiDataGrid />
        </div>
      </div>
    </div>
  );
}