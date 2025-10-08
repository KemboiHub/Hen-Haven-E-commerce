import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, setCurrentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [cart.length]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigationItems = [
    { id: 'home', label: 'HOME' },
    {
      id: 'shop',
      label: 'SHOP',
      submenu: [
        'poultry',
        'Feeds',
        'Vitamins & Supplements',
        'Vaccines & Treatments',
      ]
    },
    { id: 'feeds', label: 'FEEDS' },
    { id: 'vaccine', label: 'VACCINE & TREATMENT' },
    { id: 'contact', label: 'CONTACT US' },
    { id: 'blog', label: 'BLOG' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-sage-800 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <span>Free shipping on orders over $100 | Call us: (+254) 792151754</span>
          <div className="flex items-center space-x-4">
            <span>Follow us for daily farm updates</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">HH</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sage-800">Hen Haven</h1>
              <p className="text-xs text-sage-600">Premium Poultry Products</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => setCurrentSection(item.id)}
                  className={`font-medium transition-colors hover:text-sage-600 ${
                    currentSection === item.id ? 'text-sage-600' : 'text-sage-800'
                  }`}
                >
                  {item.label}
                </button>
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {item.submenu.map((subItem, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (subItem === 'Feeds') setCurrentSection('feeds');
                            else if (subItem === 'Vitamins & Supplements') setCurrentSection('feeds');
                            else if (subItem === 'Vaccines & Treatments') setCurrentSection('vaccine');
                            else {
                              setCurrentSection('shop');
                              setTimeout(() => {
                                const id = subItem === 'Baby Chicks' ? 'baby-chicks' :
                                           subItem === 'Growing Birds' ? 'growing-birds' :
                                           (subItem === 'Layers' || subItem === 'Broilers') ? 'production-ready' : null;
                                if (id) {
                                  const element = document.getElementById(id);
                                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                                }
                              }, 100);
                            }
                          }}
                          className="block w-full px-4 py-2 text-left text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-colors"
                        >
                          {subItem}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Search className="h-6 w-6 text-sage-700 cursor-pointer hover:text-sage-900 transition-colors" />
            <User className="h-6 w-6 text-sage-700 cursor-pointer hover:text-sage-900 transition-colors" />
            <div className="relative" onMouseEnter={() => setShowCart(true)} onMouseLeave={() => setShowCart(false)}>
              <ShoppingCart
                className={`h-6 w-6 text-sage-700 hover:text-sage-900 transition-colors ${animate ? 'animate-bounce' : ''}`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-sage-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              {showCart && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4">
                    <h3 className="font-semibold text-sage-800 mb-4">Your Cart</h3>
                    {cart.length === 0 ? (
                      <p className="text-sage-600">Your cart is empty</p>
                    ) : (
                      <>
                        {cart.map(item => (
                          <div key={item.id} className="flex items-center space-x-3 mb-4">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-sage-800">{item.name}</h4>
                              <p className="text-sm text-sage-600">{item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-sage-100 rounded">
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-sm">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-sage-100 rounded">
                                <Plus className="h-4 w-4" />
                              </button>
                              <button onClick={() => removeFromCart(item.id)} className="p-1 hover:bg-red-100 rounded text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-semibold text-sage-800">
                            <span>Total:</span>
                            <span>Ksh {cart.reduce((sum, item) => sum + parseInt(item.price.replace('Ksh ', '')) * item.quantity, 0)}</span>
                          </div>
                          <button className="w-full mt-4 bg-sage-600 text-white py-2 rounded hover:bg-sage-700">
                            Checkout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-sage-200">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left font-medium transition-colors hover:text-sage-600 ${
                    currentSection === item.id ? 'text-sage-600' : 'text-sage-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;