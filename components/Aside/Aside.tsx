import {
  DashboardIcon,
  PersonIcon,
  FileTextIcon,
  CountdownTimerIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { getI18n } from "@/locales/server";
import { Button } from "@radix-ui/themes";

export default async function Aside() {
  const t = await getI18n();

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95 flex flex-col p-4">
      <nav className="flex flex-col gap-4 text-indigo-600 dark:text-indigo-400">
        <Button asChild variant={"soft"}>
          <Link href="/">
            <DashboardIcon />
            {t("aside.home")}
          </Link>
        </Button>

        <Button asChild variant={"soft"}>
          <Link href="/players">
            <PersonIcon />
            {t("aside.players")}
          </Link>
        </Button>

        <Button asChild variant={"soft"}>
          <Link href="/blinds">
            <CountdownTimerIcon />
            {t("aside.blind")}
          </Link>
        </Button>

        <Button asChild variant={"soft"}>
          <Link href="/tournaments">
            <FileTextIcon />
            {t("aside.tournaments")}
          </Link>
        </Button>
      </nav>
    </aside>
  );
}
