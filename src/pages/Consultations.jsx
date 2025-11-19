import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaUserMd, FaLeaf, FaCheckCircle, FaHeart, FaSpa, FaInfoCircle, FaClock, FaDollarSign, FaComments } from 'react-icons/fa';

const ConsultationPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const consultations = [
    {
      id: 1,
      title: "Skincare Consultation",
      duration: "45 minutes",
      fee: "₦10,000",
      icon: <FaHeart />,
      description: "Personalized skincare routine and product recommendations",
      includes: [
        "Skin type analysis",
        "Product recommendations",
        "Custom skincare routine",
        "Follow-up guidance"
      ],
      color: "from-pink-600 to-pink-400"
    },
    {
      id: 2,
      title: "Hair Care Consultation",
      duration: "45 minutes",
      fee: "₦12,000",
      icon: <FaSpa />,
      description: "Expert guidance for healthy, natural hair care",
      includes: [
        "Hair type assessment",
        "Natural hair care routine",
        "Product recommendations",
        "Scalp health analysis"
      ],
      color: "from-purple-600 to-purple-400"
    },
    {
      id: 3,
      title: "Weight Management Consultation",
      duration: "60 minutes",
      fee: "₦15,000",
      icon: <FaLeaf />,
      description: "Personalized weight gain or weight loss guidance",
      includes: [
        "Health assessment",
        "Custom nutrition plan",
        "Natural supplement advice",
        "Lifestyle recommendations"
      ],
      color: "from-green-600 to-green-400"
    },
    {
      id: 4,
      title: "Bridal Wellness Consultation",
      duration: "60 minutes",
      fee: "₦11,000",
      icon: <FaHeart />,
      description: "Complete wellness plan for your special day",
      includes: [
        "Skin & hair preparation",
        "Stress management tips",
        "Bridal glow routine",
        "Timeline planning"
      ],
      color: "from-rose-600 to-rose-400"
    }
  ];

  const benefits = [
    {
      icon: <FaUserMd />,
      title: "Expert Guidance",
      description: "Get advice from certified natural wellness experts"
    },
    {
      icon: <FaLeaf />,
      title: "Natural Solutions",
      description: "Discover holistic and natural approaches to wellness"
    },
    {
      icon: <FaHeart />,
      title: "Personalized Care",
      description: "Receive customized recommendations for your needs"
    },
    {
      icon: <FaComments />,
      title: "Ongoing Support",
      description: "Continue the conversation with follow-up guidance"
    }
  ];

  const handleBookConsultation = (consultation) => {
    setSelectedConsultation(consultation);
    setShowModal(true);
  };

  const proceedToWhatsApp = () => {
    const message = `Hi! I'd like to book a ${selectedConsultation.title} (${selectedConsultation.fee} - ${selectedConsultation.duration}). Please let me know the next steps.`;
    const whatsappUrl = `https://wa.me/2348055061699?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f5dc] to-white">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45] opacity-90" />
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 text-[#d4af37] opacity-20 text-9xl"
        >
          <FaUserMd />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 15, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 text-[#d4af37] opacity-20 text-7xl"
        >
          <FaLeaf />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="mb-6"
          >
            <FaUserMd className="text-6xl md:text-7xl text-[#d4af37] mx-auto" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Playfair_Display']"
          >
            Expert Consultations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
          >
            Get personalized guidance from our natural wellness experts to help you achieve your health and beauty goals
          </motion.p>
        </div>
      </motion.section>

      {/* Important Notice */}
      <section className="py-12 px-6 -mt-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl p-8 shadow-2xl border-4 border-white">
            <div className="flex items-start gap-4">
              <FaInfoCircle className="text-4xl text-white flex-shrink-0 mt-1" />
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-3">Important Information</h3>
                <p className="text-lg mb-2">
                  All consultations require a consultation fee to ensure dedicated time with our experts.
                </p>
                <p className="text-white/90">
                  This fee covers professional advice, personalized recommendations, and follow-up support. Payment is required before booking.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Consultation Options */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a2e] mb-6 font-['Playfair_Display']">
              Choose Your Consultation
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-8" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select the consultation that best fits your needs and connect with our experts via WhatsApp
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {consultations.map((consultation, index) => (
              <motion.div
                key={consultation.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${consultation.color} p-8 text-white text-center`}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl mb-4 flex justify-center"
                  >
                    {consultation.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">{consultation.title}</h3>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <FaClock />
                      <span className="text-sm">{consultation.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaDollarSign />
                      <span className="text-xl font-bold">{consultation.fee}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6">{consultation.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-bold text-gray-900 mb-2">Includes:</h4>
                    {consultation.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBookConsultation(consultation)}
                    className="w-full bg-gradient-to-r from-[#1a3a2e] to-[#2d5a45] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    <FaWhatsapp className="text-xl" />
                    Book via WhatsApp
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a2e] mb-6 font-['Playfair_Display']">
              Why Book a Consultation?
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg"
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#f5f5dc] to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a2e] mb-6 font-['Playfair_Display']">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Choose Consultation", description: "Select the consultation type that fits your needs" },
              { step: "2", title: "Pay Consultation Fee", description: "Complete payment through our secure WhatsApp process" },
              { step: "3", title: "Connect on WhatsApp", description: "Our expert will reach out to schedule your session" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-[#d4af37] text-3xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <FaWhatsapp className="text-6xl mx-auto mb-6 text-[#d4af37]" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Book your consultation today and get personalized guidance from our natural wellness experts
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#d4af37] hover:bg-[#c29d2f] text-[#1a3a2e] px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all"
          >
            Choose Your Consultation
          </motion.button>
        </motion.div>
      </section>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && selectedConsultation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-6xl text-green-500 mb-4"
                >
                  <FaWhatsapp className="mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#1a3a2e] mb-2">Consultation Fee Required</h3>
              </div>

              <div className="bg-[#f5f5dc] rounded-2xl p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-4">Booking Details:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultation:</span>
                    <span className="font-semibold text-gray-900">{selectedConsultation.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-gray-900">{selectedConsultation.duration}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                    <span className="text-gray-600">Consultation Fee:</span>
                    <span className="text-2xl font-bold text-[#d4af37]">{selectedConsultation.fee}</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-900">
                  <strong>Note:</strong> The consultation fee must be paid before booking. Our team will guide you through the payment process via WhatsApp.
                </p>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={proceedToWhatsApp}
                  className="flex-1 py-3 rounded-xl font-bold bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <FaWhatsapp className="text-xl" />
                  Continue to WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConsultationPage;