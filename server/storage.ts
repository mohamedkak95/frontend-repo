import { 
  companies, 
  features, 
  offers, 
  offerFeatures, 
  type Company, 
  type Feature, 
  type Offer, 
  type OfferFeature,
  type InsertCompany,
  type InsertFeature,
  type InsertOffer,
  type InsertOfferFeature
} from "@shared/schema";

export interface OfferWithRelations extends Offer {
  company: Company;
  features?: Feature[];
}

export interface IStorage {
  // Companies
  getAllCompanies(): Promise<Company[]>;
  getCompanyById(id: number): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;

  // Features
  getAllFeatures(): Promise<Feature[]>;
  getFeatureById(id: number): Promise<Feature | undefined>;
  createFeature(feature: InsertFeature): Promise<Feature>;

  // Offers
  getAllOffers(): Promise<OfferWithRelations[]>;
  getOfferById(id: number): Promise<OfferWithRelations | undefined>;
  createOffer(offer: InsertOffer): Promise<Offer>;

  // Offer Features
  addFeatureToOffer(offerFeature: InsertOfferFeature): Promise<OfferFeature>;
  getFeaturesByOfferId(offerId: number): Promise<Feature[]>;
}

export class MemStorage implements IStorage {
  private companies: Map<number, Company>;
  private features: Map<number, Feature>;
  private offers: Map<number, Offer>;
  private offerFeatures: Map<number, OfferFeature>;
  
  private companyIdCounter: number;
  private featureIdCounter: number;
  private offerIdCounter: number;
  private offerFeatureIdCounter: number;

