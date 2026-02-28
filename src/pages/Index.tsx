import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Truck, Sprout, Shield, Microscope, Clock, Star, Quote, ChevronLeft, ChevronRight, Play } from "lucide-react";
import heroVideo from "@/assets/Hero-nursery.mp4";
import { categories, sampleVarieties } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCountUp } from "@/hooks/useCountUp";
import { useState, useRef, useEffect } from "react";

const stats = [
  { icon: Award, value: 28, suffix: "+", label: "Years Experience" },
  { icon: Sprout, value: 10, suffix: "L+", label: "Plants Supplied" },
  { icon: Users, value: 5000, suffix: "+", label: "Happy Farmers" },
  { icon: Truck, value: 15, suffix: "+", label: "States Covered" },
];

const whyChooseUs = [
  { icon: Shield, title: "Disease Resistant", desc: "Our grafted plants offer superior resistance to soil-borne diseases, reducing crop losses significantly." },
  { icon: Microscope, title: "Advanced Grafting", desc: "World-class Japanese grafting technology ensuring 98%+ survival rate in your fields." },
  { icon: Clock, title: "Timely Delivery", desc: "Precise scheduling of plant readiness and delivery to match your planting season perfectly." },
  { icon: Star, title: "Premium Quality", desc: "Every seedling undergoes strict quality control before dispatch. No compromise on plant health." },
  { icon: Truck, title: "Pan-India Shipping", desc: "Temperature-controlled logistics network covering 15+ states with 24-48 hour delivery." },
  { icon: Users, title: "Expert Support", desc: "Dedicated agronomists provide variety selection guidance and post-planting crop advisory." },
];

const testimonials = [
  { name: "Rajesh Patil", location: "Nashik, Maharashtra", text: "Best grafted tomato seedlings I've ever used. My yield increased by 40% compared to non-grafted plants. Sanap Nursery is my go-to for every season.", rating: 5, crop: "Tomato" },
  { name: "Suresh Kumar", location: "Belgaum, Karnataka", text: "Ordering 30,000+ plants was seamless. The pricing is very competitive and the plants arrived in perfect condition. Highly recommended for serious farmers.", rating: 5, crop: "Chili" },
  { name: "Vinod Sharma", location: "Satara, Maharashtra", text: "The capsicum seedlings from Sanap Nursery have been consistently excellent. Their grafted plants resist wilt disease which saved my entire crop last season.", rating: 5, crop: "Capsicum" },
  { name: "Anand Jadhav", location: "Solapur, Maharashtra", text: "I've been buying from Sanap for 8 years now. Their watermelon seedlings produce the sweetest fruits. The delivery is always on time.", rating: 5, crop: "Watermelon" },
];

const galleryImages = [
  { src: "/src/assets/img/Customer-visit.jpeg", category: "Customer Visit", title: "Customer Farm Visit" },
  { src: "/src/assets/img/IMG-20251221-WA0017.jpg.jpeg", category: "Nursery", title: "Our Nursery" },
  { src: "/src/assets/img/IMG-20251221-WA0020.jpg.jpeg", category: "Nursery", title: "Seedling Production" },
  { src: "/src/assets/img/IMG-20251221-WA0021.jpg.jpeg", category: "Nursery", title: "Quality Plants" },
  { src: "/src/assets/img/IMG-20251221-WA0030.jpg.jpeg", category: "Seminar", title: "Farmer Training" },
  { src: "/src/assets/img/IMG-20251221-WA0031.jpg.jpeg", category: "Seminar", title: "Knowledge Sharing" },
  { src: "/src/assets/img/IMG-20251221-WA0033.jpg.jpeg", category: "Nursery", title: "Grafting Process" },
  { src: "/src/assets/img/IMG-20251221-WA0034.jpg.jpeg", category: "Nursery", title: "Plant Care" },
  { src: "/src/assets/img/IMG-20251221-WA0037.jpg.jpeg", category: "Customer Visit", title: "Happy Customers" },
  { src: "/src/assets/img/IMG-20251221-WA0040.jpg.jpeg", category: "Nursery", title: "Growing Facility" },
  { src: "/src/assets/img/IMG-20251221-WA0043.jpg.jpeg", category: "Seminar", title: "Agricultural Workshop" },
  { src: "/src/assets/img/IMG-20251221-WA0046.jpg.jpeg", category: "Nursery", title: "Healthy Seedlings" },
];

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useCountUp(stat.value);
  return (
    <div ref={ref} className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated text-center hover-lift">
      <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-3" />
      <p className="text-3xl md:text-4xl font-display font-bold text-foreground">
        {count.toLocaleString()}{stat.suffix}
      </p>
      <p className="text-sm text-muted-foreground font-sans mt-1">{stat.label}</p>
    </div>
  );
}

