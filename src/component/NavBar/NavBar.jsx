import {useEffect, useState} from 'react';
import {Menu, X, Scale} from 'lucide-react';
import {navBar} from './navBar';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState (false);
  const [isScrolled, setIsScrolled] = useState (false);

  useEffect (() => {
    const handleScroll = () => {
      setIsScrolled (window.scrollY > 50);
    };
    window.addEventListener ('scroll', handleScroll);
    return () => window.removeEventListener ('scroll', handleScroll);
  }, []);
  return (
    <div>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Scale
                className={`w-8 h-8 ${isScrolled ? 'text-blue-600' : 'text-white'}`}
              />
              <span
                className={`font-bold text-xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                NOVA LAW
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navBar.map (item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase ().replace (' ', '-')}`}
                  className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-600 transition-colors text-sm font-medium`}
                >
                  {item}
                </a>
              ))}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105">
                Free Consultation
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              onClick={() => setIsMenuOpen (!isMenuOpen)}
            >
              {isMenuOpen
                ? <X className="w-6 h-6" />
                : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen &&
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 animate-fade-in">
            {navBar.map (item => (
              <a
                key={item}
                href={`#${item.toLowerCase ().replace (' ', '-')}`}
                className="block px-6 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen (false)}
              >
                {item}
              </a>
            ))}
            <div className="px-6 py-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
                Free Consultation
              </button>
            </div>
          </div>}
      </nav>

    </div>
  );
};

export default NavBar;
