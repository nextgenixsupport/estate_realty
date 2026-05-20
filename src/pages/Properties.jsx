import React, { useState } from 'react';
import { MapPin, IndianRupee, X, Phone, Mail } from 'lucide-react';
import { PROPERTIES } from '../data/constants';

export default function Properties() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen animate-fade-in">
      <div className="bg-slate-900 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Exclusive Properties</h1>
          <p className="text-yellow-500 font-medium tracking-widest uppercase text-sm">Discover Your Next Canvas</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">
          {PROPERTIES.map((prop, idx) => (
            <button key={prop.id} type="button" onClick={() => setSelectedProperty(prop)} className="text-left bg-white rounded-xl shadow-lg overflow-hidden flex flex-col slide-up hover:shadow-2xl hover:-translate-y-1 transition-all" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="h-72 overflow-hidden relative">
                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-1 uppercase tracking-wide mb-2 inline-block rounded-sm">{prop.developer}</span>
                  <h3 className="text-2xl font-serif font-bold text-white">{prop.title}</h3>
                  <p className="text-slate-300 text-sm flex items-center gap-1 mt-1">
                    <MapPin size={14} className="text-yellow-500" /> {prop.location}
                  </p>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-yellow-700 font-semibold mb-2 flex items-center gap-1"><IndianRupee size={16} /> {prop.price}</p>
                <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">{prop.desc}</p>
                <div className="flex gap-2 flex-wrap pt-4 border-t border-slate-100">
                  {prop.tags.map(tag => <span key={tag} className="bg-slate-50 border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">{tag}</span>)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProperty && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4" onClick={() => setSelectedProperty(null)}>
          <div className="bg-white w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-2xl font-serif font-bold">{selectedProperty.title}</h3>
              <button onClick={() => setSelectedProperty(null)}><X /></button>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-4">
              {selectedProperty.gallery.map((img) => <img key={img} src={img} alt={selectedProperty.title} className="w-full h-48 object-cover rounded-lg" />)}
            </div>
            <div className="px-6 pb-6 grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="flex items-center gap-2"><MapPin size={16} /> {selectedProperty.location}</p>
                <p className="font-semibold text-yellow-700">{selectedProperty.price}</p>
                <p className="text-slate-600">{selectedProperty.desc}</p>
              </div>
              <form className="space-y-3 bg-slate-50 p-4 rounded-lg border">
                <h4 className="font-semibold">Request Callback</h4>
                <input className="w-full border rounded px-3 py-2" placeholder="Name" />
                <input className="w-full border rounded px-3 py-2" placeholder="Email ID" />
                <input className="w-full border rounded px-3 py-2" placeholder="Contact No" />
                <button type="button" className="w-full bg-slate-900 text-white py-2 rounded">Submit</button>
                <p className="text-xs text-slate-500 flex items-center gap-2"><Mail size={14} /> royalinvestorealty@gmail.com</p>
                <p className="text-xs text-slate-500 flex items-center gap-2"><Phone size={14} /> +91 92890 35225</p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
