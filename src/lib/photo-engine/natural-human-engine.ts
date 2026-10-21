import { FaceLockConfig, BodyLockConfig } from '@/types/photo';

export interface NaturalHumanGuidance {
  skinRealismBlock: string;
  anatomyRealismBlock: string;
  behaviorAndPostureBlock: string;
  environmentalPhysicsBlock: string;
  antiAIEstheticRules: string;
}

export function generateNaturalHumanGuidance(
  faceLock: FaceLockConfig,
  bodyLock: BodyLockConfig,
  realismIntensity: 'natural_iphone' | 'raw_unretouched' | 'subtle_warmth'
): NaturalHumanGuidance {
  const intensityWord =
    realismIntensity === 'raw_unretouched'
      ? '100% foto mentah unretouched tanpa filter kecantikan buatan'
      : realismIntensity === 'subtle_warmth'
      ? 'warna hangat alami dengan gradasi rona kulit autentik'
      : 'tekstur natural kamera smartphone asli';

  // Skin realism block
  const skinSpecifics = faceLock.enabled && faceLock.skinDetail
    ? `- Ciri khas kulit terkonfirmasi: ${faceLock.skinDetail}`
    : '- Permukaan kulit memiliki pori-pori mikro nyata, variasi warna alami, dan tekstur kulit manusia hidup tanpa sentuhan airbrush halus palsu.';

  const skinRealismBlock = `DETAIL MIKRO KULIT MANUSIA ASLI (${intensityWord.toUpperCase()}):
- Permukaan kulit berpori-pori halus alami di area pipi, hidung, dan dahi pada jarak pandang yang wajar, tidak seragam secara kaku dan tidak dihaluskan berlebihan (no airbrushed plastic skin).
- Rona kulit sehat autentik dengan variasi mikroskopis sirkulasi darah bawah kulit (subtle organic subsurface scattering) pada daun telinga, pipi, dan persendian.
${skinSpecifics}
- Tekstur bibir manusia nyata dengan garis lipatan vertikal mikro alami (natural vertical lip creases), lembap dan tidak menyerupai lapisan cat lilin.
- Sedikit bayangan lipatan bawah mata alami (natural tear troughs / aegyo-sal) yang memberikan kedalaman karakter ekspresi hidup.`;

  // Anatomy realism block
  const anatomySpecifics = bodyLock.enabled
    ? `- Proporsi anatomi terkonfirmasi: ${bodyLock.heightAndWeight}. Siluet: ${bodyLock.bodySilhouette}. Dada: ${bodyLock.bustDetail}. Pinggang: ${bodyLock.waistAndMidriff}.`
    : '- Proporsi tubuh manusia proporsional alami dengan distribusi bobot jaringan tubuh sejati yang terpengaruh gravitasi secara fisik.';

  const anatomyRealismBlock = `KONSISTENSI ANATOMI & GRAVITASI TUBUH MANUSIA NYATA:
${anatomySpecifics}
- Seluruh persendian (bahu, siku, pergelangan tangan, pinggul, lutut, dan pergelangan kaki) berada pada rotasi dan sudut yang anatomis masuk akal bagi manusia sungguhan.
- Jari-jari tangan lengkap berjumlah 5 di setiap tangan, berujung lentik alami, posisi jari menggenggam atau rileks secara logis tanpa anomali duplikasi atau bentuk terdistorsi.`;

  // Behavior and posture block
  const behaviorAndPostureBlock = `PERILAKU & POSTUR TUBUH NATURAL (NATURAL HUMAN BEHAVIOR):
- Bahu terbuka santai dan rileks, berat badan terdistribusi secara seimbang dan organik pada kaki atau permukaan tempat bertumpu.
- Tidak berpose kaku seperti patung manekin toko; terdapat asimetri alami yang anggun pada posisi kepala, pundak, dan tangan.
- Ekspresi wajah hangat, ramah, dan bersahaja yang memancarkan pesona santai seorang teman di dunia nyata.`;

  // Environmental physics block
  const glassesNote = faceLock.enabled && faceLock.glasses
    ? `- Kacamata (${faceLock.glasses}) terpasang stabil di pangkal hidung dengan bantalan hidung transparan yang menekan kulit secara wajar.`
    : '';

  const environmentalPhysicsBlock = `FISIKA LINGKUNGAN & INTERAKSI BENDA REALISTIS:
- Interaksi pakaian: kain busana meregang mengikuti kontur tubuh secara realistis; lipatan pakaian organik mengikuti gravitasi saat bergerak.
- Rambut tertata natural dengan helaian anak rambut halus (flyaways & baby hairs) yang mencuat bebas di sekitar puncak kepala dan pelipis.
- Bayangan dan pantulan optik: bayangan jatuh ke arah yang tepat sesuai posisi sumber cahaya alami, tanpa bayangan ganda yang bertentangan.
${glassesNote}`;

  // Anti-AI aesthetic rules
  const antiAIEstheticRules = `PANTANGAN VISUAL ANTI-AI (ZERO ARTIFICIAL ARTIFACTS):
- DILARANG: kulit plastik licin seperti boneka porselen, kulit berminyak berlebihan, wajah terlalu simetris digital.
- DILARANG: mata bersinar buatan (glowing anime eyes), gigi bersinar seragam, rambut seperti gumpalan helm plastik.
- DILARANG: jari tangan berlebih/kurang/menyatu, persendian melengkung di luar batas manusiawi.
- DILARANG: latar belakang yang meleleh, perspektif lantai yang miring aneh, objek melayang tanpa tumpuan.
- DILARANG: efek bokeh ekstrem seperti kamera sinema Hollywood, efek HDR kartun, atau saturasi warna neon yang tidak masuk akal.`;

  return {
    skinRealismBlock,
    anatomyRealismBlock,
    behaviorAndPostureBlock,
    environmentalPhysicsBlock,
    antiAIEstheticRules,
  };
}
