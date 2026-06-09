import React, { useRef, useEffect, memo } from "react";
import { motion, useInView } from "framer-motion";
import { FaLeaf, FaShoppingBag, FaStar, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const TOKEN = {
  green: "#1a3a2e",
  greenMid: "#2d5a47",
  gold: "#d4af37",
  goldLight: "#f0d060",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontAccent: "'Cormorant Garamond', Georgia, serif",
  fontBody: "'Plus Jakarta Sans', sans-serif",
  clayShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)",
};

// ── SEO HEAD COMPONENT ────────────────────────────────────────────────────────
const SEOHead = () => {
  useEffect(() => {
    document.title = "TeeNatural | 100% Natural Skincare & Haircare Nigeria — Paraben-Free, Chemical-Free Beauty";
    document.documentElement.lang = "en";

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const addLink = (rel, href, extra = {}) => {
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
      const el = document.createElement("link");
      el.rel = rel;
      el.href = href;
      Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    };

    const addScript = (id, content) => {
      if (document.getElementById(id)) return;
      const el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      el.textContent = content;
      document.head.appendChild(el);
    };

    // Core Meta Tags
    setMeta("name", "description", "TeeNatural — Nigeria's trusted 100% natural skincare and haircare brand. Free from parabens, sulphates and artificial fragrances.");
    setMeta("name", "keywords", "natural skincare Nigeria, natural haircare Nigeria, TeeNatural, chemical-free beauty");
    setMeta("name", "viewport", "width=device-width, initial-scale=1");
    setMeta("name", "theme-color", TOKEN.green);
    setMeta("name", "geo.region", "NG");

    // Open Graph / Facebook
    setMeta("property", "og:title", "TeeNatural | 100% Natural Skincare & Haircare");
    setMeta("property", "og:description", "Keep your skin healthy and youthful with TeeNatural.");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", "https://teenatural.com/");
    setMeta("property", "og:image", "https://teenatural.com/og-image.jpg");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", "TeeNatural | 100% Natural Skincare & Haircare");

    // Links
    addLink("canonical", "https://teenatural.com/");

    // Structured Data Organization
    addScript("ld-org", JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TeeNatural",
      "url": "https://teenatural.com",
      "logo": "https://teenatural.com/logo.png"
    }));
  }, []);

  return null;
};

// ── SHARED ANIMATIONS & LAYOUTS ───────────────────────────────────────────────
const FadeUp = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

const ClayCard = ({ children, className = "" }) => (
  <div 
    className={`bg-white rounded-[24px] sm:rounded-[28px] border border-white/60 ${className}`}
    style={{ boxShadow: TOKEN.clayShadow }}
  >
    {children}
  </div>
);

const Blob = ({ className }) => (
  <motion.div 
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} 
  />
);

