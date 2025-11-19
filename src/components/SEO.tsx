import React from 'react';
import { Title, Meta, Link } from 'react-head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = 'evolution, animal explorer, animals, education, science, biology',
  ogImage = '/og-image.png',
  canonicalUrl = 'https://evolutionexplorerai.com'
}) => {
  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      <Meta name="keywords" content={keywords} />
      <Link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="og:image" content={ogImage} />
      <Meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter Card */}
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={description} />
      <Meta name="twitter:image" content={ogImage} />
    </>
  );
};

export default SEO;
