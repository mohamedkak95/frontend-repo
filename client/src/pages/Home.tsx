import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import FilterSection from "@/components/FilterSection";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
import PackageDetailsModal from "@/components/PackageDetailsModal";
import { FilterOptions, ViewMode, Package, PackageResponse } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    company: "all",
    offerType: "all",
    priceRange: "all",
    sortBy: "popular",
    searchQuery: "",
  });

  const {
  data: packagesData,
  isLoading,
  isError,
  refetch,
} = useQuery<PackageResponse>({
  queryKey: ["/api/packages", filters, currentPage],
  queryFn: async () => {
    const queryParams = new URLSearchParams();
    if (currentPage) queryParams.append("page", currentPage.toString());
    if (filters.company !== "all") queryParams.append("provider", filters.company);
    if (filters.offerType !== "all") queryParams.append("type", filters.offerType);
    if (filters.priceRange !== "all") queryParams.append("priceRange", filters.priceRange);
    if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
    if (filters.searchQuery) queryParams.append("search", filters.searchQuery);
    
    const response = await fetch(`http://localhost:5000/api/packages?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch packages");
    }
    return response.json();
  },
  refetchOnWindowFocus: false,
});


  const packages = packagesData?.packages || [];
  const totalPages = packagesData?.totalPages || 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleFilterChange = (
    filterType: keyof FilterOptions,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleShowPackageDetails = async (packageId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/packages/${packageId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch package details");
      }
      const packageDetails = await response.json();
      setSelectedPackage(packageDetails);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل تفاصيل الباقة",
        variant: "destructive",
      });
    }
  };

  const handleCloseModal = () => {
    setSelectedPackage(null);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={handleSearch} />
      
      <FilterSection
        activeCompany={filters.company}
        setActiveCompany={(company) => handleFilterChange("company", company)}
        activeOfferType={filters.offerType}
        handleFilterChange={handleFilterChange}
        activePriceRange={filters.priceRange}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortOption={filters.sortBy}
        handleSortChange={(option) => handleFilterChange("sortBy", option)}
      />
      
      <main className="container mx-auto px-4 pb-12 flex-grow">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-l-4 border-primary"></div>
            <p className="mt-4 text-neutral-700 text-lg">جاري تحميل العروض...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto mb-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-lg font-bold">حدث خطأ أثناء تحميل البيانات</p>
              <p className="mt-2">
                يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى
              </p>
            </div>
            <button
              className="mt-4 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
              onClick={handleRetry}
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Results Header */}
        {!isLoading && !isError && packagesData && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-neutral-900">
                <span>{packagesData.total}</span> عرض متاح
              </h2>
              <div className="text-neutral-700">
                <span>ترتيب حسب:</span>
                <select
                  className="mr-2 bg-white border border-neutral-200 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  value={filters.sortBy}
                >
                  <option value="popular">الأكثر شهرة</option>
                  <option value="priceAsc">السعر: من الأقل للأعلى</option>
                  <option value="priceDesc">السعر: من الأعلى للأقل</option>
                  <option value="newest">أحدث العروض</option>
                </select>
              </div>
            </div>

            {/* Packages Grid/List */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {packages.map((pkg) => (
                <div key={pkg._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow duration-200">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-neutral-900">{pkg.name}</h3>
                      <div className="flex space-x-2">
                        {pkg.isPopular && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">شائع</span>
                        )}
                        {pkg.isNew && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">جديد</span>
                        )}
                        {pkg.isSpecial && (
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">خاص</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 ml-1">المزود:</span>
                      <span className="font-medium">{pkg.provider}</span>
                    </div>
                    
                  
                    
                    <div className="text-sm text-gray-500 mb-3">
                      صالح لمدة {pkg.validity}
                    </div>
                    
                    <p className="text-neutral-700 mb-4 line-clamp-2">{pkg.description}</p>
                    
                    <div className="mt-auto">
                      <button
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition-colors"
                        onClick={() => handleShowPackageDetails(pkg._id)}
                      >
                        عرض التفاصيل
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </main>

      <Footer />

      {selectedPackage && (
        <PackageDetailsModal pkg={selectedPackage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;
