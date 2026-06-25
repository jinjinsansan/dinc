"use client";

import Image from "next/image";
import HeroVideo from "@/components/home/HeroVideo";
import NavigationBar from "@/components/navigation/NavigationBar";
import { motion } from "framer-motion";
import {
  Brain,
  BarChart3,
  Search,
  TrendingUp,
  Database,
  Zap,
  Percent,
  Radio,
  UserCircle,
  Users,
  Star,
  ChevronDown,
  UserPlus,
  MessageCircle,
  Cpu,
  Clock,
  MapPin,
  Bot,
  Sliders,
  Globe,
  Rocket,
  Sparkles,
  TrendingDown,
  ArrowUpDown,
  Activity,
} from "lucide-react";

import { LINEButton } from "@/components/shared/LINEButton";

const heroVideoSrc = "/videos/dlogic-hero.mp4";
const logoSrc = "/dlogic-icon.png";

/* ── Engines data ── */
const engines = [
  {
    name: "Dlogicエンジン",
    desc: "競馬分析に必要な10項目を独自の数式で指数化するコアエンジン。距離適性・騎手適性・調教師評価・トラック適性・天候適性・人気度要因・重量影響・馬体重影響・コーナー専門度・タイム指数——この10要素が数値として浮かび上がります。",
    color: "#f0b90b",
    icon: BarChart3,
  },
  {
    name: "Ilogicエンジン",
    desc: "Dlogicの指数（70%）に、馬と騎手の相性（30%）をミックスした複合計算エンジン。「コンビの妙」まで数値化します。",
    color: "#3b82f6",
    icon: Search,
  },
  {
    name: "Metalogicエンジン",
    desc: "DlogicとIlogicの指数に、市場の動向を示すオッズを統合。多角的視点から導き出す総合分析エンジンです。",
    color: "#a855f7",
    icon: Brain,
  },
  {
    name: "Viewlogicエンジン",
    desc: "展開予想（先行・逃げ・差し・追い込み）から血統分析・過去データ検索まで対応するオールマイティエンジン。レースの\"流れ\"まで読みます。",
    color: "#10b981",
    icon: TrendingUp,
  },
];

