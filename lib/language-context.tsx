"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Locale = "ar" | "en"

interface LanguageContextType {
  locale: Locale
  dir: "rtl" | "ltr"
  toggleLocale: () => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  ar: {
    // Navbar
    "nav.home": "الرئيسية",
    "nav.howItWorks": "كيف يعمل",
    "nav.features": "المميزات",
    "nav.startScan": "ابدأ الفحص",
    "nav.menu": "القائمة",

    // Hero
    "hero.badge": "تقنية الذكاء الاصطناعي",
    "hero.title1": "اكتشفي مبكرًا،",
    "hero.title2": "اطمئني دائمًا",
    "hero.description": "نذيرة تستخدم أحدث تقنيات الذكاء الاصطناعي لتحليل صور أشعة الثدي والتنبؤ باحتمالية عودة المرض، لنمنحك الاطمئنان والرعاية التي تستحقينها.",
    "hero.cta": "ابدأي الفحص الآن",
    "hero.secondary": "كيف يعمل؟",
    "hero.privacy": "خصوصية تامة",
    "hero.ai": "ذكاء اصطناعي متقدم",

    // How it works
    "hiw.badge": "الخطوات",
    "hiw.title": "كيف يعمل نذيرة؟",
    "hiw.subtitle": "ثلاث خطوات بسيطة تفصلك عن الاطمئنان",
    "hiw.step1.title": "رفع الصورة",
    "hiw.step1.desc": "قومي برفع صورة أشعة الثدي (الماموغرام) من جهازك بسهولة وأمان.",
    "hiw.step2.title": "تحليل ذكي",
    "hiw.step2.desc": "يقوم نظام الذكاء الاصطناعي بتحليل الصورة باستخدام نماذج تعلم عميق متقدمة.",
    "hiw.step3.title": "استلام النتيجة",
    "hiw.step3.desc": "تحصلين على تقرير مفصل بنتيجة التحليل ونسبة احتمالية عودة المرض.",

    // Features
    "feat.badge": "المميزات",
    "feat.title": "لماذا تختارين نذيرة؟",
    "feat.subtitle": "نوفر لك تجربة طبية ذكية تجمع بين الدقة والسرعة والخصوصية",
    "feat.1.title": "تحليل دقيق للأشعة",
    "feat.1.desc": "تقنية مسح متقدمة تعتمد على الذكاء الاصطناعي لتحليل صور أشعة الثدي بدقة عالية.",
    "feat.2.title": "نتائج سريعة",
    "feat.2.desc": "احصلي على نتائج التحليل خلال ثوانٍ معدودة بعد رفع الصورة مباشرة.",
    "feat.3.title": "خصوصية وأمان",
    "feat.3.desc": "بياناتك وصورك الطبية محمية بأعلى معايير الأمان والخصوصية.",
    "feat.4.title": "دعم صحي متكامل",
    "feat.4.desc": "تقارير تفصيلية تساعدك وطبيبك في اتخاذ القرارات الصحية المناسبة.",

    // CTA
    "cta.title": "صحتك أولويتنا",
    "cta.desc": "لا تترددي في استخدام نذيرة للاطمئنان على صحتك. الكشف المبكر هو أفضل وسيلة للوقاية والعلاج.",
    "cta.button": "ابدأي الفحص الآن",

    // Footer
    "footer.desc": "خدمة ذكية للتنبؤ بعودة مرض سرطان الثدي من خلال تحليل صور الأشعة باستخدام تقنيات الذكاء الاصطناعي المتقدمة.",
    "footer.links": "روابط سريعة",
    "footer.scanner": "الماسح الضوئي",
    "footer.contact": "تواصل معنا",
    "footer.country": "المملكة العربية السعودية",
    "footer.rights": "جميع الحقوق محفوظة",

    // Scanner
    "scan.badge": "الماسح الذكي",
    "scan.title": "تحليل صورة أشعة الثدي",
    "scan.desc": "قومي برفع صورة الماموغرام وسيقوم نظامنا الذكي بتحليلها والتنبؤ باحتمالية عودة المرض",
    "scan.dragDrop": "اسحبي الصورة هنا أو اضغطي للرفع",
    "scan.formats": "يدعم صيغ PNG, JPG, DICOM",
    "scan.upload": "رفع صورة الأشعة",
    "scan.remove": "حذف الصورة",
    "scan.disclaimer": "هذا التحليل للأغراض التوعوية فقط ولا يغني عن استشارة الطبيب المختص. يرجى مراجعة طبيبك للحصول على تشخيص دقيق.",
    "scan.analyze": "تحليل الصورة",
    "scan.analyzing": "جاري التحليل...",

    // Results
    "res.badge": "نتيجة التحليل",
    "res.title": "تقرير تحليل الأشعة",
    "res.riskLevel": "مستوى الخطورة:",
    "res.probability": "نسبة الاحتمالية",
    "res.date": "تاريخ التحليل",
    "res.analyzedBy": "تم التحليل بواسطة نظام نذيرة الذكي",
    "res.recommendations": "التوصيات",
    "res.reminder": "تذكري دائمًا أن هذا التحليل هو أداة مساعدة ولا يغني عن التشخيص الطبي المتخصص. صحتك تستحق أفضل رعاية.",
    "res.newScan": "تحليل صورة جديدة",
    "res.backHome": "العودة للرئيسية",
    "res.low": "منخفض",
    "res.medium": "متوسط",
    "res.high": "مرتفع",
    "res.low.msg": "النتائج تشير إلى احتمالية منخفضة لعودة المرض. هذا مؤشر إيجابي.",
    "res.medium.msg": "النتائج تشير إلى احتمالية متوسطة تستدعي المتابعة الطبية.",
    "res.high.msg": "النتائج تشير إلى احتمالية مرتفعة تستدعي اهتمامًا طبيًا فوريًا.",
    "res.low.rec": "ننصح بالاستمرار في المتابعة الدورية مع طبيبك المختص وإجراء الفحوصات الروتينية حسب الجدول الموصى به.",
    "res.medium.rec": "ننصح بشدة بمراجعة طبيبك المختص لمناقشة النتائج وتحديد خطة متابعة مناسبة. قد تحتاجين لفحوصات إضافية.",
    "res.high.rec": "يرجى التواصل مع طبيبك المختص في أقرب وقت لمناقشة النتائج والخطوات التالية. لا تترددي في طلب المساعدة الطبية.",

    // Auth
    "auth.login": "تسجيل الدخول",
    "auth.signUp": "إنشاء حساب",
    "auth.loginTitle": "تسجيل الدخول",
    "auth.loginDesc": "أدخلي بريدك الإلكتروني وكلمة المرور للدخول",
    "auth.signUpTitle": "إنشاء حساب جديد",
    "auth.signUpDesc": "أنشئي حسابك للبدء في استخدام نذيرة",
    "auth.email": "البريد الإلكتروني",
    "auth.emailPlaceholder": "example@email.com",
    "auth.password": "كلمة المرور",
    "auth.repeatPassword": "تأكيد كلمة المرور",
    "auth.fullName": "الاسم الكامل",
    "auth.fullNamePlaceholder": "أدخلي اسمك الكامل",
    "auth.showPassword": "إظهار كلمة المرور",
    "auth.hidePassword": "إخفاء كلمة المرور",
    "auth.loggingIn": "جاري تسجيل الدخول...",
    "auth.creatingAccount": "جاري إنشاء الحساب...",
    "auth.noAccount": "ليس لديك حساب؟",
    "auth.signUpLink": "إنشاء حساب",
    "auth.hasAccount": "لديك حساب بالفعل؟",
    "auth.loginLink": "تسجيل الدخول",
    "auth.backHome": "العودة للرئيسية",
    "auth.welcomeBack": "مرحبًا بعودتك",
    "auth.loginSubtitle": "سجلي الدخول للوصول إلى خدمة تحليل الأشعة الذكية",
    "auth.joinNathirah": "انضمي إلى نذيرة",
    "auth.signUpSubtitle": "أنشئي حسابك واستفيدي من خدمة التنبؤ بالذكاء الاصطناعي",
    "auth.passwordMismatch": "كلمتا المرور غير متطابقتين",
    "auth.passwordTooShort": "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
    "auth.genericError": "حدث خطأ، يرجى المحاولة مرة أخرى",
    "auth.successTitle": "تم التسجيل بنجاح!",
    "auth.successDesc": "تم إنشاء حسابك بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب قبل تسجيل الدخول.",
    "auth.goToLogin": "الذهاب لتسجيل الدخول",
    "auth.errorTitle": "حدث خطأ",
    "auth.errorDesc": "عذرًا، حدث خطأ أثناء المصادقة.",
    "auth.tryAgain": "حاولي مرة أخرى",
    "auth.logout": "تسجيل الخروج",
    "nav.login": "تسجيل الدخول",
    "nav.signUp": "إنشاء حساب",

    // Language
    "lang.switch": "English",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.howItWorks": "How It Works",
    "nav.features": "Features",
    "nav.startScan": "Start Scan",
    "nav.menu": "Menu",

    // Hero
    "hero.badge": "AI Technology",
    "hero.title1": "Detect Early,",
    "hero.title2": "Stay Assured",
    "hero.description": "Nathirah uses the latest AI technology to analyze breast mammogram images and predict the likelihood of cancer recurrence, giving you the peace of mind and care you deserve.",
    "hero.cta": "Start Scanning Now",
    "hero.secondary": "How it works?",
    "hero.privacy": "Full Privacy",
    "hero.ai": "Advanced AI",

    // How it works
    "hiw.badge": "Steps",
    "hiw.title": "How does Nathirah work?",
    "hiw.subtitle": "Three simple steps to peace of mind",
    "hiw.step1.title": "Upload Image",
    "hiw.step1.desc": "Upload your breast mammogram image from your device easily and securely.",
    "hiw.step2.title": "Smart Analysis",
    "hiw.step2.desc": "Our AI system analyzes the image using advanced deep learning models.",
    "hiw.step3.title": "Get Results",
    "hiw.step3.desc": "Receive a detailed report with analysis results and recurrence probability.",

    // Features
    "feat.badge": "Features",
    "feat.title": "Why Choose Nathirah?",
    "feat.subtitle": "We provide a smart medical experience combining accuracy, speed, and privacy",
    "feat.1.title": "Precise Scan Analysis",
    "feat.1.desc": "Advanced scanning technology powered by AI for highly accurate breast mammogram analysis.",
    "feat.2.title": "Fast Results",
    "feat.2.desc": "Get your analysis results within seconds after uploading your image.",
    "feat.3.title": "Privacy & Security",
    "feat.3.desc": "Your data and medical images are protected with the highest security and privacy standards.",
    "feat.4.title": "Comprehensive Health Support",
    "feat.4.desc": "Detailed reports to help you and your doctor make the right health decisions.",

    // CTA
    "cta.title": "Your Health is Our Priority",
    "cta.desc": "Don't hesitate to use Nathirah for your peace of mind. Early detection is the best way to prevent and treat.",
    "cta.button": "Start Scanning Now",

    // Footer
    "footer.desc": "An intelligent service for predicting breast cancer recurrence through AI-powered mammogram analysis.",
    "footer.links": "Quick Links",
    "footer.scanner": "Scanner",
    "footer.contact": "Contact Us",
    "footer.country": "Saudi Arabia",
    "footer.rights": "All rights reserved",

    // Scanner
    "scan.badge": "Smart Scanner",
    "scan.title": "Breast Mammogram Analysis",
    "scan.desc": "Upload your mammogram image and our smart system will analyze it to predict recurrence probability",
    "scan.dragDrop": "Drag & drop your image here or click to upload",
    "scan.formats": "Supports PNG, JPG, DICOM formats",
    "scan.upload": "Upload mammogram image",
    "scan.remove": "Remove image",
    "scan.disclaimer": "This analysis is for informational purposes only and does not replace professional medical consultation. Please consult your doctor for an accurate diagnosis.",
    "scan.analyze": "Analyze Image",
    "scan.analyzing": "Analyzing...",

    // Results
    "res.badge": "Analysis Result",
    "res.title": "Mammogram Analysis Report",
    "res.riskLevel": "Risk Level:",
    "res.probability": "Probability Score",
    "res.date": "Analysis Date",
    "res.analyzedBy": "Analyzed by Nathirah AI System",
    "res.recommendations": "Recommendations",
    "res.reminder": "Always remember that this analysis is a supportive tool and does not replace specialized medical diagnosis. Your health deserves the best care.",
    "res.newScan": "Analyze New Image",
    "res.backHome": "Back to Home",
    "res.low": "Low",
    "res.medium": "Medium",
    "res.high": "High",
    "res.low.msg": "Results indicate a low probability of recurrence. This is a positive indicator.",
    "res.medium.msg": "Results indicate a moderate probability requiring medical follow-up.",
    "res.high.msg": "Results indicate a high probability requiring immediate medical attention.",
    "res.low.rec": "We recommend continuing regular follow-ups with your specialist and routine checkups as scheduled.",
    "res.medium.rec": "We strongly recommend consulting your specialist to discuss the results and determine an appropriate follow-up plan. Additional tests may be needed.",
    "res.high.rec": "Please contact your specialist as soon as possible to discuss the results and next steps. Don't hesitate to seek medical help.",

    // Auth
    "auth.login": "Sign In",
    "auth.signUp": "Sign Up",
    "auth.loginTitle": "Sign In",
    "auth.loginDesc": "Enter your email and password to access your account",
    "auth.signUpTitle": "Create Account",
    "auth.signUpDesc": "Create your account to start using Nathirah",
    "auth.email": "Email",
    "auth.emailPlaceholder": "example@email.com",
    "auth.password": "Password",
    "auth.repeatPassword": "Confirm Password",
    "auth.fullName": "Full Name",
    "auth.fullNamePlaceholder": "Enter your full name",
    "auth.showPassword": "Show password",
    "auth.hidePassword": "Hide password",
    "auth.loggingIn": "Signing in...",
    "auth.creatingAccount": "Creating account...",
    "auth.noAccount": "Don't have an account?",
    "auth.signUpLink": "Sign up",
    "auth.hasAccount": "Already have an account?",
    "auth.loginLink": "Sign in",
    "auth.backHome": "Back to home",
    "auth.welcomeBack": "Welcome Back",
    "auth.loginSubtitle": "Sign in to access the smart mammogram analysis service",
    "auth.joinNathirah": "Join Nathirah",
    "auth.signUpSubtitle": "Create your account and benefit from AI-powered prediction",
    "auth.passwordMismatch": "Passwords do not match",
    "auth.passwordTooShort": "Password must be at least 6 characters",
    "auth.genericError": "An error occurred, please try again",
    "auth.successTitle": "Registration Successful!",
    "auth.successDesc": "Your account has been created successfully. Please check your email to confirm your account before signing in.",
    "auth.goToLogin": "Go to Sign In",
    "auth.errorTitle": "Something Went Wrong",
    "auth.errorDesc": "Sorry, an error occurred during authentication.",
    "auth.tryAgain": "Try Again",
    "auth.logout": "Sign Out",
    "nav.login": "Sign In",
    "nav.signUp": "Sign Up",

    // Language
    "lang.switch": "العربية",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ar")

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "ar" ? "en" : "ar"))
  }, [])

  const t = useCallback(
    (key: string) => {
      return translations[locale][key] || key
    },
    [locale]
  )

  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <LanguageContext.Provider value={{ locale, dir, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
