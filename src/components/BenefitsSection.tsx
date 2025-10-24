import { Card } from "@/components/ui/card";
import { DollarSign, MapPin, Award, ArrowRight } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Tudo de graça",
      description:
        "Consultas, prevenção, restaurações e canal. Próteses podem existir conforme a rede municipal.",
    },
    {
      icon: MapPin,
      title: "Perto de casa",
      description:
        "Atendimento na UBS/ESF do bairro e, quando necessário, no Centro de Especialidades Odontológicas (CEO).",
    },
    {
      icon: Award,
      title: "Dentistas qualificados",
      description:
        "Profissionais cadastrados no CNES e protocolos de atenção à saúde bucal.",
    },
  ];

  const resources = [
    {
      title: "Guia de Benefícios Sociais 2025",
      desc: "Entenda direitos, quem tem acesso e como solicitar.",
      url: "https://marciobevervanso.com.br/beneficios-sociais-governo-federal-guia-direitos-2025/",
    },
    {
      title: "CNH Social 2025 — regras e comparação",
      desc: "Critérios por estado, documentos e prazos.",
      url: "https://marciobevervanso.com.br/cnh-gratuita-social-comparativo-regras-2025/",
    },
    {
      title: "Bolsa Família 2025 — benefícios e regras",
      desc: "Valores, composição familiar e atualização de cadastro.",
      url: "https://marciobevervanso.com.br/bolsa-familia-comparativo-beneficios-regras/",
    },
    {
      title: "Minha Casa Minha Vida 2025 — faixas e benefícios",
      desc: "Quem tem direito, rendas por faixa e vantagens.",
      url: "https://marciobevervanso.com.br/minha-casa-minha-vida-2025-comparativo-faixas-beneficios/",
    },
  ];

  return (
    <section id="beneficios" className="py-20">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Por que escolher o Brasil Sorridente?
          </h2>
          <p className="text-lg text-muted-foreground">
            Atendimento odontológico completo e gratuito em todo o país.
          </p>
        </div>

        {/* 3 benefícios */}
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((b, i) => (
            <Card
              key={i}
              className="group h-full p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-strong"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <b.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{b.title}</h3>
              <p className="text-muted-foreground">{b.description}</p>
            </Card>
          ))}
        </div>

        {/* Recursos úteis */}
        <div className="mt-14">
          <div className="mb-4 text-center">
            <h3 className="text-2xl font-semibold">Recursos úteis para você</h3>
            <p className="text-muted-foreground">
              Conteúdos que complementam sua jornada de acesso a direitos e serviços.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {resources.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="nofollow noopener"
                className="group block"
              >
                <Card className="flex h-full items-stretch justify-between gap-4 rounded-xl border-2 p-5 transition-colors hover:border-primary/50">
                  {/* texto */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h4 className="text-base font-semibold leading-snug">
                      {r.title}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {r.desc}
                    </p>
                    <span className="mt-3 text-sm font-medium text-primary">
                      Ler agora
                    </span>
                  </div>

                  {/* chevron */}
                  <div className="flex shrink-0 items-center">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-muted text-foreground transition-colors group-hover:border-primary/50">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Card>
              </a>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted-foreground">
            A disponibilidade de procedimentos pode variar por município conforme
            registro no CNES e demanda local.
          </p>
        </div>
      </div>
    </section>
  );
};
