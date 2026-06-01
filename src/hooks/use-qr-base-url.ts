import { useEffect, useState } from "react";
import { useSettings } from "@/store/settingsStore";

/** Base URL encoded in table QR codes (settings override, else current origin). */
export function useQrBaseUrl(): string {
  const siteUrl = useSettings((s) => s.siteUrl);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const base = (siteUrl.trim() || origin).replace(/\/$/, "");
  return base;
}
