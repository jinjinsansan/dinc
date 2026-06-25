# Handoff: Dlogic（D-Logic AI）リデザイン

## Overview
**Dlogic（D-Logic AI）** は、独自の12項目分析で競走馬を科学的に評価する **競馬予想AIエージェント**。LINEの「Dロジくん」で自然言語の質問に答え、4つの独立AIエンジン（Dlogic/Ilogic/Metalogic/Viewlogic）で予想・展開・血統・オッズを提示する。中核データ商品が **「参考勝率」**（市場=オッズと同等精度でAIが独立推定した勝率）。

本リデザインは姉妹サービス **D-market / D-swipe / D-lab / Togel** とロゴDNAを揃える「姉妹サイト化」。既存の **Binanceダーク+ゴールド**の世界観は維持・強化し、**ロゴだけ family 共通**（ネイビータイル＋輪郭D＋スワイプ ">"、マークはページのゴールドに調和）。「Dlogic」ワードマークは維持。

実装対象: **github: jinjinsansan/d-logic-ai-frontend**（Next.js 14.2.5 App Router / React 18 / TypeScript / TailwindCSS / Vercel）。フォントは Noto Sans JP + Bebas Neue + Inter。

## About the Design Files
2つのDCを含む:
- `Dlogic Site.dc.html` — ユーザー向け主要ページ（ホーム / D-logic AI チャット / 参考勝率ティザー / オッズ / コラム / 料金 / FAQ / マイページ）＋共通ナビ/フッター。**管理ページは対象外**。
- `Dlogic 参考勝率.dc.html` — 参考勝率ボード（`/market-prob`、`MarketBoard.tsx` のリデザイン）。日付タブ・サマリ・トグル・JRA/NARセクション・乖離可視化・妙味候補・pending処理・disclaimer。

`.dc.html`/`{{ }}`/`DCLogic` はプロトタイピング環境固有で**実装では使わない**。React＋Tailwind に読み替える。ロジックはモック（ダミーデータ・ローカルstate・トースト）。実データは下記API。

## Fidelity
**High-fidelity・モバイルファースト。** Binanceダーク+ゴールドの厳密な配色・角丸・影で作り込み済み。下記トークンをそのまま使用。参考勝率ボードは620px、サイトは1100px幅で設計（レスポンシブ）。

## ⚠ 守るべき制約（特に参考勝率＝誠実さの生命線）
1. **「回収率」「的中率」「当たる」「勝てる」「鉄板」等の文言を一切作らない**。利益・的中を保証する表現を出さない。
2. **JRA(中央/`show_value=false`)は妙味判定を出さない** → 「市場の整理」と明示（市場のエコーでノイズになるため）。地方(NAR)のみ「妙味候補」を表示。
3. **`odds_pending=true` は絶対勝率(`p_cal`)を隠す** → 「オッズ待ち/暫定ランキング」と明示。
4. disclaimer「回収率・的中を保証するものではありません。最終判断はご自身で」を残す。
5. データ取得/認証(`getMemberSession`)/`next.config` rewrite/`lib/market/preds.ts` の結線は**変更しない**。主に `MarketBoard.tsx`（必要なら `page.tsx` レイアウト）を刷新。既存型 `MarketPreds/MarketRace/MarketHorse` に沿う。
6. main は本番自動デプロイ → 直push禁止。新ブランチで `npm run lint` / `npm run build` を通す（ESLint disable禁止）。

## 参考勝率データ（実データ・認証不要で確認可）
- `GET https://bot.dlogicai.in/api/data/market/preds?date=YYYYMMDD`
- `GET https://bot.dlogicai.in/api/data/market/dates` → `{"dates":[...]}`
- race: `venue, race_number, field_size, kai("nar"|"jra"), show_value, odds_pending, horses[]`
- horse: `rank(参考勝率順位), umaban, bamei, p_cal(単独勝率0-1, pending時null), p_race(レース内正規化, 合計1), ninki(単勝人気, 未形成null), odds(単勝, 未形成null)`

### 乖離の可視化（本デザインの主役）
各馬に2本のバー: **AI参考勝率**（ゴールドグラデ、`p_race`）と **市場の評価**（グレー、`1/odds` をレース内で正規化した implied probability）。AIが市場を上回る馬がひと目で分かる。妙味候補（NARのみ）= モデル上位×市場人気薄（`rank<=3 && ninki-rank>=3`）をゴールドで強調＋「AI N位・市場 M番人気」注記。`odds_pending` 時はバー非表示＋暫定ランキング表記。

