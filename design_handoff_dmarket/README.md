# Handoff: D-market — 予測市場プラットフォーム リデザイン

## Overview
**D-market** は、ポイント制（換金不可）の予測市場プラットフォーム。Polymarket 型の「価格＝確率がトレードで動く」体験を、換金不可ポイントで再現する。報酬は称号・ランキングのみ（賞品ゼロ）。
本リデザインは、姉妹サービス **D-swipe**（https://d-swipe.com / github: jinjinsansan/dswipe）とブランド DNA を共有する形に全面刷新したもの。ロゴ・配色・タイポグラフィを D-swipe に統一し、差別化はプロダクト文脈（予測市場 UI/UX）で行う。

実装対象の既存コードベースは **github: jinjinsansan/dmarket**（Next.js App Router / TypeScript / Tailwind CSS / Recharts / Supabase）。本デザインは、その既存コンポーネント（TopNav, MarketCard, MarketGrid, TradePanel, Portfolio, Admin/* など）を置き換える形で適用する。

## About the Design Files
このバンドルに含まれる `Dmarket.dc.html` は **HTML で作成されたデザインリファレンス**（見た目と挙動を示すプロトタイプ）であり、本番コードとしてそのままコピーするものではない。
タスクは、このデザインを **既存の Next.js + TypeScript + Tailwind + Supabase 環境に、そのコードベースの確立されたパターン（App Router, RSC, RPC, Tailwind トークン）で再現すること**。`Dmarket.dc.html` 内のロジックはモック（ダミーデータ・ローカル state）なので、本番では既存の Supabase RPC / Realtime に接続する。

> 補足: ファイル内の `.dc.html` 形式・`{{ }}` テンプレート・`class Component extends DCLogic` はプロトタイピング環境固有のもの。**実装では使わない**。React コンポーネント＋Tailwind に読み替えること。

## Fidelity
**High-fidelity (hifi)。** 最終的な配色・タイポgrafィ・余白・角丸・影・インタラクションまで作り込み済み。下記 Design Tokens の hex 値・サイズをそのまま使用し、既存コードベースの Tailwind / コンポーネントで**ピクセル単位で再現**すること。レイアウトはレスポンシブ（`auto-fill minmax` と `flex-wrap` ベース）。

---

## Screens / Views

アプリは単一の SPA 的画面遷移（`screen` state）だが、実装では App Router の各ルート（`/`, `/market/[id]`, `/mypage`, `/leaderboard`, `/admin`）にマッピングする。共通要素として **固定ヘッダー（TopNav）** と **フッター** が全画面に出る。

### 0. 共通: ヘッダー (TopNav)
- **Layout**: `position: sticky; top:0`、高さ 66px、`background: var(--surface)`、下境界 1px。内側 `max-width:1240px; margin:0 auto; padding:0 22px`、`display:flex; align-items:center; gap:22px`。
- **Components**:
  - **ロゴ**（左）: SVG（下記 Logo 参照）＋ワードマーク「D-market」（`D-` は `--text`、`market` は `--dim`、weight 700/500、font-size 20px、letter-spacing -.01em）。クリックでホームへ。
  - **検索バー**: `flex:1; max-width:420px`、高さ 40px、`background:var(--surface2)`、border 1px `--border`、radius 11px、左に虫眼鏡 SVG。placeholder「市場を検索 / Search markets」。
  - **ナビリンク**: マーケット / ランキング / マイページ / 管理（font-size 14px, weight 600, padding 8px 10px, radius 9px）。アクティブ画面は `color:var(--text)`、非アクティブは `var(--dim)`。
  - **テーマ切替ボタン**: 38×38px、border 1px、radius 10px。ライト時は月 SVG、ダーク時は太陽 SVG。
  - **残高ピル**: 38px、`background:var(--surface2)`、border 1px、radius 10px。シアンのコイン SVG＋等幅数値（`--text`, weight 700）＋「pt」（`--dim`）。
  - **受取/Claim ボタン**: 38px、`background:var(--grad)`、白文字 weight 700、radius 11px、`box-shadow:0 8px 20px -8px rgba(6,182,212,.7)`。
- **カテゴリバー**（ホーム時のみ表示）: 横スクロール、各ピルに `label`（13.5px/700）＋`sub`（10px 英字 uppercase）。アクティブは `background:var(--primary)` 白文字、非アクティブは `--surface`＋`--dim`。

### 1. ホーム (Home) — `/`
- **Purpose**: 市場一覧の閲覧・絞り込み・検索、トレンド確認。
- **Layout**: `max-width:1240px; padding:24px 22px 80px`。
  - **ヒーロー行**: `display:flex; flex-wrap:wrap; gap:16px`。
    - **ヒーローカード**（`flex:2 1 480px`）: ネイビーグラデ `linear-gradient(135deg,#0b1f3a,#143a63)`、radius 20px、padding 32px 34px、文字 `#eaf2fb`、border `1px solid rgba(56,189,248,.22)`、glow shadow。中身: シアンの eyebrow「D-MARKET · 予測市場」（uppercase, letter-spacing .28em, `#38bdf8`）、見出し「ポイントで読む、世界の確率。」(30px/800)、サブ「Trade the world's probabilities — in points. 換金なし、勝つのは称号とランキングだけ。」、統計3つ（総出来高 31.2M / 開催中 142 / トレーダー 8,940、数値は `#5fcdf0` 等幅）。背景にシアンの radial グロー円2つ。
    - **トレンドカード**（`flex:1 1 300px`）: 白カード。見出し「トレンド / Trending」＋上昇アイコン。上位市場4件をランク番号＋サムネ＋質問＋確率%（`arcColor`）で一覧。
  - **ツールバー**: 左にカテゴリタイトル＋件数、右に **レイアウト切替**（カード / リスト、segmented control）。
  - **市場グリッド**:
    - **カードレイアウト**: `grid; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); gap:16px`。
    - **リストレイアウト**: `flex column; gap:10px`（1行 = サムネ＋質問＋確率＋YES/NOボタン）。
- **MarketCard（カード版）Components**:
  - 外枠: border 1px `--border`、`background:var(--surface)`、radius 20px、padding 16px、`box-shadow:var(--shadow)`、`min-height:184px`、flex column gap 14px。クリックで詳細へ。
  - サムネ: 42×42px、radius 11px、`background: <market.tint>`、白の glyph（漢字/記号、weight 800、16px）。
  - 質問: 14.5px/700、2行省略。
  - 二択: 右上に **確率ドーナツ**（46px、SVG `stroke-dasharray`、`arcColor`）＋中央%。下部に YES（`--pos-weak`/`--pos`）・NO（`--neg-weak`/`--neg`）ボタン（¢表示）。
  - 多択: 上位3アウトカムを `ラベル＋バー＋%` で表示。
  - フッター: 出来高（等幅）＋締切ラベル、上境界 1px。

### 2. 市場詳細 (Detail) — `/market/[id]`
- **Purpose**: 価格推移の確認とトレード。
- **Layout**: 「← 戻る」リンク＋ `display:flex; flex-wrap:wrap; gap:24px; align-items:flex-start`。
  - **左カラム**（`flex:1 1 460px`、column gap 18px）:
    - ヘッダー: サムネ56px＋カテゴリ/出来高/締切メタ＋質問(23px/800)＋英語サブ。
    - **確率＋チャート**カード: 大きな確率%（38px 等幅、`arcColor`）＋「○○の確率」＋変化（▲/▼ pt）。右に時間軸タブ（1H/6H/1D/1W/1M/ALL）。エリアチャート（SVG line＋gradient area、`arcColor`）。**実装では Recharts**。
    - **アウトカム**カード: 各行 = ドット＋ラベル＋バー＋¢。選択中は border `--primary`＋`--primary-weak` 背景。
    - **ルール**カード: 解決方法の説明文。
  - **右カラム = トレードパネル**（`flex:1 1 320px; max-width:392px; position:sticky; top:88px`）:
    - **買う/売る** segmented（買=`--pos`、売=`--neg`）。
    - アウトカム選択ボタン群（選択中ハイライト）。
    - **金額入力**（pt、等幅 22px、右寄せ）＋クイックチップ（+25/+100/+500/MAX）。
    - サマリ4行: 平均価格 / 株数 / （買=的中時の受取・売=受取見込み） / （買=想定リターン・売=現在価格）。
    - **CTA**: 全幅、買=`--pos` / 売=`--neg`、白文字 800。
    - 注記「換金不可・賞品ゼロ / No cash-out — glory only」。

### 3. マイページ (My Page) — `/mypage`
- **Purpose**: 自分のプロフィール・成績・称号・保有・履歴。
- **Layout**: `max-width:1100px`。
  - **プロフィールヘッダー**: 白カード、グラデアバター76px（`--grad`、glow）＋名前(23px/700)＋ハンドル＋**称号バッジ**（★ 予言者 / Oracle、`--primary-weak`＋`--accent2`枠、pill）。下段に登録時期・総合ランク・連続ログイン（炎 SVG）。右に「デイリー受取 / Claim」ボタン（`--grad`）。
  - **ステータス**: `grid auto-fill minmax(150px,1fr)`、5枚（残高 / 評価額 / 合計損益(色) / 的中率 / 連勝）。
  - **称号コレクション / Badges**: 白カード、`grid auto-fill minmax(190px,1fr)`。各バッジ = 漢字 glyph タイル＋名称＋英サブ。獲得済みは `--surface2` 背景・フルカラー、未獲得は `opacity:.5`＋`--faint` タイル。「N / 8 獲得」表示。
  - **保有ポジション**: テーブル（市場/アウトカム | 株数 | 平均 | 現在 | 損益）。損益は色付き。
  - **取引履歴 / Activity**: 行 = 日時(等幅)＋内容＋増減(色)＋残高。

### 4. ランキング (Leaderboard) — `/leaderboard`
- **Purpose**: 利益・出来高ランキング。
- **Layout**: `max-width:880px`。見出し＋**利益/出来高 切替** segmented。
  - **表彰台**: 上位3名、`grid auto-fill`（実装は3列）。番号バッジ（金 `#eab308` / 銀 `#94a3b8` / 銅 `#cd7f32`）＋アバター（頭文字、`color`）＋名前＋値（`--primary`）。1位は `translateY(-8px)`。
  - **一覧**: 行 = ランク＋アバター＋名前(＋「（あなた）」)＋連勝＋値。自分の行は `--primary-weak` 背景でハイライト。

### 5. 管理コンソール (Admin) — `/admin`
- **Purpose**: 運用（KPI 監視・市場作成・解決・テンプレ管理）。SPEC-07 準拠。
- **Layout**: `max-width:1180px`。見出し「管理コンソール / Admin」＋「SPEC-07」バッジ＋**4タブ** segmented（ダッシュボード/市場作成/解決キュー/テンプレート）。
  - **ダッシュボード**: KPI `grid auto-fill minmax(150px,1fr)` 6枚（アクティブ市場 / 本日の取引 / 登録者数 / 手動解決待ち⚠ / 解決失敗⚠ / 解決済み累計）。アラート系は border/文字 `--neg`。下に **カテゴリ別フィード現況**テーブル（カテゴリ｜目標｜admin｜template｜mirror｜次回Poly生成）。「次回Poly生成」= gap（`--primary`）。
  - **市場作成**: フォーム（質問 / カテゴリ select / 締切 datetime / 初期YES確率% / 流動性 b）＋「市場を作成」(`--grad`)。
  - **解決キュー**: 各市場カード = 質問＋勝者 select＋根拠ソースURL＋「確定」(`--grad`)・「中止」(枠線)。処理でリストから除去。空時は dashed 枠の空状態。
  - **テンプレート**: 一覧（名称＋有効/無効ドット＋パターン＋cron＋削除）＋追加フォーム（名前 / cron / 質問パターン＋「作成」）。

### 6. 共通: フッター
- 全画面下部。D-market ロゴ＋説明（「D-swipe ファミリーのプロダクト」）＋3カラムリンク（プロダクト / 法的情報 / アカウント）＋下段に「© 2026 D-market」＋賭博非該当の注記。

---

## Interactions & Behavior
- **画面遷移**: `screen` state（home / detail / portfolio(=mypage) / leaderboard / admin）。実装は App Router ルートへ。市場カード/トレンド/保有行クリックで詳細へ（`window.scrollTo(0,0)`）。
- **テーマ切替**: ライト/ダークを CSS 変数（`document.documentElement` の `--*`）で切替。実装は `class="dark"` ＋ Tailwind `dark:` か CSS 変数いずれでも可。初期値はライト。
- **カードレイアウト切替**: カード / リスト（`layout` state）。
- **カテゴリ絞り込み / 検索**: `cat` / `search` で `markets` をフィルタ。trending は出来高降順。
- **デイリー受取 (Claim)**: 残高 +100、トースト表示。実装は RPC `claim_daily_grant`（1日1回）。
- **トレード**: 買い=残高減、売り=残高増、トースト。実装は RPC `buy_shares` / `sell_shares`、価格はサーバ確定値（LMSR）。プレビューはクライアント LMSR。
- **時間軸切替**: チャート系列を更新（`tf`）。
- **Admin**: タブ切替、作成/解決/中止/テンプレ追加・削除（モックはトースト＋ローカル除去）。実装は対応 RPC。
- **トースト**: 画面下中央、`--text` 背景、2.6 秒で消滅。
- **アニメーション**: 画面切替 `dmIn`（opacity+translateY 6px, .3s ease）。トースト `dmToast`（.25s）。ホバーで色/影変化。
- **レスポンシブ**: グリッドは `auto-fill/auto-fit minmax`、ヒーロー・詳細は `flex-wrap` で段組み解除。ヘッダーは横並び維持（デスクトップ志向）。

## State Management
モックの state（→本番は Supabase に接続）:
| state | 用途 |
|---|---|
| `screen` | 表示画面（→ルーティング） |
| `theme` | light/dark |
| `cat`, `search` | ホームの絞り込み |
| `layout` | cards/compact |
| `mid` | 選択中の市場ID |
| `tf` | チャート時間軸 |
| `side`, `pickIdx`, `amount` | トレードパネル |
| `balance` | 残高（→ wallets.balance） |
| `toast` | 通知 |
| `lb` | ランキング種別 profit/volume |
| `adminTab` | 管理タブ |
| `admForm`, `tplForm`, `templates`, `admQueue` | 管理フォーム/一覧 |

本番のデータ取得・更新は Supabase（RPC＋Realtime）。詳細は同梱の **SPEC.md** 参照。

## Design Tokens

### Logo（D-swipe と完全共有）
ネイビー角丸タイル＋シアングラデの輪郭 D ＋ ">" スワイプシェブロン。SVG:
```html
<svg width="34" height="34" viewBox="0 0 40 40">
  <defs><linearGradient id="dmLogo" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
    <stop stop-color="#0ea5e9"/><stop offset="1" stop-color="#06b6d4"/></linearGradient></defs>
  <rect x="1" y="1" width="38" height="38" rx="11" fill="#0b1f3a"/>
  <path d="M11 13h6c4 0 7 2.8 7 7s-3 7-7 7h-6z" fill="none" stroke="url(#dmLogo)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M25 20l6-5m-6 5l6 5" fill="none" stroke="url(#dmLogo)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```
ワードマーク: 「D-market」（`D-`=text色, `market`=dim色）。

### Colors — Light
| token | hex | 用途 |
|---|---|---|
| `--bg` | `#f4f8fd` | ページ背景 |
| `--surface` | `#ffffff` | カード/ヘッダー面 |
| `--surface2` | `#eef3fb` | 補助面/入力背景 |
| `--border` | `#e2ebf6` | 罫線 |
| `--text` | `#0b1f3a` | 主要テキスト（navy ink） |
| `--dim` | `#5a6e88` | 補助テキスト |
| `--faint` | `#9fb4d0` | 微弱テキスト |
| `--primary` | `#0284c7` | CTA/リンク/アクティブ（sky） |
| `--primary-weak` | `#e9f6fe` | 主役の薄塗り |
| `--accent2` | `#06b6d4` | アクセント（cyan, グラデ終点） |
| `--pos` | `#0d9f6e` | YES/プラス（緑） |
| `--pos-weak` | `#e6f7f0` | YES 薄塗り |
| `--neg` | `#ef4444` | NO/マイナス（赤） |
| `--neg-weak` | `#fdecec` | NO 薄塗り |

### Colors — Dark
| token | hex |
|---|---|
| `--bg` | `#081424` |
| `--surface` | `#0f243d` |
| `--surface2` | `#152e4c` |
| `--border` | `#21405f` |
| `--text` | `#eaf2fb` |
| `--dim` | `#9fb4d0` |
| `--faint` | `#6b86a8` |
| `--primary` | `#38bdf8` |
| `--primary-weak` | `#11324e` |
| `--accent2` | `#22d3ee` |
| `--pos` | `#2dd4a7` / `--pos-weak` `#0e3328` |
| `--neg` | `#f87171` / `--neg-weak` `#3a1d1d` |

### Brand gradient
`--grad: linear-gradient(135deg, #0ea5e9, #06b6d4)`（ヒーローはネイビー `linear-gradient(135deg,#0b1f3a,#143a63)`）。ロゴタイルの navy は常時 `#0b1f3a`（テーマ非依存）。

### Radius / Shadow
- `--radius: 20px`（カード）、`--radius-sm: 12px`（ボタン）、小要素 9–14px。
- `--shadow: 0 1px 2px rgba(11,31,58,.04), 0 14px 40px -18px rgba(11,31,58,.16)`。
- CTA glow: `0 8px 20px -8px rgba(6,182,212,.7)`。

### Typography
- UI: **Roboto**（400/500/700）＋日本語 **Noto Sans JP**（400/500/700）。
- 数値（価格・確率・残高・時刻）: **Roboto Mono**（500/600/700）、`font-variant-numeric: tabular-nums`。
- 主なサイズ: 見出し 23–30px/800、セクション見出し 15–18px/700–800、本文 13.5–14.5px、補助 11–12.5px。
- 市場価格は ¢（=確率×100）と % の両方を使い分け（カード=¢、確率表示=%）。

### マーケットサムネ tint（カテゴリ別、D-swipe 調和パレット）
sky `#0284c7` / amber `#f59e0b` / emerald `#10b981` / teal `#14b8a6` / rose `#f43f5e` / teal-deep `#0e9488` / violet `#8b5cf6` / pink `#ec4899` / indigo `#6366f1`。glyph は漢字・記号（政/₿/球/AI/¥/票/映/技 等）。**本番では市場ごとの画像（image_url）に置換推奨**。

## Assets
- **ロゴ / アイコン類**: すべてインライン SVG（外部画像なし）。テーマ/検索/上昇/月/太陽/炎/コインアイコンは Feather 系のシンプルな線画 SVG。
- **マーケットサムネ**: 現状は tint＋漢字 glyph のプレースホルダ。本番は `markets.image_url` の実画像に差し替える。
- **フォント**: Google Fonts（Roboto / Noto Sans JP / Roboto Mono）。既存コードベースは `next/font/google` で Roboto＋Noto Sans JP を既に使用（D-swipe と同設定）。

## Files
- `Dmarket.dc.html` — 全画面を含むデザインリファレンス（プロトタイプ）。ブラウザで直接開いて挙動確認可能。
- `SPEC.md` — 機能仕様・データモデル・LMSR・RPC・賭博非該当要件の詳細。
- 既存実装の参照元: github **jinjinsansan/dmarket**（`web/`）— 置き換え対象の React コンポーネントと `lib/`（types, lmsr, format, queries）。
