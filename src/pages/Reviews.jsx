import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaHeart, FaLeaf, FaUserCircle, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router';
const ReviewsPage = () => {
  // Editable reviews array
  const [reviews] = useState([
    {
      id: 1,
      name: "Hayour Emporium",
      image: "/api/placeholder/400/400",
      rating: 5,
      date: "November 2024",
      review: "The hair spray is maashaallah People have been commenting on my baby's hair. It has changed a lot! I will also need the hair spray and the cream, because I'm using it in her cream and it's so lovely to my hair. Baarokallahu feekum sis",
      product: "Arabian Hair Oil & Hair Spray",
      verified: true
    },
    {
      id: 2,
      name: "Queen Couture",
      image: "/api/placeholder/400/400",
      rating: 5,
      date: "October 2024",
      review: "It's my hair ooo. Sincerely I give it to your product, I never believed my hair would grow inches not to talk of having fuller hair, I'm loving my new look already. This is definitely my last bus stop after trying countless products that doesn't work for me",
      product: "Hair Growth Treatment",
      verified: true
    },
    {
      id: 3,
      name: "A'eesh Hub",
      image: "/api/placeholder/400/400",
      rating: 5,
      date: "September 2024",
      review: "My skin is now ...wow www! Honestly I don't know what to say, especially the pimples and sunburn....... Thanks sis. Your products are indeed one of the best. My facial kit has finished but no money oooo. I still have luminous black soap and body oil. Am waiting for promo period ",
      product: "Facial Kit & Black Soap",
      verified: true
    },
    {
      id: 4,
      name: "Oluwashetemi",
      image: "/api/placeholder/400/400",
      rating: 5,
      date: "August 2024",
      review: "I don do the bal ooo. Is like the soap don cure my pimples ooo, The results are amazing!",
      product: "Luminous Black Soap",
      verified: true
    },
    {
      id: 5,
      name: "Bukky",
      image: "/api/placeholder/400/400",
      rating: 5,
      date: "July 2024",
      review: " Omo to be honest your products are working fine. Even me I like myself now. Just need to lighten up small. I remember using Molato soap for Claire when her soap finish, I don't even use it more than 4 times sef, omo come and see my baby skin. Like it's giving me way to say no to organic!",
      product: "Kids Skincare Range",
      verified: true
    },
    {
      id: 6,
      name: "Nafeesah",
      image: "/api/placeholder/400/400",
      rating: 5,
      date: "June 2024",
      review: "Alhamdulillah. It's improving small small. Assalamualaikum ma. Walaikum salaam warahmatullah wabarakatuh. Hamdan. Please use only as prescribed. No skipping or addiction. The gradual process is working perfectly!",
      product: "Facial Treatment Set",
      verified: true
    },
    {
      id: 7,
      name: "Omoshalewa",
      image: "/api/placeholder/400/400",
      rating: 5,
      date: "May 2024",
      review: "Walaikum salaam warohmotullohi wa barokaatuh ma. They are really effective, Barokahallohu feek. The products are truly transformative!",
      product: "Hand & Body Treatment",
      verified: true
    },
    {
      id: 8,
      name: "Mara Homes",
      image: "/api/placeholder/400/400",
      rating: 5,
      date: "April 2024",
      review: "Those products you sold for me are all amazing, I really love them all especially that Arabian oil. I think I really love that a lot. In Shaa Allah planning on getting it very soon  Thanks mammaaa ",
      product: "Arabian Oil Collection",
      verified: true
    },
    {
        id: 9,
        name: "Nusaybah",
        image: "/api/placeholder/400/400",
        rating: 5,
        date: "March 2024",
        review: "Assalamualaikum warahmatullahi wabarakatuh. i don come to thank you regarding the hair products u sold to me, Alhamdulillah ive seen much changes.. e be like say na your products go dey collect my salary now, im coming back for the protein treatmeant and arabian oil insha ALLah.",
        product: "Haircare kit",
        verified: true
    },
    {
        id: 10,
        name: "Al Ahaq Concepts",
        image: "/api/placeholder/400/400",
        rating: 5,
        date: "February 2024",
        review: "The shampoo don almost finish, My friends don finish am for me, The fact that its soapy and it smells so nice.",
        product: "Herbal Shampoo",
        verified: true
    },
    {
        id: 11,
        name: "Samia Owolewa",
        image: "/api/placeholder/400/400",
        rating: 5,
        date: "January 2024",
        review:  "Ewoo compliment ana yen po🤧 People kept complimenting my skin especially my course mates that know how my face was when I left school, compliment yiii po.  Tee naturals and essentials took a huge part in making my nikkah a beautiful one and I am grateful.I made an absolutely gorgeous bride ma’am.  Jazakumullahu Khairan ma.."
    },
    {
        id: 12,
        name: "Samia Owolewa",
        image: "/api/placeholder/400/400",
        rating: 5,
        date: "January 2024",
        review: "Asalamualaikum warahmatullahi ma I am happy to be one of tee queens ooo💃💃 In less than two weeks there is already significant changes on my skin, my hyperpigmentation is clearing and my pores are reducing too.Allahumma baarik tee natural. You are really good at what you do ooo"
    }
  ]);

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

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "100%", label: "Natural Products" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f5dc] to-white">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
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
          <FaHeart />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 text-[#d4af37] opacity-20 text-7xl"
        >
          <FaLeaf />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="mb-6"
          >
            <FaStar className="text-6xl md:text-7xl text-[#d4af37] mx-auto" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Playfair_Display']"
          >
            Customer Reviews
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-white/90"
          >
            Real stories from real customers who trust Tee Natural & Essentials
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-12 px-6 -mt-16 relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-xl text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#1a3a2e] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Reviews Grid */}
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
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-8" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers about their experience with our natural products
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Review Header */}
                <div className="bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45] p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center text-3xl"
                    >
                      <FaUserCircle />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{review.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} className="text-[#d4af37] text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span>{review.date}</span>
                    {review.verified && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-6">
                  <FaQuoteLeft className="text-[#d4af37] text-2xl mb-4 opacity-50" />
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {review.review}
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaLeaf className="text-green-600" />
                      <span className="font-medium">{review.product}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a2e] mb-6 font-['Playfair_Display']">
              Why Customers Trust Us
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-12" />
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaLeaf />,
                  title: "100% Natural",
                  description: "All our products are made from pure, natural ingredients"
                },
                {
                  icon: <FaHeart />,
                  title: "Proven Results",
                  description: "Thousands of satisfied customers with visible results"
                },
                {
                  icon: <FaStar />,
                  title: "Expert Formulated",
                  description: "Created by wellness experts with years of experience"
                }
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-8"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg"
                  >
                    {badge.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{badge.title}</h3>
                  <p className="text-gray-600">{badge.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
          <FaHeart className="text-6xl mx-auto mb-6 text-[#d4af37]" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the natural difference that has transformed the lives of hundreds of satisfied customers
          </p>
          <Link to="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#d4af37] hover:bg-[#c29d2f] text-[#1a3a2e] px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all"
          >
            Shop Now
          </motion.button>
          </Link>
        </motion.div>
         <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-white via-[#f5f5dc] to-white flex items-center justify-center p-6 mt-2"
    >
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-br from-[#1a3a2e] to-[#2d5a45] p-8 text-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <FaStar className="text-6xl text-[#d4af37]" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Playfair_Display']">
              Drop a Review Here
            </h1>
            <p className="text-white/80">Your feedback means the world to us!</p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">
                Share your experience with Tee Natural & Essentials and help others discover our natural wellness products
              </p>
              
              {/* Star Rating Display */}
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FaStar className="text-3xl text-[#d4af37]" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Review Link */}
            <motion.a
              href="https://g.page/r/Cd6m5ZddFiNbEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="block w-full bg-gradient-to-r from-[#1a3a2e] to-[#2d5a45] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <FaGoogle className="text-2xl" />
                <span>Leave a Google Review</span>
              </div>
            </motion.a>

            {/* Link Text Below Button */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <p className="text-xs text-gray-500 text-center mb-2">Or copy this link:</p>
              <a 
                href="https://g.page/r/Cd6m5ZddFiNbEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#1a3a2e] hover:text-[#d4af37] break-all block text-center font-mono"
              >
                https://g.page/r/Cd6m5ZddFiNbEBM/review
              </a>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Verified Business</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-gray-600 text-sm"
        >
          <p>✨ Your review helps us grow and serve you better ✨</p>
        </motion.div>
      </div>
    </motion.div>
      </section>
    </div>
  );
};

export default ReviewsPage;