export default function Index() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [cropSliderPos, setCropSliderPos] = useState(0);
  const [gallerySlide, setGallerySlide] = useState(0);
  const allCrops = categories.flatMap(c => c.crops);

  useEffect(() => {
    const interval = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden" id="hero">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="video-overlay" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="container-nursery relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-sm"
            >
              <Sprout className="w-4 h-4" /> Trusted by 5000+ Farmers Across India
            </motion.span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block"
              >
                28+ Years of
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="block text-accent"
              >
                Farming Excellence
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl font-sans leading-relaxed"
            >
              Ultra-strong grafted seedlings with world-class technology.
              Premium varieties of Tomato, Chili, Brinjal, Capsicum & more.
              Bulk orders from 15,000+ plants.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="gradient-gold text-accent-foreground px-8 py-4 rounded-full font-bold text-lg hover:shadow-gold transition-all hover:scale-105 flex items-center gap-2 btn-ripple"
              >
                Explore Products <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-primary-foreground/10 backdrop-blur-md border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-foreground/20 transition-all"
              >
                Contact Us
              </Link>
            </motion.div>

            {/* Trust badges inline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex flex-wrap gap-6 mt-12"
            >
              {["🏆 ISO Certified", "🧬 Japanese Grafting Tech", "🚚 Pan-India Delivery", "💰 B2B Pricing"].map((badge) => (
                <span key={badge} className="text-sm text-primary-foreground/60 font-sans">{badge}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-primary-foreground/40 text-xs font-sans uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== STATS WITH ANIMATED COUNTERS ===== */}
      <section className="relative -mt-20 z-20 pb-8" id="stats">
        <div className="container-nursery">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <StatCard stat={stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section className="py-20 surface-warm" id="categories">
        <div className="container-nursery">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-[0.2em] font-sans">Our Categories</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              What We Grow
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Premium grafted seedlings across multiple crop categories, carefully cultivated for Indian farming conditions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/products?category=${cat.id}`}
                  className="block bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all hover:-translate-y-2 group border border-border/50"
                >
                  <span className="text-5xl mb-5 block group-hover:scale-110 transition-transform inline-block">{cat.icon}</span>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {cat.crops.length} crops · {cat.crops.reduce((s, c) => s + c.varieties, 0)} varieties available
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.crops.slice(0, 4).map((crop) => (
                      <span key={crop.id} className="text-xs bg-secondary/50 text-secondary-foreground rounded-full px-3 py-1.5 font-medium">
                        {crop.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Browse Category <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED CROPS SLIDER ===== */}
      <section className="py-20" id="crops-slider">
        <div className="container-nursery">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-[0.2em] font-sans">Popular Crops</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                Our Top Crops
              </h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => setCropSliderPos(Math.max(0, cropSliderPos - 1))}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCropSliderPos(Math.min(allCrops.length - 1, cropSliderPos + 1))}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-6" style={{ transform: `translateX(-${cropSliderPos * 280}px)`, transition: "transform 0.4s ease" }}>
              {allCrops.map((crop, i) => (
                <motion.div
                  key={crop.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="min-w-[250px] md:min-w-[280px]"
                >
                  <Link to={`/products?crop=${crop.id}`} className="block group">
                    <div className="relative rounded-2xl overflow-hidden h-56 mb-4">
                      <img src={crop.image} alt={crop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <h3 className="font-display text-xl font-bold text-primary-foreground">{crop.name}</h3>
                        <p className="text-xs text-primary-foreground/80">{crop.varieties} varieties</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20 surface-green" id="featured-products">
        <div className="container-nursery">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-[0.2em] font-sans">Best Sellers</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Featured Varieties
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Hand-picked premium varieties with proven performance in Indian farming conditions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleVarieties.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <ProductCard variety={v} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 gradient-cta text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-elevated transition-all hover:scale-105 btn-ripple"
            >
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20" id="why-choose-us">
        <div className="container-nursery">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-[0.2em] font-sans">Our Advantages</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Why Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-8 hover-lift group"
              >
                <div className="w-14 h-14 rounded-2xl gradient-cta flex items-center justify-center mb-5 group-hover:shadow-glow transition-all">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== B2B PRICING TIERS ===== */}
      <section className="py-20 gradient-hero text-primary-foreground" id="pricing">
        <div className="container-nursery">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em] font-sans">Transparent Pricing</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
              Bulk Order Pricing
            </h2>
            <p className="text-lg text-primary-foreground/70">
              Our B2B pricing structure ensures the best rates for your farm. Bigger orders = better prices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { tier: "Ex-Factory", qty: "< 15,000 Plants", price: "From ₹3.5/plant", desc: "Standard pricing for smaller orders", highlight: false },
              { tier: "Bulk Order", qty: "15,000+ Plants", price: "From ₹2.5/plant", desc: "Best value for medium-scale farmers", highlight: true },
              { tier: "Mega Order", qty: "30,000+ Plants", price: "From ₹1.8/plant", desc: "Maximum savings for large operations", highlight: false },
            ].map((tier, i) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-8 text-center transition-all ${
                  tier.highlight
                    ? "bg-primary-foreground text-foreground scale-105 shadow-elevated border-4 border-accent"
                    : "bg-primary-foreground/10 border border-primary-foreground/20 hover:bg-primary-foreground/15"
                }`}
              >
                {tier.highlight && (
                  <span className="inline-block gradient-gold text-accent-foreground text-xs font-bold px-4 py-1 rounded-full mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className={`font-display text-2xl font-bold mb-2 ${tier.highlight ? "text-primary" : ""}`}>
                  {tier.tier}
                </h3>
                <p className={`text-sm mb-3 ${tier.highlight ? "text-muted-foreground" : "text-primary-foreground/60"}`}>{tier.qty}</p>
                <p className={`text-3xl font-bold mb-4 ${tier.highlight ? "text-primary" : ""}`}>{tier.price}</p>
                <p className={`text-sm ${tier.highlight ? "text-muted-foreground" : "text-primary-foreground/60"}`}>
                  {tier.desc}
                </p>
                <Link
                  to="/products"
                  className={`inline-block mt-6 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 ${
                    tier.highlight
                      ? "gradient-cta text-primary-foreground hover:shadow-elevated"
                      : "border border-primary-foreground/30 hover:bg-primary-foreground/10"
                  }`}
                >
                  Order Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 surface-warm" id="testimonials">
        <div className="container-nursery">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-[0.2em] font-sans">What Farmers Say</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">
              Testimonials
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated border border-border/50 relative"
            >
              <Quote className="w-12 h-12 text-primary/15 absolute top-6 right-8" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-sans">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-bold text-foreground text-lg">{testimonials[currentTestimonial].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].location} · {testimonials[currentTestimonial].crop} Farmer</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentTestimonial(currentTestimonial > 0 ? currentTestimonial - 1 : testimonials.length - 1)}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentTestimonial((currentTestimonial + 1) % testimonials.length)}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentTestimonial ? "bg-primary w-8" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ANIMATED GALLERY ===== */}
      <section className="py-20 overflow-hidden" id="gallery">
        <div className="container-nursery">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-sm font-semibold text-primary uppercase tracking-[0.2em] font-sans inline-block"
            >
              Our Journey
            </motion.span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Gallery
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Explore our nursery, customer visits, and farmer training seminars</p>
          </motion.div>

          {/* 3D Carousel Effect */}
          <div className="relative h-[500px] md:h-[600px] perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center">
              {galleryImages.map((img, i) => {
                const offset = (i - gallerySlide + galleryImages.length) % galleryImages.length;
                const isActive = offset === 0;
                const isPrev = offset === galleryImages.length - 1;
                const isNext = offset === 1;
                const isVisible = isActive || isPrev || isNext || offset === 2 || offset === galleryImages.length - 2;
                
                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isNext ? '60%' : isPrev ? '-60%' : offset < galleryImages.length / 2 ? '120%' : '-120%',
                      scale: isActive ? 1 : isNext || isPrev ? 0.75 : 0.5,
                      rotateY: isActive ? 0 : isNext ? 25 : isPrev ? -25 : offset < galleryImages.length / 2 ? 45 : -45,
                      opacity: isActive ? 1 : isNext || isPrev ? 0.6 : 0.3,
                      zIndex: isActive ? 30 : isNext || isPrev ? 20 : 10,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute w-[85%] md:w-[600px] h-[400px] md:h-[500px] cursor-pointer"
                    onClick={() => !isActive && setGallerySlide(i)}
                    style={{
                      transformStyle: 'preserve-3d',
                      display: isVisible ? 'block' : 'none'
                    }}
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                      
                      {isActive && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="absolute bottom-0 left-0 right-0 p-8"
                        >
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.4 }}
                            className="inline-block bg-accent text-accent-foreground text-xs font-bold px-4 py-2 rounded-full mb-3 shadow-lg"
                          >
                            {img.category}
                          </motion.span>
                          <h3 className="font-display text-2xl md:text-4xl font-bold text-primary-foreground drop-shadow-lg">
                            {img.title}
                          </h3>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Animated Navigation Buttons */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setGallerySlide(gallerySlide > 0 ? gallerySlide - 1 : galleryImages.length - 1)}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground backdrop-blur-sm flex items-center justify-center hover:shadow-glow transition-all"
            >
              <ChevronLeft className="w-7 h-7" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setGallerySlide((gallerySlide + 1) % galleryImages.length)}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground backdrop-blur-sm flex items-center justify-center hover:shadow-glow transition-all"
            >
              <ChevronRight className="w-7 h-7" />
            </motion.button>
          </div>

          {/* Animated Progress Bar */}
          <div className="max-w-md mx-auto mt-12">
            <div className="flex items-center gap-2">
              {galleryImages.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setGallerySlide(i)}
                  className="relative flex-1 h-1.5 bg-border rounded-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      width: i === gallerySlide ? '100%' : '0%',
                    }}
                    transition={{ duration: i === gallerySlide ? 4 : 0.3 }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </motion.button>
              ))}
            </div>
            <motion.p 
              key={gallerySlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-muted-foreground mt-4"
            >
              {gallerySlide + 1} / {galleryImages.length}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 surface-green" id="cta">
        <div className="container-nursery">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-hero rounded-3xl p-10 md:p-16 text-primary-foreground text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-foreground/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                Ready to Place Your Order?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Contact us for custom quotes, delivery scheduling, and variety recommendations for your region.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/products"
                  className="gradient-gold text-accent-foreground px-8 py-4 rounded-full font-bold text-lg hover:shadow-gold transition-all hover:scale-105 btn-ripple"
                >
                  Browse Catalog
                </Link>
                <a
                  href="https://wa.me/919823044556"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-foreground/20 transition-all"
                >
                  WhatsApp Us
                </a>
                <a
                  href="tel:+919823044556"
                  className="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-foreground/20 transition-all"
                >
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
