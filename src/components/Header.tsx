import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User, Minus, Plus, Trash2, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

interface HeaderProps {
  activeSection: string;
  navigateToSection: (section: string) => void;
  setActiveSection: (section: string) => void;
}
const Header: React.FC<HeaderProps> = ({ activeSection, navigateToSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, total, removeFromCart, updateQuantity } = useCart();
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  // safe cart count
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  const products = [
    { id: 1, name: "Kenbro Improved Kienyeji", category: "Layers", price: "Ksh 999", image: "https://images.pexels.com/photos/16733491/pexels-photo-16733491.jpeg" },
    { id: 2, name: "Farm Fresh Eggs", category: "Dozen", price: "Ksh 750", image: "https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg" },
    { id: 3, name: "Premium Layer Feed", category: "20lb Bag", price: "Ksh 1500", image: "https://images.pexels.com/photos/6929172/pexels-photo-6929172.jpeg" },
    { id: 4, name: "Kari Improved Kienyeji", category: "Broilers", price: "Ksh 1200", image: "https://images.pexels.com/photos/33378064/pexels-photo-33378064.jpeg" },
    { id: 5, name: "Baby Chicks", category: "Chicks", price: "Ksh 500", image: "https://images.pexels.com/photos/16733491/pexels-photo-16733491.jpeg" },
    { id: 6, name: "Growing Birds", category: "Poultry", price: "Ksh 800", image: "https://images.pexels.com/photos/33378064/pexels-photo-33378064.jpeg" },
    { id: 7, name: "Production Ready", category: "Layers", price: "Ksh 1100", image: "https://images.pexels.com/photos/16733491/pexels-photo-16733491.jpeg" },
    { id: 8, name: "Production Ready", category: "Broilers", price: "Ksh 1300", image: "https://images.pexels.com/photos/33378064/pexels-photo-33378064.jpeg" },
    { id: 9, name: "Grower Feed", category: "Feed", price: "Ksh 42", image: "https://images.pexels.com/photos/6929172/pexels-photo-6929172.jpeg" },
    { id: 10, name: "Layer Feed", category: "Feed", price: "Ksh 48", image: "https://images.pexels.com/photos/6929172/pexels-photo-6929172.jpeg" },
    { id: 11, name: "Broiler Feed", category: "Feed", price: "Ksh 50", image: "https://images.pexels.com/photos/6929172/pexels-photo-6929172.jpeg" }
  ];

  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (cart.length > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [cart.length]);

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
    { id: 'blog', label: 'BLOG' },
    { id: 'contact', label: 'CONTACT US' }
  ];
