"use client";

import { Tournament } from "@/interfaces/tournament.interface";
import { ContextMenu } from "@radix-ui/themes";
import Link from "next/link";
import { useI18n } from "@/locales/client";
import DeleteTournamentItem from "./DeleteTournamentItem";
import EditTournamentItem from "./EditTournamentItem";
import { ReactNode } from "react";

export default function TournamentCardContextMenu({
  tournament,
  children,
}: {
  tournament: Tournament;
  children: ReactNode;
}) {
  const t = useI18n();

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content>
        <Link href={`/tournaments/${tournament.id}`}>
          <ContextMenu.Item>{t("common.open")}</ContextMenu.Item>
        </Link>
        {tournament.id && <EditTournamentItem tournament={tournament} />}
        {tournament.id && (
          <DeleteTournamentItem
            tournamentId={tournament.id}
            tournamentName={tournament.name}
          />
        )}
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
