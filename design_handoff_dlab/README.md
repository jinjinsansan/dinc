# Handoff: D-lab — AI Builders Lab リデザイン

## Overview
**D-lab**（旧称 "AI Builders Lab"）は、Claude Code に日本語で指示するだけで Web サービスを作り、公開・収益化する **8週間オンライン講座の会員制サイト**。ターゲットはプログラミング未経験者。高級感・信頼感・期待感を伝えるのが目的。講師は本格競馬予想AI（= 姉妹サービス **Dlogic**）をノーコードで作った実績者。

本リデザインは、姉妹サービス **D-market / D-swipe / Dlogic** とブランドDNAを揃える「姉妹サイト化」が主眼。ただし**世界観（高級ダーク・ゴールド明朝のエディトリアル）は意図的に維持**し、**揃えるのはロゴだけ**（family共通のネイビータイル＋輪郭D＋スワイプ ">"）。

実装対象の既存コードベースは **github: jinjinsansan/dlc**（Next.js 14 App Router / React 18 / TypeScript / Tailwind CSS + CSS変数 + 一部インラインstyle / Supabase / Stripe / Cloudflare Stream）。本デザインはその LP セクション・会員エリア・認証/申込フローを置き換える形で適用する。

## About the Design Files
このバンドルの `*.dc.html` は **HTML で作成したデザインリファレンス**（見た目と挙動を示すプロトタイプ）であり、本番コードとしてそのままコピーするものではない。`.dc.html` 形式・`{{ }}`テンプレート・`class Component extends DCLogic` はプロトタイピング環境固有のもので**実装では使わない**。React コンポーネント＋Tailwind/CSS変数に読み替えること。ロジックはモック（ダミーデータ・ローカルstate・トースト）なので、本番は既存の Supabase/Stripe 呼び出しに接続する。

含まれるDC:
- `D-lab LP.dc.html` — トップLP全8セクション（Hero/①転換点/②実績/③3本柱/④カリキュラム/⑤料金/⑥FAQ/CTA）＋ヘッダー/フッター。**Hero と Pricing を特に作り込み**。
- `D-lab Members.dc.html` — 会員エリア（サイドバー＋ダッシュボード/動画ライブラリ/資料/マイページ＋community/jobs/support placeholder）。
- `D-lab Auth & Apply.dc.html` — ログイン（スプリット）／申込・準備中（Coming Soon）／申込・公開時（ステップ＋プラン選択＋Stripe導線）。上部スイッチャーで3状態をプレビュー。

## Fidelity
**High-fidelity。** 配色・タイポ・余白・罫線・番号セクション・縦組み演出まで作り込み済み。下記 Design Tokens の値をそのまま使い、既存コードベースの globals.css（CSS変数）＋ tailwind.config.ts に集約して各コンポーネントから参照する。

## ⚠ 絶対に壊してはいけない制約（既存コードベース実装時）
1. ルーティング構造・ファイルパス・APIルート（`/api/*`）は変更しない。
2. Supabase/Stripe の呼び出しロジック、認証フロー、ミドルウェアは変更しない。
3. プランによるアクセス制御（`src/lib/plans.ts` の `PLAN_ACCESS`、各 `layout.tsx` のゲート）を維持。
4. 申込開閉スイッチ `siteConfig.recruitment.isOpen`（準備中→公開）の連動を維持。申込ボタン・`/apply`・決済APIが一斉に切替わる。
5. フォーム・ボタンの onClick/送信処理など**機能面はそのまま、見た目だけ刷新**。
6. デザイントークンは globals.css（CSS変数）と tailwind.config.ts に集約し、各コンポーネントから参照。
7. 既存の日本語コピーは原則維持（改善提案は別途コメントで）。

## ブランド変更点（リブランド）
- ワードマーク **「AI Builders Lab」→「D-lab」**（`D-` = text色、`lab` = ゴールド）。ヘッダー/サイドバー/フッター/ログイン/申込すべて。
- **family共通ロゴ**を追加（下記SVG）。ネイビータイル `#0b1f3a` × ゴールドグラデの輪郭D ＋ スワイプ ">"。D-market/D-swipe/Dlogic と同一構造で、配色のみ高級ゴールドに調和。
- フッターに「D-market・D-swipe・Dlogic ファミリー」を明記。
- それ以外の世界観（背景・ゴールド・明朝・縦組み・番号セクション）は**現状維持**。

