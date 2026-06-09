import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rashidirfan.in"; // Replace with your URL

  const routes = ["", "/about", "/projects", "/contact", "/services"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}