import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ClipboardList, Phone, Clock } from "lucide-react";

export const StepsSection = () => {
  const steps = [
    {
      icon: FileText,
      title: "Reúna os documentos",
      description:
        "Leve documento com foto, Cartão do SUS (CNS) e comprovante de endereço à sua UBS/ESF.",
    },
    {
      icon: ClipboardList,
      title: "Solicite a triagem odontológica",
      description:
        "A equipe avalia sua necessidade; se indicado, você é encaminhado ao Centro de Especialidades Odontológicas (CEO).",
    },
    {
      icon: Clock,
      title: "Urgências 24h",
      description:
        "Para dor forte, infecções ou traumas, procure a UPA mais próxima. Atendimento de urgência é priorizado.",
    },
    {
      icon: Phone,
      title: "Tire suas dúvidas",
      description:
        "Dúvidas gerais? Ligue 136 (Disque Saúde) para informações sobre serviços e horários.",
    },
  ] as const;

  const goQuiz = () =>
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="como-agendar" className="py-20" aria-labelledby="como-agendar-title">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 id="como-agendar-title" className="mb-4 text-3xl font-bold md:text-4xl">
            Como agendar na sua cidade
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Siga estes passos simples para começar seu atendimento odontológico gratuito pelo SUS.
          </p>
        </div>

        <ol
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto"
          aria-label="Passo a passo do agendamento"
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
            A oferta de procedimentos varia por município e disponibilidade registrada no CNES.
          </p>

          {/* CTA opcional para o quiz (mantém o fluxo) */}
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
