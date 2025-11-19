import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpa, FaClock, FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaLeaf, FaHeart, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';

const SpaBookingPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingStep, setBookingStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const services = [
    {
      id: 1,
      name: "Facial Spa",
      duration: "60 min",
      price: "₦25,000",
      description: "Luxurious facial treatment using natural organic ingredients",
      icon: <FaHeart />,
      color: "from-pink-600 to-pink-400"
    },
    {
      id: 2,
      name: "Full Body Spa",
      duration: "90 min",
      price: "₦60,000",
      description: "Complete body treatment including massage, scrub, and relaxation",
      icon: <FaSpa />,
      color: "from-green-600 to-green-400"
    }
  ];

  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM"
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone) {
      const message = `Hi! I'd like to book a spa appointment:

*Service:* ${selectedService?.name}
*Price:* ${selectedService?.price}
*Date:* ${selectedDate}
*Time:* ${selectedTime}

*My Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.notes ? `Special Requests: ${formData.notes}` : ''}

Please confirm my booking. Thank you!`;
      
      const whatsappUrl = `https://wa.me/2348055061699?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setBookingStep(1);
        setSelectedService(null);
        setSelectedDate('');
        setSelectedTime('');
        setFormData({ name: '', email: '', phone: '', notes: '' });
      }, 3000);
    }
  };

  const canProceedToStep2 = selectedService && selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5dc] via-white to-[#f5f5dc]">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45] opacity-90" />
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 text-[#d4af37] opacity-20 text-8xl"
        >
          <FaSpa />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="mb-6"
          >
            <FaSpa className="text-6xl md:text-7xl text-[#d4af37] mx-auto" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Playfair_Display']"
          >
            Book Your Spa Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-white/90"
          >
            Natural wellness treatments for body and soul
          </motion.p>
        </div>
      </motion.section>

      {/* Booking Steps Indicator */}
      <section className="py-8 px-6 bg-white shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                bookingStep === 1 
                  ? 'bg-[#1a3a2e] text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center font-bold">1</div>
              <span className="hidden md:inline font-medium">Select Service</span>
            </motion.div>
            <div className="w-12 h-1 bg-gray-300" />
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                bookingStep === 2 
                  ? 'bg-[#1a3a2e] text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                bookingStep === 2 ? 'bg-[#d4af37]' : 'bg-gray-400'
              }`}>2</div>
              <span className="hidden md:inline font-medium">Your Details</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Booking Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {bookingStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Services Grid */}
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a2e] mb-8 text-center font-['Playfair_Display']">
                    Choose Your Treatment
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {services.map((service) => (
                      <motion.div
                        key={service.id}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => setSelectedService(service)}
                        className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                          selectedService?.id === service.id
                            ? 'bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45] text-white shadow-2xl'
                            : 'bg-white text-gray-900 shadow-lg hover:shadow-xl'
                        }`}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`text-4xl mb-4 ${
                            selectedService?.id === service.id ? 'text-[#d4af37]' : 'text-[#1a3a2e]'
                          }`}
                        >
                          {service.icon}
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                        <p className={`text-sm mb-4 ${
                          selectedService?.id === service.id ? 'text-white/80' : 'text-gray-600'
                        }`}>
                          {service.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-2">
                            <FaClock className="text-sm" />
                            <span className="text-sm">{service.duration}</span>
                          </span>
                          <span className="text-2xl font-bold text-[#d4af37]">{service.price}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Date & Time Selection */}
                {selectedService && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-8 shadow-xl"
                  >
                    <h3 className="text-2xl font-bold text-[#1a3a2e] mb-6 font-['Playfair_Display']">
                      Select Date & Time
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {/* Date Picker */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
                          <FaCalendarAlt className="text-[#d4af37]" />
                          Choose Date
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d4af37] focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Time Picker */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
                          <FaClock className="text-[#d4af37]" />
                          Choose Time
                        </label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d4af37] focus:outline-none transition-colors"
                        >
                          <option value="">Select a time</option>
                          {availableTimes.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => canProceedToStep2 && setBookingStep(2)}
                      disabled={!canProceedToStep2}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                        canProceedToStep2
                          ? 'bg-gradient-to-r from-[#1a3a2e] to-[#2d5a45] text-white hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue to Details
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {bookingStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                {/* Booking Summary */}
                <div className="bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45] rounded-2xl p-6 mb-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Your Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Service:</span>
                      <span className="font-semibold">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Date:</span>
                      <span className="font-semibold">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Time:</span>
                      <span className="font-semibold">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-white/20">
                      <span className="text-white/80">Total:</span>
                      <span className="text-2xl font-bold text-[#d4af37]">{selectedService?.price}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-[#1a3a2e] mb-6 font-['Playfair_Display']">
                    Your Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                        <FaUser className="text-[#d4af37]" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d4af37] focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                        <FaEnvelope className="text-[#d4af37]" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d4af37] focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                        <FaPhone className="text-[#d4af37]" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d4af37] focus:outline-none transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                        <FaLeaf className="text-[#d4af37]" />
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d4af37] focus:outline-none transition-colors resize-none"
                        placeholder="Any allergies, preferences, or special requests..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBookingStep(1)}
                      className="flex-1 py-4 rounded-xl font-bold text-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      className="flex-1 py-4 rounded-xl font-bold text-lg bg-green-500 hover:bg-green-600 text-white hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="text-2xl" />
                      Book via WhatsApp
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <FaWhatsapp className="text-6xl text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-3xl font-bold text-[#1a3a2e] mb-4">Booking Sent!</h3>
              <p className="text-gray-600 mb-2">
                Your booking details have been sent to WhatsApp
              </p>
              <p className="text-sm text-gray-500">
                Our team will confirm your appointment shortly
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpaBookingPage;