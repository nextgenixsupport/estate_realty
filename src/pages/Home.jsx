import React, { useEffect, useState } from 'react';
import { MapPin, ChevronRight, ArrowRight } from 'lucide-react';
import { PROPERTIES, BRANDS } from '../data/constants';

const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80'
];

export default function Home({ setCurrentView }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <div key={slide} className={`hero-slide ${idx === activeSlide ? 'hero-slide-active' : ''}`} style={{ backgroundImage: `url("${slide}")` }} />
        ))}
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 text-center px-4 max-w-4xl slide-up wow-glow">
          <span className="text-yellow-500 tracking-[0.2em] font-semibold text-sm md:text-base uppercase mb-4 block">Where Luxury Meets Serenity</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Dream Home</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-light">Experience premium luxury floors and palatial residences in the heart of South Gurugram.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setCurrentView('properties')} className="tap-animate bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-4 rounded-none font-semibold transition-all flex items-center justify-center gap-2 group">Explore Properties <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
            <button onClick={() => setCurrentView('contact')} className="tap-animate border border-white hover:border-yellow-500 hover:text-yellow-500 text-white px-8 py-4 rounded-none font-semibold transition-all">Contact Us</button>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 py-16 border-y border-yellow-900/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
          <div className="px-4"><h3 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-2">11+</h3><p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Years Experience</p></div>
          <div className="px-4"><h3 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-2">15+</h3><p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Exclusive Projects</p></div>
          <div className="px-4"><h3 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-2">100%</h3><p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Client Satisfaction</p></div>
          <div className="px-4"><h3 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-2">24/7</h3><p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Dedicated Support</p></div>
        </div>
      </div>

      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16"><h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Featured Collections</h2><div className="w-24 h-1 bg-yellow-500 mx-auto"></div></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROPERTIES.slice(0, 3).map((prop) => (
              <div key={prop.id} className="glass-card bg-white/65 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 tap-animate">
                <div className="h-64 overflow-hidden relative">
                  <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wide">{prop.developer}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">{prop.title}</h3>
                  <p className="text-slate-500 text-sm flex items-center gap-1 mb-4"><MapPin size={14} className="text-yellow-600" /> {prop.location}</p>
                  <div className="flex gap-2 flex-wrap mb-6">{prop.tags.map(tag => <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">{tag}</span>)}</div>
                  <button onClick={() => setCurrentView('properties')} className="text-yellow-600 font-semibold flex items-center gap-1 hover:text-yellow-700 transition-colors">View Details <ChevronRight size={16} /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12"><button onClick={() => setCurrentView('properties')} className="tap-animate px-8 py-3 bg-slate-900 text-white hover:bg-slate-800 transition-colors font-medium">View All Properties</button></div>
        </div>
      </div>

      <div className="py-20 bg-white border-t border-slate-200"><div className="max-w-7xl mx-auto px-4 text-center"><h3 className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-8">Our Trusted Channel Partners</h3><div className="marquee"><div className="marquee-track">{[...BRANDS, ...BRANDS].map((brand, idx) => <div key={`${brand}-${idx}`} className="text-2xl md:text-3xl font-serif font-bold text-slate-400 px-8">{brand.toUpperCase()}</div>)}</div></div></div></div>
    </div>
  );
}
