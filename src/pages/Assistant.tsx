import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ga } from "@/lib/analytics";
import AdUnit from "@/components/AdUnit";

type Msg = { id: string; from: "user" | "bot"; text: string };

const N8N_URL = import.meta.env.VITE_N8N_CHAT_WEBHOOK as string;

// --- SLOTS LATERAIS (300x250) ---
const SLOT_LEFT  = "4738838319";
const SLOT_RIGHT = "4401401741";

function uuid() {
  return crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}
function useSessionId(key = "assistente_sid") {
  return useMemo(() => {
    let sid = localStorage.getItem(key);
    if (!sid) {
      sid = uuid();
      localStorage.setItem(key, sid);
    }
    return sid;
  }, [key]);
}

/** Lateral com ALTURA FIXA (600px) e o criativo 300x250 centralizado verticalmente. */
function SideFixedAd({ slot }: { slot: string }) {
  return (
    <aside className="hidden lg:block sticky top-6 self-start">
      <div className="mx-auto w-[300px] h-[600px] flex flex-col">
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2 text-center">
          Patrocinado
        </div>

        {/* área útil com 600px menos o label acima */}
        <div className="flex-1 flex items-start justify-center">
          <div className="w-[300px] h-[250px]">
            <AdUnit slot={slot} style={{ width: 300, height: 250, display: "inline-block" }} />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function Assistant() {
  const sid = useSessionId();
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: "hello",
      from: "bot",
      text:
        "Oi, eu sou a Clara 😊 Posso te ajudar com Brasil Sorridente (dentista gratuito pelo SUS). Me fala sua dúvida.",
    },
  ]);
  const [typing, setTyping] = useState(false);

  // ----- Auto-scroll “inteligente” -----
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastMsgRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const [autoStick, setAutoStick] = useState(true);

  function isNearBottom(el: HTMLDivElement, px = 80) {
    return el.scrollHeight - el.scrollTop - el.clientHeight <= px;
  }
  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
    lastMsgRef.current?.scrollIntoView({ block: "end", behavior });
  }

  useEffect(() => {
    ga.event("chat_view", { page: "assistente" });
  }, []);

  // Centraliza o card ao abrir e inicia grudado no fim
  useEffect(() => {
    const t = setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "center" });
      try { window.scrollBy({ top: -40 }); } catch {}
      scrollToBottom("auto");
    }, 30);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (autoStick) scrollToBottom("smooth");
  }, [msgs, typing]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onResize = () => {
      if (autoStick) scrollToBottom("auto");
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [autoStick]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || typing) return;

    setMsgs((m) => [...m, { id: uuid(), from: "user", text: q }]);
    setInput("");
    setTyping(true);
    ga.event("chat_ask", { len: q.length });

    const ctl = new AbortController();
    const to  = setTimeout(() => ctl.abort(), 120000);

    try {
      const res = await fetch(N8N_URL, {
        method: "POST",
        signal: ctl.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q,
          context: { slug: "brasil-sorridente", display_name: "Clara" },
          session: { id: sid },
        }),
      });

      clearTimeout(to);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const ct = res.headers.get("content-type") || "";
      let replyStr = "";
      if (ct.includes("application/json")) {
        const json = await res.json();
        replyStr = typeof json === "string" ? json : (json?.reply ?? json?.text ?? "");
      } else {
        const t = await res.text();
        try {
          const maybe = JSON.parse(t);
          replyStr = typeof maybe === "string" ? maybe : (maybe?.reply ?? "");
        } catch {
          replyStr = t;
        }
      }
      if (!replyStr) replyStr = "...";

      setMsgs((m) => [...m, { id: uuid(), from: "bot", text: String(replyStr) }]);
      ga.event("chat_answer");
    } catch (err: any) {
      setMsgs((m) => [
        ...m,
        { id: uuid(), from: "bot", text: "Não consegui responder agora. Pode tentar de novo? 🙏" },
      ]);
      ga.event("chat_error", { msg: String(err?.message || err) });
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto w-full max-w-[1360px]">
          {/* 300 (esq) + 24 (gap) + 720 (chat) + 24 (gap) + 300 (dir) = 1368 ~ ok */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,720px)_300px] gap-6 items-start">
            {/* LATERAL ESQUERDA */}
            <SideFixedAd slot={SLOT_LEFT} />

            {/* CHAT CENTRAL */}
            <div ref={cardRef} className="bg-card border rounded-lg shadow-soft overflow-hidden">
              {/* Mensagens: altura fixa p/ acompanhar as laterais de 600px.
                 600 total - ~100 do input/header ≈ 500px de viewport de conversa */}
              <div
                ref={scrollRef}
                className="p-4 h-[500px] overflow-y-auto"
                onScroll={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  setAutoStick(isNearBottom(el));
                }}
              >
                {msgs.map((m, i) => {
                  const isLast = i === msgs.length - 1;
                  return (
                    <div
                      key={m.id}
                      ref={isLast ? lastMsgRef : undefined}
                      className={`mb-3 flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-3 py-2 ${
                          m.from === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}

                {typing && (
                  <div className="mb-3 flex justify-start">
                    <div className="bg-muted rounded-xl px-3 py-2 text-foreground">
                      <span className="inline-flex items-center gap-1">
                        Clara está digitando
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse [animation-delay:150ms]">.</span>
                        <span className="animate-pulse [animation-delay:300ms]">.</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                className="p-4 border-t flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                }}
              >
                <input
                  className="flex-1 border rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Escreva sua dúvida…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit" variant="hero" disabled={typing}>
                  {typing ? "Aguardando..." : "Enviar"}
                </Button>
              </form>
            </div>

            {/* LATERAL DIREITA */}
            <SideFixedAd slot={SLOT_RIGHT} />
          </div>

          <p className="mt-4 text-[12px] text-muted-foreground text-center">
            Conteúdo informativo. Procure sua <strong>UBS/ESF</strong> para orientação oficial.
          </p>
        </div>
      </div>
    </div>
  );
}
