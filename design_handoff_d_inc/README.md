# Handoff: 株式会社D（D Inc.）コーポレートサイト

## Overview
**株式会社D（D Inc.）** は、AIで個人の「できる」を増やすプロダクトスタジオ。5つの姉妹プロダクト「**Dファミリー**」——D-market（予測市場）/ D-swipe（LP生成）/ Dlogic（競馬予想AI）/ D-lab（AI開発スクール）/ Togel（性格診断マッチング）——を企画・開発・運営する。本サイトはその**法人の顔**となるコーポレートサイト。

開発は **Claude Code → Vercel デプロイ**。本納品物は**デザインハンドオフのみ**（GitHubリポジトリなし、新規構築）。`D Inc Corporate.dc.html` を hifi デザインリファレンスとして、Next.js + Tailwind 等で新規実装する。

## デザインコンセプト
姉妹サイトはそれぞれ独立した世界観（ダーク/明朝ゴールド/ピンクポップ等）を持つが、**全ロゴが共有する「ネイビータイル `#0b1f3a`」を、親会社のブランド色に据える**のが核。コーポレートサイトは姉妹サイト（多くがダーク）と対照的に、**ライト基調・プレミアム・エディトリアル**で「信頼できる親会社」を表現。各プロダクトのアクセント（シアン/ゴールド/ピンク）を差し色として調和させる。

- マスターロゴ: ネイビータイル × **シアングラデ（`#7fe3ff→#22b8e6→#1f8fd0`）のD** ＋ スワイプ ">"。コーポレートの主アクセントはシアン。
- ワードマーク: 「D Inc.」（Inter 800）＋「株式会社D」。
- 見出し=Noto Serif JP（明朝・信頼感）、本文=Noto Sans JP、英字/数値=Inter。

## About the Design File
`D Inc Corporate.dc.html` は HTML デザインリファレンス（1ページのスクロール構成）。`.dc.html`/`{{ }}`/`DCLogic` はプロトタイピング環境固有で**実装では使わない**。React/Next.js＋Tailwind に読み替える。フォーム送信・遷移はモック（トースト）。会社概要の一部はサンプル値（実データに差し替え）。

## Fidelity
**High-fidelity。** 配色・余白・罫線・番号セクション・タイポを作り込み済み。下記トークンをそのまま使用。レスポンシブ前提（デスクトップ1280px設計、モバイルで各グリッドを1列化）。

## Sections（縦スクロール1ページ）
1. **ヘッダー**（sticky）— スクロールでライト背景＋blur＋罫線に変化（最初は透明・白文字）。マスターロゴ＋ナビ（私たちについて/プロダクト/会社概要/ニュース、各EN併記）＋お問い合わせCTA（pill）。
2. **Hero** — ネイビーグラデ背景、eyebrow「D INC. — AI PRODUCT STUDIO」（シアン）、明朝の特大見出し「AIで、個人の『できる』を増やす。」（「できる」シアン）、サブコピー、CTA2本。プロダクトアクセント色のフローティングドット＋シアンの radial glow。下部に**統計ストリップ**（5プロダクト/2026設立/10K+/∞）＋**Dファミリーのマーキー**（流れる、各プロダクト色のドット付き）。
3. **01 MISSION** — 「テクノロジーを、誰もが使える『力』に。」＋本文＋3つのVALUE（翻訳する/正直である/楽しくする、各シアン・ゴールド・ピンク）。
4. **02 PRODUCTS** — 5姉妹サイトを**横長カードのポートフォリオ**で。各カードは左ボーダーがプロダクトアクセント色、ロゴタイル（D or T のモノグラム＋">"）、名称（Inter 800）、種別チップ、説明、ステータス（運営中/開講準備中）。hoverで影。
5. **03 WHY D** — 「『D』は、意思決定の頭文字。」Decision/Data/Develop の説明＋">"スワイプの意味。右に大きなマスターロゴ（ネイビーパネル）。
6. **04 COMPANY** — 会社概要テーブル（会社名/設立/代表者/事業内容/所在地/運営サービス/連絡先）。※サンプル値あり。
7. **05 NEWS** — 日付＋カテゴリチップ（PRODUCT/COMPANY、色分け）＋タイトルの行リスト。
8. **RECRUIT** — ネイビーバナー「『作れる側』を、一緒に増やす仲間を。」＋CTA。
9. **CONTACT** — お問い合わせフォーム（名前/メール/種別チップ/内容＋送信）。
10. **フッター** — マスターロゴ＋3カラム（PRODUCTS/COMPANY/LEGAL）＋「D-market · D-swipe · Dlogic · D-lab · Togel」。

