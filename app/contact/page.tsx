import React from "react";

export const metadata = {
  title: "Contact — Rashid Irfan KC | Digital Marketing",
  description: "Get in touch with Rashid Irfan KC to discuss SEO, social media, content strategy, or any digital marketing project for your business.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans antialiased">
      
      {/* Header Section */}
      <section className="pt-28 pb-12 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold tracking-wider text-[#9ffb2b] uppercase block">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Let&apos;s Grow Your Business Together
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto font-light">
            Have a project in mind or want to work together? Fill out the form below and I will get back to you soon.
          </p>
        </div>
      </section>

      {/* Simple Form Section */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          
          <form
            className="space-y-6"
            action="https://formspree.io/f/mojzeayk"
            method="POST"
          >
            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-medium text-gray-400">Your Name *</label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full bg-[#1a201d] text-white placeholder:text-gray-600 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:border-[#9ffb2b] focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-medium text-gray-400">Your Email *</label>
                <input
                  name="email"
                  type="email"
                  placeholder="hello@example.com"
                  required
                  className="w-full bg-[#1a201d] text-white placeholder:text-gray-600 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:border-[#9ffb2b] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Phone and Service Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-medium text-gray-400">Phone / WhatsApp</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 95446 43353"
                  className="w-full bg-[#1a201d] text-white placeholder:text-gray-600 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:border-[#9ffb2b] focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-medium text-gray-400">Select a Service *</label>
                <div className="relative">
                  <select
                    name="service"
                    required
                    className="w-full bg-[#1a201d] text-white px-4 py-3 rounded-xl text-sm border border-gray-800 focus:border-[#9ffb2b] focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="text-gray-500">Choose a service...</option>
                    <option value="Search Engine Optimization">Search Engine Optimization</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Content Marketing">Content Marketing</option>
                    <option value="Google Ads Management">Google Ads Management</option>
                    <option value="Email Marketing">Email Marketing</option>
                    <option value="Strategy Consultation">Strategy Consultation</option>
                    <option value="Full Digital Marketing Package">Full Digital Marketing Package</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-medium text-gray-400">Message *</label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me a little about your project goals..."
                required
                className="w-full bg-[#1a201d] text-white placeholder:text-gray-600 px-4 py-3 rounded-xl text-sm border border-gray-800 focus:border-[#9ffb2b] focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#9ffb2b] text-black text-sm font-semibold rounded-xl hover:bg-[#b0ff47] transition-colors shadow-sm"
              >
                Send Message
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                I typically respond within 24 hours.
              </p>
            </div>
          </form>

          {/* Quick Links Footer */}
          <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="mailto:rashidirfankc2006@gmail.com" className="hover:text-white transition-colors">
                rashidirfankc2006@gmail.com
              </a>
              <a href="https://wa.me/919544643353" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                +91 95446 43353
              </a>
            </div>
            
            {/* Social Media Text Links */}
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#9ffb2b] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[#9ffb2b] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[#9ffb2b] transition-colors">Instagram</a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}