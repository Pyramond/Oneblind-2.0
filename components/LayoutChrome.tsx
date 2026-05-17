"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import MobileBlock from "@/components/MobileBlock";

export default function LayoutChrome({
  children,
  header,
  aside,
}: {
  children: ReactNode;
  header: ReactNode;
  aside: ReactNode;
}) {
  const pathname = usePathname();
  const isTournamentPage = /\/tournaments\/[^/]+/.test(pathname);

  if (isTournamentPage) {
    return <MobileBlock>{children}</MobileBlock>;
  }

  return (
    <MobileBlock>
      <div className="flex flex-col h-full">
        {header}
        <div className="flex flex-1">
          {aside}
          <main className="flex-1 overflow-y-auto bg-zinc-100 dark:bg-zinc-900 p-8">
            {children}
          </main>
        </div>
      </div>
    </MobileBlock>
  );
}
