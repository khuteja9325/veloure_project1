import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart, Briefcase, Church, Sun, Moon, Snowflake, Coffee } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';
import { ProductCard } from '../components/common/ProductCard';

export const MoodsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Romantic');

  const categories = [
    {
      id: 'Romantic',
      title: 'Romantic Rendezvous',
      tagline: 'Velvet petals, warm amber, and intimate whispers.',
      icon: Heart,
      filterType: 'mood',
      filterValue: 'Romantic',
    },
    {
      id: 'Office',
      title: 'Atelier & Office Authority',
      tagline: 'Refined structure, clean iris, and quiet intellect.',
      icon: Briefcase,
      filterType: 'occasion',
      filterValue: 'Office',
    },
    {
      id: 'Wedding',
      title: 'Ceremonial & Wedding',
      tagline: 'Gossamer silk musks, white blooms, and eternal vows.',
      icon: Church,
      filterType: 'occasion',
      filterValue: 'Wedding',
    },
    {
      id: 'Vacation',
      title: 'Coastal Escapism',
      tagline: 'Saline sea spray, Mediterranean sunshine, and sunlit citrus.',
      icon: Sun,
      filterType: 'occasion',
      filterValue: 'Vacation',
    },
    {
      id: 'Night Out',
      title: 'Nocturnal Allure',
      tagline: 'Smoky bourbon woods, dark cacao, and magnetic danger.',
      icon: Moon,
      filterType: 'occasion',
      filterValue: 'Night Out',
    },
    {
      id: 'Summer',
      title: 'High Summer Solstice',
      tagline: 'Weightless neroli, crisp ozone, and linen freshness.',
      icon: Sun,
      filterType: 'season',
      filterValue: 'Summer',
    },
    {
      id: 'Winter',
      title: 'Winter Hearth Resins',
      tagline: 'Deep agarwoods, charred cedar, and molten honeycomb.',
      icon: Snowflake,
      filterType: 'season',
      filterValue: 'Winter',
    },
    {
      id: 'Everyday',
      title: 'Everyday Signature',
      tagline: 'Seamless second-skin compositions that elevate the quotidian.',
      icon: Coffee,
      filterType: 'occasion',
      filterValue: 'Everyday',
    },
  ];

  const currentCat = categories.find((c) => c.id === activeCategory) || categories[0];

  // Matched fragrances for active category
  const matchingFragrances = FRAGRANCES.filter((f) => {
    if (currentCat.filterType === 'mood') {
      return f.moods.includes(currentCat.filterValue as any);
    }
    if (currentCat.filterType === 'occasion') {
      return f.occasion.includes(currentCat.filterValue as any);
    }
    if (currentCat.filterType === 'season') {
      return f.season.includes(currentCat.filterValue as any);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          CONTEXTUAL DISCOVERY
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#F6F1E8]">
          Mood & Occasion Curations
        </h1>
        <p className="text-sm text-[#AAA49A] font-light leading-relaxed">
          Fragrance is worn in time and space. Traverse our sensory dimensions to discover the formula crafted for your exact atmosphere.
        </p>
      </div>

      {/* Visual Navigation Tiles (8 Categories) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-4 border text-left transition-all duration-300 flex flex-col justify-between h-28 ${
                isActive
                  ? 'border-[#C8A96B] bg-[#C8A96B]/15 text-[#F6F1E8]'
                  : 'border-[#222] bg-[#121212] text-[#AAA49A] hover:border-[#383838]'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8A96B]' : 'text-[#777]'}`} />
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />}
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#F6F1E8] leading-tight">{cat.id}</h3>
                <p className="text-[10px] text-[#777] font-light truncate mt-0.5">{cat.title}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Category Spotlight Banner */}
      <div className="p-8 sm:p-10 bg-[#121212] border border-[#242424] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A96B] font-medium">
            CURATED SELECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8]">
            {currentCat.title}
          </h2>
          <p className="text-xs text-[#AAA49A] font-light max-w-xl">
            {currentCat.tagline}
          </p>
        </div>

        <Link
          to={`/shop?${currentCat.filterType === 'mood' ? 'mood' : currentCat.filterType === 'occasion' ? 'occasion' : 'season'}=${currentCat.filterValue}`}
          className="bg-[#1A1A1A] hover:bg-[#252525] border border-[#333] text-xs uppercase tracking-widest text-[#F6F1E8] px-6 py-3 transition-colors flex items-center justify-center gap-2 whitespace-nowrap self-start sm:self-auto"
        >
          <span>VIEW FILTERED CATALOG</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Matched Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#AAA49A]">
            Showing <strong className="text-[#F6F1E8]">{matchingFragrances.length}</strong> extractions for {currentCat.title}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {matchingFragrances.map((fragrance) => (
            <ProductCard key={fragrance.id} fragrance={fragrance} />
          ))}
        </div>
      </div>
    </div>
  );
};
