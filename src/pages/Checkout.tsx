import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Truck, Banknote, Building, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { calculateTotal, calculatePrice, calculateDeliveryCharge } from "@/data/products";
import { toast } from "sonner";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod" | "bank">("razorpay");
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", address: "", city: "", state: "Maharashtra", pincode: "", landmark: ""
  });

  const grandTotal = items.reduce((sum, item) => sum + calculateTotal(item), 0);
  const totalPlants = items.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.address || !form.city || !form.pincode) {
      toast.error("Please fill all required delivery fields");
      return;
    }
    toast.success("Order placed successfully! Order #SNH-" + Math.floor(1000 + Math.random() * 9000));
    clearCart();
    navigate("/dashboard");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🛒</p>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Cart is empty</h2>
          <Link to="/products" className="text-primary font-semibold hover:underline">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="gradient-hero text-primary-foreground py-12">
        <div className="container-nursery">
          <Link to="/cart" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Checkout</h1>
        </div>
      </section>

      <div className="container-nursery py-10">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery Form */}
            <div className="lg:col-span-2 space-y-6" id="checkout-form">
              {/* Delivery Address */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-card">
                <h3 className="font-display text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> Delivery Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="delivery-address-fields">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                    <input type="text" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" maxLength={100} required id="customerName" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number *</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" maxLength={15} required id="customerPhone" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email (Optional)</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" maxLength={255} id="checkout-email" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Full Address *</label>
                    <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" maxLength={500} required id="customerAddress" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">City *</label>
                    <input type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" required id="customerCity" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">State *</label>
                    <select value={form.state} onChange={e => setForm({...form, state: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" id="checkout-state">
                      {["Maharashtra", "Karnataka", "Andhra Pradesh", "Telangana", "Tamil Nadu", "Gujarat", "Rajasthan", "Madhya Pradesh", "Uttar Pradesh", "Other"].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Pincode *</label>
                    <input type="text" value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" maxLength={6} required id="customerPincode" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Landmark</label>
                    <input type="text" value={form.landmark} onChange={e => setForm({...form, landmark: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" maxLength={100} />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-card" id="payment-method">
                <h3 className="font-display text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "razorpay" as const, icon: CreditCard, label: "Pay Online", desc: "Razorpay (UPI, Cards, NetBanking)" },
                    { id: "cod" as const, icon: Banknote, label: "Cash on Delivery", desc: "Pay when plants are delivered" },
                    { id: "bank" as const, icon: Building, label: "Bank Transfer", desc: "NEFT/RTGS/IMPS" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <method.icon className={`w-6 h-6 mb-2 ${paymentMethod === method.id ? "text-primary" : "text-muted-foreground"}`} />
                      <p className="font-semibold text-foreground text-sm">{method.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{method.desc}</p>
                      {paymentMethod === method.id && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-primary font-semibold">
                          <Check className="w-3 h-3" /> Selected
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div id="order-summary">
              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-card sticky top-28">
                <h3 className="font-display text-lg font-bold text-foreground mb-5">Order Summary</h3>

                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.variety.id} className="flex gap-3" id={`order-item-${item.variety.id}`}>
                      <img src={item.variety.image} alt={item.variety.name} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{item.variety.name}</p>
                        <p className="text-xs text-muted-foreground">{item.quantity.toLocaleString()} plants</p>
                        <p className="text-sm font-bold text-primary mt-0.5">₹{calculateTotal(item).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Total Plants</span>
                    <span className="font-medium text-foreground">{totalPlants.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="font-medium text-foreground">Included</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3 flex justify-between items-center">
                    <span className="font-display font-bold text-foreground text-lg">Total</span>
                    <span className="font-display text-2xl font-bold text-primary">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full gradient-cta text-primary-foreground py-4 rounded-xl font-bold text-lg mt-6 hover:shadow-elevated transition-all hover:scale-[1.02] btn-ripple"
                  id="placeOrderBtn"
                >
                  {paymentMethod === "razorpay" ? "Pay & Place Order" : "Place Order"}
                </button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  By placing this order, you agree to our terms & conditions.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
