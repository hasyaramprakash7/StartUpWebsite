import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Search,
  User,
  ShoppingCart,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  Play,
  Star,
  MapPin,
  Shield,
  Zap,
  Truck,
  Package,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import NavBar from "./NavBar/NavBar.jsx";
import MainHome from "./MainHome.jsx";

// Launch date: 3 months from now
const LAUNCH_DATE = new Date("2025-10-14T00:00:00");

const SearchInversLandingPage = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = LAUNCH_DATE.getTime() - now;

      if (distance < 0) {
        setTimeLeft("App Launched!");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchInversPageData = {
    header: {
      logoText: "Search Invers",
      navLinks: ["Home", "Features", "How It Works", "Download", "Contact"],
    },
    hero: {
      title: "Delivering Convenience, Statewide!",
      description:
        "Search Invers is your one-stop platform for ordering groceries, drinks, and snacks from local wholesalers and vendors — whether you're a retailer or a regular customer.",
      buttons: [
        { text: "Download App", type: "primary" },
        { text: "Watch Demo", type: "secondary" },
      ],
    },
    features: [
      {
        icon: Package,
        title: "Multi-Vendor Marketplace",
        description:
          "Explore thousands of products from different vendors in one place.",
        color: "from-purple-500 to-pink-500",
      },
      {
        icon: MapPin,
        title: "Live Order Tracking",
        description:
          "Track your delivery on Google Maps from vendor to your doorstep.",
        color: "from-blue-500 to-cyan-500",
      },
      {
        icon: Zap,
        title: "Smart Combo Deals",
        description:
          "Get discounts on curated combo products across categories.",
        color: "from-green-500 to-emerald-500",
      },
      {
        icon: Shield,
        title: "Secure OTP Login",
        description:
          "Login securely with your phone number and OTP verification.",
        color: "from-orange-500 to-red-500",
      },
    ],
    stats: [
      { number: "10K+", label: "Happy Customers" },
      { number: "500+", label: "Vendor Partners" },
      { number: "50+", label: "Cities Covered" },
      { number: "99.9%", label: "Uptime" },
    ],
    testimonials: [
      {
        name: "Rajesh Kumar",
        role: "Retail Store Owner",
        content:
          "Search Invers has revolutionized how I manage my inventory. The bulk ordering feature saves me hours every week!",
        rating: 5,
        avatar: "👨‍💼",
      },
      {
        name: "Priya Sharma",
        role: "Home Customer",
        content:
          "Love how I can track my groceries in real-time. The app is so user-friendly and delivery is always on time.",
        rating: 5,
        avatar: "👩‍🦳",
      },
      {
        name: "Amit Patel",
        role: "Wholesaler",
        content:
          "As a vendor, the dashboard gives me complete control over my listings and orders. Great platform for business growth.",
        rating: 5,
        avatar: "👨‍💻",
      },
    ],
    callToAction: {
      title: "Download the App Now!",
      description:
        "Experience smart shopping, real-time delivery tracking, and powerful vendor tools — all in one app.",
      appStoreLinks: [
        { text: "📱 Google Play", url: "#" },
        { text: "🍎 App Store", url: "#" },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Search Invers. All rights reserved.`,
      socialIcons: [Instagram, Facebook, Twitter],
      contactInfo: [
        { icon: Mail, text: "info@searchinvers.com" },
        { icon: Phone, text: "+91 98765 43210" },
      ],
    },
  };

  // const NavBar = () => (
  //   <nav className={`fixed w-full z-50 transition-all duration-300 ${
  //     scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
  //   }`}>
  //     <div className="container mx-auto px-6 py-4">
  //       <div className="flex items-center justify-between">
  //         <div className="flex items-center space-x-2">
  //           <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
  //             <Search className="w-5 h-5 text-white" />
  //           </div>
  //           <span className={`text-xl font-bold ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`}>
  //             {searchInversPageData.header.logoText}
  //           </span>
  //         </div>

  //         {/* Desktop Menu */}
  //         <div className="hidden md:flex items-center space-x-8">
  //           {searchInversPageData.header.navLinks.map((link, index) => (
  //             <a
  //               key={index}
  //               href={`#${link.toLowerCase().replace(' ', '-')}`}
  //               className={`hover:text-orange-500 transition-colors ${
  //                 scrollY > 50 ? 'text-gray-700' : 'text-white'
  //               }`}
  //             >
  //               {link}
  //             </a>
  //           ))}
  //         </div>

  //         {/* Mobile Menu Button */}
  //         <button
  //           className="md:hidden"
  //           onClick={() => setIsMenuOpen(!isMenuOpen)}
  //         >
  //           {isMenuOpen ?
  //             <X className={`w-6 h-6 ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`} /> :
  //             <Menu className={`w-6 h-6 ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`} />
  //           }
  //         </button>
  //       </div>

  //       {/* Mobile Menu */}
  //       {isMenuOpen && (
  //         <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
  //           <div className="px-6 py-4 space-y-4">
  //             {searchInversPageData.header.navLinks.map((link, index) => (
  //               <a
  //                 key={index}
  //                 href={`#${link.toLowerCase().replace(' ', '-')}`}
  //                 className="block text-gray-700 hover:text-orange-500 transition-colors"
  //                 onClick={() => setIsMenuOpen(false)}
  //               >
  //                 {link}
  //               </a>
  //             ))}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </nav>
  // );

  const HeroSection = () => (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20" />
        {/* Floating Elements */}
        <div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-block animate-pulse">🚀</span>

            {searchInversPageData.hero.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {searchInversPageData.hero.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap justify-center mb-8">
            <button className="group bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2">
              <span className="font-semibold">
                {searchInversPageData.hero.buttons[0].text}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span className="font-semibold">
                {searchInversPageData.hero.buttons[1].text}
              </span>
            </button>
          </div>

          {/* Countdown Timer */}
          {timeLeft && (
            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="text-sm font-medium">
                🎯 App Launch In:{" "}
                <span className="font-bold text-yellow-300">{timeLeft}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  const StatsSection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {searchInversPageData.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Search Invers?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of grocery shopping with our cutting-edge
            features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {searchInversPageData.features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const HowItWorksSection = () => (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to get your groceries delivered
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Browse & Select",
              description:
                "Choose from thousands of products across multiple vendors",
              icon: Search,
            },
            {
              step: "2",
              title: "Place Order",
              description:
                "Add items to cart and checkout securely with OTP verification",
              icon: ShoppingCart,
            },
            {
              step: "3",
              title: "Track & Receive",
              description:
                "Monitor your delivery in real-time and receive at your doorstep",
              icon: Truck,
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {searchInversPageData.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const DownloadSection = () => (
    <section
      id="download"
      className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {searchInversPageData.callToAction.title}
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          {searchInversPageData.callToAction.description}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          {searchInversPageData.callToAction.appStoreLinks.map(
            (link, index) => (
              <a
                key={index}
                href={link.url}
                className="bg-black/20 backdrop-blur-sm hover:bg-black/30 px-8 py-4 rounded-full transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <span className="font-semibold">{link.text}</span>
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );

  const FooterSection = () => (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Search Invers
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Delivering convenience, statewide. Your trusted partner for
              grocery shopping.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              {searchInversPageData.footer.contactInfo.map((info, index) => (
                <p key={index} className="flex items-center text-sm">
                  <info.icon className="w-4 h-4 mr-2 text-gray-400" />
                  {info.text}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {searchInversPageData.footer.socialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {searchInversPageData.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="font-sans">
      <NavBar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <MainHome />
      <HowItWorksSection />
      <TestimonialsSection />
      <DownloadSection />
      <FooterSection />
    </div>
  );
};

export default SearchInversLandingPage;
