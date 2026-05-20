import React, { useEffect, useState } from 'react';
import { MapPin, ChevronRight, ArrowRight } from 'lucide-react';
import { PROPERTIES, BRANDS } from '../data/constants';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=80',
    title: 'Find Your Dream Home',
    subtitle: 'Where Luxury Meets Serenity',
    desc: 'Experience premium luxury floors and palatial residences in the heart of Gurugram.'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=2200&q=80',
    title: 'Curated Premium Residences',
    subtitle: 'Elite Living, Elevated Lifestyle',
    desc: 'Handpicked projects with iconic architecture, modern amenities, and trusted developers.'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80',
    title: 'Invest Smarter in Gurugram',
    subtitle: 'High Growth • Prime Locations',
    desc: 'Discover investment-ready properties with strong appreciation potential and luxury appeal.'
  }
];

export default function Home({ setCurrentView }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_SLIDES[activeSlide];

  return (
    <div className="animate-fade-in">
      <div className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <div key={slide.image} className={`hero-slide ${idx === activeSlide ? 'hero-slide-active' : ''}`} style={{ backgroundImage: `url("${slide.image}")` }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/55 to-slate-950/80" />
        <div className="absolute inset-0 hero-pattern" />

        <div className="relative z-10 text-center px-4 max-w-5xl slide-up">
          <span className="inline-block text-yellow-400 tracking-[0.25em] font-semibold text-xs md:text-sm uppercase mb-4 py-2 px-4 border border-yellow-400/40 bg-slate-900/35 backdrop-blur-sm rounded-full">
            {current.subtitle}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-[1.05] drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
            {current.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">{current.title.split(' ').slice(-1)}</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            {current.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setCurrentView('properties')} className="tap-animate bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 group shadow-[0_10px_30px_rgba(202,138,4,0.35)]">
              Explore Properties <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setCurrentView('contact')} className="tap-animate border border-white/80 hover:border-yellow-500 hover:text-yellow-400 text-white px-8 py-4 rounded-full font-semibold transition-all bg-white/5 backdrop-blur-sm">
              Contact Us
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2.5 rounded-full transition-all ${idx === activeSlide ? 'w-10 bg-yellow-400' : 'w-2.5 bg-white/60 hover:bg-white'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
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
          <div className="text-center mt-12"><button onClick={() => setCurrentView('properties')} className="tap-animate px-8 py-3 bg-slate-900 text-white hover:bg-slate-800 transition-colors font-medium rounded-full">View All Properties</button></div>
        </div>
      </div>

      <div className="py-20 bg-white border-t border-slate-200"><div className="max-w-7xl mx-auto px-4 text-center"><h3 className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-8">Our Trusted Channel Partners</h3><div className="marquee"><div className="marquee-track">{[...BRANDS, ...BRANDS].map((brand, idx) => <div key={`${brand}-${idx}`} className="text-2xl md:text-3xl font-serif font-bold text-slate-400 px-8">{brand.toUpperCase()}</div>)}</div></div></div></div>
    </div>
  );
}
