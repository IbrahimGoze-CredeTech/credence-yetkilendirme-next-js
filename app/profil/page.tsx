"use client";

import React, { useEffect, useState } from "react";
import { DataGrid } from "devextreme-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExtendedUser } from "@/next-auth";

export default function ProfilePage() {
  const currentUser = useCurrentUser();
  const [user, setUser] = useState<ExtendedUser | undefined>(undefined);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start gap-8 p-6 bg-gray-100 min-h-screen">
        <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center text-center">
            <img className="w-24 h-24 rounded-full mb-4" src="/user.png"></img>
            <h2 className="text-lg font-bold text-gray-800">{user?.name}</h2>
            <p className="text-sm text-gray-500">({user?.role[0]})</p>
          </div>
        </div>

        <div className="w-full lg:w-2/3 space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <DataGrid />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <DataGrid />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <DataGrid />
          </div>
        </div>
      </div>
    </>
  );
}
