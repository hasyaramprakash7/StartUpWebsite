import React, { useState } from 'react';
import {
  ShoppingCart,
  Package,
  MapPin,
  Smartphone,
  Users,
  Percent,
  ArrowRight,
} from 'lucide-react';

const AppFeatures = () => {
  const [activeTab, setActiveTab] = useState('all');

  const appFeatures = [
    {
      icon: <ShoppingCart className="w-12 h-12" />,
      title: 'Smart Shopping',
      description: 'Browse and buy groceries, snacks, and drinks from multiple vendors in one app.',
      category: 'shopping',
    },
    {
      icon: <Package className="w-12 h-12" />,
      title: 'Combo Deals',
      description: 'Create or shop for bundled product combos with attractive discounts.',
      category: 'shopping',
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: 'Live Delivery Tracking',
      description: 'Track your order in real time via Google Maps from vendor to your location.',
      category: 'tracking',
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: 'Secure OTP Login',
      description: 'Login easily using your phone number with auto OTP verification.',
      category: 'auth',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Vendor & Retailer Roles',
      description: 'Vendors can upload products; retailers can buy in bulk — all in one app.',
      category: 'vendor',
    },
    {
      icon: <Percent className="w-12 h-12" />,
      title: 'Offers & Discounts',
      description: 'Enjoy smart discounts, coupons, and special offers directly from vendors.',
      category: 'shopping',
    },
  ];

  const filteredFeatures =
    activeTab === 'all'
      ? appFeatures
      : appFeatures.filter(feature => feature.category === activeTab);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Explore Search Invers Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful tools and experiences tailored for customers, vendors, and retailers
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {['all', 'shopping', 'vendor', 'delivery', 'auth', 'tracking'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="mb-6 text-blue-600 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <button className="text-blue-600 font-semibold flex items-center group">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
