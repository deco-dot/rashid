"use client";

import React, { useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string[];
}

const ALL_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "How to Scale Google Ads Budgets Safely Without Dropping Your ROI",
    excerpt: "A practical approach to increasing your ad spend smoothly by 10% to 15% intervals, keeping client conversion costs stable.",
    date: "Jun 2026",
    category: "Paid Ads",
    readTime: "5 min read",
    content: [
      "When you want to increase leads from Google Ads, simply doubling your budget overnight can confuse the smart bidding algorithm and cause your cost-per-acquisition to spike. Instead, a scalable workflow requires a controlled approach.",
      "The safest method is to scale your budgets by 10% to 15% every three to five days. This gradual approach allows the machine learning algorithm to find expanded audience pools without leaving its learning phase.",
      "Additionally, keep a close eye on your search lost IS (budget) metrics. If your campaigns are regularly dropping visibility due to restricted daily pacing, increasing capital directly on those exact configurations will generate almost immediate lead adjustments."
    ]
  },
  {
    id: 2,
    title: "A Simple Guide to Website Speed and Google SEO Rankings",
    excerpt: "Why clean code architectures, optimized layouts, and image compression directly dictate your search placement on mobile browsers.",
    date: "May 2026",
    category: "SEO",
    readTime: "7 min read",
    content: [
      "Google prioritizes fast websites that provide clean, fast interactions for users. If your web layout shifts significantly while loading images, or takes more than three seconds to display content, your rankings will inevitably slide.",
      "To optimize this effectively, make sure you are capitalizing on modern component strategies. Next.js natively assists with this by optimizing font loading distributions and handling code splitting efficiently out of the box.",
      "Always compress high-resolution image assets into next-generation formats like WebP or AVIF before loading them to production servers. A faster site keeps visitors engaged longer, reducing your bounce rate and directly signal boosting your domain authority."
    ]
  },
  {
    id: 3,
    title: "The Local SEO Blueprint: Dominating Regional Maps and Search Results",
    excerpt: "How local businesses can optimize map profiles, structure localized landing pages, and capture high-intent regional buyers.",
    date: "May 2026",
    category: "SEO",
    readTime: "6 min read",
    content: [
      "For regional businesses, local search visibility is often the highest converting organic channel available. Capturing users looking for immediate solutions nearby requires an explicit structure.",
      "Ensure your Google Business Profile is thoroughly detailed, matching exact name, address, and phone details across all primary digital directories. Consistently acquiring authentic reviews serves as a direct ranking signal for map packs.",
      "On your website, build dedicated landing pages for localized terms. Structuring helpful local content and embedding dynamic maps ensures Google recognizes your proximity authority."
    ]
  },
  {
    id: 4,
    title: "How to Build a High-Converting Digital Marketing Strategy",
    excerpt: "Stop wasting your monthly ad budget on empty clicks. Learn how to align high-intent target audiences with high-performance landing pages.",
    date: "Apr 2026",
    category: "Marketing",
    readTime: "4 min read",
    content: [
      "High-performance digital marketing isn't about collecting massive volumes of cheap views; it is about building clean conversion pipelines that transform strangers into valuable client accounts.",
      "Start by mapping user intent. A searcher typing a precise, high-intent phrase requires a streamlined landing page focused exclusively on answering that exact query with zero navigation distractions.",
      "Minimize conversion friction by shortening contact forms, stating clear unique value propositions above the fold, and establishing trust instantly via client case studies."
    ]
  },
  {
    id: 5,
    title: "Mastering Meta Ads: Broad Targeting Frameworks That Actually Convert",
    excerpt: "Moving past over-segmented interest pools. Why letting social ad algorithms analyze creative performance leads to sustainable costs.",
    date: "Mar 2026",
    category: "Paid Ads",
    readTime: "8 min read",
    content: [
      "Micro-managing granular audience interests inside social ad builders often limits delivery scalability and raises overall CPM costs unnecessarily over long horizons.",
      "Modern machine learning systems perform exceptionally well when given broader structural freedom. Trusting broad targeting setups and focusing your primary energy on creative asset testing remains the current gold standard.",
      "Your ad copy and video hooks act as the primary filtering mechanism. Let the platform analyze behavioral interactions to deliver your messaging straight to natural buyer profiles."
    ]
  },
  {
    id: 6,
    title: "Writing Ad Copy That Converts: The Hook, Story, and Offer Formula",
    excerpt: "Break down the psychological framework behind high-performing ad creatives that capture attention and drive user action.",
    date: "Mar 2026",
    category: "Paid Ads",
    readTime: "5 min read",
    content: [
      "Great ad copy doesn't read like an encyclopedia; it reads like a direct solution to an active frustration. To convert cold traffic, your messaging must instantly disrupt the user's scroll.",
      "Start with a strong hook that highlights a common problem or shatters a popular myth. Follow up with a brief story or data point that builds authority and shows empathy for the reader's situation.",
      "Conclude with a single, clear call to action. Tell the user exactly what to do next, whether it is downloading a guide or booking a strategy call, reducing any mental hesitation."
    ]
  },
  {
    id: 7,
    title: "The Power of Negative Keywords in Google Ads Search Campaigns",
    excerpt: "Stop bleeding your budget on irrelevant searches. Learn how to trim poor search terms to instantly improve click-through rates.",
    date: "Feb 2026",
    category: "Paid Ads",
    readTime: "4 min read",
    content: [
      "If you aren't actively managing your negative keyword list, you are giving Google permission to waste your marketing budget on entirely unrelated search intent.",
      "Regularly review your search terms report to identify low-intent or irrelevant phrases. Adding these as negative keywords prevents your ads from appearing to audiences who have no intention of buying.",
      "This process quickly increases your overall campaign click-through rate (CTR) and quality score, which reduces your average cost-per-click over time."
    ]
  },
  {
    id: 8,
    title: "An Introduction to Google Analytics 4 (GA4) for Modern Businesses",
    excerpt: "Demystifying GA4 events, custom conversion tracking, and user journeys to accurately measure digital marketing performance.",
    date: "Jan 2026",
    category: "Marketing",
    readTime: "6 min read",
    content: [
      "Moving away from traditional pageviews, modern analytics tools focus heavily on custom user event tracking to build a clearer picture of web interaction paths.",
      "Setting up standard tracking parameters correctly allows you to see exactly where users drop off inside your sales funnels or contact form flows.",
      "Utilize these insights to confidently optimize your landing page structures, focusing your energy on high-performing traffic sources."
    ]
  },
  {
    id: 9,
    title: "Why Content Marketing is a Long-Term Asset for Organic Growth",
    excerpt: "Building an authority-driven content archive that attracts high-value organic traffic month after month without ad spend.",
    date: "Jan 2026",
    category: "Marketing",
    readTime: "7 min read",
    content: [
      "While paid ads offer immediate market feedback, an authority-driven content strategy builds a permanent digital asset that keeps producing value long after production ends.",
      "Focus on answering specific, detailed questions that your target clients frequently ask during standard onboarding or sales conversations.",
      "Consistently publishing helpful, high-quality answers signals deep topical expertise to search engines, steadily growing your organic search traffic over time."
    ]
  },
  {
    id: 10,
    title: "Understanding E-E-A-T and Why Google Values Real Expertise",
    excerpt: "How to optimize your website content to satisfy Google's strict Experience, Expertise, Authoritativeness, and Trustworthiness guidelines.",
    date: "Dec 2025",
    category: "SEO",
    readTime: "5 min read",
    content: [
      "Google wants to ensure that the content ranking at the top of its search results is written by trustworthy creators with verifiable real-world experience.",
      "To build strong trust signals, include detailed author biographies on your articles, display professional certifications, and back up claims with credible external links.",
      "Focusing heavily on transparency and factual accuracy protects your website from algorithmic ranking drops while establishing deep credibility with your target audience."
    ]
  }
];

export default function BlogPage() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [mobileReadingMode, setMobileReadingMode] = useState<boolean>(false);

  const currentPost = ALL_POSTS.find((p) => p.id === selectedId) || ALL_POSTS[0];

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
              {ALL_POSTS.map((post) => {
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