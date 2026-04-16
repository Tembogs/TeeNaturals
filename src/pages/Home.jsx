import React, { useRef, useEffect, memo } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FaLeaf, FaHeart, FaStar, FaShoppingBag, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const TOKEN = {
  green: "#1a3a2e", greenMid: "#2d5a47", gold: "#d4af37", goldLight: "#f0d060",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontAccent: "'Cormorant Garamond', Georgia, serif",
  fontBody: "'Plus Jakarta Sans', sans-serif",
  clayShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)",
};

// ── SEO HEAD ──────────────────────────────────────────────────────────────────
// PERFORMANCE: Font preconnect + display=swap moved to HTML <head> for faster LCP.
// Add these to your public/index.html <head>:
//   <link rel="preconnect" href="https://fonts.googleapis.com">
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Cormorant+Garamond:wght@500&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap">
//   <link rel="preload" as="image" href="/hero.jpg" fetchpriority="high">

const SEOHead = () => {
  const initialised = useRef(false);
  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    document.title = "TeeNatural | 100% Natural Skincare & Haircare Nigeria — Paraben-Free, Chemical-Free Beauty";
    document.documentElement.lang = "en";

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const addLink = (rel, href, extra = {}) => {
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
      const el = document.createElement("link");
      el.rel = rel; el.href = href;
      Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    };
    const addScript = (id, content) => {
      if (document.getElementById(id)) return;
      const el = document.createElement("script");
      el.id = id; el.type = "application/ld+json"; el.textContent = content;
      document.head.appendChild(el);
    };

    // ── Core meta ──────────────────────────────────────────────────────────
    setMeta("name", "description",
      "TeeNatural — Nigeria's trusted 100% natural skincare and haircare brand. Free from parabens, sulphates and artificial fragrances. Dermatologist-tested, hypoallergenic, loved by 5,000+ customers.");
    setMeta("name", "keywords",
      "natural skincare Nigeria, natural haircare Nigeria, TeeNatural, paraben-free skincare, sulphate-free shampoo, aloe vera skincare, shea butter haircare, chemical-free beauty, Lagos skincare, Muslim skincare Nigeria");
    setMeta("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMeta("name", "theme-color", TOKEN.green);
    setMeta("name", "viewport", "width=device-width, initial-scale=1");
    setMeta("name", "author", "TeeNatural");
    setMeta("name", "rating", "General");
    setMeta("name", "revisit-after", "7 days");
    setMeta("name", "geo.region", "NG");
    setMeta("name", "geo.placename", "Nigeria");

    // ── Open Graph ─────────────────────────────────────────────────────────
    setMeta("property", "og:title", "TeeNatural | 100% Natural Skincare & Haircare — Pure Beauty From Nature");
    setMeta("property", "og:description",
      "Keep your skin healthy and youthful with TeeNatural — free from parabens, sulphates, and artificial fragrances. Rated 4.9★ by 5,000+ happy customers across Nigeria.");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", "https://teenatural.com/");
    setMeta("property", "og:image", "https://teenatural.com/og-image.jpg");
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", "TeeNatural natural skincare and haircare products arranged on a wooden surface");
    setMeta("property", "og:site_name", "TeeNatural");
    setMeta("property", "og:locale", "en_NG");

    // ── Twitter / X ────────────────────────────────────────────────────────
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", "@teenatural");
    setMeta("name", "twitter:creator", "@teenatural");
    setMeta("name", "twitter:title", "TeeNatural | 100% Natural Skincare & Haircare");
    setMeta("name", "twitter:description", "Free from harsh chemicals. Loved by 5,000+ customers in Nigeria. Shop natural skincare & haircare today.");
    setMeta("name", "twitter:image", "https://teenatural.com/og-image.jpg");
    setMeta("name", "twitter:image:alt", "TeeNatural natural skincare product range");

    // ── Links ──────────────────────────────────────────────────────────────
    addLink("canonical", "https://teenatural.com/");
    addLink("alternate", "https://teenatural.com/", { hreflang: "en-ng" });
    addLink("alternate", "https://teenatural.com/", { hreflang: "x-default" });

    // ── Structured Data ────────────────────────────────────────────────────
    addScript("ld-org", JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TeeNatural",
      "url": "https://teenatural.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://teenatural.com/logo.png",
        "width": 200,
        "height": 60
      },
      "image": "https://teenatural.com/og-image.jpg",
      "description": "100% natural skincare and haircare products free from parabens, sulphates, and harsh chemicals. Dermatologist-tested and loved by thousands across Nigeria.",
      "foundingDate": "2020",
      "areaServed": {
        "@type": "Country",
        "name": "Nigeria"
      },
      "sameAs": [
        "https://instagram.com/teenatural",
        "https://facebook.com/teenatural",
        "https://twitter.com/teenatural"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "areaServed": "NG",
        "availableLanguage": "English"
      }
    }));

    addScript("ld-store", JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "TeeNatural",
      "url": "https://teenatural.com",
      "description": "Natural skincare and haircare products for all skin types.",
      "priceRange": "₦₦",
      "currenciesAccepted": "NGN",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "areaServed": "NG"
    }));

    addScript("ld-product-collection", JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "TeeNatural Product Collections",
      "description": "100% natural skincare and haircare collections by TeeNatural.",
      "numberOfItems": 2,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "TeeNatural Skincare Collection",
          "description": "Natural cleansers, serums and moisturisers free from parabens and sulphates.",
          "url": "https://teenatural.com/products?category=skincare"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "TeeNatural Haircare Collection",
          "description": "Natural shampoos, conditioners and hair oils for healthy hair growth.",
          "url": "https://teenatural.com/products?category=haircare"
        }
      ]
    }));

    addScript("ld-faq", JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are TeeNatural products 100% natural?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every TeeNatural product is formulated with 100% natural botanicals — no parabens, sulphates, or artificial fragrances."
          }
        },
        {
          "@type": "Question",
          "name": "Is TeeNatural suitable for sensitive skin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All TeeNatural products are dermatologist-tested and hypoallergenic, making them safe for sensitive skin types."
          }
        },
        {
          "@type": "Question",
          "name": "Where can I buy TeeNatural products in Nigeria?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can shop TeeNatural products directly on our website at teenatural.com with delivery across Nigeria."
          }
        }
      ]
    }));

    addScript("ld-breadcrumb", JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://teenatural.com/"
        }
      ]
    }));

    addScript("ld-aggregate-rating", JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "TeeNatural Natural Skincare & Haircare",
      "description": "100% natural skincare and haircare products free from parabens and sulphates.",
      "brand": {
        "@type": "Brand",
        "name": "TeeNatural"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "NGN",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "TeeNatural"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "5000",
        "bestRating": "5",
        "worstRating": "1"
      }
    }));

  }, []);
  return null;
};

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────

