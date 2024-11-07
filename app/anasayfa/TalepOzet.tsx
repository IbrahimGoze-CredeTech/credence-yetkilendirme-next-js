'use client';

import { talepDataGridConfig } from '@/configs/talep-data-grid-config';
import { Talep } from '@/types';
import { fetcherGet } from '@/utils';
import DataGrid, { Pager, Paging, Scrolling } from 'devextreme-react/data-grid';
import { useSession } from 'next-auth/react';


import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export default function TalepEkranPage() {
  const session = useSession();
  const [talepler, setTalepler] = useState<Talep[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const talepler = await fetcherGet('/Talep', session.data?.token);
      setTalepler(talepler);
    };

    fetchData();
  }, [session.data?.token]);

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.addFileToVFS('Roboto-Regular.ttf', '/fonts/Roboto-Regular.ttf');
    doc.addFont('/fonts/Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');

    autoTable(doc, {
      head: [['Oluşturulma Tarihi', 'Durum', 'Durum Tarihi', 'Talep Eden Kişi']],
      body: talepler.map((talep) => [
        talep.olusturulmaTarihi,
        talep.durum,
        talep.durumTarihi,
        talep.talepEdenKisiAdi,
      ]),
      styles: { font: 'Roboto' },

    });
    doc.save('GeçmişTalepler.pdf');
  };

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Geçmiş Talepler');

    worksheet.columns = [
      { header: 'Oluşturulma Tarihi', key: 'olusturulmaTarihi', width: 20 },
      { header: 'Durum', key: 'durum', width: 15 },
      { header: 'Durum Tarihi', key: 'durumTarihi', width: 20 },
      { header: 'Talep Eden Kişi', key: 'talepEdenKisiAdi', width: 25 },
    ];

    talepler.forEach((talep) => {
      worksheet.addRow({
        olusturulmaTarihi: talep.olusturulmaTarihi,
        durum: talep.durum,
        durumTarihi: talep.durumTarihi,
        talepEdenKisiAdi: talep.talepEdenKisiAdi,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'GeçmişTalepler.xlsx');
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-medium my-4 flex justify-between items-center mt-4">
          Geçmiş Talepler
          <div className="flex gap-4">
            <button onClick={handleExportPDF} className="bg-blue-500 text-white text-xl px-4 py-2 rounded">
              PDF'e Aktar
            </button>
            <button onClick={handleExportExcel} className="bg-green-500 text-white text-xl px-4 py-2 rounded">
              Excel'e Aktar
            </button>
          </div>
        </h1>
      </div>



      <DataGrid dataSource={talepler}
        {...talepDataGridConfig}
        className="overflow-hidden"
      >
        <Scrolling rowRenderingMode="virtual" />
        <Paging defaultPageSize={7} />
        <Pager
          visible={true}
          allowedPageSizes="auto"
          displayMode="compact"
        />
      </DataGrid>


    </div>
  );
}
