import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategorySection: React.FC = () => {
  const categories = [
    {
      title: "Baby Chicks",
      subtitle: "1 Day - 1 Month Old",
      description: "Start your flock with healthy, vaccinated chicks",
      image: "https://images.pexels.com/photos/32314325/pexels-photo-32314325.jpeg",
      items: ["Day-old chicks", "1 week old", "2 weeks old", "1 month old"],
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      title: "Growing Birds",
      subtitle: "1-3 Months Old",
      description: "Well-developed birds ready for your coop",
      image: "https://images.pexels.com/photos/11196406/pexels-photo-11196406.jpeg",
      items: ["1 month old", "2 months old", "3 months old", "Mixed ages"],
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Production Ready",
      subtitle: "Layers & Broilers",
      description: "Mature birds ready for eggs and meat production",
      image: "https://images.pexels.com/photos/9547839/pexels-photo-9547839.jpeg",
      items: ["Layer hens", "Broiler chickens", "Breeding stock", "Heritage breeds"],
      color: "bg-brown-50 border-brown-200"
    },
    {
      title: "Farm Fresh Eggs",
      subtitle: "Daily Collection",
      description: "Fresh, organic eggs from free-range hens",
      image: "https://images.pexels.com/photos/17119866/pexels-photo-17119866.jpeg",
      items: ["Dozen eggs", "Half dozen", "Jumbo eggs", "Brown eggs"],
      color: "bg-orange-50 border-orange-200"
    }
  ];

  return (
    <section className="py-16 px-4 bg-sage-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sage-800 mb-4">Shop by Category</h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            From day-old chicks to mature laying hens, find exactly what you need for your poultry operation
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className={`${category.color} border-2 rounded-2xl p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                {/* Image */}
                <div className="mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-sage-800 mb-1">{category.title}</h3>
                    <p className="text-sage-600 font-medium">{category.subtitle}</p>
                  </div>
                  
                  <p className="text-sage-700">{category.description}</p>

                  {/* Items List */}
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sage-600">
                        <div className="w-2 h-2 bg-sage-600 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Shop Button */}
                  <button className="w-full mt-6 bg-sage-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-sage-700 transition-colors flex items-center justify-center group">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Breed Showcase */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-sage-800 text-center mb-8">Popular Breeds</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Kari Improved Kienyeji',
              'Kenbro Improved Kienyeji',
              'Kuroiler',
              'Sasso breeds',
              'Rainbow Rooster',
              'Sussex'
            ].map((breed, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-20 h-20 mx-auto bg-sage-200 rounded-full mb-3 group-hover:bg-sage-300 transition-colors flex items-center justify-center">
                  <span className="text-2xl">🐔</span>
                </div>
                <p className="font-medium text-sage-800 group-hover:text-sage-600 transition-colors">
                  {breed}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;