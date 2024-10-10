// src/app/layout.tsx
import { Metadata } from "next";
import "./globals.css";
import { ModalContextWrapper } from "../context";
import "devextreme/dist/css/dx.light.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Next.js App", // Uygulamanız için uygun bir başlık belirleyin
  description: "A brief description of your app.", // Uygulamanız için bir açıklama girin
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="3xl:overflow-x-clip">
        <ModalContextWrapper>

          {children}
        </ModalContextWrapper>
      </body>
    </html>
  );
}
