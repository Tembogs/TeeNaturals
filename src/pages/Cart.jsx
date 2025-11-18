import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaPlus, FaMinus, FaWhatsapp, FaArrowLeft, FaLeaf, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const VENDOR_PHONE = "2348012345678"; // Replace with your number
const VENDOR_WHATSAPP = `https://wa.me/${VENDOR_PHONE}`;

const TeeNaturalCart = () => {
  const { state, dispatch, getTotal } = useCart();
  const cartItems = state.cartItems || [];
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const shippingFee = cartItems.length > 0 ? 2000 : 0;
  const finalTotal = getTotal() + shippingFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const message = `Hi! I'd like to place an order:%0A%0A${cartItems
      .map(
        (item) =>
          `*${item.name}*%0AQuantity: ${item.quantity}%0APrice: ₦${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("%0A%0A")}%0A%0A*Total: ₦${finalTotal.toLocaleString()}*%0A%0APlease confirm availability and delivery details.`;

    window.open(`${VENDOR_WHATSAPP}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-stone-50 py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <motion.a
            href="/products"
            whileHover={{ x: -5 }}
            className="inline-flex items-center gap-2 text-[#1a3a2e] hover:text-[#d4af37] transition-colors mb-4"
          >
            <FaArrowLeft />
            Continue Shopping
          </motion.a>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] text-[#1a3a2e] mb-2">
              Shopping <span className="text-[#d4af37]">Cart</span>
            </h1>
            {cartItems.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowClearConfirm(true)}
                className="text-red-500 hover:text-red-600 flex items-center gap-2 px-4 py-2 border border-red-200 rounded-full transition-colors"
              >
                <FaTrash /> Clear Cart
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-lg p-12 text-center"
          >
            <div className="w-32 h-32 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTrash className="text-6xl text-[#1a3a2e]/20" />
            </div>
            <h2 className="text-2xl font-['Playfair_Display'] text-[#1a3a2e] mb-4">
              Your cart is empty
            </h2>
            <p className="text-[#1a3a2e]/60 mb-8">Discover our natural products and add them to your cart</p>
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[#1a3a2e] text-white px-8 py-4 rounded-full font-semibold"
            >
              Start Shopping
            </motion.a>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-6">
                    <img src={item.image} className="w-full sm:w-32 h-32 object-cover rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-[#1a3a2e] mb-1">{item.name}</h3>
                          <p className="text-sm text-[#1a3a2e]/60">{item.category}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                          className="text-red-500 hover:text-red-600 p-2"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#1a3a2e]/60">Quantity:</span>
                          <div className="flex items-center gap-2 bg-stone-50 rounded-full p-1">
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "UPDATE_QUANTITY",
                                  payload: { id: item.id, quantity: item.quantity - 1 },
                                })
                              }
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="w-12 text-center font-semibold text-[#1a3a2e]">{item.quantity}</span>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "UPDATE_QUANTITY",
                                  payload: { id: item.id, quantity: item.quantity + 1 },
                                })
                              }
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>
                        </div>

                        {/* Item Price */}
                        <div className="text-right">
                          <div className="text-sm text-[#1a3a2e]/60 mb-1">₦{item.price.toLocaleString()} each</div>
                          <div className="text-2xl font-bold text-[#d4af37]">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-[#1a3a2e] mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#1a3a2e]/70">
                    <span>Subtotal</span>
                    <span className="font-semibold">₦{getTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#1a3a2e]/70">
                    <span>Shipping</span>
                    <span className="font-semibold">₦{shippingFee.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-stone-200" />
                  <div className="flex justify-between text-xl font-bold text-[#1a3a2e]">
                    <span>Total</span>
                    <span className="text-[#d4af37]">₦{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 mb-3"
                >
                  <FaWhatsapp className="text-2xl" /> Checkout via WhatsApp
                </button>

                <a
                  href="/products"
                  className="block w-full bg-[#1a3a2e] text-white py-4 rounded-full font-semibold text-center"
                >
                  Continue Shopping
                </a>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-stone-200 grid grid-cols-2 gap-4 text-center text-xs text-[#1a3a2e]/60">
                  <div>
                    <div className="text-2xl mb-2">🔒</div>Secure Checkout
                  </div>
                  <div>
                    <div className="text-2xl mb-2">🚚</div>Fast Delivery
                  </div>
                  <div>
                    <div className="text-2xl mb-2">✅</div>100% Natural
                  </div>
                  <div>
                    <div className="text-2xl mb-2">💚</div>Eco-Friendly
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clear Cart Modal */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearConfirm(false)}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaTrash className="text-3xl text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a3a2e] mb-2">Clear Cart?</h3>
                  <p className="text-[#1a3a2e]/70">Are you sure you want to remove all items from your cart?</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 bg-stone-100 text-[#1a3a2e] py-3 rounded-full font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "CLEAR_CART" });
                      setShowClearConfirm(false);
                    }}
                    className="flex-1 bg-red-500 text-white py-3 rounded-full font-semibold"
                  >
                    Clear Cart
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeeNaturalCart;
