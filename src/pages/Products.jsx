/**
 * TeeNaturalProducts.jsx
 * ─────────────────────────────────────────────────────────────────
 * Optimized product page for TeeNatural.
 *
 * What changed vs original:
 *  - Full responsive grid: 1 col mobile → 2 col tablet → 3 col desktop → 4 col wide
 *  - Staggered card entrance animations (framer-motion)
 *  - Animated category filter pills with active indicator
 *  - Product cards: hover lift + image zoom + shimmer overlay
 *  - Flat SVG illustration badges on category headers
 *  - Decorative SVG leaf/botanical accents in page header
 *  - Empty-state SVG illustration when cart is empty
 *  - Cart sidebar: slide-in with staggered item reveals
 *  - Floating cart button: bounce + pulse ring when items added
 *  - Image lazy-loading with skeleton placeholder
 *  - All original functionality (cart, wishlist, WhatsApp) preserved
 *
 * Dependencies: framer-motion, react-icons/fa, react-router-dom
 * Cart context: ../context/CartContext  (useCart hook)
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaShoppingCart,
  FaWhatsapp,
  FaHeart,
  FaTimes,
  FaPlus,
  FaMinus,
  FaTrash,
  FaLeaf,
  FaSearch,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  green:     "#1a3a2e",
  greenMid:  "#2d5a47",
  gold:      "#d4af37",
  goldLight: "#f0d060",
  stone:     "#f5f0e8",
  clay:      "0 8px 32px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.85)",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody:    "'Plus Jakarta Sans', sans-serif",
};

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT DATA  (unchanged from original)
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1,  name: "Luminous Black Soap",         price: 5500,  category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397574/Luminous_blasck_soap_zokbxo.jpg",        description: "Deep cleansing black soap for radiant skin" },
  { id: 2,  name: "Hydrating Face Soap",          price: 4800,  category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397574/Hyrating_Facial_Soap_denejh.jpg",        description: "Gentle hydrating facial soap for all skin types" },
  { id: 3,  name: "Anti Pimple Plastic Soap",     price: 6500,  category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397572/Anti_pimples_soap_sximbp.jpg",          description: "Effective anti-pimple formula" },
  { id: 4,  name: "Body Oil",                     price: 6200,  category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397573/Body_Oil_pfexql.jpg",                    description: "Nourishing body oil for smooth skin" },
  { id: 5,  name: "Arabian Hair Oil",             price: 6500,  category: "HAIRCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397573/arabian_hair_oil_x59xny.jpg",            description: "Strengthening hair oil for healthy hair" },
  { id: 6,  name: "Hair Mask",                    price: 8000,  category: "HAIRCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397573/Hair_mask_dtzmss.jpg",                   description: "Deep conditioning hair mask" },
  { id: 7,  name: "Molato Body Soap",             price: 7500,  category: "SKINCARE",    image: "/molato.jpg",                                                                                            description: "Exfoliating body soap for smooth skin" },
  { id: 8,  name: "Wild Honey Body Wash",         price: 5500,  category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796527/wild_honey_body_wash_xy9ptf.jpg",        description: "Moisturizing body wash with wild honey" },
  { id: 9,  name: "Oshaprapra Body Soap",         price: 15000, category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796524/Oshaprapra_Body_Soap_kp45fg.jpg",        description: "Naturally made body soap" },
  { id: 10, name: "Kiddies Rashes Soap",          price: 8000,  category: "BABYCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796524/Kiddies_Rash_Soap_ndlnsa.jpg",           description: "Gentle soap for baby rashes" },
  { id: 11, name: "Hair Protein Treatment",       price: 5500,  category: "HAIRCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796524/protein_treatment_kv6a4f.jpg",           description: "Strengthens and repairs hair" },
  { id: 12, name: "Herbal Skin Repair Soap",      price: 8500,  category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/Herbal_Skin_Repair_Soap_f8gtjx.jpg",     description: "Herbal soap for skin repair" },
  { id: 13, name: "V.I.P Face Cream",             price: 6000,  category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/ClarIfying_face_Cream_ojrvnl.jpg",      description: "Clarifying face cream for glowing skin" },
  { id: 14, name: "Baby Clear Skin Soap",         price: 7500,  category: "BABYCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/Baby_Clear_Skin_Soap_pngiap.jpg",        description: "Gentle soap for baby's clear skin" },
  { id: 15, name: "Face Serum",                   price: 6000,  category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796522/face_serum_vyzifm.jpg",                  description: "Nourishing face serum for radiant skin" },
  { id: 16, name: "Face Kit",                     price: 30000, category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796522/Face_Kit_g6xred.jpg",                    description: "Complete face care kit" },
  { id: 17, name: "Face Cleanser",                price: 6000,  category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796522/Face_Cleanser_mfvfgu.jpg",               description: "Gentle face cleanser for daily use" },
  { id: 18, name: "Kiddies Hair Brush",           price: 3200,  category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796528/Kiddies_Hairbrush_uquliw.jpg",           description: "Soft hair brush for kids" },
  { id: 19, name: "Shower Cap",                   price: 650,   category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796526/Shower_Cap_vb4v73.jpg",                  description: "Waterproof shower cap for hair protection" },
  { id: 20, name: "Reusable Midi Face Towel",     price: 3000,  category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796525/Reusable_Midi_Fce_Towel_hw7qde.jpg",     description: "Soft and reusable face towel, 450 per piece" },
  { id: 21, name: "Safety Ear Pick",              price: 2200,  category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796525/Safety_Ear_Pick_hijntp.jpg",             description: "Safe ear pick for ear cleaning" },
  { id: 22, name: "Hair Care Set",                price: 8500,  category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796524/HairCare_Set_ysjha7.jpg",                description: "Complete hair care set for healthy hair" },
  { id: 23, name: "Lip Oil",                      price: 1500,  category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796524/Lip_Oil_k9eua1.jpg",                     description: "Moisturizing lip oil for soft lips" },
  { id: 24, name: "Kiddies Floral Toothpaste",    price: 1500,  category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/Kiddies_Floral_Toothpaste_osbhj2.jpg",   description: "Gentle floral toothpaste for kids" },
  { id: 25, name: "5-1 Face Massager",            price: 5500,  category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/Face_Massager_js2iyu.jpg",               description: "Multi-functional face massager for skin rejuvenation" },
  { id: 26, name: "Easy Back Scrub Sponge",       price: 2500,  category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796522/Back_Scrub_Sponge_beqh2w.jpg",           description: "Long-handled back scrub sponge for easy cleaning" },
  { id: 27, name: "Bubble Body Sponge",           price: 1500,  category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796521/Bubble_Body_Sponge_ec855v.jpg",          description: "Soft bubble sponge for gentle body cleansing" },
  { id: 28, name: "Kiddies Body Oil",             price: 5800,  category: "BABYCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/Kiddies_Body_Oil_uc2gv0.jpg",            description: "Nourishing body oil for kids' delicate skin" },
  { id: 29, name: "Electric Toothbrush (Adults)", price: 15000, category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796521/Adult_Electric_ToothBrush_pyhg6b.jpg",   description: "Rechargeable electric toothbrush for adults" },
  { id: 30, name: "Soft Body Towel",              price: 5500,  category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763799238/soft_body_towel_rlyev5.jpg",             description: "Plush body towel for gentle drying" },
  { id: 31, name: "Products Basket",              price: 1200,  category: "ACCESSORIES", image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763799239/Products_basket_zj5srn.jpg",             description: "Durable basket for organizing products" },
  { id: 32, name: "Baby Skincare Products",       price: 40000, category: "BABYCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1765969669/baby_skincare_products_jlh9wq.jpg",      description: "Complete set of baby skincare products" },
  { id: 33, name: "Berry Body Butter",            price: 7000,  category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1765969667/berry_body_butter_rallxz.jpg",           description: "Rich body butter with berry extracts" },
  { id: 34, name: "Exfoliating Shower Gel",       price: 6500,  category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1765969668/exfoliating_shower_gel_snbhuj.jpg",      description: "Gentle exfoliating shower gel for smooth skin" },
  { id: 35, name: "Lightening Body Kit",          price: 35000, category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1765996138/Lightning_body_kit_mgooqa.jpg",          description: "Complete body lightening kit for radiant skin" },
  { id: 36, name: "Caramel Body Kit",             price: 25000, category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1765996138/Caramel_Body_Kit_xassvw.jpg",            description: "Nourishing caramel body kit for smooth skin" },
  { id: 37, name: "Dry Skin Treatment Kit",       price: 23000, category: "SKINCARE",    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1765996140/Dry_Skin_Treatment_n9ejjt.jpg",         description: "Effective treatment kit for dry skin" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY → color + SVG icon map
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_META = {
  ALL:         { color: T.green,    icon: <IconAll /> },
  SKINCARE:    { color: "#c8956c",  icon: <IconSkincare /> },
  HAIRCARE:    { color: T.greenMid, icon: <IconHaircare /> },
  BABYCARE:    { color: "#e8c4b8",  icon: <IconBabycare /> },
  ACCESSORIES: { color: T.gold,     icon: <IconAccessories /> },
};

// ─────────────────────────────────────────────────────────────────────────────
// FLAT SVG CATEGORY ICONS
// ─────────────────────────────────────────────────────────────────────────────

function IconAll() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
      <circle cx="8"  cy="8"  r="5" fill="currentColor" opacity="0.9" />
      <circle cx="20" cy="8"  r="5" fill="currentColor" opacity="0.6" />
      <circle cx="8"  cy="20" r="5" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="20" r="5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function IconSkincare() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
      {/* cream jar */}
      <rect x="5" y="12" width="18" height="12" rx="4" fill="currentColor" opacity="0.85" />
      <rect x="4" y="9"  width="20" height="5"  rx="2.5" fill="currentColor" />
      <ellipse cx="14" cy="14" rx="4" ry="2" fill="white" opacity="0.35" />
      {/* drop */}
      <path d="M14 2 Q16 5 14 8 Q12 5 14 2Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function IconHaircare() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
      {/* bottle */}
      <rect x="9" y="10" width="10" height="15" rx="4" fill="currentColor" opacity="0.85" />
      <rect x="11" y="6" width="6"  height="6"  rx="2" fill="currentColor" opacity="0.7" />
      <rect x="12" y="3" width="4"  height="4"  rx="1.5" fill="currentColor" />
      <ellipse cx="11" cy="16" rx="2" ry="5" fill="white" opacity="0.25" />
      {/* leaf */}
      <ellipse cx="23" cy="8" rx="4" ry="7" fill="currentColor" opacity="0.45" transform="rotate(30,23,8)" />
    </svg>
  );
}

