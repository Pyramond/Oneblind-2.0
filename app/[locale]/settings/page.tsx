import Link from "next/link";
import ColorSelection from "@/app/[locale]/settings/components/ColorSelection";

export default function SettingsPage() {
  return (
    <>
      <h1>Settings</h1>
      <Link href={"/"}>Home</Link>

      <ColorSelection />
    </>
  );
}
