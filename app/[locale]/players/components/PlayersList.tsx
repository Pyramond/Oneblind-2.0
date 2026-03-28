"use client";

import User from "@/interfaces/user";
import { useUsers } from "@/contexts/UsersContext";
import PLayerCard from "@/app/[locale]/players/components/PlayerCard";
import { SegmentedControl } from "@radix-ui/themes";
import { useState } from "react";
import { useI18n } from "@/locales/client";

type filterType = "points" | "creationDate";

export default function PlayersList() {
  const t = useI18n();

  const { users } = useUsers();
  const [filterPlayer, setFilterPlayer] = useState<filterType>("points");

  const getSort = (userA: User, userB: User): number => {
    switch (filterPlayer) {
      case "points":
        return (userB.points ?? 0) - (userA.points ?? 0);
      case "creationDate":
        return userB.creationDate.seconds - userA.creationDate.seconds;
    }
  };

  const sorted = [...users].sort(getSort);

  return (
    <div className={"flex flex-col gap-3"}>
      <div className={"flex flex-row gap-3"}>
        <SegmentedControl.Root
          defaultValue={"points"}
          onValueChange={(value) => setFilterPlayer(value as filterType)}
        >
          <SegmentedControl.Item value={"points"}>
            {t("player.playerList.sort.points")}
          </SegmentedControl.Item>
          <SegmentedControl.Item value={"creationDate"}>
            {t("player.playerList.sort.creationDate")}
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {sorted.map((user: User) => (
          <PLayerCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}
