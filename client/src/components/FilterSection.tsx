import { FaBroadcastTower, FaThLarge, FaList, FaChevronDown, FaSignal } from "react-icons/fa";
import { SiVodafone } from "react-icons/si";
import { FilterOptions, OfferType, PriceRange, SortOption, ViewMode } from "@/types";

interface FilterSectionProps {
  activeCompany: string;
  setActiveCompany: (company: string) => void;
  activeOfferType: OfferType;
  activePriceRange: PriceRange;
  handleFilterChange: (filterType: keyof FilterOptions, value: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortOption: SortOption;
  handleSortChange: (option: SortOption) => void;
}

const FilterSection = ({
  activeCompany,
  setActiveCompany,
  activeOfferType,
  activePriceRange,
  handleFilterChange,
  viewMode,
  setViewMode,
  sortOption,
  handleSortChange,
}: FilterSectionProps) => {
  const companies = [
    { id: "vodafone", name: "فودافون", icon: <SiVodafone className="text-red-600" /> },
    { id: "orange", name: "أورانج", icon: <FaBroadcastTower className="text-orange-500" /> },
    { id: "etisalat", name: "اتصالات", icon: <FaSignal className="text-green-600" /> },
    { id: "we", name: "وي", icon: <FaBroadcastTower className="text-purple-600" /> },
  ];

  return (
    <section className="bg-white py-4 shadow-sm mb-6 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        {/* Company Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-4 space-x-reverse rtl:space-x-reverse">
            <button
              className={`flex flex-col items-center rounded-lg px-4 py-2 ${
                activeCompany === "all"
                  ? "bg-primary text-white"
                  : "hover:bg-neutral-100"
              }`}
              onClick={() => setActiveCompany("all")}
            >
              <span className="font-bold">الكل</span>
            </button>

            {companies.map((company) => (
              <button
                key={company.id}
                className={`flex flex-col items-center rounded-lg px-4 py-2 ${
                  activeCompany === company.id
                    ? "bg-primary text-white"
                    : "hover:bg-neutral-100"
                }`}
                onClick={() => setActiveCompany(company.id)}
              >
                <div className="w-10 h-10 flex items-center justify-center mb-1 rounded-full bg-white shadow-sm">
                  {company.icon}
                </div>
                <span className="font-bold text-neutral-900">{company.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center flex-wrap gap-3 mb-3 md:mb-0">
            {/* Offer Type Filter */}
            <div className="relative inline-block text-right">
              <select
                className="block appearance-none bg-white border border-neutral-200 text-neutral-900 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                value={activeOfferType}
                onChange={(e) => handleFilterChange("offerType", e.target.value)}
              >
                <option value="all">جميع الأنواع</option>
                <option value="internet">باقات الانترنت</option>
                <option value="calls">باقات المكالمات</option>
                <option value="combo">الباقات المشتركة</option>
                <option value="special">عروض خاصة</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-700">
                <FaChevronDown />
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="relative inline-block text-right">
              <select
                className="block appearance-none bg-white border border-neutral-200 text-neutral-900 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                value={activePriceRange}
                onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              >
                <option value="all">كل الأسعار</option>
                <option value="under50">أقل من 50 جنيه</option>
                <option value="50to100">50 - 100 جنيه</option>
                <option value="100to200">100 - 200 جنيه</option>
                <option value="over200">أكثر من 200 جنيه</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-700">
                <FaChevronDown />
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center">
            <span className="text-neutral-700 ml-2">طريقة العرض:</span>
            <button
              className={`p-2 rounded-lg ml-2 ${
                viewMode === "grid" ? "bg-primary text-white" : "hover:bg-neutral-100"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <FaThLarge />
            </button>
            <button
              className={`p-2 rounded-lg ${
                viewMode === "list" ? "bg-primary text-white" : "hover:bg-neutral-100"
              }`}
              onClick={() => setViewMode("list")}
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
