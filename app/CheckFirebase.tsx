"use client";

import { ReactNode, useState } from "react";
import getFirebaseConfig from "@/utils/firebase/getFirebaseConfig";
import { useI18n } from "@/locales/client";
import { AlertDialog, Button, Flex, TextField } from "@radix-ui/themes";

export default function CheckFirebase({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const t = useI18n();
  const db = getFirebaseConfig();
  const [apiKey, setApiKey] = useState("");
  const [projectId, setProjectId] = useState("");
  const [open, setOpen] = useState(!db);

  function save() {
    if (!apiKey || !projectId) return;
    localStorage.setItem("firebase.apiKey", apiKey);
    localStorage.setItem("firebase.projectId", projectId);
    window.location.reload();
  }

  return (
    <>
      {children}

      <AlertDialog.Root open={open}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>
            {t("settings.firebase.setup.title")}
          </AlertDialog.Title>
          <AlertDialog.Description size="2">
            {t("settings.firebase.setup.description")}{" "}
          </AlertDialog.Description>
          <AlertDialog.Description size="2">
            <a
              href="https://github.com/Pyramond/Oneblind-2.0/tree/main#firebase-setup"
              className="text-blue-400 hover:underline"
            >
              {t("settings.firebase.setup.link")}
            </a>
          </AlertDialog.Description>

          <Flex direction="column" gap="3" mt="4">
            <label>
              <p>{t("settings.firebase.setup.apiKey")}</p>
              <TextField.Root
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </label>
            <label>
              <p>{t("settings.firebase.setup.projectId")}</p>
              <TextField.Root
                placeholder="my-project-id"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button color="gray" onClick={() => setOpen(false)}>
                {t("common.cancel")}
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action>
              <Button
                variant="solid"
                disabled={!apiKey || !projectId}
                onClick={save}
              >
                {t("settings.firebase.setup.connectBtn")}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
