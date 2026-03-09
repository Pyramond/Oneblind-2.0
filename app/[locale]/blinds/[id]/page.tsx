"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Title from "@/components/Title/Title";
import { useI18n } from "@/locales/client";
import { useBlinds } from "@/contexts/blindContext";
import { BlindStructure } from "@/interfaces/blindStructure.interface";
import { Table } from "@radix-ui/themes";

export default function BlindStructurePage() {
  const params = useParams();
  const id = params.id as string;

  const t = useI18n();
  const { getBlindStructureById } = useBlinds();

  const [blindStructure, setBlindStructure] = useState<BlindStructure>();

  useEffect(() => {
    setBlindStructure(getBlindStructureById(id));
  }, [getBlindStructureById, id]);

  return (
    <div className={"flex flex-col gap-13"}>
      <Title level={"h2"}>{blindStructure?.name}</Title>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              {t("blinds.view.table.type")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {t("blinds.view.table.time")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {t("blinds.view.table.smallBlind")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {t("blinds.view.table.bigBlind")}
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {blindStructure?.steps.map((step, index) => (
            <Table.Row key={index}>
              <Table.RowHeaderCell>{step.type}</Table.RowHeaderCell>
              <Table.Cell>{step.time}</Table.Cell>
              <Table.Cell>
                {step.small_blind === 0 ? "/" : step.small_blind}
              </Table.Cell>
              <Table.Cell>
                {step.big_blind === 0 ? "/" : step.big_blind}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
