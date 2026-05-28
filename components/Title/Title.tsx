"use client";

import React from "react";
import { Heading } from "@radix-ui/themes";
import { useSettings } from "@/contexts/SettingsContext";

interface TitleProps {
  level: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  className?: string;
}

export default function Title({ level, children, className }: TitleProps) {
  const { color } = useSettings();

  switch (level) {
    case "h1":
      return (
        <Heading as={"h1"} size="8" color={color} className={className}>
          {children}
        </Heading>
      );
    case "h2":
      return (
        <Heading
          as={"h2"}
          size={"7"}
          className={`font-bold text-zinc-800 dark:text-zinc-200 p-2 ${className ?? ""}`}
        >
          {children}
        </Heading>
      );

    case "h3":
      return (
        <Heading
          as="h3"
          size="6"
          className={`font-semibold text-zinc-700 dark:text-zinc-300 p-2 ${className ?? ""}`}
        >
          {children}
        </Heading>
      );

    case "h4":
      return (
        <Heading
          as="h4"
          size="5"
          className={`font-medium text-zinc-700 dark:text-zinc-300 p-2 ${className ?? ""}`}
        >
          {children}
        </Heading>
      );
  }
}
