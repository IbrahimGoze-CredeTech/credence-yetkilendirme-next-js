"use client";
import React, { useEffect, useState } from 'react';
import { useModalContext, useStaticTablesContext } from '../../context';
import { Rol, RolYetki } from '../../types';
import DataGrid, {
  Column,
  Editing,
  Paging,
  FilterRow,
} from "devextreme-react/data-grid";
import { Button, Popup } from 'devextreme-react'; // Buton bileşenini içe aktar
import { rolyetkiDataGridConfig } from '../../configs/rol-yetki-data-grid-config';

type RolYetkiInsertType = {
  rolAdi: string,
  yetiAdi: string,
  eylemlerTuruId: number
}

export default function RolYetkiDetailModal() {
  const modalContext = useModalContext();
  const staticTablesContext = useStaticTablesContext();
  const [insertedRolYetki, setInsertedRolYetki] = useState<RolYetkiInsertType[]>([]);

  const [employees, setEmployees] = useState<RolYetki[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<Rol | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [rolAdi, setRolAdi] = useState<string | null>(null); // Rol Adını tutacak state

  useEffect(() => {
    if (!modalContext?.isOpen) return;

    const fetchData = async () => {
      // console.log("id in detail: ", modalContext.id);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Rol/yetkiler/${modalContext.id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const bilgilerData = await response.json();
        setEmployees(bilgilerData);
        // staticTablesContext.setRoller(bilgilerData);
        // console.log('rol-yetki: ', bilgilerData);


        // Gelen verilerden ilk rol'ün adını alıyoruz (örnek olarak)
        if (bilgilerData.length > 0) {
          setRolAdi(bilgilerData[0].rolAdi); // İlk kaydın rol adını al
        }
        else if (!Array.isArray(bilgilerData)) {
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSelectedRowData(null);
      setIsPopupVisible(false);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modalContext?.isOpen]);

  const handleRowClick = (e) => {
    setSelectedRowData(e.data);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleInsertRow = (e: { yetkiAdi: string; eylemlerTuruId: number }) => {
    setInsertedRolYetki(prevState => [
      ...prevState,
      {
        rolAdi: rolAdi!,
        yetiAdi: e.yetkiAdi,
        eylemlerTuruId: e.eylemlerTuruId
      }
    ]);
  }

  // const handleSaveChanges = async () => {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Rol/yetkiler/${modalContext.id}`);
  // }
  return (
    <div style={{ position: 'fixed', zIndex: 2 }} className={`top-0 flex items-start justify-center w-full bg-gray-400/15 backdrop-blur-sm min-h-[100vh] h-full overflow-auto ${modalContext?.isOpen ? "visible" : "hidden"}`} onPointerDown={(e) => {
      e.stopPropagation();
      modalContext.toggle();
    }}>
      <div style={{ position: 'relative', pointerEvents: "auto", userSelect: "none", zIndex: 3, top: "20%" }} className="w-[80vw] bg-white p-4 rounded-md" onPointerDown={(e) => e.stopPropagation()}>

        {/* Rol Adı Başlık olarak gösteriliyor */}
        {rolAdi && <h2 className="text-3xl font-bold text-center text-black  pt-8">{rolAdi}</h2>}

        <DataGrid
          id="gridContainer"
          dataSource={employees}
          keyExpr="yetkiAdi"
          allowColumnReordering={true}
          showBorders={true}
          onRowClick={handleRowClick}
          onRowInserted={(e) => {
            handleInsertRow(e.data);
          }}
          {...rolyetkiDataGridConfig}
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

          <Column dataField="yetkiAdi" caption="Yetki"
            allowEditing={false} />
          <Column dataField="eylemlerTuruId" caption="Eylem Türü" />

          {/* Edit ve Delete simgeleri için özel simgeler ekleyin */}
          <Column
            type="buttons"
            width={100}
            caption="İşlemler"
          >
            <Button
              icon="edit" // Edit simgesi
              onClick={(e) => {
                // Düzenleme işlemini burada yönetebilirsiniz
                e.event.stopPropagation(); // Satır tıklamasını durdur
              }}
            />
            <Button
              icon="trash" // Silme simgesi
              onClick={(e) => {
                // Silme işlemini burada yönetebilirsiniz
                e.event.stopPropagation(); // Satır tıklamasını durdur
              }}
            />
          </Column>
        </DataGrid>

        <Button onClick={() => {
          console.log('insertedRolYetki: ', insertedRolYetki);
        }}>Kaydet</Button>

      </div>
    </div>
  );
}
