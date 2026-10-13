import { PosterInputData, PosterGeneratedResult, PosterOutfitItem, OutfitItemCategory } from '@/types/poster';

export const OUTFIT_CATEGORY_LABELS: Record<
  OutfitItemCategory,
  { label: string; icon: string; short: string }
> = {
  top: { label: 'Baju / Atasan', icon: '👕', short: 'Baju' },
  bottom: { label: 'Celana / Bawahan', icon: '👖', short: 'Celana' },
  footwear: { label: 'Sepatu / Alas Kaki', icon: '👟', short: 'Sepatu' },
  bag: { label: 'Tas / Slingbag', icon: '🎒', short: 'Tas' },
  accessory: { label: 'Aksesori / Jam / Topi', icon: '⌚', short: 'Aksesori' },
  other: { label: 'Item Tambahan', icon: '🏷️', short: 'Item' },
};

/**
 * Synthesizes an English clothing phrase from user's item name, detail, and category.
 */
function synthesizeOutfitItemEnglish(item: PosterOutfitItem): string {
  const name = item.name.trim().toLowerCase();
  const detail = item.detail.trim().toLowerCase();

  let roleNote = '';
  if (item.category === 'top') roleNote = 'as top';
  else if (item.category === 'bottom') roleNote = 'as bottoms';
  else if (item.category === 'footwear') roleNote = 'as footwear';

  const phrase = (name && detail) ? `${detail} ${name}` : (detail || name || 'apparel item');
  return roleNote ? `${phrase} ${roleNote}` : phrase;
}

/**
 * Builds the full outfit description for the monkey model in anatomical order.
 */
function buildFullOutfitDescription(items: PosterOutfitItem[]): string {
  // Order items logically: top -> bottom -> footwear -> bag -> accessory
  const categoryOrder: OutfitItemCategory[] = ['top', 'bottom', 'footwear', 'bag', 'accessory', 'other'];
  const sorted = [...items].sort((a, b) => {
    const idxA = categoryOrder.indexOf(a.category || 'other');
    const idxB = categoryOrder.indexOf(b.category || 'other');
    return idxA - idxB;
  });

  const parts = sorted.map(synthesizeOutfitItemEnglish);
  if (parts.length === 0) {
    return 'coordinated contemporary urban streetwear outfit';
  }
  return parts.join(', ');
}

export const NEGATIVE_PROMPT_POSTER = `No hologram effects, no neon, no cartoon, no anime, no robotic armor,
no futuristic costume, no glowing garments, no transparent clothing,
no plastic-looking fabric, no distorted anatomy, no duplicate limbs,
no malformed hands, no incorrect footwear, no mismatched product cards,
no inconsistent garment colors, no cluttered interface, no excessive
lens flare, no unreadable text, no misspelled words, no random brand
logos, no fake product endorsements, no fabricated exact prices beyond
the given list, no invented purchase links, no cropped feet,
no unnecessary watermark.`.trim();

/**
 * Generates the complete Logika Anak Bekasi Poster Package.
 */
