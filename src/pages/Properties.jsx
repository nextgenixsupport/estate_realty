import React, { useMemo, useState } from 'react';
import { MapPin, IndianRupee, X, Phone, Mail, Send } from 'lucide-react';
import { PROPERTIES, BUDGET_OPTIONS } from '../data/constants';
import { sendLeadEmail } from '../utils/email';

const initialForm = { name: '', email: '', phone: '', selection: '', captchaAnswer: '' };

export default function Properties() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  const captcha = useMemo(() => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const op = Math.random() > 0.5 ? '+' : '-';
    return { label: `${a} ${op} ${b}`, result: op === '+' ? a + b : a - b };
  }, [status, selectedProperty]);

  const openModal = (prop) => {
    setSelectedProperty(prop);
    setFormData({ ...initialForm, selection: `${prop.title} • ${BUDGET_OPTIONS[0]}` });
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProperty) return;
    if (Number(formData.captchaAnswer) !== captcha.result) {
      setStatus('Captcha answer is incorrect.');
      return;
    }
    setSending(true);
    setStatus('');
    try {
      await sendLeadEmail({ source: 'Property Popup', name: formData.name, email: formData.email, phone: formData.phone, property: formData.selection, location: selectedProperty.location, price: selectedProperty.price });
      setStatus('Inquiry sent successfully.');
      setFormData(initialForm);
    } catch {
      setStatus('Failed to send inquiry. Please try again.');
    } finally { setSending(false); }
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen animate-fade-in">
      <div className="bg-slate-900 py-16 mb-12"><div className="max-w-7xl mx-auto px-4 text-center"><h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Exclusive Properties</h1><p className="text-yellow-500 font-medium tracking-widest uppercase text-sm">Discover Your Next Canvas</p></div></div>
      <div className="max-w-7xl mx-auto px-4"><div className="grid md:grid-cols-2 gap-10">{PROPERTIES.map((prop, idx) => (<button key={prop.id} type="button" onClick={() => openModal(prop)} className="text-left bg-white rounded-xl shadow-lg overflow-hidden flex flex-col slide-up hover:shadow-2xl hover:-translate-y-1 transition-all" style={{ animationDelay: `${idx * 0.1}s` }}><div className="h-72 overflow-hidden relative"><img src={prop.image} alt={prop.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div><div className="absolute bottom-4 left-4 right-4"><span className="bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-1 uppercase tracking-wide mb-2 inline-block rounded-sm">{prop.developer}</span><h3 className="text-2xl font-serif font-bold text-white">{prop.title}</h3><p className="text-slate-300 text-sm flex items-center gap-1 mt-1"><MapPin size={14} className="text-yellow-500" /> {prop.location}</p></div></div><div className="p-6 flex-grow flex flex-col"><p className="text-yellow-700 font-semibold mb-2 flex items-center gap-1"><IndianRupee size={16} /> {prop.price}</p><p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">{prop.desc}</p><div className="flex gap-2 flex-wrap pt-4 border-t border-slate-100">{prop.tags.map(tag => <span key={tag} className="bg-slate-50 border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">{tag}</span>)}</div></div></button>))}</div></div>
      {selectedProperty && <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedProperty(null)}><div className="bg-white w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}><div className="flex justify-between items-center px-6 py-4 border-b bg-slate-900 text-white"><div><h3 className="text-2xl font-serif font-bold">{selectedProperty.title}</h3><p className="text-sm text-slate-300">{selectedProperty.location} • {selectedProperty.price}</p></div><button onClick={() => setSelectedProperty(null)} className="p-2 rounded-full hover:bg-white/10"><X /></button></div><div className="p-6 grid md:grid-cols-5 gap-6"><div className="md:col-span-3 grid grid-cols-2 gap-4">{selectedProperty.gallery.map((img) => <img key={img} src={img} alt={selectedProperty.title} className="w-full h-48 object-cover rounded-xl" />)}</div><form className="md:col-span-2 space-y-3 bg-slate-50 p-5 rounded-xl border" onSubmit={handleSubmit}><h4 className="font-semibold text-lg">Book Site Visit</h4><input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="Full Name" /><input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="Email ID" /><input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="Contact No" /><select value={formData.selection} onChange={(e) => setFormData({ ...formData, selection: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-gradient-to-b from-white to-slate-50">{BUDGET_OPTIONS.map((b) => <option key={b}>{selectedProperty.title} • {b}</option>)}</select><input required value={formData.captchaAnswer} onChange={(e) => setFormData({ ...formData, captchaAnswer: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder={`Captcha: ${captcha.label} = ?`} /><button disabled={sending} type="submit" className="w-full bg-slate-900 text-white py-2.5 rounded-lg flex items-center justify-center gap-2">{sending ? 'Sending...' : 'Send Inquiry'} <Send size={14} /></button>{status && <p className="text-xs text-slate-600">{status}</p>}<div className="text-xs text-slate-500 pt-2 border-t space-y-1"><p className="flex items-center gap-2"><Mail size={14} /> royalinvestorealty@gmail.com</p><p className="flex items-center gap-2"><Phone size={14} /> +91 92890 35225</p></div></form></div></div></div>}
    </div>
  );
}
