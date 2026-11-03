import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Sparkles, Heart, ShoppingBag, RotateCcw, Share2, Compass, BookmarkCheck } from 'lucide-react';
import { FRAGRANCES, SCENT_FAMILIES_INFO } from '../data/fragrances';
import { Fragrance, ScentFamily, ScentProfile } from '../types';
import { useApp } from '../context/AppContext';

interface QuizAnswers {
  experience: string;
  families: string[];
  notes: string[];
  personality: string;
  occasion: string;
  season: string;
  longevity: string;
  projection: string;
  budget: string;
  aesthetic: string;
}

export const ScentFinderPage: React.FC = () => {
  const navigate = useNavigate();
  const { saveScentProfile, addToCart, addToWishlist, isInWishlist, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [profileResult, setProfileResult] = useState<ScentProfile | null>(null);

  const [answers, setAnswers] = useState<QuizAnswers>({
    experience: 'Signature Daily Presence',
    families: ['Woody', 'Amber'],
    notes: ['Sandalwood', 'Vanilla'],
    personality: 'Mysterious & Thoughtful',
    occasion: 'Evening',
    season: 'Autumn',
    longevity: 'Long Lasting (8-10h)',
    projection: 'Moderate',
    budget: 'Luxury ($200–$280)',
    aesthetic: 'Nocturnal Atelier / Candlelit library & dark velvet',
  });

  const totalSteps = 10;

  // Question 1: Experience
  const experienceOptions = [
    { id: 'Signature Daily Presence', title: 'Signature Daily Presence', desc: 'An effortless second skin that defines your everyday memory.' },
    { id: 'Nocturnal Seduction', title: 'Nocturnal Seduction', desc: 'Intense, hypnotic, and unforgettable for intimate evenings.' },
    { id: 'Elevated Professional Authority', title: 'Elevated Professional Authority', desc: 'Clean, structured, commanding respect without shouting.' },
    { id: 'Sunlit Escapism', title: 'Sunlit Escapism', desc: 'Crisp, radiant botanicals evoking seaside villas and Mediterranean light.' },
  ];

  // Question 2: Scent Families (multi-select)
  const familyOptions = SCENT_FAMILIES_INFO.map(f => ({
    id: f.name,
    title: f.name,
    desc: f.description,
  }));

  // Question 3: Notes
  const noteOptions = [
    'Sandalwood', 'Bourbon Vanilla', 'Atlas Cedar', 'Smoked Vetiver',
    'Calabrian Bergamot', 'Midnight Rose', 'Cambodian Oud', 'Cardamom',
    'Orris Root / Iris', 'Ambergris', 'Dark Cacao', 'Neroli / Orange Blossom',
    'Black Pepper', 'Sea Salt', 'White Tea'
  ];

  // Question 4: Personality
  const personalityOptions = [
    { id: 'Mysterious & Thoughtful', title: 'Mysterious & Thoughtful', desc: 'You value quiet depth, contemplation, and magnetic subtlety.' },
    { id: 'Bold & Charismatic', title: 'Bold & Charismatic', desc: 'You lead rooms with unmistakable poise and sovereign confidence.' },
    { id: 'Serene & Minimalist', title: 'Serene & Minimalist', desc: 'You gravitate toward clean lines, peace, and organic purity.' },
    { id: 'Romantic & Sensual', title: 'Romantic & Sensual', desc: 'You feel passionately, cherishing intimacy, poetry, and velvet warmth.' },
  ];

  // Question 5: Occasion
  const occasionOptions = [
    { id: 'Evening & Date Nights', title: 'Evening & Dinners', desc: 'Low-light ambiance, candlelit tables, intimate encounters.' },
    { id: 'Daily Atelier & Office', title: 'Daily & Creative Work', desc: 'Sophisticated presence in meetings and daylight studios.' },
    { id: 'Celebrations & Black Tie', title: 'Gala & Black Tie', desc: 'Opulent occasions requiring an authoritative trail.' },
    { id: 'Solitary Retreats & Travel', title: 'Travel & Weekends', desc: 'Effortless relaxation, weekend escapes, leisure.' },
  ];

  // Question 6: Season
  const seasonOptions = [
    { id: 'Autumn', title: 'Autumn', desc: 'Crisp falling leaves, heavy sweaters, smoky hearths.' },
    { id: 'Winter', title: 'Winter', desc: 'Freezing twilight air, wool coats, comforting deep resins.' },
    { id: 'Spring', title: 'Spring', desc: 'Budding blossoms, dew on green leaves, fresh renewal.' },
    { id: 'Summer', title: 'Summer', desc: 'Golden sunshine, linen fabrics, cooling saline breezes.' },
  ];

  // Question 7: Longevity
  const longevityOptions = [
    { id: 'Moderate (6h)', title: 'Subtle & Polite (5–6 Hours)', desc: 'Fades naturally without overwhelming colleagues.' },
    { id: 'Long Lasting (8-10h)', title: 'Day-to-Night (8–10 Hours)', desc: 'Stays true from morning coffee through dinner.' },
    { id: 'Eternal (12h+)', title: 'Eternal Radiance (12+ Hours)', desc: 'Noticeable on fabrics and skin the following morning.' },
  ];

  // Question 8: Projection
  const projectionOptions = [
    { id: 'Intimate', title: 'Intimate Whisper', desc: 'Discovered only when someone steps close to embrace you.' },
    { id: 'Moderate', title: 'Arm’s Length Presence', desc: 'A polite personal scent aura that turns heads gracefully.' },
    { id: 'Strong', title: 'Enveloping Sillage', desc: 'A rich scent signature that fills spaces and lingers behind.' },
  ];

  // Question 9: Budget
  const budgetOptions = [
    { id: 'Accessible Luxury ($190–$220)', title: 'Essential Flacon ($190 – $220)', desc: 'High-concentration 50ml everyday masterpieces.' },
    { id: 'Haute Parfumerie ($230–$280)', title: 'Signature Reserve ($230 – $280)', desc: 'Vintage resins and rare orris extractions.' },
    { id: 'Private Reserve ($290+)', title: 'Private Reserve ($290+)', desc: 'Ultra-rare wild Cambodian ouds and bespoke macerations.' },
  ];

  // Question 10: Visual Aesthetic
  const aestheticOptions = [
    { id: 'Dark Velvet & Candlelight', title: 'Dark Velvet & Candlelit Obsidian', desc: 'Smoky mirrors, dark wood panelling, midnight shadows.' },
    { id: 'Travertine & Warm Sunlight', title: 'Travertine Stone & Warm Sunlight', desc: 'Minimalist architecture, ivory linen, organic tranquility.' },
    { id: 'Gilded European Salon', title: 'Gilded European Salon', desc: 'Baroque gold leaf, high ceilings, opulent chandeliers.' },
    { id: 'Wild Coastal Mist', title: 'Wild Coastal Rocks & Ocean Mist', desc: 'Crashing turquoise waves, rugged cypress, mineral sea salt.' },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResults = () => {
    // Scoring logic
    const scoredFragrances = FRAGRANCES.map((fragrance) => {
      let score = 50; // base score

      // Family match
      if (answers.families.includes(fragrance.scentFamily)) {
        score += 25;
      }
      if (fragrance.secondaryFamily && answers.families.includes(fragrance.secondaryFamily)) {
        score += 15;
      }

      // Note match
      const matchingNotes = answers.notes.filter((n) =>
        [...fragrance.topNotes, ...fragrance.heartNotes, ...fragrance.baseNotes].some((fn) =>
          fn.toLowerCase().includes(n.toLowerCase())
        )
      );
      score += matchingNotes.length * 10;

      // Season match
      if (fragrance.season.includes(answers.season as any)) {
        score += 10;
      }

      // Longevity match
      if (fragrance.longevity.includes(answers.longevity.split(' ')[0])) {
        score += 8;
      }

      // Projection match
      if (fragrance.projection === answers.projection) {
        score += 8;
      }

      // Cap at 98%
      const matchPercentage = Math.min(98, Math.max(76, score));

      // Build personalized reason
      let matchReason = `Perfect resonance with your affinity for ${answers.families.join(' & ')} textures`;
      if (matchingNotes.length > 0) {
        matchReason += `, highlighted by exquisite notes of ${matchingNotes.slice(0, 2).join(' and ')}`;
      }
      matchReason += ` for an exquisite ${answers.season} evening statement.`;

      return {
        fragrance,
        matchPercentage,
        matchReason,
        matchingNotes,
      };
    });

    // Sort descending by matchPercentage
    scoredFragrances.sort((a, b) => b.matchPercentage - a.matchPercentage);
    const topMatches = scoredFragrances.slice(0, 4);

    // Build Scent Profile
    const dominantFamilies: { family: ScentFamily; percentage: number }[] = [
      { family: (answers.families[0] || 'Woody') as ScentFamily, percentage: 78 },
      { family: (answers.families[1] || 'Amber') as ScentFamily, percentage: 64 },
      { family: 'Spicy' as ScentFamily, percentage: 42 },
      { family: 'Citrus' as ScentFamily, percentage: 28 },
    ];

    const profile: ScentProfile = {
      id: `profile-${Date.now()}`,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dominantFamilies,
      favoriteNotes: answers.notes,
      personality: answers.personality,
      preferredLongevity: answers.longevity,
      preferredProjection: answers.projection,
      idealOccasions: [answers.occasion, 'Romantic Dinners', 'Special Occasions'],
      idealSeasons: [answers.season, 'Winter'],
      vibe: `${answers.families.join(' • ').toUpperCase()} • ARCHITECTURAL DEPTH`,
      recommendedFragranceIds: topMatches.map((m) => m.fragrance.id),
    };

    setProfileResult(profile);
    setIsCompleted(true);
    saveScentProfile(profile);
  };

  const toggleFamilySelection = (familyId: string) => {
    if (answers.families.includes(familyId)) {
      if (answers.families.length > 1) {
        setAnswers({ ...answers, families: answers.families.filter((f) => f !== familyId) });
      }
    } else {
      if (answers.families.length < 3) {
        setAnswers({ ...answers, families: [...answers.families, familyId] });
      } else {
        setAnswers({ ...answers, families: [answers.families[1], answers.families[2], familyId] });
      }
    }
  };

  const toggleNoteSelection = (note: string) => {
    if (answers.notes.includes(note)) {
      if (answers.notes.length > 1) {
        setAnswers({ ...answers, notes: answers.notes.filter((n) => n !== note) });
      }
    } else {
      if (answers.notes.length < 4) {
        setAnswers({ ...answers, notes: [...answers.notes, note] });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 min-h-[75vh]">
      {!isCompleted ? (
        <div className="space-y-8">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#AAA49A]">
              <span className="text-[#C8A96B] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Intelligent Consultation
              </span>
              <span className="tabular-nums">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-[#1F1F1F] h-1.5 overflow-hidden">
              <div
                className="bg-[#C8A96B] h-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* QUESTION 1 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B]">Question 01</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
                  What kind of fragrance experience are you seeking?
                </h2>
                <p className="text-xs text-[#AAA49A] mt-1 font-light">
                  Define the role this scent will fulfill in your personal daily ritual.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {experienceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, experience: opt.id })}
                    className={`p-6 border text-left transition-all ${
                      answers.experience === opt.id
                        ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F6F1E8]'
                        : 'border-[#222] bg-[#141414] text-[#AAA49A] hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-xl text-[#F6F1E8]">{opt.title}</h3>
                      {answers.experience === opt.id && <Check className="w-4 h-4 text-[#C8A96B]" />}
                    </div>
                    <p className="text-xs text-[#8A857D] font-light leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 2 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B]">Question 02</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
                  Which scent families attract you most?
                </h2>
                <p className="text-xs text-[#AAA49A] mt-1 font-light">
                  Select 1 to 3 olfactory families that resonate with your senses.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {familyOptions.map((fam) => {
                  const isSelected = answers.families.includes(fam.id);
                  return (
                    <button
                      key={fam.id}
                      onClick={() => toggleFamilySelection(fam.id)}
                      className={`p-4 border text-left transition-all relative ${
                        isSelected
                          ? 'border-[#C8A96B] bg-[#C8A96B]/15 text-[#F6F1E8]'
                          : 'border-[#222] bg-[#141414] text-[#AAA49A] hover:border-[#333]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg text-[#F6F1E8]">{fam.title}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#C8A96B]" />}
                      </div>
                      <p className="text-[10px] text-[#777] font-light line-clamp-2">{fam.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION 3 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B]">Question 03</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
                  Which botanical and raw notes do you enjoy?
                </h2>
                <p className="text-xs text-[#AAA49A] mt-1 font-light">
                  Select up to 4 notes that bring you immediate comfort or excitement.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {noteOptions.map((note) => {
                  const isSelected = answers.notes.includes(note);
                  return (
                    <button
                      key={note}
                      onClick={() => toggleNoteSelection(note)}
                      className={`px-4 py-2 text-xs border transition-colors flex items-center gap-2 ${
                        isSelected
                          ? 'border-[#C8A96B] bg-[#C8A96B] text-[#0B0B0B] font-medium'
                          : 'border-[#262626] bg-[#141414] text-[#AAA49A] hover:border-[#444]'
                      }`}
                    >
                      <span>{note}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#0B0B0B]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION 4 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B]">Question 04</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
                  How would you describe your presence and personality?
                </h2>
                <p className="text-xs text-[#AAA49A] mt-1 font-light">
                  Fragrance reflects the inner architecture of character.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personalityOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, personality: opt.id })}
                    className={`p-6 border text-left transition-all ${
                      answers.personality === opt.id
                        ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F6F1E8]'
                        : 'border-[#222] bg-[#141414] text-[#AAA49A] hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-xl text-[#F6F1E8]">{opt.title}</h3>
                      {answers.personality === opt.id && <Check className="w-4 h-4 text-[#C8A96B]" />}
                    </div>
                    <p className="text-xs text-[#8A857D] font-light leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 5 */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B]">Question 05</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
                  Where will you predominantly wear this creation?
                </h2>
                <p className="text-xs text-[#AAA49A] mt-1 font-light">
                  Context dictates the required projection and aromatic weight.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {occasionOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, occasion: opt.id })}
                    className={`p-6 border text-left transition-all ${
                      answers.occasion === opt.id
                        ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F6F1E8]'
                        : 'border-[#222] bg-[#141414] text-[#AAA49A] hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-xl text-[#F6F1E8]">{opt.title}</h3>
                      {answers.occasion === opt.id && <Check className="w-4 h-4 text-[#C8A96B]" />}
                    </div>
                    <p className="text-xs text-[#8A857D] font-light leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 6 */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B]">Question 06</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
                  Which seasonal atmosphere inspires you right now?
                </h2>
                <p className="text-xs text-[#AAA49A] mt-1 font-light">
                  Ambient temperature changes how essential oils evaporate on human skin.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {seasonOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, season: opt.id })}
                    className={`p-5 border text-left transition-all ${
                      answers.season === opt.id
                        ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F6F1E8]'
                        : 'border-[#222] bg-[#141414] text-[#AAA49A] hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-xl text-[#F6F1E8]">{opt.title}</span>
                      {answers.season === opt.id && <Check className="w-3.5 h-3.5 text-[#C8A96B]" />}
                    </div>
                    <p className="text-[10px] text-[#777] font-light">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 7 */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B]">Question 07</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
                  What is your preferred longevity?
                </h2>
                <p className="text-xs text-[#AAA49A] mt-1 font-light">
                  How many hours should the perfume hold against your pulse points?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {longevityOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, longevity: opt.id })}
                    className={`p-6 border text-left transition-all ${
                      answers.longevity === opt.id
                        ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F6F1E8]'
                        : 'border-[#222] bg-[#141414] text-[#AAA49A] hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-lg text-[#F6F1E8]">{opt.title}</h3>
                      {answers.longevity === opt.id && <Check className="w-4 h-4 text-[#C8A96B]" />}
                    </div>
                    <p className="text-xs text-[#8A857D] font-light">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 8 */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B]">Question 08</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
                  What is your preferred projection and sillage?
                </h2>
                <p className="text-xs text-[#AAA49A] mt-1 font-light">
                  How far into the room should your scent trail extend?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {projectionOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, projection: opt.id })}
                    className={`p-6 border text-left transition-all ${
                      answers.projection === opt.id
                        ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F6F1E8]'
                        : 'border-[#222] bg-[#141414] text-[#AAA49A] hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-lg text-[#F6F1E8]">{opt.title}</h3>
                      {answers.projection === opt.id && <Check className="w-4 h-4 text-[#C8A96B]" />}
                    </div>
                    <p className="text-xs text-[#8A857D] font-light">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 9 */}
          {currentStep === 9 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B]">Question 09</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
                  What is your desired collection tier?
                </h2>
                <p className="text-xs text-[#AAA49A] mt-1 font-light">
                  Our flacons feature genuine French crystal and artisanal botanical extractions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {budgetOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, budget: opt.id })}
                    className={`p-6 border text-left transition-all ${
                      answers.budget === opt.id
                        ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F6F1E8]'
                        : 'border-[#222] bg-[#141414] text-[#AAA49A] hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-lg text-[#F6F1E8]">{opt.title}</h3>
                      {answers.budget === opt.id && <Check className="w-4 h-4 text-[#C8A96B]" />}
                    </div>
                    <p className="text-xs text-[#8A857D] font-light">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 10 */}
          {currentStep === 10 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A96B]">Question 10</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
                  Choose the visual aesthetic you feel most at home in.
                </h2>
                <p className="text-xs text-[#AAA49A] mt-1 font-light">
                  Visual moods directly evoke olfactory memory and subconscious resonance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aestheticOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers({ ...answers, aesthetic: opt.id })}
                    className={`p-6 border text-left transition-all ${
                      answers.aesthetic === opt.id
                        ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F6F1E8]'
                        : 'border-[#222] bg-[#141414] text-[#AAA49A] hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-xl text-[#F6F1E8]">{opt.title}</h3>
                      {answers.aesthetic === opt.id && <Check className="w-4 h-4 text-[#C8A96B]" />}
                    </div>
                    <p className="text-xs text-[#8A857D] font-light leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-[#202020]">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 text-xs uppercase tracking-widest font-medium transition-colors ${
                currentStep === 1
                  ? 'opacity-30 cursor-not-allowed text-[#666]'
                  : 'text-[#AAA49A] hover:text-[#F6F1E8]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2"
            >
              <span>{currentStep === totalSteps ? 'GENERATE SCENT PROFILE' : 'CONTINUE'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* RESULTS PAGE */
        profileResult && (
          <div className="space-y-16 animate-in fade-in duration-500">
            {/* Header / Diagnosis */}
            <div className="p-8 sm:p-12 bg-[#121212] border border-[#262626] text-center space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-medium flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                YOUR SCENT DNA PROFILE
              </span>

              <h1 className="font-serif text-4xl sm:text-6xl text-[#F6F1E8]">
                {profileResult.vibe}
              </h1>

              <p className="max-w-xl mx-auto text-sm text-[#AAA49A] font-light leading-relaxed">
                Your profile indicates a profound affinity for warm, resonant woods, crystalline amber facets, and comforting spices that command presence through quiet sophistication.
              </p>

              {/* DNA Composition Meters */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-left">
                {profileResult.dominantFamilies.map((item) => (
                  <div key={item.family} className="p-4 bg-[#161616] border border-[#242424]">
                    <span className="text-[10px] tracking-wider uppercase text-[#AAA49A] block">{item.family}</span>
                    <span className="font-serif text-2xl text-[#C8A96B] font-normal tabular-nums">{item.percentage}%</span>
                    <div className="w-full bg-[#222] h-1 mt-2">
                      <div className="bg-[#C8A96B] h-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => {
                    saveScentProfile(profileResult);
                    navigate('/profile');
                  }}
                  className="bg-[#C8A96B] text-[#0B0B0B] hover:bg-[#D8CBB8] px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center gap-2"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>VIEW FULL SCENT DNA PAGE</span>
                </button>
                <button
                  onClick={() => {
                    setIsCompleted(false);
                    setCurrentStep(1);
                  }}
                  className="border border-[#333] hover:border-[#666] text-[#AAA49A] hover:text-[#F6F1E8] px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>RETAKE CONSULTATION</span>
                </button>
              </div>
            </div>

            {/* Personalized Recommendations Section */}
            <div className="space-y-8">
              <div className="border-b border-[#202020] pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium">
                    BESPOKE RECOMMENDATIONS
                  </span>
                  <h2 className="font-serif text-3xl text-[#F6F1E8]">
                    Your Top Matched Extractions
                  </h2>
                </div>
                <span className="text-xs text-[#AAA49A]">Ranked by Olfactory Compatibility</span>
              </div>

              <div className="space-y-6">
                {profileResult.recommendedFragranceIds.map((fragId, idx) => {
                  const fragrance = FRAGRANCES.find((f) => f.id === fragId)!;
                  const matchScores = [96, 92, 88, 85];
                  const matchScore = matchScores[idx] || 84;
                  const isFavorited = isInWishlist(fragrance.id);

                  return (
                    <div
                      key={fragrance.id}
                      className="p-6 sm:p-8 bg-[#121212] border border-[#202020] hover:border-[#333] transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                    >
                      {/* Image + Basic Info */}
                      <div className="flex gap-6 items-center flex-1">
                        <img
                          src={fragrance.image}
                          alt={fragrance.name}
                          referrerPolicy="no-referrer"
                          className="w-24 h-28 object-cover border border-[#2A2A2A] shrink-0"
                        />
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold bg-[#C8A96B]/15 px-2 py-0.5">
                              {matchScore}% MATCH
                            </span>
                            <span className="text-xs text-[#AAA49A] uppercase tracking-wider">
                              {fragrance.scentFamily} Family
                            </span>
                          </div>

                          <h3 className="font-serif text-2xl text-[#F6F1E8]">
                            {fragrance.name}
                          </h3>

                          <p className="text-xs text-[#AAA49A] font-light max-w-lg">
                            <strong className="text-[#C8A96B] font-normal">Why it matches: </strong>
                            Calibrated to your {answers.personality.toLowerCase()} archetype and affinity for {fragrance.baseNotes[0]}.
                          </p>

                          <div className="pt-1 flex items-center gap-2 text-xs text-[#8A857D] font-light">
                            <span>Key Notes: {fragrance.topNotes[0]}, {fragrance.heartNotes[0]}, {fragrance.baseNotes[0]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex flex-col sm:flex-row md:flex-col items-end gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-[#202020]">
                        <div className="text-right">
                          <span className="font-serif text-2xl text-[#F6F1E8] tabular-nums">
                            ${fragrance.price}
                          </span>
                          <span className="text-[10px] text-[#777] block">50ml Eau de Parfum</span>
                        </div>

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
                            className="border border-[#2B2B2B] hover:border-[#666] text-[#AAA49A] hover:text-[#F6F1E8] px-4 py-2.5 text-xs uppercase tracking-wider transition-colors text-center"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => addToWishlist(fragrance.id)}
                            className={`p-2.5 border transition-colors ${
                              isFavorited
                                ? 'border-[#C8A96B] text-[#C8A96B] bg-[#C8A96B]/10'
                                : 'border-[#2B2B2B] text-[#AAA49A] hover:text-[#F6F1E8]'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#C8A96B]' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
