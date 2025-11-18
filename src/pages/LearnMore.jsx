import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaLeaf, FaHeart, FaSeedling, FaHandHoldingHeart, FaRecycle, FaUsers, FaAward, FaGlobe } from 'react-icons/fa';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});

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
        staggerChildren: 0.2
      }
    }
  };

  const values = [
    {
      icon: <FaLeaf className="text-4xl" />,
      title: "100% Natural",
      description: "We use only pure, natural ingredients sourced from nature's finest offerings."
    },
    {
      icon: <FaRecycle className="text-4xl" />,
      title: "Sustainable",
      description: "Committed to eco-friendly practices and sustainable sourcing for a better planet."
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Made with Love",
      description: "Every product is handcrafted with care and dedication to quality."
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Community First",
      description: "Supporting local communities and empowering sustainable livelihoods."
    }
  ];

  const milestones = [
    { year: "2020", title: "Founded", description: "Started with a vision for natural wellness" },
    { year: "2021", title: "100+ Products", description: "Expanded our natural product line" },
    { year: "2023", title: "5K+ Customers", description: "Reached thousands of happy customers" },
    { year: "2024", title: "Going Global", description: "Expanding to serve customers worldwide" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5dc] via-white to-[#f5f5dc]">
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
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 text-[#d4af37] opacity-20 text-9xl"
        >
          <FaLeaf />
        </motion.div>
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-10 text-[#d4af37] opacity-20 text-7xl"
        >
          <FaSeedling />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="mb-6"
          >
            <FaLeaf className="text-6xl md:text-7xl text-[#d4af37] mx-auto" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Playfair_Display']"
          >
            About Tee Natural <span className="text-[#d4af37]">&</span> Essentials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Bringing nature's purest gifts to your doorstep with love, care, and sustainability
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a2e] mb-6 font-['Playfair_Display']">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                Tee Natural & Essentials was born from a simple belief: nature provides everything we need for true wellness. Founded in 2020, we set out on a mission to create products that honor both your health and our planet.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every product we craft is a testament to our commitment to purity, sustainability, and the incredible power of natural ingredients. We work directly with farmers and communities who share our values, ensuring that every purchase supports ethical and sustainable practices.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we're proud to serve thousands of customers who trust us to deliver nature's best, packaged with care and delivered with love.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45] rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <FaUsers className="text-4xl text-[#d4af37] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">5K+</div>
                    <div className="text-white/80">Happy Customers</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <FaLeaf className="text-4xl text-[#d4af37] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">100+</div>
                    <div className="text-white/80">Natural Products</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <FaGlobe className="text-4xl text-[#d4af37] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">10+</div>
                    <div className="text-white/80">Countries Served</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <FaAward className="text-4xl text-[#d4af37] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">100%</div>
                    <div className="text-white/80">Natural & Pure</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
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
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-8" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing ingredients to packaging our products
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45] rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-[#d4af37] mb-4 flex justify-center"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/80">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a2e] mb-6 font-['Playfair_Display']">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-8" />
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#d4af37]/30" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:flex-row`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-2xl p-6 shadow-lg"
                    >
                      <div className="text-4xl font-bold text-[#d4af37] mb-2">{milestone.year}</div>
                      <h3 className="text-2xl font-bold text-[#1a3a2e] mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center shadow-lg z-10"
                  >
                    <FaLeaf className="text-white text-2xl" />
                  </motion.div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45] relative overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 text-[#d4af37] opacity-10 text-[20rem]"
        >
          <FaHeart />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <FaHandHoldingHeart className="text-6xl text-[#d4af37] mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-['Playfair_Display']">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              To empower individuals to embrace natural wellness while fostering sustainable practices that protect our planet for future generations.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#d4af37] hover:bg-[#c29d2f] text-[#1a3a2e] px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all"
            >
              Join Our Journey
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a2e] mb-6">
            Ready to Experience Nature's Best?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore our collection of 100% natural products crafted with love and care
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#1a3a2e] to-[#2d5a45] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;