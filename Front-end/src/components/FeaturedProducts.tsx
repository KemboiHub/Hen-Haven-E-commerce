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
      name: "kuroiler breeds",
      category: "Layers",
      price: "Ksh 899",
      originalPrice: "Ksh 1100",
      rating: 4.9,
      reviews: 67,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSveKtAeirVeyL-56mYTz4Lw2qUne7wuolqjQ&s",
      badge: "Limited",
      description: "Adorable miniature poultry, perfect for small spaces"
    },
        {
      id: 1,
      name: "Sasso breeds",
      category: "Broilers",
      price: "Ksh 999",
      originalPrice: "Ksh 1200",
      rating: 4.9,
      reviews: 124,
      image: "data:image/jpeg;base64,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",
      badge: "Best Seller",
      description: "Hardy, friendly breed perfect for beginners"
    },

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
                  className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-sage-100 transition-colors"
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
                    className="bg-white text-sage-800 px-6 py-3 rounded-lg font-semibold hover:bg-sage-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
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
                
                <h3 className="text-xl font-semibold text-sage-800 mb-2 group-hover:text-sage-300 transition-colors">
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
                    className="p-2 bg-sage-600 text-white rounded-lg hover:bg-sage-300 transition-colors"
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
            className="bg-sage-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sage-400 transition-all duration-300 transform hover:scale-105"
          >
            {showAll ? 'Show Less' : 'View All Products'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
