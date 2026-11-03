import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star, Scale } from 'lucide-react';
import { Fragrance } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  fragrance: Fragrance;
  showCompareToggle?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ fragrance, showCompareToggle = true }) => {
  const {
    addToCart,
    addToWishlist,
    isInWishlist,
    addToComparison,
    isInComparison,
  } = useApp();

  const isFavorited = isInWishlist(fragrance.id);
  const isCompared = isInComparison(fragrance.id);

  return (
    <div className="group flex flex-col bg-[#121212] border border-[#1E1E1E] hover:border-[#383838] transition-all duration-300 relative">
      {/* Editorial Status Badge (Single subtle text badge, no pill sandwich) */}
      {fragrance.isNewArrival && (
        <span className="absolute top-3 left-3 z-10 text-[10px] tracking-[0.2em] uppercase text-[#C8A96B] font-medium bg-[#0B0B0B]/80 px-2 py-1 backdrop-blur-sm">
          New Harvest
        </span>
      )}
      {!fragrance.isNewArrival && fragrance.isFeatured && (
        <span className="absolute top-3 left-3 z-10 text-[10px] tracking-[0.2em] uppercase text-[#AAA49A] font-light bg-[#0B0B0B]/80 px-2 py-1 backdrop-blur-sm">
          Signature
        </span>
      )}

      {/* Action Overlay: Wishlist */}
      <button
        onClick={(e) => {
          e.preventDefault();
          addToWishlist(fragrance.id);
        }}
        className={`absolute top-3 right-3 z-10 p-2 transition-colors ${
          isFavorited
            ? 'text-[#C8A96B] bg-[#0B0B0B]/90'
            : 'text-[#888] hover:text-[#F6F1E8] bg-[#0B0B0B]/70'
        } backdrop-blur-sm`}
        aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#C8A96B]' : ''}`} />
      </button>

      {/* Image Area */}
      <Link
        to={`/product/${fragrance.id}`}
        className="block relative overflow-hidden bg-[#161616] aspect-[4/5] w-full"
      >
        <img
          src={fragrance.image}
          alt={fragrance.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Hover Quick Action Tray */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0B0B0B]/95 via-[#0B0B0B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(fragrance, '50ml', 1);
            }}
            className="flex-1 bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] py-2 px-3 text-[11px] uppercase tracking-[0.15em] font-medium transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>QUICK ADD &bull; ${fragrance.price}</span>
          </button>

          {showCompareToggle && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToComparison(fragrance.id);
              }}
              title={isCompared ? 'Remove from benchmark comparison' : 'Compare with another fragrance'}
              className={`p-2 border transition-colors ${
                isCompared
                  ? 'bg-[#C8A96B] text-[#0B0B0B] border-[#C8A96B]'
                  : 'bg-[#151515] text-[#AAA49A] hover:text-[#F6F1E8] border-[#2A2A2A]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata clean unboxed line */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#AAA49A] tracking-wider uppercase font-light">
            <span>{fragrance.scentFamily}</span>
            <span aria-hidden="true">&bull;</span>
            <span>{fragrance.gender}</span>
          </div>

          {/* Fragrance Name */}
          <Link to={`/product/${fragrance.id}`}>
            <h3 className="font-serif text-lg text-[#F6F1E8] group-hover:text-[#C8A96B] transition-colors mt-1 font-normal tracking-wide">
              {fragrance.name}
            </h3>
          </Link>

          {/* Subtle Key Notes */}
          <p className="text-xs text-[#8A857D] font-light mt-1.5 line-clamp-1">
            {fragrance.topNotes.slice(0, 2).join(', ')} / {fragrance.baseNotes[0]}
          </p>
        </div>

        {/* Rating and Price Baseline */}
        <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#AAA49A]">
            <Star className="w-3.5 h-3.5 text-[#C8A96B] fill-[#C8A96B]" />
            <span className="font-medium text-[#F6F1E8] tabular-nums">{fragrance.rating.toFixed(1)}</span>
            <span className="text-[#666] text-[11px] tabular-nums">({fragrance.reviewCount})</span>
          </div>

          <div className="text-right">
            <span className="font-serif text-base text-[#F6F1E8] tabular-nums font-medium">
              ${fragrance.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
