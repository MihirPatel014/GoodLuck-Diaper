import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../lib/products';
import { ProductPrice } from './ProductPrice';
import { WhatsAppProductButton } from '../whatsapp/WhatsAppProductButton';
import { ArrowUpRight } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  className?: string;
  showCategory?: boolean;
}

export function ProductCard({ product, className = '', showCategory = true }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className={`product-card group ${className}`}>
      <Link to={`/shop/${product.slug}`} className="product-image" aria-label={`View ${product.name}`}>
        {!imgError ? <img src={product.image} alt={product.name} loading="lazy" referrerPolicy="no-referrer" onError={() => setImgError(true)} /> : <div className="product-image-fallback">{product.name}</div>}
        {showCategory && product.category && <span className="product-category">{product.category}</span>}
        <span className="product-view">View product <ArrowUpRight aria-hidden="true" size={15} /></span>
      </Link>
      <div className="product-info">
        <div className="product-title-row">
          <Link to={`/shop/${product.slug}`} className="product-title">{product.name}</Link>
          <ProductPrice price={product.price} originalPrice={product.originalPrice} size="md" />
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <Link to={`/shop/${product.slug}`} className="product-detail-link">Details <ArrowUpRight aria-hidden="true" size={14} /></Link>
          <WhatsAppProductButton product={product} variant="primary" size="sm" label="Ask on WhatsApp" className="product-whatsapp" />
        </div>
      </div>
    </article>
  );
}
