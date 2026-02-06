import { Upload, Cpu, FileText } from "lucide-react"

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "رفع الصورة",
    description: "قومي برفع صورة أشعة الثدي (الماموغرام) من جهازك بسهولة وأمان.",
  },
  {
    icon: Cpu,
    number: "02",
    title: "تحليل ذكي",
    description: "يقوم نظام الذكاء الاصطناعي بتحليل الصورة باستخدام نماذج تعلم عميق متقدمة.",
  },
  {
    icon: FileText,
    number: "03",
    title: "استلام النتيجة",
    description: "تحصلين على تقرير مفصل بنتيجة التحليل ونسبة احتمالية عودة المرض.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-wide">الخطوات</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground text-balance">
            كيف يعمل نذيرة؟
          </h2>
          <p className="mt-4 text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            ثلاث خطوات بسيطة تفصلك عن الاطمئنان
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-foreground/60 leading-relaxed max-w-sm">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] -translate-x-1/2">
                  <div className="w-full h-full border-t-2 border-dashed border-primary/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
