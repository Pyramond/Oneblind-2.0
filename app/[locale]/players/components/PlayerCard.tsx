"use client";

import {
  Box,
  Card,
  Avatar,
  ContextMenu,
  Flex,
  Text,
  AlertDialog,
  Button,
} from "@radix-ui/themes";
import User from "@/interfaces/user";
import { useI18n } from "@/locales/client";
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import Link from "next/link";

export default function PLayerCard({ user }: { user: User }) {
  const t = useI18n();
  const [open, setOpen] = useState<boolean>(false);
  const { removeUser } = useUsers();

  function handleDelete() {
    setOpen(true);
  }

  function deleteUser(): void {
    removeUser(user.id);
    setOpen(false);
  }

  return (
    <>
      <ContextMenu.Root key={user.id}>
        <ContextMenu.Trigger>
          <Link className={"hover:cursor-pointer"} href={`/players/${user.id}`}>
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
          <ContextMenu.Item color="red" onClick={handleDelete}>
            {t("player.playerList.delete.deleteBtn")}
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <AlertDialog.Root open={open}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>
            {t("player.playerList.delete.title", { name: user.name })}
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
    </>
  );
}
