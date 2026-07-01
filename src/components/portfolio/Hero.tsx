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
    <section id="home" className="relative overflow-hidden pt-32 md:pt-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 pb-24 md:grid-cols-[1.05fr_1fr] md:px-10 md:pb-32 lg:gap-24">
        <div className="reveal-up flex flex-col justify-center">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-champagne" />
            <span className="eyebrow">Portfólio · 2026</span>
          </div>

          <h1 className="font-serif text-[2.75rem] leading-[1.05] tracking-tight text-ink md:text-[4.25rem] lg:text-[5rem]">
            Transformo ideias em{" "}
            <em className="text-champagne">marcas</em>, conteúdos e{" "}
            <span className="italic">experiências</span> que conectam.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-graphite md:text-lg">
            Social Media e Designer focada em criar presença digital através de
            estratégia, identidade visual e conteúdo criativo.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
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

          <div className="mt-16 grid max-w-md grid-cols-3 gap-8 border-t border-hairline pt-8">
            <Stat n="20+" l="Projetos" />
            <Stat n="100%" l="Dedicação" />
            <Stat n="1" l="Prêmio" />
          </div>
        </div>

        {/* Right composition */}
        <div
          ref={ref}
          className="reveal-fade relative min-h-[520px] md:min-h-[640px]"
          style={{ perspective: "1200px" }}
        >
          {/* Ambient blobs */}
          <div className="absolute -right-20 -top-10 h-72 w-72 rounded-full bg-champagne/25 blur-3xl" />
          <div className="absolute bottom-10 left-0 h-56 w-56 rounded-full bg-ink/5 blur-3xl" />

          {/* Big editorial card */}
          <FloatCard
            className="absolute left-[6%] top-[4%] h-[62%] w-[58%] overflow-hidden rounded-[28px] border border-hairline bg-white shadow-[0_40px_80px_-40px_rgba(17,17,17,0.25)]"
            depth={30}
          >
            <div className="flex h-full flex-col justify-between p-6">
              <div>
                <p className="eyebrow">Case · Branding</p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-ink">
                  Aura Box<br />Creative Studio
                </h3>
              </div>
              <div className="flex items-end justify-between">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-champagne-soft via-white to-champagne/40" />
                <span className="text-[0.65rem] uppercase tracking-[0.28em] text-graphite">
                  2025
                </span>
              </div>
            </div>
            <div className="absolute inset-x-6 bottom-[42%] h-px bg-hairline" />
          </FloatCard>

          {/* Instagram mock */}
          <FloatCard
            className="float-slow absolute right-[4%] top-[10%] h-[42%] w-[42%] overflow-hidden rounded-[24px] border border-hairline bg-white shadow-[0_30px_60px_-30px_rgba(17,17,17,0.25)]"
            depth={45}
          >
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-champagne to-ink" />
                <span className="text-[0.7rem] font-medium text-ink">monalisa.design</span>
              </div>
              <span className="text-graphite">···</span>
            </div>
            <div className="relative h-[70%] bg-gradient-to-br from-[#f6f1e7] via-white to-[#efe6d3]">
              <div className="absolute inset-6 rounded-xl border border-champagne/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-serif text-3xl italic text-ink/70">aura</p>
              </div>
            </div>
          </FloatCard>

          {/* Award badge */}
          <FloatCard
            className="absolute bottom-[8%] left-[2%] w-[52%] rounded-2xl border border-hairline bg-white p-5 shadow-[0_20px_50px_-25px_rgba(17,17,17,0.3)]"
            depth={60}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-champagne/15 text-lg">
                🏆
              </div>
              <div className="min-w-0">
                <p className="eyebrow">Prêmio</p>
                <p className="mt-1 font-serif text-sm leading-snug text-ink">
                  Melhor Projeto em Inovação — CEUB Destaque 2026.1
                </p>
              </div>
            </div>
          </FloatCard>

          {/* Palette chip */}
          <FloatCard
            className="absolute bottom-[10%] right-[6%] flex w-[36%] flex-col gap-3 rounded-2xl border border-hairline bg-white/95 p-4 shadow-[0_20px_50px_-25px_rgba(17,17,17,0.25)] backdrop-blur"
            depth={80}
          >
            <p className="eyebrow">Paleta</p>
            <div className="flex gap-2">
              <span className="h-8 flex-1 rounded-md bg-ink" />
              <span className="h-8 flex-1 rounded-md bg-champagne" />
              <span className="h-8 flex-1 rounded-md bg-[#f6f1e7]" />
              <span className="h-8 flex-1 rounded-md border border-hairline bg-white" />
            </div>
          </FloatCard>
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

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-serif text-3xl text-ink">{n}</p>
      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-graphite">{l}</p>
    </div>
  );
}

function FloatCard({
  className,
  depth = 40,
  children,
}: {
  className?: string;
  depth?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px), 0)`,
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
