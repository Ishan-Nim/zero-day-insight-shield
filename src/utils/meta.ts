
/**
 * Site-wide meta information for SEO optimization
 */

export const siteMeta = {
  title: "Cyber Crew - Web Vulnerability Scanner",
  description: "Professional web application security scanner to identify and fix vulnerabilities",
  keywords: "web security, vulnerability scanner, cyber security, penetration testing, web application security",
  author: "Cyber Crew Security",
  url: "https://cybercrew.security", // Replace with your actual production URL
  twitterHandle: "@cybercrew_scanner",
  imageUrl: "/lovable-uploads/f78a1255-90fc-4bf6-a3ef-839e93cd4305.png"
};

export const generateMetaTags = (
  title?: string,
  description: string = siteMeta.description
) => {
  const pageTitle = title ? `${title} | ${siteMeta.title.split(' - ')[0]}` : siteMeta.title;
  
  return {
    title: pageTitle,
    meta: [
      { name: "description", content: description },
      { name: "keywords", content: siteMeta.keywords },
      { name: "author", content: siteMeta.author },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: siteMeta.imageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: siteMeta.twitterHandle },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: siteMeta.imageUrl },
    ],
  };
};
