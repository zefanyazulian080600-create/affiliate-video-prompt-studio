import { describe, it, expect } from 'vitest';
import {
  generatePosterPrompt,
  DEFAULT_POSTER_PRESET,
  NEGATIVE_PROMPT_POSTER,
} from '../src/lib/poster-engine/poster-generator';
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
    expect(result.mainPrompt).toContain('black cotton oversized tee');
    expect(result.mainPrompt).toContain('olive green relaxed cargo');
    expect(result.mainPrompt).toContain('off-white low-top sneakers');

    // Cards breakdown (5 items)
    expect(result.mainPrompt).toContain("CARD 01 'OVERSIZED TEE' / 'BLACK COTTON' / 'Rp 59.000'");
    expect(result.mainPrompt).toContain("CARD 02 'RELAXED CARGO' / 'OLIVE GREEN' / 'Rp 129.000'");
    expect(result.mainPrompt).toContain("CARD 03 'LOW-TOP SNEAKERS' / 'OFF-WHITE' / 'Rp 149.000'");
    expect(result.mainPrompt).toContain("CARD 04 'CROSSBODY BAG' / 'MATTE BLACK' / 'Rp 79.000'");
    expect(result.mainPrompt).toContain("CARD 05 'MINIMAL WATCH' / 'DARK FINISH' / 'Rp 99.000'");

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
    expect(result.mainPrompt).toContain("CARD 01 'OVERSIZED TEE'");
    expect(result.mainPrompt).toContain("CARD 02 'RELAXED CARGO'");
    expect(result.mainPrompt).toContain("CARD 03 'LOW-TOP SNEAKERS'");
    expect(result.mainPrompt).not.toContain('CARD 04');
    expect(result.mainPrompt).not.toContain('CARD 05');
  });

  it('4. Generates social media caption with bio link and hashtag set', () => {
    const result = generatePosterPrompt(DEFAULT_POSTER_PRESET);
    expect(result.socialCaption).toContain('Sekarang kerenan monyet ini apa elu?');
    expect(result.socialCaption).toContain('cek link di bio untuk outfit ini');
    expect(result.socialCaption).toContain('#logikaanakbekasi');
  });
});
