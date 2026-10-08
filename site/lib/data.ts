// 合同会社D（D LLC）コーポレートサイト — コンテンツデータ
// ※ ニュースはサンプル値。実データに差し替えてください。

export type NavLink = { label: string; en: string; href: string };

export const navLinks: NavLink[] = [
  { label: '私たちについて', en: 'ABOUT', href: '#about' },
  { label: 'プロダクト', en: 'PRODUCTS', href: '#products' },
  { label: '会社概要', en: 'COMPANY', href: '#company' },
  { label: 'ニュース', en: 'NEWS', href: '#news' },
];

export type HeroStat = { n: string; l: string };

export const heroStats: HeroStat[] = [
  { n: '6', l: 'プロダクト' },
  { n: '2026', l: '設立' },
  { n: '10K+', l: '累計ユーザー' },
  { n: '∞', l: 'つくれる可能性' },
];

export type MarqueeItem = { label: string; dot: string };

export const marquee: MarqueeItem[] = [
  { label: 'ゴリラ予想', dot: '#22b8e6' },
  { label: 'D-swipe', dot: '#36a7e6' },
  { label: 'Dlogic', dot: '#FCD535' },
  { label: 'D-lab', dot: '#e8c96a' },
  { label: 'Togel', dot: '#ff6fa5' },
  { label: 'ガチャパ', dot: '#a982ff' },
];

export type Value = { no: string; color: string; title: string; body: string };

export const values: Value[] = [
  {
    no: 'VALUE 01',
    color: 'var(--cyan)',
    title: '翻訳する',
    body: '難しい技術を、誰もが直感で使えるプロダクトへ。専門知識の壁を、私たちが引き受ける。',
  },
  {
    no: 'VALUE 02',
    color: 'var(--gold)',
    title: '正直である',
    body: '誇張も、過度な期待もあおらない。できること・できないことを、まっすぐ伝える。',
  },
  {
    no: 'VALUE 03',
    color: 'var(--pink)',
    title: '楽しくする',
    body: '学びも意思決定も、ワクワクする体験に。続けたくなる手触りを、何より大切に。',
  },
];

export type Product = {
  name: string;
  tag: string;
  mono: 'D' | 'T' | 'G';
  accent: string;
  mark: string;
  tileBg: string;
  status: string;
  desc: string;
  href: string;
};

export const products: Product[] = [
  {
    name: 'ゴリラ予想',
    tag: '予測市場',
    mono: 'G',
    accent: '#22b8e6',
    mark: '#22b8e6',
    tileBg: '#0b1f3a',
    status: '運営中',
    desc: '換金なしのポイントで遊ぶ予測市場。予想を当ててゴリラコインを貯め、景品交換とランキングで競い合う。',
    href: 'https://www.g-yoso.com',
  },
  {
    name: 'D-swipe',
    tag: 'LP生成',
    mono: 'D',
    accent: '#2a6fdb',
    mark: '#36a7e6',
    tileBg: '#0b1f3a',
    status: '運営中',
    desc: 'スワイプ型のノーコードLP生成サービス。指でめくる感覚で、伝わるランディングページを誰でも。',
    href: 'https://d-swipe.com',
  },
  {
    name: 'Dlogic',
    tag: '競馬予想AI',
    mono: 'D',
    accent: '#c9a84c',
    mark: '#FCD535',
    tileBg: '#0b1f3a',
    status: '運営中',
    desc: '独自の12項目分析で競走馬を評価する競馬予想AI。市場と同等精度の「参考勝率」を正直に提示。',
    href: 'https://www.dlogicai.in',
  },
  {
    name: 'D-lab',
    tag: 'AI開発スクール',
    mono: 'D',
    accent: '#c9a84c',
    mark: '#e8c96a',
    tileBg: '#0b1f3a',
    status: '開講準備中',
    desc: 'Claude Codeに日本語で指示するだけでWebサービスを作る、8週間のオンライン講座。',
    href: 'https://academy.dlogicai.in',
  },
  {
    name: 'Togel',
    tag: '性格診断マッチング',
    mono: 'T',
    accent: '#e0518a',
    mark: '#ff6fa5',
    tileBg: '#0b1f3a',
    status: '運営中',
    desc: 'Big Five理論ベースの24タイプ性格診断＋相性マッチング。相性の良い5名と、悪い5名を提示。',
    href: 'https://www.to-gel.com',
  },
  {
    name: 'ガチャパ',
    tag: 'オンラインガチャ',
    mono: 'G',
    accent: '#8f5cf0',
    mark: '#a982ff',
    tileBg: '#0b1f3a',
    status: '運営中',
    desc: 'ポケカ・ワンピースカードなどが当たるオンラインガチャ。確率と在庫を公開し、フェアで最高のガチャ体験を。',
    href: 'https://www.gacha-pa.com',
  },
];

