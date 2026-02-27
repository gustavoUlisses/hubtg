"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function ConsistencyCalculator() {
  const [lucroTotal, setLucroTotal] = useState<number>(10000);
  const [regra, setRegra] = useState<number>(40);
  const [dias, setDias] = useState<{ id: number; valor: number }[]>([
    { id: 1, valor: 1500 },
    { id: 2, valor: 2500 },
    { id: 3, valor: 4500 }, // This is 45% of 10000, so it violates the 40% rule
    { id: 4, valor: 1500 },
  ]);

  const addDia = () => {
    setDias([...dias, { id: Date.now(), valor: 0 }]);
  };

  const removeDia = (id: number) => {
    setDias(dias.filter((d) => d.id !== id));
  };

  const updateDia = (id: number, valor: number) => {
    setDias(dias.map((d) => (d.id === id ? { ...d, valor } : d)));
  };

  const melhorDia = dias.length > 0 ? Math.max(...dias.map((d) => d.valor)) : 0;
  const pctMelhorDia = lucroTotal > 0 ? (melhorDia / lucroTotal) * 100 : 0;
  const limitePermitido = lucroTotal * (regra / 100);
  const isConsistente = pctMelhorDia <= regra;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] text-muted mb-1 uppercase tracking-wider truncate">
            Lucro Total (R$)
          </label>
          <input
            type="number"
            value={lucroTotal}
            onChange={(e) => setLucroTotal(Number(e.target.value))}
            min="100"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Regra de Consistência (%)
          </label>
          <input
            type="number"
            value={regra}
            onChange={(e) => setRegra(Number(e.target.value))}
            min="1"
            max="100"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs text-muted uppercase tracking-wider">
            Resultados Diários
          </label>
          <button
            onClick={addDia}
            className="text-xs text-primary flex items-center gap-1 hover:underline"
          >
            <Plus className="w-3 h-3" /> Adicionar Dia
          </button>
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
          {dias.map((dia, index) => (
            <div key={dia.id} className="flex items-center gap-2">
              <span className="text-xs text-muted w-12">Dia {index + 1}</span>
              <input
                type="number"
                value={dia.valor}
                onChange={(e) => updateDia(dia.id, Number(e.target.value))}
                className="flex-1"
              />
              <button
                onClick={() => removeDia(dia.id)}
                className="p-2 text-muted hover:text-danger transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5">
        <div className="text-center mb-4">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">
            % do Melhor Dia
          </div>
          <div
            className={`font-mono text-4xl font-bold ${isConsistente ? "text-primary" : "text-danger"}`}
          >
            {pctMelhorDia.toFixed(1)}%
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm border-t border-white/5 pt-4 mb-4">
          <div>
            <div className="text-muted">Melhor Dia:</div>
            <div className="font-mono text-foreground">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(melhorDia)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-muted">Limite Permitido:</div>
            <div className="font-mono text-foreground">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(limitePermitido)}
            </div>
          </div>
        </div>

        <div
          className={`p-3 rounded-lg text-sm flex items-start gap-2 ${isConsistente ? "bg-primary/10 border border-primary/30 text-primary" : "bg-danger/10 border border-danger/30 text-danger"}`}
        >
          <span className="mt-0.5">{isConsistente ? "✅" : "❌"}</span>
          <div>
            <div className="font-semibold">
              {isConsistente
                ? "Dentro da regra de consistência"
                : "Violação de consistência detectada"}
            </div>
            {!isConsistente && (
              <div className="text-xs mt-1 opacity-80">
                Seu melhor dia representa {pctMelhorDia.toFixed(1)}% do lucro
                total — o máximo permitido é {regra}%.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
