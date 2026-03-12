"use client";

import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { useState } from "react";

export default function CreateTournament() {
  const t = useI18n();

  const [name, setName] = useState<string>("");

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>{t("tournaments.create.btnTitle")}</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>{t("tournaments.create.dialogTitle")}</Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                {t("tournaments.create.name")}
              </Text>
              <TextField.Root
                placeholder={t("tournaments.create.name")}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                {t("common.cancel")}
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>{t("common.save")}</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
