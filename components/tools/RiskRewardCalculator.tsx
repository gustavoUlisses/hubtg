"use client";

import { useState } from "react";

export default function RiskRewardCalculator() {
  const [entrada, setEntrada] = useState<number>(1.1);
  const [stopLoss, setStopLoss] = useState<number>(1.098);
  const [takeProfit, setTakeProfit] = useState<number>(1.106);
  const [banca, setBanca] = useState<number>(1000);
  const [risco, setRisco] = useState<number>(1);

  const riscoPips = Math.abs(entrada - stopLoss);
  const retornoPips = Math.abs(takeProfit - entrada);
  const rr = riscoPips > 0 ? retornoPips / riscoPips : 0;

  const valorArriscado = banca * (risco / 100);
  const lucroEsperado = valorArriscado * rr;

  const getRrColor = () => {
    if (rr >= 1.5) return "text-primary";
    if (rr >= 1) return "text-yellow-400";
    return "text-danger";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Entrada
          </label>
          <input
            type="number"
            value={entrada}
            onChange={(e) => setEntrada(Number(e.target.value))}
            step="0.0001"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Stop Loss
          </label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(Number(e.target.value))}
            step="0.0001"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Take Profit
          </label>
          <input
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(Number(e.target.value))}
            step="0.0001"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Banca (R$)
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

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5">
        <div className="text-center mb-4">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">
            Relação Risco/Retorno
          </div>
          <div className={`font-mono text-4xl font-bold ${getRrColor()}`}>
            1 : {rr.toFixed(2)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm border-t border-white/5 pt-4">
          <div>
            <div className="text-muted">Valor Arriscado:</div>
            <div className="font-mono text-danger">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(valorArriscado)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-muted">Lucro Esperado:</div>
            <div className="font-mono text-primary">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(lucroEsperado)}
            </div>
          </div>
        </div>
      </div>

      {rr < 1 && (
        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm flex items-center gap-2">
          <span>⚠️</span> RR abaixo de 1:1 — operação desfavorável
        </div>
      )}
    </div>
  );
}
