import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from './sanityClient';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the specific post based on the slug
    const query = `*[slug.current == "${slug}"][0]{
      title,
      mainImage,
      publishedAt,
      name,
      body
    }`;

    client.fetch(query)
      .then((data) => setPost(data))
      .catch(console.error);
  }, [slug]);

  if (!post) return <div className="text-center py-20">Loading...</div>;

  // Configuration for how to render the body text (images, lists, etc.)
  const ptComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) { return null; }
        return (
          <img
            alt={value.alt || ' '}
            loading="lazy"
            src={urlFor(value).width(800).url()}
            className="my-8 rounded-xl shadow-lg mx-auto"
          />
        );
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center text-slate-600 hover:text-fuchsia-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Image */}
      {post.mainImage && (
        <div className="w-full h-64 md:h-96 relative">
          <img 
            src={urlFor(post.mainImage).url()} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          
          <div className="flex items-center gap-4 text-sm text-fuchsia-600 font-medium mb-6">
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2"/> {new Date(post.publishedAt).toLocaleDateString()}</span>
            {post.name && <span className="flex items-center"><User className="w-4 h-4 mr-2"/> {post.name}</span>}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>

          {/* The Rich Text Body */}
          <div className="prose prose-lg prose-slate prose-headings:text-slate-900 prose-a:text-fuchsia-600">
            <PortableText value={post.body} components={ptComponents} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;