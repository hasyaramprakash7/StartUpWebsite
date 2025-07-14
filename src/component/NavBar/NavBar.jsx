import { useEffect, useState } from 'react';
import { Menu, X, Store } from 'lucide-react';

const navBar = [
  'Home',
  'Features',
  'Vendors',
  'App Screens',
  'Contact',
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-2'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Store
                className={`w-8 h-8 transition-colors ${isScrolled ? 'text-purple-600' : 'text-white'
                  }`}
              />
              <span
                className={`font-bold text-xl tracking-wide ${isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
              >
                Search Invers
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navBar.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`${isScrolled ? 'text-gray-700' : 'text-white'
                    } hover:text-purple-600 transition-colors text-sm font-medium`}
                >
                  {item}
                </a>
              ))}
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition-transform hover:scale-105">
                Download App
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`lg:hidden ${isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 animate-fade-in-down">
            {navBar.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="px-6 pt-3">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full">
                Download App
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
