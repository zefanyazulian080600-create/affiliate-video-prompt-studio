export interface LibraryTemplate {
  id: string;
  title: string;
  category: string;
  targetModel: 'seedance-2.5' | 'omni-flash';
  presetSceneDuration: 10 | 15;
  recommendedTotalDuration: number;
  format: string;
  description: string;
  sampleInput: string;
  tags: string[];
}

export const LIBRARY_TEMPLATES: LibraryTemplate[] = [
  {
    id: 'fashion-sneaker-01',
    title: 'Sneakers Pria Clean Casual Upgrade',
    category: 'Fashion & Alas Kaki',
    targetModel: 'seedance-2.5',
    presetSceneDuration: 10,
    recommendedTotalDuration: 30,
    format: 'Outfit Styling / Transformation',
    description: 'Fokus pada fleksibilitas langkah kaki, detail sol empuk, dan transisi gaya kasual ke smart-casual.',
    sampleInput: 'Sepatu sneakers pria warna putih bersih, desain minimalis modern, bahan knit breathable dengan sol empuk anti-selip. Cocok untuk kuliah, nongkrong, dan kantor kasual. Target mahasiswa dan pekerja muda.',
    tags: ['sneakers', 'fashion pria', 'outfit', 'shopee affiliate'],
  },
  {
    id: 'skincare-serum-glowing',
    title: 'Serum Wajah Mencerahkan (Sensory ASMR)',
    category: 'Kecantikan & Skincare',
    targetModel: 'seedance-2.5',
    presetSceneDuration: 15,
    recommendedTotalDuration: 30,
    format: 'Satisfying Reveal',
    description: 'Menonjolkan tetesan pipet formula ringan, sensasi kilau sehat seketika, dan rasa segar alami.',
    sampleInput: 'Serum pencerah wajah dengan Niacinamide dan Hyaluronic Acid. Tekstur cair ringan cepat meresap, tidak lengket di kulit, memberikan efek dewy glowing natural. Botol kaca pipet 30ml.',
    tags: ['skincare', 'serum', 'glowing', 'beauty UGC'],
  },
  {
    id: 'gadget-tws-noise-cancelling',
    title: 'TWS Earphone True Wireless Bass',
    category: 'Gadget & Elektronik',
    targetModel: 'omni-flash',
    presetSceneDuration: 10,
    recommendedTotalDuration: 30,
    format: 'Product Demonstration',
    description: 'Bukaan case cepat berlampu LED, fitting telinga ergonomis, dan ekspresi kepuasan mendengarkan dentuman bass.',
    sampleInput: 'TWS Bluetooth Earphone warna hitam doff, case compact dengan indikator baterai LED. Bass jernih nendang, mic jernih untuk telepon, tahan baterai hingga 24 jam. Target pekerja dan pecinta musik.',
    tags: ['gadget', 'tws', 'audio', 'tech demo'],
  },
  {
    id: 'fashion-tas-wanita-tote',
    title: 'Totebag Wanita Muat Laptop Multifungsi',
    category: 'Tas & Aksesori',
    targetModel: 'seedance-2.5',
    presetSceneDuration: 10,
    recommendedTotalDuration: 30,
    format: 'Daily Life POV',
    description: 'What fits in my bag: kepraktisan kompartemen laptop, botol minum, dan makeup pouch tanpa terlihat bulky.',
    sampleInput: 'Totebag kulit sintetis premium warna camel, muat laptop 14 inch, resleting lancar, banyak kantong organizer di dalam. Bahan tebal tahan cipratan air. Target wanita karir dan mahasiswi.',
    tags: ['tas wanita', 'totebag', 'POV', 'lifestyle'],
  },
  {
    id: 'home-tumbler-stainless',
    title: 'Tumbler Stainless Tahan Dingin 24 Jam',
    category: 'Perlengkapan Rumah',
    targetModel: 'omni-flash',
    presetSceneDuration: 10,
    recommendedTotalDuration: 20,
    format: 'Problem-Solution',
    description: 'Solusi es batu tidak cepat mencair saat beraktivitas di cuaca panas Indonesia, desain ramping mudah digenggam.',
    sampleInput: 'Tumbler stainless steel vacuum insulated 600ml, tahan dingin hingga 24 jam dan panas 12 jam. Tutup anti-bocor dengan sedotan silikon. Finishing powder coat pastel matte.',
    tags: ['tumbler', 'home living', 'viral shopee', 'problem-solution'],
  },
  {
    id: 'kuliner-snack-keripik-pedas',
    title: 'Keripik Kaca Pedas Renyah Nagih',
    category: 'Makanan & Minuman',
    targetModel: 'seedance-2.5',
    presetSceneDuration: 10,
    recommendedTotalDuration: 20,
    format: 'Satisfying Reveal',
    description: 'Kerenyahan visual saat kemasan dibuka, taburan bumbu cabai daun jeruk gurih melimpah.',
    sampleInput: 'Keripik kaca pedas daun jeruk kemasan pouch ziplock 100gr. Tekstur super tipis dan renyah, bumbu rempah melimpah tidak bikin seret. Target pecinta camilan pedas anak muda.',
    tags: ['snack', 'kuliner', 'camilan pedas', 'unboxing'],
  },
];
