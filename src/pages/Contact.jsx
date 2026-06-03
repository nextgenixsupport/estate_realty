import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { PROPERTIES, BUDGET_OPTIONS } from '../data/constants';
import { sendLeadEmail } from '../utils/email';
import { trackContactConversion } from '../utils/conversionTracking';

const initialState = { fullName: '', phone: '', selection: '', message: '', captchaAnswer: '' };
const CONTACT_CAPTCHA = { label: '1 + 7', result: 8 };

export default function Contact() {
  const [formData, setFormData] = useState(initialState);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(formData.captchaAnswer) !== CONTACT_CAPTCHA.result) {
      setStatus('Captcha answer is incorrect.');
      return;
    }
    setSending(true);
    setStatus('');
    try {
      await sendLeadEmail({
        source: 'Contact Page',
        name: formData.fullName,
        phone: formData.phone,
        property: formData.selection,
        message: formData.message
      });
      trackContactConversion();
      setFormData(initialState);
      setStatus('Message sent successfully.');
    } catch {
      setStatus('Could not send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return <div className="pt-24 pb-20 bg-slate-50 min-h-screen animate-fade-in"><div className="max-w-7xl mx-auto px-4 pt-12"><div className="text-center mb-16"><h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Get in Touch</h1><p className="text-slate-600 max-w-2xl mx-auto">Ready to find your dream property? Connect with our luxury real estate experts today.</p></div><div className="grid md:grid-cols-3 gap-8"><div className="md:col-span-1 space-y-6"><div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 slide-up"><div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-6"><Phone size={24} /></div><h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3><p className="text-slate-500 mb-4 text-sm">Our experts are available 24/7</p><a href="tel:9289035225" className="text-xl font-serif font-bold text-yellow-600 hover:text-yellow-700">+91 92890 35225</a></div><div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 slide-up" style={{ animationDelay: '0.1s' }}><div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-6"><Mail size={24} /></div><h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3><p className="text-slate-500 mb-4 text-sm">Drop us a line anytime</p><a href="mailto:royalinvestorealty@gmail.com" className="font-medium text-slate-900 hover:text-yellow-600">royalinvestorealty@gmail.com</a></div></div><div className="md:col-span-2 bg-white p-8 md:p-12 rounded-xl shadow-lg border border-slate-100 slide-up" style={{ animationDelay: '0.2s' }}><h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Send a Message</h3><form className="space-y-6" onSubmit={handleSubmit}><div><label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label><input required type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Your Full Name" /></div><div><label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label><input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="+91 XXXXX XXXXX" /></div><div><label className="block text-sm font-medium text-slate-700 mb-2">Select Property + Budget</label><select value={formData.selection} onChange={(e) => setFormData({ ...formData, selection: e.target.value })} className="w-full px-4 py-3 bg-gradient-to-b from-white to-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"><option value="">Select option...</option>{PROPERTIES.map(p => BUDGET_OPTIONS.map(b => <option key={`${p.id}-${b}`}>{p.title} • {b}</option>))}<option>Other / General Inquiry</option></select></div><div><label className="block text-sm font-medium text-slate-700 mb-2">Captcha: {CONTACT_CAPTCHA.label} = ?</label><input required value={formData.captchaAnswer} onChange={(e) => setFormData({ ...formData, captchaAnswer: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter answer" /></div><div><label className="block text-sm font-medium text-slate-700 mb-2">Message</label><textarea rows="4" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="How can we help you?" /></div><button disabled={sending} type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition-colors">{sending ? 'Sending...' : 'Submit Inquiry'}</button>{status && <p className="text-sm text-slate-600">{status}</p>}</form></div></div></div></div>;
}
