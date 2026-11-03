import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, ArrowRight, Check, ShoppingBag, Sparkles, RotateCcw } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';
import { Fragrance } from '../types';
import { useApp } from '../context/AppContext';

export const GiftConciergePage: React.FC = () => {
  const { addToCart, showToast } = useApp();

  const [step, setStep] = useState<number>(1);
  const [recipient, setRecipient] = useState<string>('Partner / Significant Other');
  const [relationship, setRelationship] = useState<string>('Romantic Partner');
  const [personality, setPersonality] = useState<string>('Refined & Sophisticated');
  const [occasion, setOccasion] = useState<string>('Anniversary / Milestone');
  const [budget, setBudget] = useState<string>('$200 – $280');
  const [style, setStyle] = useState<string>('Warm, comforting woody amber');

  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // Recommendations calculated based on choices
  const giftRecommendations = [
    {
      fragrance: FRAGRANCES.find((f) => f.id === 'luminary-solstice')!,
      giftRationale:
        'A majestic, universally celebrated masterpiece. Its balance of luminous saffron, warm bourbon vanilla, and Mysore sandalwood feels celebratory, luxurious, and deeply intimate.',
    },
    {
      fragrance: FRAGRANCES.find((f) => f.id === 'aura-nocturne')!,
      giftRationale:
        'Ideal for someone who appreciates dark elegance and mystery. The presentation flacon exudes quiet power, and the smoky leather drydown feels like an opulent cashmere embrace.',
    },
    {
      fragrance: FRAGRANCES.find((f) => f.id === 'santal-reve')!,
      giftRationale:
        'The safest high-end niche choice: calming, creamy Australian sandalwood and Florentine iris. It feels like an organic second skin that will be cherished every single day.',
    },
  ];

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      setIsCalculated(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-12 min-h-[75vh]">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium flex items-center justify-center gap-2">
          <Gift className="w-3.5 h-3.5" />
          ATELIER GIFT CONCIERGE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#F6F1E8]">
          Find the Unforgettable Gift
        </h1>
        <p className="text-sm text-[#AAA49A] font-light leading-relaxed">
          Gifting perfume is an intimate gesture of love and admiration. Answer six guided inquiries to receive bespoke curation backed by our sample guarantee.
        </p>
      </div>

      {!isCalculated ? (
        <div className="bg-[#121212] border border-[#242424] p-8 sm:p-12 space-y-8">
          <div className="flex items-center justify-between text-xs border-b border-[#202020] pb-4">
            <span className="text-[#C8A96B] uppercase tracking-wider font-medium">Inquiry 0{step} of 06</span>
            <span className="text-[#AAA49A]">Gift Diagnostic</span>
          </div>

          {/* STEP 1: RECIPIENT */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F1E8]">
                Who are you curating this gift for?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Partner / Significant Other', 'Cherished Friend', 'Parent or Mentor', 'Myself (Bespoke Indulgence)'].map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() => setRecipient(opt)}
                      className={`p-4 border text-left text-xs transition-all ${
                        recipient === opt
                          ? 'border-[#C8A96B] bg-[#C8A96B]/15 text-[#F6F1E8] font-medium'
                          : 'border-[#262626] bg-[#161616] text-[#AAA49A] hover:border-[#383838]'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* STEP 2: RELATIONSHIP TONE */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F1E8]">
                What emotion should this gift evoke?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Deep Intimacy & Passion', 'Warm Admiration & Gratitude', 'Timeless Prestige & Elegance', 'Carefree Joy & Freshness'].map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() => setRelationship(opt)}
                      className={`p-4 border text-left text-xs transition-all ${
                        relationship === opt
                          ? 'border-[#C8A96B] bg-[#C8A96B]/15 text-[#F6F1E8] font-medium'
                          : 'border-[#262626] bg-[#161616] text-[#AAA49A] hover:border-[#383838]'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* STEP 3: PERSONALITY */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F1E8]">
                How would you describe their essence?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Refined & Sophisticated', 'Mysterious & Thoughtful', 'Vibrant & Spontaneous', 'Gentle & Calming Minimalist'].map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() => setPersonality(opt)}
                      className={`p-4 border text-left text-xs transition-all ${
                        personality === opt
                          ? 'border-[#C8A96B] bg-[#C8A96B]/15 text-[#F6F1E8] font-medium'
                          : 'border-[#262626] bg-[#161616] text-[#AAA49A] hover:border-[#383838]'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* STEP 4: OCCASION */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F1E8]">
                What is the occasion?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Anniversary / Milestone', 'Birthday Celebration', 'Holiday / Festive Winter', 'Spontaneous Token of Affection'].map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() => setOccasion(opt)}
                      className={`p-4 border text-left text-xs transition-all ${
                        occasion === opt
                          ? 'border-[#C8A96B] bg-[#C8A96B]/15 text-[#F6F1E8] font-medium'
                          : 'border-[#262626] bg-[#161616] text-[#AAA49A] hover:border-[#383838]'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* STEP 5: BUDGET */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F1E8]">
                What is your gifting range?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Discovery Box ($68)', '$190 – $240 (50ml Atelier)', '$250+ (Private Reserve / 100ml)'].map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() => setBudget(opt)}
                      className={`p-4 border text-left text-xs transition-all ${
                        budget === opt
                          ? 'border-[#C8A96B] bg-[#C8A96B]/15 text-[#F6F1E8] font-medium'
                          : 'border-[#262626] bg-[#161616] text-[#AAA49A] hover:border-[#383838]'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* STEP 6: FRAGRANCE STYLE */}
          {step === 6 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F1E8]">
                Preferred fragrance aesthetic?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Warm, comforting woody amber',
                  'Sensual midnight rose & dark cacao',
                  'Radiant Mediterranean citrus & neroli',
                  'Calm powdery iris & cashmere musk',
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setStyle(opt)}
                    className={`p-4 border text-left text-xs transition-all ${
                      style === opt
                        ? 'border-[#C8A96B] bg-[#C8A96B]/15 text-[#F6F1E8] font-medium'
                        : 'border-[#262626] bg-[#161616] text-[#AAA49A] hover:border-[#383838]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-[#202020]">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className={`text-xs uppercase tracking-wider ${step === 1 ? 'opacity-30' : 'text-[#AAA49A] hover:text-[#F6F1E8]'}`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2"
            >
              <span>{step === 6 ? 'REVEAL CURATIONS' : 'CONTINUE'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* GIFT RESULTS */
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="p-6 bg-[#141414] border border-[#2B2B2B] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-medium">Bespoke Curation Profile</span>
              <p className="font-serif text-xl text-[#F6F1E8] mt-0.5">
                Curated for: {recipient} &bull; {occasion}
              </p>
            </div>
            <button
              onClick={() => {
                setIsCalculated(false);
                setStep(1);
              }}
              className="text-xs text-[#AAA49A] hover:text-[#C8A96B] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify Details</span>
            </button>
          </div>

          <div className="space-y-6">
            {giftRecommendations.map(({ fragrance, giftRationale }, idx) => (
              <div
                key={fragrance.id}
                className="p-6 sm:p-8 bg-[#121212] border border-[#242424] flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
              >
                <div className="flex gap-6 items-center flex-1">
                  <img
                    src={fragrance.image}
                    alt={fragrance.name}
                    referrerPolicy="no-referrer"
                    className="w-24 h-28 object-cover border border-[#2B2B2B] shrink-0"
                  />
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold bg-[#C8A96B]/15 px-2 py-0.5">
                      GIFT RECOMMENDATION #{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl text-[#F6F1E8]">{fragrance.name}</h3>
                    <p className="text-xs text-[#AAA49A] font-light max-w-lg leading-relaxed">
                      <strong className="text-[#F6F1E8] font-normal">Why this is a good gift: </strong>
                      {giftRationale}
                    </p>
                    <p className="text-[11px] text-[#777]">
                      Includes enclosed tester vial &bull; Complimentary velvet gift box
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-end gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-[#202020]">
                  <span className="font-serif text-2xl text-[#F6F1E8] tabular-nums">${fragrance.price}</span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => addToCart(fragrance, '50ml', 1)}
                      className="flex-1 sm:flex-none bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                    <Link
                      to={`/product/${fragrance.id}`}
                      className="border border-[#333] hover:border-[#666] text-[#AAA49A] hover:text-[#F6F1E8] px-4 py-2.5 text-xs uppercase tracking-wider transition-colors text-center"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
