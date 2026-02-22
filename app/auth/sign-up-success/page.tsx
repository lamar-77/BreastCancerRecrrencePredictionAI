"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Mail, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  const { t, locale } = useLanguage()
  const isRTL = locale === "ar"
  const Arrow = isRTL ? ArrowRight : ArrowLeft

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.jpeg"
            alt="Nathirah"
            width={120}
            height={48}
            className="rounded-lg"
          />
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-3">
            {t("auth.successTitle")}
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {t("auth.successDesc")}
          </p>

          <Button asChild className="w-full h-12 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            <Link href="/auth/login">
              {t("auth.goToLogin")}
            </Link>
          </Button>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-6 text-sm font-medium"
        >
          <Arrow className="w-4 h-4" />
          {t("auth.backHome")}
        </Link>
      </div>
    </div>
  )
}
