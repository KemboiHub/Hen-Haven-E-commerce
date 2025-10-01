import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';

interface HeaderProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, setCurrentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  const navigationItems = [
    { id: 'home', label: 'HOME' },
    { 
      id: 'shop', 
      label: 'SHOP',
      submenu: [
        'Poultry',
        '1 Day Old Chicks',
        '1 Week Chicks',
        '1 Month Chicks',
        '2 Month Chicks',
        '3 Month Chicks',
        'Layers',
        'Broilers',
        'Fresh Eggs'
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
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-sage-700 cursor-pointer hover:text-sage-900 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-sage-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
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