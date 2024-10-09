"use client";
import React, { useEffect, useState } from 'react';
import { useModalContext } from '../context';
import { Rol } from '../../types';
import DataGrid, {
  Column,
  Editing,
  Paging,
  Popup,
  FilterRow,
} from "devextreme-react/data-grid";
import { Button } from 'devextreme-react'; // Buton bileşenini içe aktar

export default function RolYetkiDataGridModal() {
  const modalContext = useModalContext();
  const [employees, setEmployees] = useState<Rol[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<Rol | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (!modalContext?.isOpen) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.30.90:98/api/Rol/rol-yetki/`);
        if (!response.ok) throw new Error("Network response was not ok");
        const bilgilerData = await response.json();
        setEmployees(bilgilerData);
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

  return (
    <div style={{ position: 'fixed', zIndex: 2 }} className={`top-0 flex items-start justify-center w-full bg-gray-400/15 backdrop-blur-sm min-h-[100vh] h-full overflow-auto ${modalContext?.isOpen ? "visible" : "hidden"}`} onPointerDown={(e) => {
      e.stopPropagation();
      modalContext.toggle();
    }}>
      <div style={{ position: 'relative', pointerEvents: "auto", userSelect: "none", zIndex: 3, top: "20%" }} className="w-[80vw] bg-white p-4 rounded-md" onPointerDown={(e) => e.stopPropagation()}>
        <DataGrid
          id="gridContainer"
          dataSource={employees}
          keyExpr="rolAdi"
          allowColumnReordering={true}
          showBorders={true}
          onRowClick={handleRowClick}
        >
          <FilterRow visible={true} />
          <Paging enabled={true} />
          <Editing
            mode="row"
            allowUpdating={true}
            allowDeleting={true}
            useIcons={true} // Simge kullanmayı etkinleştir
          />

          <Column dataField="rolAdi" caption="Rol" />
          <Column dataField="yetkiAdi" caption="Yetki" />
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

        <Popup
          title="Rol Düzenle"
          showTitle={true}
          visible={isPopupVisible}
          onHiding={handleClosePopup}
          width={700}
          height={600}
        >
          {selectedRowData && (
            <div>
              <p><strong>Rol:</strong> {selectedRowData.rolAdi}</p>
              <p><strong>Yetki:</strong> {selectedRowData.yetkiAdi}</p>
              <p><strong>Eylem Türü:</strong> {selectedRowData.eylemlerTuruId}</p>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
}
