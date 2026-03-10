"use client";
import { useSettings } from "@/contexts/SettingsContext";
import { Theme } from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const { color, radius } = useSettings();
  const [mounted, setMounted] = useState(false);

  const { systemTheme } = useTheme();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Theme
      appearance={
        systemTheme === "light" || systemTheme === "dark"
          ? systemTheme
          : "inherit"
      }
      accentColor={color}
      radius={radius}
    >
      {children}
    </Theme>
  );
}