function IconBabycare() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
      {/* star */}
      <path d="M14 3 L16 10 L23 10 L17.5 14.5 L19.5 21.5 L14 17 L8.5 21.5 L10.5 14.5 L5 10 L12 10Z"
        fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function IconAccessories() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
      {/* sparkle / wand */}
      <line x1="14" y1="2"  x2="14" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <line x1="2"  y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <line x1="5"  y1="5"  x2="23" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <line x1="23" y1="5"  x2="5"  y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <circle cx="14" cy="14" r="3.5" fill="currentColor" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DECORATIVE SVG — page header botanical strip
// ─────────────────────────────────────────────────────────────────────────────
const HeaderBotanical = () => (
  <svg viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-2xl mx-auto opacity-20 pointer-events-none select-none"
    aria-hidden="true">
    {/* Left branch */}
    <path d="M50 100 Q120 60 180 80 Q220 95 260 70" stroke="#1a3a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <ellipse cx="130" cy="62" rx="22" ry="12" fill="#2d5a47" transform="rotate(-30,130,62)" />
    <ellipse cx="175" cy="74" rx="18" ry="10" fill="#4a9a6b" transform="rotate(-10,175,74)" />
    <ellipse cx="90"  cy="80" rx="16" ry="9"  fill="#2d5a47" transform="rotate(-50,90,80)" />
    {/* Right branch */}
    <path d="M750 100 Q680 60 620 80 Q580 95 540 70" stroke="#1a3a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <ellipse cx="670" cy="62" rx="22" ry="12" fill="#2d5a47" transform="rotate(30,670,62)" />
    <ellipse cx="625" cy="74" rx="18" ry="10" fill="#4a9a6b" transform="rotate(10,625,74)" />
    <ellipse cx="710" cy="80" rx="16" ry="9"  fill="#2d5a47" transform="rotate(50,710,80)" />
    {/* Center flowers */}
    {[340, 400, 460].map((x, i) => (
      <g key={i} transform={`translate(${x}, 55)`}>
        <circle cx="0" cy="0" r="7" fill="#d4af37" opacity="0.9" />
        {[0, 60, 120, 180, 240, 300].map(a => (
          <ellipse key={a}
            cx={Math.cos(a * Math.PI / 180) * 12}
            cy={Math.sin(a * Math.PI / 180) * 12}
            rx="5" ry="7" fill="#f0d060" opacity="0.7"
            transform={`rotate(${a},${Math.cos(a * Math.PI / 180) * 12},${Math.sin(a * Math.PI / 180) * 12})`}
          />
        ))}
      </g>
    ))}
    {/* Sparkles */}
    {[{x:310,y:30},{x:490,y:28},{x:400,y:18}].map((s,i) => (
      <g key={i} transform={`translate(${s.x},${s.y})`}>
        <line x1="-8" y1="0" x2="8" y2="0" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <line x1="0" y1="-8" x2="0" y2="8" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      </g>
    ))}
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// SVG — empty cart illustration
// ─────────────────────────────────────────────────────────────────────────────
const EmptyCartIllustration = () => (
  <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36 mx-auto mb-4" aria-hidden="true">
    {/* bag body */}
    <rect x="30" y="70" width="140" height="95" rx="18" fill="#f5f0e8" />
    <rect x="30" y="70" width="140" height="95" rx="18" stroke="#1a3a2e" strokeWidth="2.5" strokeOpacity="0.15" />
    {/* bag handles */}
    <path d="M70 70 Q70 38 100 38 Q130 38 130 70" stroke="#1a3a2e" strokeWidth="3" strokeLinecap="round" fill="none" strokeOpacity="0.25" />
    {/* sad face */}
    <circle cx="85"  cy="118" r="6" fill="#1a3a2e" opacity="0.2" />
    <circle cx="115" cy="118" r="6" fill="#1a3a2e" opacity="0.2" />
    <path d="M85 140 Q100 132 115 140" stroke="#1a3a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.2" />
    {/* leaves */}
    <ellipse cx="22" cy="88" rx="12" ry="20" fill="#4a9a6b" opacity="0.5" transform="rotate(-35,22,88)" />
    <ellipse cx="178" cy="95" rx="10" ry="18" fill="#6dbf82" opacity="0.45" transform="rotate(25,178,95)" />
    {/* sparkles */}
    <g transform="translate(160,60)">
      <line x1="-6" y1="0" x2="6" y2="0" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="-6" x2="0" y2="6" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
    </g>
    <circle cx="42" cy="60" r="4" fill="#d4af37" opacity="0.5" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// LAZY IMAGE — shows skeleton then fades in
// ─────────────────────────────────────────────────────────────────────────────
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-107 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{ transform: loaded ? "scale(1)" : "scale(0.97)" }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────────────────
const ProductCard = ({ product, index, quantity, onAddToCart, onUpdateQuantity, onWishlist, isWishlisted, onPurchaseNow }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const totalPrice = product.price * quantity;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 8) * 0.06 }}
    >
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.13)" }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group bg-white rounded-3xl overflow-hidden h-full flex flex-col"
        style={{ boxShadow: T.clay }}
      >
        {/* ── Image area ── */}
        <div className="relative overflow-hidden h-52 sm:h-56">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="w-full h-full"
          />

          {/* Gradient shimmer on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{ backgroundColor: CATEGORY_META[product.category]?.color || T.green, opacity: 0.92 }}
            >
              {product.category}
            </span>
          </div>

          {/* Wishlist button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onWishlist(product.id)}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <FaHeart className={`text-sm transition-colors ${isWishlisted ? "text-red-500" : "text-gray-300"}`} />
            </motion.div>
          </motion.button>
        </div>

        {/* ── Content ── */}
        <div className="p-5 flex flex-col flex-1">
          <h3
            className="font-bold text-base text-[#1a3a2e] mb-1 leading-snug line-clamp-2"
            style={{ fontFamily: T.fontDisplay }}
          >
            {product.name}
          </h3>
          <p className="text-[#1a3a2e]/55 text-xs mb-3 leading-relaxed line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Price — shows total if qty > 0 */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-bold text-[#1a3a2e]" style={{ fontFamily: T.fontDisplay }}>
              ₦{(quantity > 0 ? totalPrice : product.price).toLocaleString()}
            </span>
            {quantity > 1 && (
              <span className="text-xs text-[#1a3a2e]/45 line-through">
                ₦{product.price.toLocaleString()} each
              </span>
            )}
          </div>

          {/* Quantity stepper — only shows when qty > 0 */}
          <AnimatePresence>
            {quantity > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 mb-3 overflow-hidden"
              >
                <button
                  onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                  className="w-8 h-8 bg-[#1a3a2e]/8 hover:bg-[#1a3a2e]/15 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaMinus className="text-[10px] text-[#1a3a2e]" />
                </button>
                <motion.span
                  key={quantity}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  className="w-8 text-center font-bold text-[#1a3a2e] text-sm"
                >
                  {quantity}
                </motion.span>
                <button
                  onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                  className="w-8 h-8 bg-[#1a3a2e]/8 hover:bg-[#1a3a2e]/15 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaPlus className="text-[10px] text-[#1a3a2e]" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add to cart — only when qty = 0 */}
          <AnimatePresence mode="wait">
            {quantity === 0 && (
              <motion.button
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onAddToCart(product)}
                className="w-full py-2.5 bg-[#1a3a2e] text-white rounded-full font-semibold text-sm mb-2.5 flex items-center justify-center gap-2"
              >
                <FaShoppingCart className="text-xs" /> Add to Cart
              </motion.button>
            )}
          </AnimatePresence>

          {/* WhatsApp purchase — always visible */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#20b858" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPurchaseNow(product)}
            className="w-full py-2.5 bg-[#25D366] text-white rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <FaWhatsapp /> Purchase Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CART SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
const CartSidebar = ({ cartItems, onClose, onUpdateQuantity, onRemove, getTotal, vendorPhone }) => {
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  const whatsappMessage = `Hello! I want to purchase:\n${cartItems
    .map(item => `• ${item.name} x${item.quantity} — ₦${(item.price * item.quantity).toLocaleString()}`)
    .join("\n")}\n\nTotal: ₦${getTotal().toLocaleString()}`;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/55 backdrop-blur-sm z-40"
      />

      {/* Panel */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className="fixed top-0 right-0 w-full max-w-sm sm:max-w-md bg-white h-full z-50 flex flex-col shadow-2xl"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a3a2e] rounded-2xl flex items-center justify-center">
              <FaShoppingCart className="text-[#d4af37] text-sm" />
            </div>
            <div>
              <h2 style={{ fontFamily: T.fontDisplay }} className="text-xl font-bold text-[#1a3a2e]">
                My Cart
              </h2>
              <p className="text-[#1a3a2e]/45 text-xs">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-stone-100 hover:bg-stone-200 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            <FaTimes className="text-[#1a3a2e] text-sm" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          <AnimatePresence>
            {cartItems.length > 0 ? (
              cartItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, height: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="flex gap-3 bg-stone-50 p-3 rounded-2xl"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 w-[72px] h-[72px] rounded-xl object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1a3a2e] text-sm leading-tight mb-1 truncate">{item.name}</p>
                    <p className="text-[#d4af37] font-bold text-sm">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"
                      >
                        <FaMinus className="text-[9px] text-[#1a3a2e]" />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center text-[#1a3a2e]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"
                      >
                        <FaPlus className="text-[9px] text-[#1a3a2e]" />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-auto text-red-400 hover:text-red-600 transition-colors p-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full pt-16 pb-8"
              >
                <EmptyCartIllustration />
                <p style={{ fontFamily: T.fontDisplay }} className="text-lg font-bold text-[#1a3a2e]/50 mb-1">
                  Your cart is empty
                </p>
                <p className="text-sm text-[#1a3a2e]/35 text-center">
                  Add some natural goodness to get started!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer — total + checkout */}
        {cartItems.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-100 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#1a3a2e]/60 font-medium">Total</span>
              <span style={{ fontFamily: T.fontDisplay }} className="text-2xl font-bold text-[#d4af37]">
                ₦{getTotal().toLocaleString()}
              </span>
            </div>
            <a
              href={`https://wa.me/${vendorPhone}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20b858] text-white py-3.5 px-6 rounded-full flex items-center justify-center gap-2.5 font-bold text-base transition-colors shadow-lg"
              style={{ boxShadow: "0 8px 24px rgba(37,211,102,0.35)" }}
            >
              <FaWhatsapp className="text-lg" /> Purchase via WhatsApp
            </a>
          </div>
        )}
      </motion.aside>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const TeeNaturalProducts = () => {
  const { state, dispatch, getTotal } = useCart();
  const cartItems = state.cartItems || [];

  const [cartOpen,          setCartOpen]          = useState(false);
  const [selectedCategory,  setSelectedCategory]  = useState("ALL");
  const [wishlist,          setWishlist]           = useState([]);
  const [searchQuery,       setSearchQuery]        = useState("");
  const [prevCartCount,     setPrevCartCount]      = useState(0);

  const VENDOR_PHONE = "2348055061699";
  const categories   = ["ALL", ...new Set(PRODUCTS.map(p => p.category))];
  const totalCartQty = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartBounce   = totalCartQty > prevCartCount;

  // ── Filtered + searched products
  const filteredProducts = PRODUCTS
    .filter(p => selectedCategory === "ALL" || p.category === selectedCategory)
    .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // ── Helpers
  const getQuantity     = id => (cartItems.find(i => i.id === id)?.quantity || 0);
  const toggleWishlist  = id => setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleAddToCart = product => {
    setPrevCartCount(totalCartQty);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleUpdateQuantity = (id, qty) => {
    setPrevCartCount(totalCartQty);
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: qty } });
  };

  const handleRemoveFromCart = id => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handlePurchaseNow = product => {
    const qty = getQuantity(product.id);
    const price = qty > 0 ? product.price * qty : product.price;
    const text  = qty > 0
      ? `Hi! I'd like to purchase *${product.name}* x${qty} for ₦${price.toLocaleString()}`
      : `Hi! I'd like to purchase *${product.name}* for ₦${product.price.toLocaleString()}`;
    window.open(`https://wa.me/${VENDOR_PHONE}?text=${encodeURIComponent(text)}`);
  };

  return (
    <div
      className="min-h-screen bg-stone-50 pt-20 pb-16"
      style={{ fontFamily: T.fontBody }}
    >

      {/* ══ PAGE HEADER ══════════════════════════════════════════════════════ */}
      <header className="text-center max-w-4xl mx-auto px-4 mb-10 pt-8">
        <HeaderBotanical />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            style={{ fontFamily: T.fontDisplay }}
            className="text-4xl sm:text-5xl md:text-6xl text-[#1a3a2e] mb-3 leading-tight"
          >
            Our Best Selling{" "}
            <span className="text-[#d4af37]">Products</span>
          </h1>
          <p className="text-[#1a3a2e]/60 text-base sm:text-lg">
            Discover nature's finest — all 100% natural
          </p>
        </motion.div>
      </header>

      {/* ══ SEARCH + FILTERS ═════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative max-w-md mx-auto mb-6"
        >
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a3a2e]/35 text-sm" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-10 pr-4 py-3 bg-white rounded-full text-sm text-[#1a3a2e] placeholder-[#1a3a2e]/35 outline-none focus:ring-2 focus:ring-[#d4af37]/50 transition-shadow"
            style={{ boxShadow: T.clay }}
          />
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2.5"
        >
          {categories.map((cat, i) => {
            const isActive = selectedCategory === cat;
            const meta = CATEGORY_META[cat];
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  isActive
                    ? "text-white shadow-md"
                    : "bg-white text-[#1a3a2e] hover:bg-[#1a3a2e]/5"
                }`}
                style={{
                  backgroundColor: isActive ? T.green : undefined,
                  boxShadow: isActive ? `0 4px 16px rgba(26,58,46,0.3)` : T.clay,
                }}
              >
                <span className={isActive ? "text-[#d4af37]" : "text-[#1a3a2e]/50"}>
                  {meta?.icon}
                </span>
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Result count */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-[#1a3a2e]/40 text-xs mt-4"
          >
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ══ PRODUCT GRID ═════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 md:px-6">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
            >
              {filteredProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  quantity={getQuantity(product.id)}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                  onPurchaseNow={handlePurchaseNow}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <EmptyCartIllustration />
              <p style={{ fontFamily: T.fontDisplay }} className="text-xl text-[#1a3a2e]/50">
                No products found
              </p>
              <p className="text-sm text-[#1a3a2e]/35 mt-2">
                Try a different search or category
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ══ FLOATING CART BUTTON ═════════════════════════════════════════════ */}
      <motion.button
        onClick={() => setCartOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        animate={cartBounce ? { scale: [1, 1.2, 0.95, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 0.45 }}
        className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 bg-[#d4af37] w-14 h-14 sm:w-16 sm:h-16 rounded-full text-[#1a3a2e] flex items-center justify-center z-30"
        style={{ boxShadow: "0 8px 32px rgba(212,175,55,0.5), 0 2px 8px rgba(0,0,0,0.12)" }}
        aria-label={`Open cart — ${totalCartQty} items`}
      >
        {/* Pulse ring when items in cart */}
        {totalCartQty > 0 && (
          <motion.span
            className="absolute inset-0 rounded-full bg-[#d4af37]"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <FaShoppingCart className="text-lg relative z-10" />
        <AnimatePresence>
          {totalCartQty > 0 && (
            <motion.span
              key={totalCartQty}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1.5 -right-1.5 bg-[#1a3a2e] text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 text-[10px] sm:text-xs flex items-center justify-center font-bold z-10"
            >
              {totalCartQty}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ══ CART SIDEBAR ═════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {cartOpen && (
          <CartSidebar
            cartItems={cartItems}
            onClose={() => setCartOpen(false)}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
            getTotal={getTotal}
            vendorPhone={VENDOR_PHONE}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default TeeNaturalProducts;