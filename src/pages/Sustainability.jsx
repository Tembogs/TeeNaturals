import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle, FaSeedling, FaWater, FaSun, FaHandHoldingHeart, FaTree, FaGlobeAmericas, FaHeart, FaUsers, FaBoxOpen, FaTruck } from 'react-icons/fa';

const SustainabilityPage = () => {
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

  const commitments = [
    {
      icon: <FaLeaf className="text-5xl" />,
      title: "100% Natural Ingredients",
      description: "We source only pure, natural ingredients free from harmful chemicals, pesticides, and synthetic additives.",
      color: "from-green-600 to-green-400"
    },
    {
      icon: <FaRecycle className="text-5xl" />,
      title: "Zero Waste Packaging",
      description: "Our packaging is fully recyclable, biodegradable, and made from post-consumer recycled materials.",
      color: "from-blue-600 to-blue-400"
    },
    {
      icon: <FaSeedling className="text-5xl" />,
      title: "Regenerative Farming",
      description: "We partner with farms that practice regenerative agriculture to restore soil health and biodiversity.",
      color: "from-emerald-600 to-emerald-400"
    },
    {
      icon: <FaWater className="text-5xl" />,
      title: "Water Conservation",
      description: "Our production processes minimize water usage and ensure zero water pollution.",
      color: "from-cyan-600 to-cyan-400"
    },
    {
      icon: <FaSun className="text-5xl" />,
      title: "Renewable Energy",
      description: "Our facilities are powered by 100% renewable energy sources including solar and wind.",
      color: "from-yellow-600 to-yellow-400"
    },
    {
      icon: <FaUsers className="text-5xl" />,
      title: "Fair Trade Practices",
      description: "We ensure fair wages and safe working conditions for all workers in our supply chain.",
      color: "from-purple-600 to-purple-400"
    }
  ];

  const impacts = [
    { number: "5", label: "Trees Planted", icon: <FaTree /> },
    { number: "100%", label: "Carbon Neutral", icon: <FaGlobeAmericas /> },
    { number: "500+", label: "Farmers Supported", icon: <FaHandHoldingHeart /> },
    { number: "Zero", label: "Plastic Waste", icon: <FaRecycle /> }
  ];

  const journey = [
    {
      icon: <FaSeedling />,
      title: "Ethical Sourcing",
      description: "We work directly with certified organic farmers who use sustainable farming practices."
    },
    {
      icon: <FaBoxOpen />,
      title: "Eco-Friendly Production",
      description: "Our manufacturing process is designed to minimize environmental impact at every step."
    },
    {
      icon: <FaTruck />,
      title: "Carbon-Neutral Shipping",
      description: "We offset 100% of our shipping emissions through verified carbon credit programs."
    },
    {
      icon: <FaRecycle />,
      title: "Circular Economy",
      description: "Our packaging is designed for reuse and recycling, closing the loop on waste."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-700 to-emerald-600 opacity-95" />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 text-green-400 opacity-10 text-[30rem]"
          >
            <FaGlobeAmericas />
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 left-10 text-green-300 opacity-20 text-[15rem]"
          >
            <FaLeaf />
          </motion.div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="mb-8"
          >
            <FaGlobeAmericas className="text-7xl md:text-8xl text-green-300 mx-auto" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Playfair_Display']"
          >
            Our Commitment to <span className="text-green-300">Sustainability</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed"
          >
            Building a greener future, one natural product at a time. Our planet's health is our priority.
          </motion.p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6 -mt-20 relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impacts.map((impact, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-2xl text-center border-2 border-green-100"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-green-600 text-5xl mb-4 flex justify-center"
                >
                  {impact.icon}
                </motion.div>
                <div className="text-4xl font-bold text-green-700 mb-2">{impact.number}</div>
                <div className="text-gray-600 font-medium">{impact.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Our Commitments */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-green-900 mb-6 font-['Playfair_Display']">
              Our Sustainability Pillars
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-8" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every decision we make is guided by our commitment to environmental stewardship and social responsibility
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {commitments.map((commitment, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${commitment.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-green-600 mb-6 relative z-10"
                >
                  {commitment.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
                  {commitment.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {commitment.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Journey */}
      <section className="py-20 px-6 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-green-900 mb-6 font-['Playfair_Display']">
              From Earth to You
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-8" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow the sustainable journey of our products from farm to your home
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-green-400 to-green-200 transform -translate-y-1/2" />

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {journey.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-xl"
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-900 via-green-700 to-emerald-600 relative overflow-hidden">
        <motion.div
          animate={{ 
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 text-green-400 opacity-10 text-[25rem]"
        >
          <FaTree />
        </motion.div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <FaHeart className="text-6xl text-green-300 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-['Playfair_Display']">
              Our Vision for 2030
            </h2>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-8">
              By 2030, we aim to be fully circular - eliminating all waste, achieving negative carbon emissions, and supporting 10,000 sustainable farming families worldwide.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="text-3xl font-bold text-green-300 mb-2">-200%</div>
                <div className="text-white/90">Carbon Negative</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="text-3xl font-bold text-green-300 mb-2">1M+</div>
                <div className="text-white/90">Trees Planted</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="text-3xl font-bold text-green-300 mb-2">10K+</div>
                <div className="text-white/90">Families Supported</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center"
        >
          <FaHandHoldingHeart className="text-6xl text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Every purchase you make supports sustainable farming, reduces plastic waste, and helps us plant more trees. Together, we can create a greener future.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-700 to-green-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Shop Sustainable Products
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default SustainabilityPage;