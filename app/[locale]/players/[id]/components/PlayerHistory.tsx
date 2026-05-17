import { ReactNode } from "react";
import { useI18n } from "@/locales/client";
import Title from "@/components/Title/Title";
import { Table } from "@radix-ui/themes";
import { useTournaments } from "@/contexts/TournamentsContext";
import { useParams } from "next/navigation";

export default function PlayerHistory({
  playerId,
}: {
  playerId: string;
}): ReactNode {
  const t = useI18n();

  const params = useParams();
  const locale = params.locale as string;

  const { participations, getTournamentById } = useTournaments();
  const history = participations
    .filter((p) => p.playerId === playerId && p.rank > 0)
    .sort((a, b) => {
      const aTournament = getTournamentById(a.tournamentId);
      const bTournament = getTournamentById(b.tournamentId);

      const aSeconds = aTournament.tournament?.date?.seconds ?? 0;
      const bSeconds = bTournament.tournament?.date?.seconds ?? 0;

      return bSeconds - aSeconds;
    });

  return (
    <div>
      <Title level="h2">{t("player.profile.history.title")}</Title>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              {t("player.profile.history.tournament")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {t("player.profile.history.date")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {t("player.profile.history.place")}
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {history.map((p, index) => {
            const t = getTournamentById(p.tournamentId);

            return (
              <Table.Row key={index}>
                <Table.RowHeaderCell>{t.tournament?.name}</Table.RowHeaderCell>
                <Table.Cell>
                  {new Date(
                    (t.tournament?.date?.seconds ?? 0) * 1000,
                  ).toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Table.Cell>
                <Table.Cell>{p.rank}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
