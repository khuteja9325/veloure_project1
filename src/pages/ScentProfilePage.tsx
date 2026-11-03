import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, RotateCcw, Edit3, BookmarkCheck, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FRAGRANCES } from '../data/fragrances';
import { ScentProfile, ScentFamily } from '../types';

export const ScentProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { savedScentProfile, saveScentProfile, addToCart } = useApp();

  // If no saved profile, provide a baseline curated profile
  const defaultProfile: ScentProfile = {
    id: 'default-profile',
    createdDate: 'October 2026',
    dominantFamilies: [
      { family: 'Woody', percentage: 78 },
      { family: 'Amber', percentage: 64 },
      { family: 'Spicy', percentage: 42 },
      { family: 'Citrus', percentage: 28 },
    ],
    favoriteNotes: ['Sandalwood', 'Bourbon Vanilla', 'Atlas Cedar', 'Cardamom', 'Orris Root'],
    personality: 'Mysterious & Thoughtful (Sovereign Poise)',
    preferredLongevity: 'Eternal Radiance (12h+)',
    preferredProjection: 'Moderate Arm’s Length Aura',
    idealOccasions: ['Evening Soirées', 'Black Tie & Gala', 'Intimate Dinners'],
    idealSeasons: ['Autumn', 'Winter', 'Cool Evenings'],
    vibe: 'WOODY • AMBER • NOCTURNAL COUTURE',
    recommendedFragranceIds: ['luminary-solstice', 'aura-nocturne', 'noir-de-nuit'],
  };

  const profile = savedScentProfile || defaultProfile;

  // Edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editNotes, setEditNotes] = useState(profile.favoriteNotes.join(', '));
  const [editPersonality, setEditPersonality] = useState(profile.personality);
  const [editLongevity, setEditLongevity] = useState(profile.preferredLongevity);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ScentProfile = {
      ...profile,
      favoriteNotes: editNotes.split(',').map((n) => n.trim()).filter(Boolean),
      personality: editPersonality,
      preferredLongevity: editLongevity,
    };
    saveScentProfile(updated);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#202020] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            PERSONAL OLFACTORY IDENTITY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#F6F1E8] mt-1">
            Your Scent DNA Portfolio
          </h1>
          <p className="text-xs text-[#AAA49A] mt-1 font-light">
            Formulated from your bespoke answers &bull; Recorded on {profile.createdDate}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-[#161616] border border-[#2B2B2B] text-xs text-[#AAA49A] hover:text-[#F6F1E8] flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>EDIT PROFILE</span>
          </button>
          <button
            onClick={() => navigate('/scent-finder')}
            className="px-4 py-2 bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RETAKE FINDER</span>
          </button>
        </div>
      </div>

      {/* Hero DNA Breakdown Block */}
      <div className="p-8 sm:p-12 bg-[#121212] border border-[#222222] relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A96B] font-medium">
            OLFACTORY ARCHETYPE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F6F1E8]">
            {profile.vibe}
          </h2>
          <p className="text-sm text-[#AAA49A] font-light leading-relaxed">
            Your sensory signature possesses an unmistakable grounding depth. You are naturally repelled by sickly artificial sweetness, drawn instead to sacred resins, warm balsamic woods, and powdery drydowns that blend with warm human skin.
          </p>
        </div>

        {/* Visual Percentages Breakdown (Scent DNA) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.dominantFamilies.map((item) => (
            <div key={item.family} className="p-5 bg-[#171717] border border-[#262626] space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest text-[#AAA49A] font-medium">{item.family}</span>
                <span className="font-serif text-3xl text-[#C8A96B] font-light tabular-nums">{item.percentage}%</span>
              </div>
              <div className="w-full bg-[#242424] h-1.5 overflow-hidden">
                <div
                  className="bg-[#C8A96B] h-full transition-all duration-700"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <p className="text-[10px] text-[#777] font-light pt-1">
                {item.family === 'Woody' && 'Cedar, sandalwood, smoky birch'}
                {item.family === 'Amber' && 'Benzoin, labdanum, golden vanilla'}
                {item.family === 'Spicy' && 'Cardamom, pink pepper, clove'}
                {item.family === 'Citrus' && 'Calabrian bergamot, neroli'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sensory Blueprint Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Box 1: Favorite Notes */}
        <div className="p-6 bg-[#131313] border border-[#202020] space-y-4">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-medium border-b border-[#202020] pb-2">
            Aromatic Note Affinities
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.favoriteNotes.map((note) => (
              <span
                key={note}
                className="px-3 py-1 bg-[#1A1A1A] border border-[#2B2B2B] text-xs text-[#D8CBB8] font-light"
              >
                {note}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-[#777] font-light">
            These notes will serve as the harmonic spine for all future seasonal layering curations.
          </p>
        </div>

        {/* Box 2: Personality & Mood */}
        <div className="p-6 bg-[#131313] border border-[#202020] space-y-4">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-medium border-b border-[#202020] pb-2">
            Presence & Archetype
          </h3>
          <p className="font-serif text-xl text-[#F6F1E8]">{profile.personality}</p>
          <div className="space-y-2 text-xs text-[#AAA49A] font-light">
            <p>&bull; Preference: Intimate composure over loud crowd-pleasers.</p>
            <p>&bull; Projection: {profile.preferredProjection}</p>
            <p>&bull; Longevity: {profile.preferredLongevity}</p>
          </div>
        </div>

        {/* Box 3: Optimal Occasions & Seasons */}
        <div className="p-6 bg-[#131313] border border-[#202020] space-y-4">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-medium border-b border-[#202020] pb-2">
            Ritual & Context
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#777] block">Prime Seasons</span>
              <p className="text-[#F6F1E8] font-light mt-0.5">{profile.idealSeasons.join(' &bull; ')}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#777] block">Prime Occasions</span>
              <p className="text-[#F6F1E8] font-light mt-0.5">{profile.idealOccasions.join(' &bull; ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Flacons */}
      <div className="space-y-6 pt-6 border-t border-[#202020]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] font-medium">CURATED MATCHES</span>
            <h3 className="font-serif text-2xl text-[#F6F1E8]">Matched Flacons for Your Scent DNA</h3>
          </div>
          <Link to="/shop" className="text-xs uppercase tracking-wider text-[#AAA49A] hover:text-[#C8A96B]">
            Explore Entire Atelier &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {profile.recommendedFragranceIds.map((id) => {
            const fragrance = FRAGRANCES.find((f) => f.id === id);
            if (!fragrance) return null;
            return (
              <div key={fragrance.id} className="p-5 bg-[#121212] border border-[#222222] flex flex-col justify-between space-y-4">
                <Link to={`/product/${fragrance.id}`}>
                  <img
                    src={fragrance.image}
                    alt={fragrance.name}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/5] object-cover border border-[#242424]"
                  />
                  <span className="text-[10px] uppercase tracking-wider text-[#C8A96B] block mt-3">{fragrance.scentFamily}</span>
                  <h4 className="font-serif text-lg text-[#F6F1E8] mt-0.5">{fragrance.name}</h4>
                  <p className="text-xs text-[#8A857D] font-light line-clamp-1">{fragrance.topNotes.join(', ')}</p>
                </Link>
                <div className="flex items-center justify-between pt-2 border-t border-[#202020]">
                  <span className="font-serif text-base text-[#F6F1E8] tabular-nums">${fragrance.price}</span>
                  <button
                    onClick={() => addToCart(fragrance, '50ml', 1)}
                    className="bg-[#C8A96B] text-[#0B0B0B] px-3 py-1.5 text-xs uppercase tracking-wider font-medium hover:bg-[#D8CBB8] transition-colors"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#2B2B2B] p-8 max-w-lg w-full space-y-6">
            <h3 className="font-serif text-2xl text-[#F6F1E8]">Edit Olfactory Preferences</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">
                  Favorite Notes (comma separated)
                </label>
                <input
                  type="text"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2B2B2B] p-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">
                  Personality Archetype
                </label>
                <input
                  type="text"
                  value={editPersonality}
                  onChange={(e) => setEditPersonality(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2B2B2B] p-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">
                  Preferred Longevity
                </label>
                <select
                  value={editLongevity}
                  onChange={(e) => setEditLongevity(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2B2B2B] p-2.5 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                >
                  <option value="Subtle & Polite (5–6 Hours)">Subtle & Polite (5–6 Hours)</option>
                  <option value="Day-to-Night (8–10 Hours)">Day-to-Night (8–10 Hours)</option>
                  <option value="Eternal Radiance (12h+)">Eternal Radiance (12h+)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#202020]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-[#333] text-[#AAA49A] hover:text-[#F6F1E8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] font-medium uppercase tracking-wider"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
