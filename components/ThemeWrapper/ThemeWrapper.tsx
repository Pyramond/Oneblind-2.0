"use client";
import { useSettings } from "@/contexts/SettingsContext";
import { Theme } from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme, color } = useSettings();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Theme appearance={theme} accentColor={color}>
      {children}
    </Theme>
  );
}
