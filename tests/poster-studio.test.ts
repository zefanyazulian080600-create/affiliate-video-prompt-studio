import { describe, it, expect } from 'vitest';
import {
  generatePosterPrompt,
  DEFAULT_POSTER_PRESET,
  NEGATIVE_PROMPT_POSTER,
} from '../src/lib/poster-engine/poster-generator';
import { detectOutfitCategory } from '../src/lib/poster-engine/url-extractor';
import { PosterInputData } from '../src/types/poster';

describe('Logika Anak Bekasi — Poster Prompt Generator', () => {
  it('1. Generates complete default preset matching Bagian D specifications', () => {
    const result = generatePosterPrompt(DEFAULT_POSTER_PRESET);

    // Title & subtitle
    expect(result.mainPrompt).toContain("TITLE at top in bold white uppercase: 'LOGIKA ANAK BEKASI'");
    expect(result.mainPrompt).toContain("subtitle directly underneath in smaller white text: 'Coba lo liat !!!'");

    // Clickbait block
    expect(result.mainPrompt).toContain("Below the subtitle, a HUGE bold white uppercase clickbait headline, spelled EXACTLY: 'JANGAN SCROLL DULU!'");

    // Stamp
    expect(result.mainPrompt).toContain("'KAMU KEREN' in bold black uppercase curved along");

    // Monkey character & outfit synthesis
    expect(result.mainPrompt).toContain('full-body photorealistic long-tailed macaque monkey standing');
    expect(result.mainPrompt).toContain('black cotton oversized tee as top');
    expect(result.mainPrompt).toContain('olive green relaxed cargo as bottoms');
    expect(result.mainPrompt).toContain('off-white low-top sneakers as footwear');

    // Cards breakdown (5 items with code #nomor)
    expect(result.mainPrompt).toContain("CARD 01 [#01] 'OVERSIZED TEE' / 'BLACK COTTON' / 'Rp 59.000'");
    expect(result.mainPrompt).toContain("CARD 02 [#02] 'RELAXED CARGO' / 'OLIVE GREEN' / 'Rp 129.000'");
    expect(result.mainPrompt).toContain("CARD 03 [#03] 'LOW-TOP SNEAKERS' / 'OFF-WHITE' / 'Rp 149.000'");
    expect(result.mainPrompt).toContain("CARD 04 [#04] 'CROSSBODY BAG' / 'MATTE BLACK' / 'Rp 79.000'");
    expect(result.mainPrompt).toContain("CARD 05 [#05] 'MINIMAL WATCH' / 'DARK FINISH' / 'Rp 99.000'");

    // Punchlines & CTA
    expect(result.mainPrompt).toContain("'SEKARANG KERENAN' in white on first line");
    expect(result.mainPrompt).toContain("'MONYET INI APA ELU?' in bright yellow-gold on second line");
    expect(result.mainPrompt).toContain("black bold uppercase text 'KUY CEK LINK DI BIO'");

    // Negative prompt
    expect(result.negativePrompt).toBe(NEGATIVE_PROMPT_POSTER);
    expect(result.negativePrompt).toContain('No hologram effects, no neon, no cartoon');
    expect(result.negativePrompt).toContain('no unnecessary watermark.');
  });

  it('2. Omit clickbait block when headline is empty', () => {
    const dataWithoutClickbait: PosterInputData = {
      ...DEFAULT_POSTER_PRESET,
      clickbaitHeadline: '',
    };
    const result = generatePosterPrompt(dataWithoutClickbait);
    expect(result.mainPrompt).not.toContain('clickbait headline');
  });

  it('3. Handles flexible item counts (e.g. 3 items only)', () => {
    const data3Items: PosterInputData = {
      ...DEFAULT_POSTER_PRESET,
      items: DEFAULT_POSTER_PRESET.items.slice(0, 3),
    };
    const result = generatePosterPrompt(data3Items);
    expect(result.mainPrompt).toContain("CARD 01 [#01] 'OVERSIZED TEE'");
    expect(result.mainPrompt).toContain("CARD 02 [#02] 'RELAXED CARGO'");
    expect(result.mainPrompt).toContain("CARD 03 [#03] 'LOW-TOP SNEAKERS'");
    expect(result.mainPrompt).not.toContain('CARD 04');
    expect(result.mainPrompt).not.toContain('CARD 05');
  });

  it('4. Generates social media caption with bio link and hashtag set', () => {
    const result = generatePosterPrompt(DEFAULT_POSTER_PRESET);
    expect(result.socialCaption).toContain('Sekarang kerenan monyet ini apa elu?');
    expect(result.socialCaption).toContain('cek link di bio untuk outfit ini');
    expect(result.socialCaption).toContain('#logikaanakbekasi');
  });

  it('5. Detects outfit categories accurately from product terms', () => {
    expect(detectOutfitCategory('Kaos Oversized Pria Hitam')).toBe('top');
    expect(detectOutfitCategory('Kemeja Flannel Pria Kotak-kotak')).toBe('top');
    expect(detectOutfitCategory('Celana Cargo Panjang Pria Relaxed')).toBe('bottom');
    expect(detectOutfitCategory('Celana Jeans Denim Straight')).toBe('bottom');
    expect(detectOutfitCategory('Sepatu Sneakers Pria Putih Casual')).toBe('footwear');
    expect(detectOutfitCategory('Sandal Gunung Outdoor')).toBe('footwear');
    expect(detectOutfitCategory('Tas Selempang Crossbody Bag')).toBe('bag');
    expect(detectOutfitCategory('Backpack Laptop Pria')).toBe('bag');
    expect(detectOutfitCategory('Jam Tangan Analog Pria')).toBe('accessory');
    expect(detectOutfitCategory('Topi Baseball Cap')).toBe('accessory');
  });

  it('6. Clearly annotates outfit roles (baju, celana, sepatu, etc.) and item code in Bagian A output', () => {
    const result = generatePosterPrompt(DEFAULT_POSTER_PRESET);
    expect(result.formattedBagianA).toContain('FOTO ITEM 1 [👕 BAJU / ATASAN]');
    expect(result.formattedBagianA).toContain('KODE ITEM 1   : #01');
    expect(result.formattedBagianA).toContain('FOTO ITEM 2 [👖 CELANA / BAWAHAN]');
    expect(result.formattedBagianA).toContain('KODE ITEM 2   : #02');
    expect(result.formattedBagianA).toContain('FOTO ITEM 3 [👟 SEPATU / ALAS KAKI]');
    expect(result.formattedBagianA).toContain('KODE ITEM 3   : #03');
    expect(result.formattedBagianA).toContain('FOTO ITEM 4 [🎒 TAS / SLINGBAG]');
    expect(result.formattedBagianA).toContain('KODE ITEM 4   : #04');
    expect(result.formattedBagianA).toContain('FOTO ITEM 5 [⌚ AKSESORI / JAM / TOPI]');
    expect(result.formattedBagianA).toContain('KODE ITEM 5   : #05');
  });

  it('7. Supports custom manual item codes (e.g. #14, #spill-22)', () => {
    const customData: PosterInputData = {
      ...DEFAULT_POSTER_PRESET,
      items: [
        {
          ...DEFAULT_POSTER_PRESET.items[0],
          code: '#14',
        },
      ],
    };
    const result = generatePosterPrompt(customData);
    expect(result.mainPrompt).toContain("CARD 01 [#14] 'OVERSIZED TEE'");
    expect(result.formattedBagianA).toContain('KODE ITEM 1   : #14');
  });
});
