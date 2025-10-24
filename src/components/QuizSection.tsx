import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { ga, observeImpressionById } from "@/lib/analytics";

// links finais (prioriza Bolsa Família e materiais do seu blog)
const FINAL_LINKS = [
  {
    title: "Bolsa Família 2025 — benefícios e regras",
    desc: "Quem tem direito, valores por perfil, condicionalidades e como receber.",
    url: "https://marciobevervanso.com.br/bolsa-familia-comparativo-beneficios-regras/",
  },
  {
    title: "Guia de Benefícios Sociais 2025",
    desc: "Panorama dos principais direitos, inscrições e documentos.",
    url: "https://marciobevervanso.com.br/beneficios-sociais-governo-federal-guia-direitos-2025/",
  },
  {
    title: "Minha Casa Minha Vida 2025 — faixas e benefícios",
    desc: "Entenda as faixas de renda, regras e como participar.",
    url: "https://marciobevervanso.com.br/minha-casa-minha-vida-2025-comparativo-faixas-beneficios/",
  },
  {
    title: "CNH Social 2025 — regras e comparação",
    desc: "Quem tem direito, diferenças por estado e como participar.",
    url: "https://marciobevervanso.com.br/cnh-gratuita-social-comparativo-regras-2025/",
  },
];

export const QuizSection = () => {
  const [started, setStarted] = useState(false);
  const [firstAnswered, setFirstAnswered] = useState(false);
  const [step, setStep] = useState(1);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFab, setShowFab] = useState(false);

  const total = 9;

  // Perguntas focadas em Bolsa Família
  const questions = [
    {
      key: "renda",
      text: "Qual é a renda familiar per capita?",
      options: ["Até R$ 218", "Entre R$ 219 e R$ 660", "Acima de R$ 660"],
    },
    {
      key: "cadunico",
      text: "Sua família está inscrita no CadÚnico?",
      options: ["Sim, atualizado (menos de 24 meses)", "Sim, mas desatualizado", "Não sei/Não"],
    },
    {
      key: "composicao",
      text: "Na família há gestantes, nutrizes ou crianças/adolescentes (0–17 anos)?",
      options: ["Sim", "Não", "Não sei"],
    },
    {
      key: "escola",
      text: "As crianças/adolescentes (4–17) cumprem a frequência escolar exigida?",
      options: ["Sim", "Não", "Não se aplica"],
    },
    {
      key: "saude",
      text: "Caderneta de vacinação e pré-natal (quando houver) estão em dia?",
      options: ["Sim", "Não", "Não se aplica"],
    },
    {
      key: "nis",
      text: "Você conhece/possui o número do NIS (PIS/PASEP) dos membros?",
      options: ["Sim", "Não"],
    },
    {
      key: "documentos",
      text: "Possui documentos de todos os membros do grupo familiar?",
      options: ["Sim, todos", "Não, preciso providenciar"],
    },
    {
      key: "ja_recebeu",
      text: "Algum membro já recebeu Bolsa Família/Auxílio Brasil?",
      options: ["Sim", "Não", "Não sei"],
    },
    {
      key: "conta",
      text: "Possui Caixa Tem ou prefere receber por cartão/banco?",
      options: ["Tenho Caixa Tem", "Prefiro cartão", "Outra conta/Não sei"],
    },
  ];

  // -------- Analytics base + (se usar ads nesta página) --------
  useEffect(() => {
    ga.event("quiz_gate_view", { page: "bolsa_familia" });
    // Se houver blocos de anúncio com id, pode medir impressão:
    observeImpressionById?.("ad-horizontal-topo", "ad_view");
    observeImpressionById?.("ad-quadrado-sidebar", "ad_view");
    observeImpressionById?.("ad-multiplex-final", "ad_view");
  }, []);

  // FAB “voltar ao topo” aparece após scroll (apenas no resultado)
  useEffect(() => {
    const handleScroll = () => setShowFab(window.scrollY > 600 && finished);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [finished]);

  const startQuiz = () => {
    setStarted(true);
    setFinished(false);
    setStep(1);
    setAnswers({});
    setFirstAnswered(false);
    ga.event("quiz_start", { theme: "bolsa_familia", via: "start_button" });
  };

  const selectOption = (option: string) => {
    const key = questions[step - 1].key;
    setAnswers((prev) => ({ ...prev, [key]: option }));
    if (!firstAnswered && step === 1) {
      ga.event("quiz_first_answer", { option });
      setFirstAnswered(true);
    }
  };

  const handleNext = () => {
    const current = questions[step - 1];
    if (!answers[current.key]) {
      toast.error("Por favor, selecione uma opção");
      return;
    }
    ga.event("quiz_step", { step });

    if (step < total) {
      setStep(step + 1);
    } else {
      setFinished(true); // sem scroll automático
      ga.event("quiz_finish", { total_steps: total });
      toast.success("Obrigado! Veja as orientações abaixo.");
    }
  };

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const progressPct = Math.round((step / total) * 100);

  return (
    <section id="quiz" className="py-16 sm:py-20 bg-muted/30 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
            Descubra se Você Tem Direito ao Bolsa Família
          </h2>

          <Card className={`p-6 md:p-8 shadow-soft ${finished ? "pb-24" : ""}`}>
            {/* === Gate/Tela de abertura === */}
            {!started && !finished && (
              <div className="space-y-6 text-center">
                <p className="text-muted-foreground">
                  Responda um questionário rápido para verificarmos sua <strong>elegibilidade</strong> ao{" "}
                  <strong>Bolsa Família 2025</strong>.
                </p>
                <ul className="text-left grid gap-3 sm:grid-cols-2">
                  <li className="p-3 rounded-md bg-muted">✔️ Leva menos de 1 minuto</li>
                  <li className="p-3 rounded-md bg-muted">✔️ Sem dados pessoais sensíveis</li>
                  <li className="p-3 rounded-md bg-muted">✔️ Resultado com orientações</li>
                  <li className="p-3 rounded-md bg-muted">✔️ Links úteis ao final</li>
                </ul>
                <div className="flex justify-center">
                  <Button size="lg" variant="hero" onClick={startQuiz} aria-label="Iniciar avaliação de elegibilidade">
                    Iniciar avaliação de elegibilidade
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Conteúdo informativo. Procure o <strong>CRAS</strong> e mantenha o <strong>CadÚnico</strong> atualizado.
                </p>
              </div>
            )}

            {/* === Fluxo principal do quiz === */}
            {started && !finished && (
              <>
                {/* Progresso */}
                <div className="mb-8">
                  <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                    <span>Passo {step} de {total}</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full transition-all duration-500 bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Pergunta atual */}
                <div className="animate-in fade-in duration-300 space-y-4">
                  <h3 className="mb-4 text-xl font-semibold">{questions[step - 1].text}</h3>
                  <div className="space-y-3">
                    {questions[step - 1].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => selectOption(option)}
                        className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                          answers[questions[step - 1].key] === option
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navegação */}
                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>
                  <Button variant="hero" onClick={handleNext}>
                    {step === total ? "Finalizar" : "Próximo"}
                    {step < total && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </>
            )}

            {/* === Tela final === */}
            {finished && (
              <>
                <div className="mb-6 flex justify-center">
                  <a
                    href="https://marciobevervanso.com.br/bolsa-familia-comparativo-beneficios-regras/"
                    target="_blank"
                    rel="nofollow noopener"
                    className="btn-hero w-full sm:w-auto px-6 py-4 text-center text-base sm:text-lg shadow-strong hover:shadow-strong active:opacity-95"
                    aria-label="Ver valores, regras e como receber"
                    onClick={() =>
                      ga.event("cta_click", { id: "bf_regras_cta", placement: "quiz_result" })
                    }
                  >
                    Ver valores, regras e como receber
                  </a>
                </div>

                <h3 className="mb-3 text-lg font-semibold sm:text-xl">Orientações e próximos passos</h3>
                <p className="mb-6 text-muted-foreground">
                  Mantenha o <strong>CadÚnico</strong> atualizado no <strong>CRAS</strong> e acompanhe o calendário de
                  pagamentos pelo <strong>Caixa Tem</strong> ou cartão. Veja também:
                </p>

                {/* Links úteis (cards clicáveis inteiros) */}
                <ul className="grid gap-3">
                  {FINAL_LINKS.map((l) => (
                    <li key={l.url}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="nofollow noopener"
                        className="block break-words rounded-lg border-2 border-border p-4 transition-all hover:border-primary/50"
                        onClick={() => ga.event("outbound_click", { url: l.url, from: "quiz_result_bf" })}
                      >
                        <div className="font-semibold underline-offset-2 hover:underline">{l.title}</div>
                        {l.desc && <p className="mt-1 text-sm text-muted-foreground">{l.desc}</p>}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Ações finais */}
                <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setFinished(false);
                      setStarted(false); // volta para a tela de abertura
                      setStep(1);
                      setAnswers({});
                      setFirstAnswered(false);
                      ga.event("quiz_restart", { theme: "bolsa_familia" });
                    }}
                  >
                    Refazer quiz
                  </Button>
                  <Button variant="hero" size="lg" onClick={goTop}>
                    Voltar ao topo
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* FAB flutuante “Topo” */}
      {showFab && (
        <button
          onClick={goTop}
          className="fixed right-4 bottom-24 sm:bottom-28 z-[60] rounded-full bg-gradient-primary p-3 text-white shadow-strong sm:right-6"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </section>
  );
};
