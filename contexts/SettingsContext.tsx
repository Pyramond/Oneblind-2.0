"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ColorName } from "@/interfaces/colorName";

type SettingsContextType = {
  theme: "dark" | "light";
  color: ColorName;
  setTheme: (theme: "dark" | "light") => void;
  setColor: (color: ColorName) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";

    const saved = localStorage.getItem("theme");
    return saved === "dark" || saved === "light" ? saved : "dark";
  });

  const [color, setColor] = useState<ColorName>(() => {
    if (typeof window === "undefined") return "indigo";

    const saved = localStorage.getItem("color");
    return (saved as ColorName) || "indigo";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("color", color);
  }, [theme, color]);

  return (
    <SettingsContext.Provider value={{ theme, color, setTheme, setColor }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return context;
}
