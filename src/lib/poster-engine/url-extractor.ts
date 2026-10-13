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
 * Cleans raw marketplace product title into clean name & detail.
 */
function cleanProductTitle(rawTitle: string): { name: string; detail: string } {
  let clean = rawTitle
    .replace(/\|\s*(Shopee|Tokopedia|TikTok Shop|Lazada|Blibli).*/gi, '')
    .replace(/^(Jual|Beli|Promo|Diskon|Ready)\s+/i, '')
    .replace(/[\[\(].*?[\]\)]/g, ' ') // remove [BISA COD], (ORIGINAL)
    .replace(/\s+/g, ' ')
    .trim();

  // Split words
  const words = clean.split(' ').filter(w => w.length > 0);
  
  if (words.length <= 3) {
    return {
      name: clean.toUpperCase(),
      detail: 'PREMIUM QUALITY',
    };
  }

  // First 3-4 words for Name, rest for Detail
  const nameParts = words.slice(0, 3).join(' ');
  const detailParts = words.slice(3, 7).join(' ');

  return {
    name: nameParts.toUpperCase(),
    detail: detailParts.toUpperCase() || 'STREETWEAR CATALOG',
  };
}

/**
 * Extracts price from HTML text or meta content.
 */
function extractPriceFromText(text: string): string {
  // Try pattern: Rp 59.000 or Rp. 59.000 or 59.000
  const rpMatch = text.match(/Rp\.?\s*([0-9]{1,3}(?:\.[0-9]{3})+)/i);
  if (rpMatch && rpMatch[1]) {
    return `Rp ${rpMatch[1]}`;
  }

  // Try raw numeric price in JSON-LD or meta: 59000
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
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php) Mozilla/5.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      redirect: 'follow',
      next: { revalidate: 3600 },
    });

    const finalUrl = response.url || url;
    const html = await response.text();

    // 1. Extract OpenGraph Title or <title>
    let rawTitle = '';
    const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i) ||
                         html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:title["']/i);
    if (ogTitleMatch && ogTitleMatch[1]) {
      rawTitle = ogTitleMatch[1];
    } else {
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      if (titleMatch && titleMatch[1]) {
        rawTitle = titleMatch[1];
      }
    }

    // 2. Extract OpenGraph Image
    let photoUrl = '';
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i) ||
                         html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:image["']/i);
    if (ogImageMatch && ogImageMatch[1]) {
      photoUrl = ogImageMatch[1];
    }

    // 3. Extract Price
    let price = extractPriceFromText(html);

    // Fallback: If title couldn't be parsed from HTML, extract from URL slug
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

    const category = detectOutfitCategory(rawTitle + ' ' + finalUrl);

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

    const { name, detail } = cleanProductTitle(rawTitle);

    return {
      success: true,
      name,
      detail,
      price,
      category,
      photoUrl: photoUrl || undefined,
      sourceUrl: url,
      message: 'Data produk & kategori berhasil diambil otomatis dari link!',
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
        const { name, detail } = cleanProductTitle(slug);
        const category = detectOutfitCategory(slug);
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
