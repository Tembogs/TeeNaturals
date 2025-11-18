import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter, FaPaperPlane, FaLeaf, FaClock, FaCheckCircle } from 'react-icons/fa';

const TeeNaturalContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const VENDOR_PHONE = "234 805 506 1699"; 
  const VENDOR_WHATSAPP = `https://wa.me/${VENDOR_PHONE}`;
  const VENDOR_EMAIL = "Ibrahimfateemah433@gmail.com"; 
  const VENDOR_ADDRESS = "Ilorin International Airport Road, Kwara, Nigeria"; 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send via WhatsApp
    const message = `*New Contact Form Submission*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Subject:* ${formData.subject}%0A%0A*Message:*%0A${formData.message}`;
    window.open(`${VENDOR_WHATSAPP}?text=${message}`, '_blank');
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: '+234 805 506 1699',
      link: VENDOR_WHATSAPP,
      color: 'from-[#25D366] to-[#128C7E]',
      description: 'Chat with us instantly'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: '+234 805 506 1699',
      link: `tel:${VENDOR_PHONE}`,
      color: 'from-[#d4af37] to-[#b8941f]',
      description: 'Call us anytime'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'ibraheemfatimah433@gmail.com',
      link: `mailto:${VENDOR_EMAIL}`,
      color: 'from-[#1a3a2e] to-[#2d5a47]',
      description: 'Send us an email'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'Kwara, Nigeria',
      link: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.5612946190827!2d4.491408!3d8.4312748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1037acc6dad7fb0d%3A0x5ff248cc35ee5bb7!2sAirport%20Rd%2C%20Kwara!5e0!3m2!1sen!2sng!4v1731840000000!5m2!1sen!2sng',
      color: 'from-red-500 to-red-600',
      description: 'Visit our store'
    }
  ];

  const workingHours = [
    { day: 'Tuesday - Sunday', hours: '24hrs Open' },
    { day: 'Monday', hours: 'Closed' }
  ];

  const faqs = [
    {
      question: 'Do you offer free consultations?',
      answer: 'Yes! We provide free skincare consultations via WhatsApp to help you choose the perfect products, but only when we are running sales, outside of that consultations are paid for.'
    },
    {
      question: 'What is your delivery timeframe?',
      answer: 'We deliver within 2-5 business days within kwara and 5-7 days nationwide.'
    },
    {
      question: 'Are your products 100% natural?',
      answer: 'Absolutely! All our products are made from  natural ingredients with no harmful chemicals pr preservatives.'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaLeaf className="text-4xl text-[#1a3a2e]" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] text-[#1a3a2e] mb-4">
            Get In <span className="text-[#d4af37]">Touch</span>
          </h1>
          <p className="text-[#1a3a2e]/70 text-lg max-w-2xl mx-auto">
            Have questions about our products or need personalized skincare advice? We're here to help!
          </p>
        </motion.div>

        {/* Quick Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, i) => (
            <motion.a
              key={i}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="block"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mb-4`}
                >
                  <method.icon className="text-3xl text-white" />
                </motion.div>
                <h3 className="text-xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-2">
                  {method.title}
                </h3>
                <p className="text-sm text-[#1a3a2e]/60 mb-2">{method.description}</p>
                <p className="text-[#d4af37] font-semibold">{method.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <FaCheckCircle className="text-5xl text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#1a3a2e]/70">We'll get back to you shortly via WhatsApp</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-[#1a3a2e] font-semibold mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 text-[#1a3a2e] focus:outline-none focus:border-[#d4af37] transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1a3a2e] font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 text-[#1a3a2e] focus:outline-none focus:border-[#d4af37] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1a3a2e] font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 text-[#1a3a2e] focus:outline-none focus:border-[#d4af37] transition-colors"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a3a2e] font-semibold mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 text-[#1a3a2e] focus:outline-none focus:border-[#d4af37] transition-colors"
                    placeholder="Product Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-[#1a3a2e] font-semibold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 text-[#1a3a2e] focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#1a3a2e] text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  Send Message
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Working Hours */}
            <div className="bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <FaClock className="text-3xl text-[#d4af37]" />
                <h3 className="text-2xl font-['Playfair_Display'] font-bold">Working Hours</h3>
              </div>
              <div className="space-y-3">
                {workingHours.map((schedule, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                    <span className="text-white/80">{schedule.day}</span>
                    <span className="font-semibold text-[#d4af37]">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp */}
            <motion.a
              href={VENDOR_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(37, 211, 102, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="block bg-[#25D366] rounded-3xl shadow-xl p-8 text-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <FaWhatsapp className="text-4xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-['Playfair_Display'] font-bold">Chat on WhatsApp</h3>
                  <p className="text-white/90">Get instant responses</p>
                </div>
              </div>
              <p className="text-white/80 mb-4">
                Need quick help? Chat with us directly on WhatsApp for instant support and product recommendations.
              </p>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <span>Start Chat</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </motion.a>

            {/* Social Media */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-6">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {[
                  { icon: FaInstagram, link: '#', color: 'from-purple-500 to-pink-500' },
                  { icon: FaFacebook, link: '#', color: 'from-blue-500 to-blue-600' },
                  { icon: FaTwitter, link: '#', color: 'from-blue-400 to-blue-500' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center text-white text-xl shadow-lg`}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-8 text-center">
            Frequently Asked <span className="text-[#d4af37]">Questions</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-stone-50 rounded-2xl p-6"
              >
                <h4 className="text-lg font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-3">
                  {faq.question}
                </h4>
                <p className="text-[#1a3a2e]/70 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeeNaturalContact;