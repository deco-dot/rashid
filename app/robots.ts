import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/api/"], // Prevents scraping engine assets or backend APIs
    },
    sitemap: "https://www.rashidirfan.in/sitemap.xml", // Replace with your URL
  };
}