import { ShieldCheck, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="slide-up">
            <h2 className="text-sm font-bold tracking-[0.2em] text-yellow-600 uppercase mb-2">About Us</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              Redefining Luxury Real Estate in Gurugram
            </h1>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              At Royal Investor Realty, we don't just sell properties; we curate lifestyles. With over <strong className="text-slate-900">11 years</strong> of excellence and <strong className="text-slate-900">15+ successful projects</strong>, we have established ourselves as the premier destination for luxury homes in South Gurugram and beyond.
            </p>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              We partner with industry titans like Eldeco, Ashiana, Trehan, Signature Global, and M3M to bring you unparalleled living experiences where nature meets serenity and a floor becomes the canvas for your dream home.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-yellow-600 w-8 h-8 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Trust & Transparency</h4>
                  <p className="text-sm text-slate-500 mt-1">Ethical practices in every deal.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="text-yellow-600 w-8 h-8 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Premium Partners</h4>
                  <p className="text-sm text-slate-500 mt-1">Working with Top Tier Builders.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative slide-up" style={{animationDelay: '0.2s'}}>
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Corporate Office" 
              className="rounded-lg shadow-2xl z-10 relative"
            />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-yellow-500 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-slate-900 rounded-lg -z-10"></div>
            
            <div className="absolute bottom-8 right-8 bg-white p-6 rounded shadow-xl flex items-center gap-4">
               <div className="bg-slate-900 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-serif font-bold">
                 11+
               </div>
               <div>
                 <p className="font-bold text-slate-900">Years of</p>
                 <p className="text-yellow-600 font-medium">Excellence</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}