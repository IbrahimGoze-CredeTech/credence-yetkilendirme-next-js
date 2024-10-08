import React from "react";

interface NavbarProps {
  userName: string;
  userSurname: string;
  userRole: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName, userSurname, userRole }) => {
  return (
    <nav className="bg-gradient-to-bl from-blue-900 to-green-500 p-5 h-full flex items-center justify-between">
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
