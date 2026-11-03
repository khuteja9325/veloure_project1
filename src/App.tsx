import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { SearchModal } from './components/common/SearchModal';
import { CartDrawer } from './components/common/CartDrawer';
import { ComparisonBar } from './components/common/ComparisonBar';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ScentFinderPage } from './pages/ScentFinderPage';
import { ScentProfilePage } from './pages/ScentProfilePage';
import { LayeringLabPage } from './pages/LayeringLabPage';
import { ComparePage } from './pages/ComparePage';
import { DiscoveryBoxPage } from './pages/DiscoveryBoxPage';
import { MoodsPage } from './pages/MoodsPage';
import { GiftConciergePage } from './pages/GiftConciergePage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { OurStoryPage } from './pages/OurStoryPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-[#0B0B0B] text-[#F6F1E8] flex flex-col font-sans selection:bg-[#C8A96B] selection:text-[#0B0B0B]">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/scent-finder" element={<ScentFinderPage />} />
              <Route path="/profile" element={<ScentProfilePage />} />
              <Route path="/layering-lab" element={<LayeringLabPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/discovery-box" element={<DiscoveryBoxPage />} />
              <Route path="/moods" element={<MoodsPage />} />
              <Route path="/gift-concierge" element={<GiftConciergePage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/story" element={<OurStoryPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Interactive Overlays */}
          <SearchModal />
          <CartDrawer />
          <ComparisonBar />
          <Toast />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
