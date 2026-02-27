import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import { Trash2, Plus, Minus } from 'lucide-react';


interface CartProps {
  navigateToSection?: (section: string) => void;
}

const Cart: React.FC<CartProps> = ({ navigateToSection }) => {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-sage-800 mb-8">Your Cart</h1>
          <p className="text-xl text-sage-600 mb-8">Your cart is empty.</p>
          <button
            onClick={() => navigateToSection?.('shop')}
            className="bg-sage-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sage-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-sage-800 mb-8">Your Cart</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-sage-800">{item.name}</h3>
                  <p className="text-sm text-sage-600">{item.category}</p>
                  <p className="text-sm font-medium text-sage-700">{item.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 bg-sage-100 text-sage-600 rounded hover:bg-sage-200 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 bg-sage-100 text-sage-600 rounded hover:bg-sage-200 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold text-sage-800">Total:</span>
            <span className="text-2xl font-bold text-sage-800">Ksh {total.toFixed(2)}</span>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={clearCart}
              className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              disabled={loading}
            >
              Clear Cart
            </button>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  setShowLoginModal(true);
                  return;
                }
                // User is logged in — initiate MPESA payment via backend
                (async () => {
                  setMessage(null);

                  try {
                    setLoading(true);

                    let phone = window.prompt(
                      "Enter your phone number (07XXXXXXXX)"
                    );

                    if (!phone) {
                      setMessage("Phone number required");
                      return;
                    }

                    phone = phone.trim();

                    if (phone.startsWith("0"))
                      phone = "254" + phone.slice(1);

                    if (phone.startsWith("+"))
                      phone = phone.slice(1);

                    const amount = Math.round(total);

                    const accountReference = `ORDER-${Date.now()}`;

                    const result = await mpesaService.initiateSTKPush({
                      phone,
                      amount,
                      accountReference,
                    });

                    if (result.success) {
                      setMessage("STK Push sent. Check your phone.");
                    } else {
                      setMessage(result.message);
                    }

                  } catch (err) {
                    setMessage("Payment failed");
                  } finally {
                    setLoading(false);
                  }
                })();
              }}
              disabled={loading}
              className={"flex-1 py-3 px-6 rounded-lg font-semibold transition-colors " + (loading ? 'bg-sage-400 text-white' : 'bg-sage-600 text-white hover:bg-sage-700')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
        {message && (
          <div className="mt-4 max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white p-4 rounded shadow">{message}</div>
          </div>
        )}
        </div>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default Cart;
