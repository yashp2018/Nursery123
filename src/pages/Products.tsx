import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Grid3X3, List } from "lucide-react";
import { motion } from "framer-motion";
import { categories, sampleVarieties } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const ITEMS_PER_PAGE = 6;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedCrop, setSelectedCrop] = useState(searchParams.get("crop") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = useMemo(() => {
    return sampleVarieties.filter((v) => {
      if (selectedCategory && v.categoryId !== selectedCategory) return false;
      if (selectedCrop && v.cropId !== selectedCrop) return false;
      if (search) {
        const q = search.toLowerCase();
        return v.name.toLowerCase().includes(q) || v.cropName.toLowerCase().includes(q) || v.company.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, selectedCategory, selectedCrop]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const allCrops = categories.flatMap((c) => c.crops);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedCrop("");
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="gradient-hero text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-40 h-40 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-60 h-60 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        <div className="container-nursery relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm text-accent font-semibold uppercase tracking-[0.2em]">Shop</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-3">Product Catalog</h1>
            <p className="text-primary-foreground/70 text-lg max-w-lg">Browse our premium grafted seedling varieties</p>
          </motion.div>
        </div>
      </section>

      <div className="container-nursery py-10">
        <div className="flex gap-8">
          {/* ===== SIDEBAR FILTER ===== */}
          <aside className={`hidden lg:block w-72 shrink-0 transition-all ${sidebarOpen ? "opacity-100" : "opacity-0 w-0"}`} id="product-sidebar">
            <div className="bg-card rounded-2xl border border-border/50 shadow-card p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-foreground text-lg">Filters</h3>
                {(selectedCategory || selectedCrop) && (
                  <button onClick={clearFilters} className="text-xs text-primary hover:underline font-semibold">
                    Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search varieties..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  id="product-search"
                />
              </div>

              {/* Categories */}
              <div className="mb-6" id="filter-category">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Categories</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => { setSelectedCategory(""); setSelectedCrop(""); setCurrentPage(1); }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                      !selectedCategory ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCategory(c.id); setSelectedCrop(""); setCurrentPage(1); }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
                        selectedCategory === c.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span>{c.icon}</span> {c.name}
                      <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">
                        {c.crops.reduce((s, cr) => s + cr.varieties, 0)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Crops */}
              <div id="filter-crop">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Crops</h4>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => { setSelectedCrop(""); setCurrentPage(1); }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                      !selectedCrop ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    All Crops
                  </button>
                  {allCrops
                    .filter((c) => !selectedCategory || c.categoryId === selectedCategory)
                    .map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { setSelectedCrop(c.id); setCurrentPage(1); }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
                          selectedCrop === c.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <img src={c.image} alt={c.name} className="w-7 h-7 rounded-md object-cover" />
                        {c.name}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ===== PRODUCT GRID ===== */}
          <div className="flex-1" id="product-listing">
            {/* Mobile filters */}
            <div className="lg:hidden flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setSelectedCrop(""); setCurrentPage(1); }}
                className="px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm"
                id="categorySelect"
              >
                <option value="">Category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select
                value={selectedCrop}
                onChange={(e) => { setSelectedCrop(e.target.value); setCurrentPage(1); }}
                className="px-3 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm"
                id="cropSelect"
              >
                <option value="">Crop</option>
                {allCrops.filter(c => !selectedCategory || c.categoryId === selectedCategory).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{paginated.length}</span> of{" "}
                <span className="font-semibold text-foreground">{filtered.length}</span> varieties
              </p>
              {(selectedCategory || selectedCrop || search) && (
                <button onClick={clearFilters} className="text-sm text-primary hover:underline font-semibold lg:hidden">
                  Clear Filters
                </button>
              )}
            </div>

            {/* Grid */}
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="product-grid">
                {paginated.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ProductCard variety={v} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-2xl border border-border/50">
                <p className="text-5xl mb-4">🌱</p>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">No varieties found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="text-primary font-semibold hover:underline">Clear all filters</button>
              </div>
            )}

            {/* ===== PAGINATION ===== */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10" id="pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${
                      currentPage === i + 1
                        ? "gradient-cta text-primary-foreground shadow-card"
                        : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
