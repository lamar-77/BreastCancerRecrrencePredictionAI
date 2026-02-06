import { ScanLine, ShieldCheck, Clock, HeartPulse } from "lucide-react"

const features = [
  {
    icon: ScanLine,
    title: "تحليل دقيق للأشعة",
    description: "تقنية مسح متقدمة تعتمد على الذكاء الاصطناعي لتحليل صور أشعة الثدي بدقة عالية.",
  },
  {
    icon: Clock,
    title: "نتائج سريعة",
    description: "احصلي على نتائج التحليل خلال ثوانٍ معدودة بعد رفع الصورة مباشرة.",
  },
  {
    icon: ShieldCheck,
    title: "خصوصية وأمان",
    description: "بياناتك وصورك الطبية محمية بأعلى معايير الأمان والخصوصية.",
  },
  {
    icon: HeartPulse,
    title: "دعم صحي متكامل",
    description: "تقارير تفصيلية تساعدك وطبيبك في اتخاذ القرارات الصحية المناسبة.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-wide">المميزات</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground text-balance">
            لماذا تختارين نذيرة؟
          </h2>
          <p className="mt-4 text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            نوفر لك تجربة طبية ذكية تجمع بين الدقة والسرعة والخصوصية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-background border border-border rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
