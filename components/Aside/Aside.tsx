import { DashboardIcon, PersonIcon, FileTextIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { getI18n } from "@/locales/server";

export default async function Aside() {
  const t = await getI18n();

  return (
    <aside className="h-screen w-64 border-r border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95 flex flex-col p-4">
      <nav className="flex flex-col gap-2 text-indigo-600 dark:text-indigo-400">
        <Link
          href="/"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
        >
          <DashboardIcon />
          <span>{t("home")}</span>
        </Link>

        <Link
          href="/players"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
        >
          <PersonIcon />
          <span>{t("players")}</span>
        </Link>

        <Link
          href="/tournaments"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
        >
          <FileTextIcon />
          <span>{t("tournaments")}</span>
        </Link>
      </nav>
    </aside>
  );
}
