import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { I18nProviderClient } from "@/locales/client";
import { ReactElement } from "react";
import Header from "@/components/header/Header";
import Aside from "@/components/Aside/Aside";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Oneblind 2.0",
  description: "Oneblind en mieux",
};

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactElement;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="h-screen">
        <I18nProviderClient locale={locale}>
          <ThemeProvider attribute="class">
            <Theme>
              <div className="flex flex-col h-full">
                <Header />

                <div className="flex flex-1">
                  <Aside />

                  <main className="flex-1 overflow-y-auto bg-zinc-100 dark:bg-zinc-900 p-8">
                    {children}
                  </main>
                </div>
              </div>
            </Theme>
          </ThemeProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}
