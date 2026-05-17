"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/locales/client";

const MOBILE_BREAKPOINT = 1100;

export default function MobileBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useI18n();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-900 text-white p-8 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-6 text-zinc-400"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
      <h1 className="text-2xl font-bold mb-3">{t("mobile.title")}</h1>
      <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
        {t("mobile.description")}
      </p>
    </div>
  );
}