/* ── Floating tags ── */
const floatingTags = [
  { label: "JRA派", color: "#f0b90b" },
  { label: "穴馬狙い", color: "#3b82f6" },
  { label: "データ分析", color: "#a855f7" },
  { label: "地方競馬", color: "#10b981" },
  { label: "短距離", color: "#f0b90b" },
  { label: "芝コース", color: "#3b82f6" },
  { label: "重馬場得意", color: "#a855f7" },
  { label: "G1専門", color: "#10b981" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#f0b90b]/30 overflow-x-hidden font-sans">

      {/* ━━━ Navigation ━━━ */}
      <NavigationBar variant="full" />

      {/* ━━━ Hero ━━━ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* Background video */}
        <HeroVideo videoSrc={heroVideoSrc} />
        {/* Gradient overlay on top of video */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-[#050608]/70 to-[#050608]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 z-[2] bg-[url('/grid.svg')] bg-center opacity-5 [mask-image:linear-gradient(to_bottom,black_30%,transparent)]" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#f0b90b]/30 bg-[#f0b90b]/5 px-5 py-2 backdrop-blur-sm"
          >
            <Zap className="h-4 w-4 text-[#f0b90b]" />
            <span className="text-sm font-medium tracking-wide text-[#f0b90b]">完全無料</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-2 text-4xl leading-none tracking-tight sm:text-7xl lg:text-8xl"
            style={{ fontWeight: 900 }}
          >
            国内初
            <br />
            競馬予想専門
            <br />
            <span className="bg-gradient-to-r from-[#f0b90b] to-[#fcd535] bg-clip-text text-transparent">AIエージェント</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mb-12 max-w-2xl text-base font-light leading-relaxed text-white/70 md:text-xl"
          >
            あなただけのAIエージェントが手に入る。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <LINEButton size="lg">Dロジくんを追加する</LINEButton>
              <a
                href="/mybot"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-[#f0b90b]/50 hover:bg-[#f0b90b]/10 hover:text-[#f0b90b] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b90b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050608] md:text-xl"
              >
                <Rocket className="h-5 w-5 md:h-6 md:w-6" />
                MYBOTを試す
              </a>
            </div>
            <p className="text-sm font-medium text-white/40">完全無料・登録不要・すぐ使える</p>
          </motion.div>

          {/* Social proof bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {[
              { value: "10,000+", label: "累計利用ユーザー" },
              { value: "4", label: "独立AIエンジン" },
              { value: "959K+", label: "レースデータ" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-black tracking-tight text-[#f0b90b] sm:text-2xl">{stat.value}</p>
                <p className="text-[11px] font-medium tracking-wider text-white/40">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium tracking-[0.3em] text-white/30 uppercase">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce text-[#f0b90b]/50" />
        </motion.div>
      </section>

      {/* ── Content wrapper: constrained width below hero ── */}
      <div className="mx-auto max-w-[1200px]">

      {/* ━━━ Feature 01: Not Just AI ━━━ */}
      <section className="relative py-24 sm:py-32" style={{ background: "#080b0e" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div
              className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-8 backdrop-blur-sm md:p-12"
            >
              <div className="mb-6 flex items-center gap-3">
                <Brain className="h-12 w-12 text-[#3b82f6]" strokeWidth={1.5} />
                <span className="text-sm font-bold tracking-widest text-[#3b82f6] uppercase">Feature 01</span>
              </div>
              <h2 className="mb-8 text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
                汎用AIは、競馬を<br /><span className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">&ldquo;知らない&rdquo;</span>
              </h2>
              <p className="text-lg font-light leading-relaxed text-white/80 md:text-xl">
                ChatGPT、Gemini、Claude、DeepSeek——今や誰もが気軽に使える汎用AIですが、競馬予想には特化されていません。
              </p>
              <p className="mt-4 text-lg font-medium leading-relaxed text-white/90 md:text-xl">
                過去データの検索、出馬表の即時取得、展開予想、血統分析——競馬ファンが本当に求める機能は、<span className="text-[#f0b90b]">D-Logic AI</span>にだけ組み込まれています。
              </p>
            </div>

            <div
              className="relative flex h-auto flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-[#0a0d12] py-12 px-8 lg:h-[520px]"
            >
              {/* Generic AIs - crossed out */}
              <p className="mb-5 text-xs font-bold tracking-[0.25em] text-white/30 uppercase">汎用AI</p>
              <div className="mb-6 grid grid-cols-2 gap-4 w-full max-w-sm">
                {[
                  { name: "ChatGPT", color: "#74aa9c" },
                  { name: "Gemini", color: "#8b6cf0" },
                  { name: "Claude", color: "#d4a574" },
                  { name: "DeepSeek", color: "#4a9eff" },
                ].map((ai) => (
                  <div
                    key={ai.name}
                    className="relative flex items-center justify-center rounded-xl border-2 px-4 py-4 text-sm font-black sm:px-6 sm:py-5 sm:text-lg"
                    style={{
                      borderColor: `${ai.color}50`,
                      background: `${ai.color}15`,
                      color: ai.color,
                    }}
                  >
                    <span className="mr-3 h-3.5 w-3.5 rounded-full shadow-lg" style={{ background: ai.color, boxShadow: `0 0 12px ${ai.color}` }} />
                    {ai.name}
                    {/* Strike-through overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[110%] h-[3px] -rotate-12 rounded-full" style={{ background: `${ai.color}60` }} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mb-4 text-sm font-medium text-red-400/80">競馬予想には非対応</p>

              {/* Divider arrow */}
              <div className="mb-4 flex flex-col items-center gap-1">
                <ChevronDown className="h-6 w-6 text-[#f0b90b]/60" />
                <ChevronDown className="h-6 w-6 -mt-3 text-[#f0b90b]/40" />
              </div>

              {/* D-Logic AI highlight */}
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 rounded-3xl bg-[#f0b90b] opacity-20 blur-2xl" />
                <div className="relative flex flex-col items-center gap-2 rounded-2xl border-2 border-[#f0b90b] bg-gradient-to-b from-[#f0b90b]/25 to-[#f0b90b]/10 px-10 py-6 shadow-[0_0_40px_rgba(240,185,11,0.2)]">
                  <div className="flex items-center gap-3">
                    <Zap className="h-9 w-9 text-[#f0b90b] drop-shadow-[0_0_8px_rgba(240,185,11,0.5)]" fill="#f0b90b" />
                    <span className="text-2xl font-black tracking-wider text-[#f0b90b] drop-shadow-[0_0_10px_rgba(240,185,11,0.3)] sm:text-3xl">D-Logic AI</span>
                  </div>
                  <p className="text-sm font-bold tracking-widest text-white/80">競馬予想専門AIエージェント</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Feature 02: 10 Years of Data + Stats ━━━ */}
      <section className="relative py-24 sm:py-32" style={{ background: "#050608" }}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] [mask-image:linear-gradient(to_bottom,transparent,black_40%,black_60%,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <Database className="h-12 w-12 text-[#10b981]" strokeWidth={1.5} />
              <span className="text-sm font-bold tracking-widest text-[#10b981] uppercase">Feature 02</span>
            </div>
            <h2 className="mb-8 text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-transparent">959,620レコード</span>の<br className="hidden sm:block" />生データが、即座に答える
            </h2>
            <p className="text-lg font-light leading-relaxed text-white/80 md:text-xl">
              JRA・全地方競馬の馬・騎手・産駒——<span className="font-medium text-white/90">10年以上の生データ</span>をバックシステムに完備。各エンジンはこのデータに瞬時にアクセスし、精度の高い指数をリアルタイムで抽出します。
            </p>
          </div>

          {/* Stats grid */}
          <div
            className="grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {[
              { value: "959,620", label: "学習レースデータ", Icon: Database, color: "#10b981" },
              { value: "4", label: "独立AIエンジン", Icon: Cpu, color: "#3b82f6" },
              { value: "24H", label: "システム稼働", Icon: Clock, color: "#a855f7" },
              { value: "JRA+地方", label: "全競馬場対応", Icon: MapPin, color: "#f0b90b" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl border-2 p-5 text-center sm:p-8"
                style={{
                  borderColor: `${stat.color}30`,
                  background: `${stat.color}08`,
                }}
              >
                <stat.Icon className="mb-4 h-7 w-7" style={{ color: stat.color }} strokeWidth={1.5} />
                <p className="mb-2 font-mono text-xl font-black sm:text-4xl" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-sm font-bold tracking-wider text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Feature 03: 4 Engines ━━━ */}
      <section className="relative py-28 sm:py-36 bg-[#080b0e]">
        <div className="absolute left-1/2 top-1/2 -z-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0b90b] opacity-[0.03] blur-[150px]" />
        <div className="mx-auto max-w-6xl px-6">
          <div
            className="mx-auto mb-6 max-w-3xl text-center"
          >
            <span className="mb-4 block text-sm font-bold tracking-widest text-[#a855f7] uppercase">Feature 03</span>
            <h2 className="text-2xl font-black leading-tight sm:text-4xl lg:text-6xl">
              <span className="bg-gradient-to-r from-[#a855f7] to-[#c084fc] bg-clip-text text-transparent">4つの最強エンジン</span>が<br className="hidden sm:block" />全力で動く
            </h2>
          </div>
          <p
            className="mx-auto mb-16 max-w-2xl text-center text-lg font-light text-white/60 md:text-xl"
          >
            それぞれが独立した専門エンジン。会話の中でAIが自ら判断し、必要なエンジンを起動します。
          </p>

          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {engines.map((engine) => (
              <article
                key={engine.name}
                className="group relative overflow-hidden rounded-[2rem] border-2 p-7 transition-all duration-300 backdrop-blur-sm hover:scale-[1.02] sm:p-10"
                style={{
                  borderColor: `${engine.color}40`,
                  background: `linear-gradient(135deg, ${engine.color}0a, transparent)`,
                  boxShadow: `0 20px 60px -20px ${engine.color}20`,
                }}
              >
                {/* Background glow */}
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-transform duration-500 group-hover:scale-150" style={{ background: engine.color }} />

                {/* Icon */}
                <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 sm:h-20 sm:w-20"
                  style={{
                    borderColor: `${engine.color}50`,
                    background: `${engine.color}15`,
                    boxShadow: `0 0 25px ${engine.color}20`,
                  }}
                >
                  <engine.icon className="h-8 w-8 sm:h-10 sm:w-10" style={{ color: engine.color, filter: `drop-shadow(0 0 8px ${engine.color})` }} strokeWidth={1.5} />
                </div>

                {/* Engine name */}
                <h3 className="relative mb-4 text-2xl font-black tracking-wide sm:text-3xl" style={{ color: engine.color }}>
                  {engine.name}
                </h3>

                {/* Description */}
                <p className="relative text-base font-light leading-relaxed text-white/70 md:text-lg">{engine.desc}</p>

                {/* Bottom accent bar */}
                <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "60%", background: `linear-gradient(to right, ${engine.color}, ${engine.color}80)` }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Mid-page CTA Banner ━━━ */}
      <section className="relative overflow-hidden border-y border-white/5 bg-[#050608] py-20 sm:py-24">
        <div className="absolute left-1/2 top-1/2 -z-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06C755] opacity-[0.06] blur-[120px]" />
        <div
          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center"
        >
          <p className="text-xl font-black text-white/90 sm:text-3xl lg:text-4xl">
            競馬予想専門AIエージェントを<br className="sm:hidden" /><span className="text-[#f0b90b]">手に入れる</span>
          </p>
          <LINEButton size="lg">Dロジくんを追加する</LINEButton>
        </div>
      </section>

      {/* ━━━ Feature 04: Win Probability ━━━ */}
      <section className="relative overflow-hidden py-28 sm:py-36 bg-[#050608]">
        <div className="absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ef4444] opacity-[0.04] blur-[150px]" />
        <div className="mx-auto max-w-6xl px-6">
          <div
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <Percent className="h-12 w-12 text-[#ef4444]" strokeWidth={1.5} />
              <span className="text-sm font-bold tracking-widest text-[#ef4444] uppercase">Feature 04</span>
            </div>
            <p className="mb-4 text-lg font-medium tracking-wider text-white/50 sm:text-xl">誰もが知りたい</p>
            <h2 className="mb-8 text-2xl font-black leading-tight sm:text-4xl lg:text-6xl">
              <span className="bg-gradient-to-r from-[#ef4444] to-[#f97316] bg-clip-text text-transparent">予測勝率</span>
              <span className="mx-1 text-white/30 sm:mx-2">×</span>
              <span className="bg-gradient-to-r from-[#f97316] to-[#fbbf24] bg-clip-text text-transparent">予測複勝率</span>
              <br />
              <span className="text-white/90">も完備</span>
            </h2>
            <p className="text-lg font-light leading-relaxed text-white/80 md:text-xl">
              Dlogicエンジンとは独立して構築された予測勝率エンジン。各馬の<span className="font-bold text-[#ef4444]">予測勝率</span>・<span className="font-bold text-[#f97316]">複勝率</span>をワンアクションで確認。直感と数字を重ねてください。
            </p>

            {/* Visual probability cards */}
            <div className="mx-auto mt-14 grid max-w-xl grid-cols-2 gap-3 sm:gap-5">
              {/* Win rate card */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#ef4444]/30 bg-[#ef4444]/5 p-5 sm:rounded-[2rem] sm:p-8">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#ef4444] opacity-10 blur-2xl" />
                <p className="mb-2 text-sm font-bold tracking-widest text-[#ef4444]/70">予測勝率</p>
                <p
                  className="font-mono text-4xl font-black text-[#ef4444] sm:text-6xl"
                  style={{ filter: "drop-shadow(0 0 15px rgba(239,68,68,0.3))" }}
                >
                  32.4<span className="text-2xl sm:text-3xl">%</span>
                </p>
                <p className="mt-3 text-sm font-medium text-white/50">1着予測</p>
              </div>

              {/* Place rate card */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#f97316]/30 bg-[#f97316]/5 p-5 sm:rounded-[2rem] sm:p-8">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#f97316] opacity-10 blur-2xl" />
                <p className="mb-2 text-sm font-bold tracking-widest text-[#f97316]/70">予測複勝率</p>
                <p
                  className="font-mono text-4xl font-black text-[#f97316] sm:text-6xl"
                  style={{ filter: "drop-shadow(0 0 15px rgba(249,115,22,0.3))" }}
                >
                  67.8<span className="text-2xl sm:text-3xl">%</span>
                </p>
                <p className="mt-3 text-sm font-medium text-white/50">3着以内予測</p>
              </div>
            </div>

            {/* Bars */}
            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              {[
                { name: "サンプルホース A", win: 32, place: 68, color1: "#ef4444", color2: "#f97316" },
                { name: "サンプルホース B", win: 18, place: 45, color1: "#ef4444", color2: "#f97316" },
                { name: "サンプルホース C", win: 12, place: 38, color1: "#ef4444", color2: "#f97316" },
              ].map((item) => (
                <div key={item.name} className="mb-5 last:mb-0">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-bold text-white/70">{item.name}</span>
                    <div className="flex gap-4">
                      <span className="font-mono text-sm font-black text-[#ef4444]">{item.win}%</span>
                      <span className="font-mono text-sm font-black text-[#f97316]">{item.place}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#ef4444]"
                        style={{ width: `${item.win}%` }}
                      />
                    </div>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#f97316]"
                        style={{ width: `${item.place}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex justify-center gap-6 text-xs font-medium text-white/40">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#ef4444]" />勝率</span>
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#f97316]" />複勝率</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Feature 05: Real-time Odds ━━━ */}
      <section className="relative py-28 sm:py-36" style={{ background: "#080b0e" }}>
        <div className="absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06b6d4] opacity-[0.04] blur-[150px]" />
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <Radio className="h-12 w-12 text-[#06b6d4]" strokeWidth={1.5} />
              <span className="text-sm font-bold tracking-widest text-[#06b6d4] uppercase">Feature 05</span>
            </div>
            <h2 className="mb-8 text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] bg-clip-text text-transparent">リアルタイムオッズ</span>を<br className="hidden sm:block" />会話の中で取得
            </h2>
            <p className="text-lg font-light leading-relaxed text-white/80 md:text-xl">
              Dロジくんはエージェントとして<span className="font-bold text-[#06b6d4]">自らオッズを取りに行きます</span>。関係者情報・馬体重・馬場別分析も、会話の流れの中でシームレスに提供します。
            </p>
          </div>

          {/* Odds visual cards */}
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {[
              { horse: "サンプルホース A", odds: "3.2", trend: "↑", trendText: "急上昇", color: "#06b6d4" },
              { horse: "サンプルホース B", odds: "8.7", trend: "↓", trendText: "下降中", color: "#22d3ee" },
              { horse: "サンプルホース C", odds: "15.4", trend: "→", trendText: "安定", color: "#67e8f9" },
            ].map((item) => (
              <div
                key={item.horse}
                className="relative overflow-hidden rounded-2xl border-2 p-6 text-center sm:rounded-[2rem] sm:p-8"
                style={{
                  borderColor: `${item.color}40`,
                  background: `${item.color}08`,
                }}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-15 blur-2xl" style={{ background: item.color }} />
                <p className="mb-1 text-sm font-bold tracking-wider text-white/50">{item.horse}</p>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-black" style={{ background: `${item.color}30`, color: item.color }}>{item.trend}</span>
                  <span className="text-xs font-medium" style={{ color: `${item.color}90` }}>{item.trendText}</span>
                </div>
                <p
                  className="font-mono text-4xl font-black sm:text-6xl"
                  style={{ color: item.color, filter: `drop-shadow(0 0 15px ${item.color}40)` }}
                >
                  {item.odds}<span className="text-2xl">倍</span>
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: item.color }} />
                    <span className="relative inline-flex h-3 w-3 rounded-full" style={{ background: item.color }} />
                  </span>
                  <span className="text-xs font-bold tracking-widest" style={{ color: `${item.color}80` }}>LIVE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Personalization ━━━ */}
      <section className="relative py-28 sm:py-36 bg-[#050608]">
        <div className="absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e879f9] opacity-[0.03] blur-[150px]" />
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <UserCircle className="h-12 w-12 text-[#e879f9]" strokeWidth={1.5} />
              <span className="text-sm font-bold tracking-widest text-[#e879f9] uppercase">Personalization</span>
            </div>
            <h2 className="mb-8 text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
              使えば使うほど、<br /><span className="bg-gradient-to-r from-[#e879f9] to-[#f0abfc] bg-clip-text text-transparent">あなた専用</span>になる
            </h2>
            <p className="text-lg font-light leading-relaxed text-white/80 md:text-xl">
              チャットで話しかけた瞬間から、Dロジくんはあなたのことを覚え始めます。<span className="font-bold text-[#e879f9]">固いレース派？穴馬狙い派？JRA専門？地方競馬派？</span>——あなたのスタイルを学習し、どんどん最適化されていきます。
            </p>
          </div>

          {/* Visual: floating tags + chat bubble */}
          <div
            className="relative mx-auto h-[350px] max-w-2xl overflow-hidden rounded-2xl border-2 border-[#e879f9]/20 bg-[#080b0e] sm:h-[400px] sm:rounded-[2rem]"
          >
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#e879f9] opacity-10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-[#f0abfc] opacity-10 blur-3xl" />

            {/* Floating tags */}
            <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-3 p-6 sm:gap-4 sm:p-10">
              {floatingTags.map((tag, i) => (
                <div
                  key={i}
                  className="animate-lp-float rounded-full border-2 px-4 py-2 text-sm font-black tracking-wide sm:px-6 sm:py-3 sm:text-base"
                  style={{
                    color: tag.color,
                    backgroundColor: `${tag.color}15`,
                    borderColor: `${tag.color}40`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${5 + (i % 3) * 1.5}s`,
                  }}
                >
                  {tag.label}
                </div>
              ))}
            </div>

            {/* Chat bubble */}
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border-2 border-[#e879f9]/30 bg-[#050608]/95 p-6 shadow-[0_20px_40px_rgba(232,121,249,0.1)] backdrop-blur-md sm:inset-x-10 sm:bottom-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e879f9]/20 text-[#e879f9]">
                  <Star className="h-6 w-6" fill="currentColor" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-black text-[#e879f9]">Dロジくん</p>
                  <p className="text-base font-medium leading-relaxed text-white/80">
                    あなたの傾向から、今日は穴馬を狙うのがおすすめやで。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Community: みんなの予想 ━━━ */}
      <section className="relative py-28 sm:py-36" style={{ background: "#080b0e" }}>
        <div className="absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f59e0b] opacity-[0.03] blur-[150px]" />
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <Users className="h-12 w-12 text-[#f59e0b]" strokeWidth={1.5} />
              <span className="text-sm font-bold tracking-widest text-[#f59e0b] uppercase">Community</span>
            </div>
            <h2 className="mb-8 text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
              あなたの本命が、<br /><span className="bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent">みんなの力</span>になる
            </h2>
            <p className="text-lg font-light leading-relaxed text-white/80 md:text-xl">
              Dロジくんが「あなたの本命は？」と聞いてきたら、ぜひ教えてください。みんなの予想データを集計し、<span className="font-bold text-[#f59e0b]">回収率の計算</span>や、将来的には<span className="font-bold text-[#f59e0b]">ランキング表示</span>も予定しています。
            </p>
          </div>

          {/* Visual: community stats cards */}
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {[
              { label: "本命登録", value: "あなたの予想を記録", icon: Star, color: "#f59e0b" },
              { label: "回収率計算", value: "的中率 × 配当を自動集計", icon: TrendingUp, color: "#fbbf24" },
              { label: "ランキング", value: "みんなと競い合える", icon: BarChart3, color: "#f59e0b" },
            ].map((item) => (
              <div
                key={item.label}
                className="relative overflow-hidden rounded-2xl border-2 p-6 text-center sm:rounded-[2rem] sm:p-8"
                style={{
                  borderColor: `${item.color}30`,
                  background: `${item.color}08`,
                }}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl" style={{ background: item.color }} />
                <item.icon className="mx-auto mb-4 h-8 w-8 sm:h-10 sm:w-10" style={{ color: item.color, filter: `drop-shadow(0 0 8px ${item.color})` }} strokeWidth={1.5} />
                <h3 className="mb-2 text-lg font-black sm:text-xl" style={{ color: item.color }}>{item.label}</h3>
                <p className="text-base font-medium text-white/60">{item.value}</p>
              </div>
            ))}
          </div>

          <p
            className="mt-10 text-center text-xl font-bold text-white/40"
          >
            競馬仲間と、データでつながる場所。
          </p>
        </div>
      </section>

      {/* ━━━ MYBOT: あなただけのBOTを作ろう ━━━ */}
      <section className="relative py-28 sm:py-36 bg-[#050608]">
        <div className="absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3b82f6] opacity-[0.03] blur-[150px]" />
        <div className="absolute right-1/4 bottom-1/4 -z-0 h-[300px] w-[300px] rounded-full bg-[#a855f7] opacity-[0.03] blur-[120px]" />
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="relative">
                <Bot className="h-12 w-12 text-[#3b82f6]" strokeWidth={1.5} />
                <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-[#f0b90b]" />
              </div>
              <span className="text-sm font-bold tracking-widest text-[#3b82f6] uppercase">MYBOT</span>
            </div>
            <h2 className="mb-8 text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
              あなただけの<br />
              <span className="bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#10b981] bg-clip-text text-transparent">AI競馬予想BOT</span>を作ろう
            </h2>
            <p className="text-lg font-light leading-relaxed text-white/80 md:text-xl">
              新サービス<span className="font-bold text-[#3b82f6]">「MYBOT」</span>がスタート。IMlogicエンジン搭載の高度な予想AIを、<span className="font-bold text-[#a855f7]">あなた好みにカスタマイズ</span>して世界にひとつだけのBOTが作れます。
            </p>
          </div>

          {/* 3 feature cards */}
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {[
              {
                icon: Sliders,
                title: "自由自在にカスタム",
                desc: "性格・口調・予想スタイル・分析の重点——12種の口調、6つの分析軸、カスタムプロンプトで無限大の可能性。",
                color: "#3b82f6",
                gradient: "from-[#3b82f6] to-[#60a5fa]",
              },
              {
                icon: Zap,
                title: "IMlogicエンジン搭載",
                desc: "12項目の分析ウェイトを自分で調整。血統重視、タイム重視、騎手重視——あなたの競馬哲学をAIに注入。",
                color: "#a855f7",
                gradient: "from-[#a855f7] to-[#c084fc]",
              },
              {
                icon: Globe,
                title: "公開してバズる",
                desc: "作ったBOTは「みんなのAIBOT」で公開可能。フォロワーを集めて、あなたのBOTが人気ランキングに。",
                color: "#10b981",
                gradient: "from-[#10b981] to-[#34d399]",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border-2 p-6 text-center sm:rounded-[2rem] sm:p-8"
                style={{
                  borderColor: `${item.color}30`,
                  background: `${item.color}06`,
                }}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl" style={{ background: item.color }} />
                <div
                  className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 sm:h-20 sm:w-20"
                  style={{
                    borderColor: `${item.color}40`,
                    background: `${item.color}15`,
                  }}
                >
                  <item.icon className="h-7 w-7 sm:h-9 sm:w-9" style={{ color: item.color, filter: `drop-shadow(0 0 8px ${item.color})` }} strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-lg font-black sm:text-xl" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-white/60 sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-14 flex flex-col items-center gap-6"
          >
            <div className="relative inline-block group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] opacity-30 blur-lg transition-opacity group-hover:opacity-50" />
              <a
                href="https://www.dlogicai.in/mybot"
                className="relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] px-8 py-5 text-lg font-bold text-white ring-1 ring-white/20 transition-transform hover:scale-105 md:text-xl"
              >
                <Rocket className="h-6 w-6" />
                MYBOTを作ってみる
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Odds Signal: オッズ急変発見シグナル ━━━ */}
      <section className="relative py-28 sm:py-36 bg-[#0a0a0f]">
        <div className="absolute left-1/3 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ef4444] opacity-[0.03] blur-[150px]" />
        <div className="absolute right-1/4 bottom-1/4 -z-0 h-[300px] w-[300px] rounded-full bg-[#f59e0b] opacity-[0.03] blur-[120px]" />
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="relative">
                <Activity className="h-12 w-12 text-[#ef4444]" strokeWidth={1.5} />
                <Zap className="absolute -right-1 -top-1 h-5 w-5 text-[#f0b90b]" />
              </div>
              <span className="text-sm font-bold tracking-widest text-[#ef4444] uppercase">ODDS SIGNAL</span>
            </div>
            <h2 className="mb-8 text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-[#ef4444] via-[#f59e0b] to-[#ef4444] bg-clip-text text-transparent">オッズ急変発見シグナル</span>
            </h2>
            <p className="text-lg font-light leading-relaxed text-white/80 md:text-xl">
              JRAレース発走前のオッズ変動をAIが<span className="font-bold text-[#ef4444]">リアルタイム監視</span>。大口投資家の買いや1番人気の逆転をいち早くキャッチして通知。<span className="font-bold text-[#f59e0b]">単勝オッズ、複勝オッズ</span>対応。
            </p>
          </div>

          {/* 3 feature cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: TrendingDown,
                title: "大口買い検知",
                desc: "オッズ急落を即検知。「誰かが大量に買った」動きを見逃さない。",
                color: "#ef4444",
                gradient: "from-[#ef4444] to-[#f87171]",
                emoji: "📉",
              },
              {
                icon: TrendingUp,
                title: "嫌気シグナル",
                desc: "オッズ急騰＝不安材料あり。返し馬や馬体重の異変をキャッチ。",
                color: "#f59e0b",
                gradient: "from-[#f59e0b] to-[#fbbf24]",
                emoji: "📈",
              },
              {
                icon: ArrowUpDown,
                title: "人気逆転アラート",
                desc: "1番人気が入れ替わったら即通知。直前の流れを把握。",
                color: "#8b5cf6",
                gradient: "from-[#8b5cf6] to-[#a78bfa]",
                emoji: "🔀",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border-2 p-6 text-center sm:rounded-[2rem] sm:p-8"
                style={{
                  borderColor: `${item.color}30`,
                  background: `${item.color}06`,
                }}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl" style={{ background: item.color }} />
                <div
                  className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 sm:h-20 sm:w-20"
                  style={{
                    borderColor: `${item.color}40`,
                    background: `${item.color}15`,
                  }}
                >
                  <item.icon className="h-7 w-7 sm:h-9 sm:w-9" style={{ color: item.color, filter: `drop-shadow(0 0 8px ${item.color})` }} strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-lg font-black sm:text-xl" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-white/60 sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA — LINE Bot で歪みシグナルを確認 */}
          <div className="mt-14 flex flex-col items-center gap-4">
            <LINEButton size="lg">Dロジくんを追加する</LINEButton>
            <p className="text-sm text-white/50">チャットで「歪みは？」と聞くだけ</p>
          </div>
        </div>
      </section>

      {/* ━━━ How to Use: 3 Steps ━━━ */}
      <section className="relative py-28 sm:py-36 bg-[#050608]">
        <div className="absolute left-1/2 top-1/2 -z-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06C755] opacity-[0.04] blur-[120px]" />
        <div className="mx-auto max-w-5xl px-6">
          <div
            className="mb-16 text-center"
          >
            <span className="mb-4 block text-sm font-bold tracking-widest text-[#06C755] uppercase">How to Start</span>
            <h2 className="text-2xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              使い方は<span className="bg-gradient-to-r from-[#06C755] to-[#34d399] bg-clip-text text-transparent">3ステップ</span>
            </h2>
          </div>

          <div
            className="flex flex-col gap-8 lg:flex-row lg:gap-8"
          >
            {[
              {
                step: "01",
                title: "チャットを開く",
                desc: "ブラウザでDロジくんのチャットを開くだけ。面倒なメール登録などは一切不要。",
                Icon: UserPlus,
                color: "#06C755",
              },
              {
                step: "02",
                title: "レースを聞く",
                desc: "「今日のJRA」「大井11R」など、チャットで自然な言葉を送信するだけ。",
                Icon: MessageCircle,
                color: "#22d3ee",
              },
              {
                step: "03",
                title: "AIが即座に回答",
                desc: "出馬表・予想・展開・オッズ…競馬に必要な情報を秒速で返答。",
                Icon: Cpu,
                color: "#f0b90b",
              },
            ].map((s, i) => (
              <div
                key={s.step}
                className="relative flex flex-1 flex-col items-center rounded-2xl border-2 p-7 text-center sm:rounded-[2rem] sm:p-10"
                style={{
                  borderColor: `${s.color}30`,
                  background: `${s.color}06`,
                }}
              >
                <div className="absolute -top-5 rounded-full px-5 py-1.5" style={{ background: s.color }}>
                  <span className="text-sm font-black tracking-widest text-black">STEP {s.step}</span>
                </div>
                <div className="mb-6 mt-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 sm:h-20 sm:w-20"
                  style={{
                    borderColor: `${s.color}40`,
                    background: `${s.color}15`,
                  }}
                >
                  <s.Icon className="h-7 w-7 sm:h-9 sm:w-9" style={{ color: s.color, filter: `drop-shadow(0 0 8px ${s.color})` }} strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-xl font-black tracking-wide sm:text-2xl" style={{ color: s.color }}>{s.title}</h3>
                <p className="text-base font-medium leading-relaxed text-white/60">{s.desc}</p>

                {/* Arrow between steps (desktop only) */}
                {i < 2 && (
                  <div className="absolute -right-6 top-1/2 hidden -translate-y-1/2 lg:block">
                    <ChevronDown className="h-10 w-10 -rotate-90" style={{ color: `${s.color}40` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Final CTA ━━━ */}
      <section className="relative overflow-hidden py-32 sm:py-48" style={{ background: "#050608" }}>
        <div className="absolute left-1/2 top-1/2 -z-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0b90b] opacity-[0.05] blur-[150px]" />
        <div className="absolute left-1/4 top-1/3 -z-0 h-[300px] w-[300px] rounded-full bg-[#06C755] opacity-[0.04] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div>
            <h2 className="mb-8 text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              今すぐ、あなたの<br /><span className="bg-gradient-to-r from-[#f0b90b] to-[#fcd535] bg-clip-text text-transparent">相棒</span>を手に入れよう
            </h2>

            <p className="mx-auto mb-16 max-w-2xl text-base font-light leading-relaxed text-white/70 md:text-2xl">
              <span className="font-bold text-white/90">959,620レコード</span> × <span className="font-bold text-white/90">4つのエンジン</span> × <span className="font-bold text-white/90">AIエージェント</span><br className="hidden sm:block" />
              すべてを、Webチャットで。
            </p>

            <div className="flex flex-col items-center gap-8">
              <LINEButton size="lg">Dロジくんを追加する</LINEButton>
              <p className="text-base font-bold tracking-wider text-white/40">完全無料・登録不要・すぐ使える</p>
              <p className="max-w-md text-xs leading-relaxed text-white/30">
                ※現在Dロジくんはベータ版公開中のため使用ユーザーを制御しています。すぐにご利用いただけない場合がございます。ウェイトリストは日々解放されます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Footer ━━━ */}
      <footer className="border-t border-white/10 bg-[#030407] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image src={logoSrc} alt="D-Logic" fill className="object-contain" />
              </div>
              <span className="text-2xl font-black tracking-widest text-[#f0b90b]">D-LOGIC AI</span>
            </div>
            <nav>
              <ul className="flex flex-wrap justify-center gap-8">
                <li><a href="/terms" className="text-sm font-bold text-white/40 transition hover:text-[#f0b90b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b90b] rounded-sm">利用規約</a></li>
                <li><a href="/privacy" className="text-sm font-bold text-white/40 transition hover:text-[#f0b90b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b90b] rounded-sm">プライバシーポリシー</a></li>
              </ul>
            </nav>
            <div className="h-px w-full max-w-xs bg-white/10" />
            <p className="text-center text-sm font-medium tracking-wider text-white/30">
              &copy; {new Date().getFullYear()} D-Logic AI. All rights reserved.
            </p>
            <p className="text-center text-xs font-light text-white/20">
              Dロジくんは競馬予想の参考情報を提供するサービスです。投資・賭博を推奨するものではありません。
            </p>
          </div>
        </div>
      </footer>
      </div>{/* end content wrapper */}
    </div>
  );
}
