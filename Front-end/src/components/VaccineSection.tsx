import React, { useState } from 'react';
import { Shield, Thermometer, Syringe, Heart, AlertCircle, CheckCircle, ChevronLeft } from 'lucide-react';

interface VaccineSectionProps {
  navigateToSection: (section: string) => void;
  goBack?: () => void;
}

const VaccineSection: React.FC<VaccineSectionProps> = ({ navigateToSection, goBack }) => {
  const [activeTab, setActiveTab] = useState('vaccines');

  const vaccines = [
    {
      name: "Marek's Disease Vaccine",
      age: "Day 1",
      description: "Essential protection against Marek's disease",
      image: "https://images.pexels.com/photos/4021769/pexels-photo-4021769.jpeg",
      dosage: "0.2ml subcutaneous",
      price: "$2.50 per dose",
      symptoms: ["Paralysis", "Tumors", "Weight loss"]
    },
    {
      name: "Newcastle Disease Vaccine",
      age: "14-18 days",
      description: "Respiratory system protection",
      image: "https://images.pexels.com/photos/4021769/pexels-photo-4021769.jpeg",
      dosage: "Eye drop or spray",
      price: "$1.75 per dose",
      symptoms: ["Respiratory distress", "Nervous signs", "Egg drop"]
    },
    {
      name: "Infectious Bronchitis Vaccine",
      age: "14-21 days",
      description: "Protects against respiratory infection",
      image: "https://images.pexels.com/photos/4021769/pexels-photo-4021769.jpeg",
      dosage: "Eye drop or water",
      price: "$1.50 per dose",
      symptoms: ["Coughing", "Sneezing", "Reduced egg quality"]
    },
    {
      name: "Fowl Pox Vaccine",
      age: "8-12 weeks",
      description: "Prevention of fowl pox virus",
      image: "https://images.pexels.com/photos/4021769/pexels-photo-4021769.jpeg",
      dosage: "Wing web stick",
      price: "$1.25 per dose",
      symptoms: ["Skin lesions", "Respiratory issues", "Reduced appetite"]
    }
  ];

  const treatments = [
    
    {
      name: "Parasites",
      symptoms: ["Weight loss", "Pale combs", "Reduced egg production"],
      treatment: "Ivermectin Solution",
      dosage: "0.2ml per kg body weight",
      image: "https://images.pexels.com/photos/4021769/pexels-photo-4021769.jpeg",
      price: "$18.75"
    },
    {
      name: "Wound Care",
      symptoms: ["Cuts", "Pecking injuries", "Bumblefoot"],
      treatment: "Wound Spray + Antibiotics",
      dosage: "Clean and spray 2-3 times daily",
      image: "https://images.pexels.com/photos/4021769/pexels-photo-4021769.jpeg",
      price: "$9.99"
    }
  ];

  return (
    <section id="vaccine" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        {goBack && (
          <button onClick={goBack} className="flex items-center text-sage-600 hover:text-sage-400 mb-4">
            <ChevronLeft className="h-5 w-5 mr-2" /> Back
          </button>
        )}
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sage-800 mb-4">Healthcare & Treatment</h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Complete vaccination schedules and treatment solutions to keep your flock healthy and productive
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-sage-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('vaccines')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'vaccines'
                  ? 'bg-white text-sage-800 shadow-md'
                  : 'text-sage-600 hover:text-sage-400'
              }`}
            >
              <Shield className="inline h-5 w-5 mr-2" />
              Vaccination Program
            </button>
            <button
              onClick={() => setActiveTab('treatments')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'treatments'
                  ? 'bg-white text-sage-800 shadow-md'
                  : 'text-sage-600 hover:text-sage-400'
              }`}
            >
              <Heart className="inline h-5 w-5 mr-2" />
              Disease Treatment
            </button>
          </div>
        </div>

        {/* Vaccination Schedule */}
        {activeTab === 'vaccines' && (
          <div>
            {/* Vaccination Timeline */}
            <div className="mb-12 bg-sage-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-sage-800 mb-6 text-center">Recommended Vaccination Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-sage-300"></div>
                <div className="space-y-8">
                  {[
                    { age: "Day 1", vaccine: "Marek's Disease", location: "Hatchery" },
                    { age: "14-18 Days", vaccine: "Newcastle + IB", location: "Farm" },
                    { age: "4-6 Weeks", vaccine: "Coccidiosis", location: "Farm" },
                    { age: "8-12 Weeks", vaccine: "Fowl Pox", location: "Farm" },
                    { age: "16-18 Weeks", vaccine: "Layer Vaccines", location: "Pre-lay" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-sage-600 rounded-full flex items-center justify-center mr-6 relative z-10">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-md flex-1">
                        <div className="font-semibold text-sage-800">{item.age}</div>
                        <div className="text-sage-600">{item.vaccine}</div>
                        <div className="text-sm text-sage-500">{item.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vaccines Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vaccines.map((vaccine, index) => (
                <div key={index} className="bg-white border border-sage-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <img src={vaccine.image} alt={vaccine.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Syringe className="h-5 w-5 text-sage-600 mr-2" />
                      <span className="text-sm font-medium text-sage-600">{vaccine.age}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-sage-800 mb-2">{vaccine.name}</h3>
                    <p className="text-sage-600 mb-4">{vaccine.description}</p>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm"><strong>Dosage:</strong> {vaccine.dosage}</p>
                      <p className="text-sm"><strong>Price:</strong> {vaccine.price}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-sage-800 mb-2">Prevents:</p>
                      <div className="space-y-1">
                        {vaccine.symptoms.map((symptom, idx) => (
                          <div key={idx} className="flex items-center text-sm text-sage-600">
                            <AlertCircle className="h-3 w-3 mr-2 text-red-500" />
                            {symptom}
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="w-full bg-sage-600 text-white py-2 px-4 rounded-lg hover:bg-sage-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Treatment Section */}
        {activeTab === 'treatments' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatments.map((treatment, index) => (
              <div key={index} className="bg-white border border-sage-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <img src={treatment.image} alt={treatment.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-sm font-medium text-red-600">Treatment</span>
                  </div>
                  <h3 className="text-xl font-semibold text-sage-800 mb-2">{treatment.name}</h3>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-sage-800 mb-2">Symptoms:</p>
                    <div className="space-y-1">
                      {treatment.symptoms.map((symptom, idx) => (
                        <div key={idx} className="flex items-center text-sm text-sage-600">
                          <AlertCircle className="h-3 w-3 mr-2 text-red-500" />
                          {symptom}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><strong>Treatment:</strong> {treatment.treatment}</p>
                    <p className="text-sm"><strong>Dosage:</strong> {treatment.dosage}</p>
                    <p className="text-sm"><strong>Price:</strong> {treatment.price}</p>
                  </div>
                  <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                    Order Treatment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expert Consultation */}
        <div className="mt-16 bg-sage-800 text-white p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Need Expert Consultation?</h3>
          <p className="text-sage-200 mb-6 max-w-2xl mx-auto">
            Our veterinary specialists are available 24/7 to help diagnose and treat your poultry health concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                navigateToSection('contact');
                setTimeout(() => document.getElementById('send-message-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="bg-white text-sage-800 px-6 py-3 rounded-lg font-semibold hover:bg-sage-100 transition-colors"
            >
              Schedule Consultation
            </button>
            <button
             onClick={() => {
                navigateToSection('contact');
                setTimeout(() => document.getElementById('emergency-support')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-sage-600 transition-colors">
              Emergency Hotline
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VaccineSection;
