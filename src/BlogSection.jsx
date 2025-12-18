import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { client, urlFor } from './sanityClient';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  // These are the definitions that were missing!
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GROQ Query to fetch posts
    const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
      title,
      slug,
      publishedAt,
      mainImage,
      "excerpt": body[0].children[0].text
    }`;

    client.fetch(query)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return null;

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest Updates</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Insights, news, and stories from the Femina A community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link 
              to={`/blog/${post.slug.current}`} 
              key={index} 
              className="group cursor-pointer flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden rounded-2xl mb-6">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                {post.mainImage && (
                  <img 
                    src={urlFor(post.mainImage).width(800).url()} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <div className="flex items-center text-sm text-fuchsia-600 font-medium mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-fuchsia-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-slate-900 font-semibold group-hover:text-fuchsia-600 transition-colors">
                  Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;