"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { User, LogOut, ArrowRight, ArrowLeft } from "lucide-react"

export default function AccountPage() {
  const { t, locale } = useLanguage()
  const { user, isLoggedIn, signOut } = useAuth()
  const router = useRouter()
  const isRTL = locale === "ar"
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  if (!isLoggedIn || !user) {
    return (
      <main>
        <Navbar />
        <section className="min-h-screen py-24 bg-background">
          <div className="max-w-xl mx-auto px-6">
            <div className="bg-card rounded-2xl border border-border p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {t("account.signInRequired")}
              </h2>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity mt-6"
              >
                {t("auth.login")}
                <Arrow className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      <section className="min-h-screen py-24 bg-background">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <User className="w-4 h-4" />
              <span>{t("account.badge")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              {t("account.title")}
            </h1>
            <p className="mt-4 text-foreground/60 max-w-md mx-auto leading-relaxed">
              {t("account.subtitle")}
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-8 space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground/70 block mb-2">
                  {t("account.name")}
                </label>
                <p className="text-foreground font-medium">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground/70 block mb-2">
                  {t("account.email")}
                </label>
                <p className="text-foreground font-medium">{user.email}</p>
              </div>
            </div>
            <div className="border-t border-border p-6 bg-muted/30">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <LogOut className="w-4 h-4" />
                {t("account.signOut")}
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
