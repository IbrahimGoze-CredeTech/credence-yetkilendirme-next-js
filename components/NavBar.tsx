"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation"; // next/navigation'dan usePathname'i de import edin


interface NavbarProps {
  userName: string;
  userSurname: string;
  userRole: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName, userSurname, userRole }) => {
  const router = useRouter();
  const pathname = usePathname(); // Şu anki sayfa yolunu alır

  const handleButtonClick = () => {
    if (pathname === "/rol-yetki") {
      router.push("/"); // Eğer zaten "rol-yetki" sayfasındaysa anasayfaya yönlendirin
    } else {
      router.push("/rol-yetki"); // Eğer başka bir sayfadaysa "rol-yetki" sayfasına yönlendirin
    }
  };

  const handleLogout =  () => {
    
    router.push("/login"); // Giriş sayfasına yönlendirme
  };

  return (
    <nav className="bg-gradient-to-bl from-blue-900 to-green-500 p-5 h-full flex items-center justify-between relative">
      <h1 className="text-white text-2xl font-bold flex-grow text-center">
        CREDENCE YETKİLENDİRME PANELİ
        <div className="text-white text-lg">
        {userName} {userSurname} ({userRole})
      </div>

      </h1>
      
      {/* Sol alt köşeye buton ekleniyor */}
      <button
        onClick={handleButtonClick}
        className="absolute bottom-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {pathname === "/rol-yetki" ? "Anasayfaya Dön" : "Rol-Yetki Güncelleme"}
      </button>

      {/* Çıkış yap butonu ekleniyor */}
      <button
        onClick={handleLogout}
        className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Çıkış Yap
      </button>
    </nav>
  );
};

export default Navbar;
