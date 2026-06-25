export const dynamic = 'force-dynamic'

import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Noto_Sans_JP, Bebas_Neue, Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/components/providers/AuthProvider'
import MaintenanceCheck from '@/components/maintenance/MaintenanceCheck'
import ReferralCodeDetector from '@/components/common/ReferralCodeDetector'
import ReferralProcessor from '@/components/referral/ReferralProcessor'
import ReferralMonitor from '@/components/referral/ReferralMonitor'
import ReferralNotificationChecker from '@/components/referral/ReferralNotificationChecker'
import LineIntegrationHandler from '@/components/auth/LineIntegrationHandler'
import { PerformanceOptimizer } from '@/components/performance/PerformanceOptimizer'
import { ServiceWorkerManager } from '@/components/pwa/ServiceWorkerManager'
import { IS_APP_VARIANT } from '@/lib/env'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-bebas',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '競馬予想AI Dlogic - 革命的競馬予想システム',
  description: '競馬予想AI Dlogicは独自の12項目分析による科学的な競走馬評価を提供します。',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png'
  },
  manifest: '/app/manifest.json',
  openGraph: {
    title: '競馬予想AI Dlogic - 革命的競馬予想システム',
    description: '競馬予想AI Dlogicは独自の12項目分析による科学的な競走馬評価を提供します。',
    siteName: '競馬予想AI Dlogic',
    locale: 'ja_JP',
    type: 'website',
    images: ['/dlogic-og.png'],
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} ${bebasNeue.variable} ${inter.variable}`}>
        <AuthProvider>
          <PerformanceOptimizer />
          <ServiceWorkerManager />
          <MaintenanceCheck bypassForAdmin={true}>
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#181A20',
                  color: '#EAECEF',
                  border: '1px solid #2B3139',
                  borderRadius: '8px',
                  padding: '16px',
                },
                success: {
                  style: {
                    background: '#10B981',
                    color: '#fff',
                  },
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#10B981',
                  },
                },
                error: {
                  style: {
                    background: '#EF4444',
                    color: '#fff',
                  },
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#EF4444',
                  },
                },
              }}
            />
            <ReferralCodeDetector />
            <ReferralProcessor />
            <ReferralMonitor />
            <ReferralNotificationChecker />
            {/* LineIntegrationHandler removed - causing performance issues with unnecessary API calls */}
            {children}
          </MaintenanceCheck>
        </AuthProvider>
      </body>
    </html>
  )
}
