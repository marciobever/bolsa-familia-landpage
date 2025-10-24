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
            Programa Brasil Sorridente 2025
          </div>

          {/* Título impactante */}
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Você Tem Direito a{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dentista GRATUITO!
            </span>
          </h1>

          {/* Subtítulo otimizado para SEO (mais denso, sem poluir) */}
          <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground md:text-xl">
            O <strong>Brasil Sorridente</strong> garante <strong>tratamento odontológico gratuito pelo SUS</strong>,
            com consultas, limpezas, restaurações, tratamento de canal e, quando indicado, encaminhamento ao
            <strong> Centro de Especialidades Odontológicas (CEO)</strong>. Para iniciar, procure a
            <strong> UBS/ESF</strong> do seu bairro com documento com foto, <strong>Cartão do SUS (CNS)</strong> e
            comprovante de endereço. Confira abaixo como agendar e ver sua elegibilidade em 2025.
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
              aria-label="Ver como agendar"
            >
              Como Agendar
            </Button>
          </div>

          {/* Linha discreta de confiança (opcional) */}
          <p className="mb-8 text-xs text-muted-foreground">
            Atualizado em outubro de 2025 — conteúdo informativo baseado em orientações do SUS.
          </p>

          {/* Link em destaque (discreto, sem poluir) */}
          <div className="mx-auto max-w-2xl rounded-lg border bg-muted/40 p-4 text-left">
            <p className="text-sm">
              <strong>Quer comparar opções?</strong>{" "}
              <a
                href="https://marciobevervanso.com.br/brasil-sorridente-vs-planos-odontologicos-comparativo-2025/"
                target="_blank"
                rel="nofollow noopener"
                className="underline underline-offset-2 hover:text-primary"
              >
                Brasil Sorridente x Planos Odontológicos — Comparativo 2025
              </a>
            </p>
          </div>

          {/* Prova social */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-5 w-5 text-accent" />
            <span>Mais de 30 milhões de brasileiros já foram atendidos</span>
          </div>
        </div>
      </div>
    </section>
  );
};
