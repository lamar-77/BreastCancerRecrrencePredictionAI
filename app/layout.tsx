import React from "react"
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic, Inter } from 'next/font/google'

import './globals.css'

const _ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
})

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'نذيرة | Nathirah - التنبؤ بعودة سرطان الثدي',
  description: 'نذيرة - خدمة ذكية للتنبؤ بعودة مرض سرطان الثدي من خلال مسح صور أشعة الثدي باستخدام الذكاء الاصطناعي',
}

export const viewport: Viewport = {
  themeColor: '#5B1A3A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
