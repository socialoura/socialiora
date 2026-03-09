'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  index?: boolean;
  follow?: boolean;
  canonical?: string;
}

export default function SEOHead({ 
  title, 
  description, 
  keywords = [], 
  index = true, 
  follow = true,
  canonical 
}: SEOHeadProps) {
  const pathname = usePathname();
  
  const defaultTitle = "Socialoura - Boost Your Social Media Growth";
  const defaultDescription = "Grow your Instagram and TikTok followers with Socialoura. Safe, reliable, and effective social media growth service.";
  
  useEffect(() => {
    // Update document title
    document.title = title || defaultTitle;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    const updatePropertyMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    // Basic meta tags
    updateMetaTag('description', description || defaultDescription);
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }
    
    // Robots
    updateMetaTag('robots', `${index ? 'index' : 'noindex'}, ${follow ? 'follow' : 'nofollow'}`);
    updateMetaTag('googlebot', `${index ? 'index' : 'noindex'}, ${follow ? 'follow' : 'nofollow'}`);
    
    // Canonical URL
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical || `https://socialoura.com${pathname}`;
    
    // Open Graph
    updatePropertyMeta('og:title', title || defaultTitle);
    updatePropertyMeta('og:description', description || defaultDescription);
    updatePropertyMeta('og:type', 'website');
    updatePropertyMeta('og:url', canonical || `https://socialoura.com${pathname}`);
    updatePropertyMeta('og:image', 'https://socialoura.com/img/og-image.jpg');
    
    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title || defaultTitle);
    updateMetaTag('twitter:description', description || defaultDescription);
    updateMetaTag('twitter:image', 'https://socialoura.com/img/og-image.jpg');
  }, [title, description, keywords, index, follow, canonical, pathname]);
  
  // This component doesn't render anything visible
  return null;
}
