import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import PageNav from "../components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"), // Replace with your actual live domain URL
  title: {
    default: "Rashid Irfan KC | Best Digital Marketing Freelancer in Kerala",
    template: "%s | Rashid Irfan KC",
  },
  description:
    "Digital Marketing portfolio of Rashid Irfan KC — Top digital marketing freelancer and consultant in Kerala. Offering data-driven SEO, strategic content marketing, and cost-effective growth frameworks.",
  keywords: [
    // Primary Target Keywords
    "Rashid Irfan KC",
    "best digital marketing freelancer in kerala",
    "digital marketing freelancer in kerala",
    
    // Supporting & Secondary Keywords
    "digital marketing strategist in kerala",
    "best digital marketing strategist in kerala",
    "digital marketing consultant in kerala",
    "best digital marketing freelancer and consultant in kerala",
    "top digital marketing freelancer in kerala",
    "top digital marketing expert in kerala",
    
    // LSI & Intent-Driven Variations
    "Digital Marketing trends in india",
    "freelance digital marketing expert in kerala",
    "affordable digital marketing freelancer in kerala",
    "cost effective SEO services by freelancer in kerala",
    "top freelance providers for content marketing in kerala",
    
    // Core Legacy Keywords
    "Google Ads Expert India",
    "SEO Specialist Kerala",
    "PPC Consultant India",
    "Growth Marketer Kerala",
    "Digital Marketing Portfolio",
  ],
  authors: [{ name: "Rashid Irfan KC" }],
  creator: "Rashid Irfan KC",
  openGraph: {
    title: "Rashid Irfan KC | Best Digital Marketing Freelancer in Kerala",
    description: "Partner with the top digital marketing strategist and consultant in Kerala. Scale organic reach with cost-effective SEO and paid growth campaigns.",
    url: "https://yourdomain.com", // Replace with your actual live domain URL
    siteName: "Rashid Irfan KC Portfolio",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Rashid Irfan KC - Digital Marketing Freelancer Portfolio Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rashid Irfan KC | Top Digital Marketing Expert in Kerala",
    description: "Cost-effective SEO services, strategic content marketing, and high-performance paid ad optimization.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        {children}
        <PageNav />
      </body>
    </html>
  );
}