const PaymentForm = () => {
  const [phone, setPhone] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/stkpush", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone, accountNumber: accountNumber, amount: amount }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage('Payment successful!');
      })
      .catch((error) => {
        console.error(error);
        setMessage('Payment failed!');
      });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h1>Mpesa Payment Form</h1>
      {message && <p style={{ color: message.includes('failed') ? 'red' : 'green' }}>{message}</p>}
      <div style={styles.formGroup}>
        <label htmlFor="phone" style={styles.label}>Phone Number</label>
        <input
          type="number"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="accountNumber" style={styles.label}>Account Number</label>
        <input
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="amount" style={styles.label}>Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          style={styles.input}
          required
        />
      </div>
      <button type="submit" style={styles.button}>Pay Now</button>


    </form>
  );
};
  // handle checkout: initiates STK push via backend (use phone from user profile)
  const handleCheckout = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      setShowCart(false);
      return;
    }

    if (!cart || cart.length === 0 || !total || total <= 0) {
      setPaymentMessage('Cart is empty');
      return;
    }

    // Get phone from user profile (must have been provided at signup)
    const profilePhoneRaw = (user as any)?.phone || (user as any)?.phoneNumber || (user as any)?.mobile || (user as any)?.contact;
    if (!profilePhoneRaw) {
      setPaymentMessage('No phone number on your profile. Please add a phone number in your account before checkout.');
      // Optionally open account/profile modal so user can add phone
      setShowCart(false);
      setShowLoginModal(true);
      return;
    }

    // Normalize phone formats: +2547..., 07..., 2547...
    let phone = String(profilePhoneRaw).trim().replace(/^\+/, '');
    if (/^0/.test(phone)) phone = '254' + phone.slice(1);

    // Validate expected Daraja format
    if (!/^2547\d{8}$/.test(phone)) {
      setPaymentMessage('Phone on profile is invalid. Please update it to format 2547XXXXXXXX in your account.');
      setShowCart(false);
      setShowLoginModal(true);
      return;
    }

    setProcessingPayment(true);
    setPaymentMessage(null);

    try {
      const resp = await fetch('http://localhost:5000/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount: Math.round(total), accountReference: 'HenHavenOrder' })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setPaymentMessage(`Payment initiation failed: ${data.error || data.Message || JSON.stringify(data)}`);
      } else {
        setPaymentMessage('STK Push sent. Check your phone to complete payment.');
        setShowCart(false);
      }
    } catch (err) {
      console.error(err);
      setPaymentMessage('Network error sending STK push');
    } finally {
      setProcessingPayment(false);
    }
  };

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
                  onClick={() => navigateToSection(item.id)}
                  className={`font-medium transition-colors hover:text-sage-400 ${
                    activeSection === item.id ? 'text-sage-600' : 'text-sage-800'
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
                            if (subItem === 'Feeds') {
                              navigateToSection('feeds');
                            } else if (subItem === 'Vitamins & Supplements') {
                              navigateToSection('feeds');
                            } else if (subItem === 'Vaccines & Treatments') {
                              navigateToSection('vaccine');
                            } else {
                              navigateToSection('shop');
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
                          className="block w-full px-4 py-2 text-left text-sage-700 hover:bg-sage-50 hover:text-sage-600 transition-colors"
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
            {/* Search Icon and Input */}
            <div className="relative">
              {!showSearch ? (
                <button
                  onClick={() => setShowSearch(true)}
                  className="h-6 w-6 text-sage-700 cursor-pointer hover:text-sage-900 transition-colors"
                >
                  <Search className="h-6 w-6" />
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none w-64"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className="text-sage-500 hover:text-sage-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
              {/* Search Results Dropdown */}
              {searchQuery && showSearch && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 border-b border-sage-100 hover:bg-sage-50 cursor-pointer flex items-center space-x-3"
                        onClick={() => {
                          navigateToSection('shop');
                          setShowSearch(false);
                          setSearchQuery('');
                          // Scroll to relevant category if needed
                          setTimeout(() => {
                            const categoryId = product.category.toLowerCase().replace(/\s+/g, '-');
                            const element = document.getElementById(categoryId);
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                          }, 300);
                        }}
                      >
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-sage-800 truncate">{product.name}</h4>
                          <p className="text-xs text-sage-600 truncate">{product.category}</p>
                          <p className="text-sm font-semibold text-sage-800">{product.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sage-500">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                  {searchResults.length > 0 && (
                    <div className="p-4 border-t border-sage-100">
                      <button
                        onClick={() => {
                          navigateToSection('shop');
                          setShowSearch(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-sage-600 hover:text-sage-400 text-sm font-medium"
                      >
                        View All Products →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* User Icon / Login */}
            <div className="relative">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <div className="w-8 h-8 bg-sage-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sage-700 hidden md:block">{user?.name}</span>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <button
                        onClick={logout}
                        className="w-full px-4 py-2 text-left text-sage-700 hover:bg-sage-50 hover:text-sage-600 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="h-6 w-6 text-sage-700 cursor-pointer hover:text-sage-900 transition-colors"
                  title="Login or Sign Up"
                >
                  <User className="h-6 w-6" />
                </button>
              )}
            </div>
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
                            <span>Ksh {total}</span>
                          </div>
                          <button
                            onClick={handleCheckout}
                            disabled={processingPayment}
                            className="w-full mt-4 bg-sage-600 text-white py-2 rounded hover:bg-sage-700 disabled:opacity-60"
                          >
                            {processingPayment ? 'Processing...' : isLoggedIn ? 'Checkout' : 'Login to Checkout'}
                          </button>
                          {paymentMessage && (
                            <p className="mt-2 text-sm text-red-500">{paymentMessage}</p>
                          )}
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
                    navigateToSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left font-medium transition-colors hover:text-sage-400 ${
                    activeSection === item.id ? 'text-sage-600' : 'text-sage-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </header>
  );
};

export default Header;
