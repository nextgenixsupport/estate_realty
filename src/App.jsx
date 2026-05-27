import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import About from './pages/About';
import Contact from './pages/Contact';
import { MessageCircle, Phone, X } from 'lucide-react';

const PHONE_NUMBER = '919289035225';
const WHATSAPP_TEXT = 'Hi, I am interested in your properties in Gurugram.';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showLeadPopup, setShowLeadPopup] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    window.history.replaceState({ view: 'home' }, '', window.location.href);

    const onPopState = (event) => {
      const view = event.state?.view;
      if (view) {
        setCurrentView(view);
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    window.history.pushState({ view }, '', window.location.href);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-yellow-500/30">
      <Navbar currentView={currentView} setCurrentView={navigateTo} />

      <main className="flex-grow">
        {currentView === 'home' && <Home setCurrentView={navigateTo} />}
        {currentView === 'properties' && <Properties />}
        {currentView === 'about' && <About />}
        {currentView === 'contact' && <Contact />}
      </main>

      <a href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`} target="_blank" rel="noreferrer" className="fixed right-5 bottom-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl tap-animate" aria-label="Chat on WhatsApp">
        <MessageCircle size={24} />
      </a>

      {showLeadPopup && (
        <div className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button className="absolute right-4 top-4 text-slate-500" onClick={() => setShowLeadPopup(false)}><X size={20} /></button>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Quick Connect</h3>
            <p className="text-slate-600 mb-4">Get best deals instantly on call or WhatsApp.</p>
            <button onClick={() => { setShowLeadPopup(false); navigateTo('contact'); }} className="w-full bg-slate-900 text-white py-3 rounded-lg mb-3">Open Contact Form</button>
            <a href="tel:9289035225" className="w-full block text-center bg-yellow-500 text-slate-900 py-3 rounded-lg font-semibold mb-3"><Phone size={16} className="inline mr-2"/>Call Now</a>
            <a href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`} target="_blank" rel="noreferrer" className="w-full block text-center bg-green-500 text-white py-3 rounded-lg font-semibold">WhatsApp Now</a>
          </div>
        </div>
      )}

      <Footer setCurrentView={navigateTo} />
    </div>
  );
}
