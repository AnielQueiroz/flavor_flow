import "./globals.css";

import { MenuIcon } from "lucide-react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flavor Flow",
  description: "Flavor Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} antialiased`}
      >
      
          <header className="flex items-center justify-between bg-white shadow-sm py-4">
            <div className="flex items-center">
              <Image src="/logo.png" alt="Flavor Flow" width={50} height={50} />
              <h1 className="text-xl font-semibold">Flavor Flow</h1>
            </div>
            <div className="pr-4">
              <Button variant="secondary" size="sm">
                <MenuIcon size={24} />
              </Button>
            </div>
          </header>
          
   
        {children}
      </body>
    </html>
  );
}
