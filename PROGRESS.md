# 株式会社D（D Inc.）コーポレートサイト — 作業履歴・引き継ぎ書

最終更新: 2026-06-25 ／ 状態: **Vercelデプロイ済み・一旦中断**

---

## これまでの経緯

### 1. デザイン納品物の展開
- `dinc.zip`（約10.4MB）を `E:\dev\Cusor\dinc` 直下に展開。
- 中身は **Dファミリー姉妹サイトのデザイン納品物一式**だった。
  - 目的のコーポレートサイト = `design_handoff_d_inc/`（`D Inc Corporate.dc.html` ＋ README ＋ support.js ＋ ロゴPNG）
  - 姉妹サイト: `design_handoff_dmarket / dlogic / dlab / togel`
  - `icon-exports/`（全ロゴPNG 1024px）, `screenshots/`, 参考実装 `src/` `web/`

### 2. Next.js プロジェクト新規構築（`site/`）
`D Inc Corporate.dc.html` を **High-fidelity で忠実再現**。

- **技術**: Next.js 14 (App Router) / React 18 / TypeScript
- **方針**: デザインがインラインstyle＋CSS変数ベースのため、Tailwindを使わず
  **デザイントークンをCSS変数化**（`app/globals.css`）＋インラインstyleで再現。
- **フォント**: `next/font/google`（Noto Serif JP=見出し / Noto Sans JP=本文 / Inter=英字・数値）

#### 実装セクション（縦スクロール1ページ・10種）
ヘッダー（スクロール30pxでライト化＋色反転）/ Hero（ネイビーグラデ・フローティングドット・radial glow・統計ストリップ・流れるマーキー）/ 01 MISSION（3 VALUE）/ 02 PRODUCTS（5プロダクト横長カード）/ 03 WHY D / 04 COMPANY（会社概要テーブル）/ 05 NEWS / RECRUIT バナー / CONTACT（フォーム＋トースト）/ フッター（3カラム）

#### 検証結果
- ✅ `npm install` 成功
- ✅ `npm run build` 成功（TypeScript型チェック・静的生成すべて通過、ページ 5.43 kB）
- ✅ `npm run start` で全主要コンテンツがSSRレンダリング確認済み

### 3. GitHub プッシュ
- リポジトリ: **https://github.com/jinjinsansan/dinc**
- ブランチ: `main`
- ルート `.gitignore` で `node_modules` / `.next` / `dinc.zip`(10MB) を除外
- コミット者: jinjinsansan / goldbenchan@gmail.com

### 4. Vercel デプロイ
- **デプロイ済み**（ユーザー実施）。
- ⚠️ 重要設定: Next.jsはリポジトリ直下でなく `site/` にあるため、Vercelの
  **Root Directory = `site`** を指定する必要がある。

---

## ディレクトリ構成（`site/`）

```
site/
├ app/
│  ├ layout.tsx      フォント読込・メタデータ(SEO/OGP)・favicon
│  ├ page.tsx        全セクション組み立て（ToastProvider でラップ）
│  └ globals.css     デザイントークン(CSS変数)・keyframes・レスポンシブ
├ components/
│  ├ Header.tsx      'use client' スクロール検知で色反転
│  ├ Hero.tsx        統計ストリップ・マーキー
│  ├ Mission.tsx / Products.tsx / WhyD.tsx / Company.tsx / News.tsx
│  ├ Recruit.tsx / Contact.tsx（'use client' フォーム）/ Footer.tsx
│  ├ Logo.tsx        共通ロゴSVG＋GradientDefs（dcMasterグラデ）
│  ├ Toast.tsx       'use client' グローバルトースト(Context)
│  └ SectionHead.tsx 番号付き罫線ヘッダー(01〜05)
├ lib/data.ts        全コンテンツ一元管理
└ public/favicon.svg マスターロゴ
```

## デザイントークン（要点）
- navy `#0b1f3a` / navy-deep `#081627`（ブランド主役）
- paper `#f6f8fb`（ライト基調背景）/ surface `#fff`
- cyan `#22b8e6`（コーポレート主アクセント）/ gold `#c9a84c` / pink `#e0518a`
- 各プロダクト色: D-market `#22b8e6` / D-swipe `#36a7e6` / Dlogic `#FCD535` / D-lab `#e8c96a` / Togel `#ff6fa5`

---

## 残りのTODO（実データ差し替え）

> 納品仕様どおり、以下は**サンプル値**。実データに差し替え要。

1. **`lib/data.ts`**
   - `company`: 代表者名・所在地・設立日・連絡先（現在 `◯◯` のプレースホルダ）
   - `news`: 実ニュースに差し替え
   - `products[].href`: 各本番URL（現状 D-market のみ `https://dmarket-six.vercel.app` 設定済、他は `#products`）
2. **`components/Contact.tsx`** の `submit()`
   - 現在はトースト表示のみ（デモ）。本番はメール送信／フォームSaaS／API に結線。
3. **`app/layout.tsx`** の `metadataBase`
   - `https://d-inc.example` → 本番ドメインに変更。
4. **法務ページ**（プライバシー/利用規約/特商法）
   - フッターのLEGALリンクは現在トースト「準備中」。別ルートで作成可能な構成。

---

## 開発コマンド
```bash
cd site
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド
```

## 再開時のメモ
- このリポジトリは `E:\dev\Cusor\dinc`。実装は `site/` 配下のみ。
- ルート直下のデザイン納品物（`design_handoff_*` 等）は**参考リファレンス**。実装対象ではない。
- 次の着手候補: ①実データ差し替え ②お問い合わせフォームのバックエンド結線 ③法務ページ追加。