const FadeUp = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
};

const ClayCard = ({ children, className = "" }) => (
  <div className={`bg-white rounded-[24px] sm:rounded-[28px] border border-white/60 ${className}`}
    style={{ boxShadow: TOKEN.clayShadow }}>{children}</div>
);

const Blob = ({ className }) => (
  <motion.div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
);

const SectionHeading = ({ tag, title, highlight, subtitle, light = false }) => (
  <div className="text-center mb-10 sm:mb-14 px-2">
    {tag && (
      <span className={`inline-block rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 ${light ? "bg-white/15 text-white" : "bg-[#1a3a2e]/8 text-[#1a3a2e]"}`}>
        {tag}
      </span>
    )}
    <h2 style={{ fontFamily: TOKEN.fontDisplay }}
      className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 sm:mb-4 ${light ? "text-white" : "text-[#1a3a2e]"}`}>
      {title} <span className="text-[#d4af37]">{highlight}</span>
    </h2>
    {subtitle && (
      <p className={`max-w-xl mx-auto leading-relaxed text-sm sm:text-base ${light ? "text-white/65" : "text-[#1a3a2e]/60"}`}>
        {subtitle}
      </p>
    )}
  </div>
);

// ── DATA ─────────────────────────────────────────────────────────────────────

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

const STEPS = [
  { n: "01", title: "Cleanse",    desc: "Remove impurities gently without stripping your skin's natural oils." },
  { n: "02", title: "Treat",      desc: "Apply our targeted serums loaded with active botanicals." },
  { n: "03", title: "Moisturise", desc: "Seal in hydration and nutrients with our rich, fast-absorbing formula." },
];

const TESTIMONIALS = [
  {
    name: "Nusaybah",
    product: "Haircare Kit",
    date: "March 2024",
    verified: true,
    text: "Assalamualaikum warahmatullahi wabarakatuh. i don come to thank you regarding the hair products u sold to me, Alhamdulillah ive seen much changes.. e be like say na your products go dey collect my salary now, im coming back for the protein treatment and arabian oil insha ALLah.",
  },
  {
    name: "Al Ahaq Concepts",
    product: "Herbal Shampoo",
    date: "February 2024",
    verified: true,
    text: "The shampoo don almost finish, My friends don finish am for me, The fact that its soapy and it smells so nice.",
  },
  {
    name: "Samia Owolewa",
    product: "Skincare Essentials",
    date: "January 2024",
    verified: true,
    text: "Ewoo compliment ana yen po🤧 People kept complimenting my skin especially my course mates that know how my face was when I left school. Tee naturals and essentials took a huge part in making my nikkah a beautiful one and I am grateful.",
  },
  {
    name: "Samia Owolewa",
    product: "Skincare Essentials",
    date: "January 2024",
    verified: true,
    text: "Asalamualaikum warahmatullahi ma I am happy to be one of tee queens ooo💃💃 In less than two weeks there is already significant changes on my skin, my hyperpigmentation is clearing and my pores are reducing too.",
  },
];

const STATS = [
  { value: "5K+",  label: "Happy Customers" },
  { value: "100%", label: "Natural Ingredients" },
  { value: "0%",   label: "Harsh Chemicals" },
  { value: "4.9★", label: "Average Rating" },
];

const AVATAR_IMGS = [
  "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_88,h_88,c_fill,g_face/v1776347748/avatar_asw80b.jpg",
  "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_88,h_88,c_fill,g_face/v1776347749/avatar2_gjfjpi.jpg",
  "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_88,h_88,c_fill,g_face/v1776347748/avatar3_fxbw7n.jpg",
];

// ── PAGE ──────────────────────────────────────────────────────────────────────

const TeeNaturalLanding = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.22], [0, -30]);

  return (
    <>
      <SEOHead />
      <div style={{ overflowX: "hidden", maxWidth: "100vw", position: "relative" }}>
        <main className="min-h-screen bg-stone-50" style={{ fontFamily: TOKEN.fontBody }}>

          {/* ══ HERO ═══════════════════════════════════════════════════════ */}
          <section
            className="relative min-h-[100svh] bg-gradient-to-br from-[#1a3a2e] via-[#2d5a47] to-[#1a3a2e] overflow-hidden"
            aria-label="Hero — 100% Natural Skincare for Everyone">

            <Blob className="w-56 sm:w-80 md:w-[450px] h-56 sm:h-80 md:h-[450px] bg-[#d4af37]/12 -top-16 -right-16"/>
            <Blob className="w-44 sm:w-64 md:w-[350px] h-44 sm:h-64 md:h-[350px] bg-white/5 -bottom-12 -left-12"/>
            <div className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-12 sm:pt-28 md:py-0">
              <div className="flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-center md:min-h-[90vh]">

                {/* ── Hero image — bigger on all breakpoints ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-center justify-center md:order-last w-full mb-4 sm:mb-6 md:mb-0">

                  <div className="absolute w-[70%] sm:w-[75%] aspect-square rounded-full bg-[#d4af37]/10 blur-2xl"/>

                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 mx-auto"
                    style={{ width: "clamp(240px, 70vw, 420px)" }}>
                    {/*
                      PERFORMANCE NOTE: Add this to your public/index.html <head> for fastest LCP:
                      <link rel="preload" as="image" href="/hero.jpg" fetchpriority="high">
                    */}
                    <img
                      src="/hero.jpg"
                      alt="Person with glowing healthy skin applying TeeNatural 100% natural skincare product"
                      width={420}
                      height={500}
                      loading="eager"
                      fetchpriority="high"
                      decoding="sync"
                      className="w-full h-auto object-cover rounded-3xl"
                      style={{ aspectRatio: "420/500" }}
                    />
                  </motion.div>

                  {/* Floating badge — Key Ingredient */}
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
                    className="hidden sm:block absolute left-2 bottom-8 sm:bottom-12 z-20">
                    <div className="bg-white/93 backdrop-blur-xl rounded-2xl px-3 py-2.5 border border-white/80"
                      style={{ boxShadow: TOKEN.clayShadow, minWidth: 148 }}>
                      <div className="text-[10px] text-[#1a3a2e]/50 font-medium mb-1">Key Ingredient</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#d4af37]">🌿</span>
                        <span className="text-xs font-bold text-[#1a3a2e]">Natural Essential Oils</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating badge — Rating */}
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
                    className="hidden sm:block absolute right-2 top-6 sm:top-10 z-20">
                    <div className="bg-white/93 backdrop-blur-xl rounded-2xl px-3 py-2.5 border border-white/80"
                      style={{ boxShadow: TOKEN.clayShadow }}>
                      <div className="text-[10px] text-[#1a3a2e]/50 font-medium mb-1">Customer Rating</div>
                      <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => <FaStar key={i} className="text-[#d4af37] text-xs"/>)}</div>
                      <div className="text-[10px] text-[#1a3a2e]/55">4.9 · 5,000+ reviews</div>
                    </div>
                  </motion.div>

                  {/* Spinning badge */}
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1 right-2 z-20 bg-[#d4af37] rounded-full flex items-center justify-center shadow-xl"
                    style={{ width: "clamp(52px, 13vw, 84px)", height: "clamp(52px, 13vw, 84px)" }}>
                    <div className="text-center text-[#1a3a2e]">
                      <div style={{ fontFamily: TOKEN.fontAccent }} className="text-[7px] font-bold uppercase tracking-wide">100%</div>
                      <FaLeaf className="text-xs sm:text-sm mx-auto my-0.5"/>
                      <div style={{ fontFamily: TOKEN.fontAccent }} className="text-[7px] font-bold uppercase tracking-wide">Natural</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Hero text */}
                <motion.div style={{ opacity: heroOpacity, y: heroY }} className="text-center md:text-left">
                  <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .5 }}
                    className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-white/90 mb-4 sm:mb-6">
                    <FaLeaf className="text-[#d4af37] flex-shrink-0 text-xs sm:text-sm"/>
                    <span style={{ fontFamily: TOKEN.fontAccent }} className="text-sm sm:text-base tracking-wide">Natural Touch Beauty Unveiled</span>
                  </motion.div>

                  <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .6 }}
                    style={{ fontFamily: TOKEN.fontDisplay }}
                    className="text-[2.5rem] sm:text-5xl md:text-[4.5rem] lg:text-[5rem] leading-[1.08] text-white font-bold mb-4 sm:mb-5">
                    Natural Skincare<br/>
                    <span className="text-[#d4af37] relative inline-block">
                      for Everyone
                      <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: .5 }}
                        className="absolute -bottom-1 left-0 right-0 h-0.5 sm:h-1 bg-[#d4af37]/40 rounded-full origin-left block"/>
                    </span>
                  </motion.h1>

                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}
                    className="text-white/75 text-base sm:text-lg md:text-xl mb-6 sm:mb-9 max-w-sm sm:max-w-md leading-relaxed mx-auto md:mx-0">
                    Keep your skin healthy and young looking with our 100% natural,
                    gently crafted products — free from harsh chemicals.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }}
                    className="flex flex-col sm:flex-row gap-3 mb-7 sm:mb-11">
                    <Link to="/products" className="w-full sm:w-auto">
                      <motion.button
                        whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(212,175,55,0.55)" }}
                        whileTap={{ scale: .96 }}
                        className="w-full sm:w-auto bg-[#d4af37] text-[#1a3a2e] px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg text-base sm:text-lg"
                        aria-label="Shop TeeNatural 100% natural skincare and haircare products">
                        <FaShoppingBag/> Shop Now
                      </motion.button>
                    </Link>
                    <Link to="/about" className="w-full sm:w-auto">
                      <motion.button
                        whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.14)" }}
                        className="w-full sm:w-auto border-2 border-white/55 text-white px-8 py-4 rounded-full font-semibold backdrop-blur-sm transition-colors text-base sm:text-lg"
                        aria-label="Learn about TeeNatural's story and natural ingredients">
                        Learn More
                      </motion.button>
                    </Link>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85 }}
                    className="flex gap-8 sm:gap-12 justify-center md:justify-start">
                    {[{ n: "5K+", l: "Customers" }, { n: "100%", l: "Natural" }, { n: "4.9★", l: "Rating" }].map((s, i) => (
                      <div key={i}>
                        <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-xl sm:text-2xl md:text-3xl font-bold text-[#d4af37]">{s.n}</div>
                        <div className="text-[11px] sm:text-sm text-white/55 mt-0.5">{s.l}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

              </div>
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              style={{ fontFamily: TOKEN.fontAccent }}
              className="hidden md:block absolute bottom-8 right-8 text-white/40 text-sm italic text-right leading-relaxed">
              Natural Growth<br/>Always be gentle<br/>with your Skin
            </motion.p>
          </section>


          {/* ══ STATS ═══════════════════════════════════════════════════════ */}
          <section className="bg-[#1a3a2e] py-10 sm:py-14 px-4 sm:px-6" aria-label="TeeNatural brand statistics">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {STATS.map((s, i) => (
                <FadeUp key={i} delay={i * .1} className="text-center py-2">
                  <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4af37]">{s.value}</div>
                  <div className="text-white/55 text-xs sm:text-sm mt-1.5">{s.label}</div>
                </FadeUp>
              ))}
            </div>
          </section>


          {/* ══ FEATURES ════════════════════════════════════════════════════ */}
          <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-stone-50" aria-label="Why choose TeeNatural natural skincare">
            <div className="max-w-7xl mx-auto">
              <FadeUp>
                <SectionHeading
                  tag="Why TeeNatural?"
                  title="Elevate Your"
                  highlight="Skincare Experience"
                  subtitle="Let your skin naturally renew itself — apply daily for a clear, youthful face."/>
              </FadeUp>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                {FEATURES.map((f, i) => (
                  <FadeUp key={i} delay={i * .12}>
                    <ClayCard className="p-0 h-full group cursor-default overflow-hidden">
                      {/* Bigger feature image — full-width banner style */}
                      <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          src={f.img}
                          alt={f.alt}
                          width={480}
                          height={256}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 sm:p-6 md:p-8">
                        <h3 style={{ fontFamily: TOKEN.fontDisplay }} className="text-xl sm:text-2xl md:text-2xl font-bold text-[#1a3a2e] mb-2 sm:mb-3">{f.title}</h3>
                        <p className="text-[#1a3a2e]/60 leading-relaxed text-sm md:text-base">{f.desc}</p>
                      </div>
                    </ClayCard>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>


          {/* ══ INGREDIENTS ═════════════════════════════════════════════════ */}
          <section
            className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] overflow-hidden"
            aria-label="TeeNatural natural ingredients — herbs, essential oils, watermelon oil, wild honey">
            <Blob className="w-56 sm:w-80 md:w-[420px] h-56 sm:h-80 md:h-[420px] bg-[#d4af37]/10 -top-20 -right-20"/>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center relative z-10">
              <FadeUp>
                <span className="inline-block bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                  Our Ingredients
                </span>
                <h2 style={{ fontFamily: TOKEN.fontDisplay }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4 sm:mb-6">
                  Rooted in Nature,<br/><span className="text-[#d4af37]">Backed by Results</span>
                </h2>
                <p className="text-white/70 mb-3 sm:mb-5 leading-relaxed text-base sm:text-lg">
                  Every TeeNatural product is formulated with the finest natural botanicals, chosen for their proven skin and hair benefits.
                </p>
                <p className="text-white/50 mb-6 sm:mb-10 leading-relaxed text-sm sm:text-base">
                  No parabens. No sulphates. No artificial fragrances. Just pure, effective ingredients your skin will love.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {INGREDIENTS.map((ing, i) => (
                    <motion.span key={i}
                      initial={{ opacity: 0, scale: .82 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: i * .08 }}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                      {ing.name}
                    </motion.span>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.18}>
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  {INGREDIENTS.map((ing, i) => (
                    <motion.div key={i} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280 }}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15"
                      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
                      {/* Bigger ingredient image — no fixed small box */}
                      <div className="w-full h-36 sm:h-44 md:h-52 overflow-hidden">
                        <img
                          src={ing.img}
                          alt={ing.alt}
                          width={400}
                          height={208}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 sm:p-4 text-center">
                        <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-white font-bold text-sm sm:text-base">{ing.name}</div>
                        <div className="text-white/55 text-[11px] sm:text-xs mt-1">{ing.benefit}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </section>


          {/* ══ COLLECTIONS ══════════════════════════════════════════════════ */}
          <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-stone-100" aria-label="TeeNatural skincare and haircare product collections">
            <div className="max-w-7xl mx-auto">
              <FadeUp>
                <SectionHeading title="Our" highlight="Collections" subtitle="Crafted for every part of your natural beauty routine."/>
              </FadeUp>
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                {[
                  {
                    label: "Skincare",
                    sub: "Cleansers · Serums · Moisturisers",
                    desc: "Natural formulas that cleanse, treat and lock in moisture for radiant, youthful skin.",
                    img: "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_960,h_560,c_fill/v1765996138/Lightning_body_kit_mgooqa.jpg",
                    alt: "TeeNatural skincare collection featuring natural cleansers, serums and moisturisers arranged on a marble surface",
                    href: "/products?category=skincare",
                  },
                  {
                    label: "Haircare",
                    sub: "Shampoos · Conditioners · Hair Oils",
                    desc: "Nourish every strand from root to tip with botanicals that strengthen and grow.",
                    img: "https://res.cloudinary.com/decgjhtlb/image/upload/q_auto,f_auto,w_960,h_560,c_fill/v1776351003/haircare_lr8mor.png",
                    alt: "TeeNatural haircare collection featuring natural shampoos, conditioners and hair oils for healthy hair growth",
                    href: "/products?category=haircare",
                  },
                ].map(({ label, sub, desc, img, alt, href }, i) => (
                  <FadeUp key={i} delay={i * .12}>
                    <ClayCard className="overflow-hidden group h-full flex flex-col">
                      {/* Collection images — taller for more impact */}
                      <div className="h-52 sm:h-64 md:h-80 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.55, ease: "easeOut" }}
                          src={img}
                          alt={alt}
                          width={960}
                          height={320}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1">
                        <h3 style={{ fontFamily: TOKEN.fontDisplay }} className="text-2xl sm:text-3xl font-bold text-[#1a3a2e] mb-1">{label}</h3>
                        <p className="text-[#1a3a2e]/45 text-xs sm:text-sm mb-2">{sub}</p>
                        <p className="text-[#1a3a2e]/60 text-sm sm:text-base leading-relaxed mb-4 flex-1">{desc}</p>
                        <Link to={href} className="self-start">
                          <motion.button whileHover={{ x: 4 }}
                            className="flex items-center gap-2 text-[#1a3a2e] font-bold text-sm sm:text-base hover:text-[#d4af37] transition-colors"
                            aria-label={`Explore TeeNatural ${label} collection`}>
                            Explore Collection <FaArrowRight className="text-xs"/>
                          </motion.button>
                        </Link>
                      </div>
                    </ClayCard>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>


          {/* ══ HOW IT WORKS ════════════════════════════════════════════════ */}
          <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-stone-50" aria-label="How to use TeeNatural — simple 3-step daily skincare routine">
            <div className="max-w-5xl mx-auto">
              <FadeUp>
                <SectionHeading
                  tag="Simple Routine"
                  title="Your Daily"
                  highlight="Routine"
                  subtitle="Three easy steps to glowing, healthy skin every single day."/>
              </FadeUp>
              <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 relative">
                <div className="hidden sm:block absolute top-9 md:top-11 left-[18%] right-[18%] h-px border-t-2 border-dashed border-[#d4af37]/40 z-0"/>
                {STEPS.map((step, i) => (
                  <FadeUp key={i} delay={i * .15}>
                    <ClayCard className="p-6 sm:p-7 md:p-10 text-center group relative z-10">
                      <motion.div whileHover={{ scale: 1.1, rotate: -6 }} transition={{ type: "spring", stiffness: 280 }}
                        className="bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6"
                        style={{ width: "clamp(60px, 14vw, 88px)", height: "clamp(60px, 14vw, 88px)", boxShadow: "0 8px 24px rgba(26,58,46,0.3)" }}>
                        <span style={{ fontFamily: TOKEN.fontDisplay }} className="text-[#d4af37] text-xl sm:text-2xl font-bold">{step.n}</span>
                      </motion.div>
                      <h3 style={{ fontFamily: TOKEN.fontDisplay }} className="text-xl sm:text-2xl font-bold text-[#1a3a2e] mb-2 sm:mb-3">{step.title}</h3>
                      <p className="text-[#1a3a2e]/60 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                    </ClayCard>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>


          {/* ══ TESTIMONIALS ════════════════════════════════════════════════ */}
          <section
            className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-stone-100"
            aria-label="TeeNatural customer reviews and testimonials"
            itemScope itemType="https://schema.org/ItemList">
            <div className="max-w-7xl mx-auto">
              <FadeUp>
                <SectionHeading tag="Real Reviews" title="What Customers" highlight="Are Saying"/>
              </FadeUp>
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                {TESTIMONIALS.map((t, i) => (
                  <FadeUp key={i} delay={i * .09}>
                    <ClayCard className="p-5 sm:p-7 md:p-9 h-full flex flex-col"
                      itemScope itemType="https://schema.org/Review">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-0.5" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                          <meta itemProp="ratingValue" content="5"/>
                          <meta itemProp="bestRating" content="5"/>
                          {[...Array(5)].map((_, j) => <FaStar key={j} className="text-[#d4af37] text-sm sm:text-base"/>)}
                        </div>
                        <time className="text-[#1a3a2e]/40 text-xs sm:text-sm" itemProp="datePublished">{t.date}</time>
                      </div>
                      <p className="text-[#1a3a2e]/70 leading-relaxed mb-4 sm:mb-5 italic flex-1 text-sm sm:text-base md:text-lg" itemProp="reviewBody">
                        "{t.text}"
                      </p>
                      <div className="mb-3 sm:mb-4">
                        <span className="inline-block bg-[#1a3a2e]/8 text-[#1a3a2e] text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full" itemProp="name">
                          {t.product}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-[#1a3a2e]/8"
                        itemScope itemType="https://schema.org/Person" itemProp="author">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full overflow-hidden bg-[#2d5a47]/20">
                          <img
                            src={AVATAR_IMGS[i % AVATAR_IMGS.length]}
                            alt={`${t.name} — verified TeeNatural customer review`}
                            width={56}
                            height={56}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#1a3a2e] text-sm sm:text-base" itemProp="name">{t.name}</div>
                          {t.verified && (
                            <div className="text-[#1a3a2e]/45 text-xs sm:text-sm flex items-center gap-1 mt-0.5">
                              <FaCheckCircle className="text-[#4a9a6b] text-[11px]"/> Verified Buyer
                            </div>
                          )}
                        </div>
                      </div>
                    </ClayCard>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>


          {/* ══ CTA ══════════════════════════════════════════════════════════ */}
          <section
            className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] relative overflow-hidden"
            aria-label="Shop TeeNatural — start your natural skincare journey">
            <Blob className="w-56 sm:w-80 md:w-[500px] h-56 sm:h-80 md:h-[500px] bg-[#d4af37]/10 -top-24 -right-24"/>
            <Blob className="w-44 sm:w-64 md:w-[380px] h-44 sm:h-64 md:h-[380px] bg-white/5 -bottom-14 -left-14"/>
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <FadeUp>
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8"
                  style={{ width: "clamp(60px, 14vw, 88px)", height: "clamp(60px, 14vw, 88px)", boxShadow: "0 0 50px rgba(212,175,55,0.5)" }}>
                  <FaStar className="text-2xl sm:text-3xl text-[#1a3a2e]" aria-hidden="true"/>
                </motion.div>
                <h2 style={{ fontFamily: TOKEN.fontDisplay }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4 sm:mb-6">
                  Ready to Transform<br/>Your Skin?
                </h2>
                <p className="text-white/70 mb-8 sm:mb-10 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                  Join thousands who trust natural beauty solutions. Your skin deserves the best that nature has to offer.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/products" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(212,175,55,0.65)" }}
                      whileTap={{ scale: .96 }}
                      className="w-full sm:w-auto bg-[#d4af37] text-[#1a3a2e] px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-base sm:text-xl flex items-center gap-2 justify-center shadow-xl"
                      aria-label="Start shopping TeeNatural 100% natural skincare and haircare products">
                      <FaShoppingBag/> Start Your Journey
                    </motion.button>
                  </Link>
                  <Link to="/about" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.12)" }}
                      className="w-full sm:w-auto border-2 border-white/50 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-xl backdrop-blur-sm transition-colors"
                      aria-label="Read about TeeNatural's story and natural ingredients">
                      Read Our Story
                    </motion.button>
                  </Link>
                </div>
              </FadeUp>
            </div>
          </section>

        </main>
      </div>
    </>
  );
};

export default TeeNaturalLanding;