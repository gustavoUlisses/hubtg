"use client";

import { useState } from "react";

export default function LossStreakSimulator() {
  const [banca, setBanca] = useState<number>(1000);
  const [risco, setRisco] = useState<number>(2);
  const [perdas, setPerdas] = useState<number>(10);

  const bancaRestante = banca * Math.pow(1 - risco / 100, perdas);
  const pctRestante = (bancaRestante / banca) * 100;

  const perdasPara50 = Math.ceil(Math.log(0.5) / Math.log(1 - risco / 100));
  const perdasPara90 = Math.ceil(Math.log(0.1) / Math.log(1 - risco / 100));

  const getColor = () => {
    if (pctRestante < 50) return "text-danger";
    if (pctRestante < 80) return "text-yellow-400";
    return "text-primary";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] text-muted mb-1 uppercase tracking-wider truncate">
            Banca Atual
          </label>
          <input
            type="number"
            value={banca}
            onChange={(e) => setBanca(Number(e.target.value))}
            min="100"
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
        <div className="flex justify-between text-xs text-muted mb-1 uppercase tracking-wider">
          <label>Perdas Consecutivas</label>
          <span>{perdas}</span>
        </div>
        <input
          type="range"
          value={perdas}
          onChange={(e) => setPerdas(Number(e.target.value))}
          min="1"
          max="30"
        />
      </div>

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5">
        <div className="mb-4 text-center">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">
            Banca Restante
          </div>
          <div className={`font-mono text-3xl font-bold ${getColor()}`}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(bancaRestante)}
          </div>
          <div className="text-sm text-muted mt-1">
            ({pctRestante.toFixed(1)}% da banca original)
          </div>
        </div>

        <div className="space-y-2 text-sm border-t border-white/5 pt-4">
          <div className="flex justify-between">
            <span className="text-muted">Para perder 50% da banca:</span>
            <span className="font-mono text-foreground">
              {perdasPara50} perdas
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Para perder 90% da banca:</span>
            <span className="font-mono text-foreground">
              {perdasPara90} perdas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
