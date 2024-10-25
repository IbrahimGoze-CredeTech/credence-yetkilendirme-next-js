"use client";
import React, { useEffect, useState } from "react";
import { useModalContext } from "../../context";
import { RolYetkiOld } from "../../types";
import DataGrid, {
  Column,
  Editing,
  Paging,
  FilterRow,
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react"; // Buton bileşenini içe aktar
import { rolYetkiDataGridConfig } from "../../configs/rol-yetki-data-grid-config";
import { fetcherGet, fetcherPost } from "@/utils";
import { useSession } from "next-auth/react";

type RolYetkiInsertType = {
  rolAdi: string;
  yetkiAdi: string;
  eylemlerTuruId: number;
};

export default function RolYetkiDetailModal() {
  const session = useSession();
  const modalContext = useModalContext();

  const [insertedRolYetki, setInsertedRolYetki] = useState<
    RolYetkiInsertType[]
  >([]);

  const [employees, setEmployees] = useState<RolYetkiOld[]>([]);
  const [rolAdi, setRolAdi] = useState<string | null>(null); // Rol Adını tutacak state

  useEffect(() => {
    if (!modalContext?.isOpen) return;

    const fetchData = async () => {
      try {
        const bilgilerData = await fetcherGet(
          `/Rol/yetkiler/${modalContext.id}`,
          session.data?.token
        );
        setEmployees(bilgilerData);

        // Gelen verilerden ilk rol'ün adını alıyoruz (örnek olarak)
        if (bilgilerData.length > 0) {
          setRolAdi(bilgilerData[0].rolAdi); // İlk kaydın rol adını al
        } else if (!Array.isArray(bilgilerData)) {
          setRolAdi(bilgilerData.rolAdi);
        }
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchData();
  }, [modalContext?.isOpen]);

  useEffect(() => {
    if (modalContext?.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalContext?.isOpen]);

  const handleInsertRow = (e: { yetkiAdi: string; eylemlerTuruId: number }) => {
    setInsertedRolYetki((prevState) => [
      ...prevState,
      {
        rolAdi: rolAdi!,
        yetkiAdi: e.yetkiAdi,
        eylemlerTuruId: e.eylemlerTuruId,
      },
    ]);
  };

  const handleSaveChanges = async () => {
    console.log(JSON.stringify(insertedRolYetki));

    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Rol/rol-yetki`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json', // JSON formatında veri gönderiyoruz
      //   },
      //   body: JSON.stringify(insertedRolYetki), // `insertedRolYetki`'yi API'ye gönderiyoruz
      // });

      // if (!response.ok) {
      //   throw new Error('Verileri kaydetme işlemi sırasında bir hata oluştu.');
      // }

      // const result = await response.json();
      const result = await fetcherPost(
        "/Rol/rol-yetki",
        session.data?.token,
        JSON.stringify(insertedRolYetki)
      );
      console.log("Kaydedilen veri: ", result);

      // Veriler kaydedildikten sonra modal'ı kapatma veya ek bir işlem yapabilirsiniz
      modalContext.toggle();
    } catch (error) {
      console.error("Kaydetme işlemi başarısız oldu: ", error);
    }
  };

  return (
    <div
      style={{ position: "fixed", zIndex: 2 }}
      className={`top-0 flex items-start justify-center w-full bg-gray-400/15 backdrop-blur-sm min-h-[100vh] h-full overflow-auto ${
        modalContext?.isOpen ? "visible" : "hidden"
      }`}
      onPointerDown={(e) => {
        e.stopPropagation();
        modalContext.toggle();
      }}
    >
      <div
        style={{
          position: "relative",
          pointerEvents: "auto",
          userSelect: "none",
          zIndex: 3,
          top: "20%",
        }}
        className="w-[80vw] bg-white p-4 rounded-md"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Rol Adı Başlık olarak gösteriliyor */}
        {rolAdi && (
          <h2 className="text-3xl font-bold text-center text-black  pt-8">
            {rolAdi}
          </h2>
        )}

        <DataGrid
          id="gridContainer"
          dataSource={employees}
          keyExpr="yetkiAdi"
          allowColumnReordering={true}
          showBorders={true}
          onRowInserted={(e) => {
            handleInsertRow(e.data);
          }}
          {...rolYetkiDataGridConfig}
        >
          <FilterRow visible={true} />
          <Paging enabled={true} />
          <Editing
            mode="row"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
            useIcons={true} // Simge kullanmayı etkinleştir
          />

          <Column dataField="yetkiAdi" caption="Yetki" allowEditing={false} />
          <Column dataField="eylemlerTuruId" caption="Eylem Türü" />

          {/* Edit ve Delete simgeleri için özel simgeler ekleyin */}
          <Column type="buttons" width={100} caption="İşlemler">
            <Button
              icon="edit" // Edit simgesi
            />
            <Button
              icon="trash" // Silme simgesi
            />
          </Column>
        </DataGrid>
        <Button onClick={handleSaveChanges}>Kaydet</Button>
      </div>
    </div>
  );
}
