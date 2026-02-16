import React from 'react';
import { ArrowRight, Shield, Truck, Award, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeroProps {
  navigateToSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigateToSection }) => {
  const { addToCart } = useCart();

  const defaultProduct = {
    id: 1,
    name: "Kenbro Improved Kienyeji",
    category: "Layers",
    price: "Ksh 999",
    originalPrice: "Ksh 1200",
    rating: 4.9,
    reviews: 124,
    image: "https://images.pexels.com/photos/16733491/pexels-photo-16733491.jpeg",
    badge: "Best Seller",
    description: "Hardy, friendly breed perfect for beginners"
  };
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Main Hero */}
      <div className="bg-gradient-to-r from-sage-50 to-sage-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-sage-800 leading-tight">
                  From Coop to
                  <span className="text-sage-600 block">Your Home</span>
                </h1>
                <p className="text-xl text-sage-700 max-w-lg">
                  Premium poultry, fresh eggs, and complete care solutions for your backyard farm. 
                  Quality you can trust, delivered with care.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigateToSection('shop')}
                  className="bg-sage-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sage-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigateToSection('contact')}
                className="border-2 border-sage-600 text-sage-600 px-8 py-4 rounded-lg font-semibold hover:bg-sage-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                  <Phone className="h-6 w-6" /> CONTACT US
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-sage-600" />
                  <span className="text-sage-700">Health Guaranteed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-sage-600" />
                  <span className="text-sage-700">Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-sage-600" />
                  <span className="text-sage-700">Expert Care</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/19972937/pexels-photo-19972937.jpeg"
                  alt="Happy chickens on farm"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sage-800">500+</div>
                  <div className="text-sm text-sage-600">Happy Customers</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sage-800">99.8%</div>
                  <div className="text-sm text-sage-600">Health Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-sage-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sage-200">Birds Delivered</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">5 Years</div>
              <div className="text-sage-200">Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sage-200">Breeds Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sage-200">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
