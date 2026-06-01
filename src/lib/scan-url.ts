/** URL opened when guests scan a table QR code (splash → menu table). */
export function getMenuScanUrl(tableNumber: string, origin = ""): string {
  const base = origin.replace(/\/$/, "");
  return `${base}/scan/${encodeURIComponent(tableNumber)}`;
}
