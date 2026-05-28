"use client";

import getFirebaseConfig from "@/utils/firebase/getFirebaseConfig";
import { Firestore } from "firebase/firestore";
import Image from "next/image";
import Title from "@/components/Title/Title";
import { useI18n } from "@/locales/client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  Button,
  Flex,
  IconButton,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  Pencil1Icon,
  SymbolIcon,
} from "@radix-ui/react-icons";

export default function FirebaseStatus() {
  const t = useI18n();

  const [db, setDb] = useState<Firestore | null>(getFirebaseConfig());

  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem("firebase.apiKey") ?? "",
  );
  const [projectId, setProjectId] = useState(
    () => localStorage.getItem("firebase.projectId") ?? "",
  );
  const [showApiKey, setShowApiKey] = useState(false);

  function save() {
    if (!apiKey || !projectId) return;
    localStorage.setItem("firebase.apiKey", apiKey);
    localStorage.setItem("firebase.projectId", projectId);
    window.location.reload();
  }

  return (
    <>
      <div className="flex flex-row gap-3 items-center">
        <Image
          src={`/icons/${db ? "check" : "cross"}.svg`}
          alt={"check icon"}
          width={64}
          height={64}
          loading="eager"
        />

        <Title level={"h4"}>
          {db &&
            t("settings.firebase.connected", {
              name: localStorage.getItem("firebase.projectId") ?? "",
            })}
          {!db && t("settings.firebase.disconnected")}
        </Title>

        <Tooltip content={t("settings.firebase.setup.editBtn")}>
          <IconButton
            variant="ghost"
            color="gray"
            onClick={() => setOpen(true)}
          >
            <Pencil1Icon width={18} height={18} />
          </IconButton>
        </Tooltip>
        <Tooltip content={t("settings.firebase.setup.refreshBtn")}>
          <IconButton
            variant="ghost"
            color="gray"
            onClick={(): void => setDb(getFirebaseConfig())}
          >
            <SymbolIcon width={18} height={18} />
          </IconButton>
        </Tooltip>
      </div>

      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>
            {t("settings.firebase.setup.update.title")}
          </AlertDialog.Title>
          <AlertDialog.Description size="2">
            {t("settings.firebase.setup.update.description")}{" "}
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
                placeholder="API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type={showApiKey ? "text" : "password"}
              >
                <TextField.Slot side="right">
                  <IconButton
                    size="1"
                    variant="ghost"
                    type="button"
                    onClick={() => setShowApiKey((v) => !v)}
                  >
                    {showApiKey ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
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
