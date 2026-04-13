import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "TODO",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "TODO",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    /* 
        add more to the sitemap as needed
    */
  ];
}
