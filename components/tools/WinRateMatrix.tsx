"use client";

import { useState } from "react";

const WIN_RATES = [30, 35, 40, 45, 50, 55, 60, 65, 70];
const RRS = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0];

export default function WinRateMatrix() {
  const [hoveredCell, setHoveredCell] = useState<{
    wr: number;
    rr: number;
    ev: number;
  } | null>(null);

  const getExpectedValue = (wr: number, rr: number) => {
    const winProb = wr / 100;
    const lossProb = 1 - winProb;
    return winProb * rr - lossProb;
  };

  const getCellColor = (ev: number) => {
    if (ev > 0.5) return "bg-primary text-background font-bold";
    if (ev > 0) return "bg-primary/40 text-primary-foreground";
    if (ev === 0) return "bg-yellow-400/20 text-yellow-400";
    if (ev > -0.5) return "bg-danger/40 text-danger-foreground";
    return "bg-danger text-white font-bold";
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-xs text-muted font-normal border-b border-r border-white/5">
                WR \ RR
              </th>
              {RRS.map((rr) => (
                <th
                  key={rr}
                  className="p-2 text-xs text-muted font-normal border-b border-white/5"
                >
                  1:{rr.toFixed(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WIN_RATES.map((wr) => (
              <tr key={wr}>
                <td className="p-2 text-xs text-muted font-normal border-r border-white/5">
                  {wr}%
                </td>
                {RRS.map((rr) => {
                  const ev = getExpectedValue(wr, rr);
                  return (
                    <td
                      key={`${wr}-${rr}`}
                      className="p-1 border border-background"
                      onMouseEnter={() => setHoveredCell({ wr, rr, ev })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div
                        className={`w-full h-8 rounded flex items-center justify-center text-xs transition-transform hover:scale-110 cursor-pointer ${getCellColor(ev)}`}
                      >
                        {ev > 0 ? "+" : ""}
                        {ev.toFixed(2)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-surface rounded-xl border border-white/5 min-h-[80px] flex items-center justify-center text-center">
        {hoveredCell ? (
          <div>
            <div className="text-sm text-muted mb-1">
              Win Rate{" "}
              <span className="text-foreground font-semibold">
                {hoveredCell.wr}%
              </span>{" "}
              + RR{" "}
              <span className="text-foreground font-semibold">
                1:{hoveredCell.rr.toFixed(1)}
              </span>
            </div>
            <div
              className={`font-mono text-lg font-bold ${hoveredCell.ev > 0 ? "text-primary" : hoveredCell.ev < 0 ? "text-danger" : "text-yellow-400"}`}
            >
              Valor esperado: {hoveredCell.ev > 0 ? "+" : ""}
              {hoveredCell.ev.toFixed(2)} por trade
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted">
            Passe o mouse sobre a tabela. <br />
            <span className="text-primary">Verde</span> = estratégia lucrativa a
            longo prazo.
          </p>
        )}
      </div>
    </div>
  );
}
