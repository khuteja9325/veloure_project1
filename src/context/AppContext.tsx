import React, { createContext, useContext, useState, useEffect } from 'react';
import { Fragrance, CartItem, WishlistItem, ScentProfile, LayeringCombo, Order } from '../types';
import { FRAGRANCES } from '../data/fragrances';

interface AppContextType {
  cart: CartItem[];
  addToCart: (fragrance: Fragrance, size?: string, quantity?: number) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  wishlist: WishlistItem[];
  addToWishlist: (fragranceId: string, category?: WishlistItem['category']) => void;
  removeFromWishlist: (fragranceId: string) => void;
  isInWishlist: (fragranceId: string) => boolean;

  comparisonIds: string[];
  addToComparison: (fragranceId: string) => void;
  removeFromComparison: (fragranceId: string) => void;
  isInComparison: (fragranceId: string) => boolean;
  clearComparison: () => void;

  savedScentProfile: ScentProfile | null;
  saveScentProfile: (profile: ScentProfile) => void;

  savedLayeringCombos: LayeringCombo[];
  saveLayeringCombo: (combo: Omit<LayeringCombo, 'id' | 'date'>) => void;
  removeLayeringCombo: (id: string) => void;

  orders: Order[];
  placeOrder: (orderInfo: Omit<Order, 'id' | 'date' | 'status'>) => Order;

  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  user: { name: string; email: string } | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('veloure_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Wishlist
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('veloure_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Comparison
  const [comparisonIds, setComparisonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('veloure_comparison');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Scent Profile
  const [savedScentProfile, setSavedScentProfile] = useState<ScentProfile | null>(() => {
    try {
      const saved = localStorage.getItem('veloure_scent_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 5. Layering Combos
  const [savedLayeringCombos, setSavedLayeringCombos] = useState<LayeringCombo[]>(() => {
    try {
      const saved = localStorage.getItem('veloure_layering');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 6. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('veloure_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 7. User Account
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem('veloure_user');
      return saved ? JSON.parse(saved) : { name: 'Éléonore Laurent', email: 'eleonore.laurent@veloure.fr' };
    } catch {
      return { name: 'Éléonore Laurent', email: 'eleonore.laurent@veloure.fr' };
    }
  });

  // 8. Modals & Overlays
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('veloure_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('veloure_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('veloure_comparison', JSON.stringify(comparisonIds));
  }, [comparisonIds]);

  useEffect(() => {
    if (savedScentProfile) {
      localStorage.setItem('veloure_scent_profile', JSON.stringify(savedScentProfile));
    }
  }, [savedScentProfile]);

  useEffect(() => {
    localStorage.setItem('veloure_layering', JSON.stringify(savedLayeringCombos));
  }, [savedLayeringCombos]);

  useEffect(() => {
    localStorage.setItem('veloure_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('veloure_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('veloure_user');
    }
  }, [user]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addToCart = (fragrance: Fragrance, size: string = '50ml', quantity: number = 1) => {
    const price = fragrance.sizes[size] || fragrance.price;
    const existingIndex = cart.findIndex(item => item.fragranceId === fragrance.id && item.size === size);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `${fragrance.id}-${size}-${Date.now()}`,
        fragranceId: fragrance.id,
        fragrance,
        size,
        price,
        quantity,
      };
      setCart(prev => [newItem, ...prev]);
    }

    showToast(`Added ${fragrance.name} (${size}) to your bag`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const addToWishlist = (fragranceId: string, category: WishlistItem['category'] = 'Favorites') => {
    const fragrance = FRAGRANCES.find(f => f.id === fragranceId);
    if (!fragrance) return;

    if (wishlist.some(w => w.fragranceId === fragranceId)) {
      removeFromWishlist(fragranceId);
      return;
    }

    setWishlist(prev => [...prev, { fragranceId, category, addedAt: new Date().toISOString() }]);
    showToast(`Added ${fragrance.name} to wishlist`);
  };

  const removeFromWishlist = (fragranceId: string) => {
    const fragrance = FRAGRANCES.find(f => f.id === fragranceId);
    setWishlist(prev => prev.filter(w => w.fragranceId !== fragranceId));
    showToast(`Removed ${fragrance?.name || 'item'} from wishlist`, 'info');
  };

  const isInWishlist = (fragranceId: string) => {
    return wishlist.some(w => w.fragranceId === fragranceId);
  };

  const addToComparison = (fragranceId: string) => {
    if (comparisonIds.includes(fragranceId)) {
      removeFromComparison(fragranceId);
      return;
    }
    if (comparisonIds.length >= 3) {
      showToast('You can compare a maximum of 3 fragrances', 'error');
      return;
    }
    setComparisonIds(prev => [...prev, fragranceId]);
    showToast('Added to comparison bench');
  };

  const removeFromComparison = (fragranceId: string) => {
    setComparisonIds(prev => prev.filter(id => id !== fragranceId));
    showToast('Removed from comparison', 'info');
  };

  const isInComparison = (fragranceId: string) => {
    return comparisonIds.includes(fragranceId);
  };

  const clearComparison = () => {
    setComparisonIds([]);
  };

  const saveScentProfile = (profile: ScentProfile) => {
    setSavedScentProfile(profile);
    showToast('Your Scent DNA profile has been saved to your account');
  };

  const saveLayeringCombo = (combo: Omit<LayeringCombo, 'id' | 'date'>) => {
    const newCombo: LayeringCombo = {
      ...combo,
      id: `combo-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setSavedLayeringCombos(prev => [newCombo, ...prev]);
    showToast('Layering combination saved to your collection');
  };

  const removeLayeringCombo = (id: string) => {
    setSavedLayeringCombos(prev => prev.filter(c => c.id !== id));
    showToast('Combination removed', 'info');
  };

  const placeOrder = (orderInfo: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderInfo,
      id: `VEL-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Confirmed',
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const login = (name: string, email: string) => {
    setUser({ name, email });
    showToast(`Welcome back, ${name}`);
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out successfully', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        comparisonIds,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison,
        savedScentProfile,
        saveScentProfile,
        savedLayeringCombos,
        saveLayeringCombo,
        removeLayeringCombo,
        orders,
        placeOrder,
        toast,
        showToast,
        isSearchOpen,
        setIsSearchOpen,
        isCartOpen,
        setIsCartOpen,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
