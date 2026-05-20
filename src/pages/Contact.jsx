import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { PROPERTIES } from '../data/constants';

export default function Contact() {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Ready to find your dream property? Connect with our luxury real estate experts today.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 slide-up">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-6">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-500 mb-4 text-sm">Our experts are available 24/7</p>
              <a href="tel:9289035225" className="text-xl font-serif font-bold text-yellow-600 hover:text-yellow-700">+91 92890 35225</a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-500 mb-4 text-sm">Drop us a line anytime</p>
              <a href="mailto:info@royalinvestorrealty.com" className="font-medium text-slate-900 hover:text-yellow-600">info@royalinvestorrealty.com</a>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-8 md:p-12 rounded-xl shadow-lg border border-slate-100 slide-up" style={{animationDelay: '0.2s'}}>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow" placeholder="user_name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow" placeholder="user_surname" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Interested In</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow">
                  <option>Select a property...</option>
                  {PROPERTIES.map(p => <option key={p.id}>{p.title}</option>)}
                  <option>Other / General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-slate-900 text-white font-bold py-4 rounded hover:bg-slate-800 transition-colors">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
