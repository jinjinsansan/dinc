# D-lab 実装仕様書 (SPEC)

「AI Builders Lab」改め **D-lab** の実装仕様。デザインは `D-lab *.dc.html` を hifi リファレンスとし、本書はその裏側の機能・データ・制約を定義する。実装は既存 **jinjinsansan/dlc**（Next.js 14 App Router / TS / Tailwind+CSS変数 / Supabase / Stripe / Cloudflare Stream）を踏襲する。

---

## 0. 進め方（段階的・推奨順）
全ページ一括は崩れやすい。**Hero → Pricing → 他LPセクション → 認証 → 会員** の順で段階的に。git ブランチ（例: `redesign`）を切ってから作業。各段階で「壊さない制約」の回帰確認を行う。

## 1. リブランド（最小差分で実施）
- グローバルなワードマーク置換: `AI Builders Lab` → `D-lab`（"D-" text色、"lab" gold）。対象: `Header.tsx`, `Footer.tsx`, `MemberSidebar.tsx`, `MemberHeader.tsx`, `login/page.tsx`, `apply/page.tsx`。
- ロゴSVG（README参照）を共通コンポーネント `components/brand/DLabMark.tsx` 化して上記に差し込み。
- `<title>`/OG・`layout.tsx` metadata の名称も更新。
- トークンは globals.css の既存変数を維持（値変更なし）。tailwind.config.ts に未集約の色があれば集約。

## 2. デザイントークン
README の Colors/Typography を正とする。**既存 globals.css の `--color-*` 変数名・値をそのまま使用**（変更不要）。フォントは `next/font/google` で Noto Serif JP / Noto Sans JP（既存設定）＋ JetBrains Mono。

## 3. データモデル / 既存ライブラリ（変更しない）
- `siteConfig.recruitment`: `{ cohort, label, maxSlots, remainingSlots, deadline, isOpen }`。`enrollmentOpen = siteConfig.recruitment.isOpen`（単一の真実の源）。リリース前 `isOpen=false`。
- `lib/plans.ts`: `PLAN_ACCESS`（プラン別アクセス）、`getPlanAccess(plan)`, `getPlanLabel(plan)`。プラン: `video-only` / `video-email` / `zoom`（階層）。
- Supabase テーブル（既存）: `users`(name, plan, bio, sns_twitter, sns_github, email, community_free_until), `videos`(week, title, description, storage_path, cloudflare_video_id, duration_seconds, unlocked_at, sort_order), `video_watches`(user_id, video_id), `materials`(title, category, week, file_url, file_size_bytes, plan_required, sort_order), `announcements`(title, body, created_at)。
- API ルート（既存・変更しない）: `/api/checkout`（Stripe Checkout）, `/api/billing-portal`, `/api/webhook`, `/api/video-url`（Cloudflare Stream 署名URL）, `/api/download`（Storage署名DL）, `/api/admin/*`。
- 認証: Supabase Auth（`auth/callback`）。会員ゲートは `members/layout.tsx`＋各 `layout.tsx`。

## 4. 画面仕様（挙動）
レイアウト/トークンは README 参照。

### 4.1 LP `/`
- Header スクロール状態（>20px で bg/blur/border）。Apply ボタンは `enrollmentOpen` で "APPLY"↔"COMING SOON"、遷移先 `/apply`。
- Hero: 残席 `siteConfig.recruitment.remainingSlots / maxSlots`。CTA「無料ローンチ動画を見る」→ `/launch/episode/1`、「料金プランを見る」→ `#pricing`。
- Pricing: 3プラン。CTA は `enrollmentOpen` で「申し込む / 近日公開・事前登録」、遷移先 `/apply`。intro も連動。
- 各セクションの本文コピーは既存 `components/sections/*` と一致（改変しない）。

### 4.2 会員エリア `/members/*`
- Sidebar: `getPlanAccess(plan)` で `videos/materials/community/jobs/support` の表示可否。active は `usePathname()`。
- Dashboard: `video_watches`→watched週数で進捗%（/8）。`access.zoom` のみ次回Zoom。`announcements` 最新5件。
- Videos: `videos`＋`video_watches`、`unlocked_at<=now` で解錠。week別 main(sort_order=1)/intro(sort_order=0)。→ `/members/videos/week/[n]`（本編は `/api/video-url` 署名再生）。
- Materials: プラン階層 `['video-only','video-email','zoom']` で `plan_required` フィルタ。DL は `/api/download?path=`。
- MyPage: `users` 更新（name/bio/sns）。請求 `/api/billing-portal`。退会は `plan=null`＋signOut。

### 4.3 認証・申込
- Login: `signInWithPassword` → `/members/dashboard`。エラーは日本語表示。
- Apply: `if(!enrollmentOpen) return <ComingSoon/>`（EmailForm で公開通知登録）。公開時はプラン選択→`/api/checkout`（`{planId}`）→ Stripe。プラン id は `video-only/video-email/zoom`。

## 5. 賭博/景表法の注意
本サイトは講座販売（D-market のポイント制とは別物）。Stripe 実決済が走るため、特定商取引法（`/legal/tokushoho`）・プライバシー（`/legal/privacy`）ページの記載維持が必須。価格・返金条件（14日以内/第1週視聴前は全額返金）はコピーを正確に保つ。

## 6. ファミリー整合（D-market / D-swipe / Dlogic）
- ロゴはfamily共通（ネイビータイル＋輪郭D＋">"）。D-lab はゴールド版マーク。
- フォントは各サイトで最適化（D-lab=明朝ゴールド、D-market/D-swipe=Roboto+sky/cyan、Dlogic=黄×黒）。ロゴ構造のみ共通という方針。
- フッターにファミリー表記。相互リンクを足す場合は別途デザイン。

## 7. 受け入れ基準
1. ルーティング・API・認証・プランゲート・`isOpen` 連動が回帰なし。
2. 全ページで D-lab ロゴ/ワードマークに統一。世界観（ダーク/ゴールド/明朝/番号/縦組み）維持。
3. Hero・Pricing が hifi 通り。`isOpen` 切替で申込導線が一斉に変化。
4. モバイルで主要グリッドが1列化し破綻なし。

> デザインの数値・配色・コピーは `D-lab *.dc.html` と README を正とする。挙動の正は本 SPEC と既存 `src/` 実装。
