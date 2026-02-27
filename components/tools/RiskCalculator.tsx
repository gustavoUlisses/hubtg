"use client";

import { useState, useEffect } from "react";

export default function RiskCalculator() {
  const [banca, setBanca] = useState<number>(1000);
  const [risco, setRisco] = useState<number>(1);
  const [stopLoss, setStopLoss] = useState<number>(20);

  const valorEmRisco = banca * (risco / 100);
  const valorPorPip = stopLoss > 0 ? valorEmRisco / stopLoss : 0;
  const showWarning = risco > 2;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Banca Total (R$)
          </label>
          <input
            type="number"
            value={banca}
            onChange={(e) => setBanca(Number(e.target.value))}
            min="0"
            step="100"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Risco (%)
          </label>
          <input
            type="number"
            value={risco}
            onChange={(e) => setRisco(Number(e.target.value))}
            min="0.1"
            max="10"
            step="0.1"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
          Stop Loss (pips)
        </label>
        <input
          type="number"
          value={stopLoss}
          onChange={(e) => setStopLoss(Number(e.target.value))}
          min="1"
        />
      </div>

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm text-muted">Valor em Risco:</span>
          <span className="font-mono text-2xl text-primary">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(valorEmRisco)}
          </span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-sm text-muted">Valor por Pip:</span>
          <span className="font-mono text-xl text-foreground">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(valorPorPip)}
          </span>
        </div>
      </div>

      {showWarning && (
        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm flex items-center gap-2">
          <span>⚠️</span> Risco acima de 2% — alto risco de ruína
        </div>
      )}
    </div>
  );
}
