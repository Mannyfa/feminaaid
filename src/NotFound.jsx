import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Blobs (Animated) */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#E62C79]/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#009EE3]/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="text-center relative z-10 px-4">
        {/* The Big 404 Text */}
        <h1 className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#E62C79] to-[#009EE3] opacity-20 select-none animate-pulse">
          404
        </h1>
        
        <div className="-mt-20 md:-mt-32 relative">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-xl mb-8 animate-bounce">
            <Search className="w-8 h-8 text-[#E62C79]" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Lost in the Network?
          </h2>
          
          <p className="text-slate-600 text-lg max-w-md mx-auto mb-10 leading-relaxed">
            The page you are looking for doesn't exist or has been moved. 
            Don't worry, even leaders take a wrong turn sometimes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#E62C79] text-white font-bold hover:bg-[#c01e5e] transition-all transform hover:-translate-y-1 shadow-lg shadow-pink-500/30"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-slate-700 border border-slate-200 font-bold hover:bg-slate-50 transition-all"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;