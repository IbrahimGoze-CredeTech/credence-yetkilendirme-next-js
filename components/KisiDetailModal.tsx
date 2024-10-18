"use client";

import React, { useEffect, useState } from 'react';
import { useModalContext } from '../context';
import { Kisi } from '../types';
import DataGrid, {
  Column,
  Editing,
  Paging,
  Popup,
  FilterRow,
  MasterDetail,
} from "devextreme-react/data-grid";

import { rolDataGridConfig } from '../configs/rol-data-grid-config';
import { yetkiDataGridConfig } from '../configs/yetki-data-grid-config';
import { ekstraYetkilerDataGridConfig } from '../configs/ekstra-yetkiler-data-grid-config';
import { RowClickEvent } from 'devextreme/ui/data_grid';
import { fetcherGet } from '@/utils';
import { useSession } from 'next-auth/react';

export default function KisiDetailModal() {
  const session = useSession();
  const modalContext = useModalContext();

  const [employees, setEmployees] = useState<Kisi[]>([]); // API'den gelecek roller için state
  const [selectedRowData, setSelectedRowData] = useState<Kisi | null>(null); // Seçili satır verisi için state
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup görünürlüğü için state

  useEffect(() => {
    if (!modalContext?.isOpen) return;

    const fetchData = async () => {
      const bilgilerFetch = await fetcherGet(`/Kisi/butun-bilgiler/${modalContext.id}`, session.data?.token);

      try {
        const [bilgilerData] = await Promise.all([bilgilerFetch]);
        if (bilgilerData) {
          setEmployees(bilgilerData);
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsPopupVisible(false); // Modal kapandığında popup'ı kapat
    }

    return () => {
      document.body.style.overflow = ''; // Ensure scroll is unlocked on cleanup
    };
  }, [modalContext?.isOpen]);

  const handleRowClick = (e: RowClickEvent) => {
    setSelectedRowData(e.data); // Seçilen satır verisini sakla
    setIsPopupVisible(true); // Popup'ı aç
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false); // Popup'ı kapat
  };

  return (
    <div style={{ position: 'fixed', zIndex: 2 }} className={`top-0 flex items-start justify-center w-full bg-gray-400/15 backdrop-blur-sm  min-h-[100vh] h-full overflow-auto ${modalContext?.isOpen ? "visible" : "hidden"}`} onPointerDown={(e) => {
      e.stopPropagation();
      modalContext.toggle();
    }}>
      <div style={{ position: 'relative', pointerEvents: "auto", userSelect: "none", zIndex: 3, top: "20%" }}
        className="w-[80vw] bg-white p-4 rounded-md" onPointerDown={(e) => e.stopPropagation()}>
        <DataGrid
          id="gridContainer"
          dataSource={[employees]} // Burada roller verisini kullanıyoruz
          keyExpr="kisiAdi" // 'kisiAdi' ile her satırı tanımlıyoruz
          allowColumnReordering={true}
          showBorders={true}
          onRowClick={handleRowClick} // Satıra tıklama olayını yönet
        >
          <FilterRow visible={true} />
          <Paging enabled={true} />
          <Editing
            mode="row"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
            useIcons={true}
          />

          {/* Main Columns */}
          <Column dataField="kisiAdi" caption="Ad" />
          <Column dataField="kisiSoyadi" caption="Soyad" />
          <Column dataField="departman" caption="Departman" />

          {/* Master-Detail Configuration */}
          <MasterDetail
            enabled={true}
            component={({ data }) => (
              <>
                {/* Roller Sub-grid */}
                <h4 className="text-3xl font-semibold">Roller</h4>
                <DataGrid
                  dataSource={data.data.roller} // Nested data from roller
                  showBorders={true}
                  {...rolDataGridConfig}
                >
                  {/* Düzenleme yapılandırması */}
                  <Editing
                    mode="row" // Düzenleme işlemi popup içinde yapılacak
                    allowUpdating={true} // Güncelleme izni
                    allowDeleting={true} // Silme izni
                    allowAdding={true} // Ekleme izni
                    useIcons={true} // Simge kullanımı
                  />
                </DataGrid>

                {/* Yetkiler Sub-grid */}
                <h4 className="text-3xl font-semibold mt-12">Yetkiler</h4>
                <DataGrid
                  dataSource={data.data.yetkiler} // Nested data from yetkiler
                  showBorders={true}
                  {...yetkiDataGridConfig}
                />
                {/* EkstraYetkiler Sub-grid */}
                <h4 className="text-3xl font-semibold mt-12">Ekstra Yetkiler</h4>
                <DataGrid
                  dataSource={data.data.ekstraYetkiler} // Nested data from ekstraYetkiler
                  showBorders={true}
                  {...ekstraYetkilerDataGridConfig}
                />
              </>
            )}
          />
        </DataGrid>

        {/* Popup ile sadece seçilen satır verilerini göster */}
        <Popup
          title="Detaylar"
          showTitle={true}
          visible={isPopupVisible} // Popup görünürlüğünü kontrol et
          onHiding={handleClosePopup} // Popup kapatıldığında fonksiyonu çağır
          width={700}
          height={600}
        >
          {selectedRowData && (
            <div>
              <p><strong>Ad:</strong> {selectedRowData.kisiAdi}</p>
              <p><strong>Soyad:</strong> {selectedRowData.kisiSoyadi}</p>
              <p><strong>Departman:</strong> {selectedRowData.departman}</p>
              {/* İlgili diğer verileri buraya ekleyebilirsiniz */}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
}
