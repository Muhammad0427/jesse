"use client";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

interface PhiFieldProps {
  label: string;
  value: string;
  className?: string;
}

export function PhiField({ label, value, className = "" }: PhiFieldProps) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className={`space-y-1 ${className}`}>
      <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
        {label}
        <span className="text-amber-600 text-xs font-normal ml-1">PHI</span>
      </dt>
      <dd className="flex items-center gap-2">
        <span
          className={`font-mono text-sm text-slate-800 ${revealed ? "" : "phi-masked select-none"}`}
          onClick={() => setRevealed(true)}
        >
          {value}
        </span>
        <button
          onClick={() => setRevealed(!revealed)}
          className="text-slate-400 hover:text-slate-600 transition-colors"
          title={revealed ? "Mask PHI" : "Reveal PHI"}
        >
          {revealed ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>
      </dd>
    </div>
  );
}
