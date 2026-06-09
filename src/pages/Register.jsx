import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

// ── Design tokens matching TeeNatural brand ───────────────────────────────
const T = {
  green:    "#1a3a2e",
  greenMid: "#2d5a47",
  greenLight:"#3d7a60",
  gold:     "#d4af37",
  goldLight:"#f0d060",
  cream:    "#faf7f2",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontAccent:  "'Cormorant Garamond', Georgia, serif",
  fontBody:    "'Plus Jakarta Sans', sans-serif",
};

// ── Floating botanical particle ────────────────────────────────────────────
const Particle = ({ style }) => (
  <motion.div
    style={style}
    className="absolute pointer-events-none select-none"
    animate={{ y: [-10, 10, -10], rotate: [0, 360], opacity: [0.4, 0.9, 0.4] }}
    transition={{ duration: style.duration, repeat: Infinity, ease: "easeInOut", delay: style.delay }}
  />
);

const PARTICLES = [
  { top: "8%",  left: "6%",  fontSize: 22, content: "🌿", duration: 7,  delay: 0 },
  { top: "18%", right: "8%", fontSize: 16, content: "✦",  duration: 5,  delay: 1 },
  { top: "55%", left: "4%",  fontSize: 14, content: "◈",  duration: 8,  delay: 2 },
  { top: "72%", right: "5%", fontSize: 20, content: "🌱", duration: 6,  delay: 0.5 },
  { top: "35%", right: "3%", fontSize: 12, content: "✦",  duration: 9,  delay: 3 },
  { top: "88%", left: "8%",  fontSize: 18, content: "⬡",  duration: 7,  delay: 1.5 },
  { top: "42%", left: "2%",  fontSize: 10, content: "◈",  duration: 5,  delay: 4 },
  { top: "25%", left: "10%", fontSize: 13, content: "✦",  duration: 6,  delay: 2.5 },
];

