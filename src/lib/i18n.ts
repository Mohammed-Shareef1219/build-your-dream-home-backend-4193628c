import { useLanguage } from "@/hooks/useLanguage";

/**
 * Translation dictionary — keys are the English source strings, values are the
 * Modern Standard Arabic translations. When a key is missing the source string
 * is returned unchanged, so wrapping strings in `t("...")` is always safe.
 */
const ar: Record<string, string> = {
  // ─── Navbar ───────────────────────────────────────────────
  "Home": "الرئيسية",
  "Property Types": "أنواع العقارات",
  "Design Gallery": "معرض التصاميم",
  "Listings": "القوائم",
  "Free Consultation": "استشارة مجانية",
  "Login": "تسجيل الدخول",
  "Sign up": "إنشاء حساب",
  "Sign out": "تسجيل الخروج",
  "Profile Settings": "إعدادات الملف الشخصي",
  "Favorites": "المفضلة",
  "Admin Dashboard": "لوحة تحكم المشرف",
  "Administrator": "المشرف",
  "Toggle theme": "تبديل السمة",
  "Toggle language": "تبديل اللغة",
  "Toggle menu": "قائمة",

  // ─── Footer ───────────────────────────────────────────────
  "Your digital broker for modern real estate. Design, discover, and own smarter.":
    "وسيطك الرقمي للعقارات الحديثة. صمِّم واكتشف وامتلك بذكاء.",
  "Explore": "استكشف",
  "Contact": "تواصل معنا",
  "Follow": "تابعنا",
  "About Us": "من نحن",
  "Who We Are": "من نحن",
  "Our Goal": "هدفنا",
  "Our Vision": "رؤيتنا",
  "Ambition": "طموحنا",
  "Careers": "الوظائف",
  "Join Our Team": "انضم إلى فريقنا",
  "Brokers": "الوسطاء",
  "Sales Team": "فريق المبيعات",
  "AI Engineers": "مهندسو الذكاء الاصطناعي",
  "Blog & News": "المدونة والأخبار",
  "Market Updates": "تحديثات السوق",
  "Platform News": "أخبار المنصة",
  "Agent Listings": "قوائم الوسطاء",
  "Local Prices": "الأسعار المحلية",
  "Resources": "المصادر",
  "Real Estate Guides": "أدلة العقارات",
  "Egyptian Market": "السوق المصري",
  "Valuation Tips": "نصائح التقييم",
  "Smart Budgeting": "إدارة الميزانية بذكاء",
  "Neighborhoods": "الأحياء",
  "New Cairo": "القاهرة الجديدة",
  "6 October": "السادس من أكتوبر",
  "Sheikh Zayed": "الشيخ زايد",
  "North Coast": "الساحل الشمالي",
  "Investment": "الاستثمار",
  "Legal Verification": "التحقق القانوني",
  "Rental Income": "الدخل الإيجاري",
  "Garages & Land": "الجراجات والأراضي",
  "Palm Groves": "بساتين النخيل",
  "Support": "الدعم",
  "Help Center": "مركز المساعدة",
  "How It Works": "كيف تعمل",
  "FAQ": "الأسئلة الشائعة",
  "Contact Us": "اتصل بنا",
  "How to find your dream property": "كيف تجد عقار أحلامك",
  "Create Account": "إنشاء حساب",
  "Browse Listings": "تصفح القوائم",
  "Schedule a Tour": "احجز جولة",
  "Close the Deal": "أتمِم الصفقة",
  "Step": "الخطوة",
  "Book Free Consultation": "احجز استشارة مجانية",
  "Book Now": "احجز الآن",
  "Get free expert advice within 24 hours. Our team combines AI with real human support to guide you.":
    "احصل على استشارة مجانية من خبرائنا خلال 24 ساعة. فريقنا يجمع بين الذكاء الاصطناعي والدعم البشري ليكون دليلك.",
  "Verified listings with transparent pricing and no hidden fees.":
    "قوائم موثوقة بأسعار شفافة ودون أي رسوم خفية.",
  "Best market deals with zero hidden commissions.":
    "أفضل عروض السوق دون أي عمولات خفية.",
  "© 2026 BuildYourHome. All rights reserved.":
    "© 2026 BuildYourHome. جميع الحقوق محفوظة.",
  "Privacy Policy": "سياسة الخصوصية",
  "Terms of Service": "شروط الخدمة",
  "Cookie Policy": "سياسة ملفات تعريف الارتباط",

  // ─── Hero / Home ──────────────────────────────────────────
  "Smart real estate marketing": "التسويق العقاري الذكي",
  "Find Your Dream Property Smartly.": "اعثر على عقار أحلامك بذكاء.",
  "Know the market value in a minute.": "اعرف قيمته السوقية في دقيقة.",
  "From 80m² to 300m² — villa, apartment, or commercial space. Make it yours in a few simple steps.":
    "من 80 مترًا إلى 300 متر مربع — فيلا أو شقة أو مساحة تجارية. امتلكها بخطوات بسيطة.",
  "Browse Properties": "تصفح العقارات",
  "Curated Listings": "قوائم مختارة بعناية",
  "Hand-picked properties across every style and budget.":
    "عقارات مختارة بعناية تناسب كل الأذواق والميزانيات.",
  "Trusted Broker": "وسيط موثوق",
  "Verified listings with transparent pricing.":
    "قوائم موثقة بأسعار شفافة.",
  "Fast Consultation": "استشارة سريعة",
  "Free expert advice within 24 hours.":
    "استشارة مجانية من خبرائنا خلال 24 ساعة.",
  "Brokers + programmers, powered by": "وسطاء ومبرمجون مدعومون بـ",
  "Technology": "التكنولوجيا",
  "We are a team of real estate experts and programmers specializing in transforming your property search into a fast and smart experience, using the latest":
    "نحن فريق من خبراء العقارات والمبرمجين، متخصصون في تحويل رحلة البحث عن عقارك إلى تجربة سريعة وذكية باستخدام أحدث",
  "artificial intelligence technologies": "تقنيات الذكاء الاصطناعي",
  "Make buying, selling, or renting your property easier, faster, and clearer than ever before.":
    "أن نجعل شراء أو بيع أو تأجير عقارك أسهل وأسرع وأوضح من أي وقت مضى.",
  "A future where everyone can find their perfect property effortlessly.":
    "مستقبل يجد فيه كل شخص عقاره المثالي بسهولة تامة.",
  "Vision for the Future": "رؤية للمستقبل",
  "Integrity of brokers, speed of technology — for everyone.":
    "نزاهة الوسطاء وسرعة التكنولوجيا — للجميع.",
  "Our Aspiration": "طموحنا",
  "The leading Arab platform for smart real estate marketing in minutes.":
    "المنصة العربية الرائدة في التسويق العقاري الذكي خلال دقائق.",
  "Choose from a variety of verified properties and styles.":
    "اختر من بين تشكيلة واسعة من العقارات والتصاميم الموثقة.",
  "Villas": "فيلات",
  "Luxurious and modern villas with spacious areas in prime locations.":
    "فيلات فاخرة وعصرية بمساحات واسعة في أرقى المواقع.",
  "Apartments": "شقق",
  "Practical and beautiful apartments of every size for families and individuals.":
    "شقق أنيقة وعملية بمختلف المساحات تناسب العائلات والأفراد.",
  "Commercial Properties": "عقارات تجارية",
  "Innovative spaces for shops, offices, and businesses.":
    "مساحات مبتكرة للمحلات والمكاتب وأنشطة الأعمال.",
  "Property Gallery": "معرض العقارات",
  "Get inspired by high-quality virtual tours of our properties.":
    "استلهم من جولات افتراضية عالية الجودة داخل عقاراتنا.",
  "Open gallery": "افتح المعرض",
  "Real Estate Tips": "نصائح عقارية",
  "Learn from our experts the best practices in buying and investing in real estate.":
    "تعلم من خبرائنا أفضل الممارسات في شراء العقارات والاستثمار فيها.",
  "Choosing Property Location": "اختيار موقع العقار",
  "The right location maximizes investment value. Study the neighborhood and future growth carefully.":
    "الموقع المناسب يُضاعف قيمة استثمارك. ادرس الحي وآفاق النمو المستقبلية بعناية.",
  "Market Valuation": "التقييم السوقي",
  "Set a realistic budget and check market prices to get the best deal without overpaying.":
    "حدّد ميزانية واقعية وتحقق من أسعار السوق لتحصل على أفضل صفقة دون مبالغة.",
  "Ensure all property documents and ownership titles are clear and legally sound.":
    "تأكد أن جميع وثائق العقار وسندات الملكية واضحة وسليمة قانونيًا.",
  "Featured Properties": "عقارات مميزة",
  "Hand-picked homes ready to view.": "عقارات مختارة جاهزة للمعاينة.",
  "View all": "عرض الكل",
  "No properties listed yet.": "لا توجد عقارات مضافة بعد.",
  "Add your first property": "أضف عقارك الأول",
  "Start Searching": "ابدأ البحث",
  "Follow these simple steps to find your dream property.":
    "اتبع هذه الخطوات البسيطة للعثور على عقار أحلامك.",
  "Create your personal account on our platform.":
    "أنشئ حسابك الشخصي على منصتنا.",
  "Explore the property gallery and use smart filters.":
    "استكشف معرض العقارات واستخدم أدوات التصفية الذكية.",
  "Book a physical or virtual tour with our experts.":
    "احجز جولة حقيقية أو افتراضية مع خبرائنا.",
  "Get full legal support to complete your purchase safely.":
    "احصل على دعم قانوني كامل لإتمام عملية الشراء بأمان.",
  "Client Consultation": "استشارة العملاء",
  "Our team combines artificial intelligence with real human support to guide you through every step of your real estate journey.":
    "يجمع فريقنا بين الذكاء الاصطناعي والدعم البشري ليرافقك في كل خطوة من رحلتك العقارية.",
  "Personalized Support": "دعم شخصي",
  "Real brokers ready to help you at every step — completely free of charge.":
    "وسطاء حقيقيون مستعدون لمساعدتك في كل خطوة — بشكل مجاني تمامًا.",
  "Smart Valuation": "تقييم ذكي",
  "Answer simple questions and receive property recommendations that speak to your style and budget.":
    "أجب عن أسئلة بسيطة واحصل على ترشيحات عقارية تتناسب مع ذوقك وميزانيتك.",
  "Price Transparency": "شفافية الأسعار",
  "No hidden fees. Real-time market prices for all properties.":
    "لا رسوم خفية. أسعار سوقية لحظية لجميع العقارات.",
  "Why Choose Us?": "لماذا تختارنا؟",
  "Because we're truly different. We combine Technology with human expertise for your perfect real estate experience.":
    "لأننا حقًا مختلفون. نمزج التكنولوجيا بخبرة بشرية لنقدم لك تجربة عقارية مثالية.",
  "Technology-Powered": "مدعومة بالتكنولوجيا",
  "Latest artificial intelligence for accurate property matching.":
    "أحدث تقنيات الذكاء الاصطناعي لمطابقة العقارات بدقة.",
  "Human Support": "دعم بشري",
  "Real certified experts to guide you personally.":
    "خبراء معتمدون حقيقيون يقدمون لك الإرشاد الشخصي.",
  "Save Time": "وفّر الوقت",
  "Find your perfect property in minutes, not weeks.":
    "اعثر على عقارك المثالي في دقائق لا أسابيع.",
  "Save Money": "وفّر المال",
  "Unique Experience": "تجربة فريدة",
  "Simple interface anyone can use.":
    "واجهة بسيطة يستطيع الجميع استخدامها.",
  "Verified Listings": "قوائم موثقة",
  "Properties of all sizes with full price transparency and free consultation.":
    "عقارات بجميع المساحات مع شفافية كاملة في الأسعار واستشارة مجانية.",
  "\"You won't find all of this anywhere else, because we work to achieve one goal: for you to invest or buy your dream property with confidence, without wasting time or money.\"":
    "«لن تجد كل هذا في مكان آخر، لأننا نعمل من أجل هدف واحد: أن تستثمر أو تشتري عقار أحلامك بثقة، دون إهدار للوقت أو المال.»",
  "Get a free consultation from our experts to help you find your dream property.":
    "احصل على استشارة مجانية من خبرائنا لمساعدتك في العثور على عقار أحلامك.",

  // ─── About page ───────────────────────────────────────────
  "About": "من نحن",
  "Brokers + programmers, powered by technology. We are a team of real estate experts and programmers specializing in transforming your property search into a fast and smart experience, using the latest artificial intelligence technologies.":
    "وسطاء ومبرمجون مدعومون بالتكنولوجيا. نحن فريق من خبراء العقارات والمبرمجين، متخصصون في تحويل رحلة البحث عن عقارك إلى تجربة سريعة وذكية باستخدام أحدث تقنيات الذكاء الاصطناعي.",

  // ─── Blog page ────────────────────────────────────────────
  "Latest real estate updates": "أحدث التحديثات العقارية",
  "Latest real estate updates and platform news.":
    "أحدث التحديثات العقارية وأخبار المنصة.",

  // ─── Support page ─────────────────────────────────────────
  "How to use our simple interface": "كيفية استخدام واجهتنا البسيطة",
  "WhatsApp": "واتساب",
  "Telegram": "تليجرام",
  "Email": "البريد الإلكتروني",
  "Tap to chat instantly.": "اضغط للدردشة الفورية.",
  "Send us a Telegram message.": "أرسل لنا رسالة عبر تليجرام.",
  "Reply within 24 hours.": "نرد خلال 24 ساعة.",

  // ─── Contact page ─────────────────────────────────────────
  "Get in touch with our team": "تواصل مع فريقنا",
  "Send Message": "إرسال الرسالة",
  "Full Name": "الاسم الكامل",
  "Phone": "الهاتف",
  "Message": "الرسالة",

  // ─── Careers page ─────────────────────────────────────────
  "We're hiring": "نحن نوظّف",
  "Join a team where brokers and engineers build the future of real estate together.":
    "انضم إلى فريق يبني فيه الوسطاء والمهندسون مستقبل العقارات معًا.",
  "Apply Now": "قدّم الآن",

  // ─── Common ───────────────────────────────────────────────
  "Loading…": "جارٍ التحميل…",
  "Save": "حفظ",
  "Cancel": "إلغاء",
  "Search": "بحث",
  "Submit": "إرسال",
  "Back": "رجوع",
  "Next": "التالي",
  "Previous": "السابق",
  "Change Picture": "تغيير الصورة",
  "Language": "اللغة",
  "Theme": "السمة",
  "Dark": "داكن",
  "Light": "فاتح",
  "English": "الإنجليزية",
  "Arabic": "العربية",
};

/**
 * Translate a source string. Returns the Arabic translation when the current
 * language is Arabic and a translation exists; otherwise returns the source.
 */
export function useT() {
  const { lang } = useLanguage();
  return (en: string): string => (lang === "ar" && ar[en]) || en;
}
