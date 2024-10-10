"use client";
import React from "react";
import { usePathname } from "next/navigation"; // next/navigation'dan usePathname'i de import edin
import Link from "next/link";


interface NavbarProps {
  userName: string;
  userSurname: string;
  userRole: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName, userSurname, userRole }) => {
  const pathname = usePathname(); // Şu anki sayfa yolunu alır

  return (
    <nav className="bg-gradient-to-bl from-blue-900 to-green-500 p-5 h-full flex items-center justify-between">
      <div id="Buttons" className="space-x-4">
        <Link href={pathname === "/rol-yetki" ? "/" : "/rol-yetki"} className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold" >
          {pathname === "/rol-yetki" ? "Anasayfaya Dön" : "Rol-Yetki Güncelleme"}
        </Link>
        <Link href="/talep-ekran" className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold">Talepler</Link>
      </div>

      <h1 className="text-white text-2xl font-bold flex-grow text-center">
        CREDENCE YETKİLENDİRME PANELİ
      </h1>
      <div className="text-white text-lg">
        {userName} {userSurname} ({userRole})
      </div>
    </nav>
  );
};

export default Navbar;
