import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import About from './pages/About';
import Contact from './pages/Contact';
import { MessageCircle, Phone, Send, Sparkles, X } from 'lucide-react';
import { BUDGET_OPTIONS, PROPERTIES } from './data/constants';
import { sendLeadEmail } from './utils/email';

const PHONE_NUMBER = '919289035225';
const WHATSAPP_TEXT = 'Hi, I am interested in your properties in Gurugram.';
const initialPopupForm = { name: '', phone: '', selection: '', captchaAnswer: '' };
const POPUP_CAPTCHA = { label: '1 + 7', result: 8 };

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showLeadPopup, setShowLeadPopup] = useState(true);
  const [popupForm, setPopupForm] = useState(initialPopupForm);
  const [popupSending, setPopupSending] = useState(false);
  const [popupStatus, setPopupStatus] = useState('');
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

  const handlePopupSubmit = async (event) => {
    event.preventDefault();
    if (Number(popupForm.captchaAnswer) !== POPUP_CAPTCHA.result) {
      setPopupStatus('Captcha answer is incorrect.');
      return;
    }

    setPopupSending(true);
    setPopupStatus('');
    try {
      await sendLeadEmail({
        source: 'Landing Quick Connect Popup',
        name: popupForm.name,
        phone: popupForm.phone,
        property: popupForm.selection
      });
      setPopupForm(initialPopupForm);
      setPopupStatus('Thanks! Our team will contact you shortly.');
    } catch {
      setPopupStatus('Could not send right now. Please call or WhatsApp us.');
    } finally {
      setPopupSending(false);
    }
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
        <div className="quick-popup-overlay fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="quick-popup-card relative max-w-md w-full p-6 overflow-hidden">
            <div className="quick-popup-orb quick-popup-orb-one" />
            <div className="quick-popup-orb quick-popup-orb-two" />
            <button className="absolute right-4 top-4 z-10 text-white/80 hover:text-white tap-animate" onClick={() => setShowLeadPopup(false)} aria-label="Close quick connect popup"><X size={20} /></button>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200 mb-4">
                <Sparkles size={14} /> Luxury Deals
              </div>
              <h3 className="text-3xl font-serif font-bold text-white mb-2">Quick Connect</h3>
              <p className="text-slate-100/85 mb-5">Share your details and get premium Gurugram property options instantly.</p>
              <form className="space-y-3" onSubmit={handlePopupSubmit}>
                <input required value={popupForm.name} onChange={(e) => setPopupForm({ ...popupForm, name: e.target.value })} className="quick-popup-input" placeholder="Full Name" />
                <input required value={popupForm.phone} onChange={(e) => setPopupForm({ ...popupForm, phone: e.target.value })} className="quick-popup-input" placeholder="Contact No" />
                <select value={popupForm.selection} onChange={(e) => setPopupForm({ ...popupForm, selection: e.target.value })} className="quick-popup-input">
                  <option value="">Select property + budget...</option>
                  {PROPERTIES.map((property) => BUDGET_OPTIONS.map((budget) => <option key={`${property.id}-${budget}`}>{property.title} • {budget}</option>))}
                </select>
                <input required value={popupForm.captchaAnswer} onChange={(e) => setPopupForm({ ...popupForm, captchaAnswer: e.target.value })} className="quick-popup-input" placeholder={`Captcha: ${POPUP_CAPTCHA.label} = ?`} />
                <button disabled={popupSending} type="submit" className="tap-animate w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
                  {popupSending ? 'Sending...' : 'Send Quick Inquiry'} <Send size={16} />
                </button>
              </form>
              {popupStatus && <p className="mt-3 text-sm text-white/85">{popupStatus}</p>}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <a href="tel:9289035225" className="tap-animate text-center bg-white/15 hover:bg-white/25 border border-white/20 text-white py-3 rounded-xl font-semibold"><Phone size={16} className="inline mr-2"/>Call</a>
                <a href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`} target="_blank" rel="noreferrer" className="tap-animate text-center bg-green-500/90 hover:bg-green-500 text-white py-3 rounded-xl font-semibold">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer setCurrentView={navigateTo} />
    </div>
  );
}
