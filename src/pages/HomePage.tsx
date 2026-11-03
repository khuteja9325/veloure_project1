import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Sliders, Layers, Award, Droplets, Quote } from 'lucide-react';
import { FRAGRANCES, SCENT_FAMILIES_INFO, MOODS_LIST } from '../data/fragrances';
import { ProductCard } from '../components/common/ProductCard';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const featuredFragrances = FRAGRANCES.filter((f) => f.isFeatured).slice(0, 4);
  const newArrivals = FRAGRANCES.filter((f) => f.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden -mt-6">
        {/* Cinematic Backdrop Image with Dark Luxury Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_luxury_perfume_1791467611642.jpg"
            alt="Velouré Haute Parfumerie Solstice Flacon"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-[#0B0B0B]/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0B0B0B]/50 to-[#0B0B0B]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 pt-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-medium border border-[#C8A96B]/30 px-4 py-1.5 backdrop-blur-md bg-[#0B0B0B]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTELLIGENT OLFACTORY DISCOVERY</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F6F1E8] font-normal leading-[1.05] text-balance">
            YOUR SCENT.<br />
            <span className="italic font-light text-[#D8CBB8]">YOUR SIGNATURE.</span>
          </h1>

          <p className="max-w-xl mx-auto text-base sm:text-lg text-[#AAA49A] font-light leading-relaxed">
            Discover fragrances selected around who you are, not simply what is popular.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/scent-finder"
              className="w-full sm:w-auto bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>FIND MY SCENT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto border border-[#444] hover:border-[#C8A96B] bg-[#0B0B0B]/60 hover:bg-[#0B0B0B] text-[#F6F1E8] px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>EXPLORE COLLECTION</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="pt-12 grid grid-cols-3 max-w-lg mx-auto text-center border-t border-[#333]/50 text-xs">
            <div>
              <p className="font-serif text-xl sm:text-2xl text-[#F6F1E8] tabular-nums font-normal">100%</p>
              <p className="text-[10px] uppercase tracking-wider text-[#AAA49A] mt-0.5 font-light">Grasse Formulated</p>
            </div>
            <div className="border-x border-[#333]/50">
              <p className="font-serif text-xl sm:text-2xl text-[#C8A96B] tabular-nums font-normal">16</p>
              <p className="text-[10px] uppercase tracking-wider text-[#AAA49A] mt-0.5 font-light">Signature Flacons</p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl text-[#F6F1E8] tabular-nums font-normal">1:1</p>
              <p className="text-[10px] uppercase tracking-wider text-[#AAA49A] mt-0.5 font-light">Olfactory Match</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED FRAGRANCES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#1F1F1F] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium">
              CURATED EDITIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
              Featured Fragrances
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-[0.2em] text-[#AAA49A] hover:text-[#C8A96B] transition-colors flex items-center gap-2 group self-start md:self-auto"
          >
            <span>VIEW COMPLETE CATALOG</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFragrances.map((f) => (
            <ProductCard key={f.id} fragrance={f} />
          ))}
        </div>
      </section>

      {/* 3. SCENT FINDER PROMOTION */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#121212] border border-[#222222] p-8 sm:p-14 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium">
                THE INTELLIGENT CONSULTANT
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F6F1E8] leading-tight">
                Not sure where to begin?
              </h2>
              <p className="text-sm sm:text-base text-[#AAA49A] font-light leading-relaxed max-w-xl">
                Velouré discovers an exceptional fragrance calibrated to your distinct personality, daily moods, raw note affinities, and lifestyle cadence — decoding complex note pyramids into effortless personal harmony.
              </p>
              <div className="pt-2">
                <Link
                  to="/scent-finder"
                  className="inline-flex items-center gap-3 bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                >
                  <span>DISCOVER MY SCENT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="border border-[#2A2A2A] bg-[#161616] p-6 space-y-4">
                <p className="text-[11px] uppercase tracking-widest text-[#AAA49A]">
                  How the Algorithm Analyzes
                </p>
                <div className="space-y-3 text-xs font-light divide-y divide-[#202020]">
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[#AAA49A]">01. Scent Families & Notes</span>
                    <span className="text-[#C8A96B]">Top, Heart & Base Weighting</span>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[#AAA49A]">02. Personality Archetype</span>
                    <span className="text-[#C8A96B]">Quiet Luxury to Bold Presence</span>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[#AAA49A]">03. Sillage & Longevity</span>
                    <span className="text-[#C8A96B]">Intimate Skin to Eternal Trail</span>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[#AAA49A]">04. Occasion Resonance</span>
                    <span className="text-[#C8A96B]">Everyday Signature to Black Tie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOP BY MOOD */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium">
            EMOTIONAL ODYSSEY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
            Shop by Mood
          </h2>
          <p className="text-xs text-[#AAA49A] mt-2 font-light">
            Perfume is invisible couture that shapes how you inhabit the world. Select your emotional state.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {MOODS_LIST.map((mood) => (
            <Link
              key={mood.id}
              to={`/shop?mood=${mood.id}`}
              className="group p-6 bg-[#131313] border border-[#202020] hover:border-[#C8A96B] transition-all duration-300 text-center flex flex-col items-center justify-center space-y-2 hover:-translate-y-1"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#333] group-hover:border-[#C8A96B] transition-colors"
                style={{ backgroundColor: mood.color + '33' }}
              >
                <Sparkles className="w-4 h-4 text-[#C8A96B]" />
              </div>
              <h3 className="font-serif text-lg text-[#F6F1E8] group-hover:text-[#C8A96B] transition-colors">
                {mood.title}
              </h3>
              <p className="text-[10px] text-[#777] font-light leading-snug line-clamp-2">
                {mood.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. SCENT FAMILIES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium">
            THE TAXONOMY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
            Scent Families
          </h2>
          <p className="text-xs text-[#AAA49A] mt-2 font-light">
            Eight essential olfactory directions crafted with pure botanical extracts and rare resins.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SCENT_FAMILIES_INFO.map((family) => (
            <Link
              key={family.name}
              to={`/shop?family=${family.name}`}
              className="p-5 bg-[#121212] border border-[#1E1E1E] hover:border-[#C8A96B] transition-all duration-300 group"
            >
              <span className="text-[10px] tracking-widest uppercase text-[#AAA49A] block font-medium">
                {family.tagline}
              </span>
              <h3 className="font-serif text-2xl text-[#F6F1E8] group-hover:text-[#C8A96B] transition-colors mt-1">
                {family.name}
              </h3>
              <p className="text-xs text-[#8A857D] font-light mt-2 line-clamp-2">
                {family.description}
              </p>
              <span className="text-[10px] text-[#C8A96B] uppercase tracking-wider block mt-4 group-hover:translate-x-1 transition-transform">
                Explore family &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. LAYERING LAB EDITORIAL SECTION */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="border border-[#262626] bg-[#111111] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                THE ART OF OLFACTORY ALCHEMY
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#F6F1E8] leading-tight">
                TWO SCENTS.<br />
                <span className="italic font-light text-[#D8CBB8]">ONE SIGNATURE.</span>
              </h2>
              <p className="text-sm text-[#AAA49A] font-light leading-relaxed">
                Why wear what everyone else wears? The Velouré Layering Lab allows you to curate two harmonizing flacons — balancing dense woods with sparkling citrus or deep resins with ethereal silks to formulate an unrepeatable bespoke trail.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                to="/layering-lab"
                className="bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center"
              >
                ENTER LAYERING LAB
              </Link>
              <Link
                to="/discovery-box"
                className="border border-[#333] hover:border-[#666] text-[#F6F1E8] px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center"
              >
                BUILD 5-SAMPLE BOX
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative min-h-[300px]">
            <img
              src="/src/assets/images/fragrance_layering_duo_1791467644625.jpg"
              alt="Layering Duo flacons"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111111] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 7. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#1F1F1F] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium">
              FRESH FROM THE STILLS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
              New Harvest Extractions
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-[0.2em] text-[#AAA49A] hover:text-[#C8A96B] transition-colors flex items-center gap-2"
          >
            <span>DISCOVER ALL EXTRACTIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((f) => (
            <ProductCard key={f.id} fragrance={f} />
          ))}
        </div>
      </section>

      {/* 8. OUR STORY EDITORIAL TEASER */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-medium">
          PHILOSOPHIE DE MAISON
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#F6F1E8] leading-tight max-w-3xl mx-auto">
          &ldquo;A great fragrance should not feel like a costume. It should feel like your quietest truth spoken out loud.&rdquo;
        </h2>
        <p className="text-sm text-[#AAA49A] font-light leading-relaxed max-w-2xl mx-auto">
          Founded in the shadow of Grasse’s historic jasmine terraces, Velouré was born out of dissatisfaction with homogenised commercial perfumes. We unite historic French maceration with modern intuitive scent architecture.
        </p>
        <div className="pt-2">
          <Link
            to="/story"
            className="text-xs uppercase tracking-[0.2em] text-[#C8A96B] hover:text-[#DFCA9B] underline underline-offset-8 transition-colors font-medium"
          >
            READ THE FULL ESSAY
          </Link>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 border-t border-[#1C1C1C] pt-16">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium">
            CLIENT CORRESPONDENCE
          </span>
          <h2 className="font-serif text-3xl text-[#F6F1E8] mt-1">
            Voices of Resonance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#121212] border border-[#202020] space-y-4">
            <Quote className="w-5 h-5 text-[#C8A96B]" />
            <p className="text-xs text-[#D8CBB8] font-light leading-relaxed">
              &ldquo;The Scent Finder diagnosed my desire for smoky cedar and dry vanilla with terrifying precision. Aura Nocturne has become my undisputed evening armor.&rdquo;
            </p>
            <div className="pt-2 border-t border-[#1F1F1F]">
              <p className="font-serif text-sm text-[#F6F1E8]">Clarisse de Montmirail</p>
              <p className="text-[10px] uppercase tracking-wider text-[#777]">Haute Couture Stylist &bull; Paris</p>
            </div>
          </div>

          <div className="p-6 bg-[#121212] border border-[#202020] space-y-4">
            <Quote className="w-5 h-5 text-[#C8A96B]" />
            <p className="text-xs text-[#D8CBB8] font-light leading-relaxed">
              &ldquo;Layering Santal Rêve with Citrus Blossom creates a serene Mediterranean warmth I have never encountered in any niche boutique. Truly peerless craftsmanship.&rdquo;
            </p>
            <div className="pt-2 border-t border-[#1F1F1F]">
              <p className="font-serif text-sm text-[#F6F1E8]">Julian Vance</p>
              <p className="text-[10px] uppercase tracking-wider text-[#777]">Architectural Director &bull; London</p>
            </div>
          </div>

          <div className="p-6 bg-[#121212] border border-[#202020] space-y-4">
            <Quote className="w-5 h-5 text-[#C8A96B]" />
            <p className="text-xs text-[#D8CBB8] font-light leading-relaxed">
              &ldquo;The Discovery Box was packaged in genuine black velvet with embossed gold seals. Selecting my 5 vials was the most pleasurable digital retail experience this year.&rdquo;
            </p>
            <div className="pt-2 border-t border-[#1F1F1F]">
              <p className="font-serif text-sm text-[#F6F1E8]">Evelina Lindqvist</p>
              <p className="text-[10px] uppercase tracking-wider text-[#777]">Editor & Curator &bull; Stockholm</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
