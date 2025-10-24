// Pequeno wrapper pro GA4
export const ga = {
  event(name: string, params: Record<string, any> = {}) {
    try { (window as any).gtag?.('event', name, params); } catch {}
  },
  pageview(path: string) {
    try { (window as any).gtag?.('event', 'page_view', { page_path: path }); } catch {}
  },
};

// Heartbeat simples (tempo ativo na página)
let hbTimer: number | null = null;
export function startHeartbeat(intervalMs = 15000, extra: Record<string, any> = {}) {
  stopHeartbeat();
  hbTimer = window.setInterval(() => ga.event('heartbeat', { ...extra }), intervalMs);
}
export function stopHeartbeat() {
  if (hbTimer) { clearInterval(hbTimer); hbTimer = null; }
}

// Scroll depth (25/50/75/100)
let maxDepthSent = 0;
export function trackScrollDepth() {
  const handler = () => {
    const h = document.documentElement;
    const scrollTop = window.scrollY;
    const docH = h.scrollHeight - h.clientHeight;
    const pct = Math.min(100, Math.round((scrollTop / (docH || 1)) * 100));
    const thresholds = [25, 50, 75, 100];
    for (const t of thresholds) {
      if (pct >= t && maxDepthSent < t) {
        maxDepthSent = t;
        ga.event('scroll_depth', { percent: t });
      }
    }
  };
  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}

// Intercepta cliques externos
export function trackOutboundLinks() {
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const isExternal = /^https?:\/\//i.test(href) && !href.includes(location.hostname);
    if (isExternal) ga.event('outbound_click', { url: href, text: a.textContent?.trim()?.slice(0, 80) });
  };
  window.addEventListener('click', onClick);
  return () => window.removeEventListener('click', onClick);
}

// Viewability de blocos de anúncio (ou qualquer seção)
export function observeImpressionById(id: string, eventName: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting && en.intersectionRatio >= 0.5) {
        ga.event(eventName, { id, ratio: Math.round(en.intersectionRatio * 100) });
        io.disconnect();
      }
    });
  }, { threshold: [0.5] });
  io.observe(el);
}
