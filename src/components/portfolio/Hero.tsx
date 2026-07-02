import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--mx", `${x}`);
      el.style.setProperty("--my", `${y}`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" ref={ref} className="relative overflow-hidden pt-32 md:pt-40">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-champagne/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-ink/5 blur-3xl" />

      <div className="mx-auto max-w-[1100px] px-6 pb-28 text-center md:px-10 md:pb-36">
        <div className="reveal-up mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-champagne" />
          <span className="eyebrow">Portfólio · 2026</span>
          <span className="h-px w-10 bg-champagne" />
        </div>

        <h1 className="reveal-up font-serif text-[2.75rem] leading-[1.05] tracking-tight text-ink md:text-[4.5rem] lg:text-[5.5rem]">
          Transformo ideias em{" "}
          <em className="text-champagne">marcas</em>, conteúdos e{" "}
          <span className="italic">experiências</span> que conectam.
        </h1>

        <p className="reveal-up mx-auto mt-8 max-w-2xl text-base leading-relaxed text-graphite md:text-lg">
          Social Media e Designer focada em criar presença digital através de
          estratégia, identidade visual e conteúdo criativo.
        </p>

        <div className="reveal-up mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => go("projetos")}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[0.72rem] uppercase tracking-[0.28em] text-white transition-all hover:bg-champagne"
          >
            Ver projetos
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <button
            onClick={() => go("contato")}
            className="group inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 text-[0.72rem] uppercase tracking-[0.28em] text-ink transition-all hover:border-champagne hover:text-champagne"
          >
            Solicitar orçamento
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-6 md:px-10">
        <span className="hairline flex-1" />
        <span className="text-[0.65rem] uppercase tracking-[0.32em] text-graphite">
          Role para explorar
        </span>
        <span className="hairline flex-1" />
      </div>
    </section>
  );
}
