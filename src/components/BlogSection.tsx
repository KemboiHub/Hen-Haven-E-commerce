import React from 'react';
import { Calendar, User, ArrowRight, Clock, ChevronLeft } from 'lucide-react';

interface BlogSectionProps {
  goBack?: () => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ goBack }) => {
  const blogPosts = [
    {
      title: "Complete Guide to Raising Baby Chicks",
      excerpt: "Everything you need to know about caring for day-old chicks through their first 8 weeks of life.",
      author: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      readTime: "8 min read",
      image: "https://images.pexels.com/photos/32314325/pexels-photo-32314325.jpeg",
      category: "Care Guide",
      featured: true
    },
    {
      title: "Maximizing Egg Production in Winter",
      excerpt: "Proven strategies to maintain consistent egg laying during the colder months.",
      author: "Mike Peterson",
      date: "March 12, 2024",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg",
      category: "Production"
    },
    {
      title: "Common Chicken Diseases and Prevention",
      excerpt: "Identify, treat, and prevent the most common health issues in backyard flocks.",
      author: "Dr. Emily Chen",
      date: "March 10, 2024",
      readTime: "12 min read",
      image: "https://images.pexels.com/photos/4021769/pexels-photo-4021769.jpeg",
      category: "Health"
    },
    {
      title: "Building the Perfect Chicken Coop",
      excerpt: "Design and construction tips for creating a safe, comfortable home for your flock.",
      author: "Tom Builder",
      date: "March 8, 2024",
      readTime: "10 min read",
      image: "https://images.pexels.com/photos/32727462/pexels-photo-32727462.jpeg",
      category: "Housing"
    },
    {
      title: "Organic Feed vs. Commercial: What's Best?",
      excerpt: "Compare the benefits and costs of different feeding approaches for optimal poultry nutrition.",
      author: "Lisa Nutritionist",
      date: "March 5, 2024",
      readTime: "7 min read",
      image: "https://images.pexels.com/photos/6929172/pexels-photo-6929172.jpeg",
      category: "Nutrition"
    },
    {
      title: "Seasonal Care Calendar for Poultry",
      excerpt: "Month-by-month guide to managing your flock throughout the year for optimal health and production.",
      author: "Farm Team",
      date: "March 1, 2024",
      readTime: "15 min read",
      image: "https://images.pexels.com/photos/14376368/pexels-photo-14376368.jpeg",
      category: "Management"
    }
  ];

  const categories = [
    { name: "All Posts", count: 24, active: true },
    { name: "Care Guide", count: 8 },
    { name: "Health", count: 6 },
    { name: "Nutrition", count: 5 },
    { name: "Production", count: 3 },
    { name: "Housing", count: 2 }
  ];

  return (
    <section id="blog" className="py-16 px-4 bg-sage-50">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        {goBack && (
          <button onClick={goBack} className="flex items-center text-sage-600 hover:text-sage-800 mb-4">
            <ChevronLeft className="h-5 w-5 mr-2" /> Back
          </button>
        )}
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sage-800 mb-4">Expert Insights & Guides</h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Learn from our poultry experts with comprehensive guides, tips, and industry insights
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                category.active
                  ? 'bg-sage-600 text-white shadow-md'
                  : 'bg-white text-sage-600 hover:bg-sage-100 border border-sage-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="bg-sage-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                    Featured
                  </span>
                  <span className="bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm">
                    {blogPosts[0].category}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-sage-800 mb-4">{blogPosts[0].title}</h3>
                <p className="text-sage-600 text-lg mb-6">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sage-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span className="text-sm">{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-sage-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sage-700 transition-colors inline-flex items-center group">
                  Read Full Article
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <article key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-sage-700 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-sage-800 mb-3 hover:text-sage-600 transition-colors cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-sage-600 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sage-500 text-sm mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <button className="text-sage-600 font-semibold hover:text-sage-800 transition-colors inline-flex items-center group">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-sage-800 text-white p-8 lg:p-12 rounded-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated with Expert Tips</h3>
          <p className="text-sage-200 text-lg mb-8 max-w-2xl mx-auto">
            Get weekly insights, seasonal care tips, and exclusive content delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-sage-800 focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
            <button className="bg-sage-600 hover:bg-sage-500 px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sage-300 text-sm mt-4">
            No spam, unsubscribe anytime. Join 2,500+ poultry enthusiasts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;