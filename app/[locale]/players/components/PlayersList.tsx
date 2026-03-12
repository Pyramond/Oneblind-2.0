"use client";

import User from "@/interfaces/user";
import { useUsers } from "@/hooks/useUsers";
import PLayerCard from "@/app/[locale]/players/components/PlayerCard";

export default function PlayersList() {
  const { users } = useUsers();

  return (
    <div className="grid grid-cols-6 gap-x-3 gap-y-6">
      {users.map((user: User) => (
        <PLayerCard user={user} key={user.id} />
      ))}
    </div>
  );
}
