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
      details: ["Molo along Nakuru-Eldoret highway"],
      action: "Get Directions"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["Roz Poultry", "(+254) 792151754"],
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

                <button
                  type="submit"
                  className="w-full bg-sage-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-sage-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
                >
                  <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-sage-800 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white border border-sage-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-sage-800 mb-2 flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2 text-sage-600" />
                      {faq.question}
                    </h4>
                    <p className="text-sage-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white border border-sage-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center text-sage-600 mr-4">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-sage-800">{info.title}</h3>
                </div>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sage-600">{detail}</p>
                  ))}
                </div>
                <button className="text-sage-600 font-medium hover:text-sage-800 transition-colors">
                  {info.action} →
                </button>
              </div>
            ))}

            {/* Emergency Contact */}
            <div id="emergency-support" className="bg-red-50 border-2 border-red-200 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-red-800 mb-2">Emergency Support</h3>
              <p className="text-red-600 mb-4">
                For urgent health concerns with your birds, call our 24/7 emergency line.
              </p>
              <button
                onClick={() => window.location.href = 'tel:+254792151754'}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Call Emergency Line
              </button>
            </div>

            {/* Social Proof */}
            <div className="bg-sage-800 text-white p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-4">Join Our Community</h3>
              <p className="text-sage-200 mb-4">
                Connect with 2,500+ poultry enthusiasts for tips, advice, and updates.
              </p>
              <div className="flex space-x-4">
                <button className="flex-1 bg-sage-600 py-2 px-4 rounded-lg hover:bg-sage-500 transition-colors">
                  Facebook
                </button>
                <button className="flex-1 bg-sage-600 py-2 px-4 rounded-lg hover:bg-sage-500 transition-colors">
                  Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