const SectionHeading = ({ tag, title, highlight, subtitle, light = false }) => (
  <div className="text-center mb-10 sm:mb-14 px-2">
    {tag && (
      <span className={`inline-block rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 ${light ? "bg-white/15 text-white" : "bg-[#1a3a2e]/8 text-[#1a3a2e]"}`}>
        {tag}
      </span>
    )}
    <h2 
      style={{ fontFamily: TOKEN.fontDisplay }}
      className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 sm:mb-4 ${light ? "text-white" : "text-[#1a3a2e]"}`}
    >
      {title} <span className="text-[#d4af37]">{highlight}</span>
    </h2>
    {subtitle && (
      <p className={`max-w-xl mx-auto leading-relaxed text-sm sm:text-base ${light ? "text-white/65" : "text-[#1a3a2e]/60"}`}>
        {subtitle}
      </p>
    )}
  </div>
);

// ── DATA DATASETS ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    img: "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_480,h_480,c_fill/v1776348580/naturalleaf_oufgbg.jpg",
    alt: "Fresh natural leaf representing 100% natural TeeNatural ingredients",
    title: "100% Natural",
    desc: "Every ingredient is sustainably and ethically sourced from trusted farms. No synthetics, ever.",
  },
  {
    img: "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_480,h_480,c_fill/v1776347749/skincare_bottle_tkeqjp.jpg",
    alt: "TeeNatural skincare bottle representing a gentle hypoallergenic formula",
    title: "Gentle Formula",
    desc: "Dermatologist-tested and hypoallergenic — kind to the most sensitive skin types.",
  },
  {
    img: "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_480,h_480,c_fill/v1776347749/everyone_r1gdem.jpg",
    alt: "TeeNatural products suitable for everyone of all ages and skin types",
    title: "For Everyone",
    desc: "Formulated for all skin types and ages, from teenagers to mature skin.",
  },
];

const INGREDIENTS = [
  {
    img: "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_400,h_480,c_fill/v1776347752/herbs_fnmh4x.jpg",
    alt: "Fresh herbs used as key ingredients in TeeNatural natural skincare products",
    name: "Herbs",
    benefit: "Soothes & hydrates",
  },
  {
    img: "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_400,h_480,c_fill/v1776347747/essential-oil_p98wcn.jpg",
    alt: "Natural essential oils used to nourish and repair skin in TeeNatural products",
    name: "Natural Essential Oil",
    benefit: "Nourishes & repairs",
  },
  {
    img: "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_400,h_480,c_fill/v1776347749/watermelon_dmkvux.jpg",
    alt: "Watermelon oil — a hydrating and soothing ingredient in TeeNatural products",
    name: "Watermelon Oil",
    benefit: "Hydrates & soothes",
  },
  {
    img: "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_400,h_480,c_fill/v1776347749/wildhoney_g7npce.jpg",
    alt: "Wild honey used for its antibacterial and moisturizing properties in TeeNatural",
    name: "Wild Honey",
    benefit: "Antibacterial & moisturizing",
  },
];

const TESTIMONIALS = [
  {
    name: "Nusaybah",
    product: "Haircare Kit",
    text: "Assalamualaikum. I've seen much changes using your hair products. My hair feels incredibly soft and healthy!",
  },
  {
    name: "Samia Owolewa",
    product: "Skincare Essentials",
    text: "People kept complimenting my skin! My hyperpigmentation is clearing up completely in less than two weeks.",
  },
];

const STATS = [
  { value: "5K+", label: "Happy Customers" },
  { value: "100%", label: "Natural Ingredients" },
  { value: "0%", label: "Harsh Chemicals" },
  { value: "4.9★", label: "Average Rating" },
];

// ── MAIN LANDING COMPONENT ────────────────────────────────────────────────────
const TeeNaturalLanding = () => {
  return (
    <>
    
      <SEOHead />
      <div className="relative overflow-x-hidden max-w-full" id="home">
        <main className="min-h-screen bg-stone-50" style={{ fontFamily: TOKEN.fontBody }}>

          {/* ══ HERO SECTION ═══════════════════════════════════════════════════ */}
          <section
            className="relative min-h-svh flex items-center justify-center overflow-hidden bg-stone-900"
            aria-label="Hero — 100% Natural Skincare for Everyone"
          >
            {/* 
              PERFORMANCE TIP: Add this link tag to your index.html <head> for fast LCP speeds:
              <link rel="preload" as="image" href="/hero-bg.jpg" fetchpriority="high">
            */}
           <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/tee.png"
              alt=""
              className="w-full h-full object-cover scale-105"
              loading="eager"
              fetchPriority="high"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-green-950/55" />
          </div>
            
            {/* Dark tint layer ensuring text pop */}
            <div className="absolute inset-0 bg-black/45 z-10" />

            {/* Content Core Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 text-center pt-24 pb-12 flex flex-col items-center justify-center min-h-[90vh]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white/90 mb-6">
                  <FaLeaf className="text-[#d4af37] shrink-0 text-xs sm:text-sm" />
                  <span style={{ fontFamily: TOKEN.fontAccent }} className="text-sm tracking-wide">
                    Natural Touch Beauty Unveiled
                  </span>
                </div>

                <h1
                  style={{ fontFamily: TOKEN.fontDisplay }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white font-bold mb-6 tracking-tight"
                >
                  Natural Skincare <br />
                  <span className="text-[#d4af37] italic font-serif">for Everyone</span>
                </h1>

                <p className="text-white/80 text-base sm:text-lg md:text-xl mb-8 max-w-xl leading-relaxed font-light">
                  Keep your skin healthy and young looking with our 100% natural, gently crafted products — free from harsh chemicals.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
                  <Link to="/products" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(212,175,55,0.4)" }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-[#d4af37] text-[#1a3a2e] px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 text-base transition-shadow"
                    >
                      <FaShoppingBag /> Shop Now
                    </motion.button>
                  </Link>
                  <Link to="/about" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full border-2 border-white/60 text-white px-8 py-4 rounded-full font-semibold backdrop-blur-sm transition-colors text-base"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ══ STATS SECTION ══════════════════════════════════════════════════ */}
          <section className="bg-[#1a3a2e] py-12 sm:py-16 px-4 sm:px-6 relative z-20" aria-label="Brand Statistics">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {STATS.map((s, i) => (
                <FadeUp key={i} delay={i * 0.1} className="text-center">
                  <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4af37]">
                    {s.value}
                  </div>
                  <div className="text-white/60 text-xs sm:text-sm mt-2 tracking-wide uppercase font-medium">{s.label}</div>
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ══ FEATURES SECTION ═══════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 px-4 sm:px-6 bg-stone-50" aria-label="Product features benefits">
            <div className="max-w-7xl mx-auto">
              <FadeUp>
                <SectionHeading
                  tag="Why TeeNatural?"
                  title="Elevate Your"
                  highlight="Skincare Experience"
                  subtitle="Let your skin naturally renew itself — apply daily for a clear, youthful face."
                />
              </FadeUp>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {FEATURES.map((f, i) => (
                  <FadeUp key={i} delay={i * 0.12}>
                    <ClayCard className="h-full overflow-hidden flex flex-col group">
                      <div className="w-full h-52 sm:h-60 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.4 }}
                          src={f.img}
                          alt={f.alt}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 sm:p-8 flex-grow flex flex-col">
                        <h3 style={{ fontFamily: TOKEN.fontDisplay }} className="text-xl sm:text-2xl font-bold text-[#1a3a2e] mb-3">
                          {f.title}
                        </h3>
                        <p className="text-[#1a3a2e]/70 leading-relaxed text-sm sm:text-base">{f.desc}</p>
                      </div>
                    </ClayCard>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>

          {/* ══ INGREDIENTS SECTION ════════════════════════════════════════════ */}
          <section
            className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] relative overflow-hidden"
            aria-label="Natural active ingredients"
          >
            <Blob className="w-72 md:w-[450px] h-72 md:h-[450px] bg-[#d4af37]/10 -top-24 -right-24" />
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
              <FadeUp>
                <span className="inline-block bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4">
                  Our Ingredients
                </span>
                <h2 style={{ fontFamily: TOKEN.fontDisplay }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
                  Rooted in Nature, <br />
                  <span className="text-[#d4af37]">Backed by Results</span>
                </h2>
                <p className="text-white/80 mb-4 leading-relaxed text-base sm:text-lg">
                  Every TeeNatural product is formulated with the finest natural botanicals, chosen for their proven skin and hair benefits.
                </p>
                <p className="text-white/60 mb-8 leading-relaxed text-sm sm:text-base">
                  No parabens. No sulphates. No artificial fragrances. Just pure, effective ingredients your skin will love.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {INGREDIENTS.map((ing, i) => (
                    <span key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm px-4 py-2 rounded-full">
                      {ing.name}
                    </span>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  {INGREDIENTS.map((ing, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -6 }}
                      className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl"
                    >
                      <div className="w-full h-36 sm:h-44 overflow-hidden">
                        <img src={ing.img} alt={ing.alt} loading="lazy" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 text-center">
                        <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-white font-bold text-sm sm:text-base">
                          {ing.name}
                        </div>
                        <div className="text-white/60 text-[11px] sm:text-xs mt-1">{ing.benefit}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </section>

          {/* ══ TESTIMONIALS / REVIEWS SECTION ══════════════════════════════════ */}
          <section className="py-20 sm:py-28 px-4 sm:px-6 bg-stone-100" aria-label="Customer Testimonials">
            <div className="max-w-6xl mx-auto">
              <FadeUp>
                <SectionHeading tag="Reviews" title="Real Feedback From" highlight="Real Queens" subtitle="Join over 5,000+ customers glowing across Nigeria." />
              </FadeUp>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {TESTIMONIALS.map((t, i) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <ClayCard className="p-6 sm:p-8 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, idx) => (
                            <FaStar key={idx} className="text-[#d4af37] text-sm" />
                          ))}
                        </div>
                        <p className="text-[#1a3a2e]/80 italic leading-relaxed text-sm sm:text-base mb-6">"{t.text}"</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-stone-200/60 pt-4 mt-auto">
                        <div>
                          <div className="font-bold text-[#1a3a2e] text-sm sm:text-base">{t.name}</div>
                          <div className="text-[#1a3a2e]/50 text-xs">{t.product}</div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                          <FaCheckCircle className="text-xs" /> Verified Purchase
                        </div>
                      </div>
                    </ClayCard>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );
};

export default memo(TeeNaturalLanding);