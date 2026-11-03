import React from 'react';
import { Fragrance } from '../../types';
import { Wind, Clock, Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface FragranceDNAProps {
  fragrance: Fragrance;
}

export const FragranceDNA: React.FC<FragranceDNAProps> = ({ fragrance }) => {
  // Longevity bar percentage
  const longevityScore =
    fragrance.longevity === 'Eternal (12h+)'
      ? 95
      : fragrance.longevity === 'Long Lasting (8-10h)'
      ? 78
      : 55;

  // Projection bar percentage
  const projectionScore =
    fragrance.projection === 'Enormous'
      ? 98
      : fragrance.projection === 'Strong'
      ? 80
      : fragrance.projection === 'Moderate'
      ? 60
      : 35;

  // Sillage bar percentage
  const sillageScore =
    fragrance.sillage === 'Heavy'
      ? 90
      : fragrance.sillage === 'Moderate'
      ? 65
      : 40;

  return (
    <div className="bg-[#121212] border border-[#222222] p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#202020] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C8A96B] font-medium">
            OLFACTORY ARCHITECTURE
          </span>
          <h3 className="font-serif text-2xl text-[#F6F1E8]">
            Fragrance DNA Pyramid
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#AAA49A]">
          <span className="text-[#C8A96B] font-medium">{fragrance.scentFamily}</span>
          {fragrance.secondaryFamily && (
            <>
              <span>/</span>
              <span>{fragrance.secondaryFamily}</span>
            </>
          )}
        </div>
      </div>

      {/* Visual Olfactory Pyramid */}
      <div className="space-y-4">
        {/* TOP NOTES */}
        <div className="p-4 bg-[#161616] border border-[#262626] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#E5D0A1]" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase text-[#AAA49A] font-medium">
                  TOP NOTES (0–20 MIN)
                </span>
                <span className="text-[10px] text-[#666] font-light">Immediate Impression</span>
              </div>
              <p className="font-serif text-lg text-[#F6F1E8] mt-1">
                {fragrance.topNotes.join(' &bull; ')}
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {fragrance.topNotes.map((note) => (
                <span
                  key={note}
                  className="text-[11px] px-2.5 py-1 bg-[#1F1F1F] text-[#D8CBB8] border border-[#2B2B2B] font-light"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* HEART NOTES */}
        <div className="p-4 bg-[#151515] border border-[#262626] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#C8A96B]" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase text-[#AAA49A] font-medium">
                  HEART / CORPS (20 MIN–4 HRS)
                </span>
                <span className="text-[10px] text-[#666] font-light">The Signature Identity</span>
              </div>
              <p className="font-serif text-lg text-[#F6F1E8] mt-1">
                {fragrance.heartNotes.join(' &bull; ')}
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {fragrance.heartNotes.map((note) => (
                <span
                  key={note}
                  className="text-[11px] px-2.5 py-1 bg-[#1F1F1F] text-[#D8CBB8] border border-[#2B2B2B] font-light"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BASE NOTES */}
        <div className="p-4 bg-[#141414] border border-[#262626] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#967C46]" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase text-[#AAA49A] font-medium">
                  BASE NOTES (4–12+ HRS)
                </span>
                <span className="text-[10px] text-[#666] font-light">Sensual Drydown & Memory</span>
              </div>
              <p className="font-serif text-lg text-[#F6F1E8] mt-1">
                {fragrance.baseNotes.join(' &bull; ')}
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {fragrance.baseNotes.map((note) => (
                <span
                  key={note}
                  className="text-[11px] px-2.5 py-1 bg-[#1F1F1F] text-[#D8CBB8] border border-[#2B2B2B] font-light"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance & Projection Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#202020]">
        {/* Longevity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#AAA49A] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C8A96B]" />
              Longevity
            </span>
            <span className="text-[#F6F1E8] font-medium">{fragrance.longevity}</span>
          </div>
          <div className="w-full bg-[#202020] h-1.5 overflow-hidden">
            <div
              className="bg-[#C8A96B] h-full transition-all duration-700"
              style={{ width: `${longevityScore}%` }}
            />
          </div>
        </div>

        {/* Projection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#AAA49A] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
              Projection
            </span>
            <span className="text-[#F6F1E8] font-medium">{fragrance.projection}</span>
          </div>
          <div className="w-full bg-[#202020] h-1.5 overflow-hidden">
            <div
              className="bg-[#C8A96B] h-full transition-all duration-700"
              style={{ width: `${projectionScore}%` }}
            />
          </div>
        </div>

        {/* Sillage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#AAA49A] uppercase tracking-wider flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-[#C8A96B]" />
              Sillage
            </span>
            <span className="text-[#F6F1E8] font-medium">{fragrance.sillage}</span>
          </div>
          <div className="w-full bg-[#202020] h-1.5 overflow-hidden">
            <div
              className="bg-[#C8A96B] h-full transition-all duration-700"
              style={{ width: `${sillageScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Occasions and Season Suitability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#202020] text-xs">
        <div>
          <span className="text-[#AAA49A] uppercase tracking-wider block mb-2 font-medium">
            Optimal Seasons
          </span>
          <div className="flex flex-wrap gap-1.5">
            {['Spring', 'Summer', 'Autumn', 'Winter'].map((s) => {
              const isMatch = fragrance.season.includes(s as any);
              return (
                <span
                  key={s}
                  className={`px-3 py-1 border font-light ${
                    isMatch
                      ? 'border-[#C8A96B] text-[#F6F1E8] bg-[#C8A96B]/10'
                      : 'border-[#222] text-[#555] bg-transparent'
                  }`}
                >
                  {s}
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <span className="text-[#AAA49A] uppercase tracking-wider block mb-2 font-medium">
            Prime Occasions
          </span>
          <div className="flex flex-wrap gap-1.5">
            {fragrance.occasion.map((occ) => (
              <span
                key={occ}
                className="px-3 py-1 border border-[#2B2B2B] bg-[#161616] text-[#D8CBB8] font-light"
              >
                {occ}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
