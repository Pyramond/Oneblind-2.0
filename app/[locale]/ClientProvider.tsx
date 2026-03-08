"use client";

import { ReactNode } from "react";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { I18nProviderClient } from "@/locales/client";
import { ThemeProvider } from "next-themes";
import { UsersProvider } from "@/contexts/usersContext/UsersProvider";
import ThemeWrapper from "@/components/ThemeWrapper/ThemeWrapper";
import { BlindProvider } from "@/contexts/blindContext";

export default function ClientProviders({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  return (
    <SettingsProvider>
      <I18nProviderClient locale={locale}>
        <ThemeProvider attribute="class">
          <ThemeWrapper>
            <BlindProvider>
              <UsersProvider>{children}</UsersProvider>
            </BlindProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </I18nProviderClient>
    </SettingsProvider>
  );
}
