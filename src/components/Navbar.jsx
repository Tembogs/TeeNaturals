import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; 
import { Link } from "react-router-dom"; 

const TeeNaturalNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { state } = useCart();
  const cartCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact Us', href: '/contact' },
    {name: 'Consultation', href: '/consultation' },
    {name: 'Spa Bookings', href: '/spa-bookings' },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#1a3a2e]/95 backdrop-blur-md shadow-lg py-3' 
            : 'bg-[#1a3a2e]/95 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between w-full">

          {/* Left: Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="flex items-center gap-2">
              <motion.img
                src="/favicon.jpg"
                alt="Tee Natural & Essentials"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="text-lg sm:text-xl md:text-2xl font-['Playfair_Display'] text-white font-bold leading-tight">
                Tee Natural <span className="text-[#d4af37]">&</span> Essentials
              </div>
            </Link>
          </motion.div>

          {/* Center (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                <Link
                  to={link.href}
                  className="text-white/90 hover:text-[#d4af37] transition-colors text-sm font-medium relative py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4af37] group-hover:w-full transition-all duration-300" />
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4 ml-auto">
            <Link
              to="/products"
              className="bg-[#d4af37] text-[#1a3a2e] px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2"
            >
              <FaShoppingBag />
              Shop Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white text-2xl ml-4"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              />
              
              {/* Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed top-20 left-4 right-4 bg-[#1a3a2e]/98 backdrop-blur-xl z-50 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
              >
                <div className="p-6">

                  {/* Mobile Links */}
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="block text-white text-lg font-medium hover:text-[#d4af37] hover:bg-white/5 transition-all px-4 py-3 rounded-lg"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Divider */}
                  <div className="my-4 h-px bg-white/10" />

                  {/* Shop Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-3"
                  >
                    <Link
                      to="/products"
                      onClick={() => setMenuOpen(false)}
                      className="bg-[#d4af37] hover:bg-[#c29d2f] text-[#1a3a2e] px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
                    >
                      <FaShoppingBag /> Shop Now
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default TeeNaturalNavbar;
