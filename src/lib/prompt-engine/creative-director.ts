import {
  ProductProfile,
  CreativeConcept,
  MarketingAngleFormat,
  AudioDirection,
  ContentFormatChoice,
  VideoMoodChoice,
} from '@/types';

export interface ConceptOptions {
  contentFormatChoice?: ContentFormatChoice;
  audioDirection?: AudioDirection;
  videoMoodChoice?: VideoMoodChoice;
}

/**
 * Creative Director Engine: Generates tailored campaign concepts,
 * respecting user preferences for content format, audio direction, and mood.
 */
export function generateCreativeConcept(
  product: ProductProfile,
  options?: ConceptOptions
): CreativeConcept {
  const cat = product.category;
  const formatChoice = options?.contentFormatChoice || 'auto';
  const audioDir: AudioDirection = options?.audioDirection || 'voiceover';
  const moodChoice: VideoMoodChoice = options?.videoMoodChoice || 'relatable';

  // Base Defaults
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

  // Format Selection mapping
  if (formatChoice === 'ugc_review') {
    format = 'UGC Testimonial';
    bigIdea = `Review jujur dan autentik ala kreator Shopee: mengungkap kelebihan nyata tanpa rekayasa.`;
    creativeAngle = 'Unfiltered testimonial look, talent mencoba produk langsung di depan kamera dengan gestur spontan.';
    visualHookAngle = 'Talent menatap kamera dengan tatapan antusias: "Jujur ini racun Shopee paling worth it bulan ini!"';
    cameraLanguage = 'Handheld vlog style, natural eye-level framing, intimate medium close-up.';
  } else if (formatChoice === 'unboxing') {
    format = 'Unboxing & First Impression';
    bigIdea = `Sensasi unboxing memuaskan: membuka kemasan baru, mengecek kelengkapan, dan kesan pertama yang memukau.`;
    creativeAngle = 'Step-by-step unboxing: memotong segel, membuka tutup box, melepas pelindung, dan first touch.';
    visualHookAngle = 'Tangan talent membuka segel kotak baru dengan transisi suara renyah dan produk bersinar di dalamnya.';
    cameraLanguage = 'Top-down flat lay perspective shifting smoothly to 45-degree tabletop macro shot.';
  } else if (formatChoice === 'product_showcase') {
    format = 'Material & Detail Focus';
    bigIdea = `Pameran detail kualitas fisik: jahitan, ketebalan bahan, kilau permukaan, dan ketahanan produk.`;
    creativeAngle = 'Macro commercial showcase: menyorot lekukan desain, presisi tombol/sol, dan keaslian material.';
    visualHookAngle = 'Extreme macro close-up tekstur permukaan produk terungkap perlahan di bawah pantulan cahaya premium.';
    cameraLanguage = 'Silky smooth motorized slider push-in, 85mm macro lens, ultra-shallow depth of field.';
  } else if (formatChoice === 'satisfying_asmr') {
    format = 'Satisfying Reveal';
    bigIdea = `Sensory visual ASMR: kepuasan melihat kerapian, kelenturan, atau kemulusan fungsi produk tanpa gangguan.`;
    creativeAngle = 'Hypnotic sensory appeal: gerakan lambat terkontrol, pantulan cahaya halus, dan penekanan tekstur.';
    visualHookAngle = 'Gerakan satisfying pertama: tetesan formula, lenturan sol, atau bukaan magnetik yang sangat mulus.';
    cameraLanguage = 'Slow motion 60fps/120fps look, ultra-smooth fluid gimbal pan, soft bokeh.';
  } else if (formatChoice === 'outfit_styling') {
    format = 'Outfit Styling / Transformation';
    bigIdea = `Transformasi gaya instan (OOTD Upgrade): memadukan produk dengan outfit harian yang stylish.`;
    creativeAngle = 'Fashion lookbook transition: talent mencoba paduan pakaian sebelum mengunci penampilan dengan produk ini.';
    visualHookAngle = 'Langkah kaki berirama atau hentakan sepatu ke lantai memicu transisi outfit seketika.';
    cameraLanguage = 'Low angle tracking camera, full body Dutch angle, snappy rotational whip pan.';
  } else if (formatChoice === 'pov_daily') {
    format = 'Daily Life POV';
    bigIdea = `A Day in My Life POV: menunjukkan bagaimana produk mempermudah aktivitas nyata dari pagi hingga sore.`;
    creativeAngle = 'First-person perspective: penonton merasakan langsung pengalaman memakai dan memegang produk.';
    visualHookAngle = 'POV tangan mengambil produk dari meja kerja atau tas sebelum memulai rutinitas.';
    cameraLanguage = 'First person POV camera, chest mount or over-the-shoulder wide perspective 24mm.';
  } else if (formatChoice === 'cinematic_ad') {
    format = 'Cinematic Commercial';
    bigIdea = `Iklan komersial standar brand mewah: pencahayaan dramatis, siluet elegan, dan tone visual berkelas tinggi.`;
    creativeAngle = 'High production value: moody lighting, rim specular highlights, dan slow confident movements.';
    visualHookAngle = 'Siluet dramatis produk terangkat ke arah cahaya dengan flare sinematik lembut.';
    cameraLanguage = 'Arri Alexa Mini look, Anamorphic lens characteristics, slow cinematic dolly move.';
  } else if (formatChoice === 'relatable_comedy') {
    format = 'Problem-Solution';
    bigIdea = `Situasi kocak dan relatable yang sering dialami audiens, diakhiri solusi cerdas produk ini.`;
    creativeAngle = 'Komedi ekspresif: memperlihatkan penderitaan saat memakai barang lama, disusul kelegaan instan.';
    visualHookAngle = 'Ekspresi frustrasi talent yang dramatis dan lucu, mendadak berhenti saat produk muncul.';
    cameraLanguage = 'Snappy dynamic zoom, whip pan, energetic fast cuts.';
  } else if (formatChoice === 'soft_selling') {
    format = 'Soft Selling';
    bigIdea = `Storytelling santai berfokus pada kenyamanan hidup, di mana produk hadir natural sebagai pendukung.`;
    creativeAngle = 'Cozy lifestyle storytelling: suasana kafe atau rumah yang hangat tanpa paksaan jualan.';
    visualHookAngle = 'Momen tenang talent menikmati harinya dengan produk terintegrasi indah di latar depan.';
    cameraLanguage = 'Gentle eye-level medium framing, warm soft lighting, serene natural pacing.';
  } else {
    // Auto Mode (fallback to category-informed defaults)
    if (cat === 'Alas Kaki / Footwear') {
      format = 'Outfit Styling / Transformation';
      bigIdea = `Upgrade gaya instan dari casual santai hingga smart-casual tanpa mengorbankan kenyamanan kaki.`;
      creativeAngle = 'Perjalanan langkah kaki talent dari rutinitas harian dengan sepatu yang ringan dan empuk.';
      visualHookAngle = 'Close-up langkah kaki mendarat di lantai dengan pantulan lembut, disusul transisi dinamis.';
    } else if (cat === 'Kecantikan & Skincare') {
      format = 'Satisfying Reveal';
      bigIdea = `Ritual perawatan kulit harian yang menenangkan dengan tekstur mewah dan hasil segar alami.`;
      creativeAngle = 'Sensory beauty experience: fokus pada sensasi tetesan, kilau kulit sehat, dan formula ringan.';
      visualHookAngle = 'Macro shot tetesan formula menyentuh ujung jari atau kulit dengan pencahayaan glowing.';
    } else if (cat === 'Gadget & Aksesori Elektronik') {
      format = 'Product Demonstration';
      bigIdea = `Peningkatan efisiensi kerja dan hiburan audio/visual tanpa hambatan kabel atau latensi.`;
      creativeAngle = 'Futuristic yet practical: menunjukkan respon instan, ergonomi, dan build quality solid.';
      visualHookAngle = 'Bukaan case cepat dengan lampu indikator menyala seketika dan talent tersenyum spontan.';
    }
  }

  // Audio Direction adjustments
  if (audioDir === 'music_only') {
    callToAction = 'Teks Layar (ID): "Cek Keranjang Kuning Sekarang!" (Visual storytelling tanpa suara narasi)';
    shopeeAffiliateAnchor = 'Ikon keranjang kuning berkedip lembut di pojok layar';
  } else if (audioDir === 'asmr_foley') {
    callToAction = 'Bisikan halus atau teks minimalis mengarahkan ke keranjang kuning.';
  }

  // Mood adjustments
  if (moodChoice === 'premium') {
    lightingMood = 'Moody high-contrast commercial lighting, dramatic edge backlight, deep blacks and crisp highlights.';
  } else if (moodChoice === 'aesthetic') {
    lightingMood = 'Korean aesthetic soft diffused pastel glow, airy minimalism with natural soft white sunlight.';
  } else if (moodChoice === 'upbeat') {
    lightingMood = 'Bright, punchy, high-key commercial daylight, saturated vibrant colors.';
  } else if (moodChoice === 'cozy') {
    lightingMood = 'Warm amber tones, golden hour sunbeams filtering through curtains, intimate indoor sanctuary.';
  }

  return {
    bigIdea,
    format,
    contentFormatChoice: formatChoice,
    audioDirection: audioDir,
    videoMoodChoice: moodChoice,
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
