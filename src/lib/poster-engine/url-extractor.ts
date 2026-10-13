import { OutfitItemCategory } from '@/types/poster';

export interface ExtractedProductInfo {
  success: boolean;
  name: string;
  detail: string;
  price: string;
  category: OutfitItemCategory;
  photoUrl?: string;
  sourceUrl: string;
  message?: string;
}

/**
 * Detects whether the item is top (baju), bottom (celana), footwear (sepatu), bag (tas), or accessory.
 */
export function detectOutfitCategory(text: string): OutfitItemCategory {
  const lower = text.toLowerCase();
  
  if (
    lower.includes('sepatu') ||
    lower.includes('sneaker') ||
    lower.includes('sandal') ||
    lower.includes('boots') ||
    lower.includes('shoes') ||
    lower.includes('alas kaki') ||
    lower.includes('slip on') ||
    lower.includes('loafer')
  ) {
    return 'footwear';
  }

  if (
    lower.includes('celana') ||
    lower.includes('pants') ||
    lower.includes('cargo') ||
    lower.includes('jeans') ||
    lower.includes('chino') ||
    lower.includes('shorts') ||
    lower.includes('trousers') ||
    lower.includes('bawahan')
  ) {
    return 'bottom';
  }

  if (
    lower.includes('tas') ||
    lower.includes('bag') ||
    lower.includes('backpack') ||
    lower.includes('sling') ||
    lower.includes('waistbag') ||
    lower.includes('tote') ||
    lower.includes('dompet') ||
    lower.includes('clutch')
  ) {
    return 'bag';
  }

  if (
    lower.includes('jam') ||
    lower.includes('watch') ||
    lower.includes('topi') ||
    lower.includes('cap') ||
    lower.includes('beanie') ||
    lower.includes('kacamata') ||
    lower.includes('sunglasses') ||
    lower.includes('kalung') ||
    lower.includes('gelang') ||
    lower.includes('cincin') ||
    lower.includes('aksesori') ||
    lower.includes('belt') ||
    lower.includes('ikat pinggang')
  ) {
    return 'accessory';
  }

  if (
    lower.includes('baju') ||
    lower.includes('kaos') ||
    lower.includes('t-shirt') ||
    lower.includes('tee') ||
    lower.includes('kemeja') ||
    lower.includes('shirt') ||
    lower.includes('hoodie') ||
    lower.includes('jaket') ||
    lower.includes('jacket') ||
    lower.includes('crewneck') ||
    lower.includes('sweater') ||
    lower.includes('atasan') ||
    lower.includes('vest') ||
    lower.includes('outer')
  ) {
    return 'top';
  }

  return 'top';
}

/**
 * Extracts fabric, material, and fit specifications from product text/description.
 */
export function extractMaterialAndDetail(fullText: string, category: OutfitItemCategory): string {
  const text = fullText.toLowerCase();

  // 1. Common Indonesian fashion materials
  const materials = [
    { regex: /cotton\s*combed\s*24s|katun\s*combed\s*24s/i, label: 'COTTON COMBED 24S' },
    { regex: /cotton\s*combed\s*30s|katun\s*combed\s*30s/i, label: 'COTTON COMBED 30S' },
    { regex: /cotton\s*combed|katun\s*combed/i, label: 'KATUN COMBED' },
    { regex: /heavyweight\s*cotton/i, label: 'HEAVYWEIGHT COTTON' },
    { regex: /denim\s*14\s*oz/i, label: 'DENIM 14OZ' },
    { regex: /denim\s*12\s*oz/i, label: 'DENIM 12OZ' },
    { regex: /denim|jeans/i, label: 'HEAVY DENIM' },
    { regex: /corduroy/i, label: 'PREMIUM CORDUROY' },
    { regex: /fleece|cotton\s*fleece/i, label: 'COTTON FLEECE' },
    { regex: /baby\s*terry/i, label: 'BABY TERRY' },
    { regex: /linen\s*rami|katun\s*linen/i, label: 'LINEN RAMI' },
    { regex: /linen/i, label: 'PURE LINEN' },
    { regex: /twill|chino/i, label: 'COTTON TWILL' },
    { regex: /taslan|parasut/i, label: 'WATERPROOF TASLAN' },
    { regex: /ripstop/i, label: 'NYLON RIPSTOP' },
    { regex: /canvas|kanvas/i, label: 'HEAVY CANVAS' },
    { regex: /waffle|knit|rajut/i, label: 'KNIT WAFFLE' },
    { regex: /suede/i, label: 'PREMIUM SUEDE' },
    { regex: /leather|kulit/i, label: 'FAUX LEATHER' },
    { regex: /polyester|dryfit/i, label: 'BREATHABLE POLY' },
  ];

  // 2. Fits & cutting styles
  const styles = [
    { regex: /boxy(?:\s*fit)?/i, label: 'BOXY FIT' },
    { regex: /oversize(?:d)?/i, label: 'OVERSIZED' },
    { regex: /relaxed(?:\s*fit)?/i, label: 'RELAXED FIT' },
    { regex: /loose(?:\s*fit)?|baggy/i, label: 'LOOSE FIT' },
    { regex: /straight(?:\s*cut|\s*leg)?/i, label: 'STRAIGHT CUT' },
    { regex: /cargo/i, label: 'MULTI POCKET' },
    { regex: /vintage|washed/i, label: 'VINTAGE WASH' },
    { regex: /retro|classic/i, label: 'RETRO CLASSIC' },
    { regex: /drop\s*shoulder/i, label: 'DROP SHOULDER' },
    { regex: /crop|cropped/i, label: 'CROPPED FIT' },
  ];

  let matchedMaterial = '';
  for (const m of materials) {
    if (m.regex.test(text)) {
      matchedMaterial = m.label;
      break;
    }
  }

  let matchedStyle = '';
  for (const s of styles) {
    if (s.regex.test(text)) {
      matchedStyle = s.label;
      break;
    }
  }

  if (matchedMaterial && matchedStyle) {
    return `${matchedMaterial} / ${matchedStyle}`;
  }
  if (matchedMaterial) {
    return `${matchedMaterial} / PREMIUM`;
  }
  if (matchedStyle) {
    return `STREETWEAR / ${matchedStyle}`;
  }

  // Fallback aesthetic defaults per category
  switch (category) {
    case 'top': return 'COTTON COMBED / REGULAR FIT';
    case 'bottom': return 'HEAVY TWILL / STRAIGHT FIT';
    case 'footwear': return 'VULCANIZED SOLE / RETRO';
    case 'bag': return 'CORDURA / WATER-RESISTANT';
    case 'accessory': return 'STAINLESS / MATTE FINISH';
    default: return 'PREMIUM STREETWEAR';
  }
}

