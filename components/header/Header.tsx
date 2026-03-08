import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Title from "@/components/Title/Title";
import { IconButton } from "@radix-ui/themes";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b w-full p-2 border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95 flex flex-row items-center justify-between">
      <Title level={"h1"}>Oneblind</Title>

      <Link href="/settings" className="p-2">
        <IconButton variant={"ghost"} radius={"full"}>
          <GearIcon width={35} height={35} />
        </IconButton>
      </Link>
    </header>
  );
}
