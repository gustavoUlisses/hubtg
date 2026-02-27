"use client";

import { useState, useMemo } from "react";

export default function CompoundGrowth() {
  const [banca, setBanca] = useState<number>(1000);
  const [retorno, setRetorno] = useState<number>(5);
  const [meses, setMeses] = useState<number>(12);

  const { data, finalBanca, totalGanho, multiplicador } = useMemo(() => {
    let current = banca;
    const points = [];
    for (let i = 0; i <= meses; i++) {
      points.push(current);
      if (i < meses) {
        current = current * (1 + retorno / 100);
      }
    }
    return {
      data: points,
      finalBanca: current,
      totalGanho: current - banca,
      multiplicador: current / banca,
    };
  }, [banca, retorno, meses]);

  // SVG Chart generation
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const height = 100;
  const width = 300;

  const points = data
    .map((val, i) => {
      const x = (i / meses) * width;
      const y = height - ((val - minVal) / (maxVal - minVal || 1)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] text-muted mb-1 uppercase tracking-wider truncate">
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
            Retorno Mensal (%)
          </label>
          <input
            type="number"
            value={retorno}
            onChange={(e) => setRetorno(Number(e.target.value))}
            step="0.5"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs text-muted mb-1 uppercase tracking-wider">
          <label>Período: {meses} meses</label>
        </div>
        <input
          type="range"
          value={meses}
          onChange={(e) => setMeses(Number(e.target.value))}
          min="1"
          max="60"
        />
      </div>

      <div className="mt-6 p-4 bg-surface rounded-xl border border-white/5">
        <div className="mb-4">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">
            Banca Final
          </div>
          <div className="font-mono text-3xl text-primary">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(finalBanca)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <div className="text-muted">Total Ganho:</div>
            <div className="font-mono text-foreground">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalGanho)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-muted">Multiplicador:</div>
            <div className="font-mono text-foreground">
              {multiplicador.toFixed(2)}x
            </div>
          </div>
        </div>

        {/* Simple SVG Chart */}
        <div className="w-full h-24 relative mt-4">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <polygon
              points={`0,${height} ${points} ${width},${height}`}
              fill="url(#gradient)"
            />
            <polyline
              points={points}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
