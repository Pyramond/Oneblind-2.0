import Link from "next/link";
import ColorSelection from "@/app/[locale]/settings/components/ColorSelection";
import RadiusSelection from "@/app/[locale]/settings/components/RadiusSelection";

export default function SettingsPage() {
  return (
    <>
      <h1>Settings</h1>
      <Link href={"/"}>Home</Link>

      <ColorSelection />
      <RadiusSelection />
    </>
  );
}
