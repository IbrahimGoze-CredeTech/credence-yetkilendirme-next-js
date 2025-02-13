import type { Metadata } from "next";
import "./globals.css";
import "devextreme/dist/css/dx.light.css";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { auth } from "@/auth";
import SidebarWrapper from "@/components/sidebar-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { ModalContextWrapper, StaticTablesContextWrapper } from "../context";

export const metadata: Metadata = {
  title: "Credence Yetkilendirme Paneli", // Uygulamanız için uygun bir başlık belirleyin
  description: "A brief description of your app.", // Uygulamanız için bir açıklama girin
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="3xl:overflow-x-clip bg-gray-100 ">
          <ModalContextWrapper>
            <StaticTablesContextWrapper>
              <SidebarWrapper >
                <main>
                  {children}
                </main>
                <Toaster />
              </SidebarWrapper>
            </StaticTablesContextWrapper>
          </ModalContextWrapper>
        </body>
      </html>
    </SessionProvider>
  );
}
