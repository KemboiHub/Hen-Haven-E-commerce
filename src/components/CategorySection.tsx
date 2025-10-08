import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CategorySection: React.FC = () => {
  const Breeds = ['Kenbro Improved Kienyeji', 'Kari Improved Kienyeji','Kuroiler', 'Sasso breeds', 'Rainbow Rooster', 'Sussex'];

  const categories = [
    {
      title: "Baby Chicks",
      subtitle: "1 Day - 3 Weeks Old",
      description: "Start your flock with healthy, vaccinated chicks",
      image: "https://images.pexels.com/photos/32314325/pexels-photo-32314325.jpeg",
      items: ["1 day old", "1 week old", "2 weeks old", "3 weeks old"],
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

  const CategoryPart: React.FC<{ title: string; breeds: string[] }> = ({ title, breeds }) => {
    const { addToCart } = useCart();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [formData, setFormData] = useState({ age: '', type: '', breed: '', item: '', quantity: 1 });

    const getPrice = (category: string, selections: any) => {
      let base = 0;
      if (category === "Baby Chicks") {
        const prices: { [key: string]: number } = { "1 day old": 110, "1 week old": 150, "2 weeks old": 200, "3 weeks old": 300 };
        base = prices[selections.age] || 50;
      } else if (category === "Growing Birds") {
        const prices: { [key: string]: number } = { "1 month old": 200, "2 months old": 300, "3 months old": 400, "Mixed ages": 350 };
        base = prices[selections.age] || 200;
      } else if (category === "Production Ready") {
        base = selections.type === "Layer" ? 1000 : 1200;
      } else if (category === "Farm Fresh Eggs") {
        const prices: { [key: string]: number } = { "Dozen eggs": 300, "Half dozen": 180, "Jumbo eggs": 350, "Brown eggs": 320 };
        base = prices[selections.item] || 300;
      }
      return base * selections.quantity;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const price = getPrice(selectedCategory.title, formData);
      let name = selectedCategory.title;
      if (selectedCategory.title === "Production Ready") {
        name += ` - ${formData.type} (${formData.breed})`;
      } else if (selectedCategory.title === "Baby Chicks" || selectedCategory.title === "Growing Birds") {
        name += ` - ${formData.age} (${formData.breed})`;
      } else {
        name += ` - ${formData.age || formData.item}`;
      }
      const product = {
        id: Date.now(),
        name,
        category: selectedCategory.title,
        price: `KSh ${price}`,
        rating: 5,
        reviews: 0,
        image: selectedCategory.image,
        badge: "New",
        description: selectedCategory.description
      };
      addToCart(product, formData.quantity);
      setModalOpen(false);
      setFormData({ age: '', type: '', breed: '', item: '', quantity: 1 });
    };

    return (
      <>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sage-800 mb-4">{title}</h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            From day-old chicks to mature laying hens, find exactly what you need for your poultry operation
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} id={category.title.toLowerCase().replace(/\s+/g, '-')} className="group cursor-pointer">
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
                  <button onClick={() => { setSelectedCategory(category); setModalOpen(true); }} className="w-full mt-6 bg-sage-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-sage-700 transition-colors flex items-center justify-center group">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">Shop {selectedCategory.title}</h2>
              <form onSubmit={handleSubmit}>
                {selectedCategory.title === "Baby Chicks" && (
                  <>
                    <div className="mb-4">
                      <label className="block mb-2">Age</label>
                      <select value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} required className="w-full p-2 border rounded">
                        <option value="">Select age</option>
                        {selectedCategory.items.map((item: string) => <option key={item} value={item}>{item}</option>)}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Breed</label>
                      <select value={formData.breed} onChange={(e) => setFormData({...formData, breed: e.target.value})} required className="w-full p-2 border rounded">
                        <option value="">Select breed</option>
                        {breeds.map((breed: string) => <option key={breed} value={breed}>{breed}</option>)}
                      </select>
                    </div>
                  </>
                )}
                {selectedCategory.title === "Growing Birds" && (
                  <>
                    <div className="mb-4">
                      <label className="block mb-2">Age</label>
                      <select value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} required className="w-full p-2 border rounded">
                        <option value="">Select age</option>
                        {selectedCategory.items.map((item: string) => <option key={item} value={item}>{item}</option>)}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Breed</label>
                      <select value={formData.breed} onChange={(e) => setFormData({...formData, breed: e.target.value})} required className="w-full p-2 border rounded">
                        <option value="">Select breed</option>
                        {breeds.map((breed: string) => <option key={breed} value={breed}>{breed}</option>)}
                      </select>
                    </div>
                  </>
                )}
                {selectedCategory.title === "Production Ready" && (
                  <>
                    <div className="mb-4">
                      <label className="block mb-2">Type</label>
                      <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} required className="w-full p-2 border rounded">
                        <option value="">Select type</option>
                        <option value="Layer">Layer</option>
                        <option value="Broiler">Broiler</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Breed</label>
                      <select value={formData.breed} onChange={(e) => setFormData({...formData, breed: e.target.value})} required className="w-full p-2 border rounded">
                        <option value="">Select breed</option>
                        {breeds.map((breed: string) => <option key={breed} value={breed}>{breed}</option>)}
                      </select>
                    </div>
                  </>
                )}
                {selectedCategory.title === "Farm Fresh Eggs" && (
                  <div className="mb-4">
                    <label className="block mb-2">Type</label>
                    <select value={formData.item} onChange={(e) => setFormData({...formData, item: e.target.value})} required className="w-full p-2 border rounded">
                      <option value="">Select type</option>
                      {selectedCategory.items.map((item: string) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                )}
                <div className="mb-4">
                  <label className="block mb-2">Quantity</label>
                  <input type="number" min="1" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})} required className="w-full p-2 border rounded" />
                </div>
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-sage-600 text-white rounded">Add to Cart</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <section id="shop" className="py-16 px-4 bg-sage-50">
      <div className="max-w-7xl mx-auto">
        <CategoryPart title="Shop by Category" breeds={Breeds} />

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