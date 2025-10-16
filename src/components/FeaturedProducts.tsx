import React, { useState } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
const FeaturedProducts: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);
  const { addToCart } = useCart();

  const products = [
    {
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
    },
    {
      id: 2,
      name: "Farm Fresh Eggs",
      category: "Dozen",
      price: "Ksh 750",
      originalPrice: "Ksh 900",
      rating: 4.8,
      reviews: 89,
      image: "https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg",
      badge: "Farm Fresh",
      description: "Free-range, organic eggs from happy hens"
    },
    {
      id: 3,
      name: "Premium chicks",
      category: "Baby Chicks",
      price: "Ksh 110",
      originalPrice: "Ksh 120",
      rating: 4.7,
      reviews: 156,
      image: "https://images.pexels.com/photos/32314325/pexels-photo-32314325.jpeg",
      badge: "Premium",
      description: "Specially vaccinated baby chicks"
    },
    {
      id: 4,
      name: "Kari Improved Kienyeji",
      category: "Broilers",
      price: "Ksh 1200",
      rating: 4.9,
      reviews: 67,
      image: "https://images.pexels.com/photos/33378064/pexels-photo-33378064.jpeg",
      badge: "Limited",
      description: "Adorable miniature chickens, perfect for small spaces"
    },
    {
      id: 1,
      name: "Kenbro Improved Kienyeji",
      category: "Broilers",
      price: "Ksh 999",
      originalPrice: "Ksh 1200",
      rating: 4.9,
      reviews: 124,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrf_ggNq7Kj0H31d71EWbxXebAb-S0aBJ8SQ&s",
      badge: "Best Seller",
      description: "Adorable miniature chickens, perfect for small spaces"
    },
    {
      id: 1,
      name: "Kari Improved Kienyeji",
      category: "Layers",
      price: "Ksh 899",
      originalPrice: "Ksh 1100",
      rating: 4.9,
      reviews: 124,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKzUg_oGe8Hdj9yJK_h5ahrsXHDq9G-K3wnw&s",
      badge: "Best Seller",
      description: "Adorable miniature chickens, perfect for small spaces"
    },
    {
      id: 2,
      name: "Improved Kienyeji",
      category: "Growing",
      price: "Ksh 400",
      originalPrice: "Ksh 500",
      rating: 4.8,
      reviews: 89,
      image: "https://static.wixstatic.com/media/efd390_00b8f5c223a04a03b1523253193bcedf~mv2.jpeg/v1/fill/w_476,h_634,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/efd390_00b8f5c223a04a03b1523253193bcedf~mv2.jpeg",
      badge: "Premium Poultry",
      description: "Free-range, perfect for beginners"
    },
    {
      id: 3,
      name: "Premium Layer Feed",
      category: "20lb Bag",
      price: "Ksh 1500",
      originalPrice: "Ksh 1800",
      rating: 4.7,
      reviews: 156,
      image: "https://images.pexels.com/photos/6929172/pexels-photo-6929172.jpeg",
      badge: "Premium",
      description: "Complete nutrition for optimal egg production"
    },
        {
      id: 5,
      name: "Kari Improved Kienyeji",
      category: "Broilers",
      price: "Ksh 1200",
      rating: 4.9,
      reviews: 67,
      image: "https://images.pexels.com/photos/33378064/pexels-photo-33378064.jpeg",
      badge: "Limited",
      description: "Adorable miniature chickens, perfect for small spaces"
    },
        {
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
    },
    {
      id: 2,
      name: "Farm Fresh Eggs",
      category: "Dozen",
      price: "Ksh 750",
      originalPrice: "Ksh 900",
      rating: 4.8,
      reviews: 89,
      image: "https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg",
      badge: "Farm Fresh",
      description: "Free-range, organic eggs from happy hens"
    },
    {
      id: 3,
      name: "Premium Layer Feed",
      category: "20lb Bag",
      price: "Ksh 1500",
      originalPrice: "Ksh 1800",
      rating: 4.7,
      reviews: 156,
      image: "https://images.pexels.com/photos/6929172/pexels-photo-6929172.jpeg",
      badge: "Premium",
      description: "Complete nutrition for optimal egg production"
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <section id="featured-products" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sage-800 mb-4">Featured Products</h2>
          <p className="text-xl text-sage-600 max-w-2xl mx-auto">
            Hand-picked selection of our most popular poultry products and supplies
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.badge === 'Best Seller' ? 'bg-sage-600 text-white' :
                    product.badge === 'Farm Fresh' ? 'bg-green-500 text-white' :
                    product.badge === 'Premium' ? 'bg-brown-600 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {product.badge}
                  </span>
                </div>

                {/* Favorite Button */}
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors ${
                      favorites.includes(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-sage-600'
                    }`} 
                  />
                </button>

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => { const element = document.getElementById('shop'); if (element) element.scrollIntoView({ behavior: 'smooth' }); }}
                    className="bg-white text-sage-800 px-6 py-3 rounded-lg font-semibold hover:bg-sage-50 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                  >
                    GO TO SHOP
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-sage-500 uppercase tracking-wide">{product.category}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-sage-800 mb-2 group-hover:text-sage-600 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-sage-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-sage-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price & Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-sage-800">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-sage-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="bg-sage-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sage-700 transition-all duration-300 transform hover:scale-105"
          >
            {showAll ? 'Show Less' : 'View All Products'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
