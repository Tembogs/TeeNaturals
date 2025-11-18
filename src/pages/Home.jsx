import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaLeaf, FaSpa, FaHeart, FaStar, FaShoppingBag } from 'react-icons/fa';
import { GiHealthNormal, GiFlowerPot } from 'react-icons/gi';

const TeeNaturalLanding = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const AnimatedSection = ({ children, className = "" }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden font-['Plus_Jakarta_Sans']">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#1a3a2e] via-[#2d5a47] to-[#1a3a2e] overflow-hidden">{/* Animated Background Elements */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <motion.div style={{ opacity }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-white/80 mb-6"
              >
                <FaLeaf className="text-[#d4af37]" />
                <span className="font-['Cormorant_Garamond'] text-lg">Natural Touch Beauty Unveiled</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-['Playfair_Display'] text-white mb-6 leading-tight"
              >
                Skincare for
                <br />
                <span className="text-[#d4af37]">Everyone</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/70 text-lg mb-8 max-w-md"
              >
                Keep your skin healthy and young looking with our 100% organic, naturally crafted products
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#d4af37] text-[#1a3a2e] px-8 py-4 rounded-full font-semibold flex items-center gap-2"
                >
                  <FaShoppingBag />
                  Shop Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold"
                >
                  Learn More
                </motion.button>
              </motion.div>

              {/* Coconut Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 flex items-center gap-4"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                  >
                    <GiFlowerPot className="text-4xl text-[#d4af37]" />
                  </motion.div>
                </div>
                <div className="text-white">
                  <div className="text-3xl font-['Playfair_Display'] font-bold">100%</div>
                  <div className="text-sm opacity-80">Organic</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
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
                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80" 
                    alt="Woman applying natural skincare"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] rounded-full flex items-center justify-center shadow-xl"
              >
                <div className="text-center text-[#1a3a2e]">
                  <div className="text-xs font-['Cormorant_Garamond'] mb-1">100% Natural</div>
                  <FaLeaf className="text-2xl mx-auto" />
                  <div className="text-xs font-['Cormorant_Garamond'] mt-1">Products</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 right-10 text-right hidden md:block"
        >
          <p className="text-white/60 text-sm font-['Cormorant_Garamond'] italic">
            Natural Growth<br />
            Always be gentle<br />
            with your face
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <AnimatedSection className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-['Playfair_Display'] text-[#1a3a2e] mb-4">
              Elevate Your
              <br />
              <span className="text-[#d4af37]">Skincare Experience</span>
            </h2>
            <p className="text-[#1a3a2e]/70 max-w-2xl mx-auto">
              Let your skin naturally renew itself, apply day for a clear, youthful face everybody!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FaLeaf, title: "100% Natural", desc: "All organic ingredients sourced sustainably" },
              { icon: GiHealthNormal, title: "Gentle Formula", desc: "Powered by harmony for your skin and soul" },
              { icon: FaHeart, title: "For Everyone", desc: "Suitable for all skin types and ages" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-[#1a3a2e]/5"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] rounded-2xl flex items-center justify-center mb-6"
                >
                  <feature.icon className="text-3xl text-[#d4af37]" />
                </motion.div>
                <h3 className="text-2xl font-['Playfair_Display'] text-[#1a3a2e] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#1a3a2e]/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Product Categories */}
      <AnimatedSection className="py-20 px-6 bg-gradient-to-b from-stone-50 to-stone-100">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-['Playfair_Display'] text-[#1a3a2e] mb-12 text-center"
          >
            Our <span className="text-[#d4af37]">Collections</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Skincare", color: "from-cyan-400 to-cyan-600", items: ["Cleansers", "Serums", "Moisturizers"] },
              { title: "Haircare", color: "from-amber-400 to-amber-600", items: ["Shampoos", "Conditioners", "Hair Oils"] }
            ].map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl cursor-pointer"
              >
                <div className={`h-64 bg-gradient-to-br ${category.color} p-8 flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-white text-center z-10"
                  >
                    <h3 className="text-4xl font-['Playfair_Display'] mb-4">{category.title}</h3>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {category.items.map((item, j) => (
                        <span key={j} className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 bg-white/10 rounded-full blur-3xl"
                  />
                </div>
                <div className="p-6">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-[#1a3a2e] font-semibold group-hover:text-[#d4af37] transition-colors"
                  >
                    Explore Collection
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 px-6 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a47] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-24 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <FaStar className="text-4xl text-[#1a3a2e]" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-['Playfair_Display'] mb-6"
          >
            Ready to Transform Your Skin?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/80 mb-8 text-lg"
          >
            Join thousands who trust natural beauty solutions
          </motion.p>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#d4af37] text-[#1a3a2e] px-12 py-4 rounded-full font-bold text-lg"
          >
            Start Your Journey
          </motion.button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default TeeNaturalLanding;