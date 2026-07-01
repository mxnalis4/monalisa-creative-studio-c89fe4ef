import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "projetos", label: "Projetos" },
  { id: "processo", label: "Processo" },
  { id: "contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    NAV_ITEMS.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <button
          onClick={() => go("home")}
          className="font-serif text-xl tracking-[0.35em] text-ink"
          aria-label="Início"
        >
          MONALISA
        </button>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                data-active={active === item.id}
                className="gold-underline text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => go("contato")}
          className="hidden rounded-full border border-ink px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.24em] text-ink transition-all hover:bg-ink hover:text-white md:inline-flex"
        >
          Orçamento
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Menu"
        >
          <span className="relative block h-[10px] w-6">
            <span
              className={`absolute left-0 top-0 h-px w-6 bg-ink transition-transform ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-6 bg-ink transition-transform ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`overflow-hidden bg-white/95 backdrop-blur-lg md:hidden ${
          open ? "max-h-[80vh]" : "max-h-0"
        } transition-all duration-500`}
      >
        <ul className="flex flex-col gap-1 px-6 pb-8 pt-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                className="w-full border-b border-hairline py-4 text-left font-serif text-2xl text-ink"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="pt-4">
            <button
              onClick={() => go("contato")}
              className="w-full rounded-full bg-ink py-4 text-xs uppercase tracking-[0.28em] text-white"
            >
              Solicitar orçamento
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
