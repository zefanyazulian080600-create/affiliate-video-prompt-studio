import { ProductProfile } from '@/types';

/**
 * Parses freeform Indonesian product input into structured ProductProfile.
 * Extracts brand, category, benefits, target audience, and sets safe claim boundaries.
 */
export function analyzeProductInput(rawInput: string): ProductProfile {
  const clean = rawInput.trim();
  const lower = clean.toLowerCase();

  // 1. Detect Category
  let category = 'Fashion & Lifestyle';
  if (lower.includes('sepatu') || lower.includes('sneaker') || lower.includes('sandal') || lower.includes('boots')) {
    category = 'Alas Kaki / Footwear';
  } else if (lower.includes('skincare') || lower.includes('serum') || lower.includes('toner') || lower.includes('sunscreen') || lower.includes('facial') || lower.includes('moisturizer')) {
    category = 'Kecantikan & Skincare';
  } else if (lower.includes('tas') || lower.includes('backpack') || lower.includes('totebag') || lower.includes('sling bag') || lower.includes('dompet')) {
    category = 'Tas & Aksesori Fashion';
  } else if (lower.includes('baju') || lower.includes('kaos') || lower.includes('kemeja') || lower.includes('hoodie') || lower.includes('jaket') || lower.includes('celana')) {
    category = 'Pakaian & Apparel';
  } else if (lower.includes('hp') || lower.includes('tws') || lower.includes('earphone') || lower.includes('powerbank') || lower.includes('gadget') || lower.includes('casing') || lower.includes('charger')) {
    category = 'Gadget & Aksesori Elektronik';
  } else if (lower.includes('makanan') || lower.includes('snack') || lower.includes('kopi') || lower.includes('minuman') || lower.includes('keripik') || lower.includes('sambal')) {
    category = 'Makanan & Minuman';
  } else if (lower.includes('botol') || lower.includes('tumbler') || lower.includes('lampu') || lower.includes('alat masak') || lower.includes('dapur') || lower.includes('dekorasi')) {
    category = 'Perlengkapan Rumah & Living';
  }

  // 2. Extract Brand Name if present
  let brandName: string | undefined = undefined;
  const brandMatch = clean.match(/(?:brand|merek|merk|dari)\s+([A-Za-z0-9_\-\.]+)/i);
  if (brandMatch && brandMatch[1]) {
    brandName = brandMatch[1].trim();
  }

  // 3. Extract Stated Price if present
  let statedPrice: string | undefined = undefined;
  const priceMatch = clean.match(/(?:rp\.?|harga)\s*([0-9\.,]+(?:rb|ribu|k)?)/i);
  if (priceMatch) {
    statedPrice = priceMatch[0].trim();
  }

  // 4. Derive Product Name
  // Heuristic: First sentence or first 6 words
  const firstSentence = clean.split(/[.,\n]/)[0].trim();
  const productName = firstSentence.length > 3 ? firstSentence : 'Produk Affiliate Unggulan';

  // 5. Extract Core Benefits & Features from sentences
  const sentences = clean.split(/[.,;\n]/).map(s => s.trim()).filter(s => s.length > 5);
  const coreBenefits: string[] = [];
  const keyFeatures: string[] = [];
  const verifiedStrengths: string[] = [];
  const buyerPainPoints: string[] = [];
  const buyerObjections: string[] = [];
  const claimBoundaries: string[] = [
    'Tidak membuat klaim medis instan atau janji hasil penyembuhan tanpa bukti klinis',
    'Pertahankan warna, bentuk, proporsi, dan logo produk persis sesuai data/foto',
    'Gunakan ajakan bertindak (CTA) natural khas Shopee Indonesia',
  ];
  const unspecifiedInfo: string[] = [];

  // Categorize based on keywords
  for (const s of sentences) {
    const sl = s.toLowerCase();
    if (sl.includes('nyaman') || sl.includes('praktis') || sl.includes('awet') || sl.includes('elegan') || sl.includes('glowing') || sl.includes('keren') || sl.includes('ringan')) {
      coreBenefits.push(s);
    } else if (sl.includes('desain') || sl.includes('bahan') || sl.includes('warna') || sl.includes('ukuran') || sl.includes('kapasitas') || sl.includes('fitur')) {
      keyFeatures.push(s);
    } else {
      verifiedStrengths.push(s);
    }
  }

  if (coreBenefits.length === 0) {
    coreBenefits.push(`Kenyamanan dan fungsionalitas optimal untuk aktivitas sehari-hari`);
  }
  if (keyFeatures.length === 0) {
    keyFeatures.push(`Desain modern dan material berkualitas pilihan`);
  }

  // 6. Target Audience Heuristics
  let targetAudience = 'Masyarakat umum dan pengguna aktif Shopee di Indonesia';
  if (lower.includes('mahasiswa') || lower.includes('kuliah') || lower.includes('anak muda') || lower.includes('remaja') || lower.includes('gen z')) {
    targetAudience = 'Mahasiswa, pelajar, dan Gen Z yang mengutamakan gaya hidup trendy dan nilai fungsional ekonomis';
    buyerPainPoints.push('Ingin tampil stylish dan rapi tanpa perlu menguras kantong');
    buyerObjections.push('Apakah barang aslinya sebagus di foto dan tahan lama?');
  } else if (lower.includes('kantor') || lower.includes('kerja') || lower.includes('pekerja muda') || lower.includes('profesional')) {
    targetAudience = 'Pekerja muda dan profesional urban yang membutuhkan solusi praktis dan berkelas untuk mobilitas harian';
    buyerPainPoints.push('Kebutuhan barang yang awet, tidak merepotkan, dan fleksibel untuk berbagai acara');
    buyerObjections.push('Kesesuaian material untuk pemakaian harian berulang kali');
  } else if (lower.includes('ibu') || lower.includes('keluarga') || lower.includes('rumah')) {
    targetAudience = 'Ibu rumah tangga dan keluarga modern yang mencari kemudahan serta efisiensi di rumah';
    buyerPainPoints.push('Kebutuhan peralatan praktis yang menghemat waktu dan tenaga');
    buyerObjections.push('Keamanan produk dan kemudahan dibersihkan/dirawat');
  } else {
    targetAudience = 'Konsumen digital Indonesia yang mencari produk berkualitas dengan ulasan terpercaya';
    buyerPainPoints.push('Bingung memilih produk yang benar-benar sesuai kebutuhan dari sekian banyak pilihan online');
    buyerObjections.push('Keaslian dan kesesuaian fisik produk dengan ekspektasi');
  }

  // 7. Tone of Voice
  let toneOfVoice = 'Relatable, bersahabat, energetik, dan jujur (ala kreator Shopee Video Indonesia)';
  if (category === 'Kecantikan & Skincare') {
    toneOfVoice = 'Edukatif, lembut, jujur, dan berfokus pada kesehatan kulit jangka panjang';
  } else if (category === 'Gadget & Aksesori Elektronik') {
    toneOfVoice = 'Antusias, tech-savvy, solutif, dan to the point';
  }

  // Check unspecified attributes
  if (!lower.includes('bahan') && !lower.includes('material')) {
    unspecifiedInfo.push('Spesifikasi material detail tidak disebutkan secara eksplisit');
  }
  if (!statedPrice) {
    unspecifiedInfo.push('Rentang harga spesifik belum diberikan pengguna');
  }

  return {
    rawInput: clean,
    productName,
    category,
    brandName,
    statedPrice,
    coreBenefits,
    keyFeatures,
    verifiedStrengths,
    targetAudience,
    buyerPainPoints,
    buyerObjections,
    toneOfVoice,
    claimBoundaries,
    unspecifiedInfo,
  };
}
