"use client";

import { useState } from "react";

const PAIRS = [
  "EUR/USD",
  "GBP/USD",
  "USD/JPY",
  "USD/CHF",
  "AUD/USD",
  "NZD/USD",
  "USD/CAD",
];

// Hardcoded correlation matrix (approximate realistic values)
const CORRELATIONS: Record<string, Record<string, number>> = {
  "EUR/USD": {
    "EUR/USD": 1,
    "GBP/USD": 0.89,
    "USD/JPY": -0.15,
    "USD/CHF": -0.91,
    "AUD/USD": 0.65,
    "NZD/USD": 0.6,
    "USD/CAD": -0.55,
  },
  "GBP/USD": {
    "EUR/USD": 0.89,
    "GBP/USD": 1,
    "USD/JPY": -0.1,
    "USD/CHF": -0.85,
    "AUD/USD": 0.55,
    "NZD/USD": 0.5,
    "USD/CAD": -0.45,
  },
  "USD/JPY": {
    "EUR/USD": -0.15,
    "GBP/USD": -0.1,
    "USD/JPY": 1,
    "USD/CHF": 0.25,
    "AUD/USD": -0.35,
    "NZD/USD": -0.3,
    "USD/CAD": 0.4,
  },
  "USD/CHF": {
    "EUR/USD": -0.91,
    "GBP/USD": -0.85,
    "USD/JPY": 0.25,
    "USD/CHF": 1,
    "AUD/USD": -0.6,
    "NZD/USD": -0.55,
    "USD/CAD": 0.5,
  },
  "AUD/USD": {
    "EUR/USD": 0.65,
    "GBP/USD": 0.55,
    "USD/JPY": -0.35,
    "USD/CHF": -0.6,
    "AUD/USD": 1,
    "NZD/USD": 0.94,
    "USD/CAD": -0.75,
  },
  "NZD/USD": {
    "EUR/USD": 0.6,
    "GBP/USD": 0.5,
    "USD/JPY": -0.3,
    "USD/CHF": -0.55,
    "AUD/USD": 0.94,
    "NZD/USD": 1,
    "USD/CAD": -0.7,
  },
  "USD/CAD": {
    "EUR/USD": -0.55,
    "GBP/USD": -0.45,
    "USD/JPY": 0.4,
    "USD/CHF": 0.5,
    "AUD/USD": -0.75,
    "NZD/USD": -0.7,
    "USD/CAD": 1,
  },
};

export default function CorrelationAlert() {
  const [par1, setPar1] = useState<string>("EUR/USD");
  const [par2, setPar2] = useState<string>("USD/CHF");

  const correlation = CORRELATIONS[par1]?.[par2] ?? 0;

  const getCorrelationInfo = (val: number) => {
    if (val >= 0.7)
      return {
        label: "Forte correlação positiva",
        color: "text-primary",
        bg: "bg-primary/20",
        msg: "⚠️ Operar estes dois pares na mesma direção duplica seu risco real.",
      };
    if (val >= 0.3)
      return {
        label: "Correlação positiva moderada",
        color: "text-primary",
        bg: "bg-primary/10",
        msg: "Atenção: Risco parcialmente sobreposto.",
      };
    if (val > -0.3)
      return {
        label: "Sem correlação significativa",
        color: "text-muted",
        bg: "bg-surface",
        msg: "✅ Estes pares têm baixa correlação — boa diversificação.",
      };
    if (val > -0.7)
      return {
        label: "Correlação negativa moderada",
        color: "text-danger",
        bg: "bg-danger/10",
        msg: "Atenção: Operações na mesma direção podem se cancelar parcialmente.",
      };
    return {
      label: "Forte correlação negativa",
      color: "text-danger",
      bg: "bg-danger/20",
      msg: "⚠️ Operar estes dois pares na mesma direção cancela suas operações.",
    };
  };

  const info = getCorrelationInfo(correlation);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Par 1
          </label>
          <select value={par1} onChange={(e) => setPar1(e.target.value)}>
            {PAIRS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Par 2
          </label>
          <select value={par2} onChange={(e) => setPar2(e.target.value)}>
            {PAIRS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5 text-center">
        <div className="text-xs text-muted uppercase tracking-wider mb-2">
          Coeficiente de Correlação
        </div>
        <div className={`font-mono text-5xl font-bold mb-2 ${info.color}`}>
          {correlation > 0 ? "+" : ""}
          {correlation.toFixed(2)}
        </div>
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${info.bg} ${info.color}`}
        >
          {info.label}
        </div>

        <div className="text-sm text-foreground bg-background p-3 rounded-lg border border-white/5 text-left">
          {info.msg}
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="text-xs text-muted uppercase tracking-wider mb-2 text-center">
          Matriz Simplificada
        </div>
        <div className="flex justify-center gap-2 text-[10px] text-muted">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div> Forte
            Positiva
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-surface border border-white/10 rounded-full"></div>{" "}
            Neutra
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-danger rounded-full"></div> Forte
            Negativa
          </div>
        </div>
      </div>
    </div>
  );
}
