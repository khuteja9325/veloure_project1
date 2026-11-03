import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FRAGRANCES } from '../../data/fragrances';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return FRAGRANCES.filter((f) => {
      const matchName = f.name.toLowerCase().includes(q);
      const matchBrand = f.brand.toLowerCase().includes(q);
      const matchFamily = f.scentFamily.toLowerCase().includes(q);
      const matchSecondary = f.secondaryFamily?.toLowerCase().includes(q);
      const matchNotes = [...f.topNotes, ...f.heartNotes, ...f.baseNotes].some((n) =>
        n.toLowerCase().includes(q)
      );
      const matchOccasion = f.occasion.some((o) => o.toLowerCase().includes(q));
      const matchMood = f.moods.some((m) => m.toLowerCase().includes(q));
      return matchName || matchBrand || matchFamily || matchSecondary || matchNotes || matchOccasion || matchMood;
    });
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${id}`);
  };

  const handleQuickTag = (tag: string) => {
    setQuery(tag);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0B0B]/80 backdrop-blur-md flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Background dismiss */}
      <div
        className="fixed inset-0 -z-10"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="w-full max-w-3xl bg-[#121212] border border-[#262626] shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-6 right-6 text-[#AAA49A] hover:text-[#F6F1E8] p-1 transition-colors"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4 border-b border-[#262626] pb-4">
          <Search className="w-6 h-6 text-[#C8A96B]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by fragrance name, note (sandalwood, amber), or mood..."
            className="w-full bg-transparent text-[#F6F1E8] placeholder:text-[#555] font-serif text-xl sm:text-2xl focus:outline-none"
          />
        </div>

        {/* Quick Suggestion Tags */}
        {!query && (
          <div className="mt-6">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#AAA49A] mb-3">
              Curated Olfactory Inquiries
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Aura Nocturne', 'Bourbon Vanilla', 'Sandalwood', 'Midnight Rose', 'Oud', 'Calabrian Citrus', 'Black Tie', 'Romantic'].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => handleQuickTag(tag)}
                    className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#252525] border border-[#2B2B2B] text-[#D8CBB8] transition-colors font-light text-left"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>

            <div className="mt-8 p-4 bg-[#161616] border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#C8A96B]" />
                <span className="text-xs text-[#F6F1E8]">Looking for something tailored to your body chemistry?</span>
              </div>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate('/scent-finder');
                }}
                className="text-xs text-[#C8A96B] hover:text-[#DFCA9B] uppercase tracking-wider font-medium flex items-center gap-1"
              >
                <span>Launch Scent Finder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="mt-6 max-h-96 overflow-y-auto pr-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#AAA49A] mb-4">
              Found {searchResults.length} {searchResults.length === 1 ? 'Creation' : 'Creations'} for &ldquo;{query}&rdquo;
            </p>

            {searchResults.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm text-[#AAA49A] font-light">No fragrances matching your inquiry.</p>
                <p className="text-xs text-[#666] mt-1">Try searching for notes like &ldquo;amber&rdquo;, &ldquo;cedar&rdquo;, &ldquo;iris&rdquo;, or &ldquo;citrus&rdquo;.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#1F1F1F]">
                {searchResults.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => handleSelectProduct(f.id)}
                    className="py-3.5 flex items-center gap-4 hover:bg-[#1A1A1A] p-2 transition-colors cursor-pointer group"
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover border border-[#2B2B2B]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] tracking-wider uppercase text-[#C8A96B]">{f.scentFamily}</span>
                        <span className="text-[10px] text-[#555]">&bull;</span>
                        <span className="text-[10px] uppercase text-[#AAA49A]">{f.gender}</span>
                      </div>
                      <h4 className="font-serif text-base text-[#F6F1E8] group-hover:text-[#C8A96B] transition-colors truncate">
                        {f.name}
                      </h4>
                      <p className="text-xs text-[#AAA49A] truncate font-light">
                        {f.topNotes.slice(0, 2).join(', ')} &bull; {f.baseNotes[0]}
                      </p>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-sm font-medium text-[#F6F1E8] tabular-nums">${f.price}</span>
                      <p className="text-[10px] text-[#AAA49A]">50ml flacon</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
