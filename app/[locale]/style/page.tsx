import { getI18n } from "@/locales/server";

export default async function Style() {
  const t = await getI18n();

  return (
    <div className="flex flex-col">
      {/* ================= DARK ================= */}
      <section className="relative flex min-h-screen items-center justify-center bg-zinc-900 text-zinc-100 px-6">
        <div className="absolute top-6 text-xs tracking-widest text-zinc-500 uppercase">
          Dark Theme Preview
        </div>

        <div className="w-full max-w-xl">
          <div className="rounded-2xl bg-zinc-800 p-10 shadow-2xl shadow-black/30 border border-zinc-700">
            <span className="inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
              Dashboard
            </span>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-indigo-400">
              Bienvenue
            </h1>

            <p className="mt-4 text-zinc-400 leading-relaxed">
              Bienvenue sur votre espace personnel. Gérez vos données, consultez
              vos statistiques et continuez votre progression.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-lg bg-indigo-500 px-5 py-2.5 font-medium text-white hover:bg-indigo-400 transition">
                Continuer
              </button>

              <button className="rounded-lg border border-zinc-600 px-5 py-2.5 font-medium text-zinc-300 hover:bg-zinc-700 transition">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIGHT ================= */}
      <section className="relative flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-900 px-6">
        <div className="absolute top-6 text-xs tracking-widest text-zinc-500 uppercase">
          Light Theme Preview
        </div>

        <div className="w-full max-w-xl">
          <div className="rounded-2xl bg-white p-10 shadow-2xl shadow-zinc-300/40 border border-zinc-200">
            <span className="inline-block rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-medium text-indigo-600">
              Dashboard
            </span>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-indigo-600">
              Bienvenue
            </h1>

            <p className="mt-4 text-zinc-600 leading-relaxed">
              Bienvenue sur votre espace personnel. Gérez vos données, consultez
              vos statistiques et continuez votre progression.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-500 transition">
                Continuer
              </button>

              <button className="rounded-lg border border-zinc-300 px-5 py-2.5 font-medium text-zinc-700 hover:bg-zinc-200 transition">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
