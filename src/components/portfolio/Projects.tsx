import { useEffect, useState } from "react";
import { X, ExternalLink, Award } from "lucide-react";
import Reveal from "./Reveal";

type Project = {
  id: string;
  name: string;
  category: string;
  categoryKey: "Social Media" | "Branding" | "UX/UI" | "Design";
  short: string;
  cover: string; // gradient class
  award?: string;
  link?: string;
  tools?: string[];
  features?: string[];
  context?: string;
  objective?: string;
  challenge?: string;
  process?: string;
  result?: string;
  gallery?: number; // number of placeholder tiles
};

const PROJECTS: Project[] = [
  {
    id: "duo-dates",
    name: "Duo Dates",
    category: "UX/UI · Desenvolvimento · Inovação",
    categoryKey: "UX/UI",
    short:
      "Plataforma que utiliza IA para ajudar casais a planejarem encontros personalizados.",
    cover:
      "bg-[radial-gradient(120%_100%_at_20%_10%,#f5d6dc_0%,#e9b7c1_40%,#7a2b3a_100%)]",
    award: "Melhor Projeto em Inovação — CEUB Destaque 2026.1",
    link: "https://duodates.rf.gd",
    tools: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "IA"],
    features: [
      "Match inteligente",
      "Recomendações personalizadas",
      "Questionário de perfil",
      "Sugestão de locais",
      "Organização de encontros",
    ],
    context:
      "Projeto de TCC desenvolvido para transformar a experiência de casais na hora de planejar encontros memoráveis.",
    objective:
      "Reduzir a indecisão do dia a dia e propor experiências que fortaleçam o relacionamento com base em dados de perfil.",
    challenge:
      "Combinar inteligência artificial, UX empático e uma interface leve — mantendo desempenho em ambientes web tradicionais.",
    process:
      "Pesquisa com usuários, arquitetura da informação, prototipagem no Figma, testes de usabilidade e implementação full-stack.",
    result:
      "Solução premiada, com aprovação dos usuários testados e reconhecimento acadêmico como referência em inovação.",
    gallery: 4,
  },
  {
    id: "aura-box",
    name: "Aura Box Creative Studio",
    category: "Branding",
    categoryKey: "Branding",
    short:
      "Identidade visual, conteúdo e materiais para um estúdio de boxes presenteáveis.",
    cover:
      "bg-[radial-gradient(120%_100%_at_80%_20%,#f6ecd6_0%,#e8d3a8_40%,#8a6b3a_100%)]",
    link: "https://aura-box-creative-studio.lovable.app/",
    tools: ["Photoshop", "Illustrator", "Canva", "Meta Business Suite"],
    features: [
      "Identidade visual completa",
      "Sistema de aplicações",
      "Conteúdos para redes sociais",
      "Materiais de divulgação",
    ],
    context:
      "Empresa especializada em boxes presenteáveis com foco em experiências sensoriais e sofisticadas.",
    objective:
      "Traduzir o conceito de presente memorável em uma identidade visual coesa e desejável.",
    challenge:
      "Equilibrar delicadeza e força visual em múltiplos pontos de contato — do post ao pacote físico.",
    process:
      "Moodboard, definição de paleta e tipografia, sistema de grid, aplicações em mockups e conteúdo editorial.",
    result:
      "Marca reconhecível, com padrão premium mantido em todos os canais.",
    gallery: 6,
  },
  {
    id: "social",
    name: "Artes para Redes Sociais",
    category: "Social Media",
    categoryKey: "Social Media",
    short: "Posts, carrosséis, stories e criativos com identidade coesa.",
    cover:
      "bg-[radial-gradient(120%_100%_at_50%_0%,#efe6d3_0%,#d7bf8a_50%,#3d2f16_100%)]",
    features: ["Posts", "Carrosséis", "Stories", "Criativos"],
    context: "Curadoria de artes desenvolvidas para diferentes marcas e nichos.",
    gallery: 8,
  },
  {
    id: "impressos",
    name: "Design para Impressos",
    category: "Design",
    categoryKey: "Design",
    short: "Banners, panfletos, fachadas e materiais promocionais.",
    cover:
      "bg-[radial-gradient(120%_100%_at_100%_100%,#e5e1d6_0%,#a89a7a_50%,#221d10_100%)]",
    features: ["Banners", "Panfletos", "Fachadas", "Materiais promocionais"],
    context: "Peças gráficas pensadas para causar impacto no ponto de venda.",
    gallery: 6,
  },
  {
    id: "vestuario",
    name: "Vestuário",
    category: "Design",
    categoryKey: "Design",
    short: "Estampas e artes para camisetas.",
    cover:
      "bg-[radial-gradient(120%_100%_at_30%_80%,#f6e9dd_0%,#c69b7b_45%,#402315_100%)]",
    features: ["Estampas", "Artes exclusivas", "Coleções"],
    context: "Estampas autorais criadas para peças de vestuário.",
    gallery: 6,
  },
];

