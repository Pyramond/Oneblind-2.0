"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ColorName } from "@/interfaces/colorName";
import { RadiusType } from "@/interfaces/radius.interface";
import { LogoTheme } from "@/interfaces/logoTheme.interface";
import { AlertSound } from "@/interfaces/alert.interface";

type SettingsContextType = {
  theme: "dark" | "light";
  color: ColorName;
  radius: RadiusType;
  logoTheme: LogoTheme;
  alertSound: AlertSound;
  setTheme: (theme: "dark" | "light") => void;
  setColor: (color: ColorName) => void;
  setRadius: (radius: RadiusType) => void;
  setLogoTheme: (logoTheme: LogoTheme) => void;
  setAlertSound: (alertSound: AlertSound) => void;
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

  const [logoTheme, setLogoTheme] = useState<LogoTheme>(() => {
    if (typeof window === "undefined") return "default";

    const saved = localStorage.getItem("logoTheme");
    return (saved as LogoTheme) || "default";
  });

  const [radius, setRadius] = useState<RadiusType>(() => {
    if (typeof window === "undefined") return "medium";

    const saved = localStorage.getItem("radius");
    return (saved as RadiusType) || "medium";
  });

  const [alertSound, setAlertSound] = useState<AlertSound>(() => {
    if (typeof window === "undefined") return "default";

    const saved = localStorage.getItem("alertSound");
    return (saved as AlertSound) || "default";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("color", color);
    localStorage.setItem("radius", radius);
    localStorage.setItem("logoTheme", logoTheme);
    localStorage.setItem("alertSound", alertSound);
  }, [theme, color, radius, logoTheme, alertSound]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        color,
        radius,
        logoTheme,
        alertSound,
        setTheme,
        setColor,
        setRadius,
        setLogoTheme,
        setAlertSound,
      }}
    >
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
