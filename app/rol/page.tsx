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

interface IRole {
  rolId: number;
  rolAdi: string;
}

const RoleDataTable = () => {
  const session = useSession();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await FetcherGet("/Rol", session.data?.token);
      setRoles(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending) {
    return <div>Veriler yükleniyor...</div>;
  }

  const filteredRoles = roles.filter((role) =>
    role.rolAdi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-8xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Rol Bilgileri
      </h1>
      <div className="mb-4">
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rol adı ile ara..."
          type="text"
          value={searchTerm}
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
              <TableRow
                className="odd:bg-gray-100 hover:bg-gray-200"
                key={role.rolId}
              >
                <TableCell className="p-3 border-t border-gray-200">
                  {role.rolAdi}
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

export default RoleDataTable;
