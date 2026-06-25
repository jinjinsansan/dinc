# Togel 実装仕様書 (SPEC)

「Togel（トゥゲル）」リデザインの実装仕様。デザインは `Togel.dc.html` を hifi リファレンス（モバイルファースト）とし、本書は裏側の機能・データ・制約を定義。実装は既存 **jinjinsansan/togel**（Next.js 14 App Router / TS / Tailwind 3 / shadcn/ui / Supabase / Vercel）を踏襲する。

---

## 0. 進め方（推奨順・離脱しない導線を最優先）
**トップLP（ヒーロー→ストーリー→CTA）→ 診断フロー → 結果（明）→ ミスマッチ（暗）→ 24タイプ → マイページ**。全ページ一括は崩れやすいので段階的に。git ブランチ（例: `redesign`）。各段階で「見た目のみ・機能不変」を回帰確認。

## 1. リブランド（最小差分）
- ロゴSVG（README参照）を共通コンポーネント化（`components/brand/TogelMark.tsx`）し、`site-header.tsx` 等に差し込み。ワードマーク「Togel」は維持。
- 配色トークンを globals.css（HSL）＋ tailwind.config に集約。値は README 準拠。
- favicon / OG / PWA アイコンを `icon-exports/Togel-*.png` に差し替え。

## 2. デザイントークン
README の Colors/Typography を正とする。既存 globals.css は HSL 変数（`--primary` 等）。Tailwind の `bg-primary`/`text-primary` 等のクラス体系を維持しつつ、値を調整。**ダーク世界（ミスマッチ/ストーリー）は専用の濃色＋赤**で固定スタイル（prefers-color-scheme ではなくページ単位の意図的ダーク）。

## 3. データ / 既存ロジック（変更しない）
- 診断: `/api/diagnosis/submit`（回答→Big Five 算出＋タイプ判定）, `/api/diagnosis/latest`（最新結果・マッチング・ミスマッチ・featured を取得。`targetGender=same` で同性、`fresh/revalidate` パラメータ）, `/api/diagnosis/history`, `/api/baseline-test*`。
- Big Five 5軸: openness=アイデア感度 / conscientiousness=計画遂行力 / extraversion=交流エネルギー / agreeableness=共感スタイル / neuroticism=ストレス耐性（`traitLabels`）。
- 型: `BigFiveScores`, `MatchingResult`, `MismatchResult`, `PersonalityTypeDefinition`（`@/types/diagnosis`）。`getTogelLabel`, `getPlanLabel`（`@/lib/personality`）。
- sessionStorage: `latestMatching:opposite` / `latestMatching:same` / `latestDiagnosis` / `latestMismatch` / `latestFeatured`。SIGNED_OUT で全クリア、SIGNED_IN で再取得（既存ロジック維持）。
- 認証: Supabase Google OAuth（`/auth/callback`）。年齢ゲート `age-gate.tsx`、LINE外部ブラウザ誘導 `line-external-browser-redirect.tsx`。
- マッチングカードの「運命モード(prank)」: `isPrank` の結果を1位に出すか除外するかの表示切替（ロジック不変、見た目のみ刷新）。
- 招待: `/api/invite/generate`。LINE通知 `/api/line/*`。ポイント/管理 `/api/admin/*`, `/api/michelle-attraction/*`（AIカウンセリング）。

## 4. 画面仕様（挙動）
レイアウト/トークンは README 参照。

### 4.1 トップ `/`
- 既存の背景動画カルーセル＋blend演出は**維持**（assets.to-gel.com の mp4）。配色・タグライン・CTA・ストーリーセクションの見た目を刷新。
- Google ログイン: `signInWithOAuth({provider:'google', redirectTo:/auth/callback})`。OAuthエラーのトースト表示を維持。
- ストーリー: HOW IT WORKS → STEP01〜04 → CTA。明→暗のトーン転換。STEP04 のミスマッチ警告で「💀 地獄を回避せよ」。

### 4.2 診断 `/diagnosis/select`・`/diagnosis/[type]`
- select: 性別・対象選択（既存フローに合わせる）、18歳以上ゲート、開始。
- 回答: 1問ずつ進捗表示。回答→`/api/diagnosis/submit`→結果ページへ。

### 4.3 結果 `/result`（明）
- `/api/diagnosis/latest` から `results`(5)/`diagnosis`/`featuredResult`/`mismatchResults` を取得しキャッシュ。
- あなたの診断（Big Five バー＋詳細）、運命モード(prank)トグル、異性/同性トグル（`handleMatchModeToggle`）、相性カード5名、Special Pick Up（featured）、ミスマッチ導線。
- ローディングはピンクスピナー、`最新状態を取得` 再取得ボタン。

### 4.4 ミスマッチ `/result/mismatch`（暗）
- `latestMismatch`（sessionStorage）から5名。ダークグラデ背景＋赤。各カード: ミスマッチ度%、ヤバい特徴、なぜミスマッチ、地獄シナリオ、絶対NG。エンタメ注記。

### 4.5 24タイプ `/types`・`/types/distribution`
- 24タイプのカード一覧＋分布（distribution ページのデータに合わせる）。

### 4.6 マイページ `/mypage`
- プロフィール、招待リンク（`/api/invite/generate`）、診断履歴、設定。

## 5. アクセシビリティ / モバイル
- タップ44px以上、フォーカスリング可視、`aria-*` 維持、コントラスト AA（ピンク#E91E63 on 白 は大文字/太字で確保、淡ピンク背景上のテキストは濃ピンク`#c2185b`を使用）。
- viewport で `user-scalable=no` を付けない（ピンチズーム可）。
- ダーク世界の赤文字は十分な太さ/サイズで可読性確保。

## 6. ファミリー整合
- ロゴは family 共通構造（ネイビータイル＋モノグラム＋">"）。Togel は ´T´＋ブランドピンク。
- D-market/D-swipe(=Roboto+cyan)、Dlogic(=黄×黒)、D-lab(=明朝ゴールド)、Togel(=Noto Sans JP+ピンクポップ)。ロゴ構造のみ共通という方針。

## 7. 受け入れ基準
1. API・認証・診断/マッチングのデータフロー・sessionStorage・prank/同性異性トグルが回帰なし。
2. トップLPが明→暗の導線で離脱しにくい。Googleログイン動作維持。
3. マッチ(明)/ミスマッチ(暗) の世界観の対比が明確。
4. モバイルで破綻なし、アクセシビリティ（フォーカス/コントラスト/ズーム）担保。
5. 全所に Togel 共通ロゴ。

> デザインの数値・配色・コピーは `Togel.dc.html` と README を正とする。挙動の正は本 SPEC と既存 `web/src/` 実装。
