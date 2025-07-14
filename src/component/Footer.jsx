import { ShoppingCart } from 'lucide-react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingCart className="w-8 h-8 text-orange-500" />
                <span className="text-white font-bold text-xl">Search Invers</span>
              </div>
              <p className="text-sm">
                Your all-in-one platform to connect wholesalers, retailers, and customers. Delivering fast, local, and smart shopping solutions.
              </p>
            </div>

            {/* Footer Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400">Multi-Vendor Support</a></li>
                <li><a href="#" className="hover:text-orange-400">Real-Time Delivery Tracking</a></li>
                <li><a href="#" className="hover:text-orange-400">Smart Combos & Offers</a></li>
                <li><a href="#" className="hover:text-orange-400">Secure OTP Login</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Vendors</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400">Become a Vendor</a></li>
                <li><a href="#" className="hover:text-orange-400">Vendor Dashboard</a></li>
                <li><a href="#" className="hover:text-orange-400">Combo Management</a></li>
                <li><a href="#" className="hover:text-orange-400">Upload Products</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-400">FAQs</a></li>
                <li><a href="#" className="hover:text-orange-400">Terms of Use</a></li>
                <li><a href="#" className="hover:text-orange-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">© {new Date().getFullYear()} Search Invers. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
                <a href="#" className="hover:text-orange-400">Privacy Policy</a>
                <a href="#" className="hover:text-orange-400">Terms of Service</a>
                <a href="#" className="hover:text-orange-400">Cookie Settings</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
