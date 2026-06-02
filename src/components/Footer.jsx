import { Building, Star, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Building className="h-6 w-6 text-yellow-500 mr-2" />
            <span className="font-serif text-xl font-bold text-white uppercase">Royal Investor</span>
          </div>
          <p className="text-sm mb-4">Your trusted partner in discovering luxury real estate. Experience unparalleled service and exclusive property access.</p>
          <div className="flex space-x-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition cursor-pointer"><Star size={14}/></div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition cursor-pointer"><Building size={14}/></div>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-serif font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {['Home', 'Properties', 'About Us', 'Contact'].map((item, idx) => (
              <li key={idx}>
                <button onClick={() => {setCurrentView(item.toLowerCase().split(' ')[0]); window.scrollTo(0,0);}} className="hover:text-yellow-500 transition-colors text-sm">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif font-semibold text-lg mb-4">Contact Info</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3"><Phone size={16} className="text-yellow-500" /> +91 92890 35225</li>
            <li className="flex items-center gap-3"><Mail size={16} className="text-yellow-500" /> info@royalinvestorrealty.com</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-yellow-500" /> Gurugram, Haryana, India</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-sm text-center">
        © {new Date().getFullYear()} Royal Investor Realty. All rights reserved.
      </div>
    </footer>
  );
}
