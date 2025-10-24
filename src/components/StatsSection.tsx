import { Card } from "@/components/ui/card";
import { Users, MapPin, Building2 } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "20M+",
      label: "Famílias beneficiadas",
      desc:
        "Transferência de renda com condicionalidades de saúde e educação para proteção social.",
      color: "from-secondary to-accent", // verde → verde-claro
    },
    {
      icon: MapPin,
      value: "5K+",
      label: "Municípios atendidos",
      desc:
        "Presença nacional com pagamentos via Caixa e apoio local das prefeituras.",
      color: "from-primary to-primary-glow", // azul → azul-claro
    },
    {
      icon: Building2,
      value: "CRAS/CadÚnico",
      label: "Porta de entrada",
      desc:
        "Cadastro, atualização e orientação pelas equipes do CRAS e postos do CadÚnico.",
      color: "from-accent to-secondary", // verde-claro → verde
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
            Números que Importam
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {stats.map((s, i) => (
            <Card
              key={i}
              className="group h-full p-7 sm:p-8 shadow-soft transition-all duration-300 hover:-translate-y-[2px] hover:shadow-strong"
            >
              <div className="flex items-start gap-4">
                {/* Ícone decorativo */}
                <div
                  className={`shrink-0 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br ${s.color} text-white`}
                  aria-hidden="true"
                >
                  <s.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>

                <div className="flex-1 min-w-0">
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

        {/* Nota discreta */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Indicadores aproximados e sujeitos a variações locais e sazonais.
        </p>
      </div>
    </section>
  );
};
