import {
  ProductProfile,
  CreativeConcept,
  MarketingCaptionOption,
  MarketingCaptionsPackage,
} from '@/types';

/**
 * Master Marketing Caption Generator
 * Crafts compelling affiliate captions using proven direct response copywriting frameworks:
 * 1. PAS (Problem - Agitate - Solution)
 * 2. AIDA (Attention - Interest - Desire - Action)
 * 3. BAB (Before - After - Bridge)
 * 4. Storytelling / UGC Viral (Hook - Story - Offer)
 * 5. Curiosity Gap & FOMO (Spill Outfit Viral)
 *
 * Mandatory requirement: Always cleanly concludes with:
 * "Cek link di bio untuk outfit ini"
 */
export function generateMarketingCaptions(
  product: ProductProfile,
  concept: CreativeConcept
): MarketingCaptionsPackage {
  const name = product.productName;
  const benefit = product.coreBenefits[0] || 'kualitas bahan premium dan desain stylish';
  const secondBenefit = product.coreBenefits[1] || 'nyaman banget dipakai beraktivitas seharian';
  const feature = product.keyFeatures[0] || 'detail jahitan rapi dan material awet';
  const target = product.targetAudience || 'kamu yang suka tampil rapi dan stylish';
  const price = product.statedPrice ? `harganya cuma ${product.statedPrice}` : 'harganya super ramah di kantong';
  const mandatoryEnding = 'Cek link di bio untuk outfit ini';

  // Hashtags tailored by category
  const baseHashtags = [
    '#racunshopee',
    '#shopeehaul',
    '#spilloutfit',
    '#ootdindo',
    '#affiliateshopee',
    '#outfitinspo',
    '#rekomendasishopee',
  ];

  if (product.category.toLowerCase().includes('alas kaki') || product.category.toLowerCase().includes('sepatu')) {
    baseHashtags.push('#sneakersindonesia', '#sepatulokal', '#sepatupria');
  } else if (product.category.toLowerCase().includes('skincare') || product.category.toLowerCase().includes('kecantikan')) {
    baseHashtags.push('#skincareroutine', '#glowup', '#racunskincare');
  } else if (product.category.toLowerCase().includes('tas')) {
    baseHashtags.push('#taswanita', '#taspria', '#taslokal');
  } else {
    baseHashtags.push('#fashionstyle', '#localpride', '#stylecasual');
  }

  const hashtagString = baseHashtags.join(' ');

  // 1. Formula PAS (Problem - Agitate - Solution)
  const pasHeadline = `Sering bingung nyari outfit yang simpel tapi tetap kelihatan mahal dan rapi? 😩`;
  const pasBody = `Paling kesel kan kalau udah beli outfit tapi pas dipakai bahannya panas, gampang lecek, dan bikin gak pede seharian.\n\nUntung nemu ${name}! Beneran penyelamat, karena ${benefit} dan ${secondBenefit}. Cocok banget buat ${target} yang mau upgrade penampilan tanpa ribet. Plus ${price}! ✨`;
  const pasFull = `${pasHeadline}\n\n${pasBody}\n\n👉 ${mandatoryEnding} 🛒👇\n\n${hashtagString}`;

  // 2. Formula AIDA (Attention - Interest - Desire - Action)
  const aidaHeadline = `STOP SCROLL! Ini rahasia look aesthetic & rapi yang lagi ramai di Shopee! 🔥`;
  const aidaBody = `Pertama kali pegang ${name}, langsung kaget sama ${feature}. Kualitasnya di luar ekspektasi untuk harga segini!\n\nDipakai nongkrong, kuliah, atau ngantor auto dapet pujian "beli di mana?". Bikin look kamu langsung kelihatan bersih, keren, dan percaya diri seketika. 💯`;
  const aidaFull = `${aidaHeadline}\n\n${aidaBody}\n\n👉 ${mandatoryEnding} 🛒✨\n\n${hashtagString}`;

  // 3. Formula BAB (Before - After - Bridge)
  const babHeadline = `Dulu ngerasa outfit selalu "gitu-gitu aja" dan kurang greget? 🤷‍♂️`;
  const babBody = `Sekarang tinggal mix-and-match pakai ${name}, penampilan langsung naik kelas dalam 5 detik! Look jadi jauh lebih rapi, modern, dan effortless.\n\nGak perlu keluar budget jutaan buat dapet aura mahal kayak gini. Mumpung lagi ada promo dan voucher gratis ongkir,\n\n👉 ${mandatoryEnding}`;
  const babFull = `${babHeadline}\n\n${babBody} 🛒🔥\n\n${hashtagString}`;

  // 4. Formula Storytelling / UGC Viral (Hook - Story - Offer)
  const storyHeadline = `Jujur awalnya skeptis sama racun Shopee yang satu ini... tapi pas paketnya dateng... 😭❤️`;
  const storyBody = `Pas unboxing ${name}, ternyata beneran sebagus itu! ${feature}, dan pas dicobain rasanya ${secondBenefit}. Gak heran kalau review pembeli pada bintang 5 semua.\n\nBuat ${target}, ini wajib masuk wishlist lemari kamu sebelum kehabisan size/warna favorit ya!`;
  const storyFull = `${storyHeadline}\n\n${storyBody}\n\n👉 ${mandatoryEnding} 🛍️✨\n\n${hashtagString}`;

  // 5. Formula Curiosity Gap & FOMO (Spill Outfit Viral)
  const fomoHeadline = `Yang dari kemarin DM minta spill outfit di video, ini dia jawabannya! 👀✨`;
  const fomoBody = `Banyak banget yang salfok sama ${name}. Kuncinya ada di ${benefit} yang bikin look kelihatan clean dan stylish sepanjang hari.\n\n⚠️ Peringatan: Stock di tokonya sering rebutan dan lagi ada potongan harga khusus hari ini aja! Buruan amankan sebelum sold out.`;
  const fomoFull = `${fomoHeadline}\n\n${fomoBody}\n\n👉 ${mandatoryEnding} 🏃‍♂️💨\n\n${hashtagString}`;

  const options: MarketingCaptionOption[] = [
    {
      id: 'caption-aida',
      formulaName: 'Formula AIDA (Attention - Interest - Desire - Action)',
      formulaTag: 'AIDA',
      formulaDescription: 'Rumus klasik paling efektif: Curi perhatian di detik pertama, bangkitkan minat & hasrat memiliki, lalu arahkan ke pembelian.',
      hookHeadline: aidaHeadline,
      bodyText: aidaBody,
      callToAction: mandatoryEnding,
      hashtags: baseHashtags,
      fullCaption: aidaFull,
      copyAdvice: 'Gunakan untuk video unboxing, reveal, atau outfit modeling dengan visual memukau.',
    },
    {
      id: 'caption-pas',
      formulaName: 'Formula PAS (Problem - Agitate - Solution)',
      formulaTag: 'PAS',
      formulaDescription: 'Sangat ampuh menyentuh rasa frustrasi audiens (baju gerah, sepatu sakit, outfit kusam), lalu produk hadir sebagai solusi penyelamat.',
      hookHeadline: pasHeadline,
      bodyText: pasBody,
      callToAction: mandatoryEnding,
      hashtags: baseHashtags,
      fullCaption: pasFull,
      copyAdvice: 'Cocok untuk video "Problem-Solution" atau review kenyamanan pemakaian sehari-hari.',
    },
    {
      id: 'caption-bab',
      formulaName: 'Formula BAB (Before - After - Bridge)',
      formulaTag: 'BAB',
      formulaDescription: 'Menampilkan transformasi nyata sebelum dan sesudah memakai produk, menjembatani impian look pembeli.',
      hookHeadline: babHeadline,
      bodyText: babBody,
      callToAction: mandatoryEnding,
      hashtags: baseHashtags,
      fullCaption: babFull,
      copyAdvice: 'Sempurna untuk video transisi OOTD, make-over outfit, atau komparasi gaya.',
    },
    {
      id: 'caption-story',
      formulaName: 'Formula Storytelling / UGC Viral (Hook - Story - Offer)',
      formulaTag: 'STORY',
      formulaDescription: 'Gaya review personal & jujur dari kreator yang membangun trust tinggi tanpa terasa seperti jualan agresif.',
      hookHeadline: storyHeadline,
      bodyText: storyBody,
      callToAction: mandatoryEnding,
      hashtags: baseHashtags,
      fullCaption: storyFull,
      copyAdvice: 'Paling disukai algoritma TikTok dan Shopee Video karena tingkat komentar & interaksi yang tinggi.',
    },
    {
      id: 'caption-fomo',
      formulaName: 'Formula Curiosity Gap & FOMO (Spill Outfit Viral)',
      formulaTag: 'FOMO',
      formulaDescription: 'Memicu rasa penasaran penonton ("banyak yang minta spill") plus urgensi takut kehabisan stock promosi.',
      hookHeadline: fomoHeadline,
      bodyText: fomoBody,
      callToAction: mandatoryEnding,
      hashtags: baseHashtags,
      fullCaption: fomoFull,
      copyAdvice: 'Bagus untuk memicu checkout cepat dan klik profil bio secara masif.',
    },
  ];

  return {
    mandatoryEnding,
    options,
  };
}
