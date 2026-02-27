"use client";

import { useState } from "react";

export default function GoalCalculator() {
  const [banca, setBanca] = useState<number>(1000);
  const [metaMensal, setMetaMensal] = useState<number>(5);
  const [diasUteis, setDiasUteis] = useState<number>(22);

  const metaMensalRs = banca * (metaMensal / 100);
  const metaDiariaRs = diasUteis > 0 ? metaMensalRs / diasUteis : 0;
  const metaSemanalRs = metaDiariaRs * 5;

  const metaDiariaPct = diasUteis > 0 ? metaMensal / diasUteis : 0;
  const metaSemanalPct = metaDiariaPct * 5;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
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
            Meta Mensal (%)
          </label>
          <input
            type="number"
            value={metaMensal}
            onChange={(e) => setMetaMensal(Number(e.target.value))}
            min="0.1"
            step="0.5"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Dias Úteis
          </label>
          <input
            type="number"
            value={diasUteis}
            onChange={(e) => setDiasUteis(Number(e.target.value))}
            min="1"
            max="31"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5">
        <div className="grid grid-cols-3 gap-4 text-center divide-x divide-white/5">
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-2">
              Diária
            </div>
            <div className="font-mono text-lg text-primary mb-1">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(metaDiariaRs)}
            </div>
            <div className="font-mono text-xs text-muted">
              {metaDiariaPct.toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-2">
              Semanal
            </div>
            <div className="font-mono text-xl text-primary mb-1">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(metaSemanalRs)}
            </div>
            <div className="font-mono text-xs text-muted">
              {metaSemanalPct.toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-2">
              Mensal
            </div>
            <div className="font-mono text-2xl font-bold text-primary mb-1">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(metaMensalRs)}
            </div>
            <div className="font-mono text-xs text-muted">
              {metaMensal.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
