"use client";

import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStaticTablesContext } from "@/context";
import { UseCurrentUser } from "@/hooks/use-current-user";
import type { ExtendedUser } from "@/next-auth";
import { RoleGate } from "./role-gate";

export default function Navbar() {
  const pathname = usePathname(); // pathname'i alın
  const showNavbar = pathname !== "/auth/login"; // Navbar'ı göstermeyi kontrol edin

  const session = useSession();
  const userHook = UseCurrentUser();
  const staticTablesContext = useStaticTablesContext();
  const [user, setUser] = useState<ExtendedUser | undefined>(undefined);

  useEffect(() => {
    setUser(userHook);
  }, [userHook]);

  const onClickToken = async () => {
    console.log(session.data?.token);
  };

  if (!showNavbar) {
    // Eğer showNavbar false ise sadece basit bir layout döndürün
    return null;
  }

  if (!user)
    return (
      <nav className="bg-azure-radiance-500 p-5 h-full flex flex-col items-center">
        <h1 className="text-white text-2xl font-bold">YETKİLENDİRME PANELİ</h1>
      </nav>
    );

  return (
    <nav className="bg-azure-radiance-500 p-5 h-full flex flex-col items-center text-sm">
      <button onClick={onClickToken}>Token</button>
      <h1 className="text-white text-2xl font-bold text-center">
        <Link href="/"> YETKİLENDİRME PANELİ </Link>
      </h1>

      <div className="w-full flex items-center justify-between mt-4">
        <div className="flex items-center space-x-6" id="Buttons">
          <Link
            className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white p-2 rounded"
            href="/"
          >
            <Image
              alt="Anasayfa"
              className="mr-2"
              height={24}
              src="/homepage.png"
              width={24}
            />
            Anasayfa
          </Link>

          <Link
            className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white p-2 rounded"
            href="/kisi-bilgileri"
          >
            <Image
              alt="Kişi Bilgileri"
              className="mr-2"
              height={24}
              src="/person.png"
              width={24}
            />
            Kişi Bilgileri
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-white font-bold transition-colors duration-150  hover:bg-azure-radiance-600 hover:text-white  p-2 rounded ">
              <Image
                alt="Organizasyon"
                className="mr-2"
                height={24}
                src="/organization.png"
                width={24}
              />
              Organizasyon <ChevronDownIcon className="w-4 h-4 ml-2" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white text-black shadow-lg rounded-md mt-2 py-2 transition-transform duration-150 ease-in-out">
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  className="flex items-center transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white px-4 p-2 rounded"
                  href="/rol"
                >
                  Roller
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  className="flex items-center transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white px-4 p-2 rounded"
                  href="/yetki"
                >
                  Yetkiler
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  className="flex items-center transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white px-4 p-2 rounded"
                  href="/kisi"
                >
                  Kişiler
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white  p-2 rounded"
            href="/rol-yetki"
          >
            <Image
              alt="Rol Ve Yetki Atama"
              className="mr-2"
              height={24}
              src="/assignment.png"
              width={24}
            />
            Rol Ve Yetki Atama
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-white font-bold transition-colors duration-150  hover:bg-azure-radiance-600 hover:text-white  p-2 rounded ">
              <Image
                alt="Talepler"
                className="mr-2"
                height={24}
                src="/demand.png"
                width={24}
              />
              Talepler <ChevronDownIcon className="w-4 h-4 ml-2" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white text-black shadow-lg rounded-md mt-2 py-2 transition-transform duration-150 ease-in-out">
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  className="block px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150"
                  href="/talep-ekran"
                >
                  Talepler
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  className="block px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150"
                  href="/talep-yarat"
                >
                  Talep Yarat
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  className="block px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150"
                  href="/talep-kayitlari"
                >
                  Talep Kayıtları
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white p-2 rounded"
            href="/rapor"
          >
            <Image
              alt="Rol Ve Yetki Atama"
              className="mr-2"
              height={24}
              src="/report.png"
              width={24}
            />
            Raporlar
          </Link>
        </div>

        <RoleGate allowedRole="sa" showError={false}>
          <Link
            className="relative flex items-center px-4 py-2 font-bold text-white rounded-md hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150"
            href="/kisi-rol-yetki"
          >
            <Image
              alt="Ekle-Sil"
              className="mr-2"
              height={24}
              src="/ekle-sil.png"
              width={24}
            />
            Ekle-Sil
          </Link>
        </RoleGate>
        <RoleGate allowedRole="sa" showError={false}>
          <Link
            className="relative flex items-center px-4 py-2 font-bold text-white rounded-md hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150"
            href="/views"
          >
            <Image
              alt="Views"
              className="mr-2"
              height={24}
              src="/eye.png"
              width={24}
            />
            Erişimler
          </Link>
        </RoleGate>

        <div className="flex items-center space-x-4">
          <Link
            className="relative flex items-center  py-2 font-bold text-white rounded-md hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150"
            href="/talep-onay"
          >
            <Image
              alt="Talepler"
              className="mx-2 h-6"
              height={24}
              src="/notifications.png"
              width={24}
            />
            {staticTablesContext?.anyBekleyenTalep && (
              <Image
                alt=""
                className="absolute top-0 left-0"
                height={16}
                src="/bildirim-circle.png"
                width={16}
              />
            )}
          </Link>
        </div>

        {/* <button onClick={onClickToken}>Token</button> */}
      </div>
    </nav>
  );
}
