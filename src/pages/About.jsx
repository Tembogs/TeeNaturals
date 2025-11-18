import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLeaf, FaSpa, FaHeart, FaStar, FaShieldAlt, FaRecycle, FaUserFriends, FaAward } from 'react-icons/fa';
import { GiHealthNormal, GiFlowerPot } from 'react-icons/gi';

const TeeNaturalAbout = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const values = [
    {
      icon: FaLeaf,
      title: '100% Natural',
      description: 'We use only organic, natural ingredients sourced sustainably from nature',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FaShieldAlt,
      title: 'Quality First',
      description: 'Every product is carefully formulated and tested for safety and effectiveness',
      color: 'from-[#d4af37] to-[#b8941f]'
    },
    {
      icon: FaRecycle,
      title: 'Eco-Friendly',
      description: 'Sustainable packaging and environmentally conscious practices in everything we do',
      color: 'from-[#1a3a2e] to-[#2d5a47]'
    },
    {
      icon: FaHeart,
      title: 'Customer Care',
      description: 'Your satisfaction and skin health are our top priorities',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'Started our journey with a passion for natural beauty' },
    { year: '2021', title: '1,000+ Customers', description: 'Reached our first thousand happy customers' },
    { year: '2022', title: 'Expanded Range', description: 'Launched haircare line alongside skincare products' },
    { year: '2023', title: 'Going Green', description: 'Achieved 100% eco-friendly packaging' },
    { year: '2024', title: '10,000+ Customers', description: 'Serving thousands across Nigeria' }
  ];

  const team = [
    {
      name: 'Ibrahim Fatimah ohunene',
      role: 'Founder & CEO',
      image: '/favicon.jpg',
      description: 'Passionate about natural beauty and sustainable skincare'
    }
   
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '50+', label: 'Natural Products' },
    { number: '100%', label: 'Natural Ingredients' },
    { number: '4 Star', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-[#1a3a2e] via-[#2d5a47] to-[#1a3a2e] overflow-hidden flex items-center">
        {/* Animated Background Elements */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-white/80 mb-6"
              >
                <FaLeaf className="text-[#d4af37]" />
                <span className="font-['Cormorant_Garamond'] text-lg">Natural Beauty, Naturally You</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-6xl font-['Playfair_Display'] text-white mb-6 leading-tight"
              >
                Our <span className="text-[#d4af37]">Story</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/80 text-lg mb-6 leading-relaxed"
              >
                Founded with a passion for natural beauty, Tee Natural & Essentials was born from a simple belief: 
                that skincare should be as pure as nature intended. We combine traditional wisdom with modern science 
                to create products that nurture your skin naturally.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/70 text-base leading-relaxed"
              >
                Every product we create is crafted with love, using only the finest organic ingredients. 
                We're committed to sustainable practices that protect both your skin and our planet.
              </motion.p>
            </motion.div>

            {/* Right Content - Decorative Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative z-10"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-stone-200 to-stone-300 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] flex items-center justify-center shadow-2xl overflow-hidden">
                  <img 
                    src="/ref.png" 
                    alt="Natural skincare products"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#d4af37] rounded-full flex items-center justify-center shadow-xl"
              >
                <div className="text-center text-[#1a3a2e]">
                  <GiFlowerPot className="text-4xl mx-auto mb-1" />
                  <div className="text-xs font-bold">Natural</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                  className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2 font-['Playfair_Display']"
                >
                  {stat.number}
                </motion.div>
                <div className="text-[#1a3a2e]/70 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-[#1a3a2e] mb-4">
              Our <span className="text-[#d4af37]">Values</span>
            </h2>
            <p className="text-[#1a3a2e]/70 max-w-2xl mx-auto">
              Principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4`}
                >
                  <value.icon className="text-3xl text-white" />
                </motion.div>
                <h3 className="text-xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-3">
                  {value.title}
                </h3>
                <p className="text-[#1a3a2e]/70 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-6 bg-gradient-to-b from-stone-50 to-stone-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-[#1a3a2e] mb-4">
              Our <span className="text-[#d4af37]">Journey</span>
            </h2>
            <p className="text-[#1a3a2e]/70">Milestones that shaped who we are today</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#d4af37]/20 transform -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-2xl shadow-lg p-6 inline-block"
                    >
                      <div className="text-3xl font-bold text-[#d4af37] mb-2 font-['Playfair_Display']">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-[#1a3a2e]/70">{milestone.description}</p>
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-6 h-6 bg-[#d4af37] rounded-full border-4 border-white shadow-lg z-10 hidden md:block"
                  />

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-[#1a3a2e] mb-4">
              Meet Our <span className="text-[#d4af37]">Team</span>
            </h2>
            <p className="text-[#1a3a2e]/70">The passionate people behind our products</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a2e]/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-1">
                    {member.name}
                  </h3>
                  <div className="text-[#d4af37] font-semibold mb-3">{member.role}</div>
                  <p className="text-[#1a3a2e]/70 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-24 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <FaHeart className="text-4xl text-[#1a3a2e]" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-['Playfair_Display'] mb-6"
          >
            Join Our Natural Beauty Journey
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/80 mb-8 text-lg"
          >
            Experience the difference that pure, natural ingredients can make for your skin
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#d4af37] text-[#1a3a2e] px-8 py-4 rounded-full font-bold text-lg inline-block"
            >
              Shop Now
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg inline-block"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TeeNaturalAbout;