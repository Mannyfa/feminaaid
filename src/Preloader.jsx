import React, { useEffect, useState } from 'react';
import logo from './images/logoimage.jpg'; // Ensure this path matches your folder structure

const Preloader = () => {
  const [show, setShow] = useState(true);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Phase 1: Wait for 2.5 seconds (Let the user see the logo)
    const timer1 = setTimeout(() => {
      setSlideUp(true);
    }, 2500);

    // Phase 2: Remove component from DOM after animation completes (0.8s later)
    const timer2 = setTimeout(() => {
      setShow(false);
    }, 3300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${
        slideUp ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className={`text-center transition-opacity duration-500 ${slideUp ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Logo Container with Pulse */}
        <div className="relative w-24 h-24 mx-auto mb-6">
           {/* Ping Effect (Ring behind logo) */}
           <div className="absolute inset-0 bg-[#E62C79]/20 rounded-full animate-ping"></div>
           
           {/* The Logo */}
           <img 
             src={logo} 
             alt="Loading..." 
             className="relative z-10 w-full h-full object-contain drop-shadow-lg"
           />
        </div>

        {/* Brand Text */}
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-serif">
          Femina Aid Network
        </h2>
        
        {/* Tagline */}
        <p className="text-slate-500 text-sm mt-2 tracking-widest uppercase font-medium">
          Love. Liberty. Light.
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-slate-100 rounded-full mt-8 overflow-hidden mx-auto relative">
           <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#E62C79] to-[#009EE3] animate-[loading_2s_ease-in-out_forwards] w-0"></div>
        </div>
      </div>

      {/* Custom Keyframe for the progress bar */}
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 60%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;