import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FaSpa, FaClock, FaCalendarAlt, FaUser, FaPhone,
  FaEnvelope, FaLeaf, FaHeart, FaCheckCircle, FaWhatsapp,
  FaArrowRight, FaArrowLeft, FaStar
} from 'react-icons/fa';

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
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

const inputCls = "w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm text-[#1a3a2e] placeholder-[#1a3a2e]/30 focus:outline-none focus:border-[#d4af37] focus:bg-white transition-all";

const InputLabel = ({ icon: Icon, children, required }) => (
  <label className="block text-[#1a3a2e]/60 text-xs font-semibold uppercase tracking-wider mb-2">
    <span className="inline-flex items-center gap-1.5">
      {Icon && <Icon className="text-[#d4af37] text-[10px]" />}
      {children}
      {required && <span className="text-[#d4af37]">*</span>}
    </span>
  </label>
);

// ── DATA ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    name: "Facial Spa",
    duration: "2 hours",
    price: "₦25,000",
    description: "Luxurious facial treatment using natural organic ingredients to cleanse, hydrate, and restore your glow.",
    icon: FaHeart,
    accent: "#e06b6b",
    bg: "from-rose-500 to-pink-400",
  },
  {
    id: 2,
    name: "Full Body Spa",
    duration: "5 hours",
    price: "₦60,000",
    description: "Complete full-body treatment including massage, body scrub, and deep relaxation therapy.",
    icon: FaSpa,
    accent: "#4a9a6b",
    bg: "from-emerald-500 to-green-400",
  },
  {
    id: 3,
    name: "Bridal Wash",
    duration: "Half day",
    price: "₦55,000",
    description: "Luxurious bridal spa experience designed to help you glow from within on your most special day.",
    icon: FaStar,
    accent: "#d4af37",
    bg: "from-amber-500 to-yellow-400",
  },
];

const TIMES = [
  "09:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "01:00 PM","02:00 PM","03:00 PM","04:00 PM",
  "05:00 PM","06:00 PM",
];

