import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, ShoppingBag, Plus, Star, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FRAGRANCES } from '../data/fragrances';

export const ComparePage: React.FC = () => {
  const { comparisonIds, addToComparison, removeFromComparison, clearComparison, addToCart } = useApp();

  // If no comparison IDs, show defaults
  const activeIds = comparisonIds.length > 0 ? comparisonIds : ['luminary-solstice', 'aura-nocturne', 'noir-de-nuit'];
  const comparedFragrances = FRAGRANCES.filter((f) => activeIds.includes(f.id));

  // Determine benchmark highlights
  const highestRating = Math.max(...comparedFragrances.map((f) => f.rating));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#202020] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium flex items-center gap-2">
            <Scale className="w-3.5 h-3.5" />
            OLFACTORY BENCHMARK
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F6F1E8] mt-1">
            Fragrance Comparison Matrix
          </h1>
          <p className="text-xs text-[#AAA49A] mt-1 font-light">
            Compare notes, sillage trails, and wear time across up to three haute parfumerie flacons.
          </p>
        </div>

        {comparisonIds.length > 0 && (
          <button
            onClick={clearComparison}
            className="text-xs uppercase tracking-wider text-[#777] hover:text-[#AAA49A]"
          >
            Clear Selected Bench
          </button>
        )}
      </div>

      {/* Comparison Selector Dropdown if less than 3 */}
      {comparedFragrances.length < 3 && (
        <div className="p-4 bg-[#141414] border border-[#242424] flex items-center justify-between text-xs">
          <span className="text-[#AAA49A]">Add another fragrance to the comparison bench ({comparedFragrances.length}/3):</span>
          <select
            onChange={(e) => {
              if (e.target.value) addToComparison(e.target.value);
            }}
            defaultValue=""
            className="bg-[#1C1C1C] border border-[#333] px-3 py-1.5 text-xs text-[#F6F1E8]"
          >
            <option value="" disabled>Select fragrance to add...</option>
            {FRAGRANCES.filter((f) => !activeIds.includes(f.id)).map((f) => (
              <option key={f.id} value={f.id}>{f.name} (${f.price})</option>
            ))}
          </select>
        </div>
      )}

      {/* Clean Comparison Matrix Table */}
      <div className="overflow-x-auto border border-[#222222] bg-[#121212]">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#222222] bg-[#151515]">
              <th className="p-6 w-1/4 text-[10px] uppercase tracking-widest text-[#AAA49A] font-medium align-top">
                SPECIFICATIONS
              </th>
              {comparedFragrances.map((f) => (
                <th key={f.id} className="p-6 w-1/4 align-top border-l border-[#202020] relative">
                  <button
                    onClick={() => removeFromComparison(f.id)}
                    className="absolute top-4 right-4 text-[#666] hover:text-[#AAA49A]"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <img
                    src={f.image}
                    alt={f.name}
                    referrerPolicy="no-referrer"
                    className="w-24 h-28 object-cover border border-[#2A2A2A] mb-3"
                  />
                  <span className="text-[10px] uppercase tracking-wider text-[#C8A96B] block">
                    {f.brand}
                  </span>
                  <Link to={`/product/${f.id}`}>
                    <h3 className="font-serif text-xl text-[#F6F1E8] hover:text-[#C8A96B] transition-colors mt-0.5">
                      {f.name}
                    </h3>
                  </Link>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-serif text-lg text-[#F6F1E8] tabular-nums">${f.price}</span>
                    <button
                      onClick={() => addToCart(f, '50ml', 1)}
                      className="bg-[#C8A96B] text-[#0B0B0B] px-3 py-1 text-[11px] uppercase tracking-wider font-medium hover:bg-[#D8CBB8] transition-colors"
                    >
                      Add to Bag
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D1D1D] font-light">
            {/* Rating */}
            <tr>
              <td className="p-4 text-[#AAA49A] font-medium uppercase text-[10px] tracking-wider">
                Rating & Reviews
              </td>
              {comparedFragrances.map((f) => (
                <td key={f.id} className="p-4 border-l border-[#1D1D1D]">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#C8A96B] fill-[#C8A96B]" />
                    <span className={`tabular-nums font-medium ${f.rating === highestRating ? 'text-[#C8A96B]' : 'text-[#F6F1E8]'}`}>
                      {f.rating.toFixed(2)}
                    </span>
                    <span className="text-[#666] text-[10px]">({f.reviewCount} reviews)</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Scent Family */}
            <tr>
              <td className="p-4 text-[#AAA49A] font-medium uppercase text-[10px] tracking-wider">
                Scent Family
              </td>
              {comparedFragrances.map((f) => (
                <td key={f.id} className="p-4 border-l border-[#1D1D1D] text-[#F6F1E8]">
                  <span className="font-medium text-[#C8A96B]">{f.scentFamily}</span>
                  {f.secondaryFamily && <span className="text-[#AAA49A]"> / {f.secondaryFamily}</span>}
                </td>
              ))}
            </tr>

            {/* Top Notes */}
            <tr>
              <td className="p-4 text-[#AAA49A] font-medium uppercase text-[10px] tracking-wider">
                Top Notes (Opening)
              </td>
              {comparedFragrances.map((f) => (
                <td key={f.id} className="p-4 border-l border-[#1D1D1D] text-[#D8CBB8]">
                  {f.topNotes.join(', ')}
                </td>
              ))}
            </tr>

            {/* Heart Notes */}
            <tr>
              <td className="p-4 text-[#AAA49A] font-medium uppercase text-[10px] tracking-wider">
                Heart Notes (Corps)
              </td>
              {comparedFragrances.map((f) => (
                <td key={f.id} className="p-4 border-l border-[#1D1D1D] text-[#D8CBB8]">
                  {f.heartNotes.join(', ')}
                </td>
              ))}
            </tr>

            {/* Base Notes */}
            <tr>
              <td className="p-4 text-[#AAA49A] font-medium uppercase text-[10px] tracking-wider">
                Base Notes (Drydown)
              </td>
              {comparedFragrances.map((f) => (
                <td key={f.id} className="p-4 border-l border-[#1D1D1D] text-[#D8CBB8]">
                  {f.baseNotes.join(', ')}
                </td>
              ))}
            </tr>

            {/* Longevity */}
            <tr>
              <td className="p-4 text-[#AAA49A] font-medium uppercase text-[10px] tracking-wider">
                Longevity
              </td>
              {comparedFragrances.map((f) => (
                <td key={f.id} className="p-4 border-l border-[#1D1D1D]">
                  <span className={`px-2 py-0.5 border ${f.longevity.includes('Eternal') ? 'border-[#C8A96B] text-[#C8A96B] bg-[#C8A96B]/10' : 'border-[#282828] text-[#AAA49A]'}`}>
                    {f.longevity}
                  </span>
                </td>
              ))}
            </tr>

            {/* Projection & Sillage */}
            <tr>
              <td className="p-4 text-[#AAA49A] font-medium uppercase text-[10px] tracking-wider">
                Projection & Sillage
              </td>
              {comparedFragrances.map((f) => (
                <td key={f.id} className="p-4 border-l border-[#1D1D1D] text-[#AAA49A]">
                  <p><strong className="text-[#F6F1E8]">Projection:</strong> {f.projection}</p>
                  <p className="mt-0.5"><strong className="text-[#F6F1E8]">Sillage:</strong> {f.sillage}</p>
                </td>
              ))}
            </tr>

            {/* Best Season */}
            <tr>
              <td className="p-4 text-[#AAA49A] font-medium uppercase text-[10px] tracking-wider">
                Optimal Seasons
              </td>
              {comparedFragrances.map((f) => (
                <td key={f.id} className="p-4 border-l border-[#1D1D1D] text-[#D8CBB8]">
                  {f.season.join(' &bull; ')}
                </td>
              ))}
            </tr>

            {/* Best Occasion */}
            <tr>
              <td className="p-4 text-[#AAA49A] font-medium uppercase text-[10px] tracking-wider">
                Prime Occasions
              </td>
              {comparedFragrances.map((f) => (
                <td key={f.id} className="p-4 border-l border-[#1D1D1D] text-[#D8CBB8]">
                  {f.occasion.join(', ')}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
