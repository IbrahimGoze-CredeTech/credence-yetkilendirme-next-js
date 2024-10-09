import RolYetkiDetailModal from "./RolYetkiDetailModal";
import RolYetkiDataGridModal from "./RolYetkiDataGridModal";
import { ModalContextWrapper } from "../context";
import "devextreme/dist/css/dx.light.css";
import NavBar from "../components/NavBar";
export default function Home() {
  const userName = "Alper";
  const userSurname = "Özpınar";
  const userRole = "Admin";

  return (
    <ModalContextWrapper>
      <div className="h-screen w-full">
        <RolYetkiDataGridModal />
        <div style={{ height: "10%" }} className="w-full">
          <NavBar userName={userName} userSurname={userSurname} userRole={userRole} />
        </div>


        <div style={{ height: "100%" }} className="flex flex-col p-4">
          <RolYetkiDetailModal />
        </div>
      </div>
    </ModalContextWrapper>
  );
}