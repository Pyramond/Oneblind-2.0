import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ReactNode } from "react";
import Header from "@/components/header/Header";
import Aside from "@/components/Aside/Aside";
import ClientProviders from "@/app/[locale]/ClientProvider";
import CheckFirebase from "@/app/CheckFirebase";
import LayoutChrome from "@/components/LayoutChrome";

export const metadata: Metadata = {
  title: "Oneblind 2.0",
  description: "Oneblind en mieux",
};
export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="h-screen">
        <ClientProviders locale={locale}>
          <CheckFirebase>
            <LayoutChrome header={<Header />} aside={<Aside />}>
              {children}
            </LayoutChrome>
          </CheckFirebase>
        </ClientProviders>
      </body>
    </html>
  );
}
