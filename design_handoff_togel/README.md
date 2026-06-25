# Handoff: Togel（トゥゲル）リデザイン

## Overview
**Togel（トゥゲル）** は、Big Five 理論ベースの **24タイプAI性格診断＋相性マッチング**。診断結果から相性の良い異性5名と、逆に相性の悪い5名（ミスマッチランキング）を提示する。ターゲットは18歳以上の男女、カジュアルで楽しいトーン。ユーザーの大半はスマホ／LINE内ブラウザ＝**モバイルファースト**。

本リデザインは姉妹サービス **D-market / D-swipe / Dlogic / D-lab** とロゴDNAを揃える「姉妹サイト化」。ただし Togel 独自の世界観（**ピンクのポップ**、**マッチ=明るい / ミスマッチ=ダーク** の対比）は維持・強化。**ロゴだけ family 共通**（ネイビータイル＋モノグラム＋スワイプ ">"、Togel は ´T´ 版・マークはブランドピンク）。「Togel」ワードマークは維持。

実装対象: **github: jinjinsansan/togel**（`web/`、Next.js 14 App Router / TypeScript / Tailwind CSS 3 / shadcn/ui / Noto Sans JP / Vercel / Supabase）。

## About the Design Files
`Togel.dc.html` は **HTML デザインリファレンス**（見た目と挙動のプロトタイプ）。`.dc.html`/`{{ }}`/`DCLogic` はプロトタイピング環境固有で**実装では使わない**。React＋Tailwind＋shadcn/ui に読み替える。ロジックはモック（ダミーデータ・ローカルstate・トースト）で、本番は既存の Supabase 認証・`/api/diagnosis/*` 等に接続。

## Fidelity
**High-fidelity・モバイルファースト。** 440px幅のモバイル列で設計。配色・角丸・影・タイポ・明暗の世界観切替まで作り込み済み。下記 Design Tokens を globals.css（HSL CSS変数）＋ tailwind.config に集約して shadcn/ui コンポーネントから参照する。

## ⚠ 守るべき制約（既存コードベース実装時）
1. 既存の機能・APIルート（`/api/*`）・データフェッチ・認証ロジックは変更しない（**見た目のみ**）。
2. Tailwind + shadcn/ui の枠組みを踏襲。
3. 既存セキュリティ（RLS、年齢確認ゲート `age-gate.tsx`、認証ガード、LINE外部ブラウザ誘導）を壊さない。
4. 日本語UI。アクセシビリティ（コントラスト、フォーカス可視、aria、ピンチズーム可）に配慮。
5. sessionStorage キャッシュ構造（`latestMatching:opposite/same`, `latestDiagnosis`, `latestMismatch`, `latestFeatured`）と prank/同性異性トグルの挙動を維持。

## Screens（`web/src/app`）
プロトは1つのモバイル列で画面遷移（下部タブ＋導線ボタン）。本番は App Router 各ルート。

### トップ `/`（最優先・離脱しない導線）
- **没入ヒーロー**: ピンク `#FFD1DC` 背景（既存は背景動画カルーセル＋blendの「Togel」抜き文字。実装は既存の動画演出を維持しつつ配色/CTAを刷新）。特大「Togel」/「トゥゲル」＋タグライン＋Googleログイン＋SCROLL。
- **ダークのストーリー**: 「運命なんて、計算できる。」→ STEP01 診断🧠 / STEP02 24タイプ🐯 / STEP03 AIマッチング💘（98%カード）/ STEP04 ミスマッチ💀（ダーク赤・警告）→ CTA「今すぐ診断する」。明→暗のトーン転換でフックを作る。

### 診断 `/diagnosis/select`, `/diagnosis/[type]`
- select: 性別・マッチ対象（異性/同性）選択＋年齢ゲート注記＋スタート。
- 回答: 1問ずつ（絵文字＋進捗バー＋5択スケール）。直感で選ぶだけ、戻る可。完了→集計→結果。

### マッチング結果 `/result`（**明るい**）
- あなたの診断（タイプ名＋Big Five 5項目バー: アイデア感度/計画遂行力/交流エネルギー/共感スタイル/ストレス耐性）。
- **運命モード**トグル（prank）＋**異性/同性**切替。
- 相性カード5名: アバター＋#順位＋ニックネーム/年齢/職業＋タイプ＋**マッチ度%**＋キャッチ＋「🤖 なぜマッチ？」＋「💡 最初のデート」（details）＋プロフィール詳細ボタン。
- 最下部に**ミスマッチへの導線**（ダークカード）。

