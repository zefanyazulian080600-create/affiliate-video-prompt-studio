export type OutfitItemCategory =
  | 'top'        // 👕 Baju / Atasan
  | 'bottom'     // 👖 Celana / Bawahan
  | 'footwear'   // 👟 Sepatu / Alas Kaki
  | 'bag'        // 🎒 Tas
  | 'accessory'  // ⌚ Aksesori
  | 'other';     // 🏷️ Lainnya

export interface PosterOutfitItem {
  id: string;
  category: OutfitItemCategory;
  name: string;
  detail: string;
  price: string;
  code?: string; // e.g. "#01", "#12", "#nomor"
  photoUrl?: string;
  photoName?: string;
  productUrl?: string;
}

export interface PosterInputData {
  items: PosterOutfitItem[];
  clickbaitHeadline: string;
  subtitle: string;
  punchlineLine1: string;
  punchlineLine2: string;
  ctaBadge: string;
  stampText: string;
  shopeeBioLink?: string;
}

export interface PosterGeneratedResult {
  mainPrompt: string;
  negativePrompt: string;
  fullOutfitDescriptionEnglish: string;
  formattedBagianA: string;
  socialCaption: string;
  timestamp: string;
}
