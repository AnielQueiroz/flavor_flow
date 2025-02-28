import "./globals.css";

import { MenuIcon } from "lucide-react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";

import { CartProvider } from "./[slug]/menu/context/cart";
import Loading from "./loading";

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
      <body className={`${poppins.className} antialiased flex flex-col min-h-screen`}>
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-sm py-2">
          <Link href="/">
            <div className="flex items-center">
              <Image src="/logo.png" alt="Flavor Flow" width={50} height={50} />
              <h1 className="text-xl font-semibold">Flavor Flow</h1>
            </div>
          </Link>
          <div className="pr-4">
            <Button variant="secondary" size="sm">
              <MenuIcon size={24} />
            </Button>
          </div>
        </header>

        {/* Conteúdo principal */}
        {/* <main className="h-full flex flex-col"> */}
        <Suspense fallback={<Loading />}>
          <CartProvider>
            {children}
          </CartProvider>
        </Suspense>
        {/* </main> */}

        {/* Footer */}
        {/* <footer className="bg-white py-1 text-center">
          <div className="container mx-auto p-3">
            <p className="text-sm text-muted-foreground">© 2025 Flavor Flow. Todos os direitos reservados.</p>
          </div>
        </footer> */}
      </body>
    </html>
  );
}
