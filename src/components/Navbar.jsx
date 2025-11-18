import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaShoppingBag, FaSearch, FaLeaf } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; 
import { Link } from "react-router-dom"; 

const TeeNaturalNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

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
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer">
            <Link to="/" className="flex items-center gap-2">
              <motion.img
                src="/favicon.jpg"
                alt="Tee Natural & Essentials"
                className="w-12 h-12 object-contain"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="text-xl md:text-2xl font-['Playfair_Display'] text-white font-bold">
                Tee Natural <span className="text-[#d4af37]">&</span> Essentials
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
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

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-[#d4af37] transition-colors"
            >
              <FaSearch className="text-xl" />
            </motion.button>

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
            className="lg:hidden text-white text-2xl z-50"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-[#1a3a2e] bg-opacity-100 z-50 p-6 flex flex-col gap-6 shadow-xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl ml-auto"
              >
                <FaTimes />
              </button>

              {/* Links */}
              <nav className="flex flex-col gap-4 mt-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white text-lg font-medium hover:text-[#d4af37] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Actions */}
              <div className="mt-auto flex flex-col gap-3">
                <Link
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#d4af37] text-[#1a3a2e] px-4 py-2 rounded-full font-semibold flex items-center justify-center gap-2"
                >
                  <FaShoppingBag /> Shop Now
                </Link>

               
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default TeeNaturalNavbar;
