import { useState } from 'react';
import { Building, Phone, Menu, X } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView }) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Properties', id: 'properties' },
    { name: 'About Us', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNav = (id) => {
    setCurrentView(id);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed w-full z-50 bg-slate-900/55 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_30px_rgba(15,23,42,0.35)] text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            <Building className="h-8 w-8 text-yellow-500 mr-2" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold leading-none tracking-wide uppercase">Royal Investor</span>
              <span className="text-yellow-500 text-xs font-semibold tracking-[0.3em] uppercase">Realty</span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`tap-animate text-sm font-medium tracking-wide transition-colors ${
                  currentView === link.id ? 'text-yellow-500' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
            <a href="tel:9289035225" className="tap-animate flex items-center gap-2 bg-yellow-600/95 hover:bg-yellow-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg">
              <Phone size={16} />
              +91 92890 35225
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-yellow-500 hover:text-white transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-yellow-500/20 animate-fade-in">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium ${
                  currentView === link.id ? 'bg-yellow-500/10 text-yellow-500' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.name}
              </button>
            ))}
             <a href="tel:9289035225" className="flex items-center gap-2 px-4 py-3 text-yellow-500 font-semibold mt-4">
              <Phone size={18} /> Call: +91 92890 35225
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}