## Screens（`src/app`）
- **ホーム `/`**: Hero「国内初 競馬予想専門 AIエージェント」＋完全無料バッジ＋LINE CTA＋統計(10,000+/4/959K+)。Feature01「汎用AIは"競馬を知らない"」（ChatGPT/Gemini/Claude/DeepSeek を打消し→D-Logic AI）。4エンジン＋12項目分析。Dロジくん吹き出し＋フローティングタグ。Community/MYBOT/オッズ急変シグナル/3ステップ/最終CTA。
- **D-logic AI**: DロジくんチャットUI（オンライン表示・吹き出し・入力・サジェスト）。本番はLINE/チャットの既存実装に接続。
- **参考勝率**: 上記ボード（別DC）。サイト側はティザー＋リンク。
- **オッズ**: 急変シグナル一覧（大口買い/嫌気/人気逆転、変動値・時刻）。的中保証しない注記。
- **コラム / 料金 / FAQ / マイページ**: カードグリッド、3プラン（無料/プレミアム¥1,980/エキスパート）、アコーディオンFAQ、会員マイページ（スタッツ＋メニュー）。

## Design Tokens（Binance系ダーク+ゴールド）

### Logo（family共通DNA／ワードマーク=Dlogic）
ネイビータイル `#0b1f3a`（rx 11）× ゴールドグラデ（`#FCD535→#F0B90B`）の輪郭D＋">"。
```html
<svg width="32" height="32" viewBox="0 0 40 40">
  <defs><linearGradient id="dgLogo" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FCD535"/><stop offset="1" stop-color="#F0B90B"/></linearGradient></defs>
  <rect x="1" y="1" width="38" height="38" rx="11" fill="#0b1f3a"/>
  <path d="M11 13h6c4 0 7 2.8 7 7s-3 7-7 7h-6z" fill="none" stroke="url(#dgLogo)" stroke-width="2.7" stroke-linejoin="round"/>
  <path d="M25 20l6-5m-6 5l6 5" fill="none" stroke="url(#dgLogo)" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```
注: 以前納品の Dlogic アイコン（黄×黒）も `icon-exports/D-logic-*.png` にあり。サイト内ロゴはこのゴールドD版で統一推奨（ページのゴールドと調和）。家族の単独アイコンとして黄×黒も可。

### Colors（既存サイト準拠）
| token | hex | 用途 |
|---|---|---|
| bg / bg2 / bg3 | `#050608` / `#080b0e` / `#0a0d12` | 背景階層 |
| surface / 2 / 3 | `#181A20` / `#1E2127` / `#252830` | カード面 |
| gold / gold2 | `#F0B90B` / `#FCD535` | 主役ゴールド（CTA/数値/妙味） |
| text / sub / dim / faint | `#EAECEF` / `rgba(255,255,255,.7)` / `rgba(255,255,255,.4)` / `#5E6673` | テキスト階層 |
| up / down | `#0ECB81` / `#F6465D` | 成功/エラー（確定/警告） |
| line | `#2B3139` | 罫線 |
| エンジン色 | blue `#3b82f6` / purple `#a855f7` / green `#10b981` | 4エンジン/アクセント |
| LINE | `#06C755` | LINE CTA |

ロゴタイルの navy `#0b1f3a` は family共通の固定値。

### Typography
- 見出し数値/英字ロゴ: **Inter**（800/900、字間 -.02em）。
- 本文/UI: **Noto Sans JP**（300/400/700/900）。
- 大見出しの英字演出: **Bebas Neue**（既存）。
- 数値（勝率%・オッズ・人気）は tabular-nums。

### Components
- ボタン: LINE CTA=緑pill＋影、主役=ゴールド、副=枠線/薄塗り。
- カード: ダーク面・角丸20px前後・薄い枠。妙味候補は ゴールド枠＋薄ゴールド塗り。
- 乖離バー（AI/市場の2本）、エンジンカード（色別）、フローティングタグ、アコーディオン（FAQ）、チャット吹き出し。

## Files
- `Dlogic Site.dc.html` / `Dlogic 参考勝率.dc.html` ＋ `support.js` — デザインリファレンス。
- `icon-exports/D-logic-*.png` — ロゴPNG（黄×黒版・既存）。サイトのゴールドD版は上記SVGから書き出し可。
- 実装の参照元: github **jinjinsansan/d-logic-ai-frontend**（`src/`）— `app/page.tsx`, `app/market-prob/page.tsx`, `components/market/MarketBoard.tsx`, `lib/market/preds.ts`, `components/home/*`。
