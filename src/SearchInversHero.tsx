import React from "react";
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
  YoutubeIcon,
} from "lucide-react"; // Added Lucide icons for header/footer
import Entry from "./component/Entry";
import MainHome from "./component/MainHome";
import Footer from "./component/Footer";

import image from "./Images/hii.jpg";
import Contact from "./component/Contact";
import ProjectOverviewWithIcons from "./ProjectOverviewWithIcons";
import OrderFlow from "./OrderFlow";
// Data for the Search Invers Landing Page
const searchInversPageData = {
  header: {
    logoText: "Search Invers",
    navLinks: ["Home", "Features", "Download", "Contact"],
    icons: [Search, User, ShoppingCart], // Example icons for a marketplace header
  },
  hero: {
    title: "Delivering Convenience, Statewide!",
    description:
      "Search Invers is your one-stop platform for ordering groceries, drinks, and snacks from local wholesalers and vendors — whether you're a retailer or a regular customer.",
    buttons: [
      { text: "Download App", type: "primary" },
      { text: "Learn More", type: "secondary" },
    ],
    bgImageUrl: image, // Placeholder for app banner
  },
  features: [
    {
      iconUrl: "https://placehold.co/64x64/ff7f50/fff?text=Vendor", // Placeholder for vendor icon
      title: "Multi-Vendor Marketplace",
      description:
        "Explore thousands of products from different vendors in one place.",
    },
    {
      iconUrl: "https://placehold.co/64x64/ff7f50/fff?text=Delivery", // Placeholder for delivery icon
      title: "Live Order Tracking",
      description:
        "Track your delivery on Google Maps from vendor to your doorstep.",
    },
    {
      iconUrl: "https://placehold.co/64x64/ff7f50/fff?text=Combo", // Placeholder for combo icon
      title: "Smart Combo Deals",
      description: "Get discounts on curated combo products across categories.",
    },
    {
      iconUrl: "https://placehold.co/64x64/ff7f50/fff?text=OTP", // Placeholder for OTP icon
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

const SearchInversLandingPage = () => {
  return (
    <div className="bg-[#fef7f0] text-[#1f1f1f] font-sans ">
      {/* Top Navigation Bar */}
      {/* <nav className="bg-[#1f1f1f] text-white py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold text-[#ff7f50]">
            {searchInversPageData.header.logoText}
          </div>
          <ul className="hidden md:flex space-x-6 text-gray-200 font-semibold">
            {searchInversPageData.header.navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                  className="hover:text-[#ff7f50] transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          {searchInversPageData.header.icons.map((Icon, index) => (
            <Icon
              key={index}
              className="w-5 h-5 text-gray-200 cursor-pointer hover:text-[#ff7f50]"
            />
          ))}
        </div>
      </nav> */}

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-cover bg-center bg-no-repeat h-150"
        style={{
          backgroundImage: `url(${searchInversPageData.hero.bgImageUrl})`,
        }}
      >
        <div className="bg-black/40 p-13 sm:p-16 text-white flex flex-col items-start justify-center min-h-[109vh]">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {searchInversPageData.hero.title}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            {searchInversPageData.hero.description}
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-[#ff7f50] text-white px-6 py-3 rounded-lg hover:bg-[#e9693c] transition-all">
              {searchInversPageData.hero.buttons[0].text}
            </button>
            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition-all">
              {searchInversPageData.hero.buttons[1].text}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      <section>
        {/* <Entry /> */}
        <MainHome />
      </section>

      {/* Call to Action Section */}
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
          {/* <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-[#ff7f50] mb-2">
              {searchInversPageData.header.logoText}
            </div>
            <p className="text-sm">{searchInversPageData.footer.copyright}</p>
          </div> */}
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
