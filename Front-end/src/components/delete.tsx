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
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const { clearCart } = useCart();

  // safe cart count
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  // derive a safe user initial (handles string, object or missing name)
  const userInitial = (() => {
    const name = (user as any)?.name;
    if (typeof name === 'string' && name.length > 0) return name.charAt(0).toUpperCase();
    if (name && typeof name === 'object') {
      const first =
        (name as any).first ||
        (name as any).firstName ||
        (name as any).fullName ||
        (name as any).displayName;
      if (typeof first === 'string' && first.length > 0) return first.charAt(0).toUpperCase();
      const asString = String(name);
      if (asString && asString !== '[object Object]') return asString.charAt(0).toUpperCase();
    }
    const alt = (user as any)?.email || (user as any)?.phone || (user as any)?.phoneNumber;
    if (typeof alt === 'string' && alt.length > 0) return alt.charAt(0).toUpperCase();
    return '';
  })();

  // derive a safe display name string (never render an object)
  const userDisplayName = (() => {
    const name = (user as any)?.name;
    if (typeof name === 'string' && name.trim()) return name;
    if (name && typeof name === 'object') {
      const first =
        (name as any).first ||
        (name as any).firstName ||
        (name as any).fullName ||
        (name as any).displayName;
      if (typeof first === 'string' && first.trim()) return first;
      // fallback to email or phone if name object is not usable
    }
    if ((user as any)?.email) return (user as any).email;
    if ((user as any)?.phone) return (user as any).phone;
    return '';
  })();

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
interface PaymentFormProps {
  initialPhone: string;
  initialAmount: number;
  onSuccess: () => void;
  onClose: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ initialPhone, initialAmount, onSuccess, onClose }) => {
    const [phone, setPhone] = useState(initialPhone);
    const [accountNumber, setAccountNumber] = useState('HenHavenOrder');
    const [amount, setAmount] = useState(initialAmount.toString());
    const [message, setMessage] = useState('');
    const [processing, setProcessing] = useState(false);

    // submit STK push via backend

