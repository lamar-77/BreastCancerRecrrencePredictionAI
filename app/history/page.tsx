"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { getScanHistory, type ScanRecord, type RiskLevel } from "@/lib/scan-history"
import {
  History,
  ScanLine,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Calendar,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"

const riskConfig: Record<
  RiskLevel,
  { color: string; bgColor: string; borderColor: string; icon: typeof ShieldCheck }
> = {
  low: {
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: ShieldCheck,
  },
  medium: {
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: AlertTriangle,
  },
  high: {
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: XCircle,
  },
}

export default function HistoryPage() {
  const { t, locale } = useLanguage()
  const isRTL = locale === "ar"
  const [scans, setScans] = useState<ScanRecord[]>([])
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    setScans(getScanHistory())
  }, [])

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (next.size < 2) {
        next.add(id)
      }
      return next
    })
  }

  const compareScans = Array.from(compareIds)
    .map((id) => scans.find((s) => s.id === id))
    .filter(Boolean) as ScanRecord[]

  const dateLocale = locale === "ar" ? "ar-SA" : "en-US"
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <main>
      <Navbar />
      <section className="min-h-screen py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <History className="w-4 h-4" />
              <span>{t("history.badge")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              {t("history.title")}
            </h1>
            <p className="mt-4 text-foreground/60 max-w-xl mx-auto leading-relaxed">
              {t("history.subtitle")}
            </p>
          </div>

          {scans.length === 0 ? (
            <div className="bg-card rounded-2xl border border-border p-16 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <ScanLine className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {t("history.empty")}
              </h2>
              <p className="text-foreground/60 mb-8 max-w-md mx-auto">
                {t("history.emptyDesc")}
              </p>
              <Link
                href="/scanner"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <ScanLine className="w-4 h-4" />
                {t("history.newScan")}
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {scans.map((scan) => {
                  const config = riskConfig[scan.risk]
                  const RiskIcon = config.icon
                  const formattedDate = new Date(scan.date).toLocaleDateString(dateLocale, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  const isSelected = compareIds.has(scan.id)

                  return (
                    <div
                      key={scan.id}
                      className={`bg-card rounded-2xl border-2 overflow-hidden transition-all ${
                        isSelected ? "border-primary ring-2 ring-primary/20" : "border-border"
                      }`}
                    >
                      <div className="relative aspect-square bg-muted">
                        <Image
                          src={scan.imageData}
                          alt="Scan"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                        <div
                          className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} flex gap-2`}
                        >
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}
                          >
                            <RiskIcon className="w-3.5 h-3.5" />
                            {t(`res.${scan.risk}`)}
                          </span>
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-background/90 text-foreground text-xs font-medium">
                            {scan.score}%
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-foreground/60 text-sm mb-3">
                          <Calendar className="w-4 h-4" />
                          {formattedDate}
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/results?risk=${scan.risk}&score=${scan.score}&date=${encodeURIComponent(scan.date)}`}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                          >
                            {t("history.viewDetails")}
                            <Arrow className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => toggleCompare(scan.id)}
                            className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                              isSelected
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border hover:border-primary/50 text-foreground/80"
                            }`}
                          >
                            {t("history.compare")}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {compareScans.length === 2 && (
                <div className="bg-card rounded-2xl border border-border p-8 mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-6">
                    {t("history.compare")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {compareScans.map((scan) => {
                      const config = riskConfig[scan.risk]
                      const RiskIcon = config.icon
                      const formattedDate = new Date(scan.date).toLocaleDateString(dateLocale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      return (
                        <div
                          key={scan.id}
                          className={`rounded-xl border-2 ${config.bgColor} ${config.borderColor} p-6`}
                        >
                          <div className="relative aspect-square rounded-lg overflow-hidden bg-background mb-4">
                            <Image
                              src={scan.imageData}
                              alt="Scan"
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-semibold ${config.color}`}>
                              {t(`res.${scan.risk}`)}
                            </span>
                            <span className="text-lg font-bold text-primary">{scan.score}%</span>
                          </div>
                          <p className="text-foreground/60 text-sm">{formattedDate}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <Link
                  href="/scanner"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <RefreshCw className="w-4 h-4" />
                  {t("history.newScan")}
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
