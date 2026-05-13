import { ReactNode } from "react";
import { Button, Dialog, Flex, Badge, Table } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { useTournamentRunner } from "@/contexts/TournamentRunnerContext";
import { BlindStructure } from "@/interfaces/blindStructure.interface";

export default function DisplayBlindStructureBtn(): ReactNode {
  const t = useI18n();

  const { getBlindStructure } = useTournamentRunner();
  const blindStructure: BlindStructure = getBlindStructure();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color={"gray"} variant={"soft"}>
          {t("tournaments.runner.blindStructure")}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{t("tournaments.runner.blindStructure")}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {blindStructure.name}
        </Dialog.Description>

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

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              {t("common.close")}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
