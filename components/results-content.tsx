"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  FileText,
  Calendar,
  Activity,
  Stethoscope,
  Heart,
} from "lucide-react"

type RiskLevel = "low" | "medium" | "high"

const riskConfig: Record<
  RiskLevel,
  {
    label: string
    color: string
    bgColor: string
    borderColor: string
    icon: typeof ShieldCheck
    message: string
    recommendation: string
  }
> = {
  low: {
    label: "منخفض",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: ShieldCheck,
    message: "النتائج تشير إلى احتمالية منخفضة لعودة المرض. هذا مؤشر إيجابي.",
    recommendation:
      "ننصح بالاستمرار في المتابعة الدورية مع طبيبك المختص وإجراء الفحوصات الروتينية حسب الجدول الموصى به.",
  },
  medium: {
    label: "متوسط",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: AlertTriangle,
    message: "النتائج تشير إلى احتمالية متوسطة تستدعي المتابعة الطبية.",
    recommendation:
      "ننصح بشدة بمراجعة طبيبك المختص لمناقشة النتائج وتحديد خطة متابعة مناسبة. قد تحتاجين لفحوصات إضافية.",
  },
  high: {
    label: "مرتفع",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: XCircle,
    message: "النتائج تشير إلى احتمالية مرتفعة تستدعي اهتمامًا طبيًا فوريًا.",
    recommendation:
      "يرجى التواصل مع طبيبك المختص في أقرب وقت لمناقشة النتائج والخطوات التالية. لا تترددي في طلب المساعدة الطبية.",
  },
}

export default function ResultsContent() {
  const searchParams = useSearchParams()
  const risk = (searchParams.get("risk") as RiskLevel) || "low"
  const score = searchParams.get("score") || "0"
  const dateStr = searchParams.get("date") || new Date().toISOString()

  const config = riskConfig[risk]
  const RiskIcon = config.icon
  const formattedDate = new Date(dateStr).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <section className="min-h-screen py-16 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            <span>نتيجة التحليل</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            تقرير تحليل الأشعة
          </h1>
        </div>

        {/* Main Result Card */}
        <div className={`rounded-2xl border-2 ${config.borderColor} ${config.bgColor} p-8 mb-8`}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className={`w-24 h-24 rounded-full ${config.bgColor} border-2 ${config.borderColor} flex items-center justify-center shrink-0`}>
              <RiskIcon className={`w-12 h-12 ${config.color}`} />
            </div>
            <div className="flex-1 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h2 className="text-2xl font-bold text-foreground">مستوى الخطورة:</h2>
                <span className={`text-2xl font-bold ${config.color}`}>{config.label}</span>
              </div>
              <p className="text-foreground/70 leading-relaxed">{config.message}</p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Score Card */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">نسبة الاحتمالية</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-primary">{score}%</span>
            </div>
            <div className="mt-4 w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          {/* Date Card */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">تاريخ التحليل</h3>
            </div>
            <p className="text-xl font-semibold text-foreground">{formattedDate}</p>
            <p className="text-foreground/50 text-sm mt-2">تم التحليل بواسطة نظام نذيرة الذكي</p>
          </div>
        </div>

        {/* Recommendation Card */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">التوصيات</h3>
          </div>
          <p className="text-foreground/70 leading-relaxed mb-6">{config.recommendation}</p>
          <div className="bg-muted/50 rounded-xl p-4 flex items-start gap-3">
            <Heart className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <p className="text-foreground/60 text-sm leading-relaxed">
              تذكري دائمًا أن هذا التحليل هو أداة مساعدة ولا يغني عن التشخيص الطبي المتخصص. صحتك تستحق أفضل رعاية.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/scanner"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-4 h-4" />
            تحليل صورة جديدة
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            العودة للرئيسية
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
