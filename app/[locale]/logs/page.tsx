"use client";

import Title from "@/components/Title/Title";
import { useI18n } from "@/locales/client";
import { Table, Badge, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { getLogs } from "@/utils/log";
import { Log, DbAction, DbCollection } from "@/interfaces/log.interface";

const ACTION_COLOR: Record<DbAction, "green" | "orange" | "red"> = {
  create: "green",
  update: "orange",
  delete: "red",
};

export default function LogsPage() {
  const t = useI18n();
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    getLogs().then(setLogs);
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
    <div className={"flex flex-col gap-13"}>
      <div className="flex flex-row items-center gap-2">
        <Link href="/settings">
          <IconButton variant={"ghost"} radius={"full"}>
            <ArrowLeftIcon width={30} height={30} />
          </IconButton>
        </Link>
        <Title level={"h2"}>{t("logs.title")}</Title>
      </div>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              {t("logs.table.date")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {t("logs.table.action")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {t("logs.table.collection")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {t("logs.table.info")}
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {logs.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={4}>{t("logs.empty")}</Table.Cell>
            </Table.Row>
          )}
          {logs.map((log) => (
            <Table.Row key={log.id}>
              <Table.Cell>
                {new Date(log.date.seconds * 1000).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                <Badge color={ACTION_COLOR[log.action]}>
                  {actionLabel[log.action]}
                </Badge>
              </Table.Cell>
              <Table.Cell>{collectionLabel[log.collection]}</Table.Cell>
              <Table.Cell>{log.info ?? "—"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
