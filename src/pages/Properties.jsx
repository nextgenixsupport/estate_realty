import React from 'react';
import { MapPin } from 'lucide-react';
import { PROPERTIES } from '../data/constants';

export default function Properties() {
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
            <div key={prop.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
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
                <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {prop.desc}
                </p>
                <div className="flex gap-2 flex-wrap pt-4 border-t border-slate-100">
                  {prop.tags.map(tag => (
                    <span key={tag} className="bg-slate-50 border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}