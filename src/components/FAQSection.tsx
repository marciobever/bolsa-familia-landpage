import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Quem tem direito ao Bolsa Família em 2025?",
      answer:
        "Famílias com renda por pessoa de até R$ 218, inscritas no CadÚnico e com dados atualizados. É preciso cumprir condicionalidades de saúde e educação.",
    },
    {
      question: "Quais são as condicionalidades?",
      answer:
        "Matrícula e frequência escolar de crianças e adolescentes, vacinação em dia e acompanhamento de saúde (pré-natal quando houver gestantes).",
    },
    {
      question: "Como faço para me inscrever?",
      answer:
        "Procure o CRAS ou setor do CadÚnico da sua cidade para cadastrar/atualizar os dados. O cadastro não garante entrada imediata: a seleção é feita pelo governo com base nos critérios.",
    },
    {
      question: "Qual o valor do benefício?",
      answer:
        "Há um valor básico por família e adicionais por composição (crianças, adolescentes, gestantes e nutrizes). O total varia conforme a renda e o perfil familiar.",
    },
    {
      question: "Quando recebo? Como funciona o calendário?",
      answer:
        "O pagamento segue o final do NIS e ocorre mensalmente. Consulte a data no app Caixa Tem ou canais oficiais da Caixa.",
    },
    {
      question: "Como consultar situação e extrato?",
      answer:
        "Use o app Caixa Tem, o app Bolsa Família, o Portal Cidadão ou vá a uma agência/lotérica da Caixa com documento e NIS.",
    },
    {
      question: "Meu benefício foi bloqueado ou suspenso. O que fazer?",
      answer:
        "Verifique no app/Portal o motivo (ex.: dados desatualizados, condicionalidades, renda) e procure o CRAS/CadÚnico para regularizar.",
    },
    {
      question: "Preciso ter conta para receber?",
      answer:
        "Normalmente o pagamento é via Caixa Tem. Quem não tem conta pode receber com cartão/guia em unidades da Caixa, conforme orientação local.",
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
            Tire suas dúvidas sobre o Bolsa Família 2025
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
            As regras podem ter ajustes locais. Confirme no CRAS/CadÚnico do seu município e nos canais oficiais da Caixa.
          </p>
        </div>
      </div>
    </section>
  );
};
