import { Check, Star, Globe, Truck, ShoppingCart, Users } from 'lucide-react';
import '../App.css';
import img from "../Images/efc87887230039968639d32aead40c17.jpg"
const MainHome = () => {
  return (
    <div className="mainHome">
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose Search Invers?</h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Global Trade Network',
                    description: 'Connect with wholesalers, retailers & delivery agents worldwide',
                    icon: <Globe className="w-6 h-6" />
                  },
                  {
                    title: 'Real-Time Tracking',
                    description: 'Monitor your orders from sourcing to delivery in real-time',
                    icon: <Truck className="w-6 h-6" />
                  },
                  {
                    title: 'Bulk Sourcing Made Easy',
                    description: 'Streamlined B2B procurement for businesses of all sizes',
                    icon: <ShoppingCart className="w-6 h-6" />
                  },
                  {
                    title: 'Unified Platform',
                    description: 'One powerful app for all your wholesale & retail needs',
                    icon: <Users className="w-6 h-6" />
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-blue-100">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={img}
                alt="Global e-commerce network"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full p-3">
                    <Star className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-xl">4.8/5.0</p>
                    <p className="text-gray-600">Platform Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainHome;
