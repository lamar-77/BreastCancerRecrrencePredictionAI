import React from "react"
import type { Metadata, Viewport } from "next"
import { Tajawal } from "next/font/google"

import "./globals.css"

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  title: "نذيرة | Nathirah - التنبؤ بعودة سرطان الثدي",
  description:
    "نذيرة - خدمة ذكية للتنبؤ بعودة مرض سرطان الثدي من خلال مسح صور أشعة الثدي باستخدام الذكاء الاصطناعي",
}

export const viewport: Viewport = {
  themeColor: "#5B1A3A",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
