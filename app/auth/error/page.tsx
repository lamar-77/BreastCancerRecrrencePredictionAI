"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function AuthErrorContent() {
  const { t, locale } = useLanguage()
  const isRTL = locale === "ar"
  const Arrow = isRTL ? ArrowRight : ArrowLeft
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get("error")

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
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-3">
            {t("auth.errorTitle")}
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-2">
            {t("auth.errorDesc")}
          </p>
          {errorMessage && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2 mb-6">
              {errorMessage}
            </p>
          )}

          <div className="flex flex-col gap-3 mt-6">
            <Button asChild className="w-full h-12 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              <Link href="/auth/login">
                {t("auth.tryAgain")}
              </Link>
            </Button>
          </div>
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

export default function AuthErrorPage() {
  return (
    <Suspense>
      <AuthErrorContent />
    </Suspense>
  )
}
