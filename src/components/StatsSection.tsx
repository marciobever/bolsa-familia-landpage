import { Card } from "@/components/ui/card";
import { Users, Building2 } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "30M+",
      label: "Pessoas atendidas",
      desc:
        "Cuidado contínuo em prevenção, restaurações e tratamento especializado quando indicado.",
      color: "from-primary to-primary-glow",
    },
    {
      icon: Building2,
      value: "27K+",
      label: "Unidades de saúde",
      desc:
        "UBS/ESF com saúde bucal e encaminhamento para Centros de Especialidades (CEO).",
      color: "from-accent to-secondary",
    },
  ] as const;

  return (
    <section
      id="estatisticas"
      className="py-20 bg-gradient-to-b from-muted/30 to-background"
      aria-labelledby="stats-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 id="stats-heading" className="mb-4 text-3xl font-bold md:text-4xl">
            Números que impressionam
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma rede nacional que leva saúde bucal gratuita para quem mais precisa.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <Card
              key={i}
              className="group p-7 sm:p-8 shadow-soft transition-all duration-300 hover:-translate-y-[2px] hover:shadow-strong h-full"
            >
              <div className="flex items-start gap-4">
                {/* Ícone decorativo */}
                <div
                  className={`shrink-0 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br ${s.color} text-white`}
                  aria-hidden="true"
                >
                  <s.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {s.value}
                    </span>
                    <span className="text-base sm:text-lg text-foreground/80 font-semibold">
                      {s.label}
                    </span>
                  </div>

                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Nota discreta para contexto (opcional, bom para SEO/credibilidade) */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Valores aproximados; a cobertura pode variar por município e capacidade da rede.
        </p>
      </div>
    </section>
  );
};
