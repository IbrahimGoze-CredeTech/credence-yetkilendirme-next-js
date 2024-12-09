// src/app/layout.tsx
import { Metadata } from "next";
import "./globals.css";
import { ModalContextWrapper, StaticTablesContextWrapper } from "../context";
import "devextreme/dist/css/dx.light.css";
import { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Credence Yetkilendirme Paneli", // Uygulamanız için uygun bir başlık belirleyin
  description: "A brief description of your app.", // Uygulamanız için bir açıklama girin
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // const userName = "Alper";
  // const userSurname = "Özpınar";
  // const userRole = "Admin";
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="3xl:overflow-x-clip bg-gray-100 dx-device-desktop dx-device-generic">
          <ModalContextWrapper>
            <StaticTablesContextWrapper>
              <main>
                <div className="w-full">
                  <NavBar />
                </div>
                {children}
              </main>
              <Toaster />
            </StaticTablesContextWrapper>
          </ModalContextWrapper>
        </body>
      </html>
    </SessionProvider>
  );
}
