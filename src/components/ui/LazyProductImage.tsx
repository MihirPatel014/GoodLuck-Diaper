import { useState, useEffect, useRef } from 'react';
import { createLazyImageSrc, getProductImageUrl } from '../../lib/products';
import { Product } from '../../lib/products';

interface LazyImageProps {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
  alt?: string;
}

export function LazyProductImage({ 
  product, 
  className = '', 
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  alt
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px', threshold: 0.01 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const imageSrc = getProductImageUrl(product);
  const placeholderSrc = createLazyImageSrc(product);

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#E8FBF1] animate-pulse" aria-hidden="true" />
      )}
      
      <img
        ref={imgRef}
        src={isInView ? imageSrc : placeholderSrc}
        alt={alt || product.name}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${hasError ? 'hidden' : ''}`}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
      />
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400 text-xs">
          Image unavailable
        </div>
      )}
    </div>
  );
}