import { useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { getMenuScanUrl } from "@/lib/scan-url";
import type { RestaurantTable } from "@/store/tablesStore";

type Props = {
  table: RestaurantTable;
  baseUrl: string;
  compact?: boolean;
};

export function TableQrCard({ table, baseUrl, compact }: Props) {
  const url = useMemo(() => getMenuScanUrl(table.number, baseUrl), [table.number, baseUrl]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`bg-white rounded-2xl border-t-4 border-yellow flex flex-col items-center text-center ${
        compact ? "p-4" : "p-6"
      }`}
      data-table-qr={table.number}
    >
      <div className="font-display text-2xl font-bold">Table {table.number}</div>
      {table.label && table.label !== `Table ${table.number}` && (
        <div className="text-xs text-gray-text mt-0.5">{table.label}</div>
      )}
      <div className={`bg-off-white rounded-xl p-3 mt-4 ${compact ? "" : "p-4"}`}>
        <QRCodeSVG value={url} size={compact ? 140 : 180} level="M" includeMargin />
      </div>
      <p className="mt-3 text-[10px] text-gray-text break-all max-w-full leading-snug">{url}</p>
      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 rounded-full bg-black text-white text-xs font-display font-bold px-3 py-1.5"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copié" : "Copier"}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-black/20 text-xs font-display font-bold px-3 py-1.5"
        >
          <ExternalLink className="w-3 h-3" /> Tester
        </a>
      </div>
    </div>
  );
}
