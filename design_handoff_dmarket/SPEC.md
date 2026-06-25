# D-market 機能仕様書 (SPEC)

ポイント制予測市場プラットフォーム「D-market」の実装仕様。デザインは `Dmarket.dc.html` を hifi リファレンスとし、本書はその裏側の機能・データ・制約を定義する。実装は既存 **jinjinsansan/dmarket**（Next.js App Router / TypeScript / Tailwind / Recharts / Supabase）を踏襲する。

---

## 0. 設計の絶対条件（賭博非該当の生命線）
以下は **コードに存在してはならない機能** であり、不在を自動テストで担保する。
- **換金不可**: ポイント→現金/金券への交換手段を一切持たない。
- **有償発行禁止**: ポイントを購入する導線を持たない（付与のみ）。
- **譲渡禁止**: ユーザー間のポイント移転を持たない。
- **賞品ゼロ**: 的中・上位入賞に対する景品/賞金を持たない。報酬は称号・ランキング順位のみ。

UI 上もこの原則を明示する（フッター注記・トレードパネル注記・ヒーローコピー）。
公開前に賭博罪・景品表示法・資金決済法の専門家レビューを必須とする。

## 1. ポイント経済
| 定数 | 値 | 意味 |
|---|---|---|
| `POINTS_PER_SHARE` | 100 | 1 株が的中時に償還されるポイント |
| `SIGNUP_GRANT` | 1000 | 登録ボーナス |
| `DAILY_GRANT` | 100 | デイリーボーナス（1日1回） |

- 残高 = `wallets.balance`。増減は `point_ledger` に理由付きで記録（signup/daily/buy/sell/redeem/refund）。
- 表示整形: ポイントは `toLocaleString('ja-JP')`。確率 `p`(0..1) は `%`（カード/詳細の確率）または `¢`=round(p×100)（価格）で表示。損益は符号付き＋色（`--pos`/`--neg`）。

## 2. 価格モデル（LMSR）
- 各市場は複数アウトカムを持ち、各アウトカムの保有量 `q` と流動性パラメータ `b_param` から LMSR 価格を算出（価格＝確率、総和≒1）。
- クライアントはプレビュー用に LMSR を再計算（`lib/lmsr.ts` 流用）、**確定値は必ずサーバ RPC の戻り値**を使用。
- 二択は YES/NO（NO = 1 − YES）。多択は上位を一覧表示。
- 価格推移はチャートで可視化（`price_points` を時系列で。実装は Recharts。デザインのダミーは乱数ウォーク）。

## 3. データモデル（既存 SPEC-02/04/05 準拠）
- **categories**(id, slug, name, display_order, is_active)
- **markets**(id, category_id, question, description, image_url, market_kind `binary|multi`, b_param, source `admin|template|mirror`, resolution_kind `manual|auto`, status `draft|open|closed|resolving|resolved|void`, close_time, resolve_time, created_at)
- **outcomes**(id, market_id, label, display_order, q, is_winner)
- **wallets**(user_id, balance)
- **positions**(user_id, outcome_id, shares, cost_basis)
- **point_ledger**(id, user_id, delta, reason, shares, balance_after, created_at)
- **resolutions**(market_id, winning_outcome_id, resolution_kind, source_url, resolved_at)
- **price_points**(outcome_id, price, recorded_at)
- **market_templates**(id, category_id, name, question_pattern, schedule_cron, resolution_binding, params_source, initial_q_rule, is_active)

### 3.x 追加テーブル（詳細ページのタブ用）
- **orders**(id, market_id, outcome_id, side `buy|sell`, price, size, user_id, created_at) — 注文板表示の元データ。
- **comments**(id, market_id, user_id, body, likes, created_at) — コメント欄。いいねは `comment_likes`(comment_id, user_id) で重複防止。
- Activity フィードは `point_ledger` の取引系行（buy/sell）を市場単位で抽出。

## 4. RPC / サーバ処理（既存準拠）
- ユーザー: `buy_shares(p_outcome_id, p_shares)`, `sell_shares(p_outcome_id, p_shares)`, `claim_daily_grant()`
- 管理: `create_admin_market(p_question, p_description, p_image_url, p_category_id, p_market_kind, p_outcomes, p_b, p_close_time, p_resolve_time, p_initial_yes_price)`, `admin_resolve(p_market_id, p_winning_outcome_id, p_source_url)`, `admin_void(p_market_id, p_reason)`, `upsert_template(...)`, `delete_template(p_id)`, `admin_kpis()`, `admin_feed_overview()`
- DB ロジックは plpgsql `SECURITY DEFINER`（LMSR 価格・台帳・取引・解決）。
- 定期処理: pg_cron + Edge Functions（供給15分 / 解決5分 / 集計10分）。
- Realtime: `outcomes.q` の UPDATE を購読し、一覧/詳細の価格をライブ更新。

### エラーハンドリング（日本語表示）
`insufficient_balance` → ポイント不足、`market_closed` → 締切済み、`insufficient_shares` → 株数不足、`trade_too_small` → 取引量過小、`not_authenticated` → 要ログイン。

### テーマ / モバイル（プロトタイプ実装済み）
- **ライト/ダーク切替**: ナビ右上トグル。CSS 変数を差し替え、`localStorage('dm-theme')` に保存し再訪時も維持。ライトが既定（本家忠実）。Light/Dark 両パレットは README 参照。
- **モバイル**: 880px 以下で上部ナビを畳み、下部固定タブバー（マーケット/ランキング/マイページ/管理）を表示。市場グリッドは 1 カラム、カテゴリは横スクロール。本家モバイルの「上部カテゴリ＋下部ナビ」を踏襲。

