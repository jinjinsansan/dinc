# Dlogic 実装仕様書 (SPEC)

「Dlogic（D-Logic AI）」リデザインの実装仕様。デザインは `Dlogic Site.dc.html`（主要ページ）と `Dlogic 参考勝率.dc.html`（`/market-prob`）を hifi リファレンスとし、本書は裏側の機能・データ・制約を定義。実装は既存 **jinjinsansan/d-logic-ai-frontend**（Next.js 14.2.5 / React 18 / TS / Tailwind / Vercel）を踏襲する。

---

## 0. スコープ / 進め方
- **対象: ユーザー向けページのみ**（管理ページは対象外）: `/`(home), `/d-logic-ai`(chat), `/market-prob`(参考勝率), `/odds`, `/column`, 料金, `/faq`, `/my-account` 等。
- 最重要は `/market-prob`（`MarketBoard.tsx`）。次にホームのHero導線。
- main は本番自動デプロイ。**新ブランチで作業・直push禁止**。`npm run lint` と `npm run build` を通す（未定義ESLintルールのdisable禁止）。

## 1. 【最重要】誠実さの制約 — 絶対遵守
- 「回収率」「的中率」「当たる」「勝てる」「鉄板」等の文言を一切使わない/作らない。利益・的中を保証する表現を出さない。
- 位置づけは「市場(オッズ)同等精度の独立推定＝意思決定支援（セカンドオピニオン）」。「勝てる装置」ではなく「正直で読みやすいセカンドオピニオン」。
- JRA(中央)は市場のエコーで妙味判定がノイズ → 妙味タグを出さず「市場の整理」と明示。
- disclaimer「回収率・的中を保証するものではありません。最終判断はご自身で」を全関連ページに残す。

## 2. リブランド（最小差分）
- ロゴSVG（README参照、ゴールドD版）を共通コンポーネント化し、ヘッダー/フッターに差し込み。ワードマーク「Dlogic」は維持。
- 既存の Binance系トークン（README Colors）を globals.css / tailwind.config に集約・統一。値は据え置き。
- フォントは `next/font` の Noto Sans JP + Bebas Neue + Inter（既存）を維持。

## 3. 参考勝率（`/market-prob`・MarketBoard.tsx）
### データ（変更しない結線）
- `lib/market/preds.ts` のローダ（VPS `/api/market` の同期JSON。DB/LLM経由なし）＋ `getMemberSession`（会員必須）＋ `next.config` rewrite を維持。
- 型 `MarketPreds`(date, race_count, horse_count, races[]) / `MarketRace`(venue, race_number, field_size, kai, show_value, odds_pending, horses[]) / `MarketHorse`(rank, umaban, bamei, p_cal, p_race, ninki, odds)。
- 日付: `/api/data/market/dates` → タブ（今日/明日）。既定は今日。

### 表示要件
1. 日付タブ切替。
2. `kai==='jra'` → 中央、`'nar'` → 地方でセクション分け → `venue` 別 → レースカード。
3. レースカード: `venue + race_number`、`field_size`頭、本命(`rank===1`)の参考勝率。タップで出走馬テーブル展開。
4. 出走馬テーブル: rank / umaban / bamei / 参考勝率 / 市場人気(ninki) / オッズ(odds) / **乖離バー**。
5. 乖離 = AI(`p_race`) vs 市場(`1/odds`をレース内正規化)。`show_value && !odds_pending && ninki!=null` で `rank<=3 && (ninki-rank)>=3` を**妙味候補**(ゴールド)。**`show_value===false`(JRA)は妙味を一切出さず「市場の整理」**。
6. `odds_pending===true`: `p_cal` を隠し「オッズ待ち/暫定ランキング」と明示、バー非表示、`p_race` のみで順位表示。
7. 件数サマリ（オッズ確定X/待ちY）＋「オッズ確定のみ」トグル。

## 4. ホーム `/`
- 既存セクション構成（Hero/4エンジン/Feature「汎用AIは競馬を知らない」/Dロジくん/Community/MYBOT/オッズ急変シグナル/3ステップ）を踏襲し配色・カード・余白を刷新。
- Hero CTA: 「Dロジくんを追加する」→ LINE 友だち追加URL（既存）、「MYBOTを試す」→ 該当機能ページ。HeroVideo は既存実装（差し替え可）。
- 4エンジン（Dlogic/Ilogic/Metalogic/Viewlogic）と12項目分析の文言は既存コピーに合わせる。

## 5. その他ユーザーページ
- D-logic AI チャット: 既存のチャット/LINE導線に接続。デザインは吹き出し＋サジェスト。
- オッズ: 急変シグナル（大口買い/嫌気/人気逆転）。市場の動きであり的中保証でない旨を明記。
- コラム: 記事カード一覧（既存CMS/データに接続）。
- 料金: 無料 / プレミアム / エキスパート（既存の課金・Stripe等に接続。価格は実値に合わせる）。
- FAQ: アコーディオン。マイページ: 会員情報・MYBOT・プラン（既存 `getMemberSession`/会員APIに接続）。

## 6. アクセシビリティ / モバイル
- モバイル最優先。タップ44px以上、フォーカス可視、コントラストAA、ピンチズーム可。
- 数値は tabular-nums で桁揃え。色＋ラベル併記（妙味/評価減など）。

## 7. ファミリー整合
- ロゴは family 共通構造（ネイビータイル＋モノグラム＋">"）。Dlogic はゴールドD（サイト内）。単独アイコンの黄×黒版も既存納品にあり。
- D-market/D-swipe(Roboto+cyan)、D-lab(明朝ゴールド)、Togel(ピンクポップ)、Dlogic(Binanceダーク+ゴールド)。ロゴ構造のみ共通。

## 8. 受け入れ基準
1. データ結線・認証・rewrite・型が回帰なし。`lint`/`build` 通過。
2. **誠実さの制約を完全遵守**（禁止語ゼロ、JRA妙味なし、pending時p_cal非表示、disclaimer表示）。
3. 乖離（AI vs 市場）が直感的に分かる。妙味候補はNARのみゴールド強調。
4. モバイルで破綻なし、アクセシビリティ担保。
5. 全ページに family 共通ロゴ。

> デザインの数値・配色・コピーは `Dlogic *.dc.html` と README を正とする。挙動の正は本 SPEC と既存 `src/` 実装。
