import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaWhatsapp,
  FaHeart,
  FaTimes,
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";
import { useCart } from "../context/CartContext"; // shared reducer-based cart

// Products Array
const PRODUCTS = [
  {
    id: 1,
    name: "Luminous Black Soap",
    price: 5500,
    category: "SKINCARE",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397574/Luminous_blasck_soap_zokbxo.jpg",
    description: " Deep cleansing black soap for radiant skin",
  },
  {
    id: 2,
    name: "Hydrating Face Soap",
    price: 4800,
    category: "SKINCARE",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397574/Hyrating_Facial_Soap_denejh.jpg",
    description: " Gentle hydrating facial soap for all skin types",
  },
  {
    id: 3,
    name: "Anti Pimple Plastic Soap",
    price: 6500,
    category: "SKINCARE",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397572/Anti_pimples_soap_sximbp.jpg",
    description: "Effective anti-pimple formula",
  },
  {
    id: 4,
    name: "Body Oil",
    price: 6200,
    category: "SKINCARE",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397573/Body_Oil_pfexql.jpg",
    description: "Nourishing body oil for smooth skin",
  },
  {
    id: 5,
    name: "Arabian Hair Oil",
    price: 6500,
    category: "HAIRCARE",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397573/arabian_hair_oil_x59xny.jpg",
    description: "Strengthening hair oil for healthy hair",
  },
  {
    id: 6,
    name: "Hair Mask",
    price: 8000,
    category: "HAIRCARE",
    image:
      "https://res.cloudinary.com/decgjhtlb/image/upload/v1763397573/Hair_mask_dtzmss.jpg",
    description: "Deep conditioning hair mask",
  },
  {
    id: 7,
    name: "Molato Body Soap",
    price: 7500,
    category: "SKINCARE",
    image: "/molato.jpg",
    description: "Exfoliating body soap for smooth skin",
  },
  {
    id: 8,
    name: " Wild Honey Body Wash",
    price: 5500,
    category: "SKINCARE",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796527/wild_honey_body_wash_xy9ptf.jpg",
    description: "Moisturizing body wash with wild honey",
  },
  {
    id: 9,
    name: "Oshaprapra Body Soap",
    price: 15000,
    category: "SKINCARE",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796524/Oshaprapra_Body_Soap_kp45fg.jpg",
    description: "Naturally made body soap",
  },
  {
    id: 10,
    name: "Kiddies Rashes Soap",
    price: 8000,
    category: "BABYCARE",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796524/Kiddies_Rash_Soap_ndlnsa.jpg",
    description: "Gentle soap for baby rashes",
  },
  {
    id: 11,
    name: "Hair Protein Treatment",
    price: 5500,
    category: "HAIRCARE",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796524/protein_treatment_kv6a4f.jpg",
    description: "Strengthens and repairs hair",
  },
  {
    id: 12,
    name: " Herbal Skin Repair Soap",
    price: 8500,
    category: "SKINCARE",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/Herbal_Skin_Repair_Soap_f8gtjx.jpg",
    description: "Herbal soap for skin repair",
  },
  {
    id: 13,
    name: "V.I.P Face Cream",
    price: 6000,
    category: "SKINCARE",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/ClarIfying_face_Cream_ojrvnl.jpg",
    description: "Clarifying face cream for glowing skin",
  },
  {
    id: 14,
    name: "Baby Clear Skin Soap",
    price: 7500,
    category: "BABYCARE",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/Baby_Clear_Skin_Soap_pngiap.jpg",
    description: "Gentle soap for baby's clear skin",
  },
  {
    id: 15,
    name: "Face Serum",
    price: 6000,
    category: "SKINCARE",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796522/face_serum_vyzifm.jpg",
    description: "Nourishing face serum for radiant skin",
  },
  {
    id: 16,
    name: "Face Kit",
    price: 30000,
    category: "SKINCARE",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796522/Face_Kit_g6xred.jpg",
    description: "Complete face care kit",
  },
  {
    id: 17,
    name: "Face Cleanser",
    price: 6000,
    category: "SKINCARE",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796522/Face_Cleanser_mfvfgu.jpg",
    description: "Gentle face cleanser for daily use",
  },
 {
    id: 18,
    name: "Kiddies Hair Brush",
    price: 3200,
    category: "ACCESSORIES",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796528/Kiddies_Hairbrush_uquliw.jpg",
    description: "Soft hair brush for kids",
 },
 {id: 19,
  name: "Shower Cap",
  price: 650,
  category: "ACCESSORIES",
  image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796526/Shower_Cap_vb4v73.jpg",
  description: "Waterproof shower cap for hair protection",
 },
 {
    id: 20,
    name: "Reusable Midi Face Towel",
    price: 3000,
    category: "ACCESSORIES",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796525/Reusable_Midi_Fce_Towel_hw7qde.jpg",
    description: "Soft and reusable face towel, 450 per piece",
 },
 {
    id: 21,
    name: "Safety Ear Pick",
    price: 2200,
    category: "ACCESSORIES",
    image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796525/Safety_Ear_Pick_hijntp.jpg",
    description: "Safe ear pick for ear cleaning",
 },
 {
  id: 22,
  name: "Hair Care Set",
  price: 8500,
  category: "ACCESSORIES",
  image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796524/HairCare_Set_ysjha7.jpg",
  description: "Complete hair care set for healthy hair",
 },
{
  id: 23,
  name: "Lip Oil",
  price: 1500,
  category: "ACCESSORIES",
  image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796524/Lip_Oil_k9eua1.jpg",
  description: "Moisturizing lip oil for soft lips",
},
{
  id: 24,
  name: "Kiddies Floral Toothpaste",
  price: 1500,
  category: "ACCESSORIES",
  image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/Kiddies_Floral_Toothpaste_osbhj2.jpg",
  description: "Gentle floral toothpaste for kids",
},
{
  id: 25,
  name: "5-1 Face Massager",
  price: 5500,
  category: "ACCESSORIES",
  image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/Face_Massager_js2iyu.jpg",
  description: "Multi-functional face massager for skin rejuvenation",
},
{
  id: 26,
  name: "Easy Back Scrub Sponge",
  price: 2500,
  category: "ACCESSORIES",
  image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796522/Back_Scrub_Sponge_beqh2w.jpg",
  description: "Long-handled back scrub sponge for easy cleaning",
},
{
  id: 27,
  name: "Bubble Body Sponge",
  price: 1500,
  category: "ACCESSORIES",
  image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796521/Bubble_Body_Sponge_ec855v.jpg",
  description: "Soft bubble sponge for gentle body cleansing",
},
{
  id: 28,
  name: "Kiddies Body Oil",
  price: 5800,
  category: "BABYCARE",
  image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796523/Kiddies_Body_Oil_uc2gv0.jpg",
  description: "Nourishing body oil for kids' delicate skin",
},
{
  id: 29,
  name: "Electric Toothbrush for Adults",
  price: 15000,
  category: "ACCESSORIES",
  image: "https://res.cloudinary.com/decgjhtlb/image/upload/v1763796521/Adult_Electric_ToothBrush_pyhg6b.jpg",
  description: "Rechargeable electric toothbrush for adults",
},

  
];

