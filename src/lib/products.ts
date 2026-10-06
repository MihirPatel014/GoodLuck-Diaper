import productsData from '../data/products.json';
import { storeConfig } from '../config/store';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
  rating?: number;
  reviewsCount?: number;
  highlights?: string[];
  volume?: string;
  tags?: string[];
}

const products: Product[] = productsData as Product[];

/**
 * Returns all products from the JSON source.
 */
export function getProducts(): Product[] {
  return products;
}

/**
 * Retrieves a single product by its clean URL slug.
 */
export function getProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return products.find((p) => p.slug.toLowerCase() === normalized);
}

/**
 * Retrieves a single product by its unique ID.
 */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/**
 * Returns all featured products.
 */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

/**
 * Returns products belonging to a specific category.
 */
export function getProductsByCategory(category: string): Product[] {
  if (!category || category.toLowerCase() === 'all') {
    return products;
  }
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Derives unique categories dynamically from products.json.
 */
export function getCategories(): string[] {
  const categorySet = new Set<string>();
  products.forEach((p) => {
    if (p.category) {
      categorySet.add(p.category);
    }
  });
  return Array.from(categorySet);
}

/**
 * Client-side search across name, description, category, and tags.
 */
export function searchProducts(query: string, category?: string): Product[] {
  const trimmed = query.trim().toLowerCase();
  let filtered = products;

  if (category && category.toLowerCase() !== 'all') {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (!trimmed) {
    return filtered;
  }

  return filtered.filter((product) => {
    const inName = product.name.toLowerCase().includes(trimmed);
    const inDesc = product.description.toLowerCase().includes(trimmed);
    const inCategory = product.category.toLowerCase().includes(trimmed);
    const inTags = product.tags?.some((t) => t.toLowerCase().includes(trimmed)) ?? false;
    return inName || inDesc || inCategory || inTags;
  });
}

/**
 * Formats a numeric price using the store currency symbol.
 */
export function formatPrice(price: number): string {
  return `${storeConfig.currency.symbol}${price.toFixed(2)}`;
}
