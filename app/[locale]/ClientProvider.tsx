"use client";

import { ReactNode } from "react";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { I18nProviderClient } from "@/locales/client";
import { ThemeProvider } from "next-themes";
import { UsersProvider } from "@/contexts/UsersContext";
import ThemeWrapper from "@/components/ThemeWrapper/ThemeWrapper";
import { BlindProvider } from "@/contexts/BlindsContext";
import { TournamentProvider } from "@/contexts/TournamentsContext";

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
              <TournamentProvider>
                <UsersProvider>{children}</UsersProvider>
              </TournamentProvider>
            </BlindProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </I18nProviderClient>
    </SettingsProvider>
  );
}
