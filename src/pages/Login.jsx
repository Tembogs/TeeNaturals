import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

// ── Design tokens ─────────────────────────────────────────────────────────
const T = {
  green:     "#1a3a2e",
  greenMid:  "#2d5a47",
  greenLight:"#3d7a60",
  gold:      "#d4af37",
  goldLight: "#f0d060",
  cream:     "#faf7f2",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontAccent:  "'Cormorant Garamond', Georgia, serif",
  fontBody:    "'Plus Jakarta Sans', sans-serif",
};

// ── Floating particle ─────────────────────────────────────────────────────
const Particle = ({ style }) => (
  <motion.div
    style={style}
    className="absolute pointer-events-none select-none"
    animate={{ y: [-10, 10, -10], rotate: [0, 360], opacity: [0.35, 0.85, 0.35] }}
    transition={{ duration: style.duration, repeat: Infinity, ease: "easeInOut", delay: style.delay }}
  />
);

const PARTICLES = [
  { top: "10%", left: "7%",  fontSize: 20, content: "🌿", duration: 7,  delay: 0 },
  { top: "22%", right: "6%", fontSize: 14, content: "✦",  duration: 5,  delay: 1 },
  { top: "50%", left: "4%",  fontSize: 12, content: "◈",  duration: 8,  delay: 2 },
  { top: "68%", right: "5%", fontSize: 18, content: "🌱", duration: 6,  delay: 0.5 },
  { top: "38%", right: "3%", fontSize: 11, content: "✦",  duration: 9,  delay: 3 },
  { top: "82%", left: "9%",  fontSize: 16, content: "⬡",  duration: 7,  delay: 1.5 },
  { top: "78%", right: "9%", fontSize: 10, content: "◈",  duration: 5,  delay: 4 },
  { top: "60%", left: "6%",  fontSize: 13, content: "✦",  duration: 6,  delay: 2.5 },
];

// ── Floating label input ──────────────────────────────────────────────────
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
          background: focused ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.82)",
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
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-base transition-colors duration-200"
          style={{ color: focused ? T.gold : "rgba(26,58,46,0.35)" }}
        >
          {icon}
        </span>

        <motion.label
          htmlFor={id}
          animate={{ y: lifted ? -10 : 0, scale: lifted ? 0.78 : 1 }}
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

        <input
          id={id}
          type={isPassword && showPass ? "text" : type}
          value={value}
          autoComplete={autoComplete}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent outline-none pl-12 pr-12 pb-3"
          style={{
            paddingTop: hasValue || focused ? "26px" : "17px",
            color: T.green,
            fontFamily: T.fontBody,
            fontSize: "15px",
            letterSpacing: "0.01em",
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(s => !s)}
            tabIndex={-1}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm transition-opacity duration-200"
            style={{ color: "rgba(26,58,46,0.4)", opacity: hasValue ? 1 : 0.4 }}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        )}
      </div>

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