  constructor() {
    this.companies = new Map();
    this.features = new Map();
    this.offers = new Map();
    this.offerFeatures = new Map();
    
    this.companyIdCounter = 1;
    this.featureIdCounter = 1;
    this.offerIdCounter = 1;
    this.offerFeatureIdCounter = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  // Companies
  async getAllCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async getCompanyById(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.companyIdCounter++;
    const company: Company = { id, ...insertCompany };
    this.companies.set(id, company);
    return company;
  }

  // Features
  async getAllFeatures(): Promise<Feature[]> {
    return Array.from(this.features.values());
  }

  async getFeatureById(id: number): Promise<Feature | undefined> {
    return this.features.get(id);
  }

  async createFeature(insertFeature: InsertFeature): Promise<Feature> {
    const id = this.featureIdCounter++;
    const feature: Feature = { id, ...insertFeature };
    this.features.set(id, feature);
    return feature;
  }

  // Offers
  async getAllOffers(): Promise<OfferWithRelations[]> {
    const offers = Array.from(this.offers.values());
    const offersWithRelations: OfferWithRelations[] = [];

    for (const offer of offers) {
      const company = this.companies.get(offer.companyId);
      if (!company) continue;

      const features = await this.getFeaturesByOfferId(offer.id);
      
      offersWithRelations.push({
        ...offer,
        company,
        features
      });
    }

    return offersWithRelations;
  }

  async getOfferById(id: number): Promise<OfferWithRelations | undefined> {
    const offer = this.offers.get(id);
    if (!offer) return undefined;

    const company = this.companies.get(offer.companyId);
    if (!company) return undefined;

    const features = await this.getFeaturesByOfferId(id);

    return {
      ...offer,
      company,
      features
    };
  }

  async createOffer(insertOffer: InsertOffer): Promise<Offer> {
    const id = this.offerIdCounter++;
    const offer: Offer = { id, ...insertOffer };
    this.offers.set(id, offer);
    return offer;
  }

  // Offer Features
  async addFeatureToOffer(insertOfferFeature: InsertOfferFeature): Promise<OfferFeature> {
    const id = this.offerFeatureIdCounter++;
    const offerFeature: OfferFeature = { id, ...insertOfferFeature };
    this.offerFeatures.set(id, offerFeature);
    return offerFeature;
  }

  async getFeaturesByOfferId(offerId: number): Promise<Feature[]> {
    const offerFeatureEntries = Array.from(this.offerFeatures.values())
      .filter(of => of.offerId === offerId);
    
    const features: Feature[] = [];
    for (const ofEntry of offerFeatureEntries) {
      const feature = this.features.get(ofEntry.featureId);
      if (feature) features.push(feature);
    }
    
    return features;
  }

  // Initialize with sample data
  private initSampleData() {
    // Add companies
    const vodafone = this.createCompany({
      name: "Vodafone",
      nameAr: "فودافون",
      logo: undefined,
      color: "#ff0000"
    });
    
    const orange = this.createCompany({
      name: "Orange",
      nameAr: "أورانج",
      logo: undefined,
      color: "#ff6600"
    });
    
    const etisalat = this.createCompany({
      name: "Etisalat",
      nameAr: "اتصالات",
      logo: undefined,
      color: "#59b210"
    });
    
    const we = this.createCompany({
      name: "WE",
      nameAr: "وي",
      logo: undefined,
      color: "#8000ff"
    });

    // Add features
    const socialMedia = this.createFeature({
      icon: "wifi",
      title: "Social Media",
      description: "2 جيجابايت إضافية للسوشيال ميديا"
    });
    
    const vodafoneUnlimited = this.createFeature({
      icon: "phone",
      title: "Vodafone Unlimited",
      description: "غير محدودة لشبكة فودافون"
    });
    
    const highSpeed = this.createFeature({
      icon: "wifi",
      title: "High Speed",
      description: "سرعة تصل إلى 42.2 ميجابت/ثانية"
    });

    // Add offers
    const vodafoneFlex = this.createOffer({
      title: "فودافون فليكس",
      companyId: 1,
      price: 140,
      originalPrice: 175,
      discount: 20,
      internet: {
        amount: 20,
        unit: "جيجابايت"
      },
      minutes: {
        amount: 1000,
        description: "دقيقة لكل الشبكات"
      },
      messages: {
        amount: 100
      },
      validity: 30,
      code: "#123F",
      isLimited: true,
      rating: 4.8,
      subscribers: 1250,
      offerType: "combo",
      featuredAt: new Date().toISOString(),
      additionalFeatures: [
        {
          id: 1,
          icon: "youtube",
          title: "يوتيوب بريميام",
          description: "اشتراك مجاني لمدة شهر"
        },
        {
          id: 2,
          icon: "music",
          title: "أنغامي بلس",
          description: "اشتراك مجاني لمدة ثلاثة أشهر"
        },
        {
          id: 3,
          icon: "globe",
          title: "تجوال دولي",
          description: "خصم 15% على رسوم التجوال"
        },
        {
          id: 4,
          icon: "ticket",
          title: "برنامج المكافآت",
          description: "نقاط مضاعفة لبرنامج فودافون ريد"
        }
      ],
      termsAndConditions: [
        "العرض متاح للعملاء الحاليين والجدد",
        "يمكن الاشتراك في العرض عن طريق تطبيق أنا فودافون",
        "يتم تجديد الباقة تلقائياً بعد انتهاء المدة مع خصم قيمة الاشتراك من رصيدك",
        "يمكن إلغاء تجديد الباقة بإرسال رسالة إلى 2020",
        "لمزيد من المعلومات يرجى زيارة الموقع الرسمي لشركة فودافون مصر"
      ]
    });
    
    const orangeGo = this.createOffer({
      title: "أورانج جو",
      companyId: 2,
      price: 110,
      internet: {
        amount: 15,
        unit: "جيجابايت"
      },
      minutes: {
        amount: 1500,
        description: "دقيقة لشبكة أورانج"
      },
      messages: {
        amount: 50
      },
      validity: 30,
      code: "#OR45",
      offerType: "combo",
      featuredAt: new Date(Date.now() - 86400000).toISOString() // Yesterday
    });
    
    const etisalatUnlimited = this.createOffer({
      title: "اتصالات بلا حدود",
      companyId: 3,
      price: 180,
      originalPrice: 210,
      discount: 15,
      internet: {
        amount: 30,
        unit: "جيجابايت"
      },
      minutes: {
        amount: 2000,
        description: "دقيقة لكل الشبكات"
      },
      messages: {
        amount: 200
      },
      validity: 30,
      code: "#ET80",
      isPopular: true,
      offerType: "combo",
      featuredAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
    });
    
    const weExtra = this.createOffer({
      title: "وي إكسترا",
      companyId: 4,
      price: 90,
      internet: {
        amount: 12,
        unit: "جيجابايت"
      },
      minutes: {
        amount: 800,
        description: "دقيقة لكل الشبكات"
      },
      messages: {
        amount: 50
      },
      validity: 30,
      code: "#WE35",
      offerType: "combo",
      featuredAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
    });
    
    const vodafoneInternet = this.createOffer({
      title: "فودافون إنترنت",
      companyId: 1,
      price: 70,
      internet: {
        amount: 10,
        unit: "جيجابايت"
      },
      minutes: {
        amount: 0,
        description: "دقيقة"
      },
      messages: {
        amount: 0
      },
      validity: 30,
      code: "#VF10",
      offerType: "internet",
      featuredAt: new Date(Date.now() - 345600000).toISOString() // 4 days ago
    });
    
    const orangeYouth = this.createOffer({
      title: "أورانج يوث",
      companyId: 2,
      price: 60,
      originalPrice: 85,
      discount: 30,
      internet: {
        amount: 8,
        unit: "جيجابايت"
      },
      minutes: {
        amount: 700,
        description: "دقيقة لشبكة أورانج"
      },
      messages: {
        amount: 0
      },
      validity: 30,
      code: "#OY22",
      tag: "عرض طلابي",
      offerType: "special",
      featuredAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
    });

    // Add feature relationships
    this.addFeatureToOffer({
      offerId: 1, // vodafoneFlex
      featureId: 1 // socialMedia
    });
    
    this.addFeatureToOffer({
      offerId: 1, // vodafoneFlex
      featureId: 2 // vodafoneUnlimited
    });
    
    this.addFeatureToOffer({
      offerId: 1, // vodafoneFlex
      featureId: 3 // highSpeed
    });
    
    this.addFeatureToOffer({
      offerId: 3, // etisalatUnlimited
      featureId: 3 // highSpeed
    });
  }
}

export const storage = new MemStorage();
