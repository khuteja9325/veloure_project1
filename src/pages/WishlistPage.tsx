import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FRAGRANCES } from '../data/fragrances';
import { WishlistItem } from '../types';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState<WishlistItem['category'] | 'All'>('All');

  const categories: (WishlistItem['category'] | 'All')[] = [
    'All',
    'Favorites',
    'Date Night',
    'Summer',
    'Gift Ideas',
  ];

  // Map wishlist items to fragrance objects
  const filteredItems = wishlist.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleMoveToCart = (fragranceId: string) => {
    const fragrance = FRAGRANCES.find((f) => f.id === fragranceId);
    if (!fragrance) return;
    addToCart(fragrance, '50ml', 1);
    removeFromWishlist(fragranceId);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 min-h-[70vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#202020] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium flex items-center gap-2">
            <Heart className="w-3.5 h-3.5" />
            SAVED CREATIONS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F6F1E8] mt-1">
            Personal Wishlist
          </h1>
          <p className="text-xs text-[#AAA49A] mt-1 font-light">
            Flacons saved to your private olfactory archive.
          </p>
        </div>

        <span className="text-xs text-[#AAA49A]">
          {wishlist.length} {wishlist.length === 1 ? 'Flacon' : 'Flacons'} Saved
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1E1E1E]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-[#C8A96B] text-[#0B0B0B]'
                : 'bg-[#141414] text-[#AAA49A] hover:text-[#F6F1E8] border border-[#262626]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-24 bg-[#121212] border border-[#202020] p-8 space-y-4">
          <p className="font-serif text-3xl text-[#AAA49A]">Your Wishlist is Empty</p>
          <p className="text-xs text-[#777] max-w-sm mx-auto font-light leading-relaxed">
            Click the heart icon on any fragrance in our collection to store it here for future consideration.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
          >
            <span>EXPLORE CATALOG</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const fragrance = FRAGRANCES.find((f) => f.id === item.fragranceId);
            if (!fragrance) return null;
            return (
              <div
                key={fragrance.id}
                className="bg-[#121212] border border-[#222222] p-5 flex flex-col justify-between space-y-4 group"
              >
                <div className="relative aspect-[4/5] bg-[#161616] overflow-hidden">
                  <img
                    src={fragrance.image}
                    alt={fragrance.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => removeFromWishlist(fragrance.id)}
                    className="absolute top-3 right-3 p-2 bg-[#0B0B0B]/80 text-[#AAA49A] hover:text-[#F6F1E8] transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] tracking-wider uppercase text-[#C8A96B]">
                    {fragrance.scentFamily} &bull; {fragrance.gender}
                  </span>
                  <Link to={`/product/${fragrance.id}`}>
                    <h3 className="font-serif text-xl text-[#F6F1E8] hover:text-[#C8A96B] transition-colors">
                      {fragrance.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#8A857D] font-light line-clamp-1">
                    {fragrance.topNotes.slice(0, 2).join(', ')} / {fragrance.baseNotes[0]}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1F1F1F] flex items-center justify-between">
                  <span className="font-serif text-lg text-[#F6F1E8] tabular-nums">${fragrance.price}</span>
                  <button
                    onClick={() => handleMoveToCart(fragrance.id)}
                    className="bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
