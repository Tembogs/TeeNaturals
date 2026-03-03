import React, { useState, useRef, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FaWhatsapp, FaUserMd, FaLeaf, FaCheckCircle, FaHeart,
  FaSpa, FaInfoCircle, FaClock, FaComments, FaArrowRight, FaStar
} from 'react-icons/fa';
import { GiFlowerPot } from 'react-icons/gi';
import { Link } from 'react-router-dom';

// ── DESIGN TOKENS (matches whole site) ───────────────────────────────────────
const TOKEN = {
  green: "#1a3a2e", greenMid: "#2d5a47", gold: "#d4af37", goldLight: "#f0d060",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontAccent:  "'Cormorant Garamond', Georgia, serif",
  fontBody:    "'Plus Jakarta Sans', sans-serif",
  clayShadow:  "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
};

// ── SHARED UTILITIES ──────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}>
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
    <FaLeaf className="text-[9px] text-[#d4af37]" />
    {children}
  </span>
);

// ── DATA ──────────────────────────────────────────────────────────────────────
const CONSULTATIONS = [
  {
    id: 1,
    title: "Skincare",
    subtitle: "Consultation",
    duration: "45 minutes",
    fee: "₦10,000",
    icon: FaHeart,
    description: "Personalised skincare routine and product recommendations tailored to your unique skin.",
    includes: ["Skin type analysis", "Product recommendations", "Custom skincare routine", "Follow-up guidance"],
    accent: "#e06b6b",
    bg: "from-rose-500 to-pink-400",
  },
  {
    id: 2,
    title: "Hair Care",
    subtitle: "Consultation",
    duration: "45 minutes",
    fee: "₦12,000",
    icon: FaSpa,
    description: "Expert guidance for healthy, natural hair care and scalp wellness.",
    includes: ["Hair type assessment", "Natural hair care routine", "Product recommendations", "Scalp health analysis"],
    accent: "#9b72cf",
    bg: "from-purple-500 to-violet-400",
  },
  {
    id: 3,
    title: "Weight Management",
    subtitle: "Consultation",
    duration: "60 minutes",
    fee: "₦15,000",
    icon: FaLeaf,
    description: "Personalised weight gain or weight loss guidance using natural, holistic methods.",
    includes: ["Health assessment", "Custom nutrition plan", "Natural supplement advice", "Lifestyle recommendations"],
    accent: "#4a9a6b",
    bg: "from-emerald-500 to-green-400",
  },
  {
    id: 4,
    title: "Bridal Wellness",
    subtitle: "Consultation",
    duration: "60 minutes",
    fee: "₦11,000",
    icon: FaStar,
    description: "Complete wellness preparation plan so you glow from within on your special day.",
    includes: ["Skin & hair preparation", "Stress management tips", "Bridal glow routine", "Timeline planning"],
    accent: "#d4af37",
    bg: "from-amber-500 to-yellow-400",
  },
];

const BENEFITS = [
  { icon: FaUserMd,   title: "Expert Guidance",    desc: "Advice from certified natural wellness experts." },
  { icon: FaLeaf,     title: "Natural Solutions",  desc: "Holistic and natural approaches to beauty and wellness." },
  { icon: FaHeart,    title: "Personalised Care",  desc: "Customised recommendations built for you specifically." },
  { icon: FaComments, title: "Ongoing Support",    desc: "Continue the conversation with follow-up guidance." },
];

const STEPS = [
  { n: "01", title: "Choose Consultation", desc: "Select the consultation type that best fits your current needs." },
  { n: "02", title: "Pay Consultation Fee", desc: "Complete payment through our secure WhatsApp process." },
  { n: "03", title: "Connect on WhatsApp", desc: "Our expert reaches out to schedule and guide your session." },
];

