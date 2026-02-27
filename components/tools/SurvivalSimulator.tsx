"use client";

import { useState, useEffect } from "react";

export default function SurvivalSimulator() {
  const [banca, setBanca] = useState<number>(1000);
  const [risco, setRisco] = useState<number>(2);
  const [winRate, setWinRate] = useState<number>(50);
  const [rr, setRr] = useState<number>(1.5);

  const [survivalRate, setSurvivalRate] = useState<number>(0);
  const [medianBanca, setMedianBanca] = useState<number>(0);
  const [worstCase, setWorstCase] = useState<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const numTrades = 200;
      const numSimulations = 500;
      let survivedCount = 0;
      const finalBancas: number[] = [];

      for (let i = 0; i < numSimulations; i++) {
        let currentBanca = banca;
        for (let t = 0; t < numTrades; t++) {
          if (currentBanca <= 0) break;
          const rand = Math.random() * 100;
          if (rand < winRate) {
            currentBanca += currentBanca * (risco / 100) * rr;
          } else {
            currentBanca -= currentBanca * (risco / 100);
          }
        }
        if (currentBanca > 0) survivedCount++;
        finalBancas.push(currentBanca > 0 ? currentBanca : 0);
      }

      finalBancas.sort((a, b) => a - b);

      setSurvivalRate((survivedCount / numSimulations) * 100);
      setMedianBanca(finalBancas[Math.floor(finalBancas.length / 2)]);
      setWorstCase(finalBancas[0]);
    }, 0);

    return () => clearTimeout(timeout);
  }, [banca, risco, winRate, rr]);

  const getSurvivalColor = (rate: number) => {
    if (rate > 70) return "text-primary";
    if (rate >= 40) return "text-yellow-400";
    return "text-danger";
  };

  const getBarColor = (rate: number) => {
    if (rate > 70) return "bg-primary";
    if (rate >= 40) return "bg-yellow-400";
    return "bg-danger";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Banca Inicial
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
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Win Rate (%)
          </label>
          <input
            type="number"
            value={winRate}
            onChange={(e) => setWinRate(Number(e.target.value))}
            min="1"
            max="99"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            RR (1:X)
          </label>
          <input
            type="number"
            value={rr}
            onChange={(e) => setRr(Number(e.target.value))}
            min="0.1"
            step="0.1"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5">
        <div className="text-center mb-4">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">
            Taxa de Sobrevivência
          </div>
          <div
            className={`font-mono text-4xl font-bold ${getSurvivalColor(survivalRate)}`}
          >
            {survivalRate.toFixed(1)}%
          </div>
        </div>

        <div className="h-2 w-full bg-background rounded-full overflow-hidden mb-4">
          <div
            className={`h-full transition-all duration-500 ${getBarColor(survivalRate)}`}
            style={{ width: `${survivalRate}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted">Banca Mediana:</div>
            <div className="font-mono text-foreground">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(medianBanca)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-muted">Pior Cenário:</div>
            <div className="font-mono text-danger">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(worstCase)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