/**
 * Cleans raw marketplace product title into clean aesthetic name.
 */
function cleanProductTitle(rawTitle: string): string {
  let clean = rawTitle
    .replace(/\|\s*(Shopee|Tokopedia|TikTok Shop|Lazada|Blibli).*/gi, '')
    .replace(/^(Jual|Beli|Promo|Diskon|Ready|Termurah|Terlaris)\s+/i, '')
    .replace(/[\[\(].*?[\]\)]/g, ' ') // remove [BISA COD], (ORIGINAL)
    .replace(/\s+/g, ' ')
    .trim();

  // Split words
  const words = clean.split(' ').filter(w => w.length > 0);
  
  if (words.length <= 4) {
    return clean.toUpperCase();
  }

  // Pick first 3-4 impactful words
  return words.slice(0, 4).join(' ').toUpperCase();
}

/**
 * Normalizes photo URLs (handling //, protocols, and HTML entity encoding).
 */
function normalizePhotoUrl(rawUrl: string): string | undefined {
  if (!rawUrl) return undefined;
  let url = rawUrl.trim().replace(/&amp;/g, '&');
  
  if (url.startsWith('//')) {
    url = `https:${url}`;
  }
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it's a raw Shopee image ID like 'id-11134207-...'
  if (/^[a-zA-Z0-9_\-]+$/.test(url) && url.length > 15) {
    return `https://down-id.img.susercontent.com/file/${url}`;
  }
  
  return undefined;
}

/**
 * Extracts price from HTML text or meta content.
 */
function extractPriceFromText(text: string): string {
  // Pattern: Rp 59.000 or Rp. 59.000
  const rpMatch = text.match(/Rp\.?\s*([0-9]{1,3}(?:\.[0-9]{3})+)/i);
  if (rpMatch && rpMatch[1]) {
    return `Rp ${rpMatch[1]}`;
  }

  // Numeric price in JSON-LD: "price": "59000" or 59000
  const numMatch = text.match(/"price"\s*:\s*"?([0-9]{4,8})"?/i);
  if (numMatch && numMatch[1]) {
    const num = parseInt(numMatch[1], 10);
    if (!isNaN(num) && num > 1000) {
      return `Rp ${num.toLocaleString('id-ID')}`;
    }
  }

  return 'Rp -';
}

/**
 * Extracts product metadata from a public marketplace or web URL.
 */
