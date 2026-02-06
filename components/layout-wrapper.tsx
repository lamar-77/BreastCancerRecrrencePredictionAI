"use client"

import { useEffect, type ReactNode } from "react"
import { useLanguage } from "@/lib/language-context"

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const { locale, dir } = useLanguage()

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  return <>{children}</>
}