// ── STEP INDICATOR ────────────────────────────────────────────────────────────
const StepBar = ({ step }) => (
  <div className="bg-white border-b border-stone-100 sticky top-0 z-30"
    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-center gap-3">
      {[
        { n: 1, label: "Choose Treatment" },
        { n: 2, label: "Your Details" },
      ].map((s, i) => (
        <React.Fragment key={s.n}>
          <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold transition-all
            ${step === s.n ? "bg-[#1a3a2e] text-white" : step > s.n ? "bg-[#4a9a6b]/12 text-[#4a9a6b]" : "bg-stone-100 text-[#1a3a2e]/40"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
              ${step === s.n ? "bg-[#d4af37] text-[#1a3a2e]" : step > s.n ? "bg-[#4a9a6b] text-white" : "bg-stone-200 text-[#1a3a2e]/40"}`}>
              {step > s.n ? <FaCheckCircle className="text-[10px]" /> : s.n}
            </div>
            <span className="hidden sm:inline">{s.label}</span>
          </div>
          {i < 1 && (
            <div className={`w-10 h-px ${step > 1 ? "bg-[#4a9a6b]/40" : "bg-stone-200"} flex-shrink-0`} />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

// ── PAGE ──────────────────────────────────────────────────────────────────────
const SpaBookingPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate]       = useState('');
  const [selectedTime, setSelectedTime]       = useState('');
  const [bookingStep, setBookingStep]         = useState(1);
  const [showSuccess, setShowSuccess]         = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });

  const handleInput = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) return;
    const msg = `Hi! I'd like to book a spa appointment:%0A%0A*Service:* ${selectedService?.name}%0A*Price:* ${selectedService?.price}%0A*Date:* ${selectedDate}%0A*Time:* ${selectedTime}%0A%0A*My Details:*%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}${formData.notes ? `%0ASpecial Requests: ${formData.notes}` : ''}%0A%0APlease confirm my booking. Thank you!`;
    window.open(`https://wa.me/2348055061699?text=${msg}`, '_blank');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setBookingStep(1);
      setSelectedService(null);
      setSelectedDate('');
      setSelectedTime('');
      setFormData({ name: '', email: '', phone: '', notes: '' });
    }, 3500);
  };

  const canProceed = selectedService && selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden" style={{ fontFamily: TOKEN.fontBody }}>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#1a3a2e] via-[#2d5a47] to-[#0f2318] overflow-hidden pt-28 pb-24 px-4 sm:px-6 flex items-center"
        aria-label="Spa Booking — TeeNatural">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

        {/* large decorative bg icon */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-6 right-6 text-[#d4af37]/8 text-[200px] pointer-events-none select-none">
          <FaSpa />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4af37]/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SectionLabel light>Natural Wellness Treatments</SectionLabel>
          </motion.div>

          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: "backOut", delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ boxShadow: "0 0 40px rgba(212,175,55,0.45)" }}>
            <FaSpa className="text-3xl text-[#1a3a2e]" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{ fontFamily: TOKEN.fontDisplay }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-5 leading-[1.05]">
            Book Your<br/><span className="text-[#d4af37]">Spa Experience</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="text-white/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Natural wellness treatments for body and soul — crafted with the finest botanicals to restore, refresh, and revive.
          </motion.p>
        </div>
      </section>

      {/* ══ STEP INDICATOR ══════════════════════════════════════════════════ */}
      <StepBar step={bookingStep} />

      {/* ══ BOOKING CONTENT ═════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">

            {/* ── STEP 1 ── */}
            {bookingStep === 1 && (
              <motion.div key="step1"
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.45 }}>

                {/* service cards */}
                <FadeUp className="text-center mb-10">
                  <SectionLabel>Step 1</SectionLabel>
                  <h2 style={{ fontFamily: TOKEN.fontDisplay }}
                    className="text-4xl sm:text-5xl font-bold text-[#1a3a2e] mt-1 mb-3">
                    Choose Your <span className="text-[#d4af37]">Treatment</span>
                  </h2>
                  <p className="text-[#1a3a2e]/45 text-sm max-w-md mx-auto">
                    Select a spa service, then pick your preferred date and time.
                  </p>
                </FadeUp>

                <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mb-10">
                  {SERVICES.map((s, i) => {
                    const Icon = s.icon;
                    const isSelected = selectedService?.id === s.id;
                    return (
                      <FadeUp key={s.id} delay={i * 0.1}>
                        <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260 }}
                          onClick={() => setSelectedService(s)}
                          className="cursor-pointer h-full">
                          <div className={`h-full rounded-[24px] border-2 overflow-hidden transition-all duration-200
                            ${isSelected ? "border-[#d4af37]" : "border-transparent"}`}
                            style={{ boxShadow: isSelected ? `0 0 0 3px ${s.accent}22, ${TOKEN.clayShadow}` : TOKEN.clayShadow }}>

                            {/* coloured header */}
                            <div className={`bg-gradient-to-br ${s.bg} p-6 text-white text-center relative overflow-hidden`}>
                              <div className="absolute inset-0 opacity-10"
                                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
                              <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: "spring", stiffness: 280 }}
                                className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 relative z-10">
                                <Icon className="text-2xl text-white" />
                              </motion.div>
                              <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-xl font-bold relative z-10">{s.name}</div>
                              <div className="flex items-center justify-center gap-2 mt-2 relative z-10">
                                <div className="flex items-center gap-1 bg-white/15 rounded-full px-2.5 py-1 text-xs">
                                  <FaClock className="text-[9px]" /> {s.duration}
                                </div>
                              </div>
                            </div>

                            {/* body */}
                            <div className={`p-5 transition-colors ${isSelected ? "bg-[#1a3a2e]" : "bg-white"}`}>
                              <p className={`text-xs leading-relaxed mb-4 ${isSelected ? "text-white/65" : "text-[#1a3a2e]/55"}`}>
                                {s.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className={`text-xs font-semibold flex items-center gap-1.5 ${isSelected ? "text-white/50" : "text-[#1a3a2e]/40"}`}>
                                  {isSelected
                                    ? <><FaCheckCircle className="text-[#d4af37]" /> Selected</>
                                    : <><FaArrowRight className="text-[9px]" /> Tap to select</>}
                                </div>
                                <div style={{ fontFamily: TOKEN.fontDisplay }}
                                  className="text-xl font-bold text-[#d4af37]">{s.price}</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </FadeUp>
                    );
                  })}
                </div>

                {/* date + time */}
                <AnimatePresence>
                  {selectedService && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}>
                      <FadeUp>
                        <ClayCard className="p-6 sm:p-8">
                          {/* gold top strip */}
                          <div className="-mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 h-1 bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#d4af37] rounded-t-[24px]" />

                          <div style={{ fontFamily: TOKEN.fontDisplay }}
                            className="text-2xl font-bold text-[#1a3a2e] mb-1">Select Date & Time</div>
                          <p className="text-[#1a3a2e]/40 text-xs mb-7">
                            Choose your preferred appointment date and time slot.
                          </p>

                          <div className="grid sm:grid-cols-2 gap-5 mb-7">
                            {/* date */}
                            <div>
                              <InputLabel icon={FaCalendarAlt}>Choose Date</InputLabel>
                              <input type="date" value={selectedDate}
                                onChange={e => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className={inputCls} />
                            </div>

                            {/* time */}
                            <div>
                              <InputLabel icon={FaClock}>Choose Time</InputLabel>
                              <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)}
                                className={inputCls}>
                                <option value="">Select a time slot</option>
                                {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                              </select>
                            </div>
                          </div>

                          <motion.button
                            whileHover={canProceed ? { scale: 1.02 } : {}}
                            whileTap={canProceed ? { scale: 0.97 } : {}}
                            onClick={() => canProceed && setBookingStep(2)}
                            disabled={!canProceed}
                            className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                              ${canProceed
                                ? "bg-[#1a3a2e] text-white hover:bg-[#2d5a47]"
                                : "bg-stone-100 text-[#1a3a2e]/30 cursor-not-allowed"}`}
                            style={canProceed ? { boxShadow: "0 4px 16px rgba(26,58,46,0.2)" } : {}}>
                            Continue to Your Details <FaArrowRight className="text-xs" />
                          </motion.button>
                        </ClayCard>
                      </FadeUp>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── STEP 2 ── */}
            {bookingStep === 2 && (
              <motion.div key="step2"
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.45 }}
                className="max-w-3xl mx-auto">

                {/* booking summary */}
                <FadeUp className="mb-5">
                  <div className="rounded-[24px] overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #1a3a2e 0%, #2d5a47 100%)", boxShadow: TOKEN.clayShadow }}>
                    <div className="h-1 bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#d4af37]" />
                    <div className="p-6">
                      <div style={{ fontFamily: TOKEN.fontDisplay }}
                        className="text-white font-bold text-xl mb-5">Booking Summary</div>
                      <div className="space-y-3">
                        {[
                          { label: "Service", value: selectedService?.name },
                          { label: "Duration", value: selectedService?.duration },
                          { label: "Date", value: selectedDate },
                          { label: "Time", value: selectedTime },
                        ].map((row, i) => (
                          <div key={i} className="flex justify-between items-center text-sm">
                            <span className="text-white/50">{row.label}</span>
                            <span className="text-white font-semibold">{row.value}</span>
                          </div>
                        ))}
                        <div className="h-px bg-white/10 my-1" />
                        <div className="flex justify-between items-center">
                          <span className="text-white/50 text-sm">Total</span>
                          <span style={{ fontFamily: TOKEN.fontDisplay }}
                            className="text-2xl font-bold text-[#d4af37]">{selectedService?.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>

                {/* details form */}
                <FadeUp delay={0.1}>
                  <ClayCard className="p-6 sm:p-8">
                    <div className="h-1 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#d4af37] rounded-t-[24px]" />

                    <div style={{ fontFamily: TOKEN.fontDisplay }}
                      className="text-2xl font-bold text-[#1a3a2e] mb-1">Your Information</div>
                    <p className="text-[#1a3a2e]/40 text-xs mb-7">Fill in your details and we'll confirm your booking via WhatsApp.</p>

                    <div className="space-y-4">
                      <div>
                        <InputLabel icon={FaUser} required>Full Name</InputLabel>
                        <input type="text" name="name" value={formData.name} onChange={handleInput}
                          placeholder="e.g. Fatimah Ibrahim" className={inputCls} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <InputLabel icon={FaEnvelope} required>Email</InputLabel>
                          <input type="email" name="email" value={formData.email} onChange={handleInput}
                            placeholder="you@example.com" className={inputCls} />
                        </div>
                        <div>
                          <InputLabel icon={FaPhone} required>Phone</InputLabel>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleInput}
                            placeholder="+234 800 000 0000" className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <InputLabel icon={FaLeaf}>Special Requests</InputLabel>
                        <textarea name="notes" value={formData.notes} onChange={handleInput}
                          rows={4} placeholder="Any allergies, preferences, or special requests..."
                          className={`${inputCls} resize-none`} />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-7">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        onClick={() => setBookingStep(1)}
                        className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm bg-stone-100 text-[#1a3a2e]/60 hover:bg-stone-200 transition-colors">
                        <FaArrowLeft className="text-xs" /> Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(37,211,102,0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSubmit}
                        disabled={!formData.name || !formData.email || !formData.phone}
                        className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", boxShadow: "0 4px 16px rgba(37,211,102,0.3)" }}>
                        <FaWhatsapp className="text-base" /> Book via WhatsApp
                      </motion.button>
                    </div>
                  </ClayCard>
                </FadeUp>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* ══ SUCCESS MODAL ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ scale: 0.92, y: 40 }} animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 40 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="bg-white rounded-[28px] w-full max-w-sm text-center overflow-hidden"
              style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
              <div className="h-1.5 bg-gradient-to-r from-[#25D366] via-[#4adf8a] to-[#128C7E]" />
              <div className="p-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
                  className="w-16 h-16 bg-[#25D366]/12 border border-[#25D366]/25 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <FaWhatsapp className="text-3xl text-[#25D366]" />
                </motion.div>
                <div style={{ fontFamily: TOKEN.fontDisplay }}
                  className="text-2xl font-bold text-[#1a3a2e] mb-2">Booking Sent!</div>
                <p className="text-[#1a3a2e]/50 text-sm mb-1">Your details have been sent to WhatsApp.</p>
                <p className="text-[#1a3a2e]/35 text-xs">Our team will confirm your appointment shortly.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SpaBookingPage;