import {
  Instagram,
  Calendar,
  LayoutGrid,
  Palette,
  Printer,
  Presentation,
  Image as ImageIcon,
  Megaphone,
} from "lucide-react";
import Reveal from "./Reveal";

const SERVICES = [
  { icon: Instagram, t: "Social Media", d: "Gestão estratégica de perfis com foco em posicionamento e crescimento." },
  { icon: Calendar, t: "Planejamento de Conteúdo", d: "Calendários editoriais alinhados com objetivos de marca." },
  { icon: LayoutGrid, t: "Design para Instagram", d: "Feeds, carrosséis e stories com identidade coesa e memorável." },
  { icon: Palette, t: "Identidade Visual", d: "Logotipos, paletas, tipografia e sistemas visuais completos." },
  { icon: Printer, t: "Materiais Impressos", d: "Cartões, folders, catálogos e materiais gráficos em geral." },
  { icon: Presentation, t: "Apresentações", d: "Slides sofisticados que sustentam narrativas profissionais." },
  { icon: ImageIcon, t: "Banners", d: "Peças digitais e físicas com hierarquia visual impecável." },
  { icon: Megaphone, t: "Criativos para Anúncios", d: "Artes performáticas testadas para conversão em campanhas." },
];

export default function Services() {
  return (
    <section id="servicos" className="relative bg-[#fafafa] py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-champagne" />
              <span className="eyebrow">Serviços</span>
            </div>
            <h2 className="max-w-2xl font-serif text-4xl leading-tight text-ink md:text-5xl lg:text-6xl">
              Um portfólio de serviços pensado para{" "}
              <em className="text-champagne">elevar</em> marcas.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-graphite">
            Cada entrega é tratada como uma peça editorial — do briefing ao acabamento
            final. Estratégia, estética e consistência caminham juntas.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                key={s.t}
                delay={i * 60}
                className="group relative flex flex-col justify-between bg-white p-8 transition-all duration-500 hover:bg-white"
              >
                <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-champagne transition-transform duration-500 group-hover:scale-x-100" />
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-full border border-hairline text-ink transition-all duration-500 group-hover:border-champagne group-hover:bg-champagne/10 group-hover:text-champagne">
                      <Icon size={20} strokeWidth={1.4} />
                    </div>
                    <span className="font-serif text-xs text-graphite">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-ink">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{s.d}</p>
                </div>
                <div className="mt-10 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-graphite transition-colors group-hover:text-champagne">
                  Saber mais
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
