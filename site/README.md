# 株式会社D（D Inc.）コーポレートサイト

`D Inc Corporate.dc.html`（デザインハンドオフ）を Next.js 14 App Router で実装したコーポレートサイト。

## 構成
- Next.js 14 (App Router) / React 18 / TypeScript
- スタイリング: デザイントークンを CSS 変数化（`app/globals.css`）＋インラインstyle（ハンドオフ忠実再現）
- フォント: `next/font/google`（Noto Serif JP / Noto Sans JP / Inter）

## 開発
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド
```

## ディレクトリ
- `app/` — layout（フォント/メタ）, page（セクション組み立て）, globals.css
- `components/` — Header / Hero / Mission / Products / WhyD / Company / News / Recruit / Contact / Footer / Logo / Toast / SectionHead
- `lib/data.ts` — コンテンツ（ナビ・プロダクト・会社概要・ニュース等）

## 実データ差し替え（TODO）
- `lib/data.ts` の `company`（代表者・所在地・連絡先）／`news`（実ニュース）／`products[].href`（各本番URL）
- `components/Contact.tsx` の `submit()` をメール送信 / フォームSaaS / API に結線
- `app/layout.tsx` の `metadataBase` を本番ドメインに

## デプロイ（Vercel）
リポジトリ直下ではなく `site/` がプロジェクトルート。Vercel の **Root Directory** を `site` に設定。
