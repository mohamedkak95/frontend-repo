import { Package, PackageResponse } from "../shared/schema";

// Mock data for Egyptian telecom packages
const mockPackages: Package[] = [
  {
    _id: "1",
    id: 1,
    name: "باقة فودافون فليكس 30",
    provider: "فودافون",
    type: "فليكس",
    price: 30,
    description: "استمتع بباقة فودافون فليكس 30 واحصل على 1000 وحدة فليكس تقدر تستخدمها في المكالمات أو الإنترنت أو الرسائل",
    features: {
      "internet": "تصفح بسرعة 4G",
      "minutes": "دقائق لكل الشبكات",
      "validity": "الباقة صالحة لمدة 30 يوم",
      "bonus": "احصل على رصيد مضاعف عند التجديد"
    },
    validity: "30 يوم",
    imageUrl: "https://via.placeholder.com/300/FF3A2D/FFFFFF?text=Vodafone",
    isPopular: true,
    isNew: false,
    isSpecial: false,
    howToSubscribe: "اتصل بـ *880# واتبع التعليمات أو من خلال تطبيق أنا فودافون",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. الباقة متاحة لعملاء الفاتورة والكارت."
  },
  {
    _id: "2",
    id: 2,
    name: "باقة اورنج جو 100",
    provider: "اورنج",
    type: "جو",
    price: 100,
    description: "باقة اورنج جو 100 توفر لك 10 جيجابايت انترنت و200 دقيقة لكل الشبكات ورسائل غير محدودة",
    features: {
      "internet": "10 جيجابايت انترنت",
      "minutes": "200 دقيقة لكل الشبكات",
      "sms": "رسائل غير محدودة",
      "streaming": "استمتع بمشاهدة الفيديوهات بدون عد ميجابايت على يوتيوب و واتش ات"
    },
    validity: "30 يوم",
    imageUrl: "https://via.placeholder.com/300/FF7600/FFFFFF?text=Orange",
    isPopular: true,
    isNew: true,
    isSpecial: false,
    howToSubscribe: "اتصل بـ *3030# أو من خلال تطبيق اورنج",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. بعد استهلاك الباقة، سيتم تطبيق التعريفة العادية."
  },
  {
    _id: "3",
    id: 3,
    name: "باقة اتصالات سوبر 150",
    provider: "اتصالات",
    type: "سوبر",
    price: 150,
    description: "احصل على 15 جيجابايت انترنت و300 دقيقة و300 رسالة مع باقة اتصالات سوبر 150",
    features: {
      "internet": "15 جيجابايت انترنت بسرعة 4G",
      "minutes": "300 دقيقة لكل الشبكات",
      "sms": "300 رسالة",
      "social": "استخدام لا محدود لمواقع التواصل الاجتماعي"
    },
    validity: "30 يوم",
    imageUrl: "https://via.placeholder.com/300/009639/FFFFFF?text=Etisalat",
    isPopular: false,
    isNew: false,
    isSpecial: true,
    howToSubscribe: "اتصل بـ *566# أو من خلال تطبيق اتصالات",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. الاستخدام اللامحدود خاضع لسياسة الاستخدام العادل."
  },
  {
    _id: "4",
    id: 4,
    name: "باقة وي انترنت 200",
    provider: "وي",
    type: "انترنت",
    price: 200,
    description: "باقة انترنت غير محدودة من وي بسرعات فائقة تصل إلى 4G+. استمتع بتصفح سريع وتحميل ومشاهدة بدون انقطاع",
    features: {
      "internet": "انترنت غير محدود",
      "speed": "سرعات تصل إلى 4G+",
      "hotspot": "خاصية الربط متاحة",
      "bonus": "اشتراك مجاني في خدمة واتش ات"
    },
    validity: "30 يوم",
    imageUrl: "https://via.placeholder.com/300/582C83/FFFFFF?text=WE",
    isPopular: false,
    isNew: true,
    isSpecial: true,
    howToSubscribe: "اتصل بـ *999# أو من خلال تطبيق وي",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. خدمة الانترنت غير المحدود خاضعة لسياسة الاستخدام العادل."
  },
  {
    _id: "5",
    id: 5,
    name: "باقة فودافون الشباب 60",
    provider: "فودافون",
    type: "الشباب",
    price: 60,
    description: "باقة مخصصة للشباب من فودافون. 5 جيجابايت انترنت و500 دقيقة لشبكة فودافون و100 دقيقة لباقي الشبكات",
    features: {
      "internet": "5 جيجابايت انترنت",
      "minutes": "500 دقيقة لشبكة فودافون",
      "other_minutes": "100 دقيقة لباقي الشبكات",
      "social": "استخدام مجاني لمواقع التواصل الاجتماعي"
    },
    validity: "30 يوم",
    imageUrl: "https://via.placeholder.com/300/FF3A2D/FFFFFF?text=Vodafone",
    isPopular: true,
    isNew: false,
    isSpecial: false,
    howToSubscribe: "اتصل بـ *2020# أو من خلال تطبيق أنا فودافون",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. الباقة متاحة للعملاء من سن 18 إلى 25 سنة."
  },
  {
    _id: "6",
    id: 6,
    name: "باقة اورنج إكس 180",
    provider: "اورنج",
    type: "إكس",
    price: 180,
    description: "استمتع بـ 20 جيجابايت انترنت و500 دقيقة وباقة ترفيهية مميزة مع باقة اورنج إكس الجديدة",
    features: {
      "internet": "20 جيجابايت انترنت",
      "minutes": "500 دقيقة لكل الشبكات",
      "entertainment": "اشتراك مجاني في خدمات بث الفيديو والموسيقى",
      "rollover": "امكانية ترحيل الميجابايت غير المستخدمة للشهر التالي"
    },
    validity: "30 يوم",
    imageUrl: "https://via.placeholder.com/300/FF7600/FFFFFF?text=Orange",
    isPopular: false,
    isNew: true,
    isSpecial: false,
    howToSubscribe: "اتصل بـ *3535# أو من خلال تطبيق اورنج",
    terms: "تطبق الشروط والأحكام. الأسعار شاملة ضريبة القيمة المضافة. الترحيل متاح فقط عند تجديد نفس الباقة."
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