export async function extractProductFromUrl(targetUrl: string): Promise<ExtractedProductInfo> {
  let url = targetUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php) Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      redirect: 'follow',
      next: { revalidate: 3600 },
    });

    const finalUrl = response.url || url;
    const html = await response.text();

    let rawTitle = '';
    let rawPhoto = '';
    let rawDescription = '';
    let price = '';

    // 1. JSON-LD parsing (Shopee, Tokopedia, TikTok Shop, Shopify)
    const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let jsonMatch: RegExpExecArray | null;
    while ((jsonMatch = jsonLdRegex.exec(html)) !== null) {
      try {
        const data = JSON.parse(jsonMatch[1].trim());
        const item = Array.isArray(data)
          ? data.find(d => d['@type'] === 'Product')
          : (data['@type'] === 'Product' ? data : null);
        
        if (item) {
          if (item.name) rawTitle = item.name;
          if (item.image) {
            if (Array.isArray(item.image)) {
              rawPhoto = item.image[0];
            } else if (typeof item.image === 'object' && item.image.url) {
              rawPhoto = item.image.url;
            } else if (typeof item.image === 'string') {
              rawPhoto = item.image;
            }
          }
          if (item.description) rawDescription = item.description;
          if (item.offers) {
            const offer = Array.isArray(item.offers) ? item.offers[0] : item.offers;
            if (offer.price) {
              const p = Number(offer.price);
              if (!isNaN(p) && p > 0) price = `Rp ${p.toLocaleString('id-ID')}`;
            } else if (offer.lowPrice) {
              const p = Number(offer.lowPrice);
              if (!isNaN(p) && p > 0) price = `Rp ${p.toLocaleString('id-ID')}`;
            }
          }
          break;
        }
      } catch {
        // continue
      }
    }

    // 2. OpenGraph / Twitter meta fallbacks
    if (!rawTitle) {
      const ogTitleMatch = html.match(/<meta[^>]+(?:property|name)=["']og:title["'][^>]+content=["'](.*?)["']/i) ||
                           html.match(/<meta[^>]+content=["'](.*?)["'][^>]+(?:property|name)=["']og:title["']/i);
      if (ogTitleMatch && ogTitleMatch[1]) {
        rawTitle = ogTitleMatch[1];
      } else {
        const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
          rawTitle = titleMatch[1].trim();
        }
      }
    }

    if (!rawPhoto) {
      const ogImageMatch = html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["'](.*?)["']/i) ||
                           html.match(/<meta[^>]+content=["'](.*?)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image)["']/i);
      if (ogImageMatch && ogImageMatch[1]) {
        rawPhoto = ogImageMatch[1];
      }
    }

    if (!rawDescription) {
      const ogDescMatch = html.match(/<meta[^>]+(?:property|name)=["'](?:og:description|description)["'][^>]+content=["'](.*?)["']/i) ||
                          html.match(/<meta[^>]+content=["'](.*?)["'][^>]+(?:property|name)=["'](?:og:description|description)["']/i);
      if (ogDescMatch && ogDescMatch[1]) {
        rawDescription = ogDescMatch[1];
      }
    }

    // 3. Fallback price extraction
    if (!price || price === 'Rp -') {
      price = extractPriceFromText(rawDescription + ' ' + html);
    }

    // 4. URL slug fallback if title still empty
    if (!rawTitle) {
      try {
        const parsedUrl = new URL(finalUrl);
        const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1] || '';
        const slug = decodeURIComponent(lastSegment)
          .replace(/-i\.\d+\.\d+$/i, '')
          .replace(/[-_]/g, ' ');
        if (slug.length > 3) {
          rawTitle = slug;
        }
      } catch {
        // ignore
      }
    }

    const category = detectOutfitCategory(rawTitle + ' ' + rawDescription + ' ' + finalUrl);
    const detail = extractMaterialAndDetail(rawTitle + ' ' + rawDescription, category);
    const photoUrl = normalizePhotoUrl(rawPhoto);

    if (!rawTitle) {
      return {
        success: false,
        name: 'ITEM BARU',
        detail: 'DETAIL PRODUK',
        price: 'Rp -',
        category,
        sourceUrl: url,
        message: 'Link berhasil dibaca, namun metadata produk terbatas. Silakan lengkapi manual.',
      };
    }

    const name = cleanProductTitle(rawTitle);

    return {
      success: true,
      name,
      detail,
      price: price || 'Rp -',
      category,
      photoUrl,
      sourceUrl: url,
      message: 'Foto, nama produk, harga & detail bahan berhasil diisi otomatis!',
    };
  } catch (error: any) {
    try {
      const parsedUrl = new URL(url);
      const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1] || '';
      const slug = decodeURIComponent(lastSegment)
        .replace(/-i\.\d+\.\d+$/i, '')
        .replace(/[-_]/g, ' ');

      if (slug.length > 3) {
        const name = cleanProductTitle(slug);
        const category = detectOutfitCategory(slug);
        const detail = extractMaterialAndDetail(slug, category);
        return {
          success: true,
          name,
          detail,
          price: 'Rp -',
          category,
          sourceUrl: url,
          message: 'Nama produk & kategori berhasil diekstrak dari tautan.',
        };
      }
    } catch {
      // ignore
    }

    return {
      success: false,
      name: '',
      detail: '',
      price: '',
      category: 'top',
      sourceUrl: url,
      message: `Gagal membaca link: ${error?.message || 'Koneksi ke marketplace dibatasi'}. Silakan isi manual.`,
    };
  }
}
