"use client";

import { Badge, Button, Switch, AlertDialog } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { Dialog, Flex, TextField, Select } from "@radix-ui/themes";
import { useState } from "react";
import { BlindStep } from "@/interfaces/blindStructure.interface";
import { useBlinds } from "@/contexts/blindContext";

export default function CreateBlindStructure() {
  const t = useI18n();
  const { addBlindStructure } = useBlinds();

  const [name, setName] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [sb, setSb] = useState<number>(0);
  const [bb, setBb] = useState<number>(0);
  const [type, setType] = useState<"game" | "pause">("game");
  const [msg, setMsg] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const [checked, setChecked] = useState(false);

  const [steps, setSteps] = useState<BlindStep[]>([]);

  function addStep() {
    if (time !== 0 && ((sb !== 0 && bb !== 0) || type === "pause")) {
      setSteps([
        ...steps,
        {
          type: type,
          time: time,
          small_blind: type === "pause" ? 0 : sb,
          big_blind: type === "pause" ? 0 : bb,
        },
      ]);
    }
  }

  function removeStep(index: number) {
    setSteps(steps.filter((_, i) => i !== index));
  }

  function updateSb(value: string) {
    setSb(Number(value) || 0);
    if (checked) setBb(Number(value) * 2 || 0);
  }

  async function createStructure() {
    if (name.trim() === "") {
      setMsg(t("blinds.create.errors.name"));
      setOpen(true);
      return;
    }
    if (steps.length === 0) {
      setMsg(t("blinds.create.errors.steps"));
      setOpen(true);
      return;
    } else {
      addBlindStructure({
        id: "",
        name: name,
        steps: steps,
      });
      resetFields();
    }
  }

  function resetFields() {
    setName("");
    setTime(0);
    setSb(0);
    setBb(0);
    setType("game");
    setSteps([]);
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>{t("blinds.create.btnTitle")}</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="600px">
          <Dialog.Title>{t("blinds.create.dialogTitle")}</Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <p>{t("blinds.create.textFieldLabel")}</p>
              <TextField.Root
                placeholder={t("blinds.create.textFieldPlaceholder")}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </Flex>

          <Flex direction="column" gap="3">
            <p className="mt-6">{t("blinds.create.createStepTitle")}</p>

            <Flex direction={"row"} gap="4" className="ml-1">
              <Switch checked={checked} onCheckedChange={setChecked} />
              <p>{t("blinds.create.double")}</p>
            </Flex>

            <Flex gap="2" align="end">
              <Select.Root
                defaultValue="game"
                onValueChange={(e) => {
                  if (e === "game" || e === "pause") setType(e);
                }}
              >
                <Select.Trigger
                  placeholder={t("blinds.create.createStepType")}
                />
                <Select.Content>
                  <Select.Item value="game">
                    {t("blinds.create.createStepTypeGame")}
                  </Select.Item>
                  <Select.Item value="pause">
                    {t("blinds.create.createStepTypePause")}
                  </Select.Item>
                </Select.Content>
              </Select.Root>

              <TextField.Root
                placeholder={t("blinds.create.createStepSmallBlind")}
                onChange={(e) => updateSb(e.target.value)}
              />

              <TextField.Root
                placeholder={t("blinds.create.createStepBigBlind")}
                onChange={(e) => setBb(Number(e.target.value) || 0)}
                value={bb}
              />

              <TextField.Root
                placeholder={t("blinds.create.createStepTime")}
                onChange={(e) => setTime(Number(e.target.value) || 0)}
                type="number"
              />

              <Button onClick={addStep}>
                {t("blinds.create.createStepAddBtn")}
              </Button>
            </Flex>
          </Flex>

          <Flex direction="column" gap="2" mt="4">
            {steps.map((step, index) => (
              <Flex
                key={index}
                align="center"
                justify="between"
                style={{
                  padding: "8px 12px",
                  border: "1px solid var(--gray-6)",
                  borderRadius: "6px",
                }}
              >
                <Flex gap="3">
                  <Badge
                    color={step.type == "game" ? "grass" : "amber"}
                    className="w-12 justify-center"
                  >
                    {t(`blinds.type.${step.type}`)}
                  </Badge>
                  <span>{step.time} min</span>
                  {step.type === "game" && (
                    <span>
                      {step.small_blind}/{step.big_blind}
                    </span>
                  )}
                </Flex>

                <Button
                  size="1"
                  variant="soft"
                  color="red"
                  onClick={() => removeStep(index)}
                >
                  {t("common.delete")}
                </Button>
              </Flex>
            ))}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" onClick={resetFields}>
                {t("blinds.create.closeBtn")}
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={createStructure}>
                {t("blinds.create.saveBtn")}
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <AlertDialog.Root open={open}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>
            {t("blinds.create.errors.title")}
          </AlertDialog.Title>
          <AlertDialog.Description size="2">{msg}</AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setOpen(false)}
              >
                {t("common.close")}
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
