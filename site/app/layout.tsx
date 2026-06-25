import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP, Noto_Serif_JP, Inter } from 'next/font/google';
import './globals.css';

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--sans',
  display: 'swap',
});

const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://d-inc.example'),
  title: '株式会社D（D Inc.）— AIで、個人の「できる」を増やす。',
  description:
    'AIで個人の「できる」を増やすプロダクトスタジオ。予測市場・競馬予想AI・性格診断・ノーコード開発教育まで、プロダクト群「Dファミリー」を企画・開発・運営しています。',
  keywords: ['株式会社D', 'D Inc.', 'AI', 'Dファミリー', 'D-market', 'Dlogic', 'D-lab', 'Togel', 'D-swipe'],
  openGraph: {
    title: '株式会社D（D Inc.）— AIで、個人の「できる」を増やす。',
    description: 'AIで個人の「できる」を増やすプロダクトスタジオ。Dファミリーを企画・開発・運営。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'D Inc.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社D（D Inc.）',
    description: 'AIで個人の「できる」を増やすプロダクトスタジオ。',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b1f3a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSans.variable} ${notoSerif.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
