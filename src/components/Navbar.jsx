/**
 * TeeNaturalNavbar.jsx
 *
 * EXPORTS:
 *   default → TeeNaturalNavbar   (the fixed navbar)
 *   named   → NavSpacer          (invisible 72px div — use once in your layout)
 *
 * HOW TO FIX THE HERO OVERLAP — add NavSpacer once in App.jsx / Layout.jsx:
 *
 *   import TeeNaturalNavbar, { NavSpacer } from './components/TeeNaturalNavbar';
 *
 *   function Layout({ children }) {
 *     return (
 *       <>
 *         <TeeNaturalNavbar />
 *         <NavSpacer />        ← this one line fixes ALL pages
 *         {children}
 *         <Footer />
 *       </>
 *     );
 *   }
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
  green:       "#1a3a2e",
  gold:        "#d4af37",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody:    "'Plus Jakarta Sans', sans-serif",
};

// ─────────────────────────────────────────────────────────────────────────────
// NAV SPACER  — exported, drop once in your layout wrapper
// 72 px = navbar py-3 (12px × 2) + ~36px logo + 12px buffer
// ─────────────────────────────────────────────────────────────────────────────
export const NavSpacer = () => (
  <div aria-hidden="true" style={{ height: "72px", flexShrink: 0 }} />
);

// ─────────────────────────────────────────────────────────────────────────────
// NAV LINKS
// ─────────────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  {
    name: "About",
    href: "/about",
    Icon: () => (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        <circle cx="8" cy="5" r="3" fill="currentColor" opacity="0.9" />
        <path d="M2 14 Q2 10 8 10 Q14 10 14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: "Reviews",
    href: "/reviews",
    Icon: () => (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M8 2 L9.5 6H14 L10.5 8.5 L12 12.5 L8 10 L4 12.5 L5.5 8.5 L2 6 H6.5Z" fill="currentColor" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: "Contact Us",
    href: "/contact",
    Icon: () => (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        <rect x="1" y="3" width="14" height="10" rx="3" fill="currentColor" opacity="0.8" />
        <path d="M1 5 L8 9.5 L15 5" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Consultation",
    href: "/consultation",
    Icon: () => (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        <ellipse cx="8" cy="7" rx="5" ry="7" fill="currentColor" opacity="0.85" transform="rotate(-15,8,7)" />
        <line x1="8" y1="2" x2="8" y2="14" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Spa Bookings",
    href: "/spa-bookings",
    Icon: () => (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
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
// SVG DECORATIONS
// ─────────────────────────────────────────────────────────────────────────────
const LogoLeafLeft = () => (
  <svg viewBox="0 0 32 40" fill="none" className="w-5 h-7 flex-shrink-0" aria-hidden="true">
    <path d="M16 38 Q16 20 8 10 Q4 5 10 2 Q18 5 20 18 Q22 28 16 38Z" fill="#4a9a6b" />
    <line x1="16" y1="38" x2="16" y2="8" stroke="#2d5a47" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 20 Q10 16 8 10" stroke="#2d5a47" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
    <path d="M16 28 Q20 22 20 16" stroke="#2d5a47" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
  </svg>
);

const LogoLeafRight = () => (
  <svg viewBox="0 0 32 40" fill="none" className="w-5 h-7 flex-shrink-0" aria-hidden="true">
    <path d="M16 38 Q16 20 24 10 Q28 5 22 2 Q14 5 12 18 Q10 28 16 38Z" fill="#6dbf82" />
    <line x1="16" y1="38" x2="16" y2="8" stroke="#4a9a6b" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 20 Q22 16 24 10" stroke="#4a9a6b" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
    <path d="M16 28 Q12 22 12 16" stroke="#4a9a6b" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
  </svg>
);

const DrawerIllustration = () => (
  <svg viewBox="0 0 360 100" fill="none"
    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" aria-hidden="true">
    <path d="M0 80 Q50 50 100 65 Q130 75 160 55" stroke="#d4af37" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <ellipse cx="55"  cy="52" rx="16" ry="9" fill="#4a9a6b" transform="rotate(-30,55,52)" />
    <ellipse cx="100" cy="62" rx="13" ry="7" fill="#6dbf82" transform="rotate(-12,100,62)" />
    <ellipse cx="28"  cy="68" rx="12" ry="6" fill="#2d5a47" transform="rotate(-45,28,68)" />
    <path d="M360 80 Q310 50 260 65 Q230 75 200 55" stroke="#d4af37" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <ellipse cx="305" cy="52" rx="16" ry="9" fill="#4a9a6b" transform="rotate(30,305,52)" />
    <ellipse cx="260" cy="62" rx="13" ry="7" fill="#6dbf82" transform="rotate(12,260,62)" />
    <ellipse cx="332" cy="68" rx="12" ry="6" fill="#2d5a47" transform="rotate(45,332,68)" />
    {[160, 200, 240].map((x, i) => (
      <g key={i} transform={`translate(${x},38)`}>
        <circle r="5" fill="#d4af37" opacity="0.9" />
        {[0,60,120,180,240,300].map(a => (
          <ellipse key={a}
            cx={Math.cos(a*Math.PI/180)*9} cy={Math.sin(a*Math.PI/180)*9}
            rx="4" ry="5" fill="#f0d060" opacity="0.6"
            transform={`rotate(${a},${Math.cos(a*Math.PI/180)*9},${Math.sin(a*Math.PI/180)*9})`}
          />
        ))}
      </g>
    ))}
    {[{x:140,y:18},{x:220,y:15},{x:300,y:30},{x:62,y:30}].map((s,i) => (
      <g key={i} transform={`translate(${s.x},${s.y})`}>
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      </g>
    ))}
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
const TeeNaturalNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { state } = useCart();
  const cartCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = href => location.pathname === href;

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          FIXED NAVBAR
          Layout: 3-column flex so links are always truly centred.
            [logo   → flex-1, justify-start ]
            [links  → flex-none             ]  ← always in the middle
            [actions→ flex-1, justify-end   ]
      ══════════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#1a3a2e]/98 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.3)] py-2"
            : "bg-[#1a3a2e]/92 backdrop-blur-md py-3"
        }`}
        style={{ fontFamily: T.fontBody }}
      >
        {/* gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">

          {/* ── COL 1: LOGO ───────────────────────────────────────────── */}
          <div className="flex-1 flex items-center justify-start">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link to="/" className="flex items-center gap-1 sm:gap-1.5" aria-label="TeeNatural — go home">

                <motion.div className="hidden sm:block"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  <LogoLeafLeft />
                </motion.div>

                <motion.img
                  src="/favicon.jpg" alt="TeeNatural logo"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-[#d4af37]/40 flex-shrink-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                />

                <span style={{ fontFamily: T.fontDisplay }}
                  className="text-white font-bold leading-tight whitespace-nowrap text-sm sm:text-base lg:text-[17px]">
                  Tee Natural
                  <span className="text-[#d4af37] mx-0.5">&</span>
                  Essentials
                </span>

                <motion.div className="hidden sm:block"
                  animate={{ rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                  <LogoLeafRight />
                </motion.div>

              </Link>
            </motion.div>
          </div>

          {/* ── COL 2: DESKTOP LINKS (hidden on mobile) ───────────────── */}
          <nav className="hidden lg:flex items-center flex-none" aria-label="Site pages">
            {NAV_LINKS.map((link, i) => (
              <Link key={i} to={link.href}
                className="relative group px-3 xl:px-4 py-2"
                aria-current={isActive(link.href) ? "page" : undefined}>

                <span className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive(link.href) ? "text-[#d4af37]" : "text-white/80 group-hover:text-[#d4af37]"
                }`}>
                  <span className={`transition-colors flex-shrink-0 ${
                    isActive(link.href) ? "text-[#d4af37]" : "text-white/35 group-hover:text-[#d4af37]"
                  }`}>
                    <link.Icon />
                  </span>
                  {link.name}
                </span>

                {/* animated underline */}
                <motion.span
                  className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4 h-0.5 bg-[#d4af37] rounded-full origin-left"
                  initial={{ scaleX: isActive(link.href) ? 1 : 0 }}
                  animate={{ scaleX: isActive(link.href) ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.22 }}
                />
              </Link>
            ))}
          </nav>

          {/* ── COL 3: ACTIONS ────────────────────────────────────────── */}
          <div className="flex-1 flex items-center justify-end gap-2">

            {/* Desktop — Shop Now */}
            <Link to="/products" className="hidden lg:block flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(212,175,55,0.45)" }}
                whileTap={{ scale: 0.96 }}
                className="bg-[#d4af37] text-[#1a3a2e] px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg whitespace-nowrap">
                <FaShoppingBag className="text-xs" />
                Shop Now
                {cartCount > 0 && (
                  <span className="bg-[#1a3a2e] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Mobile — cart icon */}
            <Link to="/products" className="flex lg:hidden flex-shrink-0"
              aria-label={`Shop — ${cartCount} item${cartCount !== 1 ? "s" : ""} in cart`}>
              <motion.div whileTap={{ scale: 0.9 }}
                className="relative w-9 h-9 bg-[#d4af37] rounded-full flex items-center justify-center shadow-md">
                <FaShoppingBag className="text-[#1a3a2e] text-sm" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span key={cartCount}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-[#1a3a2e] text-white text-[9px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
                {cartCount > 0 && (
                  <motion.span className="absolute inset-0 rounded-full bg-[#d4af37]"
                    animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} />
                )}
              </motion.div>
            </Link>

            {/* Mobile — hamburger */}
            <motion.button whileTap={{ scale: 0.88 }}
              onClick={() => setMenuOpen(v => !v)}
              className="flex lg:hidden w-9 h-9 bg-white/10 hover:bg-white/18 rounded-full items-center justify-center transition-colors flex-shrink-0"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer">
              <AnimatePresence mode="wait">
                {menuOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <FaTimes className="text-white text-base" />
                    </motion.div>
                  : <motion.div key="bars" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <FaBars className="text-white text-base" />
                    </motion.div>
                }
              </AnimatePresence>
            </motion.button>

          </div>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* panel — drops down from under navbar */}
            <motion.div
              id="mobile-drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-3 right-3 sm:left-4 sm:right-4 bg-[#1a3a2e] rounded-2xl sm:rounded-3xl z-50 overflow-hidden border border-white/10 lg:hidden"
              style={{
                top: "68px",   /* matches navbar height so drawer hugs the bottom edge */
                boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)"
              }}
            >
              {/* illustrated header */}
              <div className="relative px-6 pt-5 pb-4 overflow-hidden border-b border-white/10">
                <DrawerIllustration />
                <div className="relative z-10 flex items-center gap-3">
                  <motion.img src="/favicon.jpg" alt="TeeNatural"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#d4af37]/50 flex-shrink-0"
                    animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
                  <div>
                    <p style={{ fontFamily: T.fontDisplay }}
                      className="text-white font-bold text-lg leading-tight">
                      Tee Natural <span className="text-[#d4af37]">&</span> Essentials
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <FaLeaf className="text-[#4a9a6b] text-[10px]" aria-hidden="true" />
                      <span className="text-white/45 text-xs">100% Natural Products</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* links */}
              <nav className="px-4 py-3" aria-label="Mobile site pages">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.06, duration: 0.32 }}>
                    <Link to={link.href} onClick={() => setMenuOpen(false)}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 transition-all group ${
                        isActive(link.href)
                          ? "bg-[#d4af37]/15 text-[#d4af37]"
                          : "text-white/80 hover:bg-white/8 hover:text-white"
                      }`}>
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive(link.href)
                          ? "bg-[#d4af37] text-[#1a3a2e]"
                          : "bg-white/10 text-white/55 group-hover:bg-white/15"
                      }`}>
                        <link.Icon />
                      </span>
                      <span className="font-medium text-sm flex-1">{link.name}</span>
                      {isActive(link.href) && (
                        <motion.span layoutId="activeDrawerDot"
                          className="w-1.5 h-1.5 rounded-full bg-[#d4af37] flex-shrink-0" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* leaf divider */}
              <div className="flex items-center mx-6 mb-3">
                <div className="flex-1 h-px bg-white/10" />
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mx-3 text-[#d4af37]/40" aria-hidden="true">
                  <ellipse cx="12" cy="11" rx="7" ry="11" fill="currentColor" opacity="0.6" />
                  <line x1="12" y1="2" x2="12" y2="22" stroke="#1a3a2e" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Shop Now CTA */}
              <motion.div className="px-4 pb-5"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}>
                <Link to="/products" onClick={() => setMenuOpen(false)}
                  className="relative flex items-center justify-center gap-2.5 w-full bg-[#d4af37] hover:bg-[#c29d2f] text-[#1a3a2e] py-3.5 rounded-2xl font-bold text-base transition-colors overflow-hidden group"
                  style={{ boxShadow: "0 8px 24px rgba(212,175,55,0.4)" }}>
                  {/* shimmer on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none" />
                  <FaShoppingBag className="text-sm relative z-10" aria-hidden="true" />
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