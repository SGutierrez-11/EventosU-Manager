import type { Metadata } from "next";
import "../styles/globals.css";
import { ReactNode } from "react";
import { montserrat } from "@/components/fonts";

export const metadata: Metadata = {
  title: "EventosU",
  description:
    "EventosU es una aplicación para gestionar eventos universitarios.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