## Screens / Sections

### LP（`/` = src/app/page.tsx + components/sections/*）
描画順（`num` 準拠）: Hero → ①EraChange(THE TURNING POINT) → ②Achievement(EVIDENCE) → ③About(THE LAB) → ④Curriculum(8 WEEKS) → ⑤Pricing(3 PLANS) → ⑥FAQ → CTA → Footer。
- **Header**: sticky、スクロールで背景 `rgba(10,10,15,.85)`＋blur＋下罫線。左=D-labロゴ＋"EST. 2026"、中=mono大文字ナビ(About/Curriculum/Plans/FAQ)、右=Log In＋Apply（`enrollmentOpen` false時は "COMING SOON"）。
- **Hero**: パーティクル（gold dot×22, twinkle+float）＋中央 radial gold glow。上部metaストリップ(VOL.01/TOKYO—REMOTE/2026 SPRING)、左に縦組み「作れる側の人間になる」、eyebrow、H1（明朝 clamp(52,8vw,120px)、「10年前には、不可能だった。」dim小→「今日から、」→「あなたにも、」gold italic→「できる。」）、創業者ノート（競馬AI gold強調）、CTA2本、残席表示。下部に4統計ストリップ（10+/0/8/¥0）。
- **Pricing**: 3プラン（動画のみ¥49,800 / 動画+メール¥98,000 RECOMMENDED / Zoom型¥150,000）。1pxギャップのグリッド。featuredは上に2pxゴールドバー＋薄グラデ＋primaryボタン。`enrollmentOpen` で CTA・intro が「申し込む / 近日公開・事前登録」切替。
- 他セクションの正確なコピーは各DCに反映済み（既存リポジトリの components/sections/* と一致）。

### 会員エリア（`/members/*`）
- **Sidebar**: D-labブランド＋"MEMBERS · COHORT 01"、ナビ7項目（01ダッシュボード/02動画/03資料/04コミュニティ/05受発注/06サポート/07マイページ、JP+EN+番号、active=左ゴールドバー＋薄グラデ）、下部ユーザーチップ（頭文字＋名前＋プランラベル）。`PlanAccess` でアクセス不可項目は非表示。
- **Dashboard**: ようこそ＋プラン、受講進捗バー（watched週数/8、ゴールドグラデ）、Zoomプランのみ次回Zoom案内、お知らせ一覧（announcements）、クイックリンク3。
- **Videos**: PageHead(02)、Week別2カラム（週番号・タイトル・サブ・WATCHED/LOCKEDバッジ・MAIN/INTROインジケータ）。`videos`/`video_watches`/`unlocked_at` 由来。各Week → `/members/videos/week/[n]`。
- **Materials**: PageHead(03)、カテゴリ別（週次教材/フレーズ集/トラブルシューティング等）PDFカード（プラン階層でフィルタ）。DLは `/api/download?path=`。
- **MyPage**: PageHead(07)、プロフィール編集（名前/自己紹介/メール表示/X/GitHub→users更新）、現在プラン＋アップグレード、請求履歴（`/api/billing-portal`）、退会。
- community/jobs/support は本デザインでは「準備中」パネル（既存実装の各ページに合わせて差し替え）。

### 認証・申込
- **Login**(`/login`): スプリット（左=フォーム email/password＋ログイン＋新規登録/パスワード忘れ、右=受講生の声＋gold glow）。`supabase.auth.signInWithPassword` → `/members/dashboard`。
- **Apply 準備中**(`enrollmentOpen=false`): COMING SOON＋「ただいま準備中です。」＋公開通知メール登録（EmailForm）＋無料動画リンク。
- **Apply 公開時**(`enrollmentOpen=true`): ENROLMENT＋ステップ(プラン選択→決済→完了, active=0)＋3プラン radio（選択で要約連動）＋Stripe決済通知＋「決済に進む」→ `/api/checkout`。

## Design Tokens（既存 globals.css 準拠 — そのまま使用）

### Logo（family共通DNA／ワードマーク=D-lab）
```html
<svg width="34" height="34" viewBox="0 0 40 40">
  <defs><linearGradient id="dlabLogo" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
    <stop stop-color="#e8c96a"/><stop offset="1" stop-color="#c9a84c"/></linearGradient></defs>
  <rect x="1" y="1" width="38" height="38" rx="11" fill="#0b1f3a"/>
  <path d="M11 13h6c4 0 7 2.8 7 7s-3 7-7 7h-6z" fill="none" stroke="url(#dlabLogo)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M25 20l6-5m-6 5l6 5" fill="none" stroke="url(#dlabLogo)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```
書き出しPNG（1024px）: `icon-exports/D-lab-*.png`（line-profile / app-icon / gold / dark / mark-transparent）。

### Colors（CSS変数名は既存 globals.css のまま）
| token | hex | 用途 |
|---|---|---|
| `--color-bg` | `#0a0a0f` | ページ背景 |
| `--color-bg-deep` | `#06060a` | 深い背景（交互セクション/フッター） |
| `--color-surface` | `#12121e` | カード面 |
| `--color-surface-2` | `#181828` | 補助面 |
| `--color-primary` | `#c9a84c` | ゴールド（CTA/見出しアクセント/番号） |
| `--color-primary-light` | `#e8c96a` | ゴールド明（hover/グラデ終点） |
| `--color-primary-dim` | `#8a7434` | ゴールド暗（グラデ起点/scrollbar hover） |
| `--color-text` | `#f0f0f0` | 主要テキスト |
| `--color-text-muted` | `#8888aa` | 補助テキスト |
| `--color-text-dim` | `#555571` | 微弱テキスト/ラベル |
| `--color-border` | `#2a2a3e` | 罫線 |
| `--color-border-hair` | `#1c1c2c` | ヘアライン（セクション境界/グリッドギャップ） |

ロゴタイルの navy `#0b1f3a` はテーマ非依存の固定値（family共通）。

### Typography
- 見出し: **Noto Serif JP**（明朝、400/700）— `--font-serif`。数値は `font-feature-settings:"tnum"`。
- 本文: **Noto Sans JP** — `--font-sans`。`font-feature-settings:"palt"`、line-height 1.7。
- ラベル/eyebrow/番号: **JetBrains Mono** 大文字＋字間広め（letter-spacing .15〜.3em）— `--font-mono`。
- eyebrow パターン: mono 11px / letter-spacing .18em / uppercase / gold。
- セクション見出し: SectionHead（№XX gold ＋ kicker mono ＋ 罫線 ＋ H2 明朝 clamp(36,5vw,64px)）。

### Components / 装飾（既存 globals.css のクラスを踏襲）
- `.btn` / `.btn-primary`（gold bg, bg-deep文字）/ `.btn-ghost`（border、hoverでgold）。padding 18px 28px、矢印は hover で translateX。
- `.form-input`: bg-deep ＋ border、focusで border gold。
- 1pxヘアラインのグリッド（カード群を `gap:1px; background:hair` で区切る）、番号付きセクション、縦組み `writing-mode:vertical-rl`。
- アコーディオン: `<details>/<summary>`（Curriculum/FAQ）。

## Interactions
- Header はスクロール20pxで背景/blur/罫線を付与。
- LP の CTA/Apply は `enrollmentOpen` で表記と遷移先が連動（COMING SOON↔申し込む）。プロトタイプでは Tweaks の `enrollmentOpen` で全体一括切替。
- 会員エリアはサイドバーで画面切替（本番は App Router 各ルート）。フォームはトーストで保存等を表示（本番は Supabase 更新）。
- 申込は3状態（login / coming / open）。プラン選択で要約・価格が連動。決済は `/api/checkout`。
- アコーディオンは native details。アクセシビリティ: タップ44px以上、色＋ラベル併記、`text-balance`。

## レスポンシブ（モバイルファースト）
- 既存はデスクトップ寄りの固定列が多い。実装時は LP の各グリッド（3列カード/2列比較/4統計）を sm以下で1列へ、Hero の `1fr 1.2fr` を縦積みへ、会員サイドバーをモバイルでトップの `MemberHeader` ハンバーガーに（既存 `MemberHeader.tsx` のパターンを維持）。

## Files
- `D-lab LP.dc.html` / `D-lab Members.dc.html` / `D-lab Auth & Apply.dc.html` — デザインリファレンス（ブラウザで直接開ける）。`support.js` はランタイム。
- `icon-exports/D-lab-*.png` — ロゴPNG（1024px）。
- 実装の参照元: github **jinjinsansan/dlc**（`src/`）— 置換対象の sections / layout / members / login / apply と `lib/`（siteConfig, plans, episodes）。
