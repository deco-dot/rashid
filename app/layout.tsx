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
  title: "Rashid Irfan KC | Digital Marketing Specialist",
  description:
    "Digital Marketing portfolio of Rashid Irfan KC — SEO, content marketing, social media, and growth strategy for businesses in Kerala and beyond.",
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
