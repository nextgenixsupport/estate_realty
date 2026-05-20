import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-yellow-500/30">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-grow">
        {currentView === 'home' && <Home setCurrentView={setCurrentView} />}
        {currentView === 'properties' && <Properties />}
        {currentView === 'about' && <About />}
        {currentView === 'contact' && <Contact />}
      </main>

      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}