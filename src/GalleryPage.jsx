import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, X, ZoomIn, ChevronLeft, ChevronRight, 
  Image as ImageIcon, MapPin, Calendar, Play, Loader2 
} from 'lucide-react';
import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

// --- SANITY CONFIGURATION ---
const client = createClient({
  projectId: "lxhvxr5b",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return source ? builder.image(source) : null;
}

const GalleryPage = () => {
  const [filter, setFilter] = useState("All");
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const categories = ["All", "Summits", "Workshops", "Community", "Dinners"];

  // --- FETCH DATA FROM SANITY ---
  useEffect(() => {
    window.scrollTo(0, 0); 
    
    const fetchGallery = async () => {
      try {
        
        const query = `*[_type == "gallery"] | order(date desc) {
          _id,
          title,
          category,
          image,
          "videoUrl": videoUpload.asset->url, 
          location,
          date
        }`;
        const data = await client.fetch(query);
        setAllImages(data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Logic
  const filteredImages = filter === "All" 
    ? allImages 
    : allImages.filter(img => img.category === filter);

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

  // Handle clicking a media item
  const handleMediaClick = (index) => {
    
    setSelectedImageIndex(index); 
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#E62C79] selection:text-white">
      
      <div className="bg-noise"></div>

      {/* --- STICKY NAV --- */}
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

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
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

           {/* FLOATING FILTER TABS */}
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

      {/* --- MASONRY GRID --- */}
      <section className="pb-24 px-4 max-w-7xl mx-auto">
        
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-[#E62C79] animate-spin" />
          </div>
        )}

        {!isLoading && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img, index) => (
              <div 
                key={img._id}
                onClick={() => handleMediaClick(index)}
                className="break-inside-avoid group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
              >
                {/* Image / Thumbnail */}
                {img.image && (
                  <img 
                    src={urlFor(img.image).width(800).url()} 
                    alt={img.title} 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
                
                {/* Video Play Icon Overlay */}
                {img.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E62C79] group-hover:text-white transition-all duration-300">
                      <Play className="w-6 h-6 ml-1 text-white shadow-sm" />
                    </div>
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Floating Metadata (Glass Card) */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#009EE3] mb-1 block">
                          {img.category}
                        </span>
                        <h3 className="font-bold text-lg leading-tight">{img.title}</h3>
                      </div>
                      {!img.videoUrl && (
                        <div className="bg-white/20 p-2 rounded-full">
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/70 font-medium">
                      {img.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {img.location}</span>}
                      {img.date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {new Date(img.date).toLocaleDateString()}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No media found in this category.</p>
          </div>
        )}
      </section>

      {/* --- LIGHTBOX MODAL (Handles both Images AND Videos) --- */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-in fade-in duration-300">
          
          <button 
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-20 hidden md:block"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh] px-4 flex flex-col items-center justify-center">
            
            {/* CONDITIONAL RENDER: Show Video OR Image */}
            {filteredImages[selectedImageIndex].videoUrl ? (
              <video 
                src={filteredImages[selectedImageIndex].videoUrl} 
                controls 
                autoPlay 
                playsInline
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 bg-black"
              />
            ) : (
              <img 
                src={urlFor(filteredImages[selectedImageIndex].image).url()} 
                alt="Full View" 
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              />
            )}
            
            <div className="mt-6 text-center text-white">
              <h3 className="text-2xl font-bold mb-1">{filteredImages[selectedImageIndex].title}</h3>
              <p className="text-white/60 flex items-center justify-center gap-2 text-sm">
                {filteredImages[selectedImageIndex].location && <><MapPin className="w-4 h-4" /> {filteredImages[selectedImageIndex].location}</>} 
                {filteredImages[selectedImageIndex].location && filteredImages[selectedImageIndex].date && " • "}
                {filteredImages[selectedImageIndex].date && new Date(filteredImages[selectedImageIndex].date).toLocaleDateString()}
              </p>
            </div>
          </div>

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