import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { createClient } from "@sanity/client";

// --- CONFIGURATION ---
const client = createClient({
  projectId: "lxhvxr5b", // <--- PASTE YOUR SANITY PROJECT ID HERE
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});

const AnnouncementBanner = () => {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Check if user already closed it this session
    const isClosed = sessionStorage.getItem("announcement_closed");
    if (isClosed) return;

    // 2. Fetch from Sanity
    const query = `*[_type == "announcement" && isActive == true][0]`;
    
    client.fetch(query)
      .then((result) => {
        if (result) {
          setData(result);
          // Small delay for smooth entrance animation
          setTimeout(() => setIsVisible(true), 1500); 
        }
      })
      .catch(console.error);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcement_closed", "true");
  };

  if (!data) return null;

  return (
    <>
      {/* --- BACKDROP --- */}
      <div 
        className={`fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${
          isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      ></div>

      {/* --- POPUP CARD --- */}
      <div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          
          {/* Header Gradient */}
          <div className="bg-gradient-to-r from-[#E62C79] to-[#009EE3] p-6 text-white text-center">
            <h3 className="text-xl font-bold tracking-tight">Special Announcement</h3>
          </div>

          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-8 text-center">
            {/* Title (Optional: You can add a 'title' field to Sanity later if you want) */}
            <h4 className="text-2xl font-bold text-slate-900 mb-4">Don't Miss Out!</h4>
            
            {/* The Main Text from Sanity */}
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {data.text}
            </p>

            {/* Action Button */}
            {data.link && (
              <a 
                href={data.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-[#E62C79] transition-all transform hover:-translate-y-1 shadow-lg"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            )}
            
            {!data.link && (
              <button 
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 text-sm font-medium mt-4"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementBanner;