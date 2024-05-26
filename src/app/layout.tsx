import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";


export const metadata: Metadata = {
  title: "EventosU",
  description: "EventosU es una aplicación para gestionar eventos universitarios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
