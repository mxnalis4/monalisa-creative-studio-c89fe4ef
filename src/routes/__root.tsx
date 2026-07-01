import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-5xl text-foreground">Página não encontrada</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          O endereço que você procura não existe ou foi movido.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-ink px-6 py-3 text-xs uppercase tracking-[0.28em] text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl tracking-tight text-foreground">
          Algo saiu do lugar
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Tente novamente ou volte para a página inicial.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.28em] text-white transition-opacity hover:opacity-90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-ink px-6 py-3 text-xs uppercase tracking-[0.28em] text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Monalisa — Social Media & Designer Gráfica" },
      {
        name: "description",
        content:
          "Portfólio de Monalisa — Social Media e Designer Gráfica. Identidade visual, conteúdo estratégico e experiências digitais com acabamento premium.",
      },
      { name: "author", content: "Monalisa" },
      { property: "og:title", content: "Monalisa — Social Media & Designer Gráfica" },
      {
        property: "og:description",
        content:
          "Identidade visual, conteúdo estratégico e experiências digitais com acabamento premium.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Monalisa — Social Media & Designer Gráfica" },
      { name: "description", content: "Monalisa Design Studio showcases a premium digital portfolio for a Social Media and Graphic Designer." },
      { property: "og:description", content: "Monalisa Design Studio showcases a premium digital portfolio for a Social Media and Graphic Designer." },
      { name: "twitter:description", content: "Monalisa Design Studio showcases a premium digital portfolio for a Social Media and Graphic Designer." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/50210b6f-d9a6-42c8-9123-1ceca25e4a85/id-preview-9208f813--e63c501a-d289-4262-b2f9-b66537fdd0df.lovable.app-1782923827775.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/50210b6f-d9a6-42c8-9123-1ceca25e4a85/id-preview-9208f813--e63c501a-d289-4262-b2f9-b66537fdd0df.lovable.app-1782923827775.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
