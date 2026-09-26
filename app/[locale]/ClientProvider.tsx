"use client";

import { ReactNode, useEffect } from "react";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { I18nProviderClient } from "@/locales/client";
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
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <SettingsProvider>
      <I18nProviderClient locale={locale}>
        <ThemeWrapper>
          <BlindProvider>
            <TournamentProvider>
              <UsersProvider>{children}</UsersProvider>
            </TournamentProvider>
          </BlindProvider>
        </ThemeWrapper>
      </I18nProviderClient>
    </SettingsProvider>
  );
}