export type CompanyRow = { k: string; kj: string; v: string };

export const company: CompanyRow[] = [
  { k: 'COMPANY', kj: '会社名', v: '合同会社D（D LLC）' },
  { k: 'FOUNDED', kj: '設立', v: '2026年10月' },
  { k: 'CEO', kj: '代表者', v: '代表社員 斉藤 実' },
  { k: 'BUSINESS', kj: '事業内容', v: 'AIプロダクトの企画・開発・運営（Dファミリー）' },
  { k: 'ADDRESS', kj: '所在地', v: '東京都港区赤坂4丁目8番19号 赤坂フロントタウン3階' },
  { k: 'PRODUCTS', kj: '運営サービス', v: 'ゴリラ予想 / D-swipe / Dlogic / D-lab / Togel / ガチャパ' },
  { k: 'CONTACT', kj: '連絡先', v: 'contact@d-llc.net' },
];

export type NewsItem = {
  date: string;
  cat: string;
  title: string;
  catColor: string;
  catBg: string;
};

export const news: NewsItem[] = [
  {
    date: '2026.06.20',
    cat: 'PRODUCT',
    title: 'Dlogic「参考勝率」ページをリニューアルしました',
    catColor: 'var(--gold)',
    catBg: 'rgba(201,168,76,.12)',
  },
  {
    date: '2026.05.15',
    cat: 'PRODUCT',
    title: 'D-lab 1期生の募集に向けたティザーを公開',
    catColor: 'var(--gold)',
    catBg: 'rgba(201,168,76,.12)',
  },
  {
    date: '2026.04.10',
    cat: 'COMPANY',
    title: 'ブランドロゴをDファミリーで統一しました',
    catColor: 'var(--cyan)',
    catBg: 'rgba(34,184,230,.12)',
  },
  {
    date: '2026.03.01',
    cat: 'PRODUCT',
    title: 'Togel 同性マッチング機能を追加',
    catColor: 'var(--pink)',
    catBg: 'rgba(224,81,138,.12)',
  },
];

export type FooterCol = { title: string; links: { label: string; href: string }[] };

export const footerCols: FooterCol[] = [
  {
    title: 'PRODUCTS',
    links: [
      { label: 'ゴリラ予想', href: 'https://www.g-yoso.com' },
      { label: 'D-swipe', href: 'https://d-swipe.com' },
      { label: 'Dlogic', href: 'https://www.dlogicai.in' },
      { label: 'D-lab', href: 'https://academy.dlogicai.in' },
      { label: 'Togel', href: 'https://www.to-gel.com' },
      { label: 'ガチャパ', href: 'https://www.gacha-pa.com' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: '私たちについて', href: '#about' },
      { label: '会社概要', href: '#company' },
      { label: 'ニュース', href: '#news' },
      { label: '採用', href: '#contact' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'プライバシーポリシー', href: '#' },
      { label: '利用規約', href: '#' },
      { label: '特定商取引法', href: '#' },
    ],
  },
];

export const contactTopics = ['協業・取材', '採用', 'プロダクト', 'その他'];
