import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLeaf, FaSpa, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'

const Footer = () => {

  const socialLinks = [
    { 
      icon: FaFacebook, 
      label: 'Facebook',
      url: 'https://www.facebook.com/share/1ANusU1xvj/',
      color: '#1877F2'
    },
    { 
      icon: FaInstagram, 
      label: 'Instagram',
      url: 'https://instagram.com',
      color: '#E4405F'
    },
    { 
      icon: FaTiktok, 
      label: 'TikTok',
      url: 'https://www.tiktok.com/@teenaturals4?_r=1&_t=ZS-91SMH6V0VPQ',
      color: '#000000'
    }
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Products', href: '/products' },
    { name: 'Sustainability', href: '/sustainability' }
  ];

  const shopLinks = [
    { name: 'Skincare', href: '/products?category=skincare' },
    { name: 'Haircare', href: '/products?category=haircare' },
    { name: 'Body Care', href: '/products?category=skincare' },
  ];

  return (
    <>
      <footer className="bg-gradient-to-br from-[#0d1f1a] via-[#1a3a2e] to-[#0d1f1a] text-white relative overflow-hidden">
        
        {/* Background Glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

          {/* Main Footer Layout */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">

            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-['Playfair_Display'] mb-4">
                Tee Natural <span className="text-[#d4af37]">&</span> Essentials
              </div>
              <p className="text-white/60 mb-6 text-sm leading-relaxed">
                Natural Beauty, Naturally You. Crafted with nature's finest ingredients.
              </p>

              {/* Social Icons */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {socialLinks.map((social, i) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#d4af37] transition-colors group"
                    >
                      <IconComponent className="text-white text-lg group-hover:text-[#1a3a2e]" />
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-['Playfair_Display'] text-[#d4af37] mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }}>
                    <a href={link.href} className="text-white/70 hover:text-[#d4af37] text-sm flex items-center gap-2">
                      <span className="text-[#d4af37]">→</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Shop Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h3 className="text-lg font-['Playfair_Display'] text-[#d4af37] mb-4">Shop</h3>
              <ul className="space-y-3">
                {shopLinks.map((link, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }}>
                    <a href={link.href} className="text-white/70 hover:text-[#d4af37] text-sm flex items-center gap-2">
                      <span className="text-[#d4af37]">→</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* 🔥 Replaced Newsletter With Big Animated Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-28 h-28 rounded-full bg-[#d4af37] flex items-center justify-center shadow-xl"
              >
                <FaSpa className="text-[#1a3a2e] text-4xl" />
              </motion.div>

              <p className="text-white/70 text-sm mt-4 max-w-[180px]">
                Pure. Natural. Elegant.  
                Handcrafted beauty essentials for your glow.
              </p>
            </motion.div>

          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
          />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Tee Natural & Essentials. All rights reserved.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex gap-6 text-sm"
            >
              {[
                { name: 'Privacy Policy', url: '/privacy' },
                { name: 'Terms of Service', url: '/terms' },
                { name: 'Shipping Info', url: '/shipping' },
                { name: 'Contact Us', url: '/contact' }
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  whileHover={{ y: -2 }}
                  className="text-white/60 hover:text-[#d4af37] transition"
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer