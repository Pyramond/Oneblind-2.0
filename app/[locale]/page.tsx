import { getI18n, getScopedI18n } from '../../locales/server'

export default async function Home() {

    const t = await getI18n()

      return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <h1>{t("hello")}</h1>
        </div>
      );
}
