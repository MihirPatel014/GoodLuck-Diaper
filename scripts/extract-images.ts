import fs from 'fs';
import path from 'path';

const cataloguePath = path.join(process.cwd(), 'whatsapp-catalogue-2026-10-05.json');
const imagesDir = path.join(process.cwd(), 'public/images/products');

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

function extractBase64Image(imageData: string): { mimeType: string; data: string } | null {
  const match = imageData.match(/^data:image\/([a-z]+);base64,(.+)$/);
  if (match) {
    return { mimeType: match[1], data: match[2] };
  }
  return null;
}

function saveImages(): void {
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const rawData = fs.readFileSync(cataloguePath, 'utf-8');
  const catalogue: CatalogueItem[] = JSON.parse(rawData);

  for (const item of catalogue) {
    if (item.index <= 1) continue; // Skip store entry
    
    const extracted = extractBase64Image(item.image_data);
    if (extracted) {
      const ext = extracted.mimeType === 'jpeg' ? 'jpg' : extracted.mimeType;
      const fileName = `product-${item.index}.${ext}`;
      const filePath = path.join(imagesDir, fileName);
      
      if (!fs.existsSync(filePath)) {
        const buffer = Buffer.from(extracted.data, 'base64');
        fs.writeFileSync(filePath, buffer);
        console.log(`Saved: ${fileName} (${buffer.length} bytes)`);
      }
    }
  }
  
  console.log('✅ All images extracted to public/images/products/');
}

saveImages();