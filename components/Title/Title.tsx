import React from "react";
import { Heading } from "@radix-ui/themes";

interface TitleProps {
  level: "h1" | "h2";
  children: React.ReactNode;
}

export default function Title({ level, children }: TitleProps) {
  switch (level) {
    case "h1":
      return (
        <Heading
          as={"h1"}
          size="8"
          className="font-bold text-indigo-600 dark:text-indigo-400 p-2"
        >
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
