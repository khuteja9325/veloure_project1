import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, Layers, Sparkles, MapPin, Settings, LogOut, ArrowRight, Trash2, ShoppingBag, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FRAGRANCES } from '../data/fragrances';

export const AccountPage: React.FC = () => {
  const {
    user,
    login,
    logout,
    orders,
    savedScentProfile,
    savedLayeringCombos,
    removeLayeringCombo,
    wishlist,
    addToCart,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'profile' | 'wishlist' | 'layering' | 'boxes' | 'addresses' | 'settings'
  >('overview');

  // Auth form states if logged out
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Address edit state
  const [savedAddress, setSavedAddress] = useState({
    street: '18 Place Vendôme, Apt 4B',
    city: 'Paris',
    postal: '75001',
    country: 'France',
  });

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(nameInput || 'Éléonore Laurent', emailInput || 'eleonore.laurent@veloure.fr');
    } else if (authMode === 'signup') {
      login(nameInput || 'New Collector', emailInput || 'collector@veloure.fr');
      showToast('Account created. Welcome to the Velouré Olfactory Circle.');
    } else {
      showToast('Password recovery instructions sent to your email.');
      setAuthMode('login');
    }
  };

  // If not logged in, show luxury auth portal
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 space-y-8 min-h-[70vh]">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium">
            ATELIER CLIENT PORTAL
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8]">
            {authMode === 'login' ? 'Sign In to Your Salon' : authMode === 'signup' ? 'Create Your Account' : 'Recover Access'}
          </h1>
          <p className="text-xs text-[#AAA49A] font-light">
            Access your saved Scent DNA, bespoke layering formulas, and order ledger.
          </p>
        </div>

        <form onSubmit={handleAuthSubmit} className="bg-[#121212] border border-[#242424] p-8 space-y-4 text-xs">
          {authMode === 'signup' && (
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Full Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Éléonore Laurent"
                className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                required
              />
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Email Address</label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="eleonore.laurent@veloure.fr"
              className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
              required
            />
          </div>

          {authMode !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] uppercase tracking-wider text-[#AAA49A]">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[10px] text-[#C8A96B] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors pt-3"
          >
            {authMode === 'login' ? 'ENTER SALON' : authMode === 'signup' ? 'REGISTER' : 'SEND RECOVERY LINK'}
          </button>

          <div className="pt-2 text-center text-xs text-[#AAA49A] font-light">
            {authMode === 'login' ? (
              <p>
                New client?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-[#C8A96B] hover:underline"
                >
                  Create bespoke account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-[#C8A96B] hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 min-h-[75vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#202020] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            CLIENT ATELIER SALON
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F6F1E8] mt-1">
            {user.name}
          </h1>
          <p className="text-xs text-[#AAA49A] mt-1 font-light">
            Member of the Velouré Haute Olfactory Circle &bull; {user.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="text-xs uppercase tracking-wider text-[#AAA49A] hover:text-rose-400 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Layout: Sidebar Navigation + Content Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="md:col-span-3 space-y-1 text-xs">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { id: 'profile', label: 'Scent DNA Profile', icon: Sparkles },
            { id: 'wishlist', label: `Saved Wishlist (${wishlist.length})`, icon: Heart },
            { id: 'layering', label: `Layering Formulas (${savedLayeringCombos.length})`, icon: Layers },
            { id: 'addresses', label: 'Delivery Address', icon: MapPin },
            { id: 'settings', label: 'Preferences', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  isActive
                    ? 'bg-[#C8A96B] text-[#0B0B0B] font-medium'
                    : 'bg-[#121212] hover:bg-[#1A1A1A] text-[#AAA49A] hover:text-[#F6F1E8] border border-[#202020]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="md:col-span-9 bg-[#121212] border border-[#242424] p-6 sm:p-10 space-y-8">
          {/* 1. OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-[#F6F1E8]">Atelier Overview</h2>
                <p className="text-xs text-[#AAA49A] mt-1 font-light">
                  Your private portal for orders, fragrances, and custom compositions.
                </p>
              </div>

              {/* Quick Stat Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-[#171717] border border-[#262626]">
                  <span className="text-[10px] uppercase tracking-wider text-[#777] block">Completed Orders</span>
                  <span className="font-serif text-3xl text-[#F6F1E8] tabular-nums font-normal">{orders.length}</span>
                </div>
                <div className="p-5 bg-[#171717] border border-[#262626]">
                  <span className="text-[10px] uppercase tracking-wider text-[#777] block">Saved Layering Formulas</span>
                  <span className="font-serif text-3xl text-[#C8A96B] tabular-nums font-normal">{savedLayeringCombos.length}</span>
                </div>
                <div className="p-5 bg-[#171717] border border-[#262626]">
                  <span className="text-[10px] uppercase tracking-wider text-[#777] block">Wishlist Archives</span>
                  <span className="font-serif text-3xl text-[#F6F1E8] tabular-nums font-normal">{wishlist.length}</span>
                </div>
              </div>

              {/* Scent DNA Teaser */}
              <div className="p-6 bg-[#171717] border border-[#2B2B2B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#C8A96B] font-medium">Recorded Scent DNA</span>
                  <h3 className="font-serif text-xl text-[#F6F1E8] mt-0.5">
                    {savedScentProfile?.vibe || 'WOODY • AMBER • NOCTURNAL COUTURE'}
                  </h3>
                  <p className="text-xs text-[#888] font-light mt-1">
                    Calibrated around {savedScentProfile?.favoriteNotes.slice(0, 3).join(', ') || 'sandalwood, vanilla, and cedar'}.
                  </p>
                </div>
                <Link
                  to="/profile"
                  className="bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors self-start sm:self-auto whitespace-nowrap"
                >
                  View Full DNA
                </Link>
              </div>

              {/* Recent Orders Preview */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-[#F6F1E8]">Recent Atelier Orders</h3>
                {orders.length === 0 ? (
                  <p className="text-xs text-[#777] font-light">No orders placed yet.</p>
                ) : (
                  <div className="divide-y divide-[#202020]">
                    {orders.slice(0, 2).map((order) => (
                      <div key={order.id} className="py-4 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono text-[#C8A96B]">{order.id}</span>
                          <p className="text-[#AAA49A] mt-0.5">{order.date} &bull; {order.items.length} items</p>
                        </div>
                        <span className="font-serif text-base text-[#F6F1E8] tabular-nums">${order.total}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="font-serif text-3xl text-[#F6F1E8]">Your Order Ledger</h2>
              {orders.length === 0 ? (
                <div className="py-12 text-center text-[#777] text-xs">
                  <p>You have not placed any orders yet.</p>
                  <Link to="/shop" className="text-[#C8A96B] underline mt-2 inline-block">
                    Explore our extractions
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-6 bg-[#161616] border border-[#2B2B2B] space-y-4 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#242424] pb-3 gap-2">
                        <div>
                          <span className="font-mono text-sm text-[#C8A96B] font-medium">{ord.id}</span>
                          <span className="text-[#777] ml-3">&bull; {ord.date}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#F6F1E8] bg-[#0B0B0B] px-3 py-1 border border-[#333]">
                          Status: {ord.status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {ord.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <span className="text-[#F6F1E8] font-serif text-sm">
                              {item.fragrance.name} <span className="text-[11px] text-[#777]">({item.size} &times; {item.quantity})</span>
                            </span>
                            <span className="text-[#AAA49A] tabular-nums">${item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#242424] flex items-center justify-between">
                        <span className="text-[#777]">Total Debited (Mocked):</span>
                        <span className="font-serif text-lg text-[#C8A96B] tabular-nums font-medium">${ord.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. SCENT DNA */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-3xl text-[#F6F1E8]">Personal Scent DNA</h2>
                <Link to="/profile" className="text-xs text-[#C8A96B] uppercase tracking-wider hover:underline">
                  Launch Interactive DNA Page &rarr;
                </Link>
              </div>
              <div className="p-6 bg-[#161616] border border-[#262626] space-y-4">
                <span className="text-[10px] uppercase tracking-wider text-[#C8A96B]">Active Formulation</span>
                <p className="font-serif text-2xl text-[#F6F1E8]">{savedScentProfile?.vibe || 'WOODY • AMBER • WARM'}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {(savedScentProfile?.dominantFamilies || [
                    { family: 'Woody', percentage: 78 },
                    { family: 'Amber', percentage: 64 },
                    { family: 'Spicy', percentage: 42 },
                    { family: 'Citrus', percentage: 28 },
                  ]).map((f) => (
                    <div key={f.family} className="p-3 bg-[#111] border border-[#222]">
                      <span className="text-[10px] uppercase text-[#777] block">{f.family}</span>
                      <span className="font-serif text-xl text-[#C8A96B] tabular-nums">{f.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="font-serif text-3xl text-[#F6F1E8]">Saved Wishlist ({wishlist.length})</h2>
              {wishlist.length === 0 ? (
                <p className="text-xs text-[#777]">No saved fragrances in your wishlist.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map((item) => {
                    const fragrance = FRAGRANCES.find((f) => f.id === item.fragranceId);
                    if (!fragrance) return null;
                    return (
                      <div key={fragrance.id} className="p-4 bg-[#161616] border border-[#262626] flex gap-3 items-center">
                        <img
                          src={fragrance.image}
                          alt={fragrance.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-16 object-cover border border-[#2B2B2B]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base text-[#F6F1E8] truncate">{fragrance.name}</h4>
                          <span className="text-xs text-[#C8A96B] tabular-nums">${fragrance.price}</span>
                        </div>
                        <button
                          onClick={() => addToCart(fragrance, '50ml', 1)}
                          className="px-3 py-1.5 bg-[#C8A96B] text-[#0B0B0B] text-xs font-medium"
                        >
                          Add
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 5. LAYERING COMBINATIONS */}
          {activeTab === 'layering' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-3xl text-[#F6F1E8]">Saved Layering Formulas</h2>
                <Link to="/layering-lab" className="text-xs text-[#C8A96B] uppercase tracking-wider hover:underline">
                  Open Layering Lab &rarr;
                </Link>
              </div>

              {savedLayeringCombos.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#777] bg-[#161616] border border-[#242424] space-y-2">
                  <p>You have not saved any bespoke pairings yet.</p>
                  <p className="text-[11px] text-[#555]">
                    Visit the Layering Lab to test compatibility between any two flacons and save your recipes.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedLayeringCombos.map((combo) => {
                    const s1 = FRAGRANCES.find((f) => f.id === combo.scent1Id);
                    const s2 = FRAGRANCES.find((f) => f.id === combo.scent2Id);
                    if (!s1 || !s2) return null;
                    return (
                      <div key={combo.id} className="p-6 bg-[#161616] border border-[#2B2B2B] space-y-3 text-xs">
                        <div className="flex items-center justify-between border-b border-[#242424] pb-2">
                          <span className="font-serif text-xl text-[#F6F1E8]">{combo.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[#C8A96B] font-mono font-medium">{combo.score}% Match</span>
                            <button
                              onClick={() => removeLayeringCombo(combo.id)}
                              className="text-[#666] hover:text-rose-400 p-1"
                              title="Delete formula"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-[#AAA49A] font-light">{combo.description}</p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[11px] text-[#777]">
                            {s1.name} + {s2.name}
                          </span>
                          <button
                            onClick={() => {
                              addToCart(s1, '50ml', 1);
                              addToCart(s2, '50ml', 1);
                            }}
                            className="bg-[#C8A96B] text-[#0B0B0B] px-3 py-1.5 uppercase tracking-wider text-[10px] font-medium"
                          >
                            Add Pair to Bag
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 6. ADDRESS */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h2 className="font-serif text-3xl text-[#F6F1E8]">Primary Courier Destination</h2>
              <div className="p-6 bg-[#161616] border border-[#262626] space-y-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-[#777] block">Street Address</span>
                  <p className="text-[#F6F1E8] font-medium">{savedAddress.street}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#777] block">City & Postal</span>
                  <p className="text-[#F6F1E8]">{savedAddress.city}, {savedAddress.postal}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#777] block">Country</span>
                  <p className="text-[#F6F1E8]">{savedAddress.country}</p>
                </div>
              </div>
            </div>
          )}

          {/* 7. SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="font-serif text-3xl text-[#F6F1E8]">Atelier Preferences</h2>
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#161616] border border-[#242424] flex items-center justify-between">
                  <div>
                    <span className="text-[#F6F1E8] font-medium block">Seasonal Olfactory Dispatch</span>
                    <span className="text-[11px] text-[#777]">Receive quarterly private reserve samples and harvest announcements.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-[#C8A96B]" />
                </div>
                <div className="p-4 bg-[#161616] border border-[#242424] flex items-center justify-between">
                  <div>
                    <span className="text-[#F6F1E8] font-medium block">Complimentary Gift Packaging Default</span>
                    <span className="text-[11px] text-[#777]">Automatically enclose Velouré velvet keepsake presentation box.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-[#C8A96B]" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
