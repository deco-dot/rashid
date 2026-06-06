export const metadata = {
  title: "Services — Rashid Irfan KC | Digital Marketing",
  description:
    "SEO, content marketing, social media, Google Ads, and email marketing services by Rashid Irfan KC for businesses in Kerala and beyond.",
};

const services = [
  {
    num: "01",
    title: "Search Engine Optimization",
    description:
      "Get your website found on Google by the people who are already looking for your products or services. I do complete SEO — from keyword research to technical fixes to content optimization.",
    highlights: [
      "Full website SEO audit",
      "Keyword research & planning",
      "On-page content optimization",
      "Technical SEO fixes",
      "Local SEO for Kerala businesses",
      "Monthly ranking reports",
    ],
    best: "Best for: Local businesses, e-commerce, service providers",
  },
  {
    num: "02",
    title: "Social Media Marketing",
    description:
      "Build a strong social presence on Instagram, Facebook, and LinkedIn. I plan content, create posts, run targeted ads, and grow your audience with real, engaged followers.",
    highlights: [
      "Platform strategy setup",
      "Content calendar & planning",
      "Branded creative posts",
      "Paid social ad campaigns",
      "Community management",
      "Monthly performance report",
    ],
    best: "Best for: Brands, coaches, retail, restaurants",
  },
  {
    num: "03",
    title: "Content Marketing",
    description:
      "Content that attracts, educates, and converts. From blog articles to website copy to email newsletters — I write content that connects with your audience and helps your business grow.",
    highlights: [
      "SEO-optimized blog posts",
      "Website & landing page copy",
      "Email newsletter writing",
      "Social media captions",
      "Product descriptions",
      "Content strategy planning",
    ],
    best: "Best for: SaaS, education, health, coaching brands",
  },
  {
    num: "04",
    title: "Google Ads Management",
    description:
      "Show your business at the top of Google when people search for what you offer. I set up, manage, and optimize Google Search campaigns that bring quality leads at a low cost.",
    highlights: [
      "Campaign structure & setup",
      "Ad copywriting & A/B testing",
      "Keyword bidding strategy",
      "Negative keyword management",
      "Conversion tracking setup",
      "Weekly performance review",
    ],
    best: "Best for: Service businesses, lead generation, e-commerce",
  },
  {
    num: "05",
    title: "Email Marketing",
    description:
      "Email marketing has the highest ROI of any channel. I build your list, create automated sequences, and write newsletters that keep your audience engaged and buying.",
    highlights: [
      "Email list setup & segmentation",
      "Welcome & nurture sequences",
      "Promotional campaigns",
      "Newsletter design & writing",
      "Open rate optimization",
      "Analytics & reporting",
    ],
    best: "Best for: E-commerce, coaches, info products",
  },
  {
    num: "06",
    title: "Strategy Consultation",
    description:
      "Not sure what marketing to focus on? Book a 1-on-1 strategy session. I'll review your current situation, analyze competitors, and give you a clear, step-by-step marketing roadmap.",
    highlights: [
      "Current audit & gap analysis",
      "Competitor research",
      "Custom strategy roadmap",
      "Tool & platform recommendations",
      "Priority action list",
      "30-day follow-up check-in",
    ],
    best: "Best for: Startups, new businesses, rebrands",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-[#89fb2b] selection:text-black">

      {/* Header */}
      <section className="pt-32 pb-20 px-6 bg-[#0d1410] text-white">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-[#89fb2b] block mb-4">Services</span>
          <h1 className="font-syne text-5xl md:text-7xl font-black uppercase leading-tight mb-6">
            Marketing Services<br />For Real Growth
          </h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed font-light">
            Practical, affordable, and results-focused digital marketing. Choose one service or combine them for a full strategy.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((svc) => (
              <div key={svc.num} className="card-hover p-8 rounded-2xl border border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#89fb2b] flex items-center justify-center font-bold text-xs font-mono">
                    {svc.num}
                  </div>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{svc.title}</h2>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{svc.description}</p>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {svc.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#89fb2b] flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="pt-5 border-t border-slate-200 text-[11px] text-slate-400 font-medium">
                  {svc.best}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#0d1410] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne text-3xl md:text-4xl font-black uppercase mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-slate-400 mb-8 font-light">
            Book a free 15-minute call and I'll help you figure out the best starting point for your business.
          </p>
          <a
            href="/contact"
            className="btn-press inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#89fb2b] text-black text-sm font-bold uppercase tracking-widest hover:bg-[#76e020] transition-colors"
          >
            Book Free Call
          </a>
        </div>
      </section>

    </div>
  );
}
