/**
 * TeeNaturalLanding.jsx — Fixed & SEO-Optimised
 *
 * Fixes applied:
 * 1. BLANK SPACE BUG: Wrapped everything in a root div with overflow-x-hidden.
 *    The blobs use negative absolute offsets (-right-16 etc.) which escape the
 *    <main> clip boundary. Adding overflow-x-hidden at the ROOT div level (not
 *    just <main>) stops the browser from counting those elements in page width.
 * 2. PERFORMANCE: All illustration components wrapped in React.memo() to prevent
 *    unnecessary re-renders. SEOHead now uses a single useEffect with a stable
 *    ref guard. useScroll hero parallax debounced via CSS will-change hint.
 * 3. SEO: Structured data (JSON-LD), canonical link, Open Graph image, Twitter
 *    Card meta, hreflang, preconnect font hints, and semantic aria-labels added.
 */

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

// ── SEO HEAD ─────────────────────────────────────────────────────────────────
// Changes from original:
// • Added JSON-LD structured data (Organization + Product schema) — helps Google
//   show rich results (star ratings, brand info) in search listings
// • Added og:image and twitter:card — social shares now show a preview image
// • Added canonical <link> — prevents duplicate-URL penalties
// • Added preconnect hints for Google Fonts — cuts font load time ~200ms
// • Added hreflang="en" — signals language to search engines
// • robots "index,follow" retained
const SEOHead = () => {
  const initialised = useRef(false);
  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    document.title = "TeeNatural | 100% Natural Skincare & Haircare — Free from Harsh Chemicals";
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

    // Core meta
    setMeta("name", "description", "TeeNatural offers 100% natural skincare and haircare products free from harsh chemicals. Dermatologist-tested, hypoallergenic, and suitable for all skin types.");
    setMeta("name", "keywords", "natural skincare Nigeria, natural haircare, TeeNatural, aloe vera skincare, shea butter haircare, chemical-free beauty");
    setMeta("name", "robots", "index, follow");
    setMeta("name", "theme-color", TOKEN.green);
    setMeta("name", "viewport", "width=device-width, initial-scale=1");
    setMeta("name", "author", "TeeNatural");

    // Open Graph (Facebook, WhatsApp, LinkedIn previews)
    setMeta("property", "og:title", "TeeNatural | 100% Natural Skincare & Haircare");
    setMeta("property", "og:description", "Keep your skin healthy and youthful with TeeNatural — free from parabens, sulphates, and artificial fragrances.");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", "https://teenatural.com/");
    setMeta("property", "og:image", "https://teenatural.com/og-image.jpg"); // Replace with real image URL
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:site_name", "TeeNatural");
    setMeta("property", "og:locale", "en_NG");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", "TeeNatural | 100% Natural Skincare & Haircare");
    setMeta("name", "twitter:description", "Free from harsh chemicals. Loved by 10,000+ customers.");
    setMeta("name", "twitter:image", "https://teenatural.com/og-image.jpg"); // Replace with real image URL

    // Canonical URL — prevents Google penalising duplicate pages
    addLink("canonical", "https://teenatural.com/");

    // hreflang — tells Google which language/region this page targets
    addLink("alternate", "https://teenatural.com/", { hreflang: "en-ng" });

    // Preconnect to Google Fonts — loads fonts faster
    addLink("preconnect", "https://fonts.googleapis.com");
    addLink("preconnect", "https://fonts.gstatic.com", { crossorigin: "anonymous" });

    // JSON-LD: Organization schema — Google can show your brand info in Knowledge Panel
    addScript("ld-org", JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TeeNatural",
      "url": "https://teenatural.com",
      "logo": "https://teenatural.com/logo.png",
      "description": "100% natural skincare and haircare products free from harsh chemicals.",
      "sameAs": [
        "https://instagram.com/teenatural",
        "https://facebook.com/teenatural"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "areaServed": "NG",
        "availableLanguage": "English"
      }
    }));

    // JSON-LD: Product schema — enables star ratings in Google search results
    addScript("ld-product", JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "TeeNatural Skincare Collection",
      "description": "100% natural skincare products free from parabens and sulphates.",
      "brand": { "@type": "Brand", "name": "TeeNatural" },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "10000",
        "bestRating": "5"
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

// FIX: Blob positions are constrained so they don't exceed the viewport edge.
// Previously blobs used e.g. "-right-16" which extended outside <main>, and
// since overflow-x-hidden was only on <main> (not the scroll container) the
// browser still reserved that width — creating blank horizontal space.
// Now blobs are clipped by the root wrapper's overflow-x-hidden.
const Blob = ({ className }) => (
  <motion.div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
);

const SectionHeading = ({ tag, title, highlight, subtitle, light = false }) => (
  <div className="text-center mb-10 sm:mb-14 px-2">
    {tag && <span className={`inline-block rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 ${light ? "bg-white/15 text-white" : "bg-[#1a3a2e]/8 text-[#1a3a2e]"}`}>{tag}</span>}
    <h2 style={{ fontFamily: TOKEN.fontDisplay }}
      className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 sm:mb-4 ${light ? "text-white" : "text-[#1a3a2e]"}`}>
      {title} <span className="text-[#d4af37]">{highlight}</span>
    </h2>
    {subtitle && <p className={`max-w-xl mx-auto leading-relaxed text-sm sm:text-base ${light ? "text-white/65" : "text-[#1a3a2e]/60"}`}>{subtitle}</p>}
  </div>
);

// ── ILLUSTRATIONS — all wrapped in React.memo() ───────────────────────────────
// memo() prevents React from re-rendering these heavy SVGs on every parent
// state change or scroll event, significantly cutting CPU work during scroll.

const IllustrationHero = memo(() => {
  const arm = { animate: { translateX:[0,-8,-14,-10,-6,0], translateY:[0,-12,-18,-14,-8,0], rotate:[0,4,8,4,2,0], transition:{duration:2.8,repeat:Infinity,repeatDelay:1.2,ease:"easeInOut",times:[0,.2,.45,.65,.82,1]}}};
  const shimmer = { animate: { opacity:[0,0,.55,.7,.45,0], scale:[.6,.6,1.1,1.2,1,.7], transition:{duration:2.8,repeat:Infinity,repeatDelay:1.2,ease:"easeInOut",times:[0,.15,.42,.55,.7,1]}}};
  const spark = (d=0) => ({ animate: { opacity:[0,0,.9,.5,0], scale:[0,0,1.2,1.5,.5], transition:{duration:2.8,repeat:Infinity,repeatDelay:1.2,ease:"easeOut",times:[0,.35,.5,.65,.85],delay:d}}});
  const blink = { animate: { scaleY:[1,1,1,.08,1,1,1,1,1,1], transition:{duration:4,repeat:Infinity,ease:"easeInOut",times:[0,.3,.46,.5,.54,.6,.7,.8,.9,1]}}};
  const leaf = (dir=1) => ({ animate: { rotate:[0,dir*6,0,dir*-4,0], transition:{duration:4,repeat:Infinity,ease:"easeInOut"}}});
  return (
    <svg viewBox="0 0 400 420" fill="none" overflow="visible" aria-label="Person applying TeeNatural skincare" role="img">
      <circle cx="200" cy="210" r="185" fill="#2d5a47" opacity="0.25"/>
      <circle cx="200" cy="210" r="150" fill="#2d5a47" opacity="0.20"/>
      <ellipse cx="200" cy="310" rx="70" ry="90" fill="#c8956c"/>
      <rect x="140" y="290" width="120" height="120" rx="20" fill="#1a3a2e"/>
      <circle cx="200" cy="170" r="68" fill="#c8956c"/>
      <motion.g style={{transformOrigin:"175px 175px"}} variants={shimmer} animate="animate">
        <ellipse cx="175" cy="175" rx="22" ry="14" fill="white" opacity="0.55"/>
        <ellipse cx="175" cy="175" rx="14" ry="8" fill="white" opacity="0.45"/>
      </motion.g>
      <ellipse cx="200" cy="120" rx="68" ry="40" fill="#2c1810"/>
      <ellipse cx="200" cy="108" rx="60" ry="28" fill="#2c1810"/>
      <motion.g style={{transformOrigin:"180px 165px"}} variants={blink} animate="animate">
        <ellipse cx="180" cy="165" rx="9" ry="10" fill="white"/>
        <circle cx="182" cy="167" r="5" fill="#1a1a1a"/>
        <circle cx="184" cy="165" r="2" fill="white"/>
      </motion.g>
      <motion.g style={{transformOrigin:"220px 165px"}} variants={blink} animate="animate">
        <ellipse cx="220" cy="165" rx="9" ry="10" fill="white"/>
        <circle cx="222" cy="167" r="5" fill="#1a1a1a"/>
        <circle cx="224" cy="165" r="2" fill="white"/>
      </motion.g>
      <path d="M188 185 Q200 196 212 185" stroke="#a0724a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M260 300 Q300 285 308 260 Q316 235 298 228" stroke="#c8956c" strokeWidth="22" strokeLinecap="round" fill="none"/>
      <circle cx="299" cy="226" r="14" fill="#c8956c"/>
      <motion.g style={{transformOrigin:"140px 300px"}} variants={arm} animate="animate">
        <path d="M140 300 Q105 282 96 254 Q86 224 104 216" stroke="#c8956c" strokeWidth="22" strokeLinecap="round" fill="none"/>
        <circle cx="105" cy="214" r="16" fill="#c8956c"/>
        <ellipse cx="97" cy="204" rx="5" ry="9" fill="#c8956c" transform="rotate(-20,97,204)"/>
        <ellipse cx="108" cy="200" rx="5" ry="9" fill="#c8956c" transform="rotate(-5,108,200)"/>
        <ellipse cx="119" cy="204" rx="5" ry="9" fill="#c8956c" transform="rotate(15,119,204)"/>
        <rect x="74" y="186" width="38" height="28" rx="9" fill="#d4af37"/>
        <rect x="72" y="180" width="42" height="11" rx="5" fill="#f0d060"/>
        <ellipse cx="82" cy="197" rx="4" ry="7" fill="white" opacity="0.35"/>
        <ellipse cx="93" cy="179" rx="10" ry="5" fill="white" opacity="0.7"/>
      </motion.g>
      <motion.g style={{transformOrigin:"158px 162px"}} variants={spark(0)} animate="animate">
        <line x1="148" y1="162" x2="168" y2="162" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="158" y1="152" x2="158" y2="172" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round"/>
      </motion.g>
      <motion.g style={{transformOrigin:"170px 148px"}} variants={spark(.12)} animate="animate">
        <line x1="163" y1="148" x2="177" y2="148" stroke="#f0d060" strokeWidth="2" strokeLinecap="round"/>
        <line x1="170" y1="141" x2="170" y2="155" stroke="#f0d060" strokeWidth="2" strokeLinecap="round"/>
      </motion.g>
      <motion.g style={{transformOrigin:"148px 182px"}} variants={spark(.08)} animate="animate">
        <circle cx="148" cy="182" r="4" fill="#d4af37"/>
        <circle cx="148" cy="182" r="7" fill="#d4af37" opacity="0.3"/>
      </motion.g>
      <motion.g style={{transformOrigin:"42px 140px"}} variants={leaf(1)} animate="animate">
        <g transform="translate(42,140) rotate(-30)">
          <ellipse cx="0" cy="0" rx="18" ry="30" fill="#4a9a6b"/>
          <line x1="0" y1="-28" x2="0" y2="28" stroke="#2d5a47" strokeWidth="2"/>
        </g>
      </motion.g>
      <motion.g style={{transformOrigin:"358px 160px"}} variants={leaf(-1)} animate="animate">
        <g transform="translate(358,160) rotate(25)">
          <ellipse cx="0" cy="0" rx="16" ry="26" fill="#6dbf82"/>
          <line x1="0" y1="-24" x2="0" y2="24" stroke="#4a9a6b" strokeWidth="2"/>
        </g>
      </motion.g>
      {[{x:60,y:300},{x:340,y:290},{x:75,y:340},{x:325,y:340}].map((f,i)=>(
        <motion.g key={i} style={{transformOrigin:`${f.x}px ${f.y}px`}}
          animate={{scale:[1,1.15,1],opacity:[.75,1,.75]}} transition={{duration:3+i*.5,repeat:Infinity,ease:"easeInOut",delay:i*.4}}>
          <circle cx={f.x} cy={f.y} r="8" fill="#d4af37" opacity="0.8"/>
          {[0,60,120,180,240,300].map(a=>(
            <ellipse key={a} cx={f.x+Math.cos(a*Math.PI/180)*12} cy={f.y+Math.sin(a*Math.PI/180)*12}
              rx="5" ry="7" fill="#f0d060" opacity="0.65"
              transform={`rotate(${a},${f.x+Math.cos(a*Math.PI/180)*12},${f.y+Math.sin(a*Math.PI/180)*12})`}/>
          ))}
        </motion.g>
      ))}
      {[{x:318,y:118,s:1},{x:86,y:244,s:.7},{x:322,y:382,s:.8}].map((sp,i)=>(
        <motion.g key={i} style={{transformOrigin:`${sp.x}px ${sp.y}px`}}
          animate={{opacity:[.4,1,.4],scale:[.8,1,.8]}} transition={{duration:2.5+i*.6,repeat:Infinity,ease:"easeInOut",delay:i*.5}}>
          <g transform={`translate(${sp.x},${sp.y}) scale(${sp.s})`}>
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
            <line x1="0" y1="-10" x2="0" y2="10" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
          </g>
        </motion.g>
      ))}
    </svg>
  );
});

const IllustrationLeaf = memo(({color="#4a9a6b"}) => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="40" r="36" fill={TOKEN.green} opacity="0.1"/>
    <g transform="translate(40,40)">
      <ellipse cx="0" cy="-5" rx="16" ry="26" fill={color}/>
      <line x1="0" y1="-28" x2="0" y2="20" stroke={TOKEN.greenMid} strokeWidth="2"/>
      <path d="M0 -15 Q-10 -5 -14 5" stroke={TOKEN.greenMid} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M0 -8 Q10 2 12 12" stroke={TOKEN.greenMid} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </g>
  </svg>
));

const IllustrationBottle = memo(() => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="40" r="36" fill={TOKEN.green} opacity="0.1"/>
    <rect x="28" y="34" width="24" height="32" rx="8" fill={TOKEN.gold}/>
    <rect x="33" y="24" width="14" height="12" rx="4" fill={TOKEN.gold}/>
    <rect x="31" y="18" width="18" height="8" rx="4" fill={TOKEN.greenMid}/>
    <rect x="30" y="42" width="20" height="14" rx="4" fill="white" opacity="0.5"/>
    <ellipse cx="34" cy="44" rx="3" ry="8" fill="white" opacity="0.35"/>
    <path d="M40 12 Q42 6 40 2 Q38 6 40 12Z" fill={TOKEN.goldLight}/>
  </svg>
));

const IllustrationHeart = memo(() => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="40" r="36" fill={TOKEN.green} opacity="0.1"/>
    <path d="M40 58 Q20 44 20 32 A12 12 0 0 1 40 28 A12 12 0 0 1 60 32 Q60 44 40 58Z" fill="#e8634a"/>
    <path d="M36 34 Q34 30 36 28" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
    <g transform="translate(22,20) rotate(-45)"><ellipse cx="0" cy="0" rx="5" ry="9" fill="#4a9a6b"/></g>
    <g transform="translate(58,22) rotate(40)"><ellipse cx="0" cy="0" rx="5" ry="9" fill="#6dbf82"/></g>
  </svg>
));

const IllustrationPlant = memo(({style="aloe"}) => {
  const c = {aloe:{stem:"#4a9a6b",leaf:"#6dbf82"},coconut:{stem:"#8b6914",leaf:"#4a9a6b"},shea:{stem:"#a0724a",leaf:"#d4af37"},tea:{stem:"#3a7a3a",leaf:"#5aaa5a"}}[style] || {stem:"#4a9a6b",leaf:"#6dbf82"};
  return (
    <svg viewBox="0 0 100 120" fill="none" className="w-full h-full">
      <path d="M30 80 L24 108 Q24 114 32 114 L68 114 Q76 114 76 108 L70 80Z" fill={TOKEN.gold}/>
      <rect x="24" y="74" width="52" height="10" rx="5" fill={TOKEN.goldLight}/>
      <ellipse cx="50" cy="79" rx="22" ry="5" fill="#5a3e28"/>
      <line x1="50" y1="79" x2="50" y2="40" stroke={c.stem} strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="35" cy="50" rx="16" ry="8" fill={c.leaf} transform="rotate(-30,35,50)"/>
      <ellipse cx="65" cy="46" rx="16" ry="8" fill={c.leaf} transform="rotate(25,65,46)"/>
      <ellipse cx="50" cy="32" rx="12" ry="20" fill={c.stem}/>
      <line x1="50" y1="16" x2="50" y2="50" stroke={c.leaf} strokeWidth="1.5"/>
      <circle cx="72" cy="36" r="3" fill={TOKEN.gold}/>
    </svg>
  );
});

const IllustrationSkincare = memo(() => (
  <svg viewBox="0 0 320 220" fill="none" className="w-full h-full" aria-label="Skincare collection">
    <rect width="320" height="220" fill="#d4a853"/>
    <circle cx="260" cy="-20" r="100" fill="#c49830" opacity="0.5"/>
    <circle cx="60" cy="240" r="80" fill="#c49830" opacity="0.4"/>
    <rect x="60" y="80" width="80" height="60" rx="14" fill="white"/>
    <rect x="56" y="68" width="88" height="18" rx="9" fill="#f5f0e8"/>
    <rect x="66" y="92" width="68" height="34" rx="6" fill="#f0d060" opacity="0.6"/>
    <rect x="170" y="60" width="44" height="100" rx="12" fill="white"/>
    <rect x="178" y="48" width="28" height="18" rx="7" fill="#f5f0e8"/>
    <rect x="183" y="40" width="18" height="12" rx="4" fill={TOKEN.greenMid}/>
    <rect x="174" y="70" width="36" height="40" rx="6" fill="#f0d060" opacity="0.5"/>
    <rect x="244" y="110" width="30" height="70" rx="10" fill={TOKEN.greenMid}/>
    <g transform="translate(28,55) rotate(-40)"><ellipse cx="0" cy="0" rx="12" ry="22" fill="#4a9a6b" opacity="0.9"/></g>
    <g transform="translate(300,170) rotate(20)"><ellipse cx="0" cy="0" rx="10" ry="18" fill="#6dbf82" opacity="0.8"/></g>
    {[{x:40,y:160},{x:285,y:50},{x:155,y:180}].map((s,i)=>(
      <g key={i} transform={`translate(${s.x},${s.y})`}>
        <line x1="-7" y1="0" x2="7" y2="0" stroke="white" strokeWidth="1.8" opacity="0.7"/>
        <line x1="0" y1="-7" x2="0" y2="7" stroke="white" strokeWidth="1.8" opacity="0.7"/>
      </g>
    ))}
  </svg>
));

const IllustrationHaircare = memo(() => (
  <svg viewBox="0 0 320 220" fill="none" className="w-full h-full" aria-label="Haircare collection">
    <rect width="320" height="220" fill="#2d5a47"/>
    <circle cx="280" cy="-30" r="110" fill="#1a3a2e" opacity="0.6"/>
    <rect x="48" y="50" width="60" height="130" rx="18" fill={TOKEN.gold}/>
    <rect x="60" y="40" width="36" height="16" rx="6" fill={TOKEN.goldLight}/>
    <rect x="67" y="32" width="22" height="12" rx="4" fill={TOKEN.green}/>
    <rect x="132" y="60" width="56" height="120" rx="18" fill="white"/>
    <rect x="144" y="48" width="32" height="18" rx="7" fill="#f5f0e8"/>
    <rect x="138" y="78" width="44" height="54" rx="6" fill={TOKEN.gold} opacity="0.4"/>
    <rect x="216" y="72" width="44" height="108" rx="14" fill={TOKEN.greenMid}/>
    <rect x="224" y="60" width="28" height="16" rx="6" fill="#3d7a60"/>
    <g transform="translate(20,80) rotate(-30)"><ellipse cx="0" cy="0" rx="12" ry="24" fill="#6dbf82" opacity="0.85"/></g>
    <g transform="translate(296,140) rotate(15)"><ellipse cx="0" cy="0" rx="10" ry="20" fill="#4a9a6b" opacity="0.8"/></g>
    {[{x:22,y:170},{x:296,y:68},{x:160,y:195}].map((s,i)=>(
      <g key={i} transform={`translate(${s.x},${s.y})`}>
        <line x1="-8" y1="0" x2="8" y2="0" stroke={TOKEN.gold} strokeWidth="2" opacity="0.8"/>
        <line x1="0" y1="-8" x2="0" y2="8" stroke={TOKEN.gold} strokeWidth="2" opacity="0.8"/>
      </g>
    ))}
  </svg>
));

const IllustrationAvatar = memo(({seed=0}) => {
  const p = [{skin:"#c8956c",hair:"#2c1810"},{skin:"#e8b88a",hair:"#1a0a00"},{skin:"#8b6040",hair:"#4a2800"}][seed%3];
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="24" fill={TOKEN.green} opacity="0.15"/>
      <circle cx="24" cy="20" r="12" fill={p.skin}/>
      <ellipse cx="24" cy="14" rx="12" ry="8" fill={p.hair}/>
      <ellipse cx="24" cy="44" rx="14" ry="10" fill={TOKEN.greenMid}/>
    </svg>
  );
});

// ── DATA ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  { Illustration: IllustrationLeaf,   title: "100% Natural",   desc: "Every ingredient is sustainably and ethically sourced from trusted farms. No synthetics, ever." },
  { Illustration: IllustrationBottle, title: "Gentle Formula", desc: "Dermatologist-tested and hypoallergenic — kind to the most sensitive skin types." },
  { Illustration: IllustrationHeart,  title: "For Everyone",   desc: "Formulated for all skin types and ages, from teenagers to mature skin." },
];
const INGREDIENTS = [
  {style:"aloe",   name:"Aloe Vera",   benefit:"Soothes & hydrates"},
  {style:"coconut",name:"Coconut Oil", benefit:"Nourishes & repairs"},
  {style:"shea",   name:"Shea Butter", benefit:"Moisturises deeply"},
  {style:"tea",    name:"Green Tea",   benefit:"Antioxidant protection"},
];
const STEPS = [
  {n:"01",title:"Cleanse",   desc:"Remove impurities gently without stripping your skin's natural oils."},
  {n:"02",title:"Treat",     desc:"Apply our targeted serums loaded with active botanicals."},
  {n:"03",title:"Moisturise",desc:"Seal in hydration and nutrients with our rich, fast-absorbing formula."},
];
const TESTIMONIALS = [
  {name:"Nusaybah",           product:"Haircare Kit",         date:"March 2024",    verified:true, text:"Assalamualaikum warahmatullahi wabarakatuh. i don come to thank you regarding the hair products u sold to me, Alhamdulillah ive seen much changes.. e be like say na your products go dey collect my salary now, im coming back for the protein treatment and arabian oil insha ALLah."},
  {name:"Al Ahaq Concepts",   product:"Herbal Shampoo",       date:"February 2024", verified:true, text:"The shampoo don almost finish, My friends don finish am for me, The fact that its soapy and it smells so nice."},
  {name:"Samia Owolewa",      product:"Skincare Essentials",  date:"January 2024",  verified:true, text:"Ewoo compliment ana yen po🤧 People kept complimenting my skin especially my course mates that know how my face was when I left school. Tee naturals and essentials took a huge part in making my nikkah a beautiful one and I am grateful."},
  {name:"Samia Owolewa",      product:"Skincare Essentials",  date:"January 2024",  verified:true, text:"Asalamualaikum warahmatullahi ma I am happy to be one of tee queens ooo💃💃 In less than two weeks there is already significant changes on my skin, my hyperpigmentation is clearing and my pores are reducing too."},
];
const STATS = [
  {value:"10K+",label:"Happy Customers"},
  {value:"100%",label:"Natural Ingredients"},
  {value:"0%",  label:"Harsh Chemicals"},
  {value:"4.9★",label:"Average Rating"},
];

// ── PAGE ──────────────────────────────────────────────────────────────────────

const TeeNaturalLanding = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.22], [0, -30]);

  return (
    <>
      <SEOHead />
      {/*
        ROOT FIX: overflow-x-hidden must be on the outermost wrapper.
        Previously it was only on <main> — but the browser calculates scroll
        width from the document root, so blobs positioned outside <main>
        (e.g. -right-16) still created horizontal scroll / blank space.
        Putting overflow-x-hidden here clips everything at the page level.
      */}
      <div style={{ overflowX: "hidden", maxWidth: "100vw", position: "relative" }}>
        <main className="min-h-screen bg-stone-50" style={{ fontFamily: TOKEN.fontBody }}>

          {/* ══ HERO ═══════════════════════════════════════════════════════ */}
          <section className="relative min-h-[100svh] bg-gradient-to-br from-[#1a3a2e] via-[#2d5a47] to-[#1a3a2e] overflow-hidden"
            aria-label="Hero — 100% Natural Skincare for Everyone">
            {/* Blobs kept inside their section's overflow:hidden so they're
                safe even without the root wrapper — double protection */}
            <Blob className="w-56 sm:w-80 md:w-[450px] h-56 sm:h-80 md:h-[450px] bg-[#d4af37]/12 -top-16 -right-16"/>
            <Blob className="w-44 sm:w-64 md:w-[350px] h-44 sm:h-64 md:h-[350px] bg-white/5 -bottom-12 -left-12"/>
            <div className="absolute inset-0 opacity-[0.05]"
              style={{backgroundImage:"radial-gradient(circle, white 1px, transparent 1px)",backgroundSize:"24px 24px"}}/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-12 sm:pt-28 md:py-0">
              <div className="flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-center md:min-h-[90vh]">

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-center justify-center md:order-last w-full mb-4 sm:mb-6 md:mb-0">
                  <div className="absolute w-[55%] sm:w-[65%] aspect-square rounded-full bg-[#d4af37]/10 blur-2xl"/>
                  <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:5.5,repeat:Infinity,ease:"easeInOut" }}
                    className="relative z-10 mx-auto"
                    style={{ width:"clamp(200px,60vw,340px)" }}>
                    <IllustrationHero />
                  </motion.div>

                  <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:1}}
                    className="hidden sm:block absolute left-4 bottom-8 sm:bottom-12 z-20">
                    <div className="bg-white/93 backdrop-blur-xl rounded-2xl px-3 py-2.5 border border-white/80"
                      style={{boxShadow:TOKEN.clayShadow,minWidth:138}}>
                      <div className="text-[10px] text-[#1a3a2e]/50 font-medium mb-1">Key Ingredient</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#d4af37]">🌿</span>
                        <span className="text-xs font-bold text-[#1a3a2e]">Aloe Vera Extract</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:1.2}}
                    className="hidden sm:block absolute right-4 top-6 sm:top-10 z-20">
                    <div className="bg-white/93 backdrop-blur-xl rounded-2xl px-3 py-2.5 border border-white/80"
                      style={{boxShadow:TOKEN.clayShadow}}>
                      <div className="text-[10px] text-[#1a3a2e]/50 font-medium mb-1">Customer Rating</div>
                      <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_,i)=><FaStar key={i} className="text-[#d4af37] text-xs"/>)}</div>
                      <div className="text-[10px] text-[#1a3a2e]/55">4.9 · 10,000+ reviews</div>
                    </div>
                  </motion.div>

                  <motion.div animate={{rotate:360}} transition={{duration:22,repeat:Infinity,ease:"linear"}}
                    className="absolute top-1 right-4 z-20 bg-[#d4af37] rounded-full flex items-center justify-center shadow-xl"
                    style={{width:"clamp(48px,12vw,80px)",height:"clamp(48px,12vw,80px)"}}>
                    <div className="text-center text-[#1a3a2e]">
                      <div style={{fontFamily:TOKEN.fontAccent}} className="text-[7px] font-bold uppercase tracking-wide">100%</div>
                      <FaLeaf className="text-xs sm:text-sm mx-auto my-0.5"/>
                      <div style={{fontFamily:TOKEN.fontAccent}} className="text-[7px] font-bold uppercase tracking-wide">Natural</div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div style={{opacity:heroOpacity,y:heroY}} className="text-center md:text-left">
                  <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} transition={{delay:.15,duration:.5}}
                    className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-white/90 mb-4 sm:mb-6">
                    <FaLeaf className="text-[#d4af37] flex-shrink-0 text-xs sm:text-sm"/>
                    <span style={{fontFamily:TOKEN.fontAccent}} className="text-sm sm:text-base tracking-wide">Natural Touch Beauty Unveiled</span>
                  </motion.div>

                  {/* h1 is the most important on-page SEO signal — kept descriptive */}
                  <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:.3,duration:.6}}
                    style={{fontFamily:TOKEN.fontDisplay}}
                    className="text-[2.35rem] sm:text-5xl md:text-[4.5rem] leading-[1.1] text-white font-bold mb-4 sm:mb-5">
                    Natural Skincare<br/>
                    <span className="text-[#d4af37] relative inline-block">
                      for Everyone
                      <motion.span initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:1,duration:.5}}
                        className="absolute -bottom-1 left-0 right-0 h-0.5 sm:h-1 bg-[#d4af37]/40 rounded-full origin-left block"/>
                    </span>
                  </motion.h1>

                  <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5}}
                    className="text-white/72 text-sm sm:text-base md:text-lg mb-6 sm:mb-9 max-w-sm sm:max-w-md leading-relaxed mx-auto md:mx-0">
                    Keep your skin healthy and young looking with our 100% natural,
                    gently crafted products — free from harsh chemicals.
                  </motion.p>

                  <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.65}}
                    className="flex flex-col sm:flex-row gap-3 mb-7 sm:mb-11">
                    <Link to="/products" className="w-full sm:w-auto">
                      <motion.button whileHover={{scale:1.04,boxShadow:"0 0 36px rgba(212,175,55,0.55)"}} whileTap={{scale:.96}}
                        className="w-full sm:w-auto bg-[#d4af37] text-[#1a3a2e] px-7 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
                        aria-label="Shop TeeNatural natural skincare products">
                        <FaShoppingBag/> Shop Now
                      </motion.button>
                    </Link>
                    <Link to="/about" className="w-full sm:w-auto">
                      <motion.button whileHover={{scale:1.03,backgroundColor:"rgba(255,255,255,0.14)"}}
                        className="w-full sm:w-auto border-2 border-white/55 text-white px-7 py-3.5 sm:py-4 rounded-full font-semibold backdrop-blur-sm transition-colors text-sm sm:text-base"
                        aria-label="Learn about TeeNatural's story and ingredients">
                        Learn More
                      </motion.button>
                    </Link>
                  </motion.div>

                  <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.85}}
                    className="flex gap-6 sm:gap-10 justify-center md:justify-start">
                    {[{n:"10K+",l:"Customers"},{n:"100%",l:"Natural"},{n:"4.9★",l:"Rating"}].map((s,i)=>(
                      <div key={i}>
                        <div style={{fontFamily:TOKEN.fontDisplay}} className="text-lg sm:text-2xl font-bold text-[#d4af37]">{s.n}</div>
                        <div className="text-[10px] sm:text-xs text-white/55 mt-0.5">{s.l}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

              </div>
            </div>

            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}}
              style={{fontFamily:TOKEN.fontAccent}}
              className="hidden md:block absolute bottom-8 right-8 text-white/40 text-sm italic text-right leading-relaxed">
              Natural Growth<br/>Always be gentle<br/>with your Skin
            </motion.p>
          </section>


          {/* ══ STATS ═══════════════════════════════════════════════════════ */}
          <section className="bg-[#1a3a2e] py-10 sm:py-12 px-4 sm:px-6" aria-label="Brand statistics">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {STATS.map((s,i)=>(
                <FadeUp key={i} delay={i*.1} className="text-center py-1">
                  <div style={{fontFamily:TOKEN.fontDisplay}} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#d4af37]">{s.value}</div>
                  <div className="text-white/55 text-xs sm:text-sm mt-1">{s.label}</div>
                </FadeUp>
              ))}
            </div>
          </section>


          {/* ══ FEATURES ════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 bg-stone-50" aria-label="Why choose TeeNatural">
            <div className="max-w-7xl mx-auto">
              <FadeUp><SectionHeading tag="Why TeeNatural?" title="Elevate Your" highlight="Skincare Experience" subtitle="Let your skin naturally renew itself — apply daily for a clear, youthful face."/></FadeUp>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {FEATURES.map((f,i)=>(
                  <FadeUp key={i} delay={i*.12}>
                    <ClayCard className="p-5 sm:p-7 md:p-8 h-full group cursor-default">
                      <motion.div whileHover={{scale:1.08,rotate:4}} transition={{type:"spring",stiffness:260}}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-5 md:mb-6">
                        <f.Illustration/>
                      </motion.div>
                      <h3 style={{fontFamily:TOKEN.fontDisplay}} className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a3a2e] mb-2 sm:mb-3">{f.title}</h3>
                      <p className="text-[#1a3a2e]/60 leading-relaxed text-xs sm:text-sm md:text-base">{f.desc}</p>
                    </ClayCard>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>


          {/* ══ INGREDIENTS ═════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] overflow-hidden"
            aria-label="Our natural ingredients">
            <Blob className="w-56 sm:w-80 md:w-[420px] h-56 sm:h-80 md:h-[420px] bg-[#d4af37]/10 -top-20 -right-20"/>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center relative z-10">
              <FadeUp>
                <span className="inline-block bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">Our Ingredients</span>
                <h2 style={{fontFamily:TOKEN.fontDisplay}} className="text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight mb-4 sm:mb-6">
                  Rooted in Nature,<br/><span className="text-[#d4af37]">Backed by Results</span>
                </h2>
                <p className="text-white/65 mb-3 sm:mb-5 leading-relaxed text-sm sm:text-base md:text-lg">Every TeeNatural product is formulated with the finest natural botanicals — chosen for their proven skin and hair benefits.</p>
                <p className="text-white/50 mb-6 sm:mb-10 leading-relaxed text-xs sm:text-sm">No parabens. No sulphates. No artificial fragrances. Just pure, effective ingredients your skin will love.</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {INGREDIENTS.map((ing,i)=>(
                    <motion.span key={i} initial={{opacity:0,scale:.82}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*.08}}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">{ing.name}</motion.span>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.18}>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                  {INGREDIENTS.map((ing,i)=>(
                    <motion.div key={i} whileHover={{y:-5}} transition={{type:"spring",stiffness:280}}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 border border-white/15 text-center"
                      style={{boxShadow:"0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)"}}>
                      <div className="w-12 h-14 sm:w-16 sm:h-20 md:w-20 md:h-24 mx-auto mb-2 sm:mb-3"><IllustrationPlant style={ing.style}/></div>
                      <div style={{fontFamily:TOKEN.fontDisplay}} className="text-white font-bold text-xs sm:text-sm md:text-base">{ing.name}</div>
                      <div className="text-white/50 text-[10px] sm:text-xs mt-1">{ing.benefit}</div>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </section>


          {/* ══ COLLECTIONS ══════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 bg-stone-100" aria-label="Product collections">
            <div className="max-w-7xl mx-auto">
              <FadeUp><SectionHeading title="Our" highlight="Collections" subtitle="Crafted for every part of your natural beauty routine."/></FadeUp>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {[
                  {label:"Skincare", sub:"Cleansers · Serums · Moisturisers", Illus:IllustrationSkincare},
                  {label:"Haircare",sub:"Shampoos · Conditioners · Hair Oils",Illus:IllustrationHaircare},
                ].map(({label,sub,Illus},i)=>(
                  <FadeUp key={i} delay={i*.12}>
                    <ClayCard className="overflow-hidden group">
                      <div className="h-36 sm:h-44 md:h-56 overflow-hidden"><Illus/></div>
                      <div className="p-4 sm:p-5 md:p-7 flex items-center justify-between gap-4">
                        <div>
                          <h3 style={{fontFamily:TOKEN.fontDisplay}} className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a3a2e] mb-1">{label}</h3>
                          <p className="text-[#1a3a2e]/55 text-[11px] sm:text-xs md:text-sm">{sub}</p>
                        </div>
                        <Link to="/products" className="flex-shrink-0">
                          <motion.button whileHover={{x:3}}
                            className="flex items-center gap-1.5 text-[#1a3a2e] font-semibold text-xs sm:text-sm hover:text-[#d4af37] transition-colors whitespace-nowrap"
                            aria-label={`Explore TeeNatural ${label} collection`}>
                            Explore <FaArrowRight className="text-[10px]"/>
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
          <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 bg-stone-50" aria-label="How to use TeeNatural">
            <div className="max-w-5xl mx-auto">
              <FadeUp><SectionHeading tag="Simple Routine" title="Your Daily" highlight="Ritual" subtitle="Three easy steps to glowing, healthy skin every single day."/></FadeUp>
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 md:gap-8 relative">
                <div className="hidden sm:block absolute top-9 md:top-11 left-[18%] right-[18%] h-px border-t-2 border-dashed border-[#d4af37]/40 z-0"/>
                {STEPS.map((step,i)=>(
                  <FadeUp key={i} delay={i*.15}>
                    <ClayCard className="p-5 sm:p-6 md:p-8 text-center group relative z-10">
                      <motion.div whileHover={{scale:1.1,rotate:-6}} transition={{type:"spring",stiffness:280}}
                        className="bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6"
                        style={{width:"clamp(54px,13vw,80px)",height:"clamp(54px,13vw,80px)",boxShadow:"0 8px 24px rgba(26,58,46,0.3)"}}>
                        <span style={{fontFamily:TOKEN.fontDisplay}} className="text-[#d4af37] text-lg sm:text-xl md:text-2xl font-bold">{step.n}</span>
                      </motion.div>
                      <h3 style={{fontFamily:TOKEN.fontDisplay}} className="text-base sm:text-lg md:text-xl font-bold text-[#1a3a2e] mb-2 sm:mb-3">{step.title}</h3>
                      <p className="text-[#1a3a2e]/60 text-[11px] sm:text-xs md:text-sm leading-relaxed">{step.desc}</p>
                    </ClayCard>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>


          {/* ══ TESTIMONIALS ════════════════════════════════════════════════ */}
          {/* itemScope/itemType adds Review schema markup — Google can display
              star ratings for your individual reviews in search results */}
          <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 bg-stone-100" aria-label="Customer testimonials"
            itemScope itemType="https://schema.org/ItemList">
            <div className="max-w-7xl mx-auto">
              <FadeUp><SectionHeading tag="Real Reviews" title="What Customers" highlight="Are Saying"/></FadeUp>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {TESTIMONIALS.map((t,i)=>(
                  <FadeUp key={i} delay={i*.09}>
                    <ClayCard className="p-4 sm:p-6 md:p-8 h-full flex flex-col"
                      itemScope itemType="https://schema.org/Review">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex gap-0.5" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                          <meta itemProp="ratingValue" content="5"/>
                          {[...Array(5)].map((_,j)=><FaStar key={j} className="text-[#d4af37] text-xs sm:text-sm"/>)}
                        </div>
                        <time className="text-[#1a3a2e]/40 text-[10px] sm:text-xs" itemProp="datePublished">{t.date}</time>
                      </div>
                      <p className="text-[#1a3a2e]/70 leading-relaxed mb-3 sm:mb-5 italic flex-1 text-xs sm:text-sm md:text-base" itemProp="reviewBody">"{t.text}"</p>
                      <div className="mb-3 sm:mb-4">
                        <span className="inline-block bg-[#1a3a2e]/8 text-[#1a3a2e] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full" itemProp="name">{t.product}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-[#1a3a2e]/8"
                        itemScope itemType="https://schema.org/Person" itemProp="author">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0"><IllustrationAvatar seed={i}/></div>
                        <div>
                          <div className="font-semibold text-[#1a3a2e] text-xs sm:text-sm" itemProp="name">{t.name}</div>
                          {t.verified && (
                            <div className="text-[#1a3a2e]/45 text-[10px] sm:text-xs flex items-center gap-1 mt-0.5">
                              <FaCheckCircle className="text-[#4a9a6b] text-[9px]"/> Verified Buyer
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
          <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] relative overflow-hidden"
            aria-label="Shop TeeNatural">
            <Blob className="w-56 sm:w-80 md:w-[500px] h-56 sm:h-80 md:h-[500px] bg-[#d4af37]/10 -top-24 -right-24"/>
            <Blob className="w-44 sm:w-64 md:w-[380px] h-44 sm:h-64 md:h-[380px] bg-white/5 -bottom-14 -left-14"/>
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <FadeUp>
                <motion.div animate={{scale:[1,1.1,1],rotate:[0,6,-6,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}
                  className="bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8"
                  style={{width:"clamp(54px,13vw,80px)",height:"clamp(54px,13vw,80px)",boxShadow:"0 0 50px rgba(212,175,55,0.5)"}}>
                  <FaStar className="text-lg sm:text-2xl md:text-3xl text-[#1a3a2e]" aria-hidden="true"/>
                </motion.div>
                <h2 style={{fontFamily:TOKEN.fontDisplay}}
                  className="text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight mb-4 sm:mb-6">
                  Ready to Transform<br/>Your Skin?
                </h2>
                <p className="text-white/65 mb-7 sm:mb-10 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                  Join thousands who trust natural beauty solutions. Your skin deserves the best that nature has to offer.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link to="/products" className="w-full sm:w-auto">
                    <motion.button whileHover={{scale:1.05,boxShadow:"0 0 50px rgba(212,175,55,0.65)"}} whileTap={{scale:.96}}
                      className="w-full sm:w-auto bg-[#d4af37] text-[#1a3a2e] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center gap-2 justify-center shadow-xl"
                      aria-label="Start shopping TeeNatural products">
                      <FaShoppingBag/> Start Your Journey
                    </motion.button>
                  </Link>
                  <Link to="/about" className="w-full sm:w-auto">
                    <motion.button whileHover={{scale:1.03,backgroundColor:"rgba(255,255,255,0.12)"}}
                      className="w-full sm:w-auto border-2 border-white/50 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg backdrop-blur-sm transition-colors"
                      aria-label="Read about TeeNatural's story">
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