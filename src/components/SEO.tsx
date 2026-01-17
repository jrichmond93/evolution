import React from 'react';
import { Title, Meta, Link } from 'react-head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  ogType?: string;
  robots?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = 'evolution, animal explorer, animals, education, science, biology',
  ogImage = 'https://www.aievolutionexplorer.com/og-image.png',
  canonicalUrl = 'https://aievolutionexplorer.com',
  ogType = 'website',
  robots = 'index, follow'
}) => {
  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      <Meta name="keywords" content={keywords} />
      <Meta name="robots" content={robots} />
      <Link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <Meta property="og:type" content={ogType} />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="og:image" content={ogImage} />
      <Meta property="og:url" content={canonicalUrl} />
      <Meta property="og:site_name" content="Evolution Explorer" />
      
      {/* Twitter Card */}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={description} />
      <Meta name="twitter:image" content={ogImage} />
    </>
  );
};

export default SEO;
