import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaLeaf, FaSpa, FaHeart, FaStar, FaShieldAlt, FaUserFriends, FaAward, FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import { GiHealthNormal, GiFlowerPot } from 'react-icons/gi';
import { Link } from 'react-router-dom';

// ── DESIGN TOKENS (matches landing page) ─────────────────────────────────────
const TOKEN = {
  green: "#1a3a2e", greenMid: "#2d5a47", gold: "#d4af37", goldLight: "#f0d060",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontAccent:  "'Cormorant Garamond', Georgia, serif",
  fontBody:    "'Plus Jakarta Sans', sans-serif",
  clayShadow:  "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
  cardShadow:  "0 4px 24px rgba(26,58,46,0.08), 0 1px 4px rgba(26,58,46,0.04)",
};

// ── SHARED UTILITIES ──────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}>
      {children}
    </motion.div>
  );
};

const ClayCard = ({ children, className = "" }) => (
  <div className={`bg-white rounded-[24px] border border-white/80 ${className}`}
    style={{ boxShadow: TOKEN.clayShadow }}>{children}</div>
);

const SectionLabel = ({ children, light = false }) => (
  <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-4
    ${light ? "bg-white/12 text-white/80 border border-white/20" : "bg-[#1a3a2e]/6 text-[#1a3a2e] border border-[#1a3a2e]/10"}`}>
    <FaLeaf className={`text-[9px] ${light ? "text-[#d4af37]" : "text-[#d4af37]"}`} />
    {children}
  </span>
);

// ── DATA ──────────────────────────────────────────────────────────────────────
const VALUES = [
  { icon: FaLeaf,        title: "Purity",                  desc: "Clean, natural, skin-loving ingredients. Every product crafted with honesty — free from harmful chemicals.", color: "#4a9a6b" },
  { icon: GiFlowerPot,   title: "Nature First",            desc: "Herbs and botanicals are at our heart. We honour traditional herbal knowledge in every formulation.",         color: "#2d5a47" },
  { icon: FaAward,       title: "Quality & Excellence",    desc: "Every product undergoes careful crafting, testing, and improvement for real results and real satisfaction.",   color: "#d4af37" },
  { icon: FaShieldAlt,   title: "Transparency",            desc: "We are open about what goes into our formulations and exactly how they work for your skin.",                  color: "#5b8fb9" },
  { icon: FaStar,        title: "Affordability",           desc: "Everyone deserves quality skincare — effective, premium, and still within reach for everyday life.",           color: "#e6a817" },
  { icon: FaHeart,       title: "Customer-Centred Care",   desc: "Our customers are our heart. We listen, learn, and improve based on their needs every single day.",           color: "#e06b6b" },
  { icon: FaUserFriends, title: "Education & Empowerment", desc: "We empower our community with knowledge to make healthier, more confident choices for their skin.",           color: "#9b72cf" },
  { icon: GiHealthNormal,title: "Consistency",             desc: "Consistent mission, consistent quality, consistent dedication. Every product reflects our long-term commitment.", color: "#1a3a2e" },
];

const MILESTONES = [
  { year: "2020", title: "Founded",           desc: "Started our journey with a passion for natural beauty and a deep respect for herbs." },
  { year: "2021", title: "1,000+ Customers",  desc: "Reached our first thousand happy, glowing customers across Nigeria." },
  { year: "2022", title: "Expanded Range",    desc: "Launched our full haircare line alongside our beloved skincare collection." },
  { year: "2023", title: "Going Green",       desc: "Committed to 100% eco-friendly packaging across all product lines." },
  { year: "2024", title: "10,000+ Customers", desc: "Now serving tens of thousands of customers who trust our natural promise." },
];

const STATS = [
  { number: "10K+",  label: "Happy Customers" },
  { number: "50+",   label: "Natural Products" },
  { number: "100%",  label: "Natural Ingredients" },
  { number: "4.9★",  label: "Average Rating" },
];

// ── PAGE ──────────────────────────────────────────────────────────────────────
const TeeNaturalAbout = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden" style={{ fontFamily: TOKEN.fontBody }}>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] bg-gradient-to-br from-[#1a3a2e] via-[#2d5a47] to-[#0f2318] overflow-hidden flex items-center"
        aria-label="About TeeNatural — Our Story">

        {/* background texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        {/* parallax blobs */}
        <motion.div style={{ y: y1 }} className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#d4af37]/8 rounded-full blur-3xl pointer-events-none" />
        <motion.div style={{ y: y2 }} className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-white/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT — copy */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}>
              <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <SectionLabel light>Natural Beauty, Naturally You</SectionLabel>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
                style={{ fontFamily: TOKEN.fontDisplay }}
                className="text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-[1.05] mb-6">
                Our<br/><span className="text-[#d4af37]">Story</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                className="text-white/75 text-base sm:text-lg leading-relaxed mb-5">
                Tee Naturals and Essentials is a proudly nature-inspired skincare and wellness brand dedicated to 
                creating safe, effective, high-quality products that enhance the skin's natural beauty. Built on 
                the foundation of herbal knowledge and purity, we harness the power of nature to promote healthy, 
                glowing, and well-nourished skin.
              </motion.p>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="text-white/55 text-sm sm:text-base leading-relaxed mb-10">
                Our formulations are crafted using carefully selected herbs and skin-loving ingredients known for 
                their healing, soothing, and revitalizing properties — delivering visible results while remaining 
                safe for all skin types, especially melanin-rich skin.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
                className="flex flex-col sm:flex-row gap-3">
                <Link to="/products">
                  <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(212,175,55,0.5)" }} whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 bg-[#d4af37] text-[#1a3a2e] px-7 py-3.5 rounded-full font-bold text-sm shadow-lg">
                    <FaShoppingBag /> Shop Our Products
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.12)" }}
                    className="flex items-center justify-center gap-2 border-2 border-white/40 text-white px-7 py-3.5 rounded-full font-semibold text-sm backdrop-blur-sm transition-colors">
                    Get in Touch <FaArrowRight className="text-xs" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT — image blob */}
            <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22,1,0.36,1] }}
              className="relative flex items-center justify-center">

              {/* glow behind image */}
              <div className="absolute w-[80%] aspect-square rounded-full bg-[#d4af37]/15 blur-3xl" />

              <motion.div animate={{ y: [0,-16,0], rotate: [-1,1,-1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full max-w-sm mx-auto">
                <div className="aspect-square bg-gradient-to-br from-[#2d5a47] to-[#1a3a2e] rounded-[40%_60%_65%_35%/45%_50%_55%_50%] overflow-hidden shadow-2xl border border-white/10">
                  <img src="/ref.png" alt="TeeNatural natural skincare products"
                    className="w-full h-full object-cover mix-blend-luminosity opacity-90" />
                </div>

                {/* floating badge */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center shadow-xl z-20"
                  style={{ boxShadow: "0 8px 32px rgba(212,175,55,0.5)" }}>
                  <div className="text-center text-[#1a3a2e]">
                    <GiFlowerPot className="text-2xl mx-auto mb-0.5" />
                    <div className="text-[10px] font-bold leading-tight">100%<br/>Natural</div>
                  </div>
                </motion.div>

                {/* floating info pill */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
                  className="absolute -left-4 top-1/3 bg-white/95 backdrop-blur-xl rounded-2xl px-3 py-2.5 border border-white/80 z-20"
                  style={{ boxShadow: TOKEN.clayShadow }}>
                  <div className="text-[9px] text-[#1a3a2e]/40 font-medium mb-1 uppercase tracking-wide">Since</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#d4af37]">🌿</span>
                    <span className="text-sm font-bold text-[#1a3a2e]">2020</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══ STATS ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1a3a2e] py-12 px-4 sm:px-6" aria-label="Brand statistics">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {STATS.map((s, i) => (
            <FadeUp key={i} delay={i * 0.1} className="text-center">
              <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-3xl sm:text-4xl font-bold text-[#d4af37] mb-1">{s.number}</div>
              <div className="text-white/50 text-xs sm:text-sm">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </section>


      {/* ══ MISSION ══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white" aria-label="Our mission">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <SectionLabel>Our Purpose</SectionLabel>
            <h2 style={{ fontFamily: TOKEN.fontDisplay }}
              className="text-4xl sm:text-5xl font-bold text-[#1a3a2e] mt-1">
              Our <span className="text-[#d4af37]">Mission</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative rounded-[28px] overflow-hidden" style={{ boxShadow: TOKEN.cardShadow }}>
              {/* gold top stripe */}
              <div className="h-1 w-full bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#d4af37]" />
              <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-8 sm:p-12 md:p-16">
                <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
                  {/* big quote mark */}
                  <div className="md:col-span-3 mb-2">
                    <span style={{ fontFamily: TOKEN.fontAccent }} className="text-8xl text-[#d4af37]/20 leading-none block -mb-8">"</span>
                  </div>
                  <div className="md:col-span-2 space-y-5">
                    <p className="text-[#1a3a2e]/80 text-base sm:text-lg leading-relaxed">
                      Our journey began with a desire to offer skincare solutions that people can trust. Many individuals 
                      struggle with harsh chemical products that do more harm than good. Tee Naturals was created to change 
                      that narrative — providing natural alternatives that are both effective and affordable.
                    </p>
                    <p className="text-[#1a3a2e]/70 text-sm sm:text-base leading-relaxed">
                      From exfoliating soaps and nourishing serums to hydrating gels and body essentials, every product 
                      reflects our unwavering commitment to nature-based skincare, transparency, handcrafted excellence, 
                      and customer satisfaction.
                    </p>
                  </div>
                  <div className="md:col-span-1">
                    <div className="bg-[#1a3a2e] rounded-2xl p-6 text-white">
                      <FaLeaf className="text-[#d4af37] text-xl mb-4" />
                      <p style={{ fontFamily: TOKEN.fontAccent }} className="text-lg italic leading-relaxed text-white/85">
                        "To empower individuals to embrace their natural beauty through products inspired by the earth."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>


      {/* ══ VALUES ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-stone-50" aria-label="Our values">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-14">
            <SectionLabel>What We Stand For</SectionLabel>
            <h2 style={{ fontFamily: TOKEN.fontDisplay }}
              className="text-4xl sm:text-5xl font-bold text-[#1a3a2e] mt-1 mb-4">
              Our <span className="text-[#d4af37]">Values</span>
            </h2>
            <p className="text-[#1a3a2e]/55 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Our values guide every product we create and every decision we make — reflecting who we are 
              and the impact we aim to make in natural skincare.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {VALUES.map((v, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260 }}>
                  <ClayCard className="p-6 h-full group cursor-default">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 280 }}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 flex-shrink-0"
                      style={{ backgroundColor: v.color + "18", border: `1px solid ${v.color}30` }}>
                      <v.icon className="text-xl" style={{ color: v.color }} />
                    </motion.div>
                    <h3 style={{ fontFamily: TOKEN.fontDisplay }}
                      className="text-base font-bold text-[#1a3a2e] mb-2">{v.title}</h3>
                    <p className="text-[#1a3a2e]/55 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
                  </ClayCard>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>


      {/* ══ TIMELINE ═════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] relative overflow-hidden"
        aria-label="Our journey">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <FadeUp className="text-center mb-16">
            <SectionLabel light>Since 2020</SectionLabel>
            <h2 style={{ fontFamily: TOKEN.fontDisplay }}
              className="text-4xl sm:text-5xl font-bold text-white mt-1 mb-3">
              Our <span className="text-[#d4af37]">Journey</span>
            </h2>
            <p className="text-white/45 text-sm">Milestones that shaped who we are today</p>
          </FadeUp>

          {/* Timeline */}
          <div className="relative">
            {/* vertical line — desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4af37]/60 via-[#d4af37]/20 to-transparent -translate-x-1/2 hidden md:block" />

            <div className="space-y-8 md:space-y-10">
              {MILESTONES.map((m, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>

                    {/* card */}
                    <div className={`w-full md:w-[calc(50%-32px)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}>
                      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 260 }}>
                        <ClayCard className="p-5 sm:p-6">
                          <div style={{ fontFamily: TOKEN.fontDisplay }}
                            className="text-2xl sm:text-3xl font-bold text-[#d4af37] mb-1">{m.year}</div>
                          <h3 style={{ fontFamily: TOKEN.fontDisplay }}
                            className="text-base sm:text-lg font-bold text-[#1a3a2e] mb-1.5">{m.title}</h3>
                          <p className="text-[#1a3a2e]/60 text-xs sm:text-sm leading-relaxed">{m.desc}</p>
                        </ClayCard>
                      </motion.div>
                    </div>

                    {/* center dot */}
                    <div className="hidden md:flex w-16 flex-shrink-0 items-center justify-center">
                      <motion.div whileHover={{ scale: 1.4 }}
                        className="w-5 h-5 rounded-full bg-[#d4af37] border-4 border-[#1a3a2e] shadow-lg"
                        style={{ boxShadow: "0 0 16px rgba(212,175,55,0.6)" }} />
                    </div>

                    {/* spacer */}
                    <div className="hidden md:block w-[calc(50%-32px)]" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══ FOUNDER ══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white" aria-label="Meet our founder">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <SectionLabel>The Person Behind the Brand</SectionLabel>
            <h2 style={{ fontFamily: TOKEN.fontDisplay }}
              className="text-4xl sm:text-5xl font-bold text-[#1a3a2e] mt-1">
              Meet Our <span className="text-[#d4af37]">Founder</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-[32px] overflow-hidden border border-stone-100"
              style={{ boxShadow: "0 16px 64px rgba(26,58,46,0.10), 0 4px 16px rgba(26,58,46,0.06)" }}>
              <div className="grid md:grid-cols-5">

                {/* image panel */}
                <div className="md:col-span-2 relative bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] min-h-[320px] md:min-h-0">
                  <motion.img whileHover={{ scale: 1.04 }} transition={{ duration: 0.5 }}
                    src="/favicon.jpg" alt="Ibrahim Fatimah Ohunene — Founder of TeeNatural"
                    className="w-full h-full object-cover absolute inset-0" />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a3a2e]/70 via-transparent to-transparent" />

                  {/* name overlay on mobile */}
                  <div className="absolute bottom-4 left-4 md:hidden">
                    <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-white text-xl font-bold">Ibrahim Fatimah Ohunene</div>
                    <div className="text-[#d4af37] text-xs font-semibold mt-0.5">Founder & Creative Director</div>
                  </div>

                  {/* spinning badge */}
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute top-4 right-4 w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-center text-[#1a3a2e]">
                      <FaSpa className="text-lg mx-auto" />
                      <div className="text-[7px] font-bold leading-tight">Natural</div>
                    </div>
                  </motion.div>
                </div>

                {/* content panel */}
                <div className="md:col-span-3 p-7 sm:p-10 md:p-12">
                  <div className="hidden md:block mb-5">
                    <h3 style={{ fontFamily: TOKEN.fontDisplay }}
                      className="text-3xl sm:text-4xl font-bold text-[#1a3a2e] mb-1">Ibrahim Fatimah Ohunene</h3>
                    <div className="text-[#d4af37] font-semibold text-base">Founder & Creative Director</div>
                  </div>

                  {/* decorative quote mark */}
                  <span style={{ fontFamily: TOKEN.fontAccent }} className="text-6xl text-[#d4af37]/20 leading-none block -mb-4">"</span>

                  <div className="space-y-4 text-[#1a3a2e]/65 text-sm sm:text-base leading-relaxed">
                    <p>
                      Ibrahim Fatimah Ohunene is the passionate mind behind Tee Naturals and Essentials — a skincare 
                      and wellness brand inspired by nature, purity, and the healing power of herbs. With deep-rooted 
                      knowledge of traditional herbal remedies, Fatimah has dedicated her journey to creating gentle, 
                      effective skincare solutions that enhance natural beauty.
                    </p>
                    <p>
                      Her love for herbal wellness began at a young age, shaped by her exposure to plants and natural 
                      treatments. This curiosity grew into strong expertise — leading her to research, study, and master 
                      the benefits of various herbs, giving Tee Naturals and Essentials its authentic foundation.
                    </p>
                    <p>
                      Fatimah created Tee Naturals to bridge the gap between quality natural skincare and everyday 
                      accessibility. She believes everyone deserves safe, skin-loving products without harsh chemicals. 
                      Each product is thoughtfully crafted to nourish, restore, and protect the skin.
                    </p>
                  </div>

                  {/* value pills */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {["Herbal Knowledge", "Skin-First Formulas", "Community Education", "Transparency"].map((tag, i) => (
                      <span key={i}
                        className="bg-[#1a3a2e]/6 text-[#1a3a2e] text-[11px] font-semibold px-3 py-1.5 rounded-full border border-[#1a3a2e]/8">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>


      {/* ══ CTA ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#1a3a2e] via-[#2d5a47] to-[#1a3a2e] relative overflow-hidden"
        aria-label="Join TeeNatural">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeUp>
            <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
              style={{ boxShadow: "0 0 48px rgba(212,175,55,0.5)" }}>
              <FaHeart className="text-2xl text-[#1a3a2e]" />
            </motion.div>

            <h2 style={{ fontFamily: TOKEN.fontDisplay }}
              className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Join Our Natural<br/>Beauty Journey
            </h2>
            <p className="text-white/60 text-sm sm:text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Experience the difference that pure, natural ingredients can make for your skin — 
              trusted by over 10,000 customers across Nigeria.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/products">
                <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 48px rgba(212,175,55,0.65)" }} whileTap={{ scale: 0.96 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#d4af37] text-[#1a3a2e] px-8 py-4 rounded-full font-bold text-base shadow-xl">
                  <FaShoppingBag /> Shop Now
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.10)" }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold text-base backdrop-blur-sm transition-colors">
                  Contact Us <FaArrowRight className="text-sm" />
                </motion.button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
};

export default TeeNaturalAbout;