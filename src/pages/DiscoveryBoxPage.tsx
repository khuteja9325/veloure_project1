import React, { useState } from 'react';
import { Package, Check, X, ShoppingBag, Gift, Sparkles, ShieldCheck } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';
import { Fragrance } from '../types';
import { useApp } from '../context/AppContext';

export const DiscoveryBoxPage: React.FC = () => {
  const { addToCart, showToast } = useApp();

  const [selectedIds, setSelectedIds] = useState<string[]>([
    'luminary-solstice',
    'aura-nocturne',
    'noir-de-nuit',
  ]);
  const [boxColor, setBoxColor] = useState<'Obsidian Noir Velvet' | 'Champagne Gilded Case' | 'Alabaster Ivory Box'>(
    'Obsidian Noir Velvet'
  );
  const [giftMessage, setGiftMessage] = useState<string>('');
  const [includeCalligraphyNote, setIncludeCalligraphyNote] = useState<boolean>(false);

  const boxBasePrice = 68; // Includes 5 x 2.5ml deluxe glass vials + $68 voucher

  const toggleSample = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length >= 5) {
        showToast('Your bespoke box holds exactly 5 discovery flacons.', 'error');
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleAddBoxToCart = () => {
    if (selectedIds.length !== 5) {
      showToast('Please select all 5 samples before proceeding.', 'error');
      return;
    }

    const boxNames = selectedIds
      .map((id) => FRAGRANCES.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const discoveryBoxPseudoFragrance: Fragrance = {
      id: `discovery-box-${Date.now()}`,
      brand: 'VELOURÉ ATELIER',
      name: `Bespoke Discovery Set (${boxColor})`,
      tagline: '5 x 2.5ml Deluxe Extraction Vials with full-size voucher.',
      price: boxBasePrice,
      rating: 5.0,
      reviewCount: 240,
      image: '/src/assets/images/fragrance_discovery_box_1791467681081.jpg',
      scentFamily: 'Amber',
      topNotes: ['Custom 5 Vials', boxColor],
      heartNotes: [boxNames],
      baseNotes: ['Full $68 flacon redemption voucher included'],
      longevity: 'Long Lasting (8-10h)',
      projection: 'Moderate',
      sillage: 'Moderate',
      season: ['Spring', 'Summer', 'Autumn', 'Winter'],
      occasion: ['Everyday', 'Vacation', 'Romantic'],
      moods: ['Elegant', 'Calm'],
      description: `Curated selection of 5 deluxe 2.5ml atomizer vials in luxury ${boxColor} presentation. Includes a $68 voucher applicable toward any 50ml or 100ml flacon.`,
      story: 'Designed to allow unhurried sensory evolution upon skin over five days.',
      gender: 'Unisex',
      sizes: { '5x2.5ml': boxBasePrice },
    };

    addToCart(discoveryBoxPseudoFragrance, '5x2.5ml', 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium flex items-center justify-center gap-2">
          <Package className="w-3.5 h-3.5" />
          BESPOKE SAMPLING RITUAL
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#F6F1E8]">
          BUILD YOUR DISCOVERY SET
        </h1>
        <p className="text-sm text-[#AAA49A] font-light leading-relaxed">
          Curate five 2.5ml deluxe glass atomizers in an embossed keepsake box. The full purchase price of $68 is credited toward your first 50ml flacon.
        </p>
      </div>

      {/* Builder Layout: Selected Box Summary vs Fragrance Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Box Customizer & Tray (Sticky) */}
        <div className="lg:col-span-5 bg-[#121212] border border-[#262626] p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
          <div className="aspect-[4/3] bg-[#161616] border border-[#2B2B2B] overflow-hidden relative">
            <img
              src="/src/assets/images/fragrance_discovery_box_1791467681081.jpg"
              alt="Velouré Discovery Box Set"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-[#0B0B0B]/85 backdrop-blur-sm px-3 py-1 text-xs text-[#C8A96B] font-medium border border-[#2A2A2A]">
              100% Redeemable Voucher Included
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="border-y border-[#202020] py-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#AAA49A] uppercase tracking-wider">Flacons Selected</span>
              <span className={`font-medium tabular-nums ${selectedIds.length === 5 ? 'text-[#C8A96B]' : 'text-[#F6F1E8]'}`}>
                {selectedIds.length} / 5 SELECTED
              </span>
            </div>
            <div className="w-full bg-[#202020] h-2 overflow-hidden">
              <div
                className="bg-[#C8A96B] h-full transition-all duration-300"
                style={{ width: `${(selectedIds.length / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Chosen 5 Slots */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#777] block">Selected Atomizers:</span>
            <div className="space-y-1.5">
              {[0, 1, 2, 3, 4].map((index) => {
                const id = selectedIds[index];
                const item = id ? FRAGRANCES.find((f) => f.id === id) : null;
                return (
                  <div
                    key={index}
                    className={`p-2.5 border flex items-center justify-between text-xs transition-colors ${
                      item
                        ? 'border-[#2D2D2D] bg-[#181818] text-[#F6F1E8]'
                        : 'border-dashed border-[#242424] bg-transparent text-[#555]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#777] tabular-nums font-mono">0{index + 1}.</span>
                      {item ? (
                        <div>
                          <span className="font-serif text-sm text-[#F6F1E8]">{item.name}</span>
                          <span className="text-[10px] text-[#C8A96B] ml-2">({item.scentFamily})</span>
                        </div>
                      ) : (
                        <span className="italic font-light">Select sample from catalog below</span>
                      )}
                    </div>
                    {item && (
                      <button
                        onClick={() => toggleSample(item.id)}
                        className="text-[#666] hover:text-[#AAA49A] p-1"
                        aria-label="Remove sample"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Packaging Option */}
          <div className="space-y-2 pt-2">
            <label className="text-xs uppercase tracking-wider text-[#F6F1E8] font-medium block">
              Presentation Case Finish
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                'Obsidian Noir Velvet',
                'Champagne Gilded Case',
                'Alabaster Ivory Box',
              ].map((style) => (
                <button
                  key={style}
                  onClick={() => setBoxColor(style as any)}
                  className={`p-2 border text-[11px] leading-tight text-center transition-all ${
                    boxColor === style
                      ? 'border-[#C8A96B] bg-[#C8A96B]/15 text-[#F6F1E8]'
                      : 'border-[#222] bg-[#161616] text-[#AAA49A] hover:border-[#333]'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Gift Message */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-[#AAA49A] block">
                Complimentary Calligraphy Card
              </label>
              <button
                type="button"
                onClick={() => setIncludeCalligraphyNote(!includeCalligraphyNote)}
                className={`text-[10px] uppercase font-semibold ${includeCalligraphyNote ? 'text-[#C8A96B]' : 'text-[#666]'}`}
              >
                {includeCalligraphyNote ? 'REMOVE' : '+ ADD MESSAGE'}
              </button>
            </div>
            {includeCalligraphyNote && (
              <textarea
                rows={2}
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="Inscribe a handwritten gift message (up to 150 characters)..."
                maxLength={150}
                className="w-full bg-[#161616] border border-[#2B2B2B] p-2.5 text-xs text-[#F6F1E8] placeholder:text-[#555] focus:outline-none focus:border-[#C8A96B]"
              />
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-[#202020] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#AAA49A] uppercase tracking-wider">Discovery Set Total</span>
              <span className="font-serif text-2xl text-[#F6F1E8] tabular-nums">${boxBasePrice}</span>
            </div>

            <button
              onClick={handleAddBoxToCart}
              disabled={selectedIds.length !== 5}
              className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 ${
                selectedIds.length === 5
                  ? 'bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] cursor-pointer'
                  : 'bg-[#202020] text-[#666] cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {selectedIds.length === 5
                  ? 'ADD DISCOVERY BOX TO CART'
                  : `SELECT ${5 - selectedIds.length} MORE TO COMPLETE`}
              </span>
            </button>
          </div>
        </div>

        {/* Right: Available Samples Selection Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-[#202020] pb-3">
            <h3 className="font-serif text-2xl text-[#F6F1E8]">Select Your 5 Flacons</h3>
            <span className="text-xs text-[#AAA49A]">All 16 Editions Available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FRAGRANCES.map((fragrance) => {
              const isSelected = selectedIds.includes(fragrance.id);
              return (
                <div
                  key={fragrance.id}
                  onClick={() => toggleSample(fragrance.id)}
                  className={`p-4 border transition-all cursor-pointer flex gap-3 items-center group ${
                    isSelected
                      ? 'border-[#C8A96B] bg-[#C8A96B]/10'
                      : 'border-[#222222] bg-[#131313] hover:border-[#383838]'
                  }`}
                >
                  <img
                    src={fragrance.image}
                    alt={fragrance.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover border border-[#2B2B2B] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] tracking-wider uppercase text-[#C8A96B] block">
                      {fragrance.scentFamily}
                    </span>
                    <h4 className="font-serif text-base text-[#F6F1E8] group-hover:text-[#C8A96B] transition-colors truncate">
                      {fragrance.name}
                    </h4>
                    <p className="text-[11px] text-[#888] font-light truncate">
                      {fragrance.topNotes[0]} &bull; {fragrance.baseNotes[0]}
                    </p>
                  </div>
                  <div className="shrink-0 p-2">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#C8A96B] bg-[#C8A96B] text-[#0B0B0B]'
                          : 'border-[#444] text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
