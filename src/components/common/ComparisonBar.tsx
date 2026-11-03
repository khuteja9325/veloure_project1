import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FRAGRANCES } from '../../data/fragrances';

export const ComparisonBar: React.FC = () => {
  const { comparisonIds, removeFromComparison, clearComparison } = useApp();

  if (comparisonIds.length === 0) return null;

  const comparedFragrances = FRAGRANCES.filter((f) => comparisonIds.includes(f.id));

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#121212]/95 border-t border-[#262626] backdrop-blur-md px-6 py-3.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-[#AAA49A]">
            <Scale className="w-4 h-4 text-[#C8A96B]" />
            <span className="uppercase tracking-wider font-medium text-[#F6F1E8]">
              Comparison Bench ({comparisonIds.length}/3)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {comparedFragrances.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2B2B2B] px-3 py-1 text-xs"
              >
                <img
                  src={f.image}
                  alt={f.name}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 object-cover"
                />
                <span className="font-serif text-[#F6F1E8]">{f.name}</span>
                <button
                  onClick={() => removeFromComparison(f.id)}
                  className="text-[#666] hover:text-[#AAA49A] ml-1"
                  aria-label={`Remove ${f.name} from comparison`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={clearComparison}
            className="text-[11px] text-[#777] hover:text-[#AAA49A] uppercase tracking-wider"
          >
            Clear All
          </button>
          <Link
            to="/compare"
            className="bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-5 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <span>COMPARE NOW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
