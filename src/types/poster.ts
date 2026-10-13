export interface PosterOutfitItem {
  id: string;
  name: string;
  detail: string;
  price: string;
  photoUrl?: string;
  photoName?: string;
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
