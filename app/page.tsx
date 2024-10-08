// pages/index.tsx
import SummaryDataGrid from "./components/SummaryDataGrid";
import DetailDataGridModal from "./components/DetailDataGridModal";
import NavBar from "./components/NavBar";
import { ModalContextWrapper } from "./context"; // ModalContextWrapper'ı import edin
import "devextreme/dist/css/dx.light.css";

export default function Home() {
  const userName = "Alper";
  const userSurname = "Özpınar";
  const userRole = "Admin";

  return (
    <ModalContextWrapper>
      <div className="h-screen w-full">
        <DetailDataGridModal />
        <div style={{ height: "10%" }} className="w-full">
          <NavBar userName={userName} userSurname={userSurname} userRole={userRole} />
        </div>

        <div style={{ height: "90%" }} className="flex flex-col p-4">
          <SummaryDataGrid />
        </div>
      </div>
    </ModalContextWrapper>
  );
}
