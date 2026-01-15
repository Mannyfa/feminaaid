import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, User, Loader2, Clock } from 'lucide-react';

// --- SANITY CONFIGURATION ---
const client = createClient({
  projectId: "lxhvxr5b", // Replace with your actual Project ID
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  
  // --- 1. NEW SCROLL STATE (Must be at the top) ---
  const [scrollProgress, setScrollProgress] = useState(0);

  // --- 2. NEW SCROLL EFFECT (Must be at the top) ---
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (windowHeight === 0) return setScrollProgress(0);
      
      const scroll = totalScroll / windowHeight;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 3. DATA FETCHING EFFECT ---
  useEffect(() => {
    const query = `*[slug.current == $slug][0]{
      title,
      mainImage,
      publishedAt,
      name,
      body,
      "name": author->name,
      "authorImage": author->image
    }`;

    client.fetch(query, { slug })
      .then((data) => setPost(data))
      .catch(console.error);
  }, [slug]);

  // --- 4. CONDITIONAL RETURN (Must be AFTER all hooks) ---
  if (!post) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-[#E62C79] animate-spin" />
        <p className="text-slate-500 animate-pulse">Loading story...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      
      {/* --- READING PROGRESS BAR --- */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-[#E62C79] to-[#009EE3] z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-slate-100 h-16 flex items-center">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <Link to="/" className="inline-flex items-center text-slate-600 hover:text-[#E62C79] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Image */}
      {post.mainImage && (
        <div className="w-full h-[400px] md:h-[500px] relative mt-16">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img 
            src={urlFor(post.mainImage).width(1200).url()} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full z-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 text-white">
               <div className="inline-flex items-center gap-4 mb-4 text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-2"/> {new Date(post.publishedAt).toLocaleDateString()}</span>
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-2"/> 5 min read</span>
               </div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">{post.title}</h1>
              
              <div className="flex items-center gap-3">
                 {post.authorImage && (
                   <img 
                    src={urlFor(post.authorImage).width(50).url()} 
                    alt={post.name} 
                    className="w-10 h-10 rounded-full border-2 border-[#E62C79]"
                   />
                 )}
                 <div>
                   <p className="font-bold text-white">{post.name || "Femina Team"}</p>
                   <p className="text-white/70 text-xs">Author</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Body */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg md:prose-xl prose-slate hover:prose-a:text-[#E62C79] prose-img:rounded-2xl prose-headings:font-bold prose-headings:text-slate-900 leading-loose">
          <PortableText 
            value={post.body} 
            components={{
              types: {
                image: ({ value }) => (
                   <img 
                     src={urlFor(value).width(800).url()} 
                     alt="Blog Illustration" 
                     className="w-full rounded-2xl shadow-lg my-8"
                   />
                ),
              }
            }}
          />
        </div>

        {/* Share / Footer of Article */}
        <div className="mt-16 pt-8 border-t border-slate-100">
           <p className="text-slate-500 italic text-center">
             Enjoyed this article? Share it with your network to inspire others.
           </p>
           <div className="flex justify-center gap-4 mt-6">
              <button className="px-6 py-2 rounded-full bg-[#E62C79]/10 text-[#E62C79] font-bold hover:bg-[#E62C79] hover:text-white transition-all">
                Share on X
              </button>
              <button className="px-6 py-2 rounded-full bg-[#009EE3]/10 text-[#009EE3] font-bold hover:bg-[#009EE3] hover:text-white transition-all">
                Share on LinkedIn
              </button>
           </div>
        </div>
      </article>

    </div>
  );
};

export default BlogPost;