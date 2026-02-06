import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <Image
              src="/logo.jpeg"
              alt="نذيرة - Nathirah"
              width={100}
              height={40}
              className="h-12 w-auto rounded brightness-150"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              خدمة ذكية للتنبؤ بعودة مرض سرطان الثدي من خلال تحليل صور الأشعة باستخدام تقنيات الذكاء الاصطناعي المتقدمة.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg mb-2">روابط سريعة</h3>
            <Link href="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
              الرئيسية
            </Link>
            <Link href="/scanner" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
              الماسح الضوئي
            </Link>
            <Link href="#how-it-works" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
              كيف يعمل
            </Link>
            <Link href="#features" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
              المميزات
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg mb-2">تواصل معنا</h3>
            <p className="text-primary-foreground/70 text-sm">info@nathirah.com</p>
            <p className="text-primary-foreground/70 text-sm">المملكة العربية السعودية</p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center">
          <p className="text-primary-foreground/50 text-xs">
            {'جميع الحقوق محفوظة'} &copy; {new Date().getFullYear()} {'نذيرة - Nathirah'}
          </p>
        </div>
      </div>
    </footer>
  )
}
