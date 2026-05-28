"use client";

import Title from "@/components/Title/Title";
import { useSettings } from "@/contexts/SettingsContext";
import Image from "next/image";
import { ReactNode } from "react";
import Link from "next/link";

export default function HeaderTitle() {
  const { logoTheme } = useSettings();

  let element: ReactNode = <Title level={"h1"}>One blind</Title>;

  if (logoTheme !== "default")
    element = (
      <Image
        src={`/${logoTheme}.png`}
        alt={"Oneblind title"}
        height={50}
        width={200}
      />
    );

  return <Link href={"/"}>{element}</Link>;
}
