"use client";

import React, { useState, useEffect, startTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Yetki = {
  id: number;
  ad: string;
  soyad: string;
  rol: string;
  bitisTarihi: string;
};

export default function YaklasanYetkiler() {
  const [yetkiler, setYetkiler] = useState<Yetki[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true); 
    
    const tumYetkiler: Yetki[] = [
      { id: 1, ad: "Gurkan", soyad: "Erginer", rol: "Yazılım Personeli", bitisTarihi: "2024-11-29T14:30:00" },
      { id: 2, ad: "Burak", soyad: "Pozut", rol: "sa", bitisTarihi: "2024-11-29T10:00:00" },
      { id: 3, ad: "İbrahim Mert", soyad: "Goze", rol: "Yazılım Personeli", bitisTarihi: "2024-11-25T18:15:00" },
      { id: 4, ad: "Ali", soyad: "Yılmaz", rol: "Yönetici", bitisTarihi: "2024-11-25T12:00:00" },
      { id: 5, ad: "Zeynep", soyad: "Kaya", rol: "İK", bitisTarihi: "2024-11-22T14:30:00" },
      { id: 6, ad: "Ahmet", soyad: "Demir", rol: "Finans", bitisTarihi: "2024-11-18T09:00:00" },
      { id: 7, ad: "Emine", soyad: "Aydın", rol: "Avukat", bitisTarihi: "2024-11-30T16:00:00" },
      { id: 8, ad: "Mehmet", soyad: "Şahin", rol: "IT", bitisTarihi: "2024-11-23T18:30:00" },
      { id: 9, ad: "Murat", soyad: "Kara", rol: "IT", bitisTarihi: "2024-11-26T11:00:00" },
      { id: 10, ad: "Fatma", soyad: "Çelik", rol: "HR", bitisTarihi: "2024-11-27T15:45:00" },
    ];

    const bugun = new Date();
    const yaklasanYetkiler = tumYetkiler.filter((yetki) => {
      const bitisTarihi = new Date(yetki.bitisTarihi);
      const fark = (bitisTarihi.getTime() - bugun.getTime()) / (1000 * 60 * 60 * 24);
      return fark >= 0 && fark <= 7;
    });

    startTransition(() => {
      setYetkiler(yaklasanYetkiler);
      setLoading(false); 
    });
  }, []);

  const formatDateTime = (dateTime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("tr-TR", options).format(new Date(dateTime));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = yetkiler.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(yetkiler.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yaklaşan Yetkiler</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
         
          <div className="animate-pulse">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <div className="px-4 py-2 bg-blue-500 text-white rounded opacity-75"></div>
              <div className="px-4 py-2 bg-blue-500 text-white rounded opacity-75"></div>
            </div>
          </div>
        ) : yetkiler.length === 0 ? (
          <p>Yaklaşan yetki bulunmamaktadır.</p>
        ) : (
          <>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Ad Soyad</th>
                  <th className="border border-gray-300 px-4 py-2">Rol</th>
                  <th className="border border-gray-300 px-4 py-2">Bitiş Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((yetki) => (
                  <tr key={yetki.id}>
                    <td className="border border-gray-300 px-4 py-2">{yetki.ad} {yetki.soyad}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Badge>{yetki.rol}</Badge>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatDateTime(yetki.bitisTarihi)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button
                onClick={prevPage}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                disabled={currentPage === 1}
              >
                Önceki
              </button>
              <span>
                Sayfa {currentPage} / {Math.ceil(yetkiler.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                disabled={currentPage === Math.ceil(yetkiler.length / itemsPerPage)}
              >
                Sonraki
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