### ミスマッチ `/result/mismatch`（**ダーク**）
- `from-gray-900` グラデ背景、DANGER ZONE バッジ（赤パルス）、💀。
- ミスマッチカード5名: グレースケールアバター＋💀＋#順位＋**ミスマッチ度%**＋⚠️キャッチ＋「🚨 なぜミスマッチ」＋「🔥 地獄のシナリオ」（details）＋プロフィール（自己責任）。
- エンタメ目的の注記、結果へ戻る導線。

### 24タイプ `/types`, `/types/distribution`
- 分布バー（上位タイプ）＋24タイプのカードグリッド（TOGEL XX型・動物絵文字・タイプ名）。

### マイページ `/mypage`
- プロフィールカード（タイプ）＋スタッツ（マッチ/💎ポイント/診断回数）＋**招待リンク**（コピーで相互ポイント）＋メニュー（診断履歴/編集/通知/規約）。

## Design Tokens

### Logo（family共通DNA／ワードマーク=Togel）
ネイビータイル `#0b1f3a`（rx 11）× ピンクグラデの **´T´モノグラム＋">"スワイプ**。
```html
<svg width="28" height="28" viewBox="0 0 40 40">
  <defs><linearGradient id="tgLogo" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
    <stop stop-color="#ff6fa5"/><stop offset="1" stop-color="#E91E63"/></linearGradient></defs>
  <rect x="1" y="1" width="38" height="38" rx="11" fill="#0b1f3a"/>
  <path d="M9 13.5h13M15.5 13.5V27" fill="none" stroke="url(#tgLogo)" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M25 20l6-5m-6 5l6 5" fill="none" stroke="url(#tgLogo)" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```
書き出しPNG（1024px）: `icon-exports/Togel-*.png`（line-profile / app-icon / pink / soft / mark-transparent）。

### Colors（既存 globals.css の HSL 変数に対応）
| 役割 | hex | CSS変数（既存名） |
|---|---|---|
| Primary（ピンク） | `#E91E63` | `--primary`（強ピンク。light版 `#FFD1DC`） |
| Primary deep | `#c2185b` | — |
| Pink soft（ヒーロー） | `#FFD1DC` | — |
| Pink weak（薄塗り） | `#ffe9f0` | — |
| Secondary（青） | `#4A90E2` | `--secondary` |
| Accent（黄） | `#FFC107` | `--accent` |
| Pop（紫） | `#9b6dde` | `--pop` |
| 背景 | `#fdeef4`〜白 | `--background` |
| ink / muted | `#23202a` / `#6b7280` | `--foreground` / `--muted-foreground` |
| line | `#efe7ec` | `--border` |
| **Dark world** bg | `#0d0f14`〜`#15181f` | （ミスマッチ/ストーリー） |
| **Danger** red | `#ef4444` / `#b91c1c` | — |
| radius | 20px（`1rem`〜`1.25rem`） | `--radius` |

ロゴタイルの navy `#0b1f3a` は family共通の固定値。

### Typography
- **Noto Sans JP**（400/500/700/800/900）。見出しは 800–900 で太く、ポップに。
- 数値・%・順位は太字でアクセント色。
- ラベル/eyebrow は letter-spacing 広め＋大文字英字。

### Components（shadcn/ui ベースで踏襲）
- ボタン: 主役=ピンクグラデ `linear-gradient(135deg,#ff5e93,#E91E63)`＋丸pill＋影。副=白/枠線。ダーク世界=赤枠。
- カード: 白・角丸20px・薄影。ミスマッチ=ダークグラデ＋赤枠。
- バー（進捗/Big Five/分布）、トグル（運命モード）、details アコーディオン（デート/地獄シナリオ）、下部タブバー。
- アバター: DiceBear adventurer（既存と同じ）。ミスマッチは grayscale。

## Interactions
- 下部タブ（ホーム/24タイプ/診断/マイページ）。診断は select→answer→result の流れ。
- 運命モード（prank）トグルで1位の表示が切替。異性/同性トグルで対象切替（既存 sessionStorage 構造を維持）。
- マッチ→ミスマッチの相互導線。世界観が明↔暗で切替わる。
- アクセシビリティ: タップ44px以上、フォーカス可視、色＋アイコン＋ラベル併記、ピンチズーム可（`user-scalable` を禁止しない）。

## Files
- `Togel.dc.html` ＋ `support.js` — デザインリファレンス（モバイル列、ブラウザで直接開ける）。
- `icon-exports/Togel-*.png` — ロゴPNG（1024px）。
- 実装の参照元: github **jinjinsansan/togel**（`web/src/`）— page / result / result/mismatch / diagnosis / types / mypage と components（home, layout, ui）, `lib/personality`, `types/diagnosis`。
