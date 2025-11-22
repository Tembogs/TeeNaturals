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
      title: 'Purity',
      description: 'We are committed to using clean, natural, and skin-loving ingredients. Every product is crafted with honesty and integrity, free from harmful chemicals or harsh additives.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: GiFlowerPot,
      title: 'Nature First',
      description: 'Herbs and botanicals are at the heart of our brand. We value the healing power of nature and honor traditional herbal knowledge in our formulations.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: FaAward,
      title: 'Quality & Excellence',
      description: 'We believe that skincare should deliver real results. Every product undergoes careful crafting, testing, and improvement to ensure high performance and customer satisfaction.',
      color: 'from-[#d4af37] to-[#b8941f]'
    },
    {
      icon: FaShieldAlt,
      title: 'Transparency',
      description: 'We value honesty. From ingredients to product benefits, we are open about what goes into our formulations and how they work for your skin.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaStar,
      title: 'Affordability',
      description: 'Everyone deserves access to quality skincare. We ensure that our products remain effective, premium, and still within reach for everyday users.',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: FaHeart,
      title: 'Customer-Centered Care',
      description: 'Our customers are the heart of our brand. We listen, learn, and improve based on their needs, ensuring every experience is positive.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: FaUserFriends,
      title: 'Education & Empowerment',
      description: 'We aim to teach our community about natural skincare practices. Through knowledge, we empower individuals to make healthier, more confident choices for their skin.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: GiHealthNormal,
      title: 'Consistency',
      description: 'We remain consistent in our mission, our quality, and our dedication to natural beauty. Every product reflects our long-term commitment to excellence.',
      color: 'from-[#1a3a2e] to-[#2d5a47]'
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
      name: 'Ibrahim Fatimah Ohunene',
      role: 'Founder & Creative Director',
      image: '/favicon.jpg',
      description: 'Passionate mind behind Tee Naturals and Essentials, with deep-rooted knowledge of traditional herbal remedies and a dedication to creating gentle, effective skincare solutions that enhance natural beauty.'
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
                Tee Naturals and Essentials is a proudly nature-inspired skincare and wellness brand dedicated to 
                creating safe, effective, and high-quality products that enhance the skin's natural beauty. Built on 
                the foundation of herbal knowledge and purity, we harness the power of nature to promote healthy, 
                glowing, and well-nourished skin.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/70 text-base leading-relaxed"
              >
                We believe that skincare should be simple, gentle, and rooted in nature. Our formulations are crafted 
                using carefully selected herbs and skin-loving ingredients known for their healing, soothing, and 
                revitalizing properties—delivering visible results while remaining safe for all skin types, especially 
                melanin-rich skin.
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

      {/* Brand Mission Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-[#1a3a2e] mb-4">
              Our <span className="text-[#d4af37]">Mission</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-3xl p-8 md:p-12"
          >
            <p className="text-[#1a3a2e]/80 text-lg leading-relaxed mb-6">
              Our journey began with a desire to offer skincare solutions that people can trust. Many individuals 
              struggle with harsh chemical products that do more harm than good. Tee Naturals and Essentials was 
              created to change that narrative by providing natural alternatives that are both effective and affordable.
            </p>
            <p className="text-[#1a3a2e]/80 text-lg leading-relaxed mb-6">
              From exfoliating soaps and nourishing serums to hydrating gels and body essentials, every product 
              reflects our unwavering commitment to nature-based skincare, transparency, handcrafted excellence, 
              and customer satisfaction.
            </p>
            <p className="text-[#1a3a2e]/80 text-lg leading-relaxed">
              As we continue to grow, our mission remains the same: <span className="font-bold text-[#d4af37]">to empower 
              individuals to embrace their natural beauty through products inspired by the earth.</span> Tee Naturals and 
              Essentials stands as a symbol of purity, wellness, and the endless possibilities of herbal skincare.
            </p>
          </motion.div>
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
            <p className="text-[#1a3a2e]/70 max-w-3xl mx-auto text-lg">
              Our values guide every product we create and every decision we make. They reflect who we are, 
              what we stand for, and the kind of impact we aim to make in the world of natural skincare.
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
              Meet Our <span className="text-[#d4af37]">Founder</span>
            </h2>
            <p className="text-[#1a3a2e]/70">The passionate mind behind our products</p>
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
                className="bg-white rounded-3xl shadow-lg overflow-hidden md:col-span-3 max-w-4xl mx-auto"
              >
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2 relative aspect-square md:aspect-auto overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a2e]/80 to-transparent" />
                  </div>
                  <div className="md:col-span-3 p-6 md:p-8">
                    <h3 className="text-3xl font-['Playfair_Display'] text-[#1a3a2e] font-bold mb-1">
                      {member.name}
                    </h3>
                    <div className="text-[#d4af37] font-semibold mb-4 text-lg">{member.role}</div>
                    <p className="text-[#1a3a2e]/70 text-sm leading-relaxed mb-3">
                      Ibrahim Fatimah Ohunene is the passionate mind behind Tee Naturals and Essentials, 
                      a skincare and wellness brand inspired by nature, purity, and the healing power of herbs. 
                      With deep-rooted knowledge of traditional herbal remedies, Fatimah has dedicated her journey 
                      to creating gentle, effective skincare solutions that enhance natural beauty.
                    </p>
                    <p className="text-[#1a3a2e]/70 text-sm leading-relaxed mb-3">
                      Her love for herbal wellness began at a young age, shaped by her exposure to plants and 
                      natural treatments. This curiosity grew into strong expertise—leading her to research, 
                      study, and master the benefits of various herbs, giving Tee Naturals and Essentials 
                      its authentic foundation.
                    </p>
                    <p className="text-[#1a3a2e]/70 text-sm leading-relaxed mb-3">
                      Fatimah created Tee Naturals and Essentials to bridge the gap between quality natural 
                      skincare and everyday accessibility. She believes everyone deserves safe, skin-loving 
                      products without harsh chemicals. Each product is thoughtfully crafted using carefully 
                      selected herbs designed to nourish, restore, and protect the skin.
                    </p>
                    <p className="text-[#1a3a2e]/70 text-sm leading-relaxed">
                      As a founder, she remains committed to transparency, customer education, and continuous 
                      improvement, using her platform to enlighten her community on natural skincare practices 
                      that celebrate their skin's natural glow.
                    </p>
                  </div>
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