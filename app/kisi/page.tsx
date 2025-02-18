// page.tsx

"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FetcherGet } from "@/utils";

interface IKisi {
  kisiId: number;
  kisiAdi: string;
  kisiSoyadi: string;
}

const KisiDataTable = () => {
  const session = useSession();
  const [kisiler, setKisiler] = useState<IKisi[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await FetcherGet("/kisi", session.data?.token);
      setKisiler(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending) {
    return <div>Veriler yükleniyor...</div>;
  }

  const filteredKisi = kisiler.filter((kisi) =>
    kisi.kisiAdi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-8xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Kişi Bilgileri
      </h1>
      <div className="mb-4">
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Kişi adı ile ara..."
          type="text"
          value={searchTerm}
        />
      </div>
      <Table className="w-full text-left border-collapse">
        <TableHeader className="bg-blue-600 text-white">
          <TableRow>
            <TableCell className="p-3 font-medium">Kişi Adı</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredKisi.length > 0 ? (
            filteredKisi.map((kisi) => (
              <TableRow
                className="odd:bg-gray-100 hover:bg-gray-200"
                key={kisi.kisiId}
              >
                <TableCell className="p-3 border-t border-gray-200">
                  {`${kisi.kisiAdi} ${kisi.kisiSoyadi}`}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="p-3 border-t border-gray-200 text-gray-500">
                Sonuç bulunamadı
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default KisiDataTable;
