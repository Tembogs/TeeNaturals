import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserShield, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: FaUserShield,
      title: 'Information We Collect',
      content: [
        'Personal information such as name, email address, phone number, and shipping address when you place an order or create an account.',
        'Payment information processed securely through our payment providers.',
        'Device and browsing information including IP address, browser type, and pages visited.',
        'Communication preferences and marketing consent.'
      ]
    },
    {
      icon: FaLock,
      title: 'How We Use Your Information',
      content: [
        'Process and fulfill your orders efficiently.',
        'Communicate with you about your orders, products, and services.',
        'Send promotional emails and updates (only with your consent).',
        'Improve our website, products, and customer service.',
        'Comply with legal obligations and protect against fraud.'
      ]
    },
    {
      icon: FaShieldAlt,
      title: 'Information Protection',
      content: [
        'We implement industry-standard security measures to protect your personal data.',
        'Payment information is encrypted and processed through secure payment gateways.',
        'Access to personal information is restricted to authorized personnel only.',
        'We regularly review and update our security practices.'
      ]
    },
    {
      icon: FaEnvelope,
      title: 'Information Sharing',
      content: [
        'We do not sell, trade, or rent your personal information to third parties.',
        'We may share information with service providers who assist in operating our business (e.g., shipping companies, payment processors).',
        'We may disclose information when required by law or to protect our rights.',
        'All third-party providers are contractually obligated to keep your information secure.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a3a2e] via-[#2d5a47] to-[#1a3a2e] text-white py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FaShieldAlt className="text-4xl text-[#1a3a2e]" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/80 text-lg">
              Your privacy matters to us. Learn how we protect your information.
            </p>
            <p className="text-white/60 text-sm mt-4">
              Last Updated: November 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <p className="text-[#1a3a2e]/80 text-lg leading-relaxed mb-4">
              At Tee Natural & Essentials, we are committed to protecting your privacy and ensuring the security 
              of your personal information. This Privacy Policy explains how we collect, use, protect, and share 
              information about you when you use our website and services.
            </p>
            <p className="text-[#1a3a2e]/80 text-lg leading-relaxed">
              By using our website and services, you agree to the collection and use of information in accordance 
              with this policy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-['Playfair_Display'] text-[#1a3a2e] font-bold">
                    {section.title}
                  </h2>
                </div>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-[#d4af37] mt-1">•</span>
                    <span className="text-[#1a3a2e]/70 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Rights */}
      <section className="py-12 px-6 bg-stone-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-6">
              Your Rights
            </h2>
            <div className="space-y-4 text-[#1a3a2e]/70 leading-relaxed">
              <p>
                <strong className="text-[#1a3a2e]">Access:</strong> You have the right to request access to the 
                personal information we hold about you.
              </p>
              <p>
                <strong className="text-[#1a3a2e]">Correction:</strong> You can request that we correct any 
                inaccurate or incomplete information.
              </p>
              <p>
                <strong className="text-[#1a3a2e]">Deletion:</strong> You may request that we delete your personal 
                information, subject to certain exceptions.
              </p>
              <p>
                <strong className="text-[#1a3a2e]">Opt-Out:</strong> You can opt-out of marketing communications at 
                any time by clicking the unsubscribe link in our emails.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookies */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-6">
              Cookies and Tracking
            </h2>
            <p className="text-[#1a3a2e]/70 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze site 
              traffic, and understand where our visitors are coming from. You can control cookie settings through 
              your browser preferences.
            </p>
            <p className="text-[#1a3a2e]/70 leading-relaxed">
              By continuing to use our website, you consent to our use of cookies in accordance with this policy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-6 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-['Playfair_Display'] mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-white/80 mb-6">
              If you have any questions about this Privacy Policy or how we handle your data, 
              please don't hesitate to contact us.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-[#d4af37] text-[#1a3a2e] px-8 py-4 rounded-full font-bold"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;