"use client";

import type { RowClickEvent } from 'devextreme/ui/data_grid';
import DataGrid, {
  Column,
  Editing,
  FilterRow,
  MasterDetail,
  Paging,
  Popup,
} from "devextreme-react/data-grid";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FetcherGet } from '@/utils';
import { ekstraYetkilerDataGridConfig } from '../configs/ekstra-yetkiler-data-grid-config';
import { rolDataGridConfig } from '../configs/rol-data-grid-config';
import { yetkiDataGridConfig } from '../configs/yetki-data-grid-config';
import { useModalContext } from '../context';
import type { KisiType } from '../types';


export default function KisiDetailModal() {
  const session = useSession();
  const modalContext = useModalContext();

  const [employees, setEmployees] = useState<KisiType[]>([]); // API'den gelecek roller için state
  const [selectedRowData, setSelectedRowData] = useState<KisiType | null>(null); // Seçili satır verisi için state
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup görünürlüğü için state

  useEffect(() => {
    if (!modalContext?.isOpen) return;

    const fetchData = async () => {
      const bilgilerFetch = await FetcherGet(`/Kisi/butun-bilgiler/${modalContext.id}`, session.data?.token);

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
    <div className={`top-0 flex items-start justify-center w-full bg-gray-400/15 backdrop-blur-sm  min-h-[100vh] h-full overflow-auto ${modalContext?.isOpen ? "visible" : "hidden"}`} onPointerDown={(e) => {
      e.stopPropagation();
      modalContext.toggle();
    }} style={{ position: 'fixed', zIndex: 2 }}>
      <div className="w-[80vw] bg-white p-4 rounded-md"
        onPointerDown={(e) => e.stopPropagation()} style={{ position: 'relative', pointerEvents: "auto", userSelect: "none", zIndex: 3, top: "20%" }}>
        <DataGrid
          allowColumnReordering={true}
          dataSource={[employees]} // Burada roller verisini kullanıyoruz
          id="gridContainer"
          keyExpr="kisiAdi" // 'kisiAdi' ile her satırı tanımlıyoruz
          onRowClick={handleRowClick} // Satıra tıklama olayını yönet
          showBorders={true}
        >
          <FilterRow visible={true} />
          <Paging enabled={true} />
          <Editing
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}
            mode="row"
            useIcons={true}
          />

          {/* Main Columns */}
          <Column caption="Ad" dataField="kisiAdi" />
          <Column caption="Soyad" dataField="kisiSoyadi" />
          <Column caption="Departman" dataField="departman" />

          {/* Master-Detail Configuration */}
          <MasterDetail
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
                    allowAdding={true} // Ekleme izni
                    allowDeleting={true} // Silme izni
                    allowUpdating={true} // Güncelleme izni
                    mode="row" // Düzenleme işlemi popup içinde yapılacak
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
            enabled={true}
          />
        </DataGrid>

        {/* Popup ile sadece seçilen satır verilerini göster */}
        <Popup
          height={600}
          onHiding={handleClosePopup} // Popup kapatıldığında fonksiyonu çağır
          showTitle={true}
          title="Detaylar"
          visible={isPopupVisible} // Popup görünürlüğünü kontrol et
          width={700}
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
