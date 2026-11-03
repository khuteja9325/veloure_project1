import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, User, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, wishlist, setIsSearchOpen, setIsCartOpen } = useApp();

  const navLinks = [
    { label: 'SHOP', path: '/shop' },
    { label: 'DISCOVER', path: '/moods' },
    { label: 'SCENT FINDER', path: '/scent-finder', highlight: true },
    { label: 'LAYERING LAB', path: '/layering-lab' },
    { label: 'DISCOVERY BOX', path: '/discovery-box' },
    { label: 'OUR STORY', path: '/story' },
  ];

  return (
    <>
      {/* Language preferences */}
      <div className="bg-[#121212] px-4 py-2 flex justify-end"><LanguageSwitcher /></div>
      {/* Editorial Announcement Bar */}
      <div className="bg-[#121212] border-b border-[#1F1F1F] text-[#AAA49A] text-[11px] uppercase tracking-[0.2em] py-2 px-4 text-center font-normal flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-[#C8A96B]" />
        <span>Complimentary Bespoke Sample Flacons With Every Order &bull; Free Global Courier Shipping Over $150</span>
      </div>

      <header className="sticky top-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#AAA49A] hover:text-[#F6F1E8] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link
              to="/"
              className="font-serif text-2xl tracking-[0.28em] text-[#F6F1E8] hover:text-[#C8A96B] transition-colors uppercase font-medium whitespace-nowrap"
            >
              VELOURÉ
            </Link>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[12px] tracking-[0.2em] font-medium text-[#AAA49A]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-2 relative hover:text-[#F6F1E8] ${
                    isActive ? 'text-[#C8A96B]' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C8A96B]" />
                  )}
                  {link.highlight && (
                    <span className="ml-1 text-[9px] text-[#C8A96B] uppercase font-light">AI</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Functional Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-[#AAA49A] hover:text-[#F6F1E8] transition-colors p-1"
              aria-label="Search Fragrances"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="text-[#AAA49A] hover:text-[#F6F1E8] transition-colors p-1 relative"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8A96B] text-[#0B0B0B] text-[10px] w-4 h-4 flex items-center justify-center font-semibold rounded-full tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              className="text-[#AAA49A] hover:text-[#F6F1E8] transition-colors p-1"
              aria-label="My Account"
              title="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-[#AAA49A] hover:text-[#F6F1E8] transition-colors p-1 relative flex items-center gap-2"
              aria-label="Shopping Bag"
              title="Bag"
            >
              <ShoppingBag className="w-5 h-5 text-[#F6F1E8]" />
              {cartCount > 0 && (
                <span className="bg-[#C8A96B] text-[#0B0B0B] text-[10px] w-4 h-4 flex items-center justify-center font-semibold rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F0F0F] border-b border-[#262626] px-6 py-6 transition-all duration-300">
            <nav className="flex flex-col gap-4 text-xs tracking-[0.2em] font-medium text-[#AAA49A]">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 flex items-center justify-between border-b border-[#1A1A1A] hover:text-[#F6F1E8] ${
                    location.pathname === link.path ? 'text-[#C8A96B]' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="text-[10px] text-[#C8A96B]">Personalized</span>
                  )}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <Link
                  to="/gift-concierge"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#C8A96B] flex items-center justify-between"
                >
                  <span>GIFT CONCIERGE</span>
                  <span>&rarr;</span>
                </Link>
                <Link
                  to="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#AAA49A] hover:text-[#F6F1E8]"
                >
                  PERFUME BENCHMARK / COMPARISON
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

