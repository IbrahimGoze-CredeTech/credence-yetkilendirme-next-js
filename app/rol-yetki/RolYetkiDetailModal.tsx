"use client";
import { console } from "inspector";
import { Button } from "devextreme-react"; // Buton bileşenini içe aktar
import DataGrid, {
  Column,
  Editing,
  FilterRow,
  Paging,
} from "devextreme-react/data-grid";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FetcherGet, FetcherPost } from "@/utils";
import { rolYetkiDataGridConfig } from "../../configs/rol-yetki-data-grid-config";
import { useModalContext } from "../../context";
import type { RolYetkiOldType } from "../../types";

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

  const [employees, setEmployees] = useState<RolYetkiOldType[]>([]);
  const [rolAdi, setRolAdi] = useState<string | null>(null); // Rol Adını tutacak state

  useEffect(() => {
    if (!modalContext?.isOpen) return;

    const fetchData = async () => {
      try {
        const bilgilerData = await FetcherGet(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    try {
      const result = await FetcherPost(
        "/Rol/rol-yetki",
        session.data?.token,
        JSON.stringify(insertedRolYetki)
      );

      if (result) {
        modalContext.toggle();
      }
      // Veriler kaydedildikten sonra modal'ı kapatma veya ek bir işlem yapabilirsiniz
      console.error("Kaydetme işlemi başarısız oldu: ", result.error);
    } catch (error) {
      console.error("Kaydetme işlemi başarısız oldu: ", error);
    }
  };

  return (
    <div
      className={`top-0 flex items-start justify-center w-full bg-gray-400/15 backdrop-blur-sm min-h-[100vh] h-full overflow-auto ${modalContext?.isOpen ? "visible" : "hidden"
        }`}
      onPointerDown={(e) => {
        e.stopPropagation();
        modalContext.toggle();
      }}
      style={{ position: "fixed", zIndex: 2 }}
    >
      <div
        className="w-[80vw] bg-white p-4 rounded-md"
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          pointerEvents: "auto",
          userSelect: "none",
          zIndex: 3,
          top: "20%",
        }}
      >
        {/* Rol Adı Başlık olarak gösteriliyor */}
        {rolAdi && (
          <h2 className="text-3xl font-bold text-center text-black  pt-8">
            {rolAdi}
          </h2>
        )}

        <DataGrid
          allowColumnReordering={true}
          dataSource={employees}
          id="gridContainer"
          keyExpr="yetkiAdi"
          onRowInserted={(e) => {
            handleInsertRow(e.data);
          }}
          showBorders={true}
          {...rolYetkiDataGridConfig}
        >
          <FilterRow visible={true} />
          <Paging enabled={true} />
          <Editing
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}
            mode="row"
            useIcons={true} // Simge kullanmayı etkinleştir
          />

          <Column allowEditing={false} caption="Yetki" dataField="yetkiAdi" />
          <Column caption="Eylem Türü" dataField="eylemlerTuruId" />

          {/* Edit ve Delete simgeleri için özel simgeler ekleyin */}
          <Column caption="İşlemler" type="buttons" width={100}>
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
