"use client";

import { useState } from "react";

export default function BreakevenCalculator() {
  const [entrada, setEntrada] = useState<number>(1.1);
  const [spread, setSpread] = useState<number>(1.5);
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const [valorPip, setValorPip] = useState<number>(10); // $10 per standard lot
  const [lotes, setLotes] = useState<number>(1);

  // For typical pairs, pip size is 0.0001. For JPY pairs, it's 0.01.
  // We'll assume 0.0001 for simplicity, but user can adjust entry.
  const pipSize = entrada > 10 ? 0.01 : 0.0001;

  const breakeven = isBuy
    ? entrada + spread * pipSize
    : entrada - spread * pipSize;

  const custoSpread = spread * valorPip * lotes;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Preço de Entrada
          </label>
          <input
            type="number"
            value={entrada}
            onChange={(e) => setEntrada(Number(e.target.value))}
            step={pipSize}
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Spread (pips)
          </label>
          <input
            type="number"
            value={spread}
            onChange={(e) => setSpread(Number(e.target.value))}
            step="0.1"
            min="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
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
            Valor do Pip (R$)
          </label>
          <input
            type="number"
            value={valorPip}
            onChange={(e) => setValorPip(Number(e.target.value))}
            min="0.1"
            step="0.1"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5">
        <div className="text-center mb-4">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">
            Preço de Breakeven
          </div>
          <div className="font-mono text-4xl font-bold text-foreground">
            {breakeven.toFixed(entrada > 10 ? 3 : 5)}
          </div>
        </div>

        <div className="flex justify-between text-sm border-t border-white/5 pt-4 mb-2">
          <span className="text-muted">Custo do Spread:</span>
          <span className="font-mono text-danger">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(custoSpread)}
          </span>
        </div>

        <p className="text-[10px] text-muted text-center">
          Você precisa que o preço se mova {spread} pips a seu favor apenas para
          empatar.
        </p>
      </div>
    </div>
  );
}
