import React from 'react'

const detete = () => {
  return (
    <div>detete</div>
  )
}

export default detete


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
  