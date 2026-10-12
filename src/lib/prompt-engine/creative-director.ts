import { ProductProfile, CreativeConcept, MarketingAngleFormat } from '@/types';

/**
 * Creative Director Engine: Thinks like an advertising film director and direct-response marketer.
 * Tailors marketing format and cinematic direction to the specific product profile.
 */
export function generateCreativeConcept(product: ProductProfile): CreativeConcept {
  const cat = product.category;

  let format: MarketingAngleFormat = 'Problem-Solution';
  let bigIdea = `Solusi esensial harian yang memadukan fungsi praktis dan estetika modern untuk ${product.targetAudience}.`;
  let creativeAngle = 'Relatable problem-solving dengan transisi mulus ke demonstrasi kualitas fisik produk.';
  let visualHookAngle = 'Ekspresi dilema atau kebutuhan mendesak yang langsung dijawab dengan kehadiran produk.';
  let productRevealMoment = 'Hero shot dramatis pada detik ke-3 hingga ke-6, menonjolkan tekstur dan logo produk.';
  let pacingAndRhythm = 'Dinamis dan ritmis: cepat pada hook pembuka, stabil saat demo produk, dan tegas saat CTA.';
  let cameraLanguage = 'Kombinasi intimate medium shot, close-up tekstur, dan smooth tracking camera movement.';
  let lightingMood = 'Warm natural window light dipadu soft diffused commercial fill light, high contrast aesthetic.';
  let callToAction = 'Klik tautan keranjang kuning di bawah untuk cek ketersediaan ukuran dan promo terbatas hari ini!';
  let shopeeAffiliateAnchor = 'Cek keranjang kuning sekarang sebelum kehabisan voucher diskon!';

  if (cat === 'Alas Kaki / Footwear') {
    format = 'Outfit Styling / Transformation';
    bigIdea = `Upgrade gaya instan dari casual santai hingga smart-casual tanpa mengorbankan kenyamanan kaki.`;
    creativeAngle = 'Perjalanan langkah kaki talent dari rutinitas harian dengan sepatu yang ringan dan empuk.';
    visualHookAngle = 'Close-up langkah kaki mendarat di lantai dengan pantulan lembut, disusul transisi dinamis.';
    productRevealMoment = 'Detik ke-3: low-angle hero reveal sepatu putih bersih dengan detail sol dan jahitan presisi.';
    pacingAndRhythm = 'Upbeat dan energik, mengikuti langkah ritmis kaki talent.';
    cameraLanguage = 'Low angle tracking shot, orbit camera di sekitar sepatu, macro shot fleksibilitas sol.';
    lightingMood = 'Crisp morning daylight, clean reflections pada permukaan sepatu.';
    callToAction = 'Klik keranjang kuning di kiri bawah untuk pilih ukuranmu sebelum stok habis!';
    shopeeAffiliateAnchor = 'Link promo ada di keranjang kuning!';
  } else if (cat === 'Kecantikan & Skincare') {
    format = 'Satisfying Reveal';
    bigIdea = `Ritual perawatan kulit harian yang menenangkan dengan tekstur mewah dan hasil segar alami.`;
    creativeAngle = 'Sensory beauty experience: fokus pada sensasi tetesan, kilau kulit sehat, dan formula ringan.';
    visualHookAngle = 'Macro shot tetesan formula menyentuh ujung jari atau kulit dengan pencahayaan glowing.';
    productRevealMoment = 'Detik ke-2: Kemasan botol elegan terangkat anggun dengan pantulan cahaya lembut.';
    pacingAndRhythm = 'Smooth, soothing, dan memanjakan mata, visual ASMR aesthetic.';
    cameraLanguage = 'Extreme close-up macro, silky slow pan, 50mm portrait lens dengan creamy bokeh.';
    lightingMood = 'Soft diffused morning bathroom/vanity glow, ethereal backlighting.';
    callToAction = 'Cek keranjang kuning sekarang untuk checkout botol original bergaransi resmi!';
    shopeeAffiliateAnchor = 'Klik keranjang kuning untuk amankan harga promo!';
  } else if (cat === 'Gadget & Aksesori Elektronik') {
    format = 'Product Demonstration';
    bigIdea = `Peningkatan efisiensi kerja dan hiburan audio/visual tanpa hambatan kabel atau latensi.`;
    creativeAngle = 'Futuristic yet practical: menunjukkan respon instan, ergonomi, dan build quality solid.';
    visualHookAngle = 'Bukaan case cepat dengan lampu indikator menyala seketika dan talent tersenyum spontan.';
    productRevealMoment = 'Detik ke-3: Gadget terpasang sempurna, siap digunakan dengan sudut presisi.';
    pacingAndRhythm = 'Snappy, modern tech pacing, transisi cepat berenergi.';
    cameraLanguage = 'Snappy zoom-in, dynamic rotational pan, macro shot port dan tombol fisik.';
    lightingMood = 'Cool tone modern ambient with subtle neon or clean white edge lighting.';
    callToAction = 'Jangan tunggu kehabisan! Klik keranjang kuning untuk klaim voucher cashback gadget!';
    shopeeAffiliateAnchor = 'Cek keranjang kuning di bawah!';
  } else if (cat === 'Tas & Aksesori Fashion') {
    format = 'Daily Life POV';
    bigIdea = `Teman mobilitas harian yang muat segala kebutuhan penting dengan siluet tetap ramping dan stylish.`;
    creativeAngle = 'What fits inside my bag: kepraktisan kompartemen saat bersiap beraktivitas.';
    visualHookAngle = 'Talent membuka ritsleting dengan gerakan lancar, memperlihatkan kompartemen rapi.';
    productRevealMoment = 'Detik ke-4: Tas disampirkan di bahu dengan outfit matching yang elegan.';
    pacingAndRhythm = 'Lively lifestyle rhythm, transisi estetik bergaya vlog minimalis.';
    cameraLanguage = 'Point-of-view (POV) angle, over-the-shoulder shot, medium waist-up commercial framing.';
    lightingMood = 'Bright modern cafe ambiance, natural soft daylight.';
    callToAction = 'Yuk kembaran tas! Cek warna favoritmu di keranjang kuning sekarang!';
    shopeeAffiliateAnchor = 'Klik keranjang kuning untuk pilihan warna lengkap!';
  } else if (cat === 'Makanan & Minuman') {
    format = 'Satisfying Reveal';
    bigIdea = `Sensasi kenikmatan autentik yang menggugah selera langsung sejak gigitan atau tegukan pertama.`;
    creativeAngle = 'Crisp, appetizing, mouth-watering visual appeal dengan tekstur renyah/segar terlihat nyata.';
    visualHookAngle = 'Suara/visual kerenyah-renyahan saat kemasan dibuka atau produk dipatahkan.';
    productRevealMoment = 'Detik ke-2: Produk tumpah/tersaji menggoda dengan kepulan aroma atau remahan renyah.';
    pacingAndRhythm = 'High sensory excitement, tempo cepat menggoda selera.';
    cameraLanguage = 'Macro close-up, table-level tilt shot, slow motion bite reveal.';
    lightingMood = 'Warm golden food photography lighting, rich saturated tones.';
    callToAction = 'Stok camilanmu sekarang sebelum kehabisan promo bundle di keranjang kuning!';
    shopeeAffiliateAnchor = 'Checkout langsung di keranjang kuning!';
  }

  return {
    bigIdea,
    format,
    creativeAngle,
    visualHookAngle,
    productRevealMoment,
    pacingAndRhythm,
    cameraLanguage,
    lightingMood,
    callToAction,
    shopeeAffiliateAnchor,
  };
}
