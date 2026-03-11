"use client";

import User from "@/interfaces/user";
import {
  Box,
  Card,
  Flex,
  Text,
  Avatar,
  ContextMenu,
  AlertDialog,
  Button,
} from "@radix-ui/themes";
import Link from "next/link";
import { useUsers } from "@/hooks/useUsers";
import { useI18n } from "@/locales/client";
import { useState } from "react";

export default function PlayersList() {
  const { users, removeUser } = useUsers();
  const t = useI18n();

  const [open, setOpen] = useState<boolean>(false);
  const [tmpId, setTmpId] = useState<string>("");
  const [tmpName, setTmpName] = useState<string>("");

  function handleDelete(id: string, name: string) {
    setTmpId(id);
    setTmpName(name);
    setOpen(true);
  }

  function deleteUser(): void {
    removeUser(tmpId);
    setTmpId("");
    setTmpName("");
    setOpen(false);
  }

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
            <Link href={`/players/${user.id}`}>
              <ContextMenu.Item>
                {t("player.playerList.profileBtn")}
              </ContextMenu.Item>
            </Link>
            <ContextMenu.Item
              color="red"
              onClick={() => handleDelete(user.id, user.name)}
            >
              {t("player.playerList.delete.deleteBtn")}
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      ))}

      <AlertDialog.Root open={open}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>
            {t("player.playerList.delete.title", { name: tmpName })}
          </AlertDialog.Title>
          <AlertDialog.Description size="2">
            {t("player.playerList.delete.description")}
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setOpen(false)}
              >
                {t("common.cancel")}
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteUser}>
                {t("common.delete")}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}
