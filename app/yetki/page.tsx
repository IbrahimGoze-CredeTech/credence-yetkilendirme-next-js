// page.tsx

"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { fetcherGet } from "@/utils";
import { useSession } from "next-auth/react";

interface Yetki {
  yetkiId: number;
  yetkiAdi: string;
}

const YetkiDataTable = () => {
  const session = useSession();
  const [yetkiler, setYetkiler] = useState<Yetki[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await fetcherGet("/yetki", session.data?.token);
      setYetkiler(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending) {
    return <div>Veriler yükleniyor...</div>;
  }

  const filteredYetki = yetkiler.filter((yetki) =>
    yetki.yetkiAdi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-8xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Yetki Bilgileri
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Yetki adı ile ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <Table className="w-full text-left border-collapse">
        <TableHeader className="bg-blue-600 text-white border">
          <TableRow>
            <TableCell className="p-3 font-medium">Yetki Adı</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="border">
          {filteredYetki.length > 0 ? (
            filteredYetki.map((yetki) => (
              <TableRow
                key={yetki.yetkiId}
                className="odd:bg-gray-100 hover:bg-gray-200"
              >
                <TableCell className="p-3 border-t border-gray-200">
                  {yetki.yetkiAdi}
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

export default YetkiDataTable;
