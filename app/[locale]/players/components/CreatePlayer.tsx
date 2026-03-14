"use client";

import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { useState } from "react";
import { useUsers } from "@/contexts/UsersContext";

export default function CreatePlayer() {
  const { addUser } = useUsers();

  const t = useI18n();
  const [userName, setUserName] = useState<string>("");

  async function create() {
    if (!userName) return;
    await addUser(userName);
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>{t("player.create.btnTitle")}</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>{t("player.create.dialogTitle")}</Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <p>{t("player.create.textFieldLabel")}</p>
              <TextField.Root
                placeholder={t("player.create.textFieldPlaceholder")}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                {t("player.create.closeBtn")}
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={create}>{t("player.create.saveBtn")}</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
