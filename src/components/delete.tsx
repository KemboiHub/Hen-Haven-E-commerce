import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ChevronLeft } from 'lucide-react';

interface ContactSectionProps {
  goBack?: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ goBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Our Farm",
      details: ["123 Hen Haven Lane", "Farmville, State 12345"],
      action: "Get Directions"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["(555) 123-HENS", "(555) 123-4367"],
      action: "Call Now"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: ["info@henhaven.com", "support@henhaven.com"],
      action: "Send Email"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: ["Mon-Fri: 7:00 AM - 6:00 PM", "Sat-Sun: 8:00 AM - 5:00 PM"],
      action: "View Calendar"
    }
  ];

  const faqs = [
    {
      question: "What age chicks do you recommend for beginners?",
      answer: "We recommend starting with 2-3 week old chicks as they're past the most delicate stage but still young enough to bond with you."
    },
    {
      question: "Do you deliver live chickens?",
      answer: "Yes! We offer safe, climate-controlled delivery within 100 miles of our farm. Delivery fees vary by distance."
    },
    {
      question: "What vaccination schedule do you recommend?",
      answer: "We provide a complete vaccination guide with each purchase. Our birds come pre-vaccinated for Marek's disease."
    },
    {
      question: "Can I visit the farm before purchasing?",
      answer: "Absolutely! We encourage farm visits. Please schedule ahead to ensure someone is available to show you around."
    }
  ];

  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        {goBack && (
          <button onClick={goBack} className="flex items-center text-sage-600 hover:text-sage-800 mb-4">
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sage-800 mb-4">Get in Touch</h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Have questions about our poultry or need expert advice? We're here to help you succeed with your flock.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div id="send-message-section" className="bg-sage-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-sage-800 mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sage-700 font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sage-700 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sage-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sage-700 font-medium mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="health-consultation">Health Consultation</option>
                      <option value="delivery-scheduling">Delivery Scheduling</option>
                      <option value="care-advice">Care Advice</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sage-700 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your flock, questions, or how we can help you..."
                    required
                  ></textarea>
                </div>

          