const TeeNaturalProducts = () => {
  const { state, dispatch, getTotal } = useCart();
  const cartItems = state.cartItems || [];
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [wishlist, setWishlist] = useState([]);

  const VENDOR_PHONE = "2348055061699";

  const categories = ["ALL", ...new Set(PRODUCTS.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "ALL"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const handlePurchaseNow = (p) => {
    const text = `Hi! I'd like to purchase *${p.name}* for ₦${p.price.toLocaleString()}`;
    window.open(`https://wa.me/${VENDOR_PHONE}?text=${encodeURIComponent(text)}`);
  };

  const getQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4 md:px-6">
      {/* Header */}
      <div className="text-center max-w-7xl mx-auto mb-12">
        <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] text-[#1a3a2e] mb-4">
          Our Best Selling <span className="text-[#d4af37]">Products</span>
        </h1>
        <p className="text-[#1a3a2e]/70 text-lg">Discover nature’s finest products</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-[#1a3a2e] text-white"
                : "bg-white text-[#1a3a2e] hover:bg-[#1a3a2e]/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const quantity = getQuantity(product.id);
          const totalPrice = product.price * quantity;

          return (
            <div key={product.id} className="bg-white shadow-lg rounded-3xl overflow-hidden">
              <div className="relative">
                <img src={product.image} className="w-full h-64 object-cover" />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
                >
                  <FaHeart className={wishlist.includes(product.id) ? "text-red-500" : "text-gray-400"} />
                </button>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl text-[#1a3a2e]">{product.name}</h3>
                <p className="text-[#1a3a2e]/60 text-sm mb-3">{product.description}</p>
                <p className="text-2xl font-bold text-[#1a3a2e] mb-4">
                  ₦{quantity > 0 ? totalPrice.toLocaleString() : product.price.toLocaleString()}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: { id: product.id, quantity: quantity - 1 },
                      })
                    }
                    className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="px-3">{quantity}</span>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: { id: product.id, quantity: quantity + 1 },
                      })
                    }
                    className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>

                {/* Add to Cart */}
                {quantity === 0 && (
                  <button
                    onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
                    className="w-full py-3 bg-[#1a3a2e] text-white rounded-full font-semibold mb-2"
                  >
                    Add to Cart
                  </button>
                )}

                {/* WhatsApp Purchase */}
                <button
                  onClick={() => handlePurchaseNow(product)}
                  className="w-full py-3 bg-[#25D366] text-white rounded-full font-semibold"
                >
                  Purchase Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Cart Button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-8 right-8 bg-[#d4af37] w-16 h-16 rounded-full text-[#1a3a2e] flex items-center justify-center shadow-xl"
      >
        <FaShoppingCart />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#1a3a2e] text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">
            {cartItems.reduce((s, i) => s + i.quantity, 0)}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <div
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            ></div>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 w-full max-w-md bg-white h-full z-50 p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#1a3a2e]">Shopping Cart</h2>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Cart Items */}
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-stone-50 p-4 rounded-xl mb-4">
                      <img src={item.image} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-[#d4af37] font-bold">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              dispatch({
                                type: "UPDATE_QUANTITY",
                                payload: { id: item.id, quantity: item.quantity - 1 },
                              })
                            }
                            className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "UPDATE_QUANTITY",
                                payload: { id: item.id, quantity: item.quantity + 1 },
                              })
                            }
                            className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                          <button
                            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                            className="text-red-500 ml-auto"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[#1a3a2e]/60">Your cart is empty</p>
                )}
              </div>

              {/* Total + WhatsApp Purchase */}
              {cartItems.length > 0 && (
                <div>
                  <div className="border-t pt-6 flex justify-between text-lg mb-4">
                    <span>Total</span>
                    <span className="text-[#d4af37] font-bold">
                      ₦{getTotal().toLocaleString()}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${VENDOR_PHONE}?text=${encodeURIComponent(
                      `Hello! I want to purchase:\n${cartItems
                        .map((item) => `${item.name} x${item.quantity}`)
                        .join("\n")}\nTotal: ₦${getTotal().toLocaleString()}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition"
                  >
                    <FaWhatsapp /> Purchase via WhatsApp
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeeNaturalProducts;
