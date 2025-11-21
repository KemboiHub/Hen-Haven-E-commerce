import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Our Story', href: '#' },
    { name: 'Testimonials', href: '#' },
    { name: 'Farm Tours', href: '#' },
    { name: 'Careers', href: '#' }
  ];


  const support = [
    { name: 'Care Guides', href: '#' },
    { name: 'Vaccination Schedule', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns', href: '#' }
  ];

  return (
    <footer className="bg-sage-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">HH</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Hen Haven</h2>
                <p className="text-sage-200 text-sm">Premium Poultry Products</p>
              </div>
            </div>
            <p className="text-sage-200 mb-6 leading-relaxed">
              Your trusted partner in poultry raising since 2019. We provide healthy birds, 
              fresh eggs, and expert care guidance to help your flock thrive.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-sage-200">
                <MapPin className="h-5 w-5 mr-3 text-sage-400" />
                <span>Molo along Nakuru-Eldoret highway</span>
              </div>
              <div className="flex items-center text-sage-200">
                <Phone className="h-5 w-5 mr-3 text-sage-400" />
                <span>(+254) 792151754</span>
              </div>
              <div className="flex items-center text-sage-200">
                <Mail className="h-5 w-5 mr-3 text-sage-400" />
                <span>info@henhaven.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sage-200 hover:text-sage-100 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              {products.map((product, index) => (
                <li key={index}>
                  <a href={product.href} className="text-sage-200 hover:text-sage-100 transition-colors">
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {support.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="text-sage-200 hover:text-sage-100 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-sage-700 p-8 rounded-2xl mb-12">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-sage-200">Get weekly care tips and special offers delivered to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-sage-800 focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
              <button className="bg-sage-600 hover:bg-sage-500 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-sage-700 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex justify-center lg:justify-start space-x-6 mb-6 lg:mb-0">
              <a href="#" className="text-sage-200 hover:text-sage-100 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-sage-200 hover:text-sage-100 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-sage-200 hover:text-sage-100 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-sage-200 hover:text-sage-100 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
            
            <div className="text-center lg:text-right text-sage-200 space-y-2 lg:space-y-0 lg:space-x-6 lg:flex lg:items-center">
              <div className="flex flex-col lg:flex-row lg:space-x-6">
                <a href="#" className="hover:text-sage-100 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-sage-100 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-sage-100 transition-colors">Cookie Policy</a>
              </div>
              <div className="text-sm">
                © 2026 Hen Haven. All rights reserved.
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-sage-700">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sage-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sage-600 rounded flex items-center justify-center">
                <span className="text-xs font-bold">SSL</span>
              </div>
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sage-600 rounded flex items-center justify-center">
                <span className="text-xs font-bold">24/7</span>
              </div>
              <span className="text-sm">Expert Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sage-600 rounded flex items-center justify-center">
                <span className="text-xs font-bold">★</span>
              </div>
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sage-600 rounded flex items-center justify-center">
                <span className="text-xs font-bold">✓</span>
              </div>
              <span className="text-sm">Health Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;