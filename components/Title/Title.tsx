"use client";

import React from "react";
import { Heading } from "@radix-ui/themes";
import { useSettings } from "@/contexts/SettingsContext";

interface TitleProps {
  level: "h1" | "h2";
  children: React.ReactNode;
}

export default function Title({ level, children }: TitleProps) {
  const { color } = useSettings();

  switch (level) {
    case "h1":
      return (
        <Heading as={"h1"} size="8" color={color}>
          {children}
        </Heading>
      );
    case "h2":
      return (
        <Heading
          as={"h2"}
          size={"7"}
          className="font-bold text-zinc-800 dark:text-zinc-200 p-2"
        >
          {children}
        </Heading>
      );
  }
}