// ── Input field with animated label ───────────────────────────────────────
const FloatingInput = ({ id, label, type = "text", value, onChange, error, icon, autoComplete }) => {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";
  const hasValue = value.length > 0;
  const lifted = focused || hasValue;

  return (
    <div className="relative">
      <div
        className="relative rounded-2xl transition-all duration-300"
        style={{
          background: focused
            ? "rgba(255,255,255,0.96)"
            : "rgba(255,255,255,0.82)",
          border: error
            ? "1.5px solid rgba(220,80,60,0.7)"
            : focused
            ? `1.5px solid ${T.gold}`
            : "1.5px solid rgba(26,58,46,0.12)",
          boxShadow: focused
            ? `0 0 0 4px rgba(212,175,55,0.12), 0 4px 20px rgba(26,58,46,0.08)`
            : "0 2px 8px rgba(26,58,46,0.04)",
        }}
      >
        {/* Icon */}
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-base transition-colors duration-200"
          style={{ color: focused ? T.gold : "rgba(26,58,46,0.35)" }}
        >
          {icon}
        </span>

        {/* Floating label */}
        <motion.label
          htmlFor={id}
          animate={{ y: lifted ? -10 : 0, scale: lifted ? 0.78 : 1, x: lifted ? 0 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-12 origin-left pointer-events-none font-medium"
          style={{
            top: lifted ? "10px" : "50%",
            marginTop: lifted ? 0 : "-10px",
            color: error
              ? "rgba(220,80,60,0.8)"
              : focused
              ? T.gold
              : "rgba(26,58,46,0.45)",
            fontFamily: T.fontBody,
            fontSize: "14px",
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </motion.label>

        {/* Input */}
        <input
          id={id}
          type={isPassword && showPass ? "text" : type}
          value={value}
          autoComplete={autoComplete}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent outline-none pl-12 pr-12 pb-3 text-sm font-medium"
          style={{
            paddingTop: hasValue || focused ? "26px" : "17px",
            color: T.green,
            fontFamily: T.fontBody,
            fontSize: "15px",
            letterSpacing: "0.01em",
          }}
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(s => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm transition-opacity duration-200"
            style={{ color: "rgba(26,58,46,0.4)", opacity: hasValue ? 1 : 0.4 }}
            tabIndex={-1}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 ml-1 text-xs font-medium"
            style={{ color: "rgba(220,80,60,0.85)", fontFamily: T.fontBody }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Password strength meter ────────────────────────────────────────────────
const StrengthMeter = ({ password }) => {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#e05050", "#d4a017", "#5a9a6b", "#1a7a4e"];

  return (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-2 px-1">
      <div className="flex gap-1.5 mb-1.5">
        {[1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="h-1 flex-1 rounded-full"
            animate={{ backgroundColor: i <= score ? colors[score] : "rgba(26,58,46,0.1)" }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <p className="text-[11px] font-semibold" style={{ color: colors[score], fontFamily: T.fontBody }}>
        {labels[score]} {score === 4 ? "— great password 🎉" : ""}
      </p>
    </motion.div>
  );
};

// ── Main register page ─────────────────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const set = field => val => setForm(f => ({ ...f, [field]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Please enter your full name (at least 2 characters)";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address";
    if (!form.password || form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (!agreed)
      e.agreed = "Please accept the terms to continue";
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed. Please try again.");
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2800);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: `linear-gradient(135deg, ${T.green} 0%, ${T.greenMid} 60%, #1a3a2e 100%)`, fontFamily: T.fontBody }}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="text-center max-w-sm"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-6"
          >🌿</motion.div>
          <h2 style={{ fontFamily: T.fontDisplay, color: T.goldLight }} className="text-3xl font-bold mb-3">
            Welcome to TeeNatural!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)" }} className="text-base leading-relaxed">
            Your account has been created. Redirecting you to login…
          </p>
          <motion.div className="mt-6 h-1 rounded-full mx-auto overflow-hidden"
            style={{ background: "rgba(255,255,255,0.15)", width: 200 }}>
            <motion.div className="h-full rounded-full"
              style={{ background: T.gold }}
              initial={{ width: "0%" }} animate={{ width: "100%" }}
              transition={{ duration: 2.6, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden flex"
      style={{ fontFamily: T.fontBody, background: T.cream }}
    >
      {/* ── Left panel — botanical brand panel ─────────────────────────── */}
      <motion.div
        initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-[46%] xl:w-[42%] relative flex-col justify-between p-10 xl:p-14 overflow-hidden"
        style={{ background: `linear-gradient(155deg, ${T.green} 0%, ${T.greenMid} 55%, #0f2419 100%)` }}
      >
        {/* Mesh overlay */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}/>

        {/* Gold glow orb */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full pointer-events-none"
          style={{ width: 400, height: 400, background: `radial-gradient(circle, ${T.gold}, transparent 70%)`, top: "20%", left: "-20%" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute rounded-full pointer-events-none"
          style={{ width: 320, height: 320, background: `radial-gradient(circle, ${T.greenLight}, transparent 70%)`, bottom: "10%", right: "-10%" }}
        />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <Particle key={i} style={{ ...p, color: p.content === "✦" || p.content === "◈" || p.content === "⬡" ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.5)" }} />
        ))}

        {/* Brand logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, boxShadow: `0 4px 20px rgba(212,175,55,0.4)` }}>
              🌿
            </div>
            <span style={{ fontFamily: T.fontDisplay, color: "white", fontSize: "22px", fontWeight: 700 }}>
              TeeNatural
            </span>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p style={{ color: T.gold, fontFamily: T.fontAccent, fontSize: "16px", letterSpacing: "0.12em" }}
              className="uppercase mb-4 tracking-widest">
              Join the Community
            </p>
            <h1 style={{ fontFamily: T.fontDisplay, color: "white", lineHeight: 1.1 }}
              className="text-4xl xl:text-5xl font-bold mb-6">
              Pure Beauty.<br/>
              <span style={{ color: T.goldLight }}>From Nature.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }} className="text-base max-w-xs">
              Create your free account and discover skincare that works with your skin, not against it.
            </p>
          </motion.div>

          {/* Testimonial card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-10 rounded-2xl p-5 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => <span key={i} style={{ color: T.gold, fontSize: 13 }}>★</span>)}
            </div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontFamily: T.fontAccent, fontSize: "17px", lineHeight: 1.6, fontStyle: "italic" }}>
              "In less than two weeks there is already significant changes on my skin, my hyperpigmentation is clearing."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, color: T.green }}>
                S
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px", fontWeight: 600 }}>Samia Owolewa</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>Verified Buyer</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="relative z-10 flex gap-4"
        >
          {["5K+ Customers", "100% Natural", "4.9★ Rating"].map((b, i) => (
            <div key={i} className="flex-1 text-center rounded-xl py-3"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p style={{ color: T.goldLight, fontSize: "11px", fontWeight: 700, letterSpacing: "0.03em" }}>{b}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Right panel — register form ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-10 relative overflow-y-auto">

        {/* Mobile logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden mb-8 flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenMid})` }}>
            🌿
          </div>
          <span style={{ fontFamily: T.fontDisplay, color: T.green, fontSize: "20px", fontWeight: 700 }}>
            TeeNatural
          </span>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="w-full max-w-md"
        >
          {/* Heading */}
          <div className="mb-8">
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ color: T.gold, fontFamily: T.fontAccent, fontSize: "14px", letterSpacing: "0.12em" }}
              className="uppercase tracking-widest mb-2"
            >
              Create Account
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
              style={{ fontFamily: T.fontDisplay, color: T.green, lineHeight: 1.15 }}
              className="text-3xl sm:text-4xl font-bold mb-2"
            >
              Start your natural<br/>beauty journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              style={{ color: "rgba(26,58,46,0.5)", fontSize: "14px" }}
            >
              Already have an account?{" "}
              <Link to="/login"
                style={{ color: T.greenMid, fontWeight: 700, textDecoration: "none" }}
                className="hover:underline">
                Sign in
              </Link>
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">

              {/* Name */}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                <FloatingInput
                  id="name"
                  label="Full Name"
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  error={errors.name}
                  icon="✦"
                  autoComplete="name"
                />
              </motion.div>

              {/* Email */}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.58, duration: 0.5 }}>
                <FloatingInput
                  id="email"
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  error={errors.email}
                  icon="◎"
                  autoComplete="email"
                />
              </motion.div>

              {/* Password */}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.66, duration: 0.5 }}>
                <FloatingInput
                  id="password"
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={set("password")}
                  error={errors.password}
                  icon="⬡"
                  autoComplete="new-password"
                />
                <AnimatePresence>
                  {form.password && <StrengthMeter password={form.password} />}
                </AnimatePresence>
              </motion.div>

              {/* Terms checkbox */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }}>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <input type="checkbox" checked={agreed} onChange={e => { setAgreed(e.target.checked); setErrors(er => ({ ...er, agreed: undefined })); }}
                      className="sr-only" />
                    <motion.div
                      animate={{ borderColor: errors.agreed ? "rgba(220,80,60,0.7)" : agreed ? T.gold : "rgba(26,58,46,0.2)" }}
                      className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors"
                      style={{ background: agreed ? T.gold : "rgba(255,255,255,0.8)" }}
                    >
                      <AnimatePresence>
                        {agreed && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            style={{ color: T.green, fontSize: 11, fontWeight: 900 }}>
                            ✓
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  <span style={{ color: "rgba(26,58,46,0.6)", fontSize: "13px", lineHeight: 1.6 }}>
                    I agree to TeeNatural's{" "}
                    <Link to="/terms" style={{ color: T.greenMid, fontWeight: 600 }} className="hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link to="/privacy" style={{ color: T.greenMid, fontWeight: 600 }} className="hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                <AnimatePresence>
                  {errors.agreed && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-1.5 ml-1 text-xs font-medium" style={{ color: "rgba(220,80,60,0.85)", fontFamily: T.fontBody }}>
                      {errors.agreed}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* API Error */}
              <AnimatePresence>
                {apiError && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ background: "rgba(220,80,60,0.08)", border: "1px solid rgba(220,80,60,0.25)", color: "rgba(190,50,40,0.9)", fontFamily: T.fontBody }}>
                    ⚠ {apiError}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78 }}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.025, boxShadow: `0 8px 40px rgba(212,175,55,0.45)` } : {}}
                  whileTap={!loading ? { scale: 0.975 } : {}}
                  className="relative w-full rounded-2xl py-4 font-bold text-base overflow-hidden"
                  style={{
                    background: loading
                      ? "rgba(26,58,46,0.5)"
                      : `linear-gradient(135deg, ${T.green} 0%, ${T.greenMid} 100%)`,
                    color: T.goldLight,
                    fontFamily: T.fontBody,
                    letterSpacing: "0.04em",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: `0 4px 24px rgba(26,58,46,0.25)`,
                  }}
                >
                  {/* Shimmer overlay */}
                  {!loading && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", width: "60%" }}
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3">
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                          style={{ display: "inline-block", fontSize: 16 }}>🌿</motion.span>
                        Creating your account…
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2">
                        Create Free Account →
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>

            </div>
          </form>

          {/* Divider */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(26,58,46,0.1)" }} />
            <span style={{ color: "rgba(26,58,46,0.35)", fontSize: "12px", fontWeight: 500 }}>100% Natural Promise</span>
            <div className="flex-1 h-px" style={{ background: "rgba(26,58,46,0.1)" }} />
          </motion.div>

          {/* Trust row */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
            className="flex gap-3 justify-center flex-wrap">
            {[
              { icon: "🔒", text: "Secure & private" },
              { icon: "🌿", text: "No spam, ever" },
              { icon: "✓",  text: "Free forever" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{ background: "rgba(26,58,46,0.05)", border: "1px solid rgba(26,58,46,0.08)" }}>
                <span style={{ fontSize: 12 }}>{t.icon}</span>
                <span style={{ color: "rgba(26,58,46,0.5)", fontSize: "11px", fontWeight: 600 }}>{t.text}</span>
              </div>
            ))}
          </motion.div>

        </motion.div>

        {/* Bottom nav */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="mt-8 text-center"
          style={{ color: "rgba(26,58,46,0.3)", fontSize: "12px" }}>
          © {new Date().getFullYear()} TeeNatural · All rights reserved
        </motion.p>
      </div>
    </div>
  );
};

export default Register;