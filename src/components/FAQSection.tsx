import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Quem tem direito ao Brasil Sorridente e ao dentista grátis pelo SUS?",
      answer:
        "Todos os usuários do SUS podem usar a Atenção em Saúde Bucal na UBS, conforme triagem clínica e prioridades locais. Não há restrições de renda ou idade.",
    },
    {
      question: "Como fazer o agendamento de dentista na UBS?",
      answer:
        "Basta comparecer à UBS mais próxima da sua residência com seus documentos (RG, CNS e comprovante de endereço) e solicitar o atendimento odontológico. A equipe fará a triagem e agendará sua consulta.",
    },
    {
      question: "Preciso do Cartão do SUS (CNS) para ser atendido?",
      answer:
        "O Cartão do SUS (CNS) facilita o atendimento, mas não é obrigatório para o primeiro atendimento. Você pode fazer o cartão na própria UBS caso ainda não tenha.",
    },
    {
      question: "O SUS cobre prótese dentária e implante?",
      answer:
        "Sim, o SUS oferece próteses dentárias em alguns municípios através dos Centros de Especialidades Odontológicas (CEO). A disponibilidade de implantes é mais limitada e depende da rede municipal. Consulte sua UBS para saber os serviços disponíveis na sua região.",
    },
    {
      question: "Quanto tempo leva para conseguir um atendimento?",
      answer:
        "O tempo varia conforme a demanda local e o tipo de procedimento necessário. Urgências são atendidas mais rapidamente, geralmente no mesmo dia nas UPAs. Para procedimentos eletivos, pode haver fila de espera dependendo da região.",
    },
    {
      question: "Quais tratamentos estão disponíveis?",
      answer:
        "O programa oferece: consultas, prevenção, limpeza, restaurações (obturações), tratamento de canal, extrações, cirurgias básicas, e em alguns casos próteses e tratamentos especializados nos CEOs.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30" aria-labelledby="faq-title">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 id="faq-title" className="mb-4 text-3xl font-bold md:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas sobre o Brasil Sorridente 2025
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border bg-card shadow-soft transition-colors focus-within:ring-2 focus-within:ring-primary/30"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-base font-semibold leading-relaxed hover:no-underline focus:outline-none">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            As orientações podem variar por município conforme a capacidade da rede local.
          </p>
        </div>
      </div>
    </section>
  );
};
