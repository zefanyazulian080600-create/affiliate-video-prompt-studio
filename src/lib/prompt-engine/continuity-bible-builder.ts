import {
  ProductProfile,
  CharacterReference,
  ProductImageReference,
  ContinuityBible,
  CharacterLock,
  ProductLock,
  EnvironmentLock,
  CinematographyLock,
  StoryLock,
} from '@/types';

/**
 * Continuity Bible Builder: Establishes non-negotiable visual invariants
 * to ensure cross-scene continuity for Seedance 2.5 and Omni Flash workflows.
 */
export function buildContinuityBible(
  product: ProductProfile,
  characterRef?: CharacterReference,
  productImages: ProductImageReference[] = []
): ContinuityBible {
  // 1. Character Lock
  let characterLock: CharacterLock;

  if (characterRef && characterRef.isCustomProvided) {
    characterLock = {
      visualIdentity: `${characterRef.name || 'Established custom talent'}, Indonesian/Southeast Asian appearance, estimated age ${characterRef.estimatedAgeRange || '22-26'}, ${characterRef.genderAppearance || 'female'}.`,
      faceAndHair: characterRef.hairStyleAndColor || 'Natural neat shoulder-length dark brown hair, soft expressive eyes, friendly approachable facial features.',
      wardrobeAndAccessories: characterRef.wardrobe || 'Minimalist cream cotton collared shirt, tailored neutral trousers, subtle silver wrist watch.',
      postureAndVibe: characterRef.postureAndVibe || 'Confident, cheerful, relatable Shopee content creator demeanor.',
      distinguishingFeatures: characterRef.distinguishingFeatures || 'Consistent facial geometry, warm skin undertone, natural grooming.',
      voiceOrTone: 'Warm, conversational colloquial Indonesian with cheerful inflections.',
    };
  } else {
    // Context-sensitive default character based on product category
    const isFashionMen = product.rawInput.toLowerCase().includes('pria') || product.rawInput.toLowerCase().includes('men');
    if (isFashionMen) {
      characterLock = {
        visualIdentity: '23-year-old Indonesian young adult male, athletic lean build, friendly college student / creative worker aura.',
        faceAndHair: 'Modern clean fade haircut with textured dark hair, clean shaven, confident warm smile.',
        wardrobeAndAccessories: 'Oversized charcoal grey t-shirt, relaxed olive cargo pants, minimalist white canvas socks.',
        postureAndVibe: 'Effortlessly cool, relaxed, energetic, relatable lifestyle presence.',
        distinguishingFeatures: 'Light brown Southeast Asian skin tone, natural facial proportions.',
        voiceOrTone: 'Energetic, direct, relatable Indonesian spoken casually.',
      };
    } else {
      characterLock = {
        visualIdentity: '22-year-old Indonesian female creator, glowing natural complexion, approachable and stylish presence.',
        faceAndHair: 'Soft shoulder-length dark wavy hair, radiant smile, light natural Korean-style makeup with coral lip tint.',
        wardrobeAndAccessories: 'Casual beige oversized cardigan over white crop top, light blue high-waisted denim jeans.',
        postureAndVibe: 'Warm, charming, spontaneous, highly relatable to young Shopee shoppers.',
        distinguishingFeatures: 'Natural warm honey-beige skin tone, authentic expressive gestures.',
        voiceOrTone: 'Friendly, upbeat, friendly Indonesian affiliate style.',
      };
    }
  }

  // 2. Product Lock
  const primaryImg = productImages.find(img => img.isPrimary) || productImages[0];
  const rules: string[] = [
    `DO NOT mutate product shape, color tones, or silhouette.`,
    `PRESERVE exact product surface textures and branding as defined in product reference.`,
    `NO floating items, unintended duplicates, or spontaneous design alterations between cuts.`,
  ];

  if (product.brandName) {
    rules.push(`Keep brand insignia '${product.brandName}' strictly authentic; do not invent artificial text.`);
  }

  const productLock: ProductLock = {
    shapeAndProportions: `Authentic geometric proportions of ${product.productName}; true-to-life dimensions and weight.`,
    colorAndFinish: primaryImg
      ? `Original colorway and finish strictly matching product photo '${primaryImg.fileName}'.`
      : `Pristine clean finish, exact physical color palette of ${product.productName}.`,
    logoAndBranding: product.brandName
      ? `Original '${product.brandName}' insignia clearly positioned on designated product location.`
      : `Subtle authentic minimalist branding as specified in product reference.`,
    materialAndTexture: product.keyFeatures.join(', ') || 'High quality commercial-grade fabric and finish.',
    packagingState: 'Factory fresh, clean edges, zero tears or damages, realistic unboxing status.',
    rules,
  };

  // 3. Environment Lock
  let environmentLock: EnvironmentLock;
  if (product.category === 'Alas Kaki / Footwear') {
    environmentLock = {
      location: 'Contemporary minimalist sunlit urban cafe patio with clean light grey terrazzo flooring and oak wood furniture.',
      timeOfDay: 'Mid-morning golden daylight (10:00 AM).',
      weatherOrAtmosphere: 'Breezy, vibrant, clean metropolitan lifestyle atmosphere.',
      backgroundElements: 'Subtle potted tropical monsteras, blurred soft cafe aesthetic in background.',
      lightingStyle: 'Natural directional soft sunlight from screen left with gentle ambient bounce fill.',
      colorPalette: 'Neutral tones: light wood oak, warm concrete grey, subtle foliage green.',
    };
  } else if (product.category === 'Kecantikan & Skincare') {
    environmentLock = {
      location: 'Aesthetic Scandinavian-style bathroom vanity with marble countertop and illuminated round mirror.',
      timeOfDay: 'Soft morning light (08:30 AM).',
      weatherOrAtmosphere: 'Clean, serene, ultra-fresh morning skincare sanctuary.',
      backgroundElements: 'Neat acrylic makeup organizers, small eucalyptus vase, clean white ceramic tiles.',
      lightingStyle: 'High-key soft diffused beauty lighting, flattering skin-glow luminance.',
      colorPalette: 'Crisp white, marble grey, soft peach, natural botanical accents.',
    };
  } else {
    environmentLock = {
      location: 'Modern airy studio apartment with oak work desk, cozy warm lighting, and textured cream curtains.',
      timeOfDay: 'Bright afternoon with warm ambient sunbeams.',
      weatherOrAtmosphere: 'Cozy, authentic, productive creative sanctuary.',
      backgroundElements: 'Neat desk accessories, warm ambient lamp in soft background blur.',
      lightingStyle: 'Cinematic key light at 45 degrees, soft diffused fill, subtle rim light separating talent.',
      colorPalette: 'Warm cream, muted sage, natural wood tones, slate grey.',
    };
  }

  // 4. Cinematography Lock
  const cinematographyLock: CinematographyLock = {
    aspectRatio: '9:16',
    cameraStyle: 'Shot on Arri Alexa Mini with Cooke 35mm & 50mm Anamorphic/Prime lenses, cinematic handheld stabilizer.',
    lensCharacteristics: 'Shallow depth of field, creamy smooth background bokeh, crisp subject sharpness.',
    depthOfField: 'f/1.8 to f/2.2, maintaining razor sharp focus on the product and talent eyes.',
    lightingTechnique: 'Commercial high-end three-point lighting balanced with atmospheric natural motivation.',
    realismLevel: 'Photorealistic commercial broadcast quality, authentic skin textures, physical gravity.',
  };

  // 5. Story Lock
  const storyLock: StoryLock = {
    chronologicalFlow: 'Linear progressive storytelling: Hook/Introduction -> In-Depth Exploration -> Practical Demonstration -> Social Proof/Call to Action.',
    talentInitialAction: 'Engaged in natural everyday activity before drawing attention directly to the featured item.',
    productInitialPlacement: 'Naturally integrated into the scene environment before intentional hero close-up.',
    movementVector: 'Screen-right to center directional motion across consecutive scene cuts.',
    emotionalArc: 'Curiosity -> Pleasant Discovery -> High Confidence -> Urgent Motivation to purchase.',
  };

  return {
    characterLock,
    productLock,
    environmentLock,
    cinematographyLock,
    storyLock,
  };
}
