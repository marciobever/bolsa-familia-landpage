// src/components/ChatLauncher.tsx
import { useEffect, useMemo, useState } from "react";
import { MessageSquare } from "lucide-react";
import { ga } from "@/lib/analytics";
import { useNavigate, useLocation } from "react-router-dom";

function getFixedBlockerBottomSpace(): number {
  try {
    // ponto 2px acima e 2px à esquerda do canto inferior direito
    const x = Math.max(0, window.innerWidth - 2);
    const y = Math.max(0, window.innerHeight - 2);
    const els = document.elementsFromPoint(x, y) as HTMLElement[];
    for (const el of els) {
      if (!el || !(el instanceof HTMLElement)) continue;

      // ignora nosso próprio botão
      if (el.dataset?.chatLauncher === "1") continue;

      const style = getComputedStyle(el);
      const isFixed =
        style.position === "fixed" ||
        (style.position === "sticky" && parseFloat(style.bottom || "0") <= 0);

      if (!isFixed) continue;

      // heurística: ignora elementos minúsculos
      const rect = el.getBoundingClientRect();
      const h = Math.max(0, window.innerHeight - rect.top);
      if (h >= 20) {
        return Math.min(h, 220); // evita subir demais
      }
    }
  } catch {}
  return 0;
}

export default function ChatLauncher() {
  const nav = useNavigate();
  const loc = useLocation();
  const [bottom, setBottom] = useState(24);
  const [dockTopRight, setDockTopRight] = useState(false);

  // re-avalia em navegação também (SPA)
  const depsKey = useMemo(() => `${loc.pathname}|${loc.search}`, [loc]);

  useEffect(() => {
    const safe =
      Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--safe-bottom")
          .replace("px", "")
      ) || 0;

    const update = () => {
      const extra = getFixedBlockerBottomSpace(); // âncora / banners / etc
      if (window.innerWidth < 1024) {
        const total = 24 + safe + extra;
        setBottom(Math.min(total, 200));
        // se o bloqueio for gigante (ex.: anchor + barra), acopla no topo-direito
        setDockTopRight(extra >= 140);
      } else {
        setDockTopRight(false);
        setBottom(24);
      }
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    // Mutations (anchors muitas vezes injetam/animam nós)
    const mo = new MutationObserver(update);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, [depsKey]);

  return (
    <button
      data-chat-launcher="1"
      aria-label="Abrir chat"
      onClick={() => {
        ga.event("chat_launcher_click", { from: "floating_button" });
        nav("/assistente");
      }}
      className={`
        fixed z-[9900]
        inline-flex items-center gap-2 rounded-full px-4 py-3
        shadow-strong text-white
        bg-gradient-to-r from-primary to-accent
        hover:opacity-95 active:opacity-90
        ${dockTopRight ? "top-4 right-4" : "right-4"}
      `}
      style={dockTopRight ? undefined : { bottom }}
    >
      <MessageSquare className="h-5 w-5" />
      Tirar dúvidas
    </button>
  );
}
