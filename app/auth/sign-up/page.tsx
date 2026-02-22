"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react"

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { t, locale } = useLanguage()
  const isRTL = locale === "ar"
  const Arrow = isRTL ? ArrowRight : ArrowLeft

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError(t("auth.passwordMismatch"))
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError(t("auth.passwordTooShort"))
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/scanner`,
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : t("auth.genericError")
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-primary">
        <div className="absolute inset-0">
          <Image
            src="/hero-medical.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 px-12 text-center">
          <Image
            src="/logo.jpeg"
            alt="Nathirah"
            width={180}
            height={72}
            className="mx-auto mb-8 rounded-lg"
          />
          <h2 className="text-3xl font-bold text-primary-foreground mb-4 text-balance">
            {t("auth.joinNathirah")}
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-md mx-auto">
            {t("auth.signUpSubtitle")}
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm font-medium"
          >
            <Arrow className="w-4 h-4" />
            {t("auth.backHome")}
          </Link>

          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Image
              src="/logo.jpeg"
              alt="Nathirah"
              width={120}
              height={48}
              className="rounded-lg"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("auth.signUpTitle")}
            </h1>
            <p className="text-muted-foreground">
              {t("auth.signUpDesc")}
            </p>
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="full-name" className="text-sm font-medium text-foreground">
                {t("auth.fullName")}
              </Label>
              <Input
                id="full-name"
                type="text"
                placeholder={t("auth.fullNamePlaceholder")}
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-12 bg-muted/50 border-border focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                {t("auth.email")}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t("auth.emailPlaceholder")}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-muted/50 border-border focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                {t("auth.password")}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-muted/50 border-border focus:border-primary focus:ring-primary pe-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 end-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="repeat-password" className="text-sm font-medium text-foreground">
                {t("auth.repeatPassword")}
              </Label>
              <div className="relative">
                <Input
                  id="repeat-password"
                  type={showRepeatPassword ? "text" : "password"}
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="h-12 bg-muted/50 border-border focus:border-primary focus:ring-primary pe-12"
                />
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="absolute top-1/2 -translate-y-1/2 end-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showRepeatPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                >
                  {showRepeatPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity mt-2"
              disabled={isLoading}
            >
              {isLoading ? t("auth.creatingAccount") : t("auth.signUp")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("auth.hasAccount")}{" "}
            <Link
              href="/auth/login"
              className="text-primary font-semibold hover:underline"
            >
              {t("auth.loginLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