export function generatePosterPrompt(data: PosterInputData): PosterGeneratedResult {
  const subtitle = data.subtitle.trim() || 'Coba lo liat !!!';
  const stamp = data.stampText.trim().toUpperCase() || 'KAMU KEREN';
  const punchline1 = data.punchlineLine1.trim().toUpperCase() || 'SEKARANG KERENAN';
  const punchline2 = data.punchlineLine2.trim().toUpperCase() || 'MONYET INI APA ELU?';
  const cta = data.ctaBadge.trim().toUpperCase() || 'KUY CEK LINK DI BIO';

  // Clickbait headline block
  const clickbaitBlock = data.clickbaitHeadline.trim()
    ? `\nBelow the subtitle, a HUGE bold white uppercase clickbait headline, spelled EXACTLY: '${data.clickbaitHeadline.trim().toUpperCase()}'.\n`
    : '';

  // Full outfit synthesis
  const fullOutfitDesc = buildFullOutfitDescription(data.items);

  // Cards block (CARD 01 .. CARD 0N)
  const cardsBlock = data.items
    .map((item, index) => {
      const numStr = String(index + 1).padStart(2, '0');
      const codeStr = item.code?.trim() ? `[${item.code.trim()}] ` : `[#${numStr}] `;
      const nameStr = item.name.trim().toUpperCase() || `ITEM ${numStr}`;
      const detailStr = item.detail.trim().toUpperCase() || 'DETAIL';
      const priceStr = item.price.trim() || 'Rp -';
      return `CARD ${numStr} ${codeStr}'${nameStr}' / '${detailStr}' / '${priceStr}'`;
    })
    .join('\n');

  // Main Prompt (BAGIAN B)
  const mainPrompt = `Photorealistic fashion outfit sheet poster, vertical 4:5, clean professional
photography catalog style, dark charcoal studio background.

TITLE at top in bold white uppercase: 'LOGIKA ANAK BEKASI',
subtitle directly underneath in smaller white text: '${subtitle}'.
${clickbaitBlock}
TOP-RIGHT CORNER: a cool Gen-Z style circular stamp badge, slightly tilted
like a real rubber stamp, bright yellow-gold circle with bold black checkmark
in the center and the words '${stamp}' in bold black uppercase curved along
the circle, subtle glow, slightly distressed stamp texture.

LEFT SIDE: full-body photorealistic long-tailed macaque monkey standing
upright like a confident human fashion model, head to feet fully visible,
wearing the complete coordinated outfit from the attached outfit photos:
${fullOutfitDesc}.
Cool confident model pose, hands in pockets, looking at camera with a smug
cool expression. The monkey's face, fur color and pattern must match the
character reference photo EXACTLY — do not beautify or alter it.

RIGHT SIDE: neat vertical stack of clean product breakdown cards (white
backgrounds) with isolated studio photos of each item. Each card shows item
photo, item name, material/detail, and bold price:
${cardsBlock}
Every product photo must match the item worn by the monkey in design,
proportions, material, and color.

BOTTOM SECTION: large bold punchline in uppercase:
'${punchline1}' in white on first line,
'${punchline2}' in bright yellow-gold on second line.
Directly below, a bright yellow-gold rounded rectangular badge containing
black bold uppercase text '${cta}'.

All text perfectly legible, no typos, spelled EXACTLY as given.
Premium commercial fashion photography, realistic fur and fabric textures,
soft studio lighting.`.trim();

  // Formatted BAGIAN A with explicit item category label and item code
  let formattedA = `FOTO KARAKTER : [pakai foto referensi monyet streetwear — LOCKED]\n\n`;
  data.items.forEach((item, idx) => {
    const n = idx + 1;
    const catMeta = OUTFIT_CATEGORY_LABELS[item.category || 'other'];
    const itemCode = item.code?.trim() || `#${String(n).padStart(2, '0')}`;
    formattedA += `FOTO ITEM ${n} [${catMeta.icon} ${catMeta.label.toUpperCase()}] : [${item.photoName || item.photoUrl ? 'Foto terlampir' : 'Foto produk ' + item.name}]\n`;
    formattedA += `KODE ITEM ${n}   : ${itemCode}\n`;
    formattedA += `NAMA ITEM ${n}   : ${item.name || '-'}\n`;
    formattedA += `DETAIL ITEM ${n} : ${item.detail || '-'}\n`;
    formattedA += `HARGA ITEM ${n}  : ${item.price || '-'}\n\n`;
  });
  if (data.clickbaitHeadline.trim()) {
    formattedA += `JUDUL CLICKBAIT : ${data.clickbaitHeadline.trim()}\n`;
  }
  formattedA += `SUBTITLE          : ${subtitle}\n`;
  formattedA += `PUNCHLINE BARIS 1 : ${punchline1}\n`;
  formattedA += `PUNCHLINE BARIS 2 : ${punchline2}\n`;
  formattedA += `CTA BADGE         : ${cta}\n`;
  formattedA += `STAMP             : ${stamp}\n`;

  // Viral Social Caption
  const itemsSummary = data.items
    .map(it => {
      const cat = OUTFIT_CATEGORY_LABELS[it.category || 'other'];
      return `${cat.icon} ${it.name} (${it.price})`;
    })
    .join('\n');

  const socialCaption = `Coba lo liat... Sekarang kerenan monyet ini apa elu? 😭🔥

Spill outfit breakdown edisi Logika Anak Bekasi:
${itemsSummary}

Gak usah gengsi, mumpung harganya masih masuk akal dan ready stock di Shopee.

👉 ${cta} (cek link di bio untuk outfit ini) 🛒✨

#logikaanakbekasi #spilloutfit #racunshopee #shopeehaul #ootdcowok #streetwearindo #affiliateshopee`;

  return {
    mainPrompt,
    negativePrompt: NEGATIVE_PROMPT_POSTER,
    fullOutfitDescriptionEnglish: fullOutfitDesc,
    formattedBagianA: formattedA,
    socialCaption,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Default preset matching Bagian D in the master prompt with explicit categories.
 */
export const DEFAULT_POSTER_PRESET: PosterInputData = {
  subtitle: 'Coba lo liat !!!',
  clickbaitHeadline: 'JANGAN SCROLL DULU!',
  punchlineLine1: 'SEKARANG KERENAN',
  punchlineLine2: 'MONYET INI APA ELU?',
  ctaBadge: 'KUY CEK LINK DI BIO',
  stampText: 'KAMU KEREN',
  shopeeBioLink: '',
  items: [
    {
      id: 'item-1',
      category: 'top', // 👕 Baju
      code: '#01',
      name: 'OVERSIZED TEE',
      detail: 'BLACK COTTON',
      price: 'Rp 59.000',
    },
    {
      id: 'item-2',
      category: 'bottom', // 👖 Celana
      code: '#02',
      name: 'RELAXED CARGO',
      detail: 'OLIVE GREEN',
      price: 'Rp 129.000',
    },
    {
      id: 'item-3',
      category: 'footwear', // 👟 Sepatu
      code: '#03',
      name: 'LOW-TOP SNEAKERS',
      detail: 'OFF-WHITE',
      price: 'Rp 149.000',
    },
    {
      id: 'item-4',
      category: 'bag', // 🎒 Tas
      code: '#04',
      name: 'CROSSBODY BAG',
      detail: 'MATTE BLACK',
      price: 'Rp 79.000',
    },
    {
      id: 'item-5',
      category: 'accessory', // ⌚ Aksesori
      code: '#05',
      name: 'MINIMAL WATCH',
      detail: 'DARK FINISH',
      price: 'Rp 99.000',
    },
  ],
};
