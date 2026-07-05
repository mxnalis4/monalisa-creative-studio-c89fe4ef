import Reveal from "./Reveal";

const WHATSAPP = "https://wa.me/5561981201377";

export default function CTA() {
  return (
    <section id="contato" className="relative overflow-hidden bg-white py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-6 text-center md:px-10">
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-4">
            <span className="h-px w-10 bg-champagne" />
            <span className="eyebrow">Vamos criar juntos</span>
            <span className="h-px w-10 bg-champagne" />
          </div>
          <h2 className="font-serif text-5xl leading-[1.05] text-ink md:text-7xl lg:text-[5.5rem]">
            Vamos transformar sua <em className="text-champagne">presença digital</em>?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-graphite md:text-lg">
            Se você procura uma profissional dedicada para elevar sua marca através do design e da estratégia, vamos
            conversar.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-[0.72rem] uppercase tracking-[0.28em] text-white transition-all hover:bg-champagne"
            >
              Solicitar orçamento
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="mailto:henkellmonalisa70@gmail.com"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-4 text-[0.72rem] uppercase tracking-[0.28em] text-ink transition-all hover:border-champagne hover:text-champagne"
            >
              Enviar e-mail
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
