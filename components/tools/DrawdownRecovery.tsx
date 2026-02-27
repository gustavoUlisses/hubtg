"use client";

import { useState } from "react";

export default function DrawdownRecovery() {
  const [perda, setPerda] = useState<number>(20);

  const recuperacaoNecessaria = (perda / (100 - perda)) * 100;

  const getSeverity = () => {
    if (perda >= 70)
      return {
        color: "text-danger",
        bar: "bg-danger",
        msg: "🚨 Perda crítica — considere recomeçar com banca menor",
      };
    if (perda >= 50)
      return {
        color: "text-danger",
        bar: "bg-danger",
        msg: "⚠️ Perda severa — recuperação muito difícil",
      };
    if (perda >= 30)
      return {
        color: "text-yellow-400",
        bar: "bg-yellow-400",
        msg: "Atenção — recuperação exigirá disciplina",
      };
    return {
      color: "text-primary",
      bar: "bg-primary",
      msg: "Recuperação viável com gestão de risco",
    };
  };

  const severity = getSeverity();

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-[10px] text-muted mb-1 uppercase tracking-wider truncate">
          <label>Perda Sofrida (%)</label>
          <span>{perda}%</span>
        </div>
        <input
          type="range"
          value={perda}
          onChange={(e) => setPerda(Number(e.target.value))}
          min="1"
          max="90"
        />
      </div>

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5 text-center">
        <div className="text-xs text-muted uppercase tracking-wider mb-2">
          Recuperação Necessária
        </div>
        <div className={`font-mono text-5xl font-bold mb-4 ${severity.color}`}>
          {recuperacaoNecessaria.toFixed(1)}%
        </div>

        <div className="h-2 w-full bg-background rounded-full overflow-hidden mb-4">
          <div
            className={`h-full transition-all duration-300 ${severity.bar}`}
            style={{ width: `${perda}%` }}
          />
        </div>

        <div className={`text-sm ${severity.color}`}>{severity.msg}</div>
      </div>
    </div>
  );
}
