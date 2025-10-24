import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { ga, observeImpressionById } from "@/lib/analytics";

// links finais
const FINAL_LINKS = [
  {
    title: "Guia de Benefícios Sociais 2025",
    desc: "Panorama dos principais direitos e programas em 2025.",
    url: "https://marciobevervanso.com.br/beneficios-sociais-governo-federal-guia-direitos-2025/",
  },
  {
    title: "CNH Social 2025 — regras e comparação",
    desc: "Quem tem direito, diferenças por estado e como participar.",
    url: "https://marciobevervanso.com.br/cnh-gratuita-social-comparativo-regras-2025/",
  },
  {
    title: "Bolsa Família 2025 — benefícios e regras",
    desc: "Valores, critérios e composição do benefício em 2025.",
    url: "https://marciobevervanso.com.br/bolsa-familia-comparativo-beneficios-regras/",
  },
];

export const QuizSection = () => {
  const [started, setStarted] = useState(false);           // 👈 gate do quiz
  const [firstAnswered, setFirstAnswered] = useState(false);
  const [step, setStep] = useState(1);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFab, setShowFab] = useState(false);

  const total = 9;
  const questions = [
    { key: "age",            text: "Qual sua faixa etária?", options: ["Menos de 18 anos", "Entre 18 e 40 anos", "Entre 41 e 60 anos", "Mais de 60 anos"] },
    { key: "income",         text: "Você possui renda familiar de até 3 salários mínimos?", options: ["Sim", "Não"] },
    { key: "enrolledSUS",    text: "Você já possui Cartão do SUS (CNS)?", options: ["Sim", "Ainda não"] },
    { key: "registeredUBS",  text: "Está cadastrado em alguma UBS (Unidade Básica de Saúde)?", options: ["Sim", "Não", "Não sei"] },
    { key: "needsTreatment", text: "Você precisa de algum tratamento específico (ex: canal, prótese)?", options: ["Sim", "Não", "Não sei"] },
    { key: "urgent",         text: "Está com dor ou problema odontológico urgente?", options: ["Sim", "Não"] },
    { key: "documents",      text: "Você possui documento com foto e comprovante de endereço?", options: ["Sim, tenho todos", "Não, preciso providenciar"] },
    { key: "visitedBefore",  text: "Já foi atendido pelo programa Brasil Sorridente antes?", options: ["Sim", "Não", "Não sei"] },
    { key: "awareProgram",   text: "Você já conhecia o programa Brasil Sorridente?", options: ["Sim", "Não"] },
  ];

  // -------- Analytics base + ads impressions --------
  useEffect(() => {
    ga.event("quiz_gate_view", { page: "dentista" }); // tela de abertura do quiz
    observeImpressionById("ad-horizontal-topo", "ad_view");
    observeImpressionById("ad-quadrado-sidebar", "ad_view");
    observeImpressionById("ad-multiplex-final", "ad_view");
  }, []);

  // FAB “voltar ao topo” aparece após algum scroll (apenas no resultado)
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
    ga.event("quiz_start", { theme: "dentista", via: "start_button" });
  };

  const selectOption = (option: string) => {
    const key = questions[step - 1].key;
    setAnswers((prev) => ({ ...prev, [key]: option }));

    // Marca primeira resposta real (interesse forte)
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
            Descubra se Você Tem Direito ao Dentista Gratuito
          </h2>

          <Card className={`p-6 md:p-8 shadow-soft ${finished ? "pb-24" : ""}`}>
            {/* === Gate/Tela de abertura === */}
            {!started && !finished && (
              <div className="space-y-6 text-center">
                <p className="text-muted-foreground">
                  Responda um questionário rápido para verificarmos sua <strong>elegibilidade</strong> no programa Brasil Sorridente.
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
                  Conteúdo informativo. Procure sua <strong>UBS/ESF</strong> para orientação oficial.
                </p>
              </div>
            )}

            {/* === Fluxo principal do quiz === */}
            {started && !finished && (
              <>
                {/* Progresso */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                    <span>Passo {step} de {total}</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Pergunta atual */}
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xl font-semibold mb-4">{questions[step - 1].text}</h3>
                  <div className="space-y-3">
                    {questions[step - 1].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => selectOption(option)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
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
                <div className="flex justify-between mt-8">
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
                    href="https://marciobevervanso.com.br/brasil-sorridente-vs-planos-odontologicos-comparativo-2025/"
                    target="_blank"
                    rel="nofollow noopener"
                    className="btn-hero w-full sm:w-auto px-6 py-4 text-base sm:text-lg text-center shadow-strong hover:shadow-strong active:opacity-95"
                    aria-label="Veja como se Inscrever"
                    onClick={() => ga.event("cta_click", { id: "inscrever_btn", placement: "quiz_result" })}
                  >
                    Veja como se Inscrever!
                  </a>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-3">Orientações e próximos passos</h3>
                <p className="text-muted-foreground mb-6">
                  Procure sua <strong>UBS/ESF</strong> para triagem e, se necessário, encaminhamento a um
                  <strong> Centro de Especialidades Odontológicas (CEO)</strong>. Veja também:
                </p>

                <ul className="grid gap-3">
                  {FINAL_LINKS.map((l) => (
                    <li key={l.url}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="nofollow noopener"
                        className="block p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all break-words"
                        onClick={() => ga.event("outbound_click", { url: l.url, from: "quiz_result" })}
                      >
                        <div className="font-semibold underline-offset-2 hover:underline">{l.title}</div>
                        {l.desc && <p className="text-sm text-muted-foreground mt-1">{l.desc}</p>}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setFinished(false);
                      setStarted(false); // volta para a tela de abertura
                      setStep(1);
                      setAnswers({});
                      setFirstAnswered(false);
                      ga.event("quiz_restart");
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
          className="fixed right-4 sm:right-6 bottom-24 sm:bottom-28 z-[60] rounded-full shadow-strong bg-gradient-primary text-white p-3"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </section>
  );
};
