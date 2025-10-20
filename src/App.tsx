import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import CategorySection from './components/CategorySection';
import VaccineSection from './components/VaccineSection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';



  const goBack = () => {
    if (sectionHistory.length > 1) {
      const newHistory = [...sectionHistory];
      newHistory.pop();
      const previous = newHistory[newHistory.length - 1];
      setSectionHistory(newHistory);
      setCurrentSection(previous);
      setActiveSection(previous);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'featured-products', 'shop', 'vaccine', 'blog', 'contact', 'feeds'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let current = 'home';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= scrollPosition) {
          if (sectionId === 'home' || sectionId === 'featured-products') {
            current = 'home';
          } else {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'shop':
        return <CategorySection navigateToSection={navigateToSection} goBack={goBack} />;
      case 'feeds':
        return <FeedsSection goBack={goBack} />;
      case 'vaccine':
        return <VaccineSection navigateToSection={navigateToSection} goBack={goBack} />;
      case 'contact':
        return <ContactSection goBack={goBack} />;
      case 'blog':
        return <BlogSection goBack={goBack} />;
      default:
        return (
          <>
            <Hero navigateToSection={navigateToSection} />
            <FeaturedProducts />
            <CategorySection />
            <VaccineSection navigateToSection={navigateToSection} />
            <BlogSection />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-cream-50">
          <Header activeSection={activeSection} navigateToSection={navigateToSection} setActiveSection={setActiveSection} />
          <main>
            {renderSection()}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

// Feeds Section Component
const FeedsSection = () => {
  const feedCategories = [
    {
      title: "Starter Feed (0-8 weeks)",
      description: "High-protein feed for rapid growth",
      image: "https://images.pexels.com/photos/6929172/pexels-photo-6929172.jpeg",
      price: "Ksh 45",
      features: ["20-24% protein", "Essential vitamins", "Easy digestion"]
    },
    {
      title: "Grower Feed (8-18 weeks)",
      description: "Balanced nutrition for steady development",
      image: "https://images.pexels.com/photos/6929172/pexels-photo-6929172.jpeg",
      price: "Ksh 42",
      features: ["16-18% protein", "Calcium boost", "Growth optimization"]
    },
    {
      title: "Layer Feed (18+ weeks)",
      description: "Specialized feed for egg production",
      image: "https://images.pexels.com/photos/6929172/pexels-photo-6929172.jpeg",
      price: "Ksh 48",
      features: ["16-18% protein", "High calcium", "Shell strength"]
    },
    {
      title: "Broiler Feed",
      description: "High-energy feed for meat production",
      image: "https://images.pexels.com/photos/6929172/pexels-photo-6929172.jpeg",
      price: "Ksh 50",
      features: ["22-24% protein", "Fast growth", "Efficient conversion"]
    }
  ];

  return (
    <section id="feeds" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-sage-800 mb-4">Premium Poultry Feeds</h1>
        <p className="text-xl text-sage-600 max-w-3xl mx-auto">
          Nutritionally balanced feeds for every stage of your poultry's growth journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {feedCategories.map((feed, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <img src={feed.image} alt={feed.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-sage-800 mb-2">{feed.title}</h3>
              <p className="text-sage-600 mb-4">{feed.description}</p>
              <div className="mb-4">
                {feed.features.map((feature, idx) => (
                  <span key={idx} className="inline-block bg-sage-100 text-sage-700 px-2 py-1 rounded text-sm mr-2 mb-2">
                    {feature}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-sage-800">{feed.price}</span>
                <button className="bg-sage-600 text-white px-4 py-2 rounded hover:bg-sage-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default App;
