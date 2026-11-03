import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Gift, Tag, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    addToWishlist,
    showToast,
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [giftWrapping, setGiftWrapping] = useState(false);

  const shippingCost = cartSubtotal >= 150 || cartSubtotal === 0 ? 0 : 25;
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const giftWrappingCost = giftWrapping ? 0 : 0; // Complimentary luxury packaging
  const orderTotal = cartSubtotal - discountAmount + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'VELOURE15' || code === 'FIRST15') {
      setDiscountPercent(15);
      showToast('Atelier 15% VIP privilege code applied!');
    } else if (code === 'VIP20') {
      setDiscountPercent(20);
      showToast('Private Salon 20% privilege code applied!');
    } else {
      showToast('Invalid or expired privilege code. Try "VELOURE15"', 'error');
    }
  };

  const handleSaveForLater = (fragranceId: string, cartItemId: string) => {
    addToWishlist(fragranceId);
    removeFromCart(cartItemId);
    showToast('Item moved to your Wishlist archive');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 min-h-[70vh]">
      {/* Header */}
      <div className="border-b border-[#202020] pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium flex items-center gap-2">
          <ShoppingBag className="w-3.5 h-3.5" />
          ATELIER CHECKOUT
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#F6F1E8] mt-1">
          Your Olfactory Bag
        </h1>
        <p className="text-xs text-[#AAA49A] mt-1 font-light">
          Review your selected flacons and bespoke sets before white-glove packaging.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-24 bg-[#121212] border border-[#202020] p-8 space-y-4">
          <p className="font-serif text-3xl text-[#AAA49A]">Your Bag is Currently Empty</p>
          <p className="text-xs text-[#777] max-w-sm mx-auto font-light leading-relaxed">
            Discover our collection of sixteen high-concentration perfumes or craft your personal Scent DNA.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/shop"
              className="bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              EXPLORE COLLECTION
            </Link>
            <Link
              to="/discovery-box"
              className="border border-[#333] hover:border-[#666] text-[#F6F1E8] px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              BUILD 5-SAMPLE BOX
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Items List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="divide-y divide-[#1F1F1F]">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 first:pt-0">
                  <img
                    src={item.fragrance.image}
                    alt={item.fragrance.name}
                    referrerPolicy="no-referrer"
                    className="w-24 h-28 object-cover border border-[#2B2B2B] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] tracking-widest uppercase text-[#AAA49A]">
                            {item.fragrance.brand}
                          </span>
                          <Link to={`/product/${item.fragrance.id}`}>
                            <h3 className="font-serif text-2xl text-[#F6F1E8] hover:text-[#C8A96B] transition-colors">
                              {item.fragrance.name}
                            </h3>
                          </Link>
                        </div>
                        <span className="font-serif text-xl text-[#F6F1E8] tabular-nums">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                      <p className="text-xs text-[#C8A96B] mt-1 font-light">
                        Format: {item.size} &bull; ${item.price} each
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#2A2A2A] bg-[#141414]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-[#AAA49A] hover:text-[#F6F1E8]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs tabular-nums font-medium text-[#F6F1E8]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-[#AAA49A] hover:text-[#F6F1E8]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove & Save for Later */}
                      <div className="flex items-center gap-4 text-xs">
                        <button
                          onClick={() => handleSaveForLater(item.fragranceId, item.id)}
                          className="text-[#AAA49A] hover:text-[#C8A96B] flex items-center gap-1 transition-colors"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span>Save for Later</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#777] hover:text-rose-400 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Complimentary Sample Note */}
            <div className="p-4 bg-[#141414] border border-[#242424] text-xs text-[#AAA49A] font-light flex items-center gap-3">
              <Gift className="w-4 h-4 text-[#C8A96B] shrink-0" />
              <span>
                Each flacon is dispatched with its matched 2ml travel sample. You may test the sample vial prior to breaking the crystal seal.
              </span>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 bg-[#121212] border border-[#242424] p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
            <h2 className="font-serif text-2xl text-[#F6F1E8] border-b border-[#202020] pb-4">
              Order Summary
            </h2>

            {/* Privilege / Promo Code */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block">
                Privilege Code (try: VELOURE15)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="bg-[#181818] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F6F1E8] flex-1 uppercase focus:outline-none focus:border-[#C8A96B]"
                />
                <button
                  type="submit"
                  className="bg-[#242424] hover:bg-[#333] text-xs text-[#F6F1E8] px-4 py-2 uppercase tracking-wider transition-colors"
                >
                  Apply
                </button>
              </div>
            </form>

            {/* Gift Wrapping Toggle */}
            <div
              onClick={() => setGiftWrapping(!giftWrapping)}
              className="p-3 bg-[#161616] border border-[#262626] flex items-center justify-between cursor-pointer text-xs"
            >
              <div className="flex items-center gap-2 text-[#D8CBB8]">
                <Gift className="w-4 h-4 text-[#C8A96B]" />
                <span>Velouré Signature Velvet Gift Packaging</span>
              </div>
              <span className={`text-[10px] font-semibold uppercase ${giftWrapping ? 'text-[#C8A96B]' : 'text-[#666]'}`}>
                {giftWrapping ? 'INCLUDED' : 'ADD FREE'}
              </span>
            </div>

            {/* Mathematical Totals Breakdown */}
            <div className="space-y-3 text-xs border-y border-[#202020] py-4 font-light">
              <div className="flex justify-between">
                <span className="text-[#AAA49A]">Subtotal</span>
                <span className="text-[#F6F1E8] tabular-nums font-medium">${cartSubtotal}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-[#C8A96B]">
                  <span>Privilege Discount ({discountPercent}%)</span>
                  <span className="tabular-nums">-${discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-[#AAA49A]">White Glove Courier Delivery</span>
                <span className="text-[#F6F1E8] tabular-nums font-medium">
                  {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#AAA49A]">Gift Packaging & Wax Seal</span>
                <span className="text-[#C8A96B]">Complimentary</span>
              </div>
            </div>

            {/* Final Total */}
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-xs uppercase tracking-widest text-[#F6F1E8] font-medium">Estimated Total</span>
              <span className="font-serif text-3xl text-[#F6F1E8] tabular-nums font-medium">
                ${orderTotal}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-[#666] text-center font-light leading-relaxed">
              Dispatched with discreet protective climate packaging from our Paris atelier.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
