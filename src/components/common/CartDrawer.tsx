import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Gift } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    showToast,
  } = useApp();
  const navigate = useNavigate();
  const [giftWrap, setGiftWrap] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewBag = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#000000]/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101010] border-l border-[#262626] text-[#F6F1E8] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#202020] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#C8A96B]" />
              <h3 className="font-serif text-xl tracking-wider uppercase text-[#F6F1E8]">
                Your Olfactory Bag
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-[#AAA49A] hover:text-[#F6F1E8] p-1 transition-colors"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Tracker */}
          <div className="px-6 py-3 bg-[#151515] border-b border-[#202020] text-xs">
            {cartSubtotal >= freeShippingThreshold ? (
              <p className="text-[#C8A96B] font-light">
                &check; You qualify for complimentary White Glove Courier Delivery.
              </p>
            ) : (
              <p className="text-[#AAA49A] font-light">
                Add <span className="text-[#F6F1E8] font-medium tabular-nums">${remainingForFreeShipping}</span> more for complimentary courier delivery.
              </p>
            )}
            <div className="w-full bg-[#262626] h-1 mt-2 overflow-hidden">
              <div
                className="bg-[#C8A96B] h-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <p className="font-serif text-2xl text-[#AAA49A]">Your bag is presently empty.</p>
                <p className="text-xs text-[#666] font-light max-w-xs mx-auto">
                  Explore our haute parfumerie collections or discover your bespoke signature profile.
                </p>
                <div className="pt-4 flex flex-col gap-2 max-w-xs mx-auto">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/shop');
                    }}
                    className="w-full bg-[#C8A96B] text-[#0B0B0B] py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#D8CBB8] transition-colors"
                  >
                    EXPLORE COLLECTION
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/scent-finder');
                    }}
                    className="w-full border border-[#2B2B2B] text-[#AAA49A] py-3 text-xs uppercase tracking-[0.2em] font-medium hover:text-[#F6F1E8] transition-colors"
                  >
                    TAKE SCENT FINDER
                  </button>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-[#1E1E1E]">
                  <img
                    src={item.fragrance.image}
                    alt={item.fragrance.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover border border-[#2B2B2B]"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] tracking-widest uppercase text-[#AAA49A]">
                            {item.fragrance.brand}
                          </p>
                          <h4 className="font-serif text-base text-[#F6F1E8] leading-tight mt-0.5">
                            {item.fragrance.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#666] hover:text-[#AAA49A] transition-colors p-1"
                          aria-label={`Remove ${item.fragrance.name} from bag`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#C8A96B] font-light mt-1">
                        Format: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#2A2A2A]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#AAA49A] hover:text-[#F6F1E8]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs tabular-nums font-medium text-[#F6F1E8]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#AAA49A] hover:text-[#F6F1E8]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium tabular-nums text-[#F6F1E8]">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#202020] bg-[#121212] space-y-4">
              {/* Gift Wrap Toggle */}
              <div
                onClick={() => {
                  setGiftWrap(!giftWrap);
                  showToast(giftWrap ? 'Gift packaging removed' : 'Complimentary velvet gift packaging applied');
                }}
                className="flex items-center justify-between p-3 bg-[#181818] border border-[#262626] cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#C8A96B]" />
                  <span className="text-[#D8CBB8]">Maison Velvet Gift Box & Ribbon</span>
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-semibold ${giftWrap ? 'text-[#C8A96B]' : 'text-[#777]'}`}>
                  {giftWrap ? 'INCLUDED' : 'ADD FREE'}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#AAA49A] uppercase tracking-wider text-xs">Subtotal</span>
                <span className="font-serif text-xl text-[#F6F1E8] tabular-nums">
                  ${cartSubtotal}
                </span>
              </div>

              <p className="text-[11px] text-[#777] font-light">
                Taxes, customs, and courier logistics calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleViewBag}
                  className="w-full border border-[#2B2B2B] text-[#D8CBB8] hover:text-[#F6F1E8] hover:border-[#555] py-3 text-xs uppercase tracking-[0.15em] font-medium transition-colors"
                >
                  VIEW FULL BAG
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] py-3 text-xs uppercase tracking-[0.15em] font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <span>CHECKOUT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
