import React, { useState, useEffect } from 'react';
import { X, Megaphone } from 'lucide-react';
import { createClient } from "@sanity/client";

// Configure Sanity Client
const client = createClient({
  projectId: "lxhvxr5b", 
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});

const AnnouncementBanner = () => {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fetch the most recent announcement that is switched "ON"
    const query = `*[_type == "announcement" && isActive == true] | order(_createdAt desc)[0]`;

    client.fetch(query)
      .then((result) => {
        setData(result);
      })
      .catch(console.error);
  }, []);

  // If no data found, or user closed it, show nothing
  if (!data || !isVisible) return null;

  return (
    <div className="relative bg-[#E62C79] text-white text-sm font-medium z-50 animate-in slide-in-from-top duration-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between sm:justify-center gap-4">
        
        {/* Icon & Message */}
        <div className="flex items-center gap-2 text-center">
          <Megaphone className="w-4 h-4 fill-white text-white animate-bounce hidden sm:block" />
          <span>
            {data.text}
            {data.link && (
              <a 
                href={data.link} 
                className="ml-2 underline decoration-white/60 hover:decoration-white hover:text-blue-50 transition-all font-bold"
              >
                Learn More &rarr;
              </a>
            )}
          </span>
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)} 
          className="sm:absolute sm:right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;