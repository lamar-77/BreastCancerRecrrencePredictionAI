"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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
            الرئيسية
          </Link>
          <Link href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
            كيف يعمل
          </Link>
          <Link href="#features" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
            المميزات
          </Link>
          <Link
            href="/scanner"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            ابدأ الفحص
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="القائمة"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-primary transition-colors font-medium">
            الرئيسية
          </Link>
          <Link href="#how-it-works" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-primary transition-colors font-medium">
            كيف يعمل
          </Link>
          <Link href="#features" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-primary transition-colors font-medium">
            المميزات
          </Link>
          <Link
            href="/scanner"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity text-center"
          >
            ابدأ الفحص
          </Link>
        </div>
      )}
    </nav>
  )
}
