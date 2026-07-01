export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline bg-white py-14">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 md:px-10">
        <p className="font-serif text-3xl tracking-[0.28em] text-ink">MONALISA</p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-[0.72rem] uppercase tracking-[0.28em] text-graphite">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-champagne">
            Instagram
          </a>
          <span className="h-1 w-1 rounded-full bg-hairline" />
          <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="transition-colors hover:text-champagne">
            WhatsApp
          </a>
          <span className="h-1 w-1 rounded-full bg-hairline" />
          <a href="https://behance.net" target="_blank" rel="noreferrer" className="transition-colors hover:text-champagne">
            Behance
          </a>
          <span className="h-1 w-1 rounded-full bg-hairline" />
          <a href="mailto:contato@monalisa.com" className="transition-colors hover:text-champagne">
            E-mail
          </a>
        </div>
        <span className="hairline max-w-md" />
        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-graphite">
          © {year} Monalisa · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
