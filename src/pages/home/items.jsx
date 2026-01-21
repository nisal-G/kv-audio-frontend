import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function Items() {
  const [state, setState] = useState("loading"); // loading, success, error
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/get/`)
        .then((res) => {
          setItems(res.data);
          setState("success");
          console.log(res.data);
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message ||
            "Error fetching items: Contact Admin"
          );
          setState("error");
        });
    }
  }, []);

  // Extract unique categories and count products per category
  const categories = useMemo(() => {
    const categoryMap = {};
    items.forEach((item) => {
      const cat = item.category || "uncategorized";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
    return Object.entries(categoryMap).map(([name, count]) => ({ name, count }));
  }, [items]);

  // Filter items based on selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <main className="min-h-[calc(100vh-80px)] w-full bg-primary text-text pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-6 sm:mb-8">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-text/70 bg-secondary/60 border border-text/10 rounded-full px-3 py-1">
            Browse our collection
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-text">
            Items & Equipment
          </h1>
          <p className="mt-2 text-sm sm:text-base text-text/70 max-w-2xl">
            High-quality audio and event gear ready for your next booking. Browse by category and tap an item to view full details.
          </p>
        </section>

        {/* Category Filter */}
        {state === "success" && items.length > 0 && (
          <section className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h2 className="text-lg font-bold text-text">Filter by Category</h2>
            </div>

            <div className="relative">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
                {/* All Categories Button */}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border-2 ${selectedCategory === "all"
                      ? "bg-accent text-white border-accent shadow-lg shadow-accent/30 scale-105"
                      : "bg-secondary/70 text-text border-text/10 hover:bg-secondary hover:border-text/20 hover:scale-105"
                    }`}
                >
                  All <span className="ml-1.5 text-xs opacity-80">({items.length})</span>
                </button>

                {/* Individual Category Buttons */}
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex-shrink-0 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border-2 capitalize ${selectedCategory === category.name
                        ? "bg-accent text-white border-accent shadow-lg shadow-accent/30 scale-105"
                        : "bg-secondary/70 text-text border-text/10 hover:bg-secondary hover:border-text/20 hover:scale-105"
                      }`}
                  >
                    {category.name} <span className="ml-1.5 text-xs opacity-80">({category.count})</span>
                  </button>
                ))}
              </div>

              {/* Scroll Gradient Indicators */}
              <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-primary to-transparent pointer-events-none" />
            </div>
          </section>
        )}

        {/* Content */}
        <section className="mt-4 sm:mt-6">
          {/* Loading state */}
          {state === "loading" && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-secondary border-t-accent rounded-full animate-spin" />
              <p className="text-sm text-text/70">Loading items...</p>
            </div>
          )}

          {/* Error state */}
          {state === "error" && (
            <div className="rounded-3xl bg-red-50 border border-red-200 px-5 py-6 sm:px-6 sm:py-7 max-w-xl mx-auto text-center">
              <h2 className="text-base sm:text-lg font-semibold text-red-700">
                Unable to load items
              </h2>
              <p className="mt-2 text-sm text-red-600/80">
                Please try again in a moment or contact the administrator if the
                issue continues.
              </p>
            </div>
          )}

          {/* Items grid with animation */}
          {state === "success" && filteredItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item._id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          )}

          {/* Empty filtered state */}
          {state === "success" && items.length > 0 && filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary/70 text-text/70 flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-text">
                No items in this category
              </h2>
              <p className="mt-2 text-sm text-text/70 max-w-sm">
                Try selecting a different category to browse more items.
              </p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="mt-6 px-6 py-2.5 bg-accent text-white rounded-full font-semibold hover:bg-accent/90 transition-all duration-200 shadow-lg shadow-accent/30"
              >
                View All Items
              </button>
            </div>
          )}

          {/* Empty state - no items at all */}
          {state === "success" && items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-secondary/70 text-text/70 flex items-center justify-center mb-4">
                <span className="text-2xl">🎧</span>
              </div>
              <h2 className="text-lg font-semibold text-text">
                No items available yet
              </h2>
              <p className="mt-2 text-sm text-text/70 max-w-sm">
                Check back soon. New items and equipment will appear here as they
                are added.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* CSS for fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
          opacity: 0;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thumb-secondary::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .scrollbar-thumb-secondary::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.7);
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </main>
  );
}
