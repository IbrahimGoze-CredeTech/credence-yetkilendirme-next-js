import Link from "next/link";
import React from "react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Erişim Engellendi
        </h1>
        <p className="text-lg mb-6">
          Bu sayfayı görüntülemek için gereken yetkiye sahip değilsin.
        </p>
        <Link
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-150"
          href="/"
        >
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
