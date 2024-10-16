'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";
import { ExtendedUser } from "@/next-auth";
import { RoleGate } from "./role-gate";

export default function Navbar() {
  const userHook = useCurrentUser();
  const [user, setUser] = useState<ExtendedUser>()

  const onClick = async () => {
    await logout();
    window.location.replace("/auth/login"); // Redirect to login and refresh the page
  }

  useEffect(() => {
    // console.log('Client Page User: ', userHook);
    setUser(userHook);
  }, [userHook])

  if (!user) return (
    <nav className="bg-gradient-to-bl from-blue-900 to-green-500 p-5 h-full flex items-center justify-between">
      <h1 className="text-white text-2xl font-bold flex-grow text-center">
        CREDENCE YETKİLENDİRME PANELİ
      </h1>
    </nav>
  )

  return (
    <nav className="bg-gradient-to-bl from-blue-900 to-green-500 p-5 h-full flex items-center justify-between">
      <div id="Buttons" className="space-x-4">
        <Link href={"/rol-yetki"} className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold">Rol-Yetki</Link>
        <Link href="/" className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold">Anasayfaya</Link>
        <Link href="/talep-ekran" className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold">Talepler</Link>
        <Link href="/rol" className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold">Rol</Link>
        <button onClick={onClick} className="text-white bg-blue-500 px-4 py-2 rounded-md font-bold">Çıkış Yap</button>
      </div>

      <h1 className="text-white text-2xl font-bold flex-grow text-center">
        CREDENCE YETKİLENDİRME PANELİ
      </h1>
      <div className="text-white text-lg">
        {user?.name} ({user?.role})
      </div>
      <RoleGate allowedRole="admin">
        <div className="text-white text-lg">Admin</div>
      </RoleGate>
    </nav>
  );
};

// export default Navbar;
