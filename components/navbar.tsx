"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, toggleLocale, locale } = useLanguage()
  const isRTL = locale === "ar"

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="نذيرة - Nathirah"
            width={120}
            height={48}
            className="h-10 w-auto rounded"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
            {t("nav.home")}
          </Link>
          <Link href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
            {t("nav.howItWorks")}
          </Link>
          <Link href="#features" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
            {t("nav.features")}
          </Link>
          <button
            type="button"
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-foreground/70 hover:text-primary transition-colors text-sm font-medium"
            aria-label="Switch language"
          >
            <Globe className="w-4 h-4" />
            {t("lang.switch")}
          </button>
          <Link
            href="/scanner"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {t("nav.startScan")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label={t("nav.menu")}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-primary transition-colors font-medium">
            {t("nav.home")}
          </Link>
          <Link href="#how-it-works" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-primary transition-colors font-medium">
            {t("nav.howItWorks")}
          </Link>
          <Link href="#features" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-primary transition-colors font-medium">
            {t("nav.features")}
          </Link>
          <button
            type="button"
            onClick={() => { toggleLocale(); setIsOpen(false) }}
            className="flex items-center gap-1.5 text-foreground/70 hover:text-primary transition-colors font-medium"
          >
            <Globe className="w-4 h-4" />
            {t("lang.switch")}
          </button>
          <Link
            href="/scanner"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity text-center"
          >
            {t("nav.startScan")}
          </Link>
        </div>
      )}
    </nav>
  )
}
