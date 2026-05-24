"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/locales/client";
import { getLogs } from "@/utils/log";
import { Log, DbAction, DbCollection } from "@/interfaces/log.interface";
import { Badge, Button } from "@radix-ui/themes";
import Title from "@/components/Title/Title";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

const ACTION_COLOR: Record<DbAction, "green" | "orange" | "red"> = {
  create: "green",
  update: "orange",
  delete: "red",
};

const RECENT_COUNT = 5;

export default function LogsSettings() {
  const t = useI18n();
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    getLogs(RECENT_COUNT).then(setLogs);
  }, []);

  const actionLabel: Record<DbAction, string> = {
    create: t("logs.action.create"),
    update: t("logs.action.update"),
    delete: t("logs.action.delete"),
  };

  const collectionLabel: Record<DbCollection, string> = {
    users: t("logs.collection.users"),
    tournaments: t("logs.collection.tournaments"),
    participations: t("logs.collection.participations"),
    blindStructures: t("logs.collection.blindStructures"),
  };

  return (
    <>
      <Title level={"h4"}>{t("logs.recent")}</Title>

      <div className="flex flex-col gap-2 ml-3">
        {logs.length === 0 && (
          <p className="text-sm text-gray-500">{t("logs.empty")}</p>
        )}
        {logs.map((log) => (
          <div key={log.id} className="flex flex-row items-center gap-2 text-sm">
            <Badge color={ACTION_COLOR[log.action]} size="1">
              {actionLabel[log.action]}
            </Badge>
            <span className="text-gray-400">{collectionLabel[log.collection]}</span>
            {log.info && <span className="truncate max-w-40">{log.info}</span>}
            <span className="text-gray-500 ml-auto shrink-0">
              {new Date(log.date.seconds * 1000).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <Link href="/logs">
        <Button variant="outline" size="2">
          <ExternalLinkIcon />
          {t("logs.viewAll")}
        </Button>
      </Link>
    </>
  );
}
