"use client";

import { ReactNode } from "react";
import { useUsers } from "@/contexts/UsersContext";
import User from "@/interfaces/user";
import { Badge, Card } from "@radix-ui/themes";
import { ColorName } from "@/interfaces/colorName";
import Link from "next/link";
import Title from "@/components/Title/Title";

export default function BestPlayers(): ReactNode {
  const { users } = useUsers();

  return (
    <Card className="w-full">
      {[...users]
        .sort((a: User, b: User) => b.points - a.points)
        .slice(0, 3)
        .map((user, index) => {
          let color: ColorName = "bronze";
          if (index === 1) color = "gray";
          else if (index === 0) color = "yellow";

          return (
            <Link
              href={`/players/${user.id}`}
              key={index}
              className={"flex flex-row gap-3 items-center w-full min-w-0"}
            >
              <Badge color={color} size={"3"}>
                #{index + 1}
              </Badge>
              <Title level={"h4"} className="flex-1 min-w-0 truncate block">
                {user.name}
              </Title>
              <Title
                level={"h4"}
                className="shrink-0 tabular-nums whitespace-nowrap"
              >
                {user.points} pts
              </Title>
            </Link>
          );
        })}
    </Card>
  );
}
