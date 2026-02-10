import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, User, Tag, Loader2 } from 'lucide-react';
import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { Link } from 'react-router-dom'; // <--- Added this

// --- CONFIGURATION ---
const client = createClient({
  projectId: "lxhvxr5b", // <--- REPLACE THIS
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return source ? builder.image(source) : null;
}

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // UPDATED QUERY: Now fetching 'slug'
        const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
          _id,
          title,
          slug, 
          "excerpt": body[0].children[0].text, 
          mainImage,
          publishedAt,
          "authorName": author->name,
          "categories": categories[]->title
        }`;
        
        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[20%] left-[-5%] w-[600px] h-[600px] bg-[#ED70A4]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
         <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-[#009EE3]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#009EE3]/10 border border-[#009EE3]/20 text-[#009EE3] text-sm font-bold mb-4">
            <Tag className="w-4 h-4 mr-2" />
            Latest Insights
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">News & Stories</h2>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-[#E62C79] animate-spin" />
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post._id} className="group relative flex flex-col h-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="relative h-60 overflow-hidden bg-slate-200">
                {post.categories && post.categories.length > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#E62C79] shadow-sm">
                    {post.categories[0]}
                  </div>
                )}
                {post.mainImage ? (
                  <img src={urlFor(post.mainImage).width(800).url()} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-4 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#E62C79] transition-colors leading-tight line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="pt-6 border-t border-slate-200/60 flex items-center justify-between mt-auto">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500"><User className="w-4 h-4" /></div>
                      <span className="text-xs font-bold text-slate-700">{post.authorName || "Femina Team"}</span>
                   </div>

                   {/* --- FIXED BUTTON: Uses Link and post.slug --- */}
                   <Link 
                     to={post.slug ? `/post/${post.slug.current}` : '#'} 
                     className="inline-flex items-center text-sm font-bold text-[#009EE3] hover:text-[#E62C79] transition-colors group/link"
                   >
                     Read Article
                     <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                   </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;