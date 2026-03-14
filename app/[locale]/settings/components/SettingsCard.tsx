import { ReactNode } from "react";
import { Card } from "@radix-ui/themes";
import Title from "@/components/Title/Title";

export default function SettingsCard({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}): ReactNode {
  return (
    <Card>
      <Title level={"h3"}>{title}</Title>

      <div className={"flex flex-col gap-5 mt-3 ml-2"}>{children}</div>
    </Card>
  );
}
