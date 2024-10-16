// page.tsx

'use client';

import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

interface Role {
  rolId: number;
  rolAdi: string;
}

const RoleDataTable = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/Rol`)
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Veriler yükleniyor...</div>;
  }

  const filteredRoles = roles.filter(role =>
    role.rolAdi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-8xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Rol Bilgileri</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rol adı ile ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <Table className="w-full text-left border-collapse">
        <TableHeader className="bg-blue-600 text-white">
          <TableRow>
            <TableCell className="p-3 font-medium">Rol Adı</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoles.length > 0 ? (
            filteredRoles.map((role) => (
              <TableRow key={role.rolId} className="odd:bg-gray-100 hover:bg-gray-200">
                <TableCell className="p-3 border-t border-gray-200">{role.rolAdi}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="p-3 border-t border-gray-200 text-gray-500">Sonuç bulunamadı</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoleDataTable;
