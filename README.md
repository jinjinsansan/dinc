# Dファミリー 姉妹サイト デザイン納品物 — 株式会社D（D Inc.）

株式会社D（D Inc.）と、同社が運営する姉妹サイト群「Dファミリー」のデザイン一式。全ロゴが「ネイビータイル `#0b1f3a` ＋ モノグラム ＋ スワイプ ">"」という共通DNAを持ち、配色・フォント・世界観で個性を出している。

## 法人とプロダクト
**株式会社D（D Inc.）** = AIで個人の「できる」を増やすプロダクトスタジオ。コーポレートサイトは `design_handoff_d_inc/`。

| サイト | 内容 | ロゴ（タイル×マーク） | トーン |
|---|---|---|---|
| **D Inc.（株式会社D）** | 法人コーポレート | ネイビー×シアングラデ / D | ライト・明朝・プレミアム（親会社） |
| **D-market** | ポイント制 予測市場 | ネイビー×シアン / D | Roboto・sky/cyan |
| **D-swipe** | スワイプ型LP生成（既存・基準） | ネイビー×シアン / D | Roboto |
| **Dlogic** | 競馬予想AI（D-Logic AI） | ネイビー×ゴールド / D（単独は黄×黒も） | Binanceダーク+ゴールド |
| **D-lab** | AI個人開発 8週間講座（旧 AI Builders Lab） | ネイビー×ゴールド / D | Noto Serif JP（明朝・高級） |
| **Togel** | 24タイプ性格診断＋相性マッチング | ネイビー×ピンク / T | Noto Sans JP・ピンクポップ（明/暗対比） |

## フォルダ
- `design_handoff_d_inc/` — 株式会社D コーポレートサイト（README/DC/support.js/マスターロゴPNG）。
- `design_handoff_dmarket/` — D-market（README/SPEC/DC/support.js）。
- `design_handoff_dlogic/` — Dlogic（README/SPEC/サイト＋参考勝率の2DC/support.js/ロゴPNG）。
- `design_handoff_dlab/` — D-lab（README/SPEC/3DC/support.js/ロゴPNG）。
- `design_handoff_togel/` — Togel（README/SPEC/DC/support.js/ロゴPNG）。
- `icon-exports/` — 全ロゴPNG（1024px）: `D-inc-*` / `D-market-*` / `D-logic-*` / `D-lab-*` / `Togel-*`。
- ルートの `*.dc.html` — 各デザイン本体（ブラウザで直接開ける）:
  - `D Inc Corporate.dc.html`（法人）
  - `Dmarket.dc.html`, `D-market Icon.dc.html`, `D-logic Icon.dc.html`
  - `Dlogic Site.dc.html`, `Dlogic 参考勝率.dc.html`
  - `D-lab LP.dc.html`, `D-lab Members.dc.html`, `D-lab Auth & Apply.dc.html`
  - `Togel.dc.html`

## 開き方
各 `.dc.html` は同階層に `support.js` がある状態でブラウザで直接開ける。実装は各 `design_handoff_*` の README.md / SPEC.md を参照（会話を知らない開発者でも実装できるよう自己完結）。コーポレートサイトは Claude Code → Vercel での新規構築を想定。

## 共通ロゴDNA
ネイビータイル `#0b1f3a`（rx 11）＋ モノグラム（D / T）＋ スワイプ ">"（`M25 20l6-5m-6 5l6 5`）。マークの色だけを各プロダクトのアクセントに変える。親会社（D Inc.）はシアングラデ＝全プロダクトを束ねる色。

## 各サイトの実装リポジトリ
- D Inc.（コーポレート）: 新規（GitHubなし・Claude Code → Vercel）
- D-market: github `jinjinsansan/dmarket`
- D-swipe: github `jinjinsansan/dswipe`
- Dlogic: github `jinjinsansan/d-logic-ai-frontend`（+ `jinjinsansan/dlc`）
- D-lab: github `jinjinsansan/dlc`
- Togel: github `jinjinsansan/togel`（`web/`）
