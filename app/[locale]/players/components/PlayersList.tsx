"use client";

import User from "@/interfaces/user";
import { Box, Card, Flex, Text, Avatar, ContextMenu } from "@radix-ui/themes";
import Link from "next/link";
import { useUsers } from "@/hooks/useUsers";
import { useI18n } from "@/locales/client";

export default function PlayersList() {
  const { users, removeUser } = useUsers();
  const t = useI18n();

  return (
    <div className="grid grid-cols-6 gap-x-3 gap-y-6">
      {users.map((user: User) => (
        <ContextMenu.Root key={user.id}>
          <ContextMenu.Trigger>
            <Link
              className={"hover:cursor-pointer"}
              href={`/players/${user.id}`}
            >
              <Box maxWidth="240px">
                <Card>
                  <Flex gap="3" align="center">
                    <Avatar
                      size="4"
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=65c9ff,b6e3f4`}
                      radius="full"
                      fallback="T"
                    />
                    <Box>
                      <Text as="div" size="4" weight="bold">
                        {user.name}
                      </Text>
                      <Text as="div" size="4" color="gray">
                        {user.points} {user.points > 0 ? "points" : "point"}
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </Box>
            </Link>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item color="red" onClick={() => removeUser(user.id)}>
              {t("player.deleteBtn")}
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      ))}
    </div>
  );
}
