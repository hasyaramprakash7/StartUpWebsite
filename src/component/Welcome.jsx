import {useEffect, useState} from 'react';
import '../App.css';
const Welcome = () => {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Wholesale Director, Global Traders',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      text: "Search Invers transformed our bulk sourcing process. We now connect with suppliers globally in minutes, not weeks.",
    },
    {
      name: 'Maria Santos',
      role: 'Retail Chain Owner',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      text: 'The real-time tracking feature gives us complete visibility over our inventory. Our customers love the transparency.',
    },
    {
      name: 'Ahmed Hassan',
      role: 'Logistics Manager, FastShip',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      text: 'As a delivery partner, Search Invers streamlined our operations across multiple cities. Efficiency increased by 40%.',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState (0);

  useEffect (() => {
    const interval = setInterval (() => {
      setCurrentSlide (prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval (interval);
  }, []);

  return (
    <div className="Welcome">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how Search Invers is transforming global trade for businesses worldwide
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {testimonials.map ((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0 left-0'}`}
                >
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-xl">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map ((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide (index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
