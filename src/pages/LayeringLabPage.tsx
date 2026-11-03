import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Layers, Sparkles, Plus, Check, ShoppingBag, Bookmark, ArrowRight, RotateCcw } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';
import { Fragrance } from '../types';
import { useApp } from '../context/AppContext';

export const LayeringLabPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { saveLayeringCombo, addToCart, showToast } = useApp();

  const [scent1Id, setScent1Id] = useState<string>(() => {
    return searchParams.get('scent1') || 'aura-nocturne';
  });

  const [scent2Id, setScent2Id] = useState<string>(() => {
    return searchParams.get('scent2') || 'luminary-solstice';
  });

  const scent1 = useMemo(() => FRAGRANCES.find((f) => f.id === scent1Id) || FRAGRANCES[0], [scent1Id]);
  const scent2 = useMemo(() => FRAGRANCES.find((f) => f.id === scent2Id) || FRAGRANCES[1], [scent2Id]);

  // Compatibility Calculation
  const pairingAnalysis = useMemo(() => {
    // If same fragrance
    if (scent1.id === scent2.id) {
      return {
        score: 60,
        name: 'Monochromatic Double Maceration',
        resultingProfile: 'AMPLIFIED MONOCHROME ESSENCE',
        description: 'Layering the same formula amplifies sillage and depth, though without contrasting tension.',
        complementaryNotes: scent1.topNotes.slice(0, 3),
        bestOccasion: 'Evening',
        bestSeason: 'Autumn / Winter',
      };
    }

    // Dynamic intelligent score based on family compatibility
    const f1 = scent1.scentFamily;
    const f2 = scent2.scentFamily;

    let score = 84;
    let title = 'The Velvet Contrast';
    let profile = 'BALANCED HARMONIC RESONANCE';
    let why = 'Warm resinous anchors cradle the top notes in a multi-dimensional cloud.';

    if ((f1 === 'Woody' && f2 === 'Amber') || (f1 === 'Amber' && f2 === 'Woody')) {
      score = 94;
      title = 'The Imperial Hearth';
      profile = 'OPULENT RESINOUS WOOD & GOLDEN EMBERS';
      why = 'Woody cedar structure provides an architectural spine, allowing luminous amber resins and bourbon vanilla to bloom without cloying sweetness.';
    } else if ((f1 === 'Citrus' && f2 === 'Woody') || (f1 === 'Woody' && f2 === 'Citrus')) {
      score = 91;
      title = 'The Mediterranean Twilight';
      profile = 'CRISP ZEPHYR OVER RAW CEDAR';
      why = 'Calabrian bergamot and neroli inject radiant daylight into dark smoky vetiver and sandalwood roots.';
    } else if ((f1 === 'Floral' && f2 === 'Amber') || (f1 === 'Amber' && f2 === 'Floral')) {
      score = 89;
      title = 'The Nocturnal Salon';
      profile = 'VELVET MIDNIGHT PETALS ON WARM RESIN';
      why = 'Fragile damask rose and powdered iris are warmed from beneath by labdanum and honeyed benzoin.';
    } else if ((f1 === 'Spicy' && f2 === 'Woody') || (f1 === 'Woody' && f2 === 'Spicy')) {
      score = 92;
      title = 'The Silk Road Sanctuary';
      profile = 'SMOKED CARDAMOM & SACRED WOODS';
      why = 'Fiery pink pepper and cardamom pods crackle against deep Mysore sandalwood and raw leather.';
    } else if (f1 === 'Citrus' && f2 === 'Floral') {
      score = 88;
      title = 'Grasse Springtime Radiance';
      profile = 'DEWY ORANGE BLOSSOM & SUNLIT PETALS';
      why = 'Sparkling petitgrain lifts delicate white petals, creating an airy, romantic morning aura.';
    } else {
      score = 86;
      title = `${scent1.name.split(' ')[0]} & ${scent2.name.split(' ')[0]} Accord`;
      profile = `${f1.toUpperCase()} & ${f2.toUpperCase()} JUXTAPOSITION`;
      why = 'A daring juxtaposition that transforms conventional fragrance hierarchies into an avant-garde personal signature.';
    }

    const mergedNotes = Array.from(new Set([...scent1.heartNotes.slice(0, 2), ...scent2.baseNotes.slice(0, 2)]));

    return {
      score,
      name: title,
      resultingProfile: profile,
      description: why,
      complementaryNotes: mergedNotes,
      bestOccasion: 'Evening Soirées & Intimate Dinners',
      bestSeason: 'Autumn / Winter',
    };
  }, [scent1, scent2]);

  const handleSaveCombo = () => {
    saveLayeringCombo({
      scent1Id: scent1.id,
      scent2Id: scent2.id,
      name: pairingAnalysis.name,
      score: pairingAnalysis.score,
      resultingProfile: pairingAnalysis.resultingProfile,
      description: pairingAnalysis.description,
      bestOccasion: pairingAnalysis.bestOccasion,
      bestSeason: pairingAnalysis.bestSeason,
    });
  };

  const handleAddBothToBag = () => {
    addToCart(scent1, '50ml', 1);
    addToCart(scent2, '50ml', 1);
    showToast(`Added both ${scent1.name} and ${scent2.name} to your bag`);
  };

  // Quick Curated Presets
  const curatedPresets = [
    { name: 'Imperial Hearth', s1: 'aura-nocturne', s2: 'luminary-solstice' },
    { name: 'Mediterranean Twilight', s1: 'citrus-blossom', s2: 'santal-reve' },
    { name: 'Dark Velvet Rose', s1: 'noir-de-nuit', s2: 'nectar-d-ambre' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* Editorial Headline */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium flex items-center justify-center gap-2">
          <Layers className="w-3.5 h-3.5" />
          ATELIER EXPERIMENTATION
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#F6F1E8]">
          CREATE SOMETHING<br />
          <span className="italic font-light text-[#D8CBB8]">UNIQUELY YOURS.</span>
        </h1>
        <p className="text-sm text-[#AAA49A] font-light leading-relaxed">
          Select two bespoke flacons to calculate harmonic resonance. Velouré balances contrasting note structures to formulate your unrepeatable olfactory signature.
        </p>

        {/* Quick Presets */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-[#666] uppercase tracking-wider text-[10px]">Curator Presets:</span>
          {curatedPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setScent1Id(preset.s1);
                setScent2Id(preset.s2);
              }}
              className="px-3 py-1 bg-[#141414] hover:bg-[#1F1F1F] border border-[#262626] text-[#D8CBB8] transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Selection Bench (Two Flacons + Plus sign) */}
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
        {/* SCENT ONE SELECTOR */}
        <div className="lg:col-span-5 bg-[#121212] border border-[#222222] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#202020] pb-3">
            <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-medium">
              BASE LAYER (PRIMARY ANCHOR)
            </span>
            <span className="text-xs text-[#AAA49A]">{scent1.scentFamily}</span>
          </div>

          <div className="flex gap-4 items-center">
            <img
              src={scent1.image}
              alt={scent1.name}
              referrerPolicy="no-referrer"
              className="w-24 h-28 object-cover border border-[#2B2B2B] shrink-0"
            />
            <div className="space-y-1 flex-1 min-w-0">
              <h3 className="font-serif text-2xl text-[#F6F1E8] truncate">{scent1.name}</h3>
              <p className="text-xs text-[#AAA49A] font-light line-clamp-2">{scent1.tagline}</p>
              <div className="pt-2 text-xs text-[#C8A96B] tabular-nums">${scent1.price} (50ml)</div>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#777] block mb-1.5">
              Change Scent One
            </label>
            <select
              value={scent1Id}
              onChange={(e) => setScent1Id(e.target.value)}
              className="w-full bg-[#181818] border border-[#2A2A2A] p-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B] cursor-pointer"
            >
              {FRAGRANCES.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} — {f.scentFamily} (${f.price})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PLUS CONNECTOR */}
        <div className="lg:col-span-1 flex justify-center">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#C8A96B] font-serif text-xl">
            +
          </div>
        </div>

        {/* SCENT TWO SELECTOR */}
        <div className="lg:col-span-5 bg-[#121212] border border-[#222222] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#202020] pb-3">
            <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-medium">
              OVERLAY LAYER (RESONANCE)
            </span>
            <span className="text-xs text-[#AAA49A]">{scent2.scentFamily}</span>
          </div>

          <div className="flex gap-4 items-center">
            <img
              src={scent2.image}
              alt={scent2.name}
              referrerPolicy="no-referrer"
              className="w-24 h-28 object-cover border border-[#2B2B2B] shrink-0"
            />
            <div className="space-y-1 flex-1 min-w-0">
              <h3 className="font-serif text-2xl text-[#F6F1E8] truncate">{scent2.name}</h3>
              <p className="text-xs text-[#AAA49A] font-light line-clamp-2">{scent2.tagline}</p>
              <div className="pt-2 text-xs text-[#C8A96B] tabular-nums">${scent2.price} (50ml)</div>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#777] block mb-1.5">
              Change Scent Two
            </label>
            <select
              value={scent2Id}
              onChange={(e) => setScent2Id(e.target.value)}
              className="w-full bg-[#181818] border border-[#2A2A2A] p-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B] cursor-pointer"
            >
              {FRAGRANCES.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} — {f.scentFamily} (${f.price})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RESULTING SYNERGY CARD */}
      <div className="p-8 sm:p-12 bg-[#121212] border border-[#2B2B2B] space-y-8 relative overflow-hidden">
        {/* Header & Score */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#202020] pb-6 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A96B] font-medium">
              HARMONIC COMPATIBILITY VERDICT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
              {pairingAnalysis.name}
            </h2>
          </div>

          <div className="text-left sm:text-right">
            <div className="inline-flex items-center gap-2 bg-[#C8A96B]/15 border border-[#C8A96B]/40 px-4 py-2">
              <Sparkles className="w-4 h-4 text-[#C8A96B]" />
              <span className="font-serif text-2xl text-[#C8A96B] font-medium tabular-nums">
                {pairingAnalysis.score}% COMPATIBLE
              </span>
            </div>
          </div>
        </div>

        {/* Diagnosis & Why it works */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#AAA49A] font-medium">
              Resulting Scent Profile
            </h3>
            <p className="font-serif text-xl sm:text-2xl text-[#F6F1E8]">
              {pairingAnalysis.resultingProfile}
            </p>
            <p className="text-sm text-[#AAA49A] font-light leading-relaxed">
              &ldquo;{pairingAnalysis.description}&rdquo;
            </p>

            {/* Complementary Notes chips */}
            <div className="pt-4">
              <span className="text-[10px] uppercase tracking-wider text-[#777] block mb-2">
                Harmonic Bridge Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {pairingAnalysis.complementaryNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 bg-[#1A1A1A] border border-[#2B2B2B] text-xs text-[#D8CBB8] font-light"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#202020] md:pl-8 space-y-4 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#777] block">Best Occasion</span>
              <p className="text-[#F6F1E8] font-light mt-0.5">{pairingAnalysis.bestOccasion}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#777] block">Best Season</span>
              <p className="text-[#F6F1E8] font-light mt-0.5">{pairingAnalysis.bestSeason}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#777] block">Application Protocol</span>
              <p className="text-[#AAA49A] font-light mt-0.5 leading-relaxed">
                Apply 2 sprays of {scent1.name} directly to warm pulse points (wrists, base of neck). Wait 60 seconds, then mist 2 sprays of {scent2.name} over top for seamless diffusion.
              </p>
            </div>
          </div>
        </div>

        {/* Dual Actions */}
        <div className="pt-6 border-t border-[#202020] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSaveCombo}
              className="w-full sm:w-auto px-6 py-3 bg-[#1A1A1A] hover:bg-[#252525] border border-[#2B2B2B] text-xs uppercase tracking-wider text-[#F6F1E8] transition-colors flex items-center justify-center gap-2"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>SAVE COMBINATION</span>
            </button>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-[#777]">Combined Duo Price</span>
              <p className="font-serif text-xl text-[#F6F1E8] tabular-nums">
                ${scent1.price + scent2.price}
              </p>
            </div>
            <button
              onClick={handleAddBothToBag}
              className="w-full sm:w-auto bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD BOTH TO BAG &bull; ${scent1.price + scent2.price}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