// ── Main login page ───────────────────────────────────────────────────────
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const set = field => val => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: undefined }));
    setApiError("");
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address";
    if (!form.password || form.password.length < 1)
      e.password = "Please enter your password";
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
      const res = await api.post("/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      console.log(res);
      const data = await res.data;
      if (!data) throw new Error(data.message || "Invalid email or password.");

      // Persist token if returned
      if (data.token) { localStorage.setItem("tn_token", data.token);
        localStorage.setItem("tn_user",JSON.stringify({
              _id: data._id,
              name: data.name,
              email: data.email,
            })
          );
        }

        console.log(localStorage.getItem("tn_token"));

        console.log(
          JSON.parse(localStorage.getItem("tn_user"))
        );

      setSuccess(true);
      setTimeout(() => navigate("/"), 2200);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ─────────────────────────────────────────────────────
  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: `linear-gradient(135deg, ${T.green} 0%, ${T.greenMid} 60%, #0f2419 100%)`, fontFamily: T.fontBody }}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="text-center max-w-sm"
        >
          <motion.div
            animate={{ scale: [1, 1.18, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-6"
          >
            🌿
          </motion.div>
          <h2 style={{ fontFamily: T.fontDisplay, color: T.goldLight }} className="text-3xl font-bold mb-3">
            Welcome back!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)" }} className="text-base leading-relaxed">
            You're signed in. Taking you home…
          </p>
          <motion.div className="mt-6 h-1 rounded-full mx-auto overflow-hidden"
            style={{ background: "rgba(255,255,255,0.15)", width: 200 }}>
            <motion.div className="h-full rounded-full" style={{ background: T.gold }}
              initial={{ width: "0%" }} animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
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

      {/* ── Left panel ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-[46%] xl:w-[42%] relative flex-col justify-between p-10 xl:p-14 overflow-hidden"
        style={{ background: `linear-gradient(155deg, ${T.green} 0%, ${T.greenMid} 55%, #0f2419 100%)` }}
      >
        {/* Dot mesh */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.3, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full pointer-events-none"
          style={{ width: 380, height: 380, background: `radial-gradient(circle, ${T.gold}, transparent 70%)`, top: "25%", left: "-18%" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute rounded-full pointer-events-none"
          style={{ width: 300, height: 300, background: `radial-gradient(circle, ${T.greenLight}, transparent 70%)`, bottom: "12%", right: "-8%" }}
        />

        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <Particle key={i} style={{
            ...p,
            color: ["✦","◈","⬡"].includes(p.content) ? "rgba(212,175,55,0.55)" : "rgba(255,255,255,0.45)"
          }} />
        ))}

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`, boxShadow: `0 4px 20px rgba(212,175,55,0.4)` }}>
              🌿
            </div>
            <span style={{ fontFamily: T.fontDisplay, color: "white", fontSize: "22px", fontWeight: 700 }}>
              TeeNatural
            </span>
          </Link>
        </div>

        {/* Centre copy */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p style={{ color: T.gold, fontFamily: T.fontAccent, fontSize: "15px", letterSpacing: "0.14em" }}
              className="uppercase tracking-widest mb-4">
              Welcome Back
            </p>
            <h1 style={{ fontFamily: T.fontDisplay, color: "white", lineHeight: 1.1 }}
              className="text-4xl xl:text-5xl font-bold mb-6">
              Your skin<br/>
              <span style={{ color: T.goldLight }}>missed you.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }} className="text-base max-w-xs">
              Sign in to access your orders, track your natural beauty routine and discover new arrivals.
            </p>
          </motion.div>

          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-10 flex flex-col gap-3"
          >
            {[
              { icon: "📦", text: "Track your orders in real time" },
              { icon: "🌿", text: "Personalised product recommendations" },
              { icon: "✨", text: "Exclusive member-only offers" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 + i * 0.12 }}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13.5px" }}>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="relative z-10 flex gap-3"
        >
          {["5K+ Members", "100% Natural", "4.9★ Rated"].map((b, i) => (
            <div key={i} className="flex-1 text-center rounded-xl py-3"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p style={{ color: T.goldLight, fontSize: "11px", fontWeight: 700, letterSpacing: "0.03em" }}>{b}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Right panel — login form ────────────────────────────────────── */}
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
              Sign In
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              style={{ fontFamily: T.fontDisplay, color: T.green, lineHeight: 1.15 }}
              className="text-3xl sm:text-4xl font-bold mb-2"
            >
              Good to have<br/>you back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              style={{ color: "rgba(26,58,46,0.5)", fontSize: "14px" }}
            >
              Don't have an account?{" "}
              <Link to="/register"
                style={{ color: T.greenMid, fontWeight: 700, textDecoration: "none" }}
                className="hover:underline">
                Create one free
              </Link>
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
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
              <motion.div
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.58, duration: 0.5 }}
              >
                <FloatingInput
                  id="password"
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={set("password")}
                  error={errors.password}
                  icon="⬡"
                  autoComplete="current-password"
                />
              </motion.div>

              {/* Forgot password */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
                className="flex justify-end -mt-1"
              >
                <Link to="/forgot-password"
                  style={{ color: T.greenMid, fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
                  className="hover:underline">
                  Forgot password?
                </Link>
              </motion.div>

              {/* API Error */}
              <AnimatePresence>
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    className="rounded-xl px-4 py-3 text-sm font-medium flex items-start gap-2"
                    style={{
                      background: "rgba(220,80,60,0.07)",
                      border: "1px solid rgba(220,80,60,0.22)",
                      color: "rgba(190,50,40,0.9)",
                      fontFamily: T.fontBody,
                    }}
                  >
                    <span className="mt-0.5 flex-shrink-0">⚠</span>
                    <span>{apiError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.025, boxShadow: `0 8px 40px rgba(212,175,55,0.42)` } : {}}
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
                    boxShadow: `0 4px 24px rgba(26,58,46,0.22)`,
                  }}
                >
                  {/* Shimmer */}
                  {!loading && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.11), transparent)", width: "60%" }}
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span key="loading"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                          style={{ display: "inline-block", fontSize: 16 }}
                        >
                          🌿
                        </motion.span>
                        Signing you in…
                      </motion.span>
                    ) : (
                      <motion.span key="idle"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Sign In →
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>

            </div>
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
            className="flex items-center gap-4 my-6"
          >
            <div className="flex-1 h-px" style={{ background: "rgba(26,58,46,0.1)" }} />
            <span style={{ color: "rgba(26,58,46,0.32)", fontSize: "12px", fontWeight: 500 }}>
              Trusted by 5,000+ customers
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(26,58,46,0.1)" }} />
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex gap-3 justify-center flex-wrap"
          >
            {[
              { icon: "🔒", text: "256-bit secure" },
              { icon: "🌿", text: "100% Natural" },
              { icon: "★",  text: "4.9 rated" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{ background: "rgba(26,58,46,0.05)", border: "1px solid rgba(26,58,46,0.08)" }}>
                <span style={{ fontSize: 12 }}>{t.icon}</span>
                <span style={{ color: "rgba(26,58,46,0.5)", fontSize: "11px", fontWeight: 600 }}>{t.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Register CTA */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="mt-8 rounded-2xl p-5 text-center"
            style={{ background: "rgba(26,58,46,0.04)", border: "1px solid rgba(26,58,46,0.08)" }}
          >
            <p style={{ color: "rgba(26,58,46,0.45)", fontSize: "13px" }} className="mb-2">
              New to TeeNatural?
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl py-3 font-bold text-sm"
                style={{
                  background: "transparent",
                  border: `1.5px solid ${T.greenMid}`,
                  color: T.greenMid,
                  fontFamily: T.fontBody,
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                }}
              >
                Create a free account
              </motion.button>
            </Link>
          </motion.div>

        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="mt-8 text-center"
          style={{ color: "rgba(26,58,46,0.28)", fontSize: "12px" }}
        >
          © {new Date().getFullYear()} TeeNatural · All rights reserved
        </motion.p>
      </div>
    </div>
  );
};

export default Login;