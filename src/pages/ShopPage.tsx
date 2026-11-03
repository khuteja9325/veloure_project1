import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, RotateCcw, SlidersHorizontal, Search } from 'lucide-react';
import { FRAGRANCES, SCENT_FAMILIES_INFO } from '../data/fragrances';
import { ScentFamily, FragranceSeason, FragranceOccasion } from '../types';
import { ProductCard } from '../components/common/ProductCard';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedLongevity, setSelectedLongevity] = useState<string[]>([]);
  const [selectedProjection, setSelectedProjection] = useState<string[]>([]);
  const [selectedNote, setSelectedNote] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recommended');

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync with URL query parameters
  useEffect(() => {
    const familyParam = searchParams.get('family');
    const moodParam = searchParams.get('mood');
    const searchParam = searchParams.get('q');
    const occasionParam = searchParams.get('occasion');

    if (familyParam) {
      setSelectedFamilies([familyParam]);
    }
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    if (occasionParam) {
      setSelectedOccasions([occasionParam]);
    }
  }, [searchParams]);

  // Available note tags
  const popularNotes = [
    'Sandalwood',
    'Amber',
    'Vanilla',
    'Saffron',
    'Bergamot',
    'Rose',
    'Cedarwood',
    'Oud',
    'Cardamom',
    'Iris',
    'Vetiver',
  ];

  // Reset all filters
  const resetFilters = () => {
    setSelectedFamilies([]);
    setSelectedSeasons([]);
    setSelectedOccasions([]);
    setSelectedLongevity([]);
    setSelectedProjection([]);
    setSelectedNote('');
    setMaxPrice(350);
    setMinRating(0);
    setSearchTerm('');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedFamilies.length > 0 ||
    selectedSeasons.length > 0 ||
    selectedOccasions.length > 0 ||
    selectedLongevity.length > 0 ||
    selectedProjection.length > 0 ||
    selectedNote !== '' ||
    maxPrice < 350 ||
    minRating > 0 ||
    searchTerm !== '';

  // Filtered and Sorted Fragrances
  const filteredFragrances = useMemo(() => {
    return FRAGRANCES.filter((f) => {
      // Search
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchName = f.name.toLowerCase().includes(q);
        const matchNotes = [...f.topNotes, ...f.heartNotes, ...f.baseNotes].some((n) =>
          n.toLowerCase().includes(q)
        );
        const matchFamily = f.scentFamily.toLowerCase().includes(q);
        if (!matchName && !matchNotes && !matchFamily) return false;
      }

      // Scent Family
      if (
        selectedFamilies.length > 0 &&
        !selectedFamilies.includes(f.scentFamily) &&
        (!f.secondaryFamily || !selectedFamilies.includes(f.secondaryFamily))
      ) {
        return false;
      }

      // Seasons
      if (
        selectedSeasons.length > 0 &&
        !selectedSeasons.some((season) => f.season.includes(season as any))
      ) {
        return false;
      }

      // Occasions
      if (
        selectedOccasions.length > 0 &&
        !selectedOccasions.some((occ) => f.occasion.includes(occ as any))
      ) {
        return false;
      }

      // Longevity
      if (selectedLongevity.length > 0 && !selectedLongevity.includes(f.longevity)) {
        return false;
      }

      // Projection
      if (selectedProjection.length > 0 && !selectedProjection.includes(f.projection)) {
        return false;
      }

      // Note match
      if (selectedNote) {
        const noteMatch = [...f.topNotes, ...f.heartNotes, ...f.baseNotes].some((n) =>
          n.toLowerCase().includes(selectedNote.toLowerCase())
        );
        if (!noteMatch) return false;
      }

      // Price
      if (f.price > maxPrice) {
        return false;
      }

      // Rating
      if (minRating > 0 && f.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // 'recommended'
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    searchTerm,
    selectedFamilies,
    selectedSeasons,
    selectedOccasions,
    selectedLongevity,
    selectedProjection,
    selectedNote,
    maxPrice,
    minRating,
    sortBy,
  ]);

  const toggleArrayFilter = (arr: string[], item: string, setter: (val: string[]) => void) => {
    if (arr.includes(item)) {
      setter(arr.filter((i) => i !== item));
    } else {
      setter([...arr, item]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Editorial Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium">
          THE COMPLETE ATELIER
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#F6F1E8]">
          Haute Parfumerie Collection
        </h1>
        <p className="text-sm text-[#AAA49A] font-light leading-relaxed">
          Sixteen distinct extractions formulated with pure macerated essences, rare resin tears, and precious botanicals.
        </p>
      </div>

      {/* Control Bar: Filter Toggle, Search, Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-[#202020]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-[#141414] border border-[#262626] text-xs uppercase tracking-wider text-[#F6F1E8]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C8A96B]" />
            <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>

          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by notes or name..."
              className="w-full bg-[#141414] border border-[#262626] pl-9 pr-4 py-2 text-xs text-[#F6F1E8] placeholder:text-[#555] focus:outline-none focus:border-[#C8A96B]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777] hover:text-[#AAA]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#AAA49A] hover:text-[#C8A96B] flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4">
          <span className="text-xs text-[#AAA49A] tabular-nums font-light">
            Showing <strong className="text-[#F6F1E8] font-medium">{filteredFragrances.length}</strong> creations
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#777] uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#141414] border border-[#262626] px-3 py-2 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B] cursor-pointer"
            >
              <option value="recommended">Curator's Recommendation</option>
              <option value="newest">Newest Extractions</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
        {/* Desktop Sidebar Filters */}
        <aside
          className={`md:col-span-3 space-y-8 ${
            mobileFiltersOpen ? 'block' : 'hidden md:block'
          }`}
        >
          {/* SCENT FAMILY */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#F6F1E8] font-medium pb-2 border-b border-[#1E1E1E]">
              Scent Family
            </h3>
            <div className="space-y-2">
              {SCENT_FAMILIES_INFO.map((fam) => {
                const isSelected = selectedFamilies.includes(fam.name);
                return (
                  <label
                    key={fam.name}
                    className="flex items-center justify-between text-xs cursor-pointer group"
                  >
                    <span
                      className={`transition-colors ${
                        isSelected ? 'text-[#C8A96B] font-medium' : 'text-[#AAA49A] group-hover:text-[#F6F1E8]'
                      }`}
                    >
                      {fam.name}
                    </span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayFilter(selectedFamilies, fam.name, setSelectedFamilies)}
                      className="accent-[#C8A96B] rounded-none bg-[#1A1A1A] border-[#333]"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* KEY NOTES CHIPS */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#F6F1E8] font-medium pb-2 border-b border-[#1E1E1E]">
              Dominant Notes
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {popularNotes.map((note) => {
                const isSelected = selectedNote.toLowerCase() === note.toLowerCase();
                return (
                  <button
                    key={note}
                    onClick={() => setSelectedNote(isSelected ? '' : note)}
                    className={`px-2.5 py-1 text-[11px] border transition-colors ${
                      isSelected
                        ? 'border-[#C8A96B] bg-[#C8A96B] text-[#0B0B0B] font-medium'
                        : 'border-[#262626] bg-[#141414] text-[#AAA49A] hover:border-[#444]'
                    }`}
                  >
                    {note}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PRICE RANGE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E1E1E]">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#F6F1E8] font-medium">
                Max Price
              </h3>
              <span className="text-xs text-[#C8A96B] font-medium tabular-nums">${maxPrice}</span>
            </div>
            <input
              type="range"
              min={190}
              max={350}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C8A96B] bg-[#222]"
            />
            <div className="flex justify-between text-[10px] text-[#666] tabular-nums">
              <span>$190</span>
              <span>$350</span>
            </div>
          </div>

          {/* OCCASION */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#F6F1E8] font-medium pb-2 border-b border-[#1E1E1E]">
              Occasion
            </h3>
            <div className="space-y-2">
              {['Everyday', 'Evening', 'Romantic', 'Office', 'Wedding', 'Vacation', 'Black Tie'].map(
                (occ) => {
                  const isSelected = selectedOccasions.includes(occ);
                  return (
                    <label
                      key={occ}
                      className="flex items-center justify-between text-xs cursor-pointer group"
                    >
                      <span
                        className={`transition-colors ${
                          isSelected ? 'text-[#C8A96B] font-medium' : 'text-[#AAA49A] group-hover:text-[#F6F1E8]'
                        }`}
                      >
                        {occ}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleArrayFilter(selectedOccasions, occ, setSelectedOccasions)}
                        className="accent-[#C8A96B] bg-[#1A1A1A] border-[#333]"
                      />
                    </label>
                  );
                }
              )}
            </div>
          </div>

          {/* SEASON */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#F6F1E8] font-medium pb-2 border-b border-[#1E1E1E]">
              Season
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {['Spring', 'Summer', 'Autumn', 'Winter'].map((sea) => {
                const isSelected = selectedSeasons.includes(sea);
                return (
                  <button
                    key={sea}
                    onClick={() => toggleArrayFilter(selectedSeasons, sea, setSelectedSeasons)}
                    className={`px-3 py-1.5 text-xs border text-left transition-colors ${
                      isSelected
                        ? 'border-[#C8A96B] text-[#F6F1E8] bg-[#C8A96B]/15'
                        : 'border-[#242424] text-[#AAA49A] hover:border-[#383838]'
                    }`}
                  >
                    {sea}
                  </button>
                );
              })}
            </div>
          </div>

          {/* LONGEVITY */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#F6F1E8] font-medium pb-2 border-b border-[#1E1E1E]">
              Longevity
            </h3>
            <div className="space-y-2">
              {['Moderate (6h)', 'Long Lasting (8-10h)', 'Eternal (12h+)'].map((long) => {
                const isSelected = selectedLongevity.includes(long);
                return (
                  <label
                    key={long}
                    className="flex items-center justify-between text-xs cursor-pointer group"
                  >
                    <span
                      className={`transition-colors ${
                        isSelected ? 'text-[#C8A96B] font-medium' : 'text-[#AAA49A] group-hover:text-[#F6F1E8]'
                      }`}
                    >
                      {long}
                    </span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayFilter(selectedLongevity, long, setSelectedLongevity)}
                      className="accent-[#C8A96B]"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-9">
          {filteredFragrances.length === 0 ? (
            <div className="text-center py-24 bg-[#121212] border border-[#202020] p-8 space-y-4">
              <p className="font-serif text-3xl text-[#AAA49A]">No Fragrances Found</p>
              <p className="text-xs text-[#777] max-w-sm mx-auto font-light leading-relaxed">
                No extractions strictly align with your chosen criteria. Try adjusting your price ceiling or removing note filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFragrances.map((fragrance) => (
                <ProductCard key={fragrance.id} fragrance={fragrance} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