const FILTERS = ["Todos", "Social Media", "Branding", "UX/UI", "Design"] as const;

export default function Projects() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("Todos");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = active === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.categoryKey === active);

  useEffect(() => {
    if (selected) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projetos" className="relative bg-white py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-champagne" />
              <span className="eyebrow">Projetos selecionados</span>
            </div>
            <h2 className="max-w-3xl font-serif text-4xl leading-tight text-ink md:text-5xl lg:text-6xl">
              Trabalhos construídos com{" "}
              <em className="text-champagne">estratégia</em> e acabamento premium.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-[0.24em] transition-all ${
                  active === f
                    ? "border-ink bg-ink text-white"
                    : "border-hairline bg-white text-graphite hover:border-champagne hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {visible.map((p, i) => {
            const span =
              i === 0
                ? "md:col-span-4 md:row-span-2"
                : i === 1
                  ? "md:col-span-2 md:row-span-2"
                  : "md:col-span-2";
            return (
              <Reveal
                key={p.id}
                delay={i * 60}
                className={`${span} group cursor-pointer overflow-hidden rounded-3xl border border-hairline bg-white`}
              >
                <button
                  onClick={() => setSelected(p)}
                  className="flex h-full w-full flex-col text-left"
                >
                  <div
                    className={`relative aspect-[16/10] w-full overflow-hidden ${p.cover}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    {p.award && (
                      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white backdrop-blur">
                        <Award size={12} /> Prêmio
                      </div>
                    )}
                    <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
                      <div>
                        <p className="text-[0.62rem] uppercase tracking-[0.28em] opacity-80">
                          {p.category}
                        </p>
                        <h3 className="mt-2 font-serif text-2xl md:text-3xl">{p.name}</h3>
                      </div>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/95 text-ink transition-transform group-hover:-translate-y-1 group-hover:bg-champagne group-hover:text-white">
                        →
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-6 py-5">
                    <p className="text-sm text-graphite">{p.short}</p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-2 backdrop-blur-md sm:p-6"
      onClick={onClose}
      style={{ animation: "reveal-fade 0.3s ease" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[96vh] w-full max-w-[1300px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:h-[92vh]"
        style={{ animation: "reveal-up 0.5s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-hairline bg-white/95 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-white"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto">
          <div className={`relative flex aspect-[16/8] w-full items-end ${project.cover}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="relative z-10 flex w-full flex-col gap-4 p-8 text-white md:p-12">
              {project.award && (
                <div className="flex items-center gap-2 self-start rounded-full border border-champagne/60 bg-champagne/20 px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-white backdrop-blur">
                  <Award size={14} className="text-champagne" />
                  {project.award}
                </div>
              )}
              <p className="text-[0.7rem] uppercase tracking-[0.28em] opacity-80">
                {project.category}
              </p>
              <h3 className="font-serif text-4xl leading-tight md:text-6xl">{project.name}</h3>
            </div>
          </div>

          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 p-8 md:grid-cols-3 md:p-12">
            <div className="space-y-8 md:col-span-2">
              {project.context && (
                <Block label="Contexto" text={project.context} />
              )}
              {project.objective && <Block label="Objetivo" text={project.objective} />}
              {project.challenge && <Block label="Desafio" text={project.challenge} />}
              {project.process && <Block label="Processo" text={project.process} />}
              {project.result && <Block label="Resultado" text={project.result} />}
            </div>

            <aside className="space-y-8 border-l border-hairline pl-8 md:pl-10">
              {project.features && (
                <div>
                  <p className="eyebrow">Funcionalidades</p>
                  <ul className="mt-4 space-y-2 text-sm text-ink">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-champagne" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.tools && (
                <div>
                  <p className="eyebrow">Ferramentas</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-hairline px-3 py-1.5 text-xs text-graphite"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.28em] text-white transition-colors hover:bg-champagne"
                >
                  Visitar projeto
                  <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </aside>
          </div>

          {project.gallery && project.gallery > 0 && (
            <div className="border-t border-hairline p-8 md:p-12">
              <div className="mx-auto max-w-[1100px]">
                <p className="eyebrow mb-6">Galeria</p>
                <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
                  {Array.from({ length: project.gallery }).map((_, i) => (
                    <div
                      key={i}
                      className="mb-4 flex aspect-[4/5] items-center justify-center break-inside-avoid rounded-2xl border border-hairline bg-gradient-to-br from-[#faf5ea] via-white to-[#efe6d3] text-graphite"
                      style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/5" : "1/1" }}
                    >
                      <span className="text-[0.62rem] uppercase tracking-[0.28em]">
                        Imagem {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="mt-3 text-base leading-relaxed text-ink md:text-lg">{text}</p>
    </div>
  );
}
