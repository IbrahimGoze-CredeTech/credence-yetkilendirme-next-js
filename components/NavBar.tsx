"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";
import { ExtendedUser } from "@/next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useStaticTablesContext } from "@/context";
import { RoleGate } from "./role-gate";

export default function Navbar() {
  const session = useSession();
  const userHook = useCurrentUser();
  const StaticTablesContext = useStaticTablesContext();
  const [user, setUser] = useState<ExtendedUser | undefined>(undefined);

  const onClick = async () => {
    await logout();
    window.location.replace("/auth/login");
  };

  useEffect(() => {
    setUser(userHook);
  }, [userHook]);

  const onClickToken = async () => {
    console.log(session.data?.token);
  };

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
        YETKİLENDİRME PANELİ
      </h1>

      <div className="w-full flex items-center justify-between mt-4">
        <div id="Buttons" className="flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white p-2 rounded"
          >
            <Image
              src="/homepage.png"
              alt="Anasayfa"
              width={24}
              height={24}
              className="mr-2"
            />
            Anasayfa
          </Link>

          <Link
            href="/kisi-bilgileri"
            className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white p-2 rounded"
          >
            <Image
              src="/person.png"
              alt="Kişi Bilgileri"
              width={24}
              height={24}
              className="mr-2"
            />
            Kişi Bilgileri
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-white font-bold transition-colors duration-150  hover:bg-azure-radiance-600 hover:text-white  p-2 rounded ">
              <Image
                src="/organization.png"
                alt="Organizasyon"
                width={24}
                height={24}
                className="mr-2"
              />
              Organizasyon <ChevronDownIcon className="w-4 h-4 ml-2" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white text-black shadow-lg rounded-md mt-2 py-2 transition-transform duration-150 ease-in-out">
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  href="/rol"
                  className="flex items-center transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white px-4 p-2 rounded"
                >
                  {/* <Image
                    src="/role.png"
                    alt="Rol"
                    width={24}
                    height={24}
                    className="mr-2"
                  /> */}
                  Roller
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  href="/yetki"
                  className="flex items-center transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white px-4 p-2 rounded"
                >
                  {/* <Image
                    src="/yetkiler.png"
                    alt="Yetki"
                    width={24}
                    height={24}
                    className="mr-2"
                  /> */}
                  Yetkiler
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  href="/kisi"
                  className="flex items-center transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white px-4 p-2 rounded"
                >
                  {/* <Image
                    src="/people.png"
                    alt="Kişi"
                    width={24}
                    height={24}
                    className="mr-2"
                  /> */}
                  Kişiler
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/rol-yetki"
            className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white  p-2 rounded"
          >
            <Image
              src="/assignment.png"
              alt="Rol Ve Yetki Atama"
              width={24}
              height={24}
              className="mr-2"
            />
            Rol Ve Yetki Atama
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-white font-bold transition-colors duration-150  hover:bg-azure-radiance-600 hover:text-white  p-2 rounded ">
              <Image
                src="/demand.png"
                alt="Talepler"
                width={24}
                height={24}
                className="mr-2"
              />
              Talepler <ChevronDownIcon className="w-4 h-4 ml-2" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white text-black shadow-lg rounded-md mt-2 py-2 transition-transform duration-150 ease-in-out">
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  href="/talep-ekran"
                  className="block px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150"
                >
                  Talepler
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  href="/talep-yarat"
                  className="block px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150"
                >
                  Talep Yarat
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:!bg-azure-radiance-600 hover:!text-white"
              >
                <Link
                  href="/talep-kayitlari"
                  className="block px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150"
                >
                  Talep Kayıtları
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/rapor"
            className="flex items-center text-white font-bold transition-colors duration-150 hover:bg-azure-radiance-600 hover:text-white p-2 rounded"
          >
            <Image
              src="/report.png"
              alt="Rol Ve Yetki Atama"
              width={24}
              height={24}
              className="mr-2"
            />
            Raporlar
          </Link>
        </div>

        <RoleGate allowedRole="sa" showError={false}>
          <Link
            href="/kisi-rol-yetki"
            className="relative flex items-center px-4 py-2 font-bold text-white rounded-md hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150"
          >
            Kisi-Rol-Yetki
          </Link>
        </RoleGate>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center cursor-pointer text-white">
              <div className="flex items-center">
                <Image
                  src="/user.png"
                  alt="Kullanıcı"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span className="text-sm font-bold">
                  {user?.name} ({user?.role[0]})
                </span>
              </div>
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white text-black shadow-lg rounded-md mt-2 py-1 transition-transform duration-150 ease-in-out">
              <DropdownMenuItem>
                <Link
                  className="block w-full text-left px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150 rounded"
                  href={"/profil"}
                >
                  <Image
                    src="/user.png"
                    alt="Profil"
                    width={24}
                    height={24}
                    className="inline mr-2"
                  />
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  onClick={onClick}
                  className="block w-full text-left px-4 py-2 hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150 rounded"
                >
                  <Image
                    src="/logout.png"
                    alt="Çıkış"
                    width={24}
                    height={24}
                    className="inline mr-2"
                  />
                  Çıkış Yap
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/talep-onay"
            className="relative flex items-center  py-2 font-bold text-white rounded-md hover:bg-azure-radiance-600 hover:text-white transition-colors duration-150"
          >
            <Image
              src="/notifications.png"
              alt="Talepler"
              width={24}
              height={24}
              className="mx-2 h-6"
            />
            {StaticTablesContext?.anyBekleyenTalep && (
              <Image
                src={"/bildirim-circle.png"}
                width={16}
                height={16}
                alt={""}
                className="absolute top-0 left-0"
              />
            )}
          </Link>
        </div>

        {/* <button onClick={onClickToken}>Token</button> */}
      </div>
    </nav>
  );
}
