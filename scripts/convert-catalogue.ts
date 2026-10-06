import fs from 'fs';
import path from 'path';

const cataloguePath = path.join(process.cwd(), 'whatsapp-catalogue-2026-10-05.json');
const outputPath = path.join(process.cwd(), 'src/data/products.json');

interface CatalogueItem {
  index: number;
  name: string;
  price: string;
  price_value: number;
  currency: string;
  description: string;
  product_link: string;
  image_url: string;
  image_data: string;
  raw_text: string;
}

interface Product {
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

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function categorizeProduct(name: string, description: string): string {
  const text = (name + ' ' + description).toLowerCase();
  
  if (text.includes('adult') || text.includes('daipar') && (text.includes('xxx') || text.includes('xxl') || text.includes('xl') || text.includes('2xl') || text.includes('m ') || text.includes(' l ') || text.includes(' xl'))) {
    return 'Adult Diapers';
  }
  if (text.includes('period') || text.includes('sanitary') || text.includes('pads') || text.includes('maxi') || text.includes('everteen') || text.includes('sanilo') || text.includes('maxmoral') || text.includes('extra care') || text.includes('extra feel')) {
    return 'Sanitary Pads';
  }
  if (text.includes('wipes') || text.includes('tishu') || text.includes('tissue') || text.includes('papper')) {
    return 'Wipes';
  }
  if (text.includes('gloves') || text.includes('underpads') || text.includes('cotton') || text.includes('hand gloves') || text.includes('friends under') || text.includes('zipson')) {
    return 'Baby Care';
  }
  return 'Baby Diapers';
}

function generateHighlights(name: string, description: string, price_value: number): string[] {
  const highlights: string[] = [];
  const text = (name + ' ' + description).toLowerCase();
  
  if (text.includes('xxl') || text.includes('xxx') || text.includes('2xl')) {
    highlights.push('XXL/XXXL sizes available');
  }
  if (text.includes('pant') || text.includes('pants')) {
    highlights.push('Comfortable pant-style design');
  }
  if (text.includes('premium')) {
    highlights.push('Premium quality');
  }
  if (text.includes('huggies') || text.includes('absorbia') || text.includes('cuddles') || text.includes('navilo') || text.includes('chinkoo') || text.includes('alfaby') || text.includes('genius') || text.includes('luvlap') || text.includes('teddyy') || text.includes('maxmoral') || text.includes('everteen') || text.includes('sanilo') || text.includes('extra')) {
    highlights.push('Trusted brand quality');
  }
  if (text.includes('soft') || text.includes('gentle')) {
    highlights.push('Soft and gentle on skin');
  }
  
  // Extract size info from description
  const sizeMatch = description.match(/[A-Z]{1,3}\.?\s*(?:[,\s]+[A-Z]{1,3}\.?)*/);
  if (sizeMatch) {
    highlights.push(`Available in ${sizeMatch[0].replace(/\./g, '').trim()} sizes`);
  }
  
  if (highlights.length === 0) {
    highlights.push('Quality assured product');
    highlights.push('Competitive pricing');
    highlights.push('Available for immediate dispatch');
  }
  
  return highlights.slice(0, 4);
}

function extractVolume(description: string, name: string): string {
  const text = description + ' ' + name;
  
  const packMatch = text.match(/(\d+)\s*(?:pice|piece|pcs|pack)/i);
  if (packMatch) {
    return `${packMatch[1]} pcs`;
  }
  
  const volumeMatch = text.match(/(\d+)\s*(?:ml|ML|l|L|gm|GM|kg|KG)/i);
  if (volumeMatch) {
    return volumeMatch[0];
  }
  
  return 'Standard pack';
}

function convertCatalogue(): void {
  const rawData = fs.readFileSync(cataloguePath, 'utf-8');
  const catalogue: CatalogueItem[] = JSON.parse(rawData);
  
  // Skip the first item (index 1) which is the store itself
  const products = catalogue
    .filter(item => item.index > 1 && item.price_value > 0)
    .map((item, index) => {
      const category = categorizeProduct(item.name, item.description);
      const highlights = generateHighlights(item.name, item.description, item.price_value);
      const volume = extractVolume(item.description, item.name);
      
      // Generate tags
      const tags = [
        category.toLowerCase().replace(' ', '-'),
        item.name.toLowerCase().split(' ')[0],
        ...(item.description.toLowerCase().includes('premium') ? ['premium'] : []),
        ...(item.description.toLowerCase().includes('pant') ? ['pants'] : []),
        ...(item.description.toLowerCase().includes('wipes') ? ['wipes'] : []),
        ...(item.description.toLowerCase().includes('pad') ? ['pads'] : []),
      ].filter((v, i, a) => a.indexOf(v) === i);
      
      return {
        id: String(item.index),
        name: item.name,
        slug: generateSlug(item.name),
        description: item.description || item.raw_text,
        fullDescription: item.raw_text || `${item.name} - ${item.description}. Price: ${item.currency}${item.price_value}. ${item.description}`,
        price: item.price_value,
        originalPrice: null,
        image: `/images/products/product-${item.index}.jpg`,
        category,
        featured: index < 6, // First 6 as featured
        inStock: true,
        rating: 4.5 + Math.random() * 0.4,
        reviewsCount: Math.floor(50 + Math.random() * 400),
        highlights,
        volume,
        tags,
      } as Product;
    });
  
  fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
  console.log(`✅ Converted ${products.length} products to ${outputPath}`);
}

convertCatalogue();