## 5. 画面仕様（挙動）
詳細レイアウト/トークンは README.md 参照。各画面の機能要件:

### 5.1 ホーム `/`
- カテゴリタブ（trending＋カテゴリ）、検索、レイアウト切替（カード/リスト）。
- trending は出来高降順。Realtime 価格更新。
- カードの YES/NO クリックで詳細へ遷移し、当該アウトカムを選択状態にする。

### 5.2 詳細 `/market/[id]`
- 価格%＋変化、時間軸タブ（1H/6H/1D/1W/1M/ALL）、エリアチャート（Recharts）。
- アウトカム一覧（価格/バー、選択可）。
- **タブセクション（本家Polymarket準拠）**: 注文板(Order Book: 売り/買いの価格・数量・深さ・スプレッド/中値) / 保有者(Holders: YES・NO別) / 取引履歴(Activity: 購入・売却フィード) / コメント(投稿＋いいね)。実装は `orders`/`positions`/`point_ledger`/`comments` テーブル＋Realtime。
- トレードパネル: 買う/売る、アウトカム選択、金額（pt）、クイックチップ（+25/+100/+500/MAX）、プレビュー（平均価格/株数/的中なら獲得=To win/想定リターン）、CTA。約定は RPC、約定後に残高更新。
- **保有ポジション表示**: 選択アウトカムを保有時、株数・平均価格・評価額・含み損益をパネルに表示。売却で現在価格分のptを回収。
- **当たり/ハズレ精算（核心）**: 市場解決時、勝者アウトカムの保有株は `1株 = POINTS_PER_SHARE(100pt)` で償還、敗者は 0pt。プロトタイプでは「結果をシミュレート」で `admin_resolve` 相当を実行し、的中/ハズレのモーダル（獲得pt表示）＋残高反映。本番は締切後に一次ソースで解決。
- 解決済み/中止/締切後は取引停止＆勝者バッジ表示に切替。

### 5.3 マイページ `/mypage`
- プロフィール（アバター・称号・ランク・連続ログイン）、デイリー受取。
- ステータス: 残高 / 保有評価額 / 合計損益 / 的中率 / 連勝。
- 称号コレクション（獲得/未獲得）。称号は称号テーブル等で定義（実装時に要設計）。
- 保有ポジション（含み損益）＋取引履歴（`point_ledger` 直近50件）。
- 未ログイン時はログイン誘導（現状 LINE ログインは準備中）。

### 5.4 ランキング `/leaderboard`
- 利益/出来高 切替、表彰台（上位3）、一覧、自分の行ハイライト。集計は集計ジョブ由来。

### 5.5 管理 `/admin`（SPEC-07）
- 認証/認可: 管理者ロールのみ。RLS で保護。
- ダッシュボード: `admin_kpis()`＋`admin_feed_overview()`。「次回Poly生成」= 目標 − 現存（admin+template+mirror）の gap。管理者市場/テンプレを増やすと自動縮小（走行中市場は維持）。
- 市場作成: `create_admin_market`。二択は YES/NO＋初期 YES 確率で q シード。
- 解決キュー: `resolution_kind=manual` かつ close 後の市場を確定/中止。
- テンプレート: `market_templates` の CRUD（cron・質問パターン・各種 JSON binding）。

## 6. 称号 / バッジ（新規・要設計）
デザインに称号コレクションを追加。実装時に以下を定義:
- バッジ定義テーブル（key, name, description, icon/glyph, tier）。
- 獲得判定（連勝数・取引数・的中数・連続ログイン等のトリガ）。
- マイページに「称号バッジ」（プロフィール）＋コレクショングリッド（獲得/未獲得）。
- 報酬は称号のみ（賞品ゼロの原則を厳守）。

## 7. ブランド / テーマ実装
- ロゴは D-swipe と共有（README の SVG）。ワードマークのみ「D-market」。
- フォントは `next/font/google` で Roboto＋Noto Sans JP（既存設定流用）、数値は Roboto Mono。
- カラートークンは README の Light/Dark 値を Tailwind theme か CSS 変数で定義。ライト基調＋ダーク切替。
- 角丸 20/12px、`--grad`（sky→cyan）を CTA・アバター・ヒーローアクセントに使用。

## 8. レスポンシブ / アクセシビリティ
- グリッドは `auto-fill/auto-fit minmax`、ヒーロー・詳細は flex-wrap で段組み解除。
- タップ領域は 40px 以上を確保（モバイル）。
- 数値は等幅＋tabular-nums で桁ブレ防止。色だけに依存しない（YES/NO はラベル併記）。

## 9. 実装の進め方（推奨）
1. テーマ/トークン（Tailwind config or globals.css）＋ロゴコンポーネントを差し替え。
2. TopNav / フッターを D-market 仕様に刷新（ナビに マイページ・管理 を追加）。
3. MarketCard（カード/リスト2種）・MarketGrid を刷新。
4. 詳細（チャート=Recharts、アウトカム、TradePanel〔買/売〕）を刷新。
5. マイページ（プロフィール＋称号＋保有＋履歴）を新規/刷新。
6. ランキングを刷新。
7. 管理（4タブ）を刷新。
8. 賭博非該当の不在テストを維持/拡張。

> デザインの数値・配色・コピーは `Dmarket.dc.html` と README.md を正とする。挙動の正は本 SPEC と既存 `web/` 実装。
