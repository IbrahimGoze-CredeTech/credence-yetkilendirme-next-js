'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";
import { ExtendedUser } from "@/next-auth";
import { RoleGate } from "./role-gate";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/solid"; 
import Image from 'next/image';

export default function Navbar() {
  const userHook = useCurrentUser();
  const [user, setUser] = useState<ExtendedUser | undefined>(undefined);

  const onClick = async () => {
    await logout();
    window.location.replace("/auth/login");
  }

  useEffect(() => {
    setUser(userHook);
  }, [userHook]);

  if (!user) return (
    <nav className="bg-azure-radiance-500 p-5 h-full flex items-center justify-center">
      <h1 className="text-white text-2xl font-bold">CREDENCE YETKİLENDİRME PANELİ</h1>
    </nav>
  );

  return (
    <nav className="bg-azure-radiance-500 p-5 h-full flex items-center justify-between">
      <div id="Buttons" className="flex items-center space-x-4">
        <Link href="/" className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white px-4 py-2 rounded">
          <Image src="/homepage.png" alt="Anasayfa" width={24} height={24} className="mr-2" />
          Anasayfa
        </Link>
        <Link href="/rol-yetki" className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white px-4 py-2 rounded">
          <Image src="/assignment.png" alt="Rol Ve Yetki Atama" width={24} height={24} className="mr-2" />
          Rol Ve Yetki Atama
        </Link>
        <Link href="/kisi-bilgileri" className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white px-4 py-2 rounded">
          <Image src="/person.png" alt="Kişi Bilgileri" width={24} height={24} className="mr-2" />
          Kişi Bilgileri
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-white font-bold transition-colors duration-150  hover:bg-azure-radiance-600 hover:text-white px-4 py-2 rounded">
            <Image src="/demand.png" alt="Talepler" width={24} height={24} className="mr-2" />
            Talepler <ChevronDownIcon className="w-4 h-4 ml-2" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-white text-black shadow-lg rounded-md mt-2 py-2 transition-transform duration-150 ease-in-out">
            <DropdownMenuItem asChild>
              <Link href="/talep-ekran" className="block px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150">Talepler</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/talep-ekran/talep-yarat" className="block px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150">Talep Yarat</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/talep/onaylanan" className="block px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150">Onaylanan Talepler</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/talep/onay-bekleyen" className="block px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150">Onay Bekleyen Talepler</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/talep/onaylanmayan" className="block px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150">Onaylanmayan Talepler</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <RoleGate allowedRole={"admin"} showError={false}>
          <Link href="/rol" className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white px-4 py-2 rounded">
            <Image src="/role-icon.png" alt="Rol" width={24} height={24} className="mr-2" />
            Rol
          </Link>
        </RoleGate>
      </div>

      <h1 className="text-white text-2xl font-bold flex-grow text-center">
        CREDENCE YETKİLENDİRME PANELİ
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center cursor-pointer text-white">
          <div className="flex items-center">
            <Image src="/user.png" alt="Kullanıcı" width={24} height={24} className="mr-2" />
            <span className="text-lg">{user?.name} ({user?.role})</span>
          </div>
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white text-black shadow-lg rounded-md mt-2 py-1 transition-transform duration-150 ease-in-out">
          <DropdownMenuItem>
            <button onClick={onClick} className="block w-full text-left px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150 rounded">
              <Image src="/logout.png" alt="Çıkış" width={24} height={24} className="inline mr-2" />
              Çıkış Yap
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RoleGate allowedRole="admin">
        <div className="text-white text-lg">Admin</div>
      </RoleGate>
    </nav>
  );
}
