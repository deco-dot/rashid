"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileReadingMode, setMobileReadingMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        
        // Sort by createdAt descending if it exists
        blogsData.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
        
        setPosts(blogsData);
        if (blogsData.length > 0) {
          setSelectedId(blogsData[0].id);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const currentPost = posts.find((p) => p.id === selectedId) || posts[0];

  if (loading) {
    return <div className="w-full h-screen bg-[#050505] flex items-center justify-center text-white">Loading blogs...</div>;
  }

  if (posts.length === 0) {
    return <div className="w-full h-screen bg-[#050505] flex items-center justify-center text-white">No blog posts found.</div>;
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-[#050505] text-gray-300 font-sans antialiased selection:bg-[#9ffb2b] selection:text-black relative">
      
      {/* Visual Scrollbar Styling Injector */}
      <style jsx global>{`
        .blog-scroll-area::-webkit-scrollbar {
          width: 6px;
        }
        .blog-scroll-area::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 10px;
        }
        .blog-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(159, 251, 43, 0.25);
          border-radius: 10px;
        }
        .blog-scroll-area::-webkit-scrollbar-thumb:hover {
          background: rgba(159, 251, 43, 0.6);
        }
        .blog-scroll-area {
          scrollbar-width: thin;
          scrollbar-color: rgba(159, 251, 43, 0.25) rgba(255, 255, 255, 0.01);
        }
      `}</style>
      
      {/* Ambient background blur circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9ffb2b]/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-[128px] pointer-events-none" />

      {/* Main viewport-constrained layout window */}
      <div className="max-w-6xl w-full h-full mx-auto px-4 sm:px-6 pt-24 pb-8 relative z-10 box-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-full items-start overflow-hidden">
          
          {/* ── LEFT PANEL: FORCED LAYOUT SCROLL SELECTION ── */}
          <div className={`lg:col-span-5 flex flex-col max-h-full ${mobileReadingMode ? "hidden lg:flex" : "flex"}`}>
            <header className="space-y-2 pb-5 border-b border-white/10 shrink-0">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#9ffb2b] uppercase">
                Insights & Strategy
              </p>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Selected Articles
              </h1>
            </header>

            {/* Crucial fix: explicitly sets a responsive height boundary and forces vertical overflow scroll */}
            <div className="h-[calc(100vh-220px)] lg:h-[calc(100vh-240px)] overflow-y-auto pr-2 py-4 space-y-3 blog-scroll-area shrink-0 pb-16">
              {posts.map((post) => {
                const isSelected = post.id === selectedId;
                return (
                  <button
                    key={post.id}
                    onClick={() => {
                      setSelectedId(post.id);
                      setMobileReadingMode(true);
                    }}
                    className={`w-full text-left p-5 block transition-all duration-300 rounded-2xl backdrop-blur-md border border-white/[0.05] ${
                      isSelected 
                        ? "bg-white/[0.06] border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]" 
                        : "bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span className={isSelected ? "text-[#9ffb2b]" : "text-gray-400"}>
                          {post.category}
                        </span>
                      </div>
                      <h2 className={`text-base font-bold tracking-tight transition-colors duration-200 line-clamp-2 ${
                        isSelected ? "text-[#9ffb2b]" : "text-white"
                      }`}>
                        {post.title}
                      </h2>
                      <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT PANEL: SCROLLABLE READING VIEWPORT ── */}
          <div className={`lg:col-span-7 flex flex-col bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-3xl p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] h-[calc(100vh-180px)] lg:h-[calc(100vh-160px)] ${
            mobileReadingMode ? "flex" : "hidden lg:flex"
          }`}>
            
            {/* Mobile Back navigation button */}
            <button
              onClick={() => setMobileReadingMode(false)}
              className="lg:hidden inline-flex items-center self-start text-xs font-semibold text-[#9ffb2b] mb-6 bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full"
            >
              ← Back to all articles
            </button>

            {/* Inner text view box with scroll constraints */}
            <div className="flex-1 overflow-y-auto pr-2 blog-scroll-area pb-8">
              <article key={currentPost.id} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                    <span>{currentPost.date}</span>
                    <span>•</span>
                    <span>{currentPost.readTime}</span>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {currentPost.title}
                  </h1>
                  
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/[0.06] border border-white/10 text-gray-300 px-3 py-1 rounded-full">
                      {currentPost.category}
                    </span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/10 my-4" />

                {/* Render full copy text blocks */}
                <div className="text-sm sm:text-base text-gray-400 font-light leading-relaxed space-y-5">
                  {currentPost.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}