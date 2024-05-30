import { ReactNode } from "react";
import { montserrat } from "@/components/fonts";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased min-h-screen flex justify-center items-center bg-gray-100`}>
        {children}
      </body>
    </html>
  );
}
