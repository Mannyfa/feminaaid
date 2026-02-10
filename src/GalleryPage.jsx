import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, X, ZoomIn, ChevronLeft, ChevronRight, 
  Image as ImageIcon, MapPin, Calendar 
} from 'lucide-react';

// --- YOUR IMAGE IMPORTS ---
import event1 from './images/event1.jpg';
import event5 from './images/event5.jpg';
import event11 from './images/event11.jpg';
import event15 from './images/event15.jpg';
import event7 from './images/event7.jpg';
import event8 from './images/event8.jpg';

const GalleryPage = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- 1. DATA CONFIGURATION ---
  // I have mapped your imported images to categories. 
  // You can change the titles/dates here to match the real events.
  const allImages = [
    { id: 1, src: event1, category: "Summits", title: "Annual Summit 2024", location: "Lagos", date: "Oct 12" },
    { id: 2, src: event5, category: "Summits", title: "Leadership Panel", location: "Abuja", date: "Sep 28" },
    { id: 3, src: event15, category: "Community", title: "Networking Mixer", location: "Virtual", date: "Aug 15" },
    { id: 4, src: event7, category: "Workshops", title: "Tech Bootcamp", location: "Lagos", date: "Jul 22" },
    { id: 5, src: event8, category: "Dinners", title: "Founders Dinner", location: "VI, Lagos", date: "Jun 10" },
    { id: 6, src: event11, category: "Workshops", title: "Skill Acquisition", location: "Ibadan", date: "May 05" },
    // Reusing images to fill the grid for demonstration
    { id: 7, src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", category: "Community", title: "Team Bonding", location: "Lekki", date: "Dec 14" },
    { id: 8, src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80", category: "Summits", title: "Keynote Speech", location: "London", date: "Nov 20" },
    { id: 9, src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", category: "Dinners", title: "Gala Night", location: "Accra", date: "Jan 15" },
  ];

  const categories = ["All", "Summits", "Workshops", "Community", "Dinners"];

  const filteredImages = filter === "All" 
    ? allImages 
    : allImages.filter(img => img.category === filter);

  // Handle Scroll for Navbar styling
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on load
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lightbox Navigation Logic
  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  // Keyboard Support for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowRight") setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
      if (e.key === "ArrowLeft") setSelectedImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, filteredImages]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#E62C79] selection:text-white">
      
      {/* Noise Texture */}
      <div className="bg-noise"></div>

      {/* --- 2. STICKY NAV --- */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
             <div className={`p-2 rounded-full transition-colors ${isScrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-slate-900 backdrop-blur-md border border-white/20'}`}>
               <ArrowLeft className="w-5 h-5" />
             </div>
             <span className="font-bold text-slate-900 group-hover:text-[#E62C79] transition-colors">Back Home</span>
          </Link>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest hidden md:block">
            Femina Aid Network Gallery
          </div>
        </div>
      </nav>

      {/* --- 3. HERO SECTION --- */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
         {/* Background Blobs */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E62C79]/10 rounded-full blur-3xl -z-10 animate-blob"></div>
         <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-[#009EE3]/10 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>

         <div className="max-w-7xl mx-auto text-center">
           <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#E62C79]/20 bg-[#E62C79]/5 text-[#E62C79] text-sm font-bold mb-6">
             <ImageIcon className="w-4 h-4 mr-2" />
             Our Visual Journey
           </div>
           <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
             Moments that <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E62C79] to-[#009EE3]">
               Matter.
             </span>
           </h1>
           <p className="max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
             From grassroots outreach to high-level summits, explore the memories that define our impact.
           </p>

           {/* --- 4. FLOATING FILTER TABS --- */}
           <div className="mt-12 inline-flex flex-wrap justify-center gap-2 bg-white/60 backdrop-blur-xl p-2 rounded-full border border-white/40 shadow-xl shadow-slate-200/50">
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setFilter(cat)}
                 className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                   filter === cat 
                     ? 'bg-[#E62C79] text-white shadow-lg transform scale-105' 
                     : 'text-slate-500 hover:bg-white hover:text-[#E62C79]'
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>
         </div>
      </section>

      {/* --- 5. MASONRY GRID --- */}
      <section className="pb-24 px-4 max-w-7xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img, index) => (
            <div 
              key={img.id}
              onClick={() => setSelectedImageIndex(index)}
              className="break-inside-avoid group relative rounded-3xl overflow-hidden cursor-zoom-in bg-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
            >
              {/* Image */}
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay Gradient (Hidden until hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Floating Metadata (Glass Card) */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#009EE3] mb-1 block">
                        {img.category}
                      </span>
                      <h3 className="font-bold text-lg leading-tight">{img.title}</h3>
                    </div>
                    <div className="bg-white/20 p-2 rounded-full">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-white/70 font-medium">
                     <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {img.location}</span>
                     <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {img.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No images found in this category.</p>
          </div>
        )}
      </section>

      {/* --- 6. LIGHTBOX MODAL --- */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-in fade-in duration-300">
          
          {/* Close Button */}
          <button 
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-20 hidden md:block"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Main Image Container */}
          <div className="relative w-full max-w-5xl h-[80vh] px-4 flex flex-col items-center justify-center">
            <img 
              src={filteredImages[selectedImageIndex].src} 
              alt="Full View" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />
            
            {/* Caption */}
            <div className="mt-6 text-center text-white">
              <h3 className="text-2xl font-bold mb-1">{filteredImages[selectedImageIndex].title}</h3>
              <p className="text-white/60 flex items-center justify-center gap-2 text-sm">
                <MapPin className="w-4 h-4" /> {filteredImages[selectedImageIndex].location} • {filteredImages[selectedImageIndex].date}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-20 hidden md:block"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

        </div>
      )}

    </div>
  );
};

export default GalleryPage;