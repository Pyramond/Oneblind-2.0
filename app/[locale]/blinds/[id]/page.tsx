"use client";

import {useParams, useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import Title from "@/components/Title/Title";
import { useI18n } from "@/locales/client";
import { useBlinds } from "@/contexts/BlindsContext";
import { BlindStructure } from "@/interfaces/blindStructure.interface";
import {Table, Badge, IconButton, Button} from "@radix-ui/themes";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import DeleteBlindBtn from "@/app/[locale]/blinds/components/DeleteBlindBtn";
import ExportBlindBtn from "@/app/[locale]/blinds/components/ExporBlindBtn";
import {goBack} from "@/utils/goBack";

export default function BlindStructurePage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const t = useI18n();
  const { getBlindStructureById } = useBlinds();

  const [blindStructure, setBlindStructure] = useState<BlindStructure>();

  useEffect(() => {
    setBlindStructure(getBlindStructureById(id));
  }, [getBlindStructureById, id]);

  return (
    <div className={"flex flex-col gap-13"}>
      <div className="flex flex-row items-center gap-2">
          <IconButton variant={"ghost"} radius={"full"} onClick={() => goBack(router)}>
            <ArrowLeftIcon width={30} height={30} />
          </IconButton>
        <Title level={"h2"}>{blindStructure?.name}</Title>
      </div>

      <div className="flex flex-row items-center gap-2">
        <ExportBlindBtn id={id} />
        <DeleteBlindBtn id={id} replace={true}/>
      </div>

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
              <Table.RowHeaderCell>
                <Badge
                  color={step.type == "game" ? "grass" : "amber"}
                  className="w-12 justify-center"
                >
                  {t(`blinds.type.${step.type}`)}
                </Badge>
              </Table.RowHeaderCell>
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
