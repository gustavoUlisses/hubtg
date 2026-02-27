"use client";

import { useState, useEffect } from "react";

const SESSIONS = [
  { name: "Tóquio", flag: "🇯🇵", startUTC: 0, endUTC: 9 },
  { name: "Londres", flag: "🇬🇧", startUTC: 8, endUTC: 17 },
  { name: "Nova York", flag: "🇺🇸", startUTC: 13, endUTC: 22 },
  { name: "Sydney", flag: "🇦🇺", startUTC: 22, endUTC: 7 }, // Crosses midnight
];

export default function SessionTimer() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, []);

  if (!mounted)
    return (
      <div className="h-48 flex items-center justify-center text-muted">
        Carregando...
      </div>
    );

  const currentUTC = time.getUTCHours() + time.getUTCMinutes() / 60;

  // Format BRT time
  const brtTimeStr = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(time);

  const getSessionStatus = (startUTC: number, endUTC: number) => {
    if (startUTC < endUTC) {
      return currentUTC >= startUTC && currentUTC < endUTC;
    } else {
      // Crosses midnight
      return currentUTC >= startUTC || currentUTC < endUTC;
    }
  };

  const activeSessions = SESSIONS.filter((s) =>
    getSessionStatus(s.startUTC, s.endUTC),
  );
  const isHighLiquidity =
    activeSessions.some((s) => s.name === "Londres") &&
    activeSessions.some((s) => s.name === "Nova York");

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="text-xs text-muted uppercase tracking-wider mb-1">
          Horário de Brasília (BRT)
        </div>
        <div className="font-mono text-4xl font-bold text-foreground tracking-widest">
          {brtTimeStr}
        </div>
        {isHighLiquidity && (
          <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-yellow-400/10 text-yellow-400 text-xs rounded-md border border-yellow-400/20">
            <span>⚡</span> Alta Liquidez (Londres + NY)
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {SESSIONS.map((session) => {
          const isOpen = getSessionStatus(session.startUTC, session.endUTC);

          // Convert UTC to BRT (UTC-3)
          const startBRT = (session.startUTC - 3 + 24) % 24;
          const endBRT = (session.endUTC - 3 + 24) % 24;
          const formatHour = (h: number) =>
            `${h.toString().padStart(2, "0")}:00`;

          return (
            <div
              key={session.name}
              className={`p-3 rounded-xl border ${isOpen ? "bg-primary/5 border-primary/30" : "bg-surface border-white/5"}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">
                  {session.flag} {session.name}
                </span>
                {isOpen ? (
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[10px] font-bold text-primary tracking-wider">
                      ABERTA
                    </span>
                  </div>
                ) : (
                  <span className="text-[10px] font-bold text-danger tracking-wider">
                    FECHADA
                  </span>
                )}
              </div>
              <div className="text-xs text-muted font-mono">
                {formatHour(startBRT)} - {formatHour(endBRT)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
