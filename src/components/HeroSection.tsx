import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const HeroSection = () => {
  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          {/* Pill */}
          <div className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Programa Bolsa Família 2025
          </div>

          {/* Título impactante */}
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Você tem direito ao{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Bolsa Família?
            </span>
          </h1>

          {/* Subtítulo com SEO sem poluir */}
          <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground md:text-xl">
            Entenda como funciona o <strong>Bolsa Família 2025</strong> — benefício de transferência de renda
            com regras de <strong>renda per capita</strong>, <strong>Cadastro Único (CadÚnico)</strong>, composição
            familiar e acompanhamento de <strong>saúde</strong> e <strong>frequência escolar</strong>. Veja como
            consultar o <strong>NIS</strong>, conferir o <strong>calendário de pagamentos</strong> e os próximos passos
            para receber pela <strong>Caixa</strong>.
          </p>

          {/* CTAs */}
          <div className="mb-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="hero"
              onClick={scrollToQuiz}
              className="w-full sm:w-auto"
              aria-label="Verificar minha elegibilidade no quiz"
            >
              Verificar Minha Elegibilidade
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document.getElementById("como-agendar")?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto"
              aria-label="Ver como receber"
            >
              Como Receber
            </Button>
          </div>

          {/* Linha discreta de confiança */}
          <p className="mb-8 text-xs text-muted-foreground">
            Conteúdo informativo e independente — não oficial. Atualizado em 2025.
          </p>

          {/* Link em destaque (materiais úteis) */}
          <div className="mx-auto max-w-2xl rounded-lg border bg-muted/40 p-4 text-left">
            <p className="text-sm">
              <strong>Quer ver valores e regras detalhadas?</strong>{" "}
              <a
                href="https://marciobevervanso.com.br/bolsa-familia-comparativo-beneficios-regras/"
                target="_blank"
                rel="nofollow noopener"
                className="underline underline-offset-2 hover:text-primary"
              >
                Bolsa Família 2025 — benefícios e regras
              </a>
            </p>
          </div>

          {/* Prova social / credibilidade */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-5 w-5 text-accent" />
            <span>Guia prático com passo a passo para inscrição e consulta</span>
          </div>
        </div>
      </div>
    </section>
  );
};
