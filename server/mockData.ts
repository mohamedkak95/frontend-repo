import { Package, PackageResponse } from "../shared/schema";

// Mock data for Egyptian telecom packages - based on user's provided data format
const mockPackages: Package[] = [
  {
    _id: "67de5050fedc61f0b5b5ce8f",
    id: 1,
    name: "باقة فودافون فليكس 30",
    provider: "vodafone",
    type: "mobile",
    price: 30,
    description: "استمتع بباقة فودافون فليكس 30 واحصل على 1000 وحدة فليكس تقدر تستخدمها في المكالمات أو الإنترنت أو الرسائل",
    features: {
      "الإنترنت": "تصفح بسرعة 4G",
      "المكالمات": "دقائق لكل الشبكات",
      "الرسائل": "رسائل لكل الشبكات",
      "المميزات": "احصل على رصيد مضاعف عند التجديد"
    },
    validity: "30 يوم",
    imageUrl: "/images/vodafone-logo.svg",
    isPopular: true,
    isNew: false,
    isSpecial: false,
    howToSubscribe: "اتصل بـ *880# واتبع التعليمات أو من خلال تطبيق أنا فودافون",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. الباقة متاحة لعملاء الفاتورة والكارت."
  },
  {
    _id: "67de5051fedc61f0b5b5ce90",
    id: 2,
    name: "باقة اورنج جو 100",
    provider: "orange",
    type: "mobile",
    price: 100,
    description: "باقة اورنج جو 100 توفر لك 10 جيجابايت انترنت و200 دقيقة لكل الشبكات ورسائل غير محدودة",
    features: {
      "الإنترنت": "10 جيجابايت انترنت",
      "المكالمات": "200 دقيقة لكل الشبكات",
      "الرسائل": "رسائل غير محدودة",
      "الترفيه": "استمتع بمشاهدة الفيديوهات بدون عد ميجابايت على يوتيوب و واتش ات"
    },
    validity: "30 يوم",
    imageUrl: "/images/orange-logo.svg",
    isPopular: true,
    isNew: true,
    isSpecial: false,
    howToSubscribe: "اتصل بـ *3030# أو من خلال تطبيق اورنج",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. بعد استهلاك الباقة، سيتم تطبيق التعريفة العادية."
  },
  {
    _id: "67de5052fedc61f0b5b5ce91",
    id: 3,
    name: "باقة اتصالات سوبر 150",
    provider: "etisalat",
    type: "mobile",
    price: 150,
    description: "احصل على 15 جيجابايت انترنت و300 دقيقة و300 رسالة مع باقة اتصالات سوبر 150",
    features: {
      "الإنترنت": "15 جيجابايت انترنت بسرعة 4G",
      "المكالمات": "300 دقيقة لكل الشبكات",
      "الرسائل": "300 رسالة",
      "التواصل الاجتماعي": "استخدام لا محدود لمواقع التواصل الاجتماعي"
    },
    validity: "30 يوم",
    imageUrl: "/images/etisalat-logo.svg",
    isPopular: false,
    isNew: false,
    isSpecial: true,
    howToSubscribe: "اتصل بـ *566# أو من خلال تطبيق اتصالات",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. الاستخدام اللامحدود خاضع لسياسة الاستخدام العادل."
  },
  {
    _id: "67de5053fedc61f0b5b5ce92",
    id: 4,
    name: "باقة وي انترنت 200",
    provider: "we",
    type: "internet",
    price: 200,
    description: "باقة انترنت غير محدودة من وي بسرعات فائقة تصل إلى 4G+. استمتع بتصفح سريع وتحميل ومشاهدة بدون انقطاع",
    features: {
      "الإنترنت": "انترنت غير محدود",
      "السرعة": "سرعات تصل إلى 4G+",
      "الربط": "خاصية الربط متاحة",
      "المزايا": "اشتراك مجاني في خدمة واتش ات"
    },
    validity: "30 يوم",
    imageUrl: "/images/we-logo.svg",
    isPopular: false,
    isNew: true,
    isSpecial: true,
    howToSubscribe: "اتصل بـ *999# أو من خلال تطبيق وي",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. خدمة الانترنت غير المحدود خاضعة لسياسة الاستخدام العادل."
  },
  {
    _id: "67de5054fedc61f0b5b5ce93",
    id: 5,
    name: "باقة فودافون الشباب 60",
    provider: "vodafone",
    type: "mobile",
    price: 60,
    description: "باقة مخصصة للشباب من فودافون. 5 جيجابايت انترنت و500 دقيقة لشبكة فودافون و100 دقيقة لباقي الشبكات",
    features: {
      "الإنترنت": "5 جيجابايت انترنت",
      "المكالمات فودافون": "500 دقيقة لشبكة فودافون",
      "المكالمات الأخرى": "100 دقيقة لباقي الشبكات",
      "التواصل الاجتماعي": "استخدام مجاني لمواقع التواصل الاجتماعي"
    },
    validity: "30 يوم",
    imageUrl: "/images/vodafone-logo.svg",
    isPopular: true,
    isNew: false,
    isSpecial: false,
    howToSubscribe: "اتصل بـ *2020# أو من خلال تطبيق أنا فودافون",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. الباقة متاحة للعملاء من سن 18 إلى 25 سنة."
  },
  {
    _id: "67de5055fedc61f0b5b5ce94",
    id: 6,
    name: "باقة اورنج إكس 180",
    provider: "orange",
    type: "bundle",
    price: 180,
    description: "استمتع بـ 20 جيجابايت انترنت و500 دقيقة وباقة ترفيهية مميزة مع باقة اورنج إكس الجديدة",
    features: {
      "الإنترنت": "20 جيجابايت انترنت",
      "المكالمات": "500 دقيقة لكل الشبكات",
      "الترفيه": "اشتراك مجاني في خدمات بث الفيديو والموسيقى",
      "الترحيل": "امكانية ترحيل الميجابايت غير المستخدمة للشهر التالي"
    },
    validity: "30 يوم",
    imageUrl: "/images/orange-logo.svg",
    isPopular: false,
    isNew: true,
    isSpecial: false,
    howToSubscribe: "اتصل بـ *3535# أو من خلال تطبيق اورنج",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. الترحيل متاح فقط عند تجديد نفس الباقة."
  },
  {
    _id: "67de5056fedc61f0b5b5ce95",
    id: 7,
    name: "باقة اتصالات جو 75",
    provider: "etisalat",
    type: "mobile",
    price: 75,
    description: "باقة اتصالات جو 75 توفر لك 7 جيجابايت انترنت و150 دقيقة لكل الشبكات و150 رسالة",
    features: {
      "الإنترنت": "7 جيجابايت انترنت",
      "المكالمات": "150 دقيقة لكل الشبكات",
      "الرسائل": "150 رسالة",
      "المزايا": "تطبيقات التواصل الاجتماعي غير محدودة"
    },
    validity: "30 يوم",
    imageUrl: "/images/etisalat-logo.svg",
    isPopular: true,
    isNew: false,
    isSpecial: false,
    howToSubscribe: "اتصل بـ *688# أو من خلال تطبيق اتصالات",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة."
  },
  {
    _id: "67de5057fedc61f0b5b5ce96",
    id: 8,
    name: "باقة وي الأساسية 110",
    provider: "we",
    type: "mobile",
    price: 110,
    description: "باقة وي الأساسية توفر لك 15 جيجابايت انترنت و400 دقيقة لكل الشبكات",
    features: {
      "الإنترنت": "15 جيجابايت انترنت",
      "المكالمات": "400 دقيقة لكل الشبكات",
      "الرسائل": "100 رسالة",
      "المزايا الإضافية": "دقائق وانترنت إضافي بنصف السعر"
    },
    validity: "30 يوم",
    imageUrl: "/images/we-logo.svg",
    isPopular: true,
    isNew: false,
    isSpecial: false,
    howToSubscribe: "اتصل بـ *111# أو من خلال تطبيق وي",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة."
  },
  {
    _id: "67de5058fedc61f0b5b5ce97",
    id: 9,
    name: "باقة فودافون ريد 350",
    provider: "vodafone",
    type: "bundle",
    price: 350,
    description: "باقة فودافون ريد الشاملة مع 40 جيجابايت انترنت ومكالمات لا محدودة لشبكة فودافون و1000 دقيقة للشبكات الأخرى",
    features: {
      "الإنترنت": "40 جيجابايت انترنت",
      "المكالمات فودافون": "غير محدودة",
      "المكالمات الأخرى": "1000 دقيقة",
      "الرسائل": "رسائل غير محدودة",
      "المزايا": "خدمة فودافون TV وڤودافون ميوزيك مجاناً"
    },
    validity: "30 يوم",
    imageUrl: "/images/vodafone-logo.svg",
    isPopular: false,
    isNew: false,
    isSpecial: true,
    howToSubscribe: "من خلال زيارة أقرب فرع فودافون أو من خلال تطبيق أنا فودافون",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. متاحة لعملاء الفاتورة فقط."
  },
  {
    _id: "67de5059fedc61f0b5b5ce98",
    id: 10,
    name: "باقة وي ADSL منزلي 200",
    provider: "we",
    type: "landline",
    price: 200,
    description: "خدمة انترنت منزلي ADSL من وي بسرعة 30 ميجابت مع استهلاك شهري 140 جيجا",
    features: {
      "السرعة": "30 ميجابت في الثانية",
      "الاستهلاك": "140 جيجابايت شهرياً",
      "التجاوز": "سرعة مخفضة بعد استهلاك الباقة",
      "الخدمات الإضافية": "خدمات قيمة مضافة وتليفون أرضي"
    },
    validity: "30 يوم",
    imageUrl: "/images/we-logo.svg",
    isPopular: false,
    isNew: false,
    isSpecial: true,
    howToSubscribe: "من خلال زيارة أقرب فرع وي أو الاتصال بـ 19777",
    terms: "تطبق الشروط والأحكام. التأسيس والتركيب يتطلب رسوم إضافية."
  }
];

