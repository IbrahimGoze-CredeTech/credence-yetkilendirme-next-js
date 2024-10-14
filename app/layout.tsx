// src/app/layout.tsx
import { Metadata } from "next";
import "./globals.css";
import { ModalContextWrapper } from "../context";
import "devextreme/dist/css/dx.light.css";
import { ReactNode } from "react";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "My Next.js App", // Uygulamanız için uygun bir başlık belirleyin
  description: "A brief description of your app.", // Uygulamanız için bir açıklama girin
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userName = "Alper";
  const userSurname = "Özpınar";
  const userRole = "Admin";
  return (
    <html lang="en">
      <body className="3xl:overflow-x-clip bg-gray-100 dx-device-desktop dx-device-generic">
        <ModalContextWrapper>
          <div className="w-full">
            <NavBar userName={userName} userSurname={userSurname} userRole={userRole} />
          </div>
          {children}
        </ModalContextWrapper>
      </body>
    </html>
  );
}
