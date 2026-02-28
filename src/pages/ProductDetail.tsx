import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Truck, Clock, Package, Check, Leaf, FlaskConical, Lightbulb, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { sampleVarieties, calculatePrice, calculateDeliveryCharge } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const variety = sampleVarieties.find((v) => v.id === id);

  const [quantity, setQuantity] = useState(15000);
  const [deliveryType, setDeliveryType] = useState<"local" | "250km">("local");

  if (!variety) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🌿</p>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Product not found</h2>
          <Link to="/products" className="text-primary hover:underline">Back to catalog</Link>
        </div>
      </div>
    );
  }

  const unitPrice = calculatePrice(variety, quantity);
  const deliveryCharge = calculateDeliveryCharge(variety, quantity, deliveryType);
  const total = unitPrice * quantity + deliveryCharge;

  const priceTier = quantity >= 30000 ? "30K+ Rate" : quantity >= 15000 ? "15K+ Rate" : "Ex-Factory";

  const handleAddToCart = () => {
    if (quantity < variety.minOrderQty) {
      toast.error(`Minimum order is ${variety.minOrderQty} plants`);
      return;
    }
    addItem(variety, quantity, deliveryType);
    toast.success(`Added ${quantity.toLocaleString()} ${variety.name} plants to cart!`);
  };

  // Related varieties from same crop
  const relatedVarieties = sampleVarieties.filter(v => v.cropId === variety.cropId && v.id !== variety.id).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Banner - Bayer style */}
      <section className="gradient-hero text-primary-foreground py-6">
        <div className="container-nursery">
          <Link to="/products" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-3 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-primary-foreground/60 text-sm">{variety.cropName}</p>
              <h1 className="font-display text-3xl md:text-5xl font-bold" id="varietyName">{variety.name}</h1>
            </div>
            <div className="ml-auto hidden md:flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-primary-foreground/20">
              <span className="text-primary-foreground/70 text-sm">by</span>
              <span className="font-display text-xl font-bold text-primary-foreground" id="companyName">{variety.company}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-nursery py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image + Description */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="rounded-2xl overflow-hidden shadow-elevated mb-6">
              <img
                src={variety.image}
                alt={`${variety.name} ${variety.cropName}`}
                className="w-full h-80 lg:h-[460px] object-cover"
              />
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-card mb-6" id="variety-description">
              <p className="text-foreground/80 leading-relaxed text-base">{variety.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {variety.features.map((f) => (
                  <span key={f} className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
                    <Check className="w-3 h-3" /> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* ===== FEATURES / ADVANTAGES / AGRONOMIC TIPS (Bayer-style) ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" id="variety-info-cards">
              {/* Features */}
              <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl gradient-cta flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-foreground">Features</h3>
                </div>
                <ul className="space-y-2">
                  {variety.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advantages */}
              <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl gradient-gold flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-foreground">Advantages</h3>
                </div>
                <ul className="space-y-2">
                  {(variety.advantages || [
                    "High yield potential for commercial farming",
                    "Suitable for varied climatic conditions",
                  ]).map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Agronomic Tips */}
              <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                    <FlaskConical className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-foreground">Agronomic Tips</h3>
                </div>
                <ul className="space-y-2">
                  {(variety.agronomicTips || [
                    "Follow recommended spacing for optimal yield",
                    `Transplant seedlings at ${variety.durationDays} days old`,
                  ]).map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-secondary-foreground mt-0.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ===== CHARACTERISTICS TABLE (Bayer-style) ===== */}
            {variety.characteristics && (
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-card" id="variety-characteristics">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-9 h-9 rounded-xl gradient-cta flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">Characteristics</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(variety.characteristics)
                    .filter(([, val]) => val)
                    .map(([key, value]) => (
                      <div key={key} className="bg-muted rounded-xl p-3">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-sm font-bold text-foreground">{value}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Pricing & Order */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="sticky top-24 space-y-5">
              {/* Company badge (mobile) */}
              <div className="md:hidden flex items-center gap-2 text-muted-foreground text-sm">
                <span>by</span>
                <span className="font-semibold text-foreground">{variety.company}</span>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted rounded-xl p-4 text-center">
                  <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-sm font-semibold text-foreground" id="durationDays">{variety.durationDays} Days</p>
                  <p className="text-xs text-muted-foreground">Ready</p>
                </div>
                <div className="bg-muted rounded-xl p-4 text-center">
                  <Package className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-sm font-semibold text-foreground" id="stockValue">{(variety.stock / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">In Stock</p>
                </div>
                <div className="bg-muted rounded-xl p-4 text-center">
                  <Truck className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-sm font-semibold text-foreground">{variety.minOrderQty.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Min Order</p>
                </div>
              </div>

              {/* Pricing Table */}
              <div className="bg-muted rounded-xl p-5">
                <h3 className="font-display font-semibold text-foreground mb-3" id="priceValue">Bulk Pricing (per plant)</h3>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  {[
                    { label: "Ex-Factory", price: variety.priceExFactory, active: priceTier === "Ex-Factory" },
                    { label: "15K+ Rate", price: variety.price15k, active: priceTier === "15K+ Rate" },
                    { label: "30K+ Rate", price: variety.price30k, active: priceTier === "30K+ Rate" },
                  ].map((p) => (
                    <div
                      key={p.label}
                      className={`rounded-lg p-3 transition-all ${
                        p.active ? "gradient-cta text-primary-foreground shadow-card" : "bg-card"
                      }`}
                    >
                      <p className={`text-xs ${p.active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.label}</p>
                      <p className="text-lg font-bold">₹{p.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & Delivery */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Quantity (plants)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(variety.minOrderQty, parseInt(e.target.value) || 0))}
                    min={variety.minOrderQty}
                    step={1000}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    id="quantityInput"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Delivery</label>
                  <div className="grid grid-cols-2 gap-3" id="deliverySelect">
                    {[
                      { type: "local" as const, label: "Local Delivery", charge: variety.deliveryLocalCharge },
                      { type: "250km" as const, label: "250+ km Delivery", charge: variety.delivery250kmCharge },
                    ].map((d) => (
                      <button
                        key={d.type}
                        onClick={() => setDeliveryType(d.type)}
                        className={`p-3 rounded-xl border text-sm text-left transition-all ${
                          deliveryType === d.type
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        <p className="font-semibold">{d.label}</p>
                        <p className="text-xs">₹{d.charge}/plant</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total & CTA */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Unit Price ({priceTier})</span>
                  <span className="text-foreground font-semibold">₹{unitPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Qty × {quantity.toLocaleString()}</span>
                  <span className="text-foreground font-semibold">₹{(unitPrice * quantity).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-foreground font-semibold">₹{deliveryCharge.toLocaleString()}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-display font-bold text-foreground">Total</span>
                  <span className="font-display text-2xl font-bold text-primary" id="totalPrice">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full gradient-cta text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:shadow-elevated transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>
          </motion.div>
        </div>

        {/* ===== RELATED VARIETIES ===== */}
        {relatedVarieties.length > 0 && (
          <section className="mt-16" id="related-varieties">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              More {variety.cropName} Varieties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedVarieties.map((rv) => (
                <Link
                  key={rv.id}
                  to={`/product/${rv.id}`}
                  className="product-card bg-card rounded-xl border border-border/50 p-4 hover:shadow-elevated transition-all hover:-translate-y-1 group"
                  data-variety-id={rv.id}
                >
                  <img src={rv.image} alt={rv.name} className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform" />
                  <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{rv.name}</h4>
                  <p className="text-xs text-muted-foreground">{rv.company}</p>
                  <p className="text-sm font-bold text-primary mt-2">₹{rv.priceExFactory.toFixed(2)}/plant</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
