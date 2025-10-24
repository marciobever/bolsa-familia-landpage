import { useEffect, useRef } from "react";

type Props = {
  slot: string;                           // data-ad-slot
  format?: "auto" | "fluid" | "autorelaxed";
  fullWidth?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const PUB = "ca-pub-6058225169212979";

export default function AdUnit({
  slot,
  format = "auto",
  fullWidth = true,
  style,
  className,
}: Props) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("adsense:", e);
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <ins
      ref={ref as any}
      className={`adsbygoogle ${className || ""}`}
      style={{ display: "block", margin: "16px auto", ...(style || {}) }}
      data-ad-client={PUB}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={fullWidth ? "true" : "false"}
    />
  );
}
