import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full border-2 border-primary-foreground" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border-2 border-primary-foreground" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
          صحتك أولويتنا
        </h2>
        <p className="mt-6 text-primary-foreground/80 text-lg leading-relaxed max-w-2xl mx-auto">
          لا تترددي في استخدام نذيرة للاطمئنان على صحتك. الكشف المبكر هو أفضل وسيلة للوقاية والعلاج.
        </p>
        <Link
          href="/scanner"
          className="mt-10 inline-flex items-center gap-2 bg-primary-foreground text-primary px-10 py-4 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity"
        >
          ابدأي الفحص الآن
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}
