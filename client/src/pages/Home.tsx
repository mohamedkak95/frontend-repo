import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import FilterSection from "@/components/FilterSection";
import OfferCard from "@/components/OfferCard";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
import OfferDetailsModal from "@/components/OfferDetailsModal";
import { FilterOptions, Offer, ViewMode, ExtendedOffer } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOffer, setSelectedOffer] = useState<ExtendedOffer | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    company: "all",
    offerType: "all",
    priceRange: "all",
    sortBy: "popular",
    searchQuery: "",
  });

  const {
    data: offers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["/api/offers", filters],
    refetchOnWindowFocus: false,
  });

  const itemsPerPage = 6;
  const totalPages = offers ? Math.ceil(offers.length / itemsPerPage) : 0;

  const paginatedOffers = offers
    ? offers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

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

  const handleShowOfferDetails = async (offerId: number) => {
    try {
      const response = await fetch(`/api/offers/${offerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch offer details");
      }
      const offerDetails = await response.json();
      setSelectedOffer(offerDetails);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل تفاصيل العرض",
        variant: "destructive",
      });
    }
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
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
        {!isLoading && !isError && offers && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-neutral-900">
                <span>{offers.length}</span> عرض متاح
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

            {/* Offers Grid/List */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {paginatedOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onShowDetails={() => handleShowOfferDetails(offer.id)}
                />
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

      {selectedOffer && (
        <OfferDetailsModal offer={selectedOffer} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;
