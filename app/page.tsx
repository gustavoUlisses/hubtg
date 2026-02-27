"use client";

import { useState } from "react";
import {
  LineChart,
  Activity,
  Calculator,
  ShieldAlert,
  Target,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckSquare,
  BarChart2,
  SplitSquareHorizontal,
  Link,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import tools (we will create these next)
import RiskCalculator from "@/components/tools/RiskCalculator";
import SurvivalSimulator from "@/components/tools/SurvivalSimulator";
import CompoundGrowth from "@/components/tools/CompoundGrowth";
import DrawdownRecovery from "@/components/tools/DrawdownRecovery";
import LossStreakSimulator from "@/components/tools/LossStreakSimulator";
import RiskRewardCalculator from "@/components/tools/RiskRewardCalculator";
import GoalCalculator from "@/components/tools/GoalCalculator";
import SwapCalculator from "@/components/tools/SwapCalculator";
import SessionTimer from "@/components/tools/SessionTimer";
import BreakevenCalculator from "@/components/tools/BreakevenCalculator";
import PropFirmSimulator from "@/components/tools/PropFirmSimulator";
import ConsistencyCalculator from "@/components/tools/ConsistencyCalculator";
import WinRateMatrix from "@/components/tools/WinRateMatrix";
import PartialExitCalculator from "@/components/tools/PartialExitCalculator";
import CorrelationAlert from "@/components/tools/CorrelationAlert";

const CATEGORIES = [
  "Todas",
  "Gestão de Risco",
  "Simuladores",
  "Prop Firm",
  "Análise",
];

const TOOLS = [
  {
    id: "risk-calc",
    name: "Calculadora de Risco por Trade",
    category: "Gestão de Risco",
    icon: Calculator,
    description:
      "Calcule o valor exato a arriscar por operação com base na sua banca.",
    component: RiskCalculator,
  },
  {
    id: "survival-sim",
    name: "Simulador de Sobrevivência",
    category: "Simuladores",
    icon: ShieldAlert,
    description: "Descubra quantas bancas sobrevivem após 200 trades.",
    component: SurvivalSimulator,
  },
  {
    id: "compound-growth",
    name: "Crescimento Composto",
    category: "Simuladores",
    icon: TrendingUp,
    description:
      "Veja como sua banca cresce com retornos mensais consistentes.",
    component: CompoundGrowth,
  },
  {
    id: "drawdown-rec",
    name: "Recuperação de Drawdown",
    category: "Gestão de Risco",
    icon: Activity,
    description:
      "Veja exatamente quanto precisa lucrar para se recuperar de uma perda.",
    component: DrawdownRecovery,
  },
  {
    id: "loss-streak",
    name: "Sequência de Perdas",
    category: "Simuladores",
    icon: AlertTriangle,
    description:
      "Quantas perdas consecutivas sua banca aguenta antes de ser zerada?",
    component: LossStreakSimulator,
  },
  {
    id: "rr-calc",
    name: "Risco/Retorno Real",
    category: "Gestão de Risco",
    icon: Target,
    description: "Calcule o RR real de uma operação e o impacto na sua banca.",
    component: RiskRewardCalculator,
  },
  {
    id: "goal-calc",
    name: "Meta Diária/Semanal/Mensal",
    category: "Gestão de Risco",
    icon: CheckSquare,
    description:
      "Quebre sua meta mensal em objetivos diários e semanais realistas.",
    component: GoalCalculator,
  },
  {
    id: "swap-calc",
    name: "Calculadora de Swap",
    category: "Análise",
    icon: Calculator,
    description:
      "Estime o custo ou ganho de swap ao manter posições abertas overnight.",
    component: SwapCalculator,
  },
  {
    id: "session-timer",
    name: "Timer de Sessões Forex",
    category: "Análise",
    icon: Clock,
    description:
      "Veja em tempo real quais sessões estão abertas agora no horário de Brasília.",
    component: SessionTimer,
  },
  {
    id: "breakeven-calc",
    name: "Breakeven com Spread",
    category: "Gestão de Risco",
    icon: SplitSquareHorizontal,
    description:
      "Calcule o preço exato que precisa atingir para cobrir o spread.",
    component: BreakevenCalculator,
  },
  {
    id: "prop-sim",
    name: "Simulador de Prop Firm",
    category: "Prop Firm",
    icon: BarChart2,
    description: "Simule seu progresso em um challenge de prop firm.",
    component: PropFirmSimulator,
  },
  {
    id: "consistency-calc",
    name: "Consistência de Prop Firm",
    category: "Prop Firm",
    icon: Activity,
    description: "Verifique se seu melhor dia viola a regra de consistência.",
    component: ConsistencyCalculator,
  },
  {
    id: "winrate-matrix",
    name: "Matriz de Win Rate x RR",
    category: "Análise",
    icon: BarChart2,
    description:
      "Veja visualmente qual combinação de win rate e RR torna sua estratégia lucrativa.",
    component: WinRateMatrix,
  },
  {
    id: "partial-exit",
    name: "Saída Parcial",
    category: "Gestão de Risco",
    icon: SplitSquareHorizontal,
    description:
      "Calcule o RR real da operação ao fazer saídas parciais em múltiplos alvos.",
    component: PartialExitCalculator,
  },
  {
    id: "correlation-alert",
    name: "Correlação entre Pares",
    category: "Análise",
    icon: Link,
    description: "Descubra se os pares que você opera têm correlação.",
    component: CorrelationAlert,
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todas");

  const filteredTools = TOOLS.filter(
    (tool) => activeCategory === "Todas" || tool.category === activeCategory,
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-primary/20">
              <LineChart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">TraderTools</h1>
              <p className="text-[10px] text-muted uppercase tracking-wider font-medium">
                Ferramentas para traders profissionais
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Todas as ferramentas que você precisa para operar com{" "}
            <span className="text-primary">profissionalismo</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            15 ferramentas gratuitas para gestão de risco, análise de banca e
            muito mais.
          </p>
        </section>

        {/* Category Filter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-background"
                    : "bg-surface text-muted hover:text-foreground border border-surface hover:border-muted/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Tools Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={tool.id}
                  className="bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors group flex flex-col"
                >
                  <div className="p-5 border-b border-white/5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-background rounded-lg text-primary">
                          <tool.icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg">{tool.name}</h3>
                      </div>
                    </div>
                    <div className="inline-block px-2 py-1 bg-background rounded text-[10px] font-medium text-muted uppercase tracking-wider mb-2">
                      {tool.category}
                    </div>
                    <p className="text-sm text-muted">{tool.description}</p>
                  </div>
                  <div className="p-5 flex-1 bg-background/30">
                    <tool.component />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted mb-2">
            TraderTools © 2025 — Ferramentas para traders profissionais
          </p>
          <p className="text-xs text-muted/60">
            As ferramentas são para fins educacionais. Não constituem
            recomendação de investimento.
          </p>
        </div>
      </footer>
    </div>
  );
}
