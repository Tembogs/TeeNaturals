import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLeaf, FaSpa, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import emailjs from 'emailjs-com';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

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
    { name: 'Ingredients', href: '/ingredients' },
    { name: 'Sustainability', href: '/sustainability' }
  ];

  const shopLinks = [
    { name: 'Skincare', href: '/products?category=skincare' },
    { name: 'Haircare', href: '/products?category=haircare' },
    { name: 'Body Care', href: '/products?category=bodycare' },
    { name: 'Gift Sets', href: '/products?category=gifts' },
    { name: 'New Arrivals', href: '/products?filter=new' }
  ];

  
const handleSubscribe = async (e) => {
  e.preventDefault();

  if (!email) {
    setSubscribeStatus('Please enter your email');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setSubscribeStatus('Please enter a valid email');
    return;
  }

  try {
    const result = await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      { user_email: email },
      "YOUR_PUBLIC_KEY"
    );

    setSubscribeStatus("Email sent successfully!");
    setEmail("");
  } catch (error) {
    console.error(error);
    setSubscribeStatus("Failed to send email. Try again.");
  }

  setTimeout(() => setSubscribeStatus(""), 3000);
};


  return (
    <>
      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#0d1f1a] via-[#1a3a2e] to-[#0d1f1a] text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-1"
            >
              <div className="text-3xl font-['Playfair_Display'] mb-4">
                Tee Natural <span className="text-[#d4af37]">&</span> Essentials
              </div>
              <p className="text-white/60 mb-6 text-sm leading-relaxed">
                Natural Beauty, Naturally You. Crafted with love and nature's finest ingredients.
              </p>
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
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
                      title={social.label}
                      aria-label={social.label}
                    >
                      <IconComponent className="text-white text-lg group-hover:text-[#1a3a2e] transition-colors" />
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-['Playfair_Display'] text-[#d4af37] mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }}>
                    <a href={link.href} className="text-white/70 hover:text-[#d4af37] transition-colors text-sm flex items-center gap-2">
                      <span className="text-[#d4af37]">→</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Shop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-['Playfair_Display'] text-[#d4af37] mb-4">Shop</h3>
              <ul className="space-y-3">
                {shopLinks.map((link, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }}>
                    <a href={link.href} className="text-white/70 hover:text-[#d4af37] transition-colors text-sm flex items-center gap-2">
                      <span className="text-[#d4af37]">→</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-['Playfair_Display'] text-[#d4af37] mb-4">Stay Connected</h3>
              <p className="text-white/60 text-sm mb-4">
                Subscribe for exclusive offers and beauty tips
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#d4af37] transition-colors"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#d4af37] text-[#1a3a2e] rounded-full px-6 py-2 text-sm font-semibold"
                >
                  Subscribe
                </motion.button>
              </form>
              {subscribeStatus && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-2 text-xs ${
                    subscribeStatus.includes('Thank you') 
                      ? 'text-[#d4af37]' 
                      : 'text-red-400'
                  }`}
                >
                  {subscribeStatus}
                </motion.p>
              )}
              <div className="mt-6 flex items-center gap-2">
                <FaLeaf className="text-[#d4af37]" />
                <span className="text-white/60 text-xs">100% Natural • Cruelty Free</span>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
          />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-sm"
            >
              <p>© {new Date().getFullYear()} Tee Natural & Essentials. All rights reserved.</p>

            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex gap-6 text-sm"
            >
              {['Privacy Policy', 'Terms of Service', 'Shipping Info', 'Contact Us'].map((link, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="text-white/60 hover:text-[#d4af37] transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Decorative Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 right-8 hidden lg:block"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full bg-[#d4af37] flex items-center justify-center shadow-lg"
            >
              <div className="text-center">
                <FaSpa className="text-[#1a3a2e] text-2xl mx-auto mb-1" />
                <div className="text-[#1a3a2e] text-xs font-bold">Natural</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </>
  )
}

export default Footer