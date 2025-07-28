'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Eye, Star, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  tags?: string;
  published: boolean;
  featured: boolean;
  readTime?: number;
  views: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog?published=true');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.slice(0, 6)); // Show only 6 latest posts
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const parseTags = (tagsString?: string): string[] => {
    if (!tagsString) return [];
    try {
      return JSON.parse(tagsString);
    } catch {
      return tagsString.split(',').map(tag => tag.trim());
    }
  };

  if (loading) {
    return (
      <section id="blog" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Latest Blog Posts
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              Insights, tutorials, and thoughts on technology
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl overflow-hidden animate-pulse">
                <div className="h-40 sm:h-48 bg-gray-300 dark:bg-gray-600"></div>
                <div className="p-4 sm:p-6">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                  <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section id="blog" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Latest Blog Posts
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              Blog posts coming soon...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Insights, tutorials, and thoughts on technology
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
            >
              {post.image && (
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {post.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-4 sm:p-6">
                <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{formatDate(post.createdAt)}</span>
                    <span className="sm:hidden">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      {post.readTime} min
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    {post.views}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                {post.tags && (
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                    {parseTags(post.tags).slice(0, 3).map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length >= 6 && (
          <div className="text-center mt-8 sm:mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-sm sm:text-base">
              View All Posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
