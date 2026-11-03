import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Plus, Minus, Star, Share2, Sparkles, Shield, ArrowRight, Layers, Check } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';
import { FragranceDNA } from '../components/common/FragranceDNA';
import { ProductCard } from '../components/common/ProductCard';
import { useApp } from '../context/AppContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist, showToast } = useApp();

  const fragrance = useMemo(() => {
    return FRAGRANCES.find((f) => f.id === id) || FRAGRANCES[0];
  }, [id]);

  const [selectedSize, setSelectedSize] = useState<string>('50ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'dna' | 'story' | 'reviews'>('dna');

  // Customer review form mock state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      author: 'Victoire de Castellane',
      date: 'September 2026',
      rating: 5,
      title: 'A transcendent nocturnal composition',
      content:
        'The opening is startlingly luminous before giving way to the most hypnotic drydown I have encountered in a decade. Truly memorable projection that elicits compliments everywhere.',
    },
    {
      author: 'Marcus Aurel',
      date: 'August 2026',
      rating: 5,
      title: 'Architectural precision in a flacon',
      content:
        'Does not lean synthetic for even a split second. The raw sandalwood and balsamic resin facets blend with your skin heat rather than sitting on top of it. Exceptional longevity of over 10 hours.',
    },
  ]);

  const isFavorited = isInWishlist(fragrance.id);
  const currentPrice = fragrance.sizes[selectedSize] || fragrance.price;

  // Similar fragrances
  const similarFragrances = useMemo(() => {
    return FRAGRANCES.filter(
      (f) =>
        f.id !== fragrance.id &&
        (f.scentFamily === fragrance.scentFamily || f.secondaryFamily === fragrance.scentFamily)
    ).slice(0, 3);
  }, [fragrance]);

  const handleAddToCart = () => {
    addToCart(fragrance, selectedSize, quantity);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Direct link copied to clipboard');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      showToast('Please fill in your name and review', 'error');
      return;
    }
    const newRev = {
      author: newReviewAuthor,
      date: 'Just now',
      rating: newReviewRating,
      title: 'Personal Olfactory Reflection',
      content: newReviewComment,
    };
    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    showToast('Your review has been submitted to the atelier ledger');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-16">
      {/* Breadcrumbs */}
      <nav className="text-xs uppercase tracking-widest text-[#AAA49A] flex items-center gap-2 font-light">
        <Link to="/" className="hover:text-[#F6F1E8]">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#F6F1E8]">Atelier</Link>
        <span>/</span>
        <Link to={`/shop?family=${fragrance.scentFamily}`} className="hover:text-[#F6F1E8]">{fragrance.scentFamily}</Link>
        <span>/</span>
        <span className="text-[#C8A96B] font-medium">{fragrance.name}</span>
      </nav>

      {/* Main Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Product Imagery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] bg-[#141414] border border-[#222222] overflow-hidden">
            <img
              src={fragrance.image}
              alt={fragrance.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {fragrance.isNewArrival && (
              <span className="absolute top-4 left-4 bg-[#0B0B0B]/85 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#C8A96B] font-medium border border-[#2A2A2A]">
                New Harvest
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 bg-[#0B0B0B]/70 hover:bg-[#0B0B0B] text-[#AAA49A] hover:text-[#F6F1E8] border border-[#2A2A2A] transition-colors"
              title="Share Fragrance"
              aria-label="Share Fragrance"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Editorial Sample Guarantee */}
          <div className="p-4 bg-[#121212] border border-[#202020] flex items-center gap-4 text-xs text-[#AAA49A] font-light">
            <Shield className="w-5 h-5 text-[#C8A96B] shrink-0" />
            <span>
              <strong className="text-[#F6F1E8] font-medium">Complimentary Sample Included:</strong> Test the enclosed 2ml sample vial first. If not in love, return the unopened 50ml flacon for a complimentary exchange or full refund.
            </span>
          </div>
        </div>

        {/* Right: Contiguous Purchase Specs */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div>
            <div className="flex items-center justify-between text-xs tracking-widest text-[#AAA49A] uppercase mb-1">
              <span>{fragrance.brand}</span>
              <span className="text-[#C8A96B] font-medium">{fragrance.scentFamily} Family</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F6F1E8]">
              {fragrance.name}
            </h1>
            <p className="text-xs text-[#AAA49A] italic mt-1 font-light">
              &ldquo;{fragrance.tagline}&rdquo;
            </p>
          </div>

          {/* Rating summary */}
          <div className="flex items-center gap-2 text-xs border-y border-[#1F1F1F] py-3">
            <div className="flex items-center gap-1 text-[#C8A96B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#C8A96B]" />
              ))}
            </div>
            <span className="font-medium text-[#F6F1E8] tabular-nums">{fragrance.rating.toFixed(2)}</span>
            <span className="text-[#666] tabular-nums">({fragrance.reviewCount} connoisseur evaluations)</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl text-[#F6F1E8] tabular-nums">
              ${currentPrice}
            </span>
            <span className="text-xs text-[#777] font-light uppercase tracking-wider">
              Eau de Parfum Haute Concentration
            </span>
          </div>

          <p className="text-xs text-[#AAA49A] font-light leading-relaxed">
            {fragrance.description}
          </p>

          {/* Flacon Size Selector */}
          <div className="space-y-2 pt-2">
            <label className="text-xs uppercase tracking-widest text-[#F6F1E8] font-medium block">
              Flacon Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(fragrance.sizes).map(([size, price]) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 px-2 border text-center transition-all ${
                    selectedSize === size
                      ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#F6F1E8]'
                      : 'border-[#222222] bg-[#141414] text-[#AAA49A] hover:border-[#383838]'
                  }`}
                >
                  <span className="block text-xs font-medium uppercase tracking-wider">{size}</span>
                  <span className="block text-[11px] text-[#C8A96B] mt-0.5 tabular-nums">${price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#2B2B2B] bg-[#141414]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#AAA49A] hover:text-[#F6F1E8]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs tabular-nums font-medium text-[#F6F1E8]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[#AAA49A] hover:text-[#F6F1E8]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG &bull; ${currentPrice * quantity}</span>
              </button>

              {/* Wishlist CTA */}
              <button
                onClick={() => addToWishlist(fragrance.id)}
                className={`p-3.5 border transition-colors ${
                  isFavorited
                    ? 'border-[#C8A96B] text-[#C8A96B] bg-[#C8A96B]/10'
                    : 'border-[#2B2B2B] bg-[#141414] text-[#AAA49A] hover:text-[#F6F1E8]'
                }`}
                aria-label="Add to wishlist"
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#C8A96B]' : ''}`} />
              </button>
            </div>

            {/* Layering Quick Link */}
            <div className="pt-2">
              <Link
                to={`/layering-lab?scent1=${fragrance.id}`}
                className="w-full block text-center py-2.5 border border-[#262626] bg-[#121212] text-xs uppercase tracking-wider text-[#AAA49A] hover:text-[#C8A96B] hover:border-[#383838] transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span>Explore Layering Formulas With {fragrance.name}</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="pt-8 border-t border-[#202020]">
        <div className="flex items-center justify-center gap-8 border-b border-[#202020] text-xs uppercase tracking-[0.2em] font-medium">
          <button
            onClick={() => setActiveTab('dna')}
            className={`pb-4 relative transition-colors ${
              activeTab === 'dna' ? 'text-[#C8A96B]' : 'text-[#AAA49A] hover:text-[#F6F1E8]'
            }`}
          >
            <span>FRAGRANCE DNA</span>
            {activeTab === 'dna' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A96B]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`pb-4 relative transition-colors ${
              activeTab === 'story' ? 'text-[#C8A96B]' : 'text-[#AAA49A] hover:text-[#F6F1E8]'
            }`}
          >
            <span>ATELIER STORY</span>
            {activeTab === 'story' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A96B]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 relative transition-colors ${
              activeTab === 'reviews' ? 'text-[#C8A96B]' : 'text-[#AAA49A] hover:text-[#F6F1E8]'
            }`}
          >
            <span>REVIEWS ({reviewsList.length + fragrance.reviewCount})</span>
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A96B]" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-8">
          {activeTab === 'dna' && (
            <div className="max-w-4xl mx-auto">
              <FragranceDNA fragrance={fragrance} />
            </div>
          )}

          {activeTab === 'story' && (
            <div className="max-w-3xl mx-auto space-y-6 text-[#AAA49A] font-light leading-relaxed">
              <h3 className="font-serif text-2xl text-[#F6F1E8]">The Olfactory Inspiration</h3>
              <p className="text-base">{fragrance.story}</p>
              <div className="p-6 bg-[#121212] border border-[#222222] my-6 space-y-2">
                <p className="text-xs uppercase tracking-widest text-[#C8A96B] font-medium">Maceration & Extraction</p>
                <p className="text-xs text-[#8A857D]">
                  Slow-cured for four lunar cycles in inert glass vessels in Grasse, France. Free from synthetic colorants, phthalates, and animal byproducts.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl mx-auto space-y-12">
              {/* Existing Reviews */}
              <div className="space-y-6">
                {reviewsList.map((rev, index) => (
                  <div key={index} className="p-6 bg-[#121212] border border-[#202020] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-[#C8A96B]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#C8A96B]" />
                        ))}
                      </div>
                      <span className="text-[#666] font-light">{rev.date}</span>
                    </div>
                    <h4 className="font-serif text-lg text-[#F6F1E8]">{rev.title}</h4>
                    <p className="text-xs text-[#AAA49A] font-light leading-relaxed">{rev.content}</p>
                    <p className="text-[11px] text-[#777] font-medium pt-1">— {rev.author}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="p-8 bg-[#141414] border border-[#262626] space-y-4">
                <h4 className="font-serif text-xl text-[#F6F1E8]">Leave a Connoisseur Evaluation</h4>
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Your Name</label>
                      <input
                        type="text"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Julian V."
                        className="w-full bg-[#1A1A1A] border border-[#2B2B2B] px-3 py-2 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Rating</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full bg-[#1A1A1A] border border-[#2B2B2B] px-3 py-2 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                      >
                        <option value={5}>5 Stars - Transcendent</option>
                        <option value={4}>4 Stars - Distinctive</option>
                        <option value={3}>3 Stars - Moderate</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#AAA49A] block mb-1">Review Comments</label>
                    <textarea
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share your olfactory experience with this formula..."
                      className="w-full bg-[#1A1A1A] border border-[#2B2B2B] px-3 py-2 text-xs text-[#F6F1E8] focus:outline-none focus:border-[#C8A96B]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#C8A96B] hover:bg-[#D8CBB8] text-[#0B0B0B] px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                  >
                    POST EVALUATION
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Fragrances */}
      {similarFragrances.length > 0 && (
        <section className="pt-12 border-t border-[#202020]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8A96B] font-medium">HARMONIOUS ESSENCES</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F1E8]">Similar Fragrances You May Appreciate</h2>
            </div>
            <Link to="/shop" className="text-xs uppercase tracking-wider text-[#AAA49A] hover:text-[#C8A96B]">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {similarFragrances.map((f) => (
              <ProductCard key={f.id} fragrance={f} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
