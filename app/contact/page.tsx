export const metadata = {
  title: "Contact — Rashid Irfan KC | Digital Marketing",
  description:
    "Get in touch with Rashid Irfan KC to discuss SEO, social media, content strategy, or any digital marketing project for your business.",
};

export default function ContactPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-[#89fb2b] selection:text-black">

      {/* Header */}
      <section className="pt-32 pb-20 px-6 bg-[#0d1410] text-white">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-[#89fb2b] block mb-4">Contact</span>
          <h1 className="font-syne text-5xl md:text-7xl font-black uppercase leading-tight mb-6">
            Let&apos;s Grow Your<br />Business Together
          </h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed font-light">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">

          {/* Left — info */}
          <div>
            <h2 className="font-syne text-3xl font-black uppercase text-slate-900 mb-8">
              Get In Touch
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#89fb2b]/10 flex items-center justify-center text-xl flex-shrink-0">
                  📧
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Email</p>
                  <a href="mailto:hello@rashidirfankc.com" className="text-slate-900 font-semibold hover:text-[#3a8a00] transition-colors">
                    hello@rashidirfankc.com
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">Reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#89fb2b]/10 border border-[#89fb2b]/20 flex items-center justify-center text-xl flex-shrink-0">
                  💬
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">WhatsApp</p>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="text-slate-900 font-semibold hover:text-[#3a8a00] transition-colors">
                    +91 98765 43210
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">For quick questions</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#89fb2b]/10 border border-[#89fb2b]/20 flex items-center justify-center text-xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Location</p>
                  <p className="text-slate-900 font-semibold">Kerala, India</p>
                  <p className="text-xs text-slate-400 mt-0.5">Available for remote clients worldwide</p>
                </div>
              </div>
            </div>

            {/* What to expect */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wide">What Happens Next?</h3>
              <ol className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#89fb2b] text-black flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
                  You send me your details using the form.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#89fb2b] text-black flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
                  I&apos;ll review your project and respond within 24 hours.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#89fb2b] text-black flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
                  We have a free 30-minute discovery call.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#89fb2b] text-black flex items-center justify-center font-bold text-xs flex-shrink-0">4</span>
                  I create a custom proposal for your project.
                </li>
              </ol>
            </div>
          </div>

          {/* Right — form */}
          <div className="p-8 md:p-10 rounded-2xl bg-slate-50 border border-slate-100">
            <h3 className="font-syne text-2xl font-black uppercase text-slate-900 mb-8">Send a Message</h3>
            <form
              className="space-y-5"
              action="https://formspree.io/f/mojzeayk"
              method="POST"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2" htmlFor="contact-name">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#89fb2b] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2" htmlFor="contact-email">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#89fb2b] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2" htmlFor="contact-phone">
                  Phone / WhatsApp
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 00000 00000"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#89fb2b] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2" htmlFor="contact-service">
                  Service Interested In *
                </label>
                <select
                  id="contact-service"
                  name="service"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#89fb2b] transition-colors"
                >
                  <option value="">Select a service</option>
                  <option>Search Engine Optimization</option>
                  <option>Social Media Marketing</option>
                  <option>Content Marketing</option>
                  <option>Google Ads Management</option>
                  <option>Email Marketing</option>
                  <option>Strategy Consultation</option>
                  <option>Full Digital Marketing Package</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2" htmlFor="contact-budget">
                  Monthly Budget
                </label>
                <select
                  id="contact-budget"
                  name="budget"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#89fb2b] transition-colors"
                >
                  <option value="">Select a range</option>
                  <option>Under ₹5,000/month</option>
                  <option>₹5,000 – ₹15,000/month</option>
                  <option>₹15,000 – ₹30,000/month</option>
                  <option>₹30,000+/month</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2" htmlFor="contact-message">
                  Tell Me About Your Project *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="What's your business? What are your goals? Any current challenges?"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#89fb2b] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-press w-full py-4 rounded-xl bg-slate-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors"
              >
                Send Message →
              </button>

              <p className="text-center text-xs text-slate-400">
                  I&apos;ll respond within 24 hours · No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
