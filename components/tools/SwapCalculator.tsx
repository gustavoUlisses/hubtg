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
  "EUR/GBP",
  "GBP/JPY",
  "EUR/JPY",
];

export default function SwapCalculator() {
  const [pair, setPair] = useState<string>("EUR/USD");
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const [lotes, setLotes] = useState<number>(0.1);
  const [swapPorLote, setSwapPorLote] = useState<number>(-2.5);
  const [noites, setNoites] = useState<number>(1);

  const swapTotal = lotes * swapPorLote * noites;
  const colorClass = swapTotal >= 0 ? "text-primary" : "text-danger";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] text-muted mb-1 uppercase tracking-wider truncate">
            Par de Moedas
          </label>
          <select value={pair} onChange={(e) => setPair(e.target.value)}>
            {PAIRS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Operação
          </label>
          <div className="flex bg-background rounded-md p-1 border border-white/5">
            <button
              className={`flex-1 text-sm py-1 rounded-sm transition-colors ${isBuy ? "bg-primary text-background font-medium" : "text-muted hover:text-foreground"}`}
              onClick={() => setIsBuy(true)}
            >
              Buy
            </button>
            <button
              className={`flex-1 text-sm py-1 rounded-sm transition-colors ${!isBuy ? "bg-danger text-white font-medium" : "text-muted hover:text-foreground"}`}
              onClick={() => setIsBuy(false)}
            >
              Sell
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Lotes
          </label>
          <input
            type="number"
            value={lotes}
            onChange={(e) => setLotes(Number(e.target.value))}
            min="0.01"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Swap/Lote
          </label>
          <input
            type="number"
            value={swapPorLote}
            onChange={(e) => setSwapPorLote(Number(e.target.value))}
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Noites
          </label>
          <input
            type="number"
            value={noites}
            onChange={(e) => setNoites(Number(e.target.value))}
            min="1"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5">
        <div className="text-center mb-4">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">
            Custo/Ganho Total
          </div>
          <div className={`font-mono text-4xl font-bold ${colorClass}`}>
            {swapTotal > 0 ? "+" : ""}
            {swapTotal.toFixed(2)}
          </div>
        </div>

        <div className="flex justify-between text-sm border-t border-white/5 pt-4">
          <span className="text-muted">Custo por noite:</span>
          <span
            className={`font-mono ${swapPorLote * lotes >= 0 ? "text-primary" : "text-danger"}`}
          >
            {(swapPorLote * lotes).toFixed(2)}
          </span>
        </div>
      </div>

      <p className="text-[10px] text-muted text-center mt-2">
        Os valores de swap variam por corretora. Consulte sua plataforma para os
        valores exatos.
      </p>
    </div>
  );
}
