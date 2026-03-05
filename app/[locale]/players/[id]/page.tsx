import { getI18n } from "@/locales/server";

export default async function PlayerProfilePage() {
  const t = await getI18n();

  return (
    <>
      <h1>hello</h1>
    </>
  );
}
