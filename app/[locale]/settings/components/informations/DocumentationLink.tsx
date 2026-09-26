import Title from "@/components/Title/Title";
import { ReactNode } from "react";
import { Button } from "@radix-ui/themes";
import { ExternalLinkIcon, ReaderIcon } from "@radix-ui/react-icons";
import { getI18n } from "@/locales/server";

export default async function DocumentationLink(): Promise<ReactNode> {
  const t = await getI18n();

  return (
    <>
      <Title level={"h4"}>Documentation</Title>

      <div className={"flex flex-row items-center gap-4 ml-3"}>
        <ReaderIcon width={32} height={32} />

        <a
          href={t("settings.informations.documentationUrl")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline">
            <ExternalLinkIcon />
            docs.oneblind.app
          </Button>
        </a>
      </div>
    </>
  );
}
