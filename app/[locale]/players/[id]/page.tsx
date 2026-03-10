"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import User from "@/interfaces/user";
import { Avatar, Card, Badge, Skeleton } from "@radix-ui/themes";
import Title from "@/components/Title/Title";
import { useI18n } from "@/locales/client";
import { useUsers } from "@/hooks/useUsers";

export default function PlayerProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const locale = params.locale as string;

  const t = useI18n();
  const { getUserById } = useUsers();

  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    setUser(getUserById(id));
  }, [id, getUserById]);

  const creationDate = user
    ? new Date(user.creationDate.seconds * 1000).toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className={"flex flex-col gap-13"}>
      <div className="flex justify-center mt-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl">
          <Card className="p-6">
            <div className="flex items-center gap-6">
              <Avatar
                fallback={user ? user.name : "Unknown"}
                size="9"
                radius="full"
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                  user ? user.name : "Unknown"
                }&backgroundColor=65c9ff,b6e3f4`}
              />

              <div className="flex flex-col gap-2">
                <Title level="h2">
                  {user?.name || <Skeleton width="150px" height="24px" />}
                </Title>

                <Badge variant="soft" className="w-fit">
                  {user?.points ?? 0}{" "}
                  {(user?.points ?? 0) > 1 ? "points" : "point"}
                </Badge>

                {user ? (
                  <p className="text-sm text-gray-500">
                    {t("player.profile.playerDate")} {creationDate}
                  </p>
                ) : (
                  <Skeleton width="150px" height="16px" />
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6 flex items-center justify-center">
            <p className="text-gray-400 text-sm">Stats</p>
          </Card>
        </div>
      </div>
      <Title level="h2">{t("player.profile.history")}</Title>
    </div>
  );
}
