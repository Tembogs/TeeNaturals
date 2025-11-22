import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaShoppingCart, FaUndo, FaExclamationTriangle, FaTruck, FaShieldAlt, FaLeaf, FaLock, FaUserCheck, FaBox } from 'react-icons/fa';

const TermsConditions = () => {
  const sections = [
    {
      icon: FaLeaf,
      title: '1. Product Use',
      content: [
        'Our products are made with natural and skin-loving ingredients, but results may vary depending on individual skin types.',
        'All products should be used as directed on the label.',
        'Customers with sensitive skin, allergies, or medical conditions are advised to perform a patch test before full application.',
        'Tee Naturals and Essentials is not responsible for reactions that occur due to improper use or failure to follow instructions.'
      ]
    },
    {
      icon: FaShoppingCart,
      title: '2. Orders & Payment',
      content: [
        'All orders must be fully paid for before processing.',
        'We reserve the right to decline or cancel orders due to incorrect information, product unavailability, or suspicious transactions.',
        'Prices may change without prior notice.'
      ]
    },
    {
      icon: FaTruck,
      title: '3. Shipping & Delivery',
      content: [
        'Delivery timelines may vary based on location and courier availability.',
        'Once an order has been shipped, Tee Naturals and Essentials is not liable for courier delays, damage, or loss.',
        'Customers must provide accurate delivery information. We are not responsible for failed deliveries caused by incorrect addresses.'
      ]
    },
    {
      icon: FaUndo,
      title: '4. Returns & Refunds',
      content: [
        'Due to the nature of skincare products, we do not accept returns once a product has been opened or used.',
        'Refunds may only be issued for unopened items returned within 48 hours of delivery, and only if approved after inspection.',
        'Refunds for wrong or damaged items must be reported within 24 hours of receiving your package.'
      ]
    },
    {
      icon: FaBox,
      title: '5. Product Availability',
      content: [
        'All products are subject to availability.',
        'We may discontinue, reformulate, or update products at any time without prior notice.'
      ]
    },
    {
      icon: FaShieldAlt,
      title: '6. Intellectual Property',
      content: [
        'All content, logos, product designs, and brand materials belonging to Tee Naturals and Essentials are protected.',
        'Unauthorized copying, use, or reproduction of our images, descriptions, or branding is prohibited.'
      ]
    },
    {
      icon: FaUserCheck,
      title: '7. Customer Responsibilities',
      content: [
        'Customers are responsible for reading ingredient lists to avoid allergies or reactions.',
        'Skincare results vary; consistency and proper usage are required for best outcomes.'
      ]
    },
    {
      icon: FaExclamationTriangle,
      title: '8. Limitation of Liability',
      content: [
        'Tee Naturals and Essentials is not liable for reactions caused by personal skin sensitivity, misuse of products, incorrect application, or third-party shipping issues.',
        'Our products are not medical treatments and should not replace professional advice.'
      ]
    },
    {
      icon: FaLock,
      title: '9. Privacy & Data Protection',
      content: [
        'Customer information is used strictly for order processing and communication.',
        'We do not share or sell personal data to third parties.'
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
              <FaFileContract className="text-4xl text-[#1a3a2e]" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] mb-4">
              Terms & Conditions
            </h1>
            <p className="text-white/80 text-lg">
              Tee Naturals and Essentials
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
              These Terms and Conditions govern the use of our products, services, and online platforms. By 
              purchasing from or interacting with Tee Naturals and Essentials, you agree to the following terms.
            </p>
            <p className="text-[#1a3a2e]/80 text-lg leading-relaxed">
              Please read these terms carefully before making a purchase or using our services.
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
              transition={{ delay: i * 0.05 }}
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

      {/* Acceptance Section */}
      <section className="py-12 px-6 bg-stone-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] rounded-2xl shadow-lg p-8 text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FaUserCheck className="text-3xl text-[#1a3a2e]" />
            </motion.div>
            <h2 className="text-3xl font-['Playfair_Display'] mb-4">
              10. Acceptance of Terms
            </h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
              By placing an order or using our website, you acknowledge that you have read, understood, 
              and agreed to these Terms and Conditions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-amber-50 border-2 border-[#d4af37] rounded-2xl p-8"
          >
            <div className="flex items-start gap-4">
              <FaExclamationTriangle className="text-3xl text-[#d4af37] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-3">
                  Important Notice
                </h3>
                <p className="text-[#1a3a2e]/70 leading-relaxed mb-3">
                  Our products are formulated with natural ingredients for skincare and wellness purposes. They are 
                  not intended to diagnose, treat, cure, or prevent any disease or medical condition.
                </p>
                <p className="text-[#1a3a2e]/70 leading-relaxed">
                  If you have any concerns about how our products may interact with your skin or existing conditions, 
                  please consult with a healthcare professional before use.
                </p>
              </div>
            </div>
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
              Questions About Our Terms?
            </h2>
            <p className="text-white/80 mb-6 text-lg">
              If you have any questions about these Terms and Conditions, please don't hesitate to contact us.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-[#d4af37] text-[#1a3a2e] px-8 py-4 rounded-full font-bold text-lg"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;