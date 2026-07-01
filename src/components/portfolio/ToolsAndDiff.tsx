const TOOLS = [
  "Photoshop", "Illustrator", "Canva", "Figma", "CapCut",
  "Meta Business Suite", "Google Drive", "Pacote Office",
  "HTML", "CSS", "JavaScript",
];

const DIFFS = [
  { t: "Organização", d: "Fluxo claro e entregas previsíveis." },
  { t: "Criatividade", d: "Ideias que traduzem estratégia em estética." },
  { t: "Comprometimento", d: "Responsabilidade com prazos e resultados." },
  { t: "Comunicação", d: "Diálogo aberto durante todo o projeto." },
  { t: "Aprendizado Constante", d: "Estudo diário de tendências e ferramentas." },
  { t: "Atenção aos detalhes", d: "Refinamento visual como padrão mínimo." },
];

import Reveal from "./Reveal";

export default function ToolsAndDiff() {
  return (
    <section className="relative bg-white py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-champagne" />
              <span className="eyebrow">Ferramentas</span>
            </div>
            <h2 className="max-w-xl font-serif text-4xl leading-tight text-ink md:text-5xl">
              O ferramental que sustenta cada entrega.
            </h2>
          </div>
        </Reveal>

        <div className="mb-24 flex flex-wrap gap-3">
          {TOOLS.map((t, i) => (
            <span
              key={t}
              className="rounded-full border border-hairline px-5 py-3 text-sm text-ink transition-all duration-500 hover:-translate-y-1 hover:border-champagne hover:text-champagne"
              style={{ fontSize: `${0.85 + ((i * 7) % 5) * 0.06}rem` }}
            >
              {t}
            </span>
          ))}
        </div>

        <Reveal className="mb-14">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-champagne" />
            <span className="eyebrow">Diferenciais</span>
          </div>
          <h2 className="max-w-2xl font-serif text-4xl leading-tight text-ink md:text-5xl">
            O que você pode <em className="text-champagne">esperar</em> ao trabalhar comigo.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFS.map((d, i) => (
            <Reveal key={d.t} delay={i * 60} className="card-elevated group rounded-2xl p-8">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-serif text-xs text-graphite">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-10 bg-hairline transition-all duration-500 group-hover:w-16 group-hover:bg-champagne" />
              </div>
              <h3 className="font-serif text-2xl text-ink">{d.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite">{d.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
