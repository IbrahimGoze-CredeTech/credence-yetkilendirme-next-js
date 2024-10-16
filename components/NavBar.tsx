import React from "react";
import Link from "next/link";

interface NavbarProps {
  userName: string;
  userSurname: string;
  userRole: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName, userSurname, userRole }) => {

  return (
    <nav className="bg-gradient-to-bl from-blue-900 to-green-500 p-5 h-full flex items-center justify-between">
      <div id="Buttons" className="space-x-4">
        <Link href={"/rol-yetki"} className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold">Rol-Yetki</Link>
        <Link href="/" className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold">Anasayfaya</Link>
        <Link href="/talep-ekran" className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold">Talepler</Link>
        <Link href="/rol" className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold">Rol</Link>
        <Link href="/login" className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold">Çıkış Yap</Link>
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
