import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
          <p className="text-gray-400">Start adding designs to your cart!</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {items.map((item) => (
            <div key={item._id} className="flex justify-between items-center p-4 border-b border-gray-700">
              <div className="flex items-center space-x-4 flex-1">
                <img
                  src={item.previewImages?.[0]?.url || 'https://via.placeholder.com/100'}
                  alt={item.title}
                  className="w-20 h-20 rounded object-cover"
                />
                <div>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-lg font-bold text-blue-400">
                  {item.price === 0 ? 'Free' : `$${item.price.toFixed(2)}`}
                </span>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-white">Total:</span>
            <span className="text-3xl font-bold text-blue-400">${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition">
              Checkout
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
