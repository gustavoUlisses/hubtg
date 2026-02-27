"use client";

import { useState } from "react";

export default function PartialExitCalculator() {
  const [entrada, setEntrada] = useState<number>(1.1);
  const [stopLoss, setStopLoss] = useState<number>(1.098);
  const [alvo1, setAlvo1] = useState<number>(1.102);
  const [fecharAlvo1, setFecharAlvo1] = useState<number>(50);
  const [alvo2, setAlvo2] = useState<number>(1.106);

  const [banca, setBanca] = useState<number>(1000);
  const [risco, setRisco] = useState<number>(1);

  const fecharAlvo2 = 100 - fecharAlvo1;

  const riscoPips = Math.abs(entrada - stopLoss);
  const alvo1Pips = Math.abs(alvo1 - entrada);
  const alvo2Pips = Math.abs(alvo2 - entrada);

  const valorArriscado = banca * (risco / 100);

  const lucroAlvo1 =
    (fecharAlvo1 / 100) *
    valorArriscado *
    (riscoPips > 0 ? alvo1Pips / riscoPips : 0);
  const lucroAlvo2 =
    (fecharAlvo2 / 100) *
    valorArriscado *
    (riscoPips > 0 ? alvo2Pips / riscoPips : 0);
  const lucroTotal = lucroAlvo1 + lucroAlvo2;

  const rrReal = valorArriscado > 0 ? lucroTotal / valorArriscado : 0;

  // Breakeven after Target 1: The stop loss can be moved to entry to secure the Target 1 profit,
  // or moved to a level that guarantees breakeven if the remaining position hits the new stop.
  // We'll just show the entry price as the typical "move stop to breakeven" level.
  const breakevenPosAlvo1 = entrada;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] text-muted mb-1 uppercase tracking-wider truncate">
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-surface rounded-lg border border-white/5">
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Alvo 1
          </label>
          <input
            type="number"
            value={alvo1}
            onChange={(e) => setAlvo1(Number(e.target.value))}
            step="0.0001"
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>Fechar: {fecharAlvo1}%</span>
          </div>
          <input
            type="range"
            value={fecharAlvo1}
            onChange={(e) => setFecharAlvo1(Number(e.target.value))}
            min="0"
            max="100"
          />
        </div>
        <div className="p-3 bg-surface rounded-lg border border-white/5">
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Alvo 2
          </label>
          <input
            type="number"
            value={alvo2}
            onChange={(e) => setAlvo2(Number(e.target.value))}
            step="0.0001"
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>Fechar: {fecharAlvo2}%</span>
          </div>
          <div className="h-1 w-full bg-background rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-primary"
              style={{ width: `${fecharAlvo2}%` }}
            />
          </div>
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
            RR Real Total
          </div>
          <div
            className={`font-mono text-4xl font-bold ${rrReal >= 1 ? "text-primary" : "text-danger"}`}
          >
            1 : {rrReal.toFixed(2)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm border-t border-white/5 pt-4 mb-4">
          <div>
            <div className="text-muted">Lucro Alvo 1:</div>
            <div className="font-mono text-foreground">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(lucroAlvo1)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-muted">Lucro Alvo 2:</div>
            <div className="font-mono text-foreground">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(lucroAlvo2)}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm bg-background p-3 rounded-lg border border-white/5">
          <span className="text-muted font-semibold">
            Lucro Total Esperado:
          </span>
          <span className="font-mono text-primary font-bold text-lg">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(lucroTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
