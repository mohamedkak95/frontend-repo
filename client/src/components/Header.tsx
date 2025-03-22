import { useState } from "react";
import { FaBroadcastTower, FaSearch } from "react-icons/fa";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-primary">
              <FaBroadcastTower className="inline-block ml-2" />
              عروض الاتصالات المصرية
            </h1>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-1/3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="ابحث عن عروض..."
                className="w-full rounded-lg border border-neutral-200 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
