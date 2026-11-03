import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Instagram, Compass, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the Velouré Olfactory Circle.');
    setEmail('');
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1F1F1F] text-[#AAA49A] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Newsletter & Brand Editorial Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1A1A1A]">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-serif text-2xl tracking-[0.25em] text-[#F6F1E8] uppercase">
              VELOURÉ
            </h2>
            <p className="text-sm font-light leading-relaxed text-[#AAA49A] max-w-md">
              Haute Parfumerie & Intelligent Olfactory Architecture. Formulated in Grasse and Paris, curated around personal resonance, intuition, and timeless distinction.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs tracking-wider text-[#C8A96B]">
              <span>PARIS</span>
              <span>&bull;</span>
              <span>GRASSE</span>
              <span>&bull;</span>
              <span>NEW YORK</span>
              <span>&bull;</span>
              <span>KYOTO</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h3 className="font-serif text-lg text-[#F6F1E8] tracking-wider mb-2">
              The Olfactory Dispatch
            </h3>
            <p className="text-xs text-[#AAA49A] mb-4 font-light">
              Receive private invitations to limited harvest extractions, seasonal layering formulas, and complimentary discovery samples.
            </p>
            {subscribed ? (
              <div className="p-4 bg-[#141414] border border-[#2B2B2B] text-xs text-[#C8A96B] tracking-wide">
                Thank you for subscribing. A welcome curation has been sent to your correspondence.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-[#141414] border border-[#2B2B2B] px-4 py-3 text-xs text-[#F6F1E8] placeholder:text-[#555] focus:outline-none focus:border-[#C8A96B] flex-1 font-light"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <span>JOIN CIRCLE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#1A1A1A] text-xs">
          <div>
            <h4 className="text-[#F6F1E8] uppercase tracking-[0.15em] font-medium mb-4">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 font-light">
              <li><Link to="/shop" className="hover:text-[#F6F1E8] transition-colors">All Fragrances</Link></li>
              <li><Link to="/shop?family=Woody" className="hover:text-[#F6F1E8] transition-colors">Woody & Amber</Link></li>
              <li><Link to="/shop?family=Floral" className="hover:text-[#F6F1E8] transition-colors">Velvet Florals</Link></li>
              <li><Link to="/shop?family=Citrus" className="hover:text-[#F6F1E8] transition-colors">Calabrian Citrus</Link></li>
              <li><Link to="/discovery-box" className="hover:text-[#F6F1E8] transition-colors">Bespoke Discovery Box</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#F6F1E8] uppercase tracking-[0.15em] font-medium mb-4">
              DISCOVERY & LAB
            </h4>
            <ul className="space-y-2.5 font-light">
              <li><Link to="/scent-finder" className="text-[#C8A96B] hover:text-[#DFCA9B] transition-colors">Intelligent Scent Finder</Link></li>
              <li><Link to="/layering-lab" className="hover:text-[#F6F1E8] transition-colors">Fragrance Layering Lab</Link></li>
              <li><Link to="/profile" className="hover:text-[#F6F1E8] transition-colors">Personal Scent DNA</Link></li>
              <li><Link to="/compare" className="hover:text-[#F6F1E8] transition-colors">Fragrance Benchmark Tool</Link></li>
              <li><Link to="/gift-concierge" className="hover:text-[#F6F1E8] transition-colors">Concierge Gift Assistant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#F6F1E8] uppercase tracking-[0.15em] font-medium mb-4">
              MAISON & CARE
            </h4>
            <ul className="space-y-2.5 font-light">
              <li><Link to="/story" className="hover:text-[#F6F1E8] transition-colors">Our Olfactory Story</Link></li>
              <li><span className="hover:text-[#F6F1E8] transition-colors cursor-pointer" onClick={() => showToast('Sustainable harvesting in Grasse, non-GMO beet alcohol, and 100% recyclable crystal flacons.', 'info')}>Sustainable Craft</span></li>
              <li><span className="hover:text-[#F6F1E8] transition-colors cursor-pointer" onClick={() => showToast('Free white-glove courier shipping on all orders over $150.', 'info')}>Shipping & White Glove Delivery</span></li>
              <li><span className="hover:text-[#F6F1E8] transition-colors cursor-pointer" onClick={() => showToast('30-day returns accepted on unopened bottles with sample vial tested.', 'info')}>Complimentary Sample Guarantee</span></li>
              <li><span className="hover:text-[#F6F1E8] transition-colors cursor-pointer" onClick={() => showToast('Concierge team reachable 24/7 at concierge@veloure.fr', 'info')}>Atelier Client Service</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#F6F1E8] uppercase tracking-[0.15em] font-medium mb-4">
              CORRESPONDENCE
            </h4>
            <p className="font-light text-xs leading-relaxed mb-4">
              VELOURÉ Haute Parfumerie<br />
              18 Place Vendôme, 75001 Paris<br />
              concierge@veloure.fr
            </p>
            <div className="flex items-center gap-3 text-[#AAA49A]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#141414] border border-[#262626] hover:text-[#C8A96B] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#141414] border border-[#262626] hover:text-[#C8A96B] transition-colors"
                aria-label="Pinterest"
              >
                <Compass className="w-4 h-4" />
              </a>
              <div
                className="p-2 bg-[#141414] border border-[#262626] text-[#C8A96B] cursor-pointer"
                title="Cruelty Free & Sustainable Extraction"
                onClick={() => showToast('Certified Leaping Bunny & IFRA Haute Parfumerie Compliant', 'info')}
              >
                <HeartHandshake className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-light text-[#777] gap-4">
          <p>&copy; {new Date().getFullYear()} VELOURÉ HAUTE PARFUMERIE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#AAA] cursor-pointer">Privacy Protocol</span>
            <span>&bull;</span>
            <span className="hover:text-[#AAA] cursor-pointer">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-[#AAA] cursor-pointer">Accessibility</span>
            <span>&bull;</span>
            <span className="text-[#C8A96B]">Curated Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