// Function to filter, sort, and paginate packages
export const getPackages = (options: {
  page?: number;
  provider?: string;
  type?: string;
  priceRange?: string;
  sortBy?: string;
  search?: string;
}): PackageResponse => {
  const { page = 1, provider, type, priceRange, sortBy, search } = options;
  const itemsPerPage = 6;

  // Apply filters
  let filteredPackages = [...mockPackages];

  if (provider && provider !== 'all') {
    filteredPackages = filteredPackages.filter(pkg => pkg.provider === provider);
  }

  if (type && type !== 'all') {
    filteredPackages = filteredPackages.filter(pkg => pkg.type === type);
  }

  if (priceRange && priceRange !== 'all') {
    switch (priceRange) {
      case 'under50':
        filteredPackages = filteredPackages.filter(pkg => pkg.price < 50);
        break;
      case '50to100':
        filteredPackages = filteredPackages.filter(pkg => pkg.price >= 50 && pkg.price <= 100);
        break;
      case '100to200':
        filteredPackages = filteredPackages.filter(pkg => pkg.price > 100 && pkg.price <= 200);
        break;
      case 'over200':
        filteredPackages = filteredPackages.filter(pkg => pkg.price > 200);
        break;
    }
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredPackages = filteredPackages.filter(pkg => 
      pkg.name.toLowerCase().includes(searchLower) || 
      pkg.description.toLowerCase().includes(searchLower) ||
      pkg.provider.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case 'popular':
        filteredPackages.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
      case 'priceAsc':
        filteredPackages.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filteredPackages.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredPackages.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
  }

  // Calculate pagination
  const totalItems = filteredPackages.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedPackages = filteredPackages.slice(startIndex, startIndex + itemsPerPage);

  return {
    total: totalItems,
    page,
    totalPages,
    packages: paginatedPackages
  };
};

// Function to get a specific package by ID
export const getPackageById = (id: string): Package | undefined => {
  return mockPackages.find(pkg => pkg._id === id);
};


