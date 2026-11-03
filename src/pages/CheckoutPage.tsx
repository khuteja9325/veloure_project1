import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ShieldCheck, CreditCard, Truck, Package, ArrowRight, ArrowLeft, Lock, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart, placeOrder, showToast } = useApp();

  const [step, setStep] = useState<number>(1);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form Fields
  const [email, setEmail] = useState('eleonore.laurent@veloure.fr');
  const [phone, setPhone] = useState('+33 6 40 92 11 85');
  const [fullName, setFullName] = useState('Éléonore Laurent');
  const [address, setAddress] = useState('18 Place Vendôme, Apt 4B');
  const [city, setCity] = useState('Paris');
  const [state, setState] = useState('Île-de-France');
  const [zip, setZip] = useState('75001');
  const [country, setCountry] = useState('France');

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [mockCardNumber, setMockCardNumber] = useState('•••• •••• •••• 8842');
  const [mockExpiry, setMockExpiry] = useState('11/29');
  const [mockCvv, setMockCvv] = useState('•••');
  const [mockCardName, setMockCardName] = useState('Éléonore Laurent');

  const shippingCost = deliveryMethod === 'express' ? 35 : (cartSubtotal >= 150 ? 0 : 25);
  const total = cartSubtotal + shippingCost;

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else if (step === 5) {
      // Place Order
      const newOrder = placeOrder({
        items: [...cart],
        subtotal: cartSubtotal,
        shipping: shippingCost,
        discount: 0,
        giftWrapping: true,
        total: total,
        shippingAddress: {
          fullName,
          address,
          city,
          state,
          zip,
          country,
        },
        deliveryMethod: deliveryMethod === 'express' ? 'White Glove Priority Air Express' : 'Complimentary Atelier Courier',
        estimatedDelivery: deliveryMethod === 'express' ? '2-3 Business Days' : '4-6 Business Days',
      });
      setCompletedOrder(newOrder);
      setStep(6);
      showToast('Order confirmed! Welcome to the Velouré Olfactory Ledger.');
    }
  };

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#AAA49A]">No Items in Bag for Checkout</h2>
        <p className="text-xs text-[#777] font-light">Please add fragrances to your bag before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="inline-block bg-[#C8A96B] text-[#0B0B0B] px-6 py-3 text-xs uppercase tracking-wider font-medium"
        >
          Return to Atelier
        </Link>
      </div>
    );
  }

  // STEP 6: CONFIRMATION SCREEN
  if (step === 6 && completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10 animate-in fade-in duration-500">
        <div className="p-8 sm:p-14 bg-[#121212] border border-[#2B2B2B] text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#C8A96B]/20 border border-[#C8A96B] flex items-center justify-center mx-auto text-[#C8A96B]">
            <Check className="w-7 h-7" />
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-[#C8A96B] font-medium block">
            TRANSACTION RECORDED
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl text-[#F6F1E8]">
            YOUR ORDER IS CONFIRMED
          </h1>

          <p className="text-sm text-[#AAA49A] font-light max-w-lg mx-auto leading-relaxed">
            Thank you, {completedOrder.shippingAddress.fullName}. Your flacons are now being prepared by our master bottlers with personalized wax seals.
          </p>

          <div className="p-5 bg-[#171717] border border-[#262626] max-w-md mx-auto grid grid-cols-2 gap-4 text-xs text-left">
            <div>
              <span className="text-[10px] text-[#777] uppercase tracking-wider block">Order Reference</span>
              <span className="font-mono text-sm text-[#F6F1E8] font-medium">{completedOrder.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#777] uppercase tracking-wider block">Estimated Courier Arrival</span>
              <span className="text-xs text-[#C8A96B] font-medium">{completedOrder.estimatedDelivery}</span>
            </div>
          </div>

          {/* Items Purchased List */}
          <div className="border-t border-[#202020] pt-6 max-w-md mx-auto space-y-3 text-left">
            <span className="text-[10px] uppercase tracking-wider text-[#777] block">Purchased Creations:</span>
            {completedOrder.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs py-1">
                <span className="text-[#F6F1E8] font-serif text-sm">
                  {item.fragrance.name} <span className="text-[11px] text-[#777]">({item.size} &times; {item.quantity})</span>
                </span>
                <span className="text-[#AAA49A] tabular-nums font-mono">${item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-[#222] pt-3 flex justify-between font-serif text-base text-[#F6F1E8]">
              <span>Total Debited (Mocked):</span>
              <span className="text-[#C8A96B] tabular-nums">${completedOrder.total}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
            <Link
              to="/account"
              className="w-full sm:w-auto border border-[#333] hover:border-[#666] text-[#AAA49A] hover:text-[#F6F1E8] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              VIEW ORDER IN ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-[#202020] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            SECURE ATELIER PROTOCOL (SIMULATED PROTOTYPE)
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8] mt-1">
            Checkout & Fulfillment
          </h1>
        </div>

        {/* Steps Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#777]">
          {['Contact', 'Shipping', 'Delivery', 'Payment', 'Review'].map((name, i) => (
            <React.Fragment key={name}>
              <span className={step === i + 1 ? 'text-[#C8A96B] font-medium' : step > i + 1 ? 'text-[#AAA49A]' : ''}>
                0{i + 1}. {name}
              </span>
              {i < 4 && <span>&bull;</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form area */}
        <div className="lg:col-span-7 bg-[#121212] border border-[#242424] p-6 sm:p-10 space-y-8">
          {/* STEP 1: CONTACT */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#F6F1E8]">01. Client Correspondence</h2>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Email for Courier Tracking</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Mobile Telephone (Courier Notifications)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SHIPPING */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#F6F1E8]">02. White Glove Destination</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DELIVERY */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#F6F1E8]">03. Courier Dispatch Method</h2>
              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F6F1E8]'
                      : 'border-[#262626] bg-[#161616] text-[#AAA49A]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="font-serif text-base text-[#F6F1E8]">Complimentary Atelier Ground Courier</p>
                    <p className="text-xs text-[#777]">4–6 business days &bull; Insured temperature-controlled transport</p>
                  </div>
                  <span className="text-xs text-[#C8A96B] font-medium">Free</span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F6F1E8]'
                      : 'border-[#262626] bg-[#161616] text-[#AAA49A]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="font-serif text-base text-[#F6F1E8]">White Glove Priority Air Express</p>
                    <p className="text-xs text-[#777]">2–3 business days &bull; Expedited Paris export &bull; Personal signature</p>
                  </div>
                  <span className="text-xs text-[#F6F1E8] font-medium tabular-nums">$35</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: MOCK PAYMENT */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-[#F6F1E8]">04. Mock Payment Method</h2>
                <span className="text-[10px] uppercase tracking-wider text-[#C8A96B] bg-[#C8A96B]/15 px-2 py-0.5">
                  SIMULATION PROTOCOL
                </span>
              </div>

              <div className="p-4 bg-[#181818] border border-[#2A2A2A] text-xs text-[#AAA49A] font-light">
                This is a UI/UX evaluation prototype. No real payment will be charged or card credentials stored.
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Simulated Cardholder Name</label>
                  <input
                    type="text"
                    value={mockCardName}
                    onChange={(e) => setMockCardName(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Card Number (Mocked)</label>
                  <input
                    type="text"
                    value={mockCardNumber}
                    onChange={(e) => setMockCardNumber(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={mockExpiry}
                      onChange={(e) => setMockExpiry(e.target.value)}
                      className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">CVV Security Code</label>
                    <input
                      type="text"
                      value={mockCvv}
                      onChange={(e) => setMockCvv(e.target.value)}
                      className="w-full bg-[#181818] border border-[#2B2B2B] p-3 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#F6F1E8]">05. Review & Authorize Order</h2>
              <div className="space-y-4 text-xs divide-y divide-[#202020]">
                <div className="pt-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#777] block">Recipient & Destination</span>
                  <p className="text-[#F6F1E8] font-medium mt-0.5">{fullName} &bull; {email}</p>
                  <p className="text-[#AAA49A] font-light">{address}, {city}, {zip}, {country}</p>
                </div>
                <div className="pt-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#777] block">Courier Logistic</span>
                  <p className="text-[#F6F1E8] font-medium mt-0.5">
                    {deliveryMethod === 'express' ? 'White Glove Priority Air Express ($35)' : 'Complimentary Ground Courier (Free)'}
                  </p>
                </div>
                <div className="pt-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#777] block">Payment Instrument</span>
                  <p className="text-[#F6F1E8] font-medium mt-0.5">Visa ending in 8842 (Simulated Auth)</p>
                </div>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-[#202020]">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className={`text-xs uppercase tracking-wider flex items-center gap-2 ${step === 1 ? 'opacity-30' : 'text-[#AAA49A] hover:text-[#F6F1E8]'}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNextStep}
              className="bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2"
            >
              <span>{step === 5 ? 'AUTHORIZE & PLACE ORDER' : 'PROCEED'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-[#121212] border border-[#242424] p-6 sm:p-8 space-y-6">
          <h3 className="font-serif text-xl text-[#F6F1E8] border-b border-[#202020] pb-3">
            In Your Bag ({cart.length})
          </h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center text-xs">
                <img
                  src={item.fragrance.image}
                  alt={item.fragrance.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-14 object-cover border border-[#262626]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm text-[#F6F1E8] truncate">{item.fragrance.name}</h4>
                  <p className="text-[11px] text-[#777]">
                    {item.size} &times; {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-medium text-[#F6F1E8] tabular-nums">
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-[#202020] pt-4 text-xs font-light">
            <div className="flex justify-between">
              <span className="text-[#AAA49A]">Subtotal</span>
              <span className="text-[#F6F1E8] tabular-nums font-medium">${cartSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#AAA49A]">Delivery</span>
              <span className="text-[#F6F1E8] tabular-nums font-medium">
                {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#AAA49A]">Gift Packaging & Wax Seal</span>
              <span className="text-[#C8A96B]">Complimentary</span>
            </div>
            <div className="border-t border-[#222] pt-3 flex justify-between font-serif text-2xl text-[#F6F1E8]">
              <span>Total</span>
              <span className="text-[#C8A96B] tabular-nums">${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
