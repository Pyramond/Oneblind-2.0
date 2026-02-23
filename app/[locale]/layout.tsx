import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { I18nProviderClient } from '@/locales/client'
import { ReactElement } from 'react'


export const metadata: Metadata = {
  title: "Oneblind 2.0",
  description: "Oneblind en mieux",
};

export default async function RootLayout({ params, children }: { params: Promise<{ locale: string }>, children: ReactElement }) {
  const { locale } = await params;

  return (
    <html>
      <body>
      <I18nProviderClient locale={locale}>
        <Theme>
            {children}
        </Theme>
        </I18nProviderClient>
      </body>
    </html>
  );
}
