import { ReactNode } from "react";
import { Badge, ScrollArea, Separator } from "@radix-ui/themes";
import Title from "@/components/Title/Title";
import { changelog } from "@/utils/changelog";
import { getCurrentLocale } from "@/locales/server";
import packageJson from "@/package.json";

export default async function AppVersion(): Promise<ReactNode> {
  const locale = await getCurrentLocale();

  return (
    <>
      <Separator size="4" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          <Title level={"h4"}>Version</Title>
          <Badge size="2" variant="soft">
            v{packageJson.version}
          </Badge>
        </div>

        <div className="flex flex-col gap-3">
          <Title level={"h4"}>Changelog</Title>

          <ScrollArea
            type="auto"
            scrollbars="vertical"
            style={{ maxHeight: 500 }}
          >
            <div className="flex flex-col gap-4 pr-3">
              {changelog.map((entry) => (
                <div key={entry.version} className="flex flex-col gap-1 ml-2">
                  <div className="flex flex-row items-center gap-2">
                    <Badge variant="outline">v{entry.version}</Badge>
                    <span className="text-sm opacity-50">{entry.date}</span>
                  </div>

                  <ul className="flex flex-col gap-1 mt-1 ml-2">
                    {entry.changes[locale].map((change, i) => (
                      <li key={i} className="text-sm opacity-70">
                        • {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
