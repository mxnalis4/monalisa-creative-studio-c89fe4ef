import Reveal from "./Reveal";

const VALUES = [
  { t: "Criatividade", d: "Soluções visuais originais que traduzem a essência de cada marca." },
  { t: "Organização", d: "Processo claro, entregas no prazo e comunicação transparente." },
  { t: "Comunicação", d: "Escuta ativa para entender o que realmente importa em cada projeto." },
  { t: "Aprendizado Contínuo", d: "Estudo constante para entregar sempre um passo à frente." },
];

export default function About() {
  return (
    <section id="sobre" className="relative bg-white py-28 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-10 lg:gap-24">
        <Reveal className="relative">
          <div className="sticky top-32">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px]">
              {/* soft glow */}
              <div className="absolute -inset-6 rounded-[46%_54%_48%_52%/44%_46%_54%_56%] bg-champagne/15 blur-2xl" />
              <div className="organic-mask relative h-full w-full overflow-hidden border border-hairline bg-[#f6f1e7] shadow-[0_40px_80px_-40px_rgba(17,17,17,0.25)]">
                {/* Placeholder — will be replaced with user photo */}
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white via-[#faf5ea] to-champagne/25">
                  <div className="text-center">
                    <p className="font-serif text-6xl italic text-champagne">M</p>
                    <p className="mt-3 text-[0.65rem] uppercase tracking-[0.32em] text-graphite">
                      Foto em breve
                    </p>
                  </div>
                </div>
              </div>
              {/* corner tag */}
              <div className="absolute -bottom-6 -right-4 rounded-full border border-hairline bg-white px-5 py-3 shadow-[0_20px_40px_-20px_rgba(17,17,17,0.2)]">
                <p className="text-[0.62rem] uppercase tracking-[0.32em] text-graphite">
                  Baseada em <span className="text-ink">Brasília</span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-champagne" />
            <span className="eyebrow">Sobre</span>
          </div>
          <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl lg:text-6xl">
            Prazer, eu sou <em className="text-champagne">Monalisa</em>.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-graphite md:text-lg">
            <p>
              Sou Social Media e Designer Gráfica apaixonada por transformar ideias
              em comunicação visual estratégica.
            </p>
            <p>
              Mesmo no início da minha carreira, busco entregar projetos com atenção
              aos detalhes, identidade forte e foco em resultados.
            </p>
            <p className="text-ink">
              Acredito que um bom design transmite confiança antes mesmo da primeira
              conversa.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <div
                key={v.t}
                className="card-elevated group rounded-2xl p-6"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-hairline font-serif text-sm text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-lg text-ink">{v.t}</h3>
                </div>
                <p className="text-sm leading-relaxed text-graphite">{v.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
