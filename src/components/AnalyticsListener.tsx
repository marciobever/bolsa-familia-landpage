import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ga, startHeartbeat, stopHeartbeat, trackScrollDepth, trackOutboundLinks } from "@/lib/analytics";

export default function AnalyticsListener() {
  const loc = useLocation();

  useEffect(() => {
    ga.pageview(loc.pathname + loc.search);
    // reinicia heartbeat a cada navegação
    stopHeartbeat();
    startHeartbeat(15000, { path: loc.pathname });
    // scroll depth e outbound (uma única vez)
    const offScroll = trackScrollDepth();
    const offOutbound = trackOutboundLinks();
    return () => { offScroll?.(); offOutbound?.(); stopHeartbeat(); };
  }, [loc]);

  return null;
}
