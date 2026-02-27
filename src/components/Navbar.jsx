/**
 * TeeNaturalNavbar.jsx
 * ─────────────────────────────────────────────────────────────────
 * Redesigned navbar for TeeNatural with:
 *  - SVG leaf/botanical illustrations woven into the logo area
 *  - SVG icon accents on each nav link
 *  - Animated scroll-aware background (transparent → frosted green)
 *  - Mobile drawer: full-screen slide-in with illustrated header panel
 *  - Cart badge with pulse ring animation
 *  - Active route highlighting
 *  - All original functionality preserved
 *
 * Dependencies: framer-motion, react-icons/fa, react-router-dom
 * Cart context: ../context/CartContext
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaShoppingBag, FaLeaf } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  green:     "#1a3a2e",
  greenMid:  "#2d5a47",
  gold:      "#d4af37",
  goldLight: "#f0d060",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody:    "'Plus Jakarta Sans', sans-serif",
};

// ─────────────────────────────────────────────────────────────────────────────
// NAV LINKS DATA
// Each link has a flat SVG icon component
// ─────────────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  {
    name: "About",
    href: "/about",
    Icon: () => (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
        <circle cx="8" cy="5" r="3" fill="currentColor" opacity="0.9" />
        <path d="M2 14 Q2 10 8 10 Q14 10 14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: "Reviews",
    href: "/reviews",
    Icon: () => (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
        <path d="M8 2 L9.5 6H14 L10.5 8.5 L12 12.5 L8 10 L4 12.5 L5.5 8.5 L2 6 H6.5Z"
          fill="currentColor" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: "Contact Us",
    href: "/contact",
    Icon: () => (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
        <rect x="1" y="3" width="14" height="10" rx="3" fill="currentColor" opacity="0.8" />
        <path d="M1 5 L8 9.5 L15 5" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Consultation",
    href: "/consultation",
    Icon: () => (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
        {/* leaf */}
        <ellipse cx="8" cy="7" rx="5" ry="7" fill="currentColor" opacity="0.85" transform="rotate(-15,8,7)" />
        <line x1="8" y1="2" x2="8" y2="14" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Spa Bookings",
    href: "/spa-bookings",
    Icon: () => (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
        {/* flower */}
        <circle cx="8" cy="8" r="2.5" fill="currentColor" />
        {[0, 60, 120, 180, 240, 300].map(a => (
          <ellipse key={a}
            cx={8 + Math.cos(a * Math.PI / 180) * 4.5}
            cy={8 + Math.sin(a * Math.PI / 180) * 4.5}
            rx="2" ry="3" fill="currentColor" opacity="0.55"
            transform={`rotate(${a}, ${8 + Math.cos(a * Math.PI / 180) * 4.5}, ${8 + Math.sin(a * Math.PI / 180) * 4.5})`}
          />
        ))}
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SVG ILLUSTRATIONS
// ─────────────────────────────────────────────────────────────────────────────

/** Tiny leaf sprigs flanking the logo text */
const LogoLeafLeft = () => (
  <svg viewBox="0 0 32 40" fill="none" className="w-6 h-8 flex-shrink-0" aria-hidden="true">
    <path d="M16 38 Q16 20 8 10 Q4 5 10 2 Q18 5 20 18 Q22 28 16 38Z" fill="#4a9a6b" />
    <line x1="16" y1="38" x2="16" y2="8" stroke="#2d5a47" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 20 Q10 16 8 10" stroke="#2d5a47" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
    <path d="M16 28 Q20 22 20 16" stroke="#2d5a47" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
  </svg>
);

const LogoLeafRight = () => (
  <svg viewBox="0 0 32 40" fill="none" className="w-6 h-8 flex-shrink-0" aria-hidden="true">
    <path d="M16 38 Q16 20 24 10 Q28 5 22 2 Q14 5 12 18 Q10 28 16 38Z" fill="#6dbf82" />
    <line x1="16" y1="38" x2="16" y2="8" stroke="#4a9a6b" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 20 Q22 16 24 10" stroke="#4a9a6b" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
    <path d="M16 28 Q12 22 12 16" stroke="#4a9a6b" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
  </svg>
);

/** Decorative botanical strip inside the mobile drawer header */
const DrawerHeaderIllustration = () => (
  <svg viewBox="0 0 360 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
    aria-hidden="true"
  >
    {/* Left branch */}
    <path d="M0 80 Q50 50 100 65 Q130 75 160 55" stroke="#d4af37" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <ellipse cx="55"  cy="52" rx="16" ry="9" fill="#4a9a6b" transform="rotate(-30,55,52)" />
    <ellipse cx="100" cy="62" rx="13" ry="7" fill="#6dbf82" transform="rotate(-12,100,62)" />
    <ellipse cx="28"  cy="68" rx="12" ry="6" fill="#2d5a47" transform="rotate(-45,28,68)" />

    {/* Right branch */}
    <path d="M360 80 Q310 50 260 65 Q230 75 200 55" stroke="#d4af37" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <ellipse cx="305" cy="52" rx="16" ry="9" fill="#4a9a6b" transform="rotate(30,305,52)" />
    <ellipse cx="260" cy="62" rx="13" ry="7" fill="#6dbf82" transform="rotate(12,260,62)" />
    <ellipse cx="332" cy="68" rx="12" ry="6" fill="#2d5a47" transform="rotate(45,332,68)" />

    {/* Center flowers */}
    {[160, 200, 240].map((x, i) => (
      <g key={i} transform={`translate(${x},38)`}>
        <circle cx="0" cy="0" r="5" fill="#d4af37" opacity="0.9" />
        {[0, 60, 120, 180, 240, 300].map(a => (
          <ellipse key={a}
            cx={Math.cos(a * Math.PI / 180) * 9}
            cy={Math.sin(a * Math.PI / 180) * 9}
            rx="4" ry="5" fill="#f0d060" opacity="0.6"
            transform={`rotate(${a},${Math.cos(a*Math.PI/180)*9},${Math.sin(a*Math.PI/180)*9})`}
          />
        ))}
      </g>
    ))}

    {/* Sparkles */}
    {[{x:140,y:18},{x:220,y:15},{x:300,y:30},{x:62,y:30}].map((s, i) => (
      <g key={i} transform={`translate(${s.x},${s.y})`}>
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      </g>
    ))}
  </svg>
);

/** Small floating leaf accent on the desktop nav bar */
const NavAccentLeaf = () => (
  <svg viewBox="0 0 20 28" fill="none" className="w-4 h-5 opacity-30 pointer-events-none" aria-hidden="true">
    <ellipse cx="10" cy="13" rx="8" ry="13" fill="#6dbf82" />
    <line x1="10" y1="2" x2="10" y2="26" stroke="#2d5a47" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN NAVBAR COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const TeeNaturalNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const location = useLocation();

  const { state } = useCart();
  const cartCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Scroll listener — changes navbar opacity/blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = href => location.pathname === href;

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          MAIN NAV BAR
      ════════════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-400 ${
          scrolled
            ? "bg-[#1a3a2e]/98 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.3)] py-2.5"
            : "bg-[#1a3a2e]/90 backdrop-blur-md py-3 sm:py-4"
        }`}
        style={{ fontFamily: T.fontBody }}
      >
        {/* Subtle gold bottom border line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* ── LOGO ── */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2" aria-label="TeeNatural home">

              {/* Left leaf sprig — hidden on very small screens */}
              <motion.div
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="hidden xs:block sm:block"
              >
                <LogoLeafLeft />
              </motion.div>

              {/* Logo image */}
              <motion.img
                src="/favicon.jpg"
                alt="Tee Natural & Essentials logo"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-[#d4af37]/40 flex-shrink-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />

              {/* Brand name */}
              <div
                style={{ fontFamily: T.fontDisplay }}
                className="text-white font-bold leading-tight"
              >
                <span className="text-base sm:text-lg md:text-xl">Tee Natural</span>
                <span className="text-[#d4af37] mx-0.5">&</span>
                {/* "Essentials" hidden on mobile to save space */}
                <span className="hidden sm:inline text-base sm:text-lg md:text-xl">Essentials</span>
                <span className="sm:hidden text-base">Essentials</span>
              </div>

              {/* Right leaf sprig */}
              <motion.div
                animate={{ rotate: [0, -3, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="hidden xs:block sm:block"
              >
                <LogoLeafRight />
              </motion.div>
            </Link>
          </motion.div>

          {/* ── DESKTOP NAV LINKS ── */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {/* Decorative leaf accent */}
            <NavAccentLeaf />

            {NAV_LINKS.map((link, i) => (
              <Link key={i} to={link.href} className="relative group px-3 py-2">
                <span className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href) ? "text-[#d4af37]" : "text-white/85 group-hover:text-[#d4af37]"
                }`}>
                  <span className={`transition-colors ${isActive(link.href) ? "text-[#d4af37]" : "text-white/40 group-hover:text-[#d4af37]"}`}>
                    <link.Icon />
                  </span>
                  {link.name}
                </span>
                {/* Animated underline */}
                <motion.span
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#d4af37] rounded-full origin-left"
                  initial={{ scaleX: isActive(link.href) ? 1 : 0 }}
                  animate={{ scaleX: isActive(link.href) ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.25 }}
                />
              </Link>
            ))}

            <NavAccentLeaf />
          </div>

          {/* ── DESKTOP RIGHT ACTIONS ── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(212,175,55,0.45)" }}
                whileTap={{ scale: 0.96 }}
                className="bg-[#d4af37] text-[#1a3a2e] px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg"
              >
                <FaShoppingBag className="text-xs" />
                Shop Now
                {cartCount > 0 && (
                  <span className="bg-[#1a3a2e] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </Link>
          </div>

          {/* ── MOBILE RIGHT — cart badge + hamburger ── */}
          <div className="flex lg:hidden items-center gap-2 flex-shrink-0">

            {/* Mobile cart shortcut */}
            <Link to="/products" aria-label={`Shop — ${cartCount} items in cart`}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative w-9 h-9 sm:w-10 sm:h-10 bg-[#d4af37] rounded-full flex items-center justify-center shadow-md"
              >
                <FaShoppingBag className="text-[#1a3a2e] text-sm" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-[#1a3a2e] text-white text-[9px] font-bold w-4.5 h-4.5 w-[18px] h-[18px] rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#d4af37]"
                    animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </motion.div>
            </Link>

            {/* Hamburger */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/15 rounded-full flex items-center justify-center transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="text-white text-base" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="text-white text-base" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

        </div>
      </motion.nav>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Drawer panel — slides in from top */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[60px] sm:top-[68px] left-3 right-3 sm:left-4 sm:right-4 bg-[#1a3a2e] rounded-2xl sm:rounded-3xl z-50 overflow-hidden border border-white/10 lg:hidden"
              style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)" }}
            >

              {/* ── Illustrated drawer header ── */}
              <div className="relative px-6 pt-6 pb-4 overflow-hidden border-b border-white/10">
                <DrawerHeaderIllustration />
                <div className="relative z-10 flex items-center gap-3">
                  <motion.img
                    src="/favicon.jpg"
                    alt="Tee Natural logo"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#d4af37]/50 flex-shrink-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  />
                  <div>
                    <p style={{ fontFamily: T.fontDisplay }} className="text-white font-bold text-lg leading-tight">
                      Tee Natural <span className="text-[#d4af37]">&</span> Essentials
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <FaLeaf className="text-[#4a9a6b] text-[10px]" />
                      <span className="text-white/45 text-xs">100% Natural Products</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Nav links ── */}
              <nav className="px-4 py-3" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.35 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 transition-all group ${
                        isActive(link.href)
                          ? "bg-[#d4af37]/15 text-[#d4af37]"
                          : "text-white/80 hover:bg-white/7 hover:text-white"
                      }`}
                    >
                      {/* Icon bubble */}
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive(link.href)
                          ? "bg-[#d4af37] text-[#1a3a2e]"
                          : "bg-white/10 text-white/60 group-hover:bg-white/15"
                      }`}>
                        <link.Icon />
                      </span>

                      <span className="font-medium text-sm sm:text-base flex-1">{link.name}</span>

                      {/* Active dot indicator */}
                      {isActive(link.href) && (
                        <motion.span
                          layoutId="activeDrawerDot"
                          className="w-1.5 h-1.5 rounded-full bg-[#d4af37] flex-shrink-0"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* ── Divider with leaf illustration ── */}
              <div className="relative flex items-center mx-6 mb-3">
                <div className="flex-1 h-px bg-white/10" />
                <div className="mx-3 text-[#d4af37]/40">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <ellipse cx="12" cy="11" rx="7" ry="11" fill="currentColor" opacity="0.6" />
                    <line x1="12" y1="2" x2="12" y2="22" stroke="#1a3a2e" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* ── CTA ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="px-4 pb-5"
              >
                <Link
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className="relative flex items-center justify-center gap-2.5 w-full bg-[#d4af37] hover:bg-[#c29d2f] text-[#1a3a2e] py-3.5 rounded-2xl font-bold text-base transition-colors overflow-hidden group"
                  style={{ boxShadow: "0 8px 24px rgba(212,175,55,0.4)" }}
                >
                  {/* Shimmer sweep on hover */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
                  />
                  <FaShoppingBag className="text-sm relative z-10" />
                  <span className="relative z-10">Shop Now</span>
                  {cartCount > 0 && (
                    <span className="relative z-10 bg-[#1a3a2e] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {cartCount} in cart
                    </span>
                  )}
                </Link>
              </motion.div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeeNaturalNavbar;