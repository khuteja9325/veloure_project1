import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Droplet, Wind, Compass } from 'lucide-react';

export const OurStoryPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-20">
      {/* Editorial Title */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-medium block">
          L’HISTOIRE DE MAISON
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl text-[#F6F1E8] font-normal leading-[1.08]">
          Find the fragrance that feels like you.
        </h1>
        <p className="text-base sm:text-lg text-[#AAA49A] font-light leading-relaxed">
          VELOURÉ was founded on a simple conviction: fragrance should never be a generic uniform dictated by advertising. It is intimate architecture worn against warm pulse points.
        </p>
      </section>

      {/* Editorial Photography Split */}
      <section className="border border-[#222] bg-[#121212] overflow-hidden grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-7 aspect-[4/3] md:aspect-auto">
          <img
            src="/src/assets/images/hero_luxury_perfume_1791467611642.jpg"
            alt="Velouré Haute Parfumerie Flacon"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-5 p-8 sm:p-12 flex flex-col justify-center space-y-4">
          <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-medium">Grasse &bull; Paris</span>
          <h2 className="font-serif text-3xl text-[#F6F1E8]">The Maceration Atelier</h2>
          <p className="text-xs text-[#AAA49A] font-light leading-relaxed">
            Every flacon begins in our sun-drenched terraced gardens overlooking Grasse. We partner exclusively with multi-generational growers of Centifolia Rose, bitter Seville Orange blossoms, and Haitian Vetiver.
          </p>
          <p className="text-xs text-[#888] font-light leading-relaxed">
            Our extractions are cured for a minimum of sixteen weeks in dark temperature-regulated glass carboys, allowing the alcohol to melt into the natural botanicals until no harshness remains.
          </p>
        </div>
      </section>

      {/* Five Pillars: Discovery, Personality, Mood, Lifestyle, Intelligent Algorithms */}
      <section className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium">OUR FIVE PILLARS</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8]">Sensory Architecture Reimagined</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div className="p-6 bg-[#131313] border border-[#202020] space-y-3">
            <span className="font-serif text-2xl text-[#C8A96B]">01</span>
            <h3 className="font-serif text-xl text-[#F6F1E8]">Intelligent Discovery</h3>
            <p className="text-[#AAA49A] font-light leading-relaxed">
              We replace confusing marketing buzzwords with clear olfactory transparency, decoding pyramid structures into real emotional sensations.
            </p>
          </div>

          <div className="p-6 bg-[#131313] border border-[#202020] space-y-3">
            <span className="font-serif text-2xl text-[#C8A96B]">02</span>
            <h3 className="font-serif text-xl text-[#F6F1E8]">Personality Alignment</h3>
            <p className="text-[#AAA49A] font-light leading-relaxed">
              Whether you lead rooms with commanding sovereign poise or seek a quiet second skin that invites only lovers to lean close, your scent echoes your character.
            </p>
          </div>

          <div className="p-6 bg-[#131313] border border-[#202020] space-y-3">
            <span className="font-serif text-2xl text-[#C8A96B]">03</span>
            <h3 className="font-serif text-xl text-[#F6F1E8]">Emotional Mood States</h3>
            <p className="text-[#AAA49A] font-light leading-relaxed">
              Human beings are not static. We curate scents tailored for distinct atmospheric transitions: solitary focus, romantic reverie, or midnight celebrations.
            </p>
          </div>

          <div className="p-6 bg-[#131313] border border-[#202020] space-y-3">
            <span className="font-serif text-2xl text-[#C8A96B]">04</span>
            <h3 className="font-serif text-xl text-[#F6F1E8]">Lifestyle Cadence</h3>
            <p className="text-[#AAA49A] font-light leading-relaxed">
              Engineered with longevity tailored to modern travel, climate variations, and skin warmth without requiring repetitive reapplication.
            </p>
          </div>

          <div className="p-6 bg-[#131313] border border-[#202020] space-y-3">
            <span className="font-serif text-2xl text-[#C8A96B]">05</span>
            <h3 className="font-serif text-xl text-[#F6F1E8]">Algorithmic Harmony</h3>
            <p className="text-[#AAA49A] font-light leading-relaxed">
              Our proprietary diagnostic engine evaluates 40+ raw note dimensions to uncover high-compatibility pairings that elevate your individual chemistry.
            </p>
          </div>

          <div className="p-6 bg-[#171717] border border-[#C8A96B]/40 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#C8A96B] font-medium block">THE INVITATION</span>
              <h3 className="font-serif text-xl text-[#F6F1E8] mt-1">Begin Your Scent Profile</h3>
              <p className="text-[#AAA49A] font-light mt-2 leading-relaxed">
                Take the ten-step diagnostic to discover which of our sixteen flacons resonates with your essence.
              </p>
            </div>
            <Link
              to="/scent-finder"
              className="bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] py-3 text-center text-xs uppercase tracking-[0.18em] font-medium transition-colors"
            >
              LAUNCH SCENT FINDER
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="text-center py-12 border-y border-[#202020] max-w-3xl mx-auto space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#F6F1E8] italic font-light leading-relaxed">
          &ldquo;When someone smells you, they are breathing in your memory before you have spoken a single word.&rdquo;
        </h3>
        <p className="text-xs uppercase tracking-widest text-[#C8A96B] font-medium">
          VELOURÉ MAISON MANIFESTO &bull; PARIS
        </p>
      </section>
    </div>
  );
};
