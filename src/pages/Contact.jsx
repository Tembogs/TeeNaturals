import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaInstagram, FaFacebook, FaTiktok, FaPaperPlane,
  FaLeaf, FaClock, FaCheckCircle, FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const TOKEN = {
  green: "#1a3a2e", greenMid: "#2d5a47", gold: "#d4af37", goldLight: "#f0d060",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontAccent:  "'Cormorant Garamond', Georgia, serif",
  fontBody:    "'Plus Jakarta Sans', sans-serif",
  clayShadow:  "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
};

const VENDOR_PHONE     = "2348055061699";
const VENDOR_WHATSAPP  = `https://wa.me/${VENDOR_PHONE}`;
const VENDOR_EMAIL     = "Ibrahimfateemah433@gmail.com";

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

const InputField = ({ label, required, children }) => (
  <div>
    <label className="block text-[#1a3a2e]/70 text-xs font-semibold uppercase tracking-wider mb-2">
      {label}{required && <span className="text-[#d4af37] ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm text-[#1a3a2e] placeholder-[#1a3a2e]/30 focus:outline-none focus:border-[#d4af37] focus:bg-white transition-all";

// ── DATA ──────────────────────────────────────────────────────────────────────
const CONTACT_METHODS = [
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+234 805 506 1699",
    desc: "Chat with us instantly",
    link: VENDOR_WHATSAPP,
    accent: "#25D366",
    bg: "bg-[#25D366]/8 border-[#25D366]/20",
    iconBg: "bg-[#25D366]/12",
  },
  {
    icon: FaPhone,
    title: "Phone",
    value: "+234 805 506 1699",
    desc: "Call us anytime",
    link: `tel:${VENDOR_PHONE}`,
    accent: TOKEN.gold,
    bg: "bg-[#d4af37]/8 border-[#d4af37]/20",
    iconBg: "bg-[#d4af37]/12",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    value: "ibrahimfateemah433@gmail.com",
    desc: "Drop us a message",
    link: `mailto:${VENDOR_EMAIL}`,
    accent: TOKEN.green,
    bg: "bg-[#1a3a2e]/6 border-[#1a3a2e]/12",
    iconBg: "bg-[#1a3a2e]/8",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Location",
    value: "Kwara, Nigeria",
    desc: "Ilorin, Kwara State",
    link: "https://maps.google.com/?q=Airport+Rd,+Kwara,+Nigeria",
    accent: "#e06b6b",
    bg: "bg-red-50 border-red-100",
    iconBg: "bg-red-50",
  },
];

const WORKING_HOURS = [
  { day: "Tuesday – Sunday", hours: "24hrs Open",  open: true },
  { day: "Monday",           hours: "Closed",       open: false },
];

const SOCIALS = [
  { icon: FaInstagram, label: "Instagram", link: "https://instagram.com",                                          color: "from-purple-500 to-pink-500" },
  { icon: FaFacebook,  label: "Facebook",  link: "https://www.facebook.com/share/1ANusU1xvj/",                    color: "from-blue-500 to-blue-600" },
  { icon: FaTiktok,    label: "TikTok",    link: "https://www.tiktok.com/@teenaturals4?_r=1&_t=ZS-91SMH6V0VPQ",  color: "from-gray-800 to-gray-900" },
];

const FAQS = [
  {
    q: "Do you offer free consultations?",
    a: "We provide free skincare consultations via WhatsApp during sales periods. Outside of that, consultations are paid for — visit our Consultation page to book.",
  },
  {
    q: "What is your delivery timeframe?",
    a: "We deliver within 2–5 business days within Kwara and 5–7 business days nationwide across Nigeria.",
  },
  {
    q: "Are your products 100% natural?",
    a: "Absolutely. All our products are made from natural ingredients with no harmful chemicals or preservatives — ever.",
  },
];

// ── PAGE ──────────────────────────────────────────────────────────────────────
const TeeNaturalContact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const msg = `*New Contact Form Submission*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Subject:* ${formData.subject}%0A%0A*Message:*%0A${formData.message}`;
    window.open(`${VENDOR_WHATSAPP}?text=${msg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden" style={{ fontFamily: TOKEN.fontBody }}>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#1a3a2e] via-[#2d5a47] to-[#0f2318] overflow-hidden pt-28 pb-20 px-4 sm:px-6"
        aria-label="Contact TeeNatural">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SectionLabel light>We'd Love to Hear From You</SectionLabel>
          </motion.div>

          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: "backOut", delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
            style={{ boxShadow: "0 0 40px rgba(212,175,55,0.45)" }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <FaLeaf className="text-3xl text-[#1a3a2e]" />
            </motion.div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{ fontFamily: TOKEN.fontDisplay }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-5 leading-[1.05]">
            Get In <span className="text-[#d4af37]">Touch</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="text-white/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have questions about our products or need personalised skincare advice? 
            We're here to help — reach us on WhatsApp for the fastest response.
          </motion.p>
        </div>
      </section>


      {/* ══ CONTACT METHOD CARDS ════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 -mt-8 relative z-10 mb-16" aria-label="Contact methods">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CONTACT_METHODS.map((m, i) => {
            const Icon = m.icon;
            return (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.a href={m.link} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 260 }}
                  className="block">
                  <ClayCard className={`p-4 sm:p-5 h-full border ${m.bg} group`}>
                    <div className={`w-11 h-11 ${m.iconBg} rounded-2xl flex items-center justify-center mb-3`}>
                      <Icon className="text-lg" style={{ color: m.accent }} />
                    </div>
                    <div style={{ fontFamily: TOKEN.fontDisplay }}
                      className="text-sm font-bold text-[#1a3a2e] mb-0.5">{m.title}</div>
                    <div className="text-[#1a3a2e]/40 text-[10px] mb-1.5">{m.desc}</div>
                    <div className="text-[11px] font-semibold leading-tight" style={{ color: m.accent }}>{m.value}</div>
                  </ClayCard>
                </motion.a>
              </FadeUp>
            );
          })}
        </div>
      </section>


      {/* ══ FORM + SIDEBAR ══════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 mb-16" aria-label="Contact form">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-5 sm:gap-6">

          {/* ── FORM ── */}
          <FadeUp className="lg:col-span-3">
            <ClayCard className="p-6 sm:p-8 h-full">
              <div style={{ fontFamily: TOKEN.fontDisplay }}
                className="text-2xl sm:text-3xl font-bold text-[#1a3a2e] mb-1">Send Us a Message</div>
              <p className="text-[#1a3a2e]/45 text-xs mb-7">We'll reply via WhatsApp — usually within a few hours.</p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success"
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-center py-14">
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.5 }}
                      className="w-20 h-20 bg-[#4a9a6b]/10 border border-[#4a9a6b]/20 rounded-full flex items-center justify-center mx-auto mb-5">
                      <FaCheckCircle className="text-4xl text-[#4a9a6b]" />
                    </motion.div>
                    <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-2xl font-bold text-[#1a3a2e] mb-2">Message Sent!</div>
                    <p className="text-[#1a3a2e]/50 text-sm">We'll get back to you shortly via WhatsApp.</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <InputField label="Your Name" required>
                      <input type="text" name="name" value={formData.name} onChange={handleChange}
                        required placeholder="e.g. Fatimah Ibrahim" className={inputCls} />
                    </InputField>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <InputField label="Email" required>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                          required placeholder="you@example.com" className={inputCls} />
                      </InputField>
                      <InputField label="Phone">
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          placeholder="+234 800 000 0000" className={inputCls} />
                      </InputField>
                    </div>

                    <InputField label="Subject" required>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                        required placeholder="e.g. Product Enquiry" className={inputCls} />
                    </InputField>

                    <InputField label="Message" required>
                      <textarea name="message" value={formData.message} onChange={handleChange}
                        required rows={5} placeholder="Tell us how we can help you..."
                        className={`${inputCls} resize-none`} />
                    </InputField>

                    <motion.button onClick={handleSubmit}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(26,58,46,0.3)" }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-[#1a3a2e] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
                      style={{ boxShadow: "0 4px 16px rgba(26,58,46,0.2)" }}>
                      <FaPaperPlane className="text-xs" /> Send via WhatsApp
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </ClayCard>
          </FadeUp>

          {/* ── SIDEBAR ── */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">

            {/* Working Hours */}
            <FadeUp delay={0.1}>
              <div className="rounded-[24px] overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a3a2e 0%, #2d5a47 100%)", boxShadow: TOKEN.clayShadow }}>
                <div className="h-1 bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#d4af37]" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 bg-[#d4af37]/15 rounded-xl flex items-center justify-center">
                      <FaClock className="text-[#d4af37] text-sm" />
                    </div>
                    <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-white font-bold text-lg">Working Hours</div>
                  </div>
                  <div className="space-y-2">
                    {WORKING_HOURS.map((s, i) => (
                      <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/8 last:border-0">
                        <span className="text-white/60 text-sm">{s.day}</span>
                        <span className={`text-sm font-semibold ${s.open ? "text-[#d4af37]" : "text-white/30"}`}>{s.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* WhatsApp CTA */}
            <FadeUp delay={0.15}>
              <motion.a href={VENDOR_WHATSAPP} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(37,211,102,0.35)" }} whileTap={{ scale: 0.98 }}
                className="block rounded-[24px] overflow-hidden"
                style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)", boxShadow: "0 8px 32px rgba(37,211,102,0.2)" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <FaWhatsapp className="text-2xl text-white" />
                    </div>
                    <div>
                      <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-white font-bold text-lg leading-tight">Chat on WhatsApp</div>
                      <div className="text-white/75 text-xs">Fastest response guaranteed</div>
                    </div>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed mb-4">
                    Need a quick answer? Chat directly with us for instant support, product advice, and order help.
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    Start Chat
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                      <FaArrowRight className="text-xs" />
                    </motion.span>
                  </div>
                </div>
              </motion.a>
            </FadeUp>

            {/* Social media */}
            <FadeUp delay={0.2}>
              <ClayCard className="p-6">
                <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-[#1a3a2e] font-bold text-lg mb-4">Follow Us</div>
                <div className="flex gap-3">
                  {SOCIALS.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.a key={i} href={s.link} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                        whileHover={{ scale: 1.12, y: -3 }} whileTap={{ scale: 0.92 }}
                        className={`w-11 h-11 bg-gradient-to-br ${s.color} rounded-full flex items-center justify-center text-white shadow-md text-base`}>
                        <Icon />
                      </motion.a>
                    );
                  })}
                </div>
                <p className="text-[#1a3a2e]/40 text-xs mt-3 leading-relaxed">
                  Stay updated with our latest products, tips, and offers.
                </p>
              </ClayCard>
            </FadeUp>

          </div>
        </div>
      </section>


      {/* ══ MAP ═════════════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 mb-16" aria-label="Our location">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-6 text-center">
            <SectionLabel>Find Us</SectionLabel>
            <h2 style={{ fontFamily: TOKEN.fontDisplay }}
              className="text-3xl sm:text-4xl font-bold text-[#1a3a2e] mt-1">
              Our <span className="text-[#d4af37]">Location</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <ClayCard className="overflow-hidden">
              {/* map header strip */}
              <div className="h-1 bg-gradient-to-r from-[#d4af37] via-[#f0d060] to-[#d4af37]" />

              {/* location info bar */}
              <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <div style={{ fontFamily: TOKEN.fontDisplay }} className="text-[#1a3a2e] font-bold text-sm">Tee Natural & Essentials</div>
                    <div className="text-[#1a3a2e]/45 text-xs">Ilorin International Airport Road, Kwara State, Nigeria</div>
                  </div>
                </div>
                <a href="https://www.google.com/maps/search/Airport+Rd,+Kwara,+Nigeria" target="_blank" rel="noopener noreferrer">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 bg-[#1a3a2e] text-white text-xs font-bold px-4 py-2.5 rounded-full flex-shrink-0">
                    <FaMapMarkerAlt className="text-[#d4af37] text-xs" /> Open in Google Maps
                  </motion.button>
                </a>
              </div>

              {/* iframe map */}
              <div className="relative w-full h-72 sm:h-96">
                <iframe
                  title="TeeNatural Store Location — Ilorin International Airport Road, Kwara, Nigeria"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.5612946190827!2d4.491408!3d8.4312748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1037acc6dad7fb0d%3A0x5ff248cc35ee5bb7!2sAirport%20Rd%2C%20Kwara!5e0!3m2!1sen!2sng!4v1731840000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Map showing TeeNatural store location in Ilorin, Kwara State, Nigeria"
                />
              </div>
            </ClayCard>
          </FadeUp>
        </div>
      </section>


      {/* ══ FAQs ════════════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 mb-20" aria-label="Frequently asked questions">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-10">
            <SectionLabel>Quick Answers</SectionLabel>
            <h2 style={{ fontFamily: TOKEN.fontDisplay }}
              className="text-3xl sm:text-4xl font-bold text-[#1a3a2e] mt-1">
              Frequently Asked <span className="text-[#d4af37]">Questions</span>
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {FAQS.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 260 }}>
                  <ClayCard className="p-6 h-full">
                    {/* number badge */}
                    <div className="w-8 h-8 bg-[#d4af37]/12 border border-[#d4af37]/20 rounded-xl flex items-center justify-center mb-4">
                      <span style={{ fontFamily: TOKEN.fontDisplay }} className="text-[#d4af37] text-sm font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 style={{ fontFamily: TOKEN.fontDisplay }}
                      className="text-base font-bold text-[#1a3a2e] mb-3 leading-snug">{faq.q}</h4>
                    <p className="text-[#1a3a2e]/55 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
                  </ClayCard>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default TeeNaturalContact;