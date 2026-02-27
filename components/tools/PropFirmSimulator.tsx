"use client";

import { useState } from "react";

export default function PropFirmSimulator() {
  const [banca, setBanca] = useState<number>(100000);
  const [metaLucro, setMetaLucro] = useState<number>(10);
  const [ddDiario, setDdDiario] = useState<number>(5);
  const [ddTotal, setDdTotal] = useState<number>(10);
  const [diasMinimos, setDiasMinimos] = useState<number>(10);

  const [diasOperados, setDiasOperados] = useState<number>(5);
  const [lucroAtual, setLucroAtual] = useState<number>(4500);
  const [maiorPerdaDia, setMaiorPerdaDia] = useState<number>(2000);

  const metaLucroRs = banca * (metaLucro / 100);
  const limiteDdDiarioRs = banca * (ddDiario / 100);
  const limiteDdTotalRs = banca * (ddTotal / 100);

  const progressoMeta = Math.max(
    0,
    Math.min(100, (lucroAtual / metaLucroRs) * 100),
  );
  const diasRestantes = Math.max(0, diasMinimos - diasOperados);
  const lucroNecessario = Math.max(0, metaLucroRs - lucroAtual);

  const isDdDiarioViolado = maiorPerdaDia > limiteDdDiarioRs;
  const isDdTotalViolado = lucroAtual < -limiteDdTotalRs;
  const isMetaAlcancada = lucroAtual >= metaLucroRs;
  const isDiasMinimosAlcancados = diasOperados >= diasMinimos;

  const getVerdict = () => {
    if (isDdDiarioViolado || isDdTotalViolado)
      return { text: "🔴 Challenge Falhado", color: "text-danger" };
    if (isMetaAlcancada && isDiasMinimosAlcancados)
      return { text: "🟢 Challenge Aprovado!", color: "text-primary" };
    if (
      maiorPerdaDia > limiteDdDiarioRs * 0.8 ||
      lucroAtual < -limiteDdTotalRs * 0.8
    )
      return { text: "🟡 Atenção Necessária", color: "text-yellow-400" };
    return { text: "🟢 No caminho certo", color: "text-primary" };
  };

  const verdict = getVerdict();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Banca (R$)
          </label>
          <input
            type="number"
            value={banca}
            onChange={(e) => setBanca(Number(e.target.value))}
            min="1000"
            step="1000"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Meta Lucro (%)
          </label>
          <input
            type="number"
            value={metaLucro}
            onChange={(e) => setMetaLucro(Number(e.target.value))}
            min="1"
            step="1"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            DD Diário (%)
          </label>
          <input
            type="number"
            value={ddDiario}
            onChange={(e) => setDdDiario(Number(e.target.value))}
            min="1"
            step="1"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            DD Total (%)
          </label>
          <input
            type="number"
            value={ddTotal}
            onChange={(e) => setDdTotal(Number(e.target.value))}
            min="1"
            step="1"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Dias Mín.
          </label>
          <input
            type="number"
            value={diasMinimos}
            onChange={(e) => setDiasMinimos(Number(e.target.value))}
            min="0"
            step="1"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Dias Operados
          </label>
          <input
            type="number"
            value={diasOperados}
            onChange={(e) => setDiasOperados(Number(e.target.value))}
            min="0"
            step="1"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Lucro Atual (R$)
          </label>
          <input
            type="number"
            value={lucroAtual}
            onChange={(e) => setLucroAtual(Number(e.target.value))}
            step="100"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
            Maior Perda/Dia
          </label>
          <input
            type="number"
            value={maiorPerdaDia}
            onChange={(e) => setMaiorPerdaDia(Number(e.target.value))}
            min="0"
            step="100"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5">
        <div className="text-center mb-4">
          <div className={`font-bold text-lg ${verdict.color}`}>
            {verdict.text}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted uppercase tracking-wider mb-1">
            <span>Meta de Lucro</span>
            <span>{progressoMeta.toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressoMeta}%` }}
            />
          </div>
          <div className="text-right text-[10px] text-muted mt-1">
            Faltam:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(lucroNecessario)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div
            className={`p-2 rounded border ${isDdDiarioViolado ? "bg-danger/10 border-danger/30 text-danger" : "bg-background border-white/5 text-muted"}`}
          >
            <div className="font-semibold mb-1">DD Diário</div>
            {isDdDiarioViolado ? "❌ VIOLADO" : "✅ OK"}
          </div>
          <div
            className={`p-2 rounded border ${isDdTotalViolado ? "bg-danger/10 border-danger/30 text-danger" : "bg-background border-white/5 text-muted"}`}
          >
            <div className="font-semibold mb-1">DD Total</div>
            {isDdTotalViolado ? "❌ VIOLADO" : "✅ OK"}
          </div>
          <div
            className={`p-2 rounded border ${isDiasMinimosAlcancados ? "bg-primary/10 border-primary/30 text-primary" : "bg-background border-white/5 text-muted"}`}
          >
            <div className="font-semibold mb-1">Dias Mínimos</div>
            {isDiasMinimosAlcancados ? "✅ OK" : `⚠️ Faltam ${diasRestantes}`}
          </div>
          <div
            className={`p-2 rounded border ${isMetaAlcancada ? "bg-primary/10 border-primary/30 text-primary" : "bg-background border-white/5 text-muted"}`}
          >
            <div className="font-semibold mb-1">Meta</div>
            {isMetaAlcancada ? "✅ OK" : "⚠️ Pendente"}
          </div>
        </div>
      </div>
    </div>
  );
}
