import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Loader2, Calendar, User } from "lucide-react";

// --- SANITY CONFIGURATION ---
const client = createClient({
  projectId: "lxhvxr5b", // <--- REPLACE WITH YOUR ID
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return source ? builder.image(source) : null;
}

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams(); // Grabs the slug from the URL

  useEffect(() => {
    // Scroll to top when page opens
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0]{
          title,
          mainImage,
          publishedAt,
          "authorName": author->name,
          body
        }`;
        const data = await client.fetch(query, { slug });
        setPost(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-[#E62C79] animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-slate-800">Article not found</h2>
      <Link to="/" className="text-[#E62C79] mt-4 hover:underline">Go Back Home</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      
      {/* Navigation */}
      <nav className="p-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-[#E62C79] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 mt-12 mb-8">
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 font-medium uppercase tracking-wider">
           <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {new Date(post.publishedAt).toLocaleDateString()}</span>
           <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
           <span className="flex items-center gap-2"><User className="w-4 h-4"/> {post.authorName || "Femina Team"}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-8">
          {post.title}
        </h1>
        {post.mainImage && (
          <img 
            src={urlFor(post.mainImage).width(1200).url()} 
            alt={post.title} 
            className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-xl"
          />
        )}
      </header>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 prose prose-lg prose-slate prose-headings:font-bold prose-a:text-[#E62C79] hover:prose-a:text-[#b01e58]">
        <PortableText value={post.body} />
      </article>

    </div>
  );
};

export default BlogPost;