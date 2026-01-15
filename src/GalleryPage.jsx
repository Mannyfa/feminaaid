import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import event1 from './images/event1.jpg';
import event5 from './images/event5.jpg';
import event11 from './images/event11.jpg';
import event15 from './images/event15.jpg';
import event7 from './images/event7.jpg';
import event8 from './images/event8.jpg';


const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", "Summits", "Workshops", "Community", "Dinners"];

  // Placeholder data - replace with your Sanity data later if you want dynamic images
  const allPhotos = [
    { src: event1, category: "Summits", size: "large" },
    { src: event11, category: "Workshops", size: "small" },
    { src: event15, category: "Community", size: "medium" },
    { src: event5, category: "Summits", size: "medium" },
    { src: event7, category: "Workshops", size: "large" },
    { src: event8, category: "Dinners", size: "small" },
    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", category: "Community", size: "medium" },
    { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80", category: "Summits", size: "medium" },
    { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80", category: "Workshops", size: "large" },
    { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", category: "Dinners", size: "medium" },
  ];

  const filteredPhotos = selectedCategory === 'All' 
    ? allPhotos 
    : allPhotos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Our Gallery</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Visual stories of women breaking barriers, building bridges, and leading the way.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 mb-12">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex space-x-2 md:space-x-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat 
                    ? "bg-[#E62C79] text-white shadow-lg shadow-pink-500/30" 
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo, index) => (
            <div key={index} className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-slate-100">
              <img 
                src={photo.src} 
                alt={photo.category} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-[#E62C79] text-white text-xs font-bold rounded-full mb-2">
                    {photo.category}
                  </span>
                  <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full mx-auto text-slate-900 hover:scale-110 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No photos found in this category.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default GalleryPage;