## Design Tokens

### Logo（マスター／family共通DNA）
```html
<svg width="34" height="34" viewBox="0 0 40 40">
  <defs><linearGradient id="dcMaster" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
    <stop stop-color="#7fe3ff"/><stop offset=".5" stop-color="#22b8e6"/><stop offset="1" stop-color="#1f8fd0"/></linearGradient></defs>
  <rect x="1" y="1" width="38" height="38" rx="11" fill="#0b1f3a"/>
  <path d="M11 13h6c4 0 7 2.8 7 7s-3 7-7 7h-6z" fill="none" stroke="url(#dcMaster)" stroke-width="2.7" stroke-linejoin="round"/>
  <path d="M25 20l6-5m-6 5l6 5" fill="none" stroke="url(#dcMaster)" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### Colors
| token | hex | 用途 |
|---|---|---|
| `--navy` / `--navy2` / `--navy-deep` | `#0b1f3a` / `#0e2747` / `#081627` | ブランド主役（Hero/Recruit/Footer/タイル） |
| `--paper` / `--paper2` | `#f6f8fb` / `#eef2f7` | ページ背景（ライト基調） |
| `--surface` | `#ffffff` | カード/テーブル面 |
| `--line` / `--hair` | `#e3e9f1` / `#eef2f7` | 罫線 |
| `--text` / `--sub` / `--dim` / `--faint` | `#15212f` / `#5a6b80` / `#8a99ac` / `#aeb9c7` | テキスト階層 |
| `--cyan` | `#22b8e6` | コーポレート主アクセント（=D-market/swipe系） |
| `--gold` | `#c9a84c` | Dlogic/D-lab アクセント |
| `--pink` | `#e0518a` | Togel アクセント |
| `--green` / `--violet` | `#1f9d6b` / `#7c6bd6` | 補助 |

各プロダクトのマーク色: D-market `#22b8e6` / D-swipe `#36a7e6` / Dlogic `#FCD535` / D-lab `#e8c96a` / Togel `#ff6fa5`。タイルは全て navy `#0b1f3a`。

### Typography
- 見出し: **Noto Serif JP**（明朝、400–700、letter-spacing -.01em）。
- 本文: **Noto Sans JP**（400/500/700、`font-feature-settings:"palt"`、line-height 1.75）。
- 英字ロゴ/数値/ラベル: **Inter**（500–900、字間広め）。eyebrow は letter-spacing .22–.32em の大文字。
- 番号セクション（01〜05）＋EN見出し（MISSION/PRODUCTS…）の罫線ヘッダー。

### Components
- ボタン: 主役=navy塗り（フッター/送信）またはシアン塗り（Hero/Recruit）、pill形。副=枠線/半透明。
- カード: 白・角丸18px・`--line`枠・微シャドウ。プロダクトカードは左4pxアクセントボーダー＋hoverで影。
- 会社概要テーブル（200px見出し列＋値）、ニュース行リスト、フォーム入力（focusでシアン枠）、種別チップ（選択でnavy）。
- Hero: グラデ背景＋フローティングドット＋radial glow＋マーキー（`@keyframes dcMarquee`）。

## Interactions
- ヘッダーはスクロール30pxでライト化（透明→`rgba(246,248,251,.85)`＋blur＋罫線、文字色も反転）。
- ナビ/CTAはアンカースクロール（`scroll-behavior:smooth`）。
- プロダクトカード→各サイトへ（本番は外部URL）。フォームは送信トースト（本番はメール/フォームバックエンドに接続）。
- アクセシビリティ: タップ44px以上、focus可視、コントラストAA（navy上は白、ライト面は`--text`）、ピンチズーム可。

## 実装メモ（Claude Code / Vercel）
- Next.js 14 App Router（静的中心でOK）＋Tailwind。1ページ構成だが、ニュース詳細・採用・法務（プライバシー/利用規約/特商法）を別ルートに拡張可能な構造に。
- フォントは `next/font/google`（Noto Serif JP / Noto Sans JP / Inter）。
- 会社概要・ニュース・連絡先は**サンプル値**。実データ（代表者名・住所・設立日・連絡先・実ニュース）に差し替え。プロダクトカードのリンク先は各本番URLへ。
- お問い合わせは送信先（メール/フォームSaaS/API）を決めて結線。SEO/OGP/favicon はマスターロゴから生成。

## Files
- `D Inc Corporate.dc.html` ＋ `support.js` — デザインリファレンス（ブラウザで直接開ける）。
- マスターロゴは上記SVG。PNG書き出しが必要なら別途用意可能。
