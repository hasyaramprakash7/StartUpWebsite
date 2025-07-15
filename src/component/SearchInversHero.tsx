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
} from "lucide-react";

import Entry from "./Entry";
import MainHome from "./MainHome";
import Footer from "./Footer";
import Contact from "./Contact";
import ProjectOverviewWithIcons from "./ProjectOverviewWithIcons";
import OrderFlow from "./OrderFlow";

import image from "../Images/hii.jpg";

// Launch date: 3 months from now (adjust if needed)
const LAUNCH_DATE = new Date("2025-10-14T00:00:00");

const SearchInversLandingPage = () => {
  const [timeLeft, setTimeLeft] = useState("");

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

  const searchInversPageData = {
    header: {
      logoText: "Search Invers",
      navLinks: ["Home", "Features", "Download", "Contact"],
      icons: [Search, User, ShoppingCart],
    },
    hero: {
      title: "Delivering Convenience, Statewide!",
      description:
        "Search Invers is your one-stop platform for ordering groceries, drinks, and snacks from local wholesalers and vendors — whether you're a retailer or a regular customer.",
      buttons: [
        { text: "Download App", type: "primary" },
        { text: "Learn More", type: "secondary" },
      ],
      bgImageUrl: image,
    },
    features: [
      {
        iconUrl: "https://placehold.co/64x64/ff7f50/fff?text=Vendor",
        title: "Multi-Vendor Marketplace",
        description:
          "Explore thousands of products from different vendors in one place.",
      },
      {
        iconUrl: "https://placehold.co/64x64/ff7f50/fff?text=Delivery",
        title: "Live Order Tracking",
        description:
          "Track your delivery on Google Maps from vendor to your doorstep.",
      },
      {
        iconUrl: "https://placehold.co/64x64/ff7f50/fff?text=Combo",
        title: "Smart Combo Deals",
        description:
          "Get discounts on curated combo products across categories.",
      },
      {
        iconUrl: "https://placehold.co/64x64/ff7f50/fff?text=OTP",
        title: "Secure OTP Login",
        description:
          "Login securely with your phone number and OTP verification.",
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

  return (
    <div className="bg-[#fef7f0] text-[#1f1f1f] font-sans">
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-[100vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${searchInversPageData.hero.bgImageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center sm:items-start justify-center h-full px-6 sm:px-12 text-white text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl">
            {searchInversPageData.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 max-w-xl">
            {searchInversPageData.hero.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
            <button className="bg-[#ff7f50] text-white px-6 py-3 rounded-lg hover:bg-[#e9693c] transition-all">
              {searchInversPageData.hero.buttons[0].text}
            </button>
            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition-all">
              {searchInversPageData.hero.buttons[1].text}
            </button>
          </div>

          {/* Countdown Timer */}
          {timeLeft && (
            <p className="mt-4 text-sm font-medium bg-white/20 px-4 py-2 rounded-lg text-white">
              App Launch In: {timeLeft}
            </p>
          )}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 bg-[#fff]">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Search Invers?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {searchInversPageData.features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={feature.iconUrl}
                alt={feature.title}
                className="w-16 h-16 mx-auto mb-4 object-contain"
              />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <ProjectOverviewWithIcons />
      <OrderFlow />

      {/* Main Home */}
      <section>
        <MainHome />
      </section>

      {/* Call to Action */}
      <section id="download" className="bg-[#f5efe4] py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-4">
          {searchInversPageData.callToAction.title}
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          {searchInversPageData.callToAction.description}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          {searchInversPageData.callToAction.appStoreLinks.map(
            (link, index) => (
              <a
                key={index}
                href={link.url}
                className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                {link.text}
              </a>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1f1f1f] text-gray-300 py-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start space-y-2">
            {searchInversPageData.footer.contactInfo.map((info, index) => (
              <p key={index} className="flex items-center text-sm">
                <info.icon className="w-4 h-4 mr-2 text-gray-400" /> {info.text}
              </p>
            ))}
          </div>
          <div className="flex space-x-6">
            {searchInversPageData.footer.socialIcons.map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-300 hover:text-[#ff7f50] transition-colors"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <Footer />
    </div>
  );
};

export default SearchInversLandingPage;
