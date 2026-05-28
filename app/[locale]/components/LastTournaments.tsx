"use client";

import { ReactNode } from "react";
import { Badge, Card, Text } from "@radix-ui/themes";
import { useTournaments } from "@/contexts/TournamentsContext";
import Title from "@/components/Title/Title";
import { useI18n } from "@/locales/client";

export default function LastTournaments(): ReactNode {
  const t = useI18n();
  const { tournaments } = useTournaments();

  return (
    <Card className={"w-full"}>
      {[...tournaments]
        .sort((a, b) => {
          const aSeconds = a.date?.seconds ?? 0;
          const bSeconds = b.date?.seconds ?? 0;
          return bSeconds - aSeconds;
        })
        .slice(0, 3)
        .map((tournament, index) => {
          const date = tournament.date
            ? new Date(tournament.date.seconds * 1000).toLocaleDateString()
            : null;

          return (
            <div key={index} className={"flex flex-row gap-3 items-center"}>
              <Badge
                size={"3"}
                color={tournament.finished ? "green" : "indigo"}
              >
                {tournament.finished
                  ? t("homepage.lastTournaments.finished")
                  : t("homepage.lastTournaments.onGoing")}
              </Badge>
              <Title level={"h4"} className={"flex-1 min-w-0 truncate block"}>
                {tournament.name}
              </Title>
              {date && (
                <Text
                  size="2"
                  color="gray"
                  className={"shrink-0 tabular-nums whitespace-nowrap"}
                >
                  {date}
                </Text>
              )}
            </div>
          );
        })}
    </Card>
  );
}
