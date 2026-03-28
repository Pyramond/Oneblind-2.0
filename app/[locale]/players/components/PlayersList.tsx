"use client";

import User from "@/interfaces/user";
import { useUsers } from "@/contexts/UsersContext";
import PLayerCard from "@/app/[locale]/players/components/PlayerCard";

export default function PlayersList() {
  const { users } = useUsers();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {users.map((user: User) => (
        <PLayerCard user={user} key={user.id} />
      ))}
    </div>
  );
}
