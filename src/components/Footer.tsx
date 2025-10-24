import { ExternalLink, AlertCircle, ArrowUpRight, ChevronUp } from "lucide-react";

export const Footer = () => {
  // Links oficiais (Bolsa Família)
  const official = [
    { title: "Bolsa Família — gov.br/MDS", url: "https://www.gov.br/mds/pt-br/bolsa-familia" },
    { title: "Caixa — Bolsa Família", url: "https://www.caixa.gov.br/bolsa-familia" },
    { title: "Calendário de Pagamentos — Caixa", url: "https://www.caixa.gov.br/beneficios-trabalhador/bolsa-familia/Paginas/default.aspx" },
  ] as const;

  // Navegação interna (ajuste ids conforme as seções do seu projeto)
  const internal = [
    { title: "Benefícios", href: "#beneficios" },
    { title: "Quiz de elegibilidade", href: "#quiz" },
    { title: "Como receber", href: "#como-receber" }, // se a seção for "como-agendar", troque o id aqui
    { title: "Perguntas frequentes", href: "#faq" },
    { title: "Assistente (chat)", href: "/assistente" },
  ] as const;

  const year = new Date().getFullYear();

  const scrollTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        {/* Grid principal */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Navegação interna */}
          <nav aria-label="Navegação do site">
            <h3 className="mb-4 text-lg font-semibold">Navegação</h3>
            <ul className="flex flex-col gap-2">
              {internal.map((l) => (
                <li key={l.title}>
                  {l.href.startsWith("#") ? (
                    <button
                      onClick={() =>
                        document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                      className="inline-flex items-center gap-2 text-foreground/90 hover:text-primary"
                      aria-label={`Ir para ${l.title}`}
                    >
                      {l.title}
                      <ArrowUpRight className="h-4 w-4 opacity-70" />
                    </button>
                  ) : (
                    <a
                      href={l.href}
                      className="inline-flex items-center gap-2 text-foreground/90 hover:text-primary"
                      aria-label={`Abrir ${l.title}`}
                    >
                      {l.title}
                      <ArrowUpRight className="h-4 w-4 opacity-70" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Links oficiais */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Links oficiais e fontes</h3>
            <ul className="flex flex-col gap-2">
              {official.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-2"
                    aria-label={`${l.title} (abre em nova aba)`}
                  >
                    {l.title}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Aviso / Compliance */}
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-sm text-muted-foreground">
                <p className="mb-2 font-semibold text-foreground">Aviso importante</p>
                <p className="mb-3">
                  Esta página não possui vínculo com o Governo Federal, Ministério do Desenvolvimento e Assistência Social
                  (MDS), Caixa ou quaisquer órgãos públicos. O conteúdo é informativo e serve para orientar sobre o
                  programa Bolsa Família.
                </p>
                <p>
                  Não coletamos dados pessoais, não solicitamos pagamentos e não realizamos inscrições. Para cadastro e
                  atualização, procure o <strong>CRAS/CadÚnico</strong> da sua cidade e os canais oficiais da Caixa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <div>
            <p>© {year} Bolsa Família — Página informativa</p>
            <p className="mt-1">Preferências de privacidade e cookies geridas pela Google (AdSense/Analytics).</p>
          </div>

          <button
            onClick={scrollTop}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-foreground hover:border-primary hover:text-primary"
            aria-label="Voltar ao topo"
          >
            <ChevronUp className="h-4 w-4" />
            Voltar ao topo
          </button>
        </div>
      </div>
    </footer>
  );
};
