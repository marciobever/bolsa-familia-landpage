import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IdCard, Building2, Smartphone, CalendarDays } from "lucide-react";

export const StepsSection = () => {
  const steps = [
    {
      icon: IdCard,
      title: "Separe os documentos",
      description:
        "Leve CPF de todos da família, documento com foto, comprovante de endereço e, se tiver, NIS.",
    },
    {
      icon: Building2,
      title: "CadÚnico no CRAS",
      description:
        "Faça ou atualize o CadÚnico no CRAS/posto do seu município. Entrevista e validação do cadastro.",
    },
    {
      icon: Smartphone,
      title: "Acompanhe a análise",
      description:
        "Veja o status pelo app Bolsa Família/CAIXA Tem ou consulta pública do CadÚnico. Prefeituras também informam.",
    },
    {
      icon: CalendarDays,
      title: "Receba e mantenha",
      description:
        "Siga o calendário de pagamento e mantenha o benefício: condicionalidades de saúde/educação e cadastro atualizado.",
    },
  ] as const;

  const goQuiz = () =>
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="como-agendar" className="py-20" aria-labelledby="como-agendar-title">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 id="como-agendar-title" className="mb-4 text-3xl font-bold md:text-4xl">
            Como receber o Bolsa Família
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Siga estes passos para se cadastrar, acompanhar o resultado e manter o benefício ativo.
          </p>
        </div>

        <ol
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto"
          aria-label="Passo a passo para receber o Bolsa Família"
        >
          {steps.map((step, index) => (
            <li key={step.title} className="list-none">
              <Card className="relative h-full p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-strong">
                {/* badge numerado */}
                <div
                  aria-hidden="true"
                  className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold text-sm shadow-md"
                >
                  {index + 1}
                </div>

                {/* ícone */}
                <div className="mt-4 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <step.icon className="h-6 w-6" />
                </div>

                {/* conteúdo */}
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
            A seleção considera renda e regras do programa. Mantenha o CadÚnico atualizado (no máximo a cada 24 meses).
          </p>

          {/* CTA opcional para o quiz (se existir na página) */}
          <div className="mt-4">
            <Button variant="hero" size="lg" onClick={goQuiz} aria-label="Ir para o quiz de elegibilidade">
              Verificar elegibilidade
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