// ── PAGE ──────────────────────────────────────────────────────────────────────
const ConsultationPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected]   = useState(null);

  const openModal = (c) => { setSelected(c); setShowModal(true); };

  const proceedToWhatsApp = () => {
    const msg = `Hi! I'd like to book a ${selected.title} ${selected.subtitle} (${selected.fee} · ${selected.duration}). Please let me know the next steps.`;
    window.open(`https://wa.me/2348055061699?text=${encodeURIComponent(msg)}`, '_blank');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden" style={{ fontFamily: TOKEN.fontBody }}>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[78vh] bg-gradient-to-br from-[#1a3a2e] via-[#2d5a47] to-[#0f2318] overflow-hidden flex items-center"
        aria-label="Expert Consultations">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        {/* decorative bg icons */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 text-[#d4af37]/10 text-[220px] pointer-events-none select-none">
          <FaUserMd />
        </motion.div>
        <motion.div animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 left-8 text-[#d4af37]/10 text-9xl pointer-events-none select-none">
          <FaLeaf />
        </motion.div>

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24 relative z-10 text-center w-full">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SectionLabel light>Natural Wellness Experts</SectionLabel>
          </motion.div>

          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: "backOut", delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
            style={{ boxShadow: "0 0 40px rgba(212,175,55,0.45)" }}>
            <FaUserMd className="text-3xl text-[#1a3a2e]" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{ fontFamily: TOKEN.fontDisplay }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-5 leading-[1.05]">
            Expert<br/><span className="text-[#d4af37]">Consultations</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="text-white/65 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Get personalised guidance from our natural wellness experts to help you achieve 
            your health and beauty goals — from the comfort of WhatsApp.
          </motion.p>

          <motion.a initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            href="#consultations">
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 36px rgba(212,175,55,0.55)" }} whileTap={{ scale: 0.96 }}
              className="bg-[#d4af37] text-[#1a3a2e] px-8 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-lg flex items-center gap-2 mx-auto">
              View Consultations <FaArrowRight className="text-xs" />
            </motion.button>
          </motion.a>
        </div>
      </section>


      {/* ══ NOTICE BANNER ════════════════════════════════════════════════════ */}
      <div className="relative z-20 -mt-8 px-4 sm:px-6">
        <FadeUp className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-[20px] p-5 sm:p-6 flex items-start gap-4"
            style={{ boxShadow: "0 8px 32px rgba(212,175,55,0.35)" }}>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <FaInfoCircle className="text-white text-base" />
            </div>
            <div>
              <h3 style={{ fontFamily: TOKEN.fontDisplay }} className="text-white font-bold text-lg mb-1">
                Consultation Fee Required
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                All consultations require a fee to ensure dedicated expert time. This covers professional advice, 
                personalised recommendations, and follow-up support. Payment is confirmed via WhatsApp before your session.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>


      {/* ══ CONSULTATION CARDS ═══════════════════════════════════════════════ */}
      <section id="consultations" className="py-20 sm:py-24 px-4 sm:px-6" aria-label="Consultation options">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-14">
            <SectionLabel>Pick What You Need</SectionLabel>
            <h2 style={{ fontFamily: TOKEN.fontDisplay }}
              className="text-4xl sm:text-5xl font-bold text-[#1a3a2e] mt-1 mb-4">
              Choose Your <span className="text-[#d4af37]">Consultation</span>
            </h2>
            <p className="text-[#1a3a2e]/50 max-w-xl mx-auto text-sm sm:text-base">
              Select the consultation that best fits your needs and connect with our experts instantly via WhatsApp.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {CONSULTATIONS.map((c, i) => {
              const Icon = c.icon;
              return (
                <FadeUp key={c.id} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260 }}
                    className="h-full">
                    <ClayCard className="overflow-hidden h-full flex flex-col group">

                      {/* coloured header */}
                      <div className={`bg-gradient-to-br ${c.bg} p-6 text-white text-center relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-10"
                          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                        <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: "spring", stiffness: 280 }}
                          className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 relative z-10">
                          <Icon className="text-2xl text-white" />
                        </motion.div>
                        <div className="relative z-10">
                          <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-xl font-bold leading-tight">{c.title}</div>
                          <div style={{ fontFamily: TOKEN.fontAccent }} className="text-base opacity-80 italic">{c.subtitle}</div>
                        </div>
                        <div className="flex items-center justify-center gap-3 mt-3 relative z-10">
                          <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-1 text-xs">
                            <FaClock className="text-[10px]" /> {c.duration}
                          </div>
                          <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-bold">{c.fee}</div>
                        </div>
                      </div>

                      {/* body */}
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-[#1a3a2e]/60 text-xs sm:text-sm leading-relaxed mb-4">{c.description}</p>

                        <div className="space-y-2 mb-5 flex-1">
                          <div className="text-[10px] font-bold text-[#1a3a2e]/40 uppercase tracking-wider mb-2">What's included</div>
                          {c.includes.map((item, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <FaCheckCircle className="text-[#4a9a6b] text-[11px] mt-0.5 flex-shrink-0" />
                              <span className="text-[#1a3a2e]/65 text-xs leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => openModal(c)}
                          className="w-full bg-[#1a3a2e] text-white py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:bg-[#2d5a47]"
                          style={{ boxShadow: "0 4px 16px rgba(26,58,46,0.25)" }}>
                          <FaWhatsapp className="text-base" /> Book via WhatsApp
                        </motion.button>
                      </div>
                    </ClayCard>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══ BENEFITS ═════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[#1a3a2e]" aria-label="Why book a consultation">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-14">
            <SectionLabel light>What You Gain</SectionLabel>
            <h2 style={{ fontFamily: TOKEN.fontDisplay }}
              className="text-4xl sm:text-5xl font-bold text-white mt-1">
              Why Book a <span className="text-[#d4af37]">Consultation?</span>
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 260 }}
                    className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-[22px] p-6 text-center h-full">
                    <motion.div whileHover={{ scale: 1.1, rotate: 6 }} transition={{ type: "spring", stiffness: 280 }}
                      className="w-14 h-14 bg-[#d4af37]/15 border border-[#d4af37]/25 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-xl text-[#d4af37]" />
                    </motion.div>
                    <h3 style={{ fontFamily: TOKEN.fontDisplay }}
                      className="text-base font-bold text-white mb-2">{b.title}</h3>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{b.desc}</p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══ HOW IT WORKS ═════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-stone-50" aria-label="How consultations work">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-14">
            <SectionLabel>Simple Process</SectionLabel>
            <h2 style={{ fontFamily: TOKEN.fontDisplay }}
              className="text-4xl sm:text-5xl font-bold text-[#1a3a2e] mt-1">
              How It <span className="text-[#d4af37]">Works</span>
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 relative">
            {/* dashed connector line */}
            <div className="hidden sm:block absolute top-11 left-[22%] right-[22%] h-px border-t-2 border-dashed border-[#d4af37]/30 z-0" />

            {STEPS.map((s, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <ClayCard className="p-6 sm:p-8 text-center relative z-10">
                  <motion.div whileHover={{ scale: 1.12, rotate: -6 }} transition={{ type: "spring", stiffness: 280 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ boxShadow: "0 8px 24px rgba(26,58,46,0.3)" }}>
                    <span style={{ fontFamily: TOKEN.fontDisplay }} className="text-[#d4af37] text-xl font-bold">{s.n}</span>
                  </motion.div>
                  <h3 style={{ fontFamily: TOKEN.fontDisplay }}
                    className="text-base sm:text-lg font-bold text-[#1a3a2e] mb-2">{s.title}</h3>
                  <p className="text-[#1a3a2e]/55 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                </ClayCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>


      {/* ══ CTA ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#1a3a2e] via-[#2d5a47] to-[#0f2318] relative overflow-hidden"
        aria-label="Book your consultation">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

        <FadeUp className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 6, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
            style={{ boxShadow: "0 0 48px rgba(37,211,102,0.4)" }}>
            <FaWhatsapp className="text-3xl text-white" />
          </motion.div>

          <h2 style={{ fontFamily: TOKEN.fontDisplay }}
            className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Ready to Start Your<br/><span className="text-[#d4af37]">Wellness Journey?</span>
          </h2>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Book your consultation today and get personalised guidance from our natural wellness experts — all via WhatsApp.
          </p>

          <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 48px rgba(212,175,55,0.6)" }} whileTap={{ scale: 0.96 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#d4af37] text-[#1a3a2e] px-10 py-4 rounded-full font-bold text-base shadow-xl">
            Choose Your Consultation
          </motion.button>
        </FadeUp>
      </section>


      {/* ══ MODAL ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showModal && selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
            onClick={() => setShowModal(false)}>
            <motion.div
              initial={{ scale: 0.92, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 40 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[28px] w-full max-w-md overflow-hidden"
              style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>

              {/* modal header strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#d4af37]" />

              <div className="p-6 sm:p-8">
                {/* icon */}
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
                  className="w-16 h-16 bg-[#25D366]/12 border border-[#25D366]/25 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <FaWhatsapp className="text-3xl text-[#25D366]" />
                </motion.div>

                <h3 style={{ fontFamily: TOKEN.fontDisplay }}
                  className="text-2xl font-bold text-[#1a3a2e] text-center mb-1">Confirm Booking</h3>
                <p className="text-[#1a3a2e]/45 text-xs text-center mb-6">Review your details before continuing to WhatsApp</p>

                {/* booking summary */}
                <div className="bg-stone-50 rounded-2xl p-5 mb-4 border border-stone-100">
                  <div className="space-y-3">
                    {[
                      { label: "Consultation", value: `${selected.title} ${selected.subtitle}` },
                      { label: "Duration",     value: selected.duration },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-[#1a3a2e]/45 text-xs">{row.label}</span>
                        <span className="text-[#1a3a2e] text-sm font-semibold">{row.value}</span>
                      </div>
                    ))}
                    <div className="h-px bg-stone-200 my-1" />
                    <div className="flex justify-between items-center">
                      <span className="text-[#1a3a2e]/45 text-xs">Consultation Fee</span>
                      <span style={{ fontFamily: TOKEN.fontDisplay }}
                        className="text-2xl font-bold text-[#d4af37]">{selected.fee}</span>
                    </div>
                  </div>
                </div>

                {/* note */}
                <div className="bg-[#d4af37]/8 border border-[#d4af37]/20 rounded-xl p-4 mb-6">
                  <p className="text-[#1a3a2e]/65 text-xs leading-relaxed">
                    <span className="font-bold text-[#1a3a2e]">Note:</span> The consultation fee must be paid before 
                    your session. Our team will guide you through payment via WhatsApp.
                  </p>
                </div>

                {/* actions */}
                <div className="flex gap-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 rounded-2xl font-semibold text-sm bg-stone-100 text-[#1a3a2e]/60 hover:bg-stone-200 transition-colors">
                    Cancel
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={proceedToWhatsApp}
                    className="flex-1 py-3 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-colors"
                    style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", boxShadow: "0 4px 16px rgba(37,211,102,0.35)" }}>
                    <FaWhatsapp className="text-base" /> Continue
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ConsultationPage;