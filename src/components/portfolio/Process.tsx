import Reveal from "./Reveal";

const STEPS = [
  { n: "01", t: "Briefing", d: "Escuta ativa para entender objetivos, público e essência da marca." },
  { n: "02", t: "Pesquisa", d: "Análise de referências, concorrência e tendências relevantes." },
  { n: "03", t: "Estratégia", d: "Definição de posicionamento, tom de voz e diretrizes visuais." },
  { n: "04", t: "Criação", d: "Desenvolvimento das peças com refinamento e iteração." },
  { n: "05", t: "Apresentação", d: "Entrega em formato editorial, justificando cada decisão." },
  { n: "06", t: "Entrega", d: "Arquivos organizados, manual e suporte após a implementação." },
];

export default function Process() {
  return (
    <section id="processo" className="relative bg-[#0e0e0e] py-28 text-white md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="mb-16 max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-champagne" />
            <span className="eyebrow" style={{ color: "#c9a66b" }}>Processo</span>
          </div>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
            Um método claro, do briefing ao{" "}
            <em className="text-champagne">acabamento final</em>.
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-0 right-0 top-[38px] hidden h-px bg-white/10 md:block" />
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 md:gap-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80} className="group relative">
                <div className="relative">
                  <div className="relative z-10 grid h-[76px] w-[76px] place-items-center rounded-full border border-white/15 bg-[#0e0e0e] font-serif text-xl text-white transition-all duration-500 group-hover:border-champagne group-hover:bg-champagne group-hover:text-ink">
                    {s.n}
                  </div>
                  <div className="absolute inset-0 -z-0 rounded-full bg-champagne/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <h3 className="mt-8 font-serif text-xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
