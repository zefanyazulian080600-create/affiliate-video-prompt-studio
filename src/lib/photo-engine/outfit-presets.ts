import { OutfitReferencePreset, OutfitReferenceConfig } from '@/types/photo';

export const OUTFIT_REFERENCE_PRESETS: OutfitReferencePreset[] = [
  // 1. Casual & Everyday
  {
    id: 'anya_signature_oatmeal',
    name: 'Oatmeal Knit & Light-Wash Denim (Signature)',
    category: 'casual',
    categoryLabel: 'Kasual Sehari-hari',
    description: 'Gaya kasual santai signature: cardigan rajut lembut oatmeal, tanktop katun putih, celana jeans relaxed cut.',
    details: {
      top: 'Fitted ribbed cotton tanktop warna putih bersih dengan leher scoop proporsional',
      bottom: 'Celana denim jeans panjang warna biru pudar (light wash) berpotongan relaxed straight-leg dengan tepian jahitan asli',
      outer: 'Cardigan rajut warna oatmeal lembut bertekstur rajutan wol-katun tebal, sebagian kancing terbuka santai',
      shoes: 'Sneakers kanvas putih bersih (low-top) bertali katun dengan sol karet tipis',
      bagAndAccessories: 'Kacamata optik bingkai logam tipis gunmetal, tote bag katun kanvas krem polos tersampir di bahu',
      fabricTexture: 'Serat rajut chunky oatmeal, tekstur ribbed katun 100%, dan anyaman denim twill klasik yang berkarakter',
    },
    fullDescription: 'Cardigan rajut warna oatmeal lembut bertekstur rajutan halus terbuka santai di pundak, tanktop katun ribbed putih pas badan di bagian dalam, celana jeans panjang berpotongan relaxed straight leg warna biru muda pudar dengan aksen lipatan natural di pergelangan kaki, serta sneakers kanvas putih bersih bertali katun.',
    tags: ['Kasual', 'Cardigan', 'Denim', 'Santai', 'Signature Anya'],
  },
  {
    id: 'clean_girl_minimalist',
    name: 'Clean Girl White Tee & Linen Trousers',
    category: 'casual',
    categoryLabel: 'Kasual Sehari-hari',
    description: 'Estetika minimalis clean-girl: kaos katun combed putih polos, celana kulot linen warna taupe, sandal birkenstock.',
    details: {
      top: 'Kaos katun combed premium 24s warna putih bersih berpotongan regular fit dengan rib leher bulat rapi',
      bottom: 'Celana panjang kulot bahan linen warna taupe/khaki muda dengan tali serut elastis dan saku samping',
      outer: 'Tanpa luaran, potongan simpel clean',
      shoes: 'Sandal slide dua tali bahan kulit suede cokelat muda (leather footbed sandals)',
      bagAndAccessories: 'Jam tangan kulit cokelat minimalis dengan dial emas tipis, tote bag kanvas ecru',
      fabricTexture: 'Serat katun combed halus matte, tekstur slub alami serat linen breathable tanpa kilap',
    },
    fullDescription: 'Kaos katun combed putih bersih berpotongan rapi dimasukkan santai ke dalam celana panjang kulot linen warna taupe dengan tekstur kain jatuh yang sejuk, dipadukan sandal slide kulit suede cokelat muda dan jam tangan minimalis.',
    tags: ['Minimalist', 'Clean Girl', 'Linen', 'Putih', 'Earth Tone'],
  },
  {
    id: 'french_breton_stripes',
    name: 'Parisian Breton Stripes & Straight Jeans',
    category: 'casual',
    categoryLabel: 'Kasual Sehari-hari',
    description: 'Sentuhan klasik Parisian chic: kaos garis pelaut hitam-putih lengan 7/8, celana jeans hitam, dan loafers kulit.',
    details: {
      top: 'Kaos lengan 7/8 motif garis horizontal hitam-putih pelaut (Breton stripe) dari bahan katun combed padat',
      bottom: 'Celana jeans berpotongan lurus (straight crop) warna hitam pekat (washed black denim)',
      outer: 'Jaket trench coat tipis disampirkan di lengan',
      shoes: 'Sepatu loafers kulit hitam mengkilap (black leather penny loafers) dengan jahitan sol rapi',
      bagAndAccessories: 'Tas bahu kulit baguette hitam mungil dengan gesper perak kecil, kacamata hitam retro',
      fabricTexture: 'Rajutan katun striping presisi dan denim katun twill bertekstur kokoh',
    },
    fullDescription: 'Kaos pelaut motif garis Breton horizontal hitam-putih lengan 7/8 berkerah boatneck, celana jeans lurus warna hitam pudar dipadu sepatu loafers kulit hitam klasik dan tas baguette mungil.',
    tags: ['Parisian', 'Breton Stripe', 'Loafers', 'Vintage Chic'],
  },

  // 2. Korean Street & Aesthetic
  {
    id: 'hongdae_oversized_blazer',
    name: 'Hongdae Oversized Blazer & Cargo Pants',
    category: 'korean_street',
    categoryLabel: 'Korean & Streetwear',
    description: 'Gaya modis ala Hongdae Seoul: blazer abu-abu oversized, crop top ribbed hitam, dan celana kargo lurus.',
    details: {
      top: 'Crop top tank ribbed tanpa lengan warna hitam pekat pas badan memperlihatkan garis pinggang',
      bottom: 'Celana kargo berpotongan lurus warna charcoal gelap dengan saku tempel samping bervolume natural',
      outer: 'Blazer tailored berpotongan oversized bahu tegas warna abu-abu heather (charcoal grey wool blend)',
      shoes: 'Chunky dad sneakers platform sol tebal warna abu-abu putih bergaya retro',
      bagAndAccessories: 'Kalung rantai perak tipis bertingkat, tas selempang nilon hitam minimalis',
      fabricTexture: 'Bahan wool-blend blazer bertekstur matte rapi, parasut katun ripstop pada kargo, dan ribbed spandeks atasan',
    },
    fullDescription: 'Blazer oversized warna abu-abu arang berpotongan modern terbuka di bagian depan, dipadukan crop tanktop katun ribbed hitam yang memperlihatkan lekuk pinggang ramping, celana kargo lurus warna charcoal dengan saku fungsional, dan chunky sneakers tebal.',
    tags: ['Korean', 'Streetwear', 'Oversized Blazer', 'Hongdae', 'Edgy'],
  },
  {
    id: 'seoul_college_tennis_skirt',
    name: 'Seoul College Cardigan & Pleated Skirt',
    category: 'korean_street',
    categoryLabel: 'Korean & Streetwear',
    description: 'Gaya kampus manis Korea: cropped knit cardigan warna baby blue, rok lipit tenis navy, dan kaus kaki rib putih.',
    details: {
      top: 'Kaos dalaman tanktop putih katun lembut',
      bottom: 'Rok lipit tenis mini berpinggang tinggi (high-waisted pleated tennis skirt) warna biru dongker navy',
      outer: 'Cardigan rajut crop berkancing mutiara warna baby blue pastel bertekstur rajutan lembut',
      shoes: 'Sepatu retro running sneakers New Balance warna abu-abu muda dengan kaus kaki rib putih setinggi betis',
      bagAndAccessories: 'Ransel kulit mini warna hitam atau tas selempang kanvas, jepit rambut perak tipis',
      fabricTexture: 'Rajutan wol rajut berbulu mikro halus, bahan polyester-twill rok yang terlipit kaku rapi',
    },
    fullDescription: 'Cropped cardigan rajut berkancing v-neck warna baby blue lembut di atas rok lipit tenis mini warna navy yang berayun natural saat bergerak, kaus kaki katun putih di atas mata kaki, dan sepatu sneakers retro abu-abu.',
    tags: ['Korean', 'Tennis Skirt', 'Pastel', 'Cardigan', 'Cute'],
  },
  {
    id: 'y2k_denim_on_denim',
    name: 'Y2K Crop Denim Jacket & Wide-Leg Jeans',
    category: 'korean_street',
    categoryLabel: 'Korean & Streetwear',
    description: 'Estetika Y2K trendi: jaket denim crop biru pudar, atasan halter baby-tee, dan celana denim baggy berpinggang sedang.',
    details: {
      top: 'Baby-tee katun putih berkerah kontras dengan sablon tipografi retro samar',
      bottom: 'Celana denim longgar (wide-leg baggy jeans) warna biru pudar berpotongan santai dengan keliman raw-hem',
      outer: 'Jaket denim crop lengan panjang warna biru pudar vintage yang serasi',
      shoes: 'Platform platform skate sneakers warna putih bersih',
      bagAndAccessories: 'Tas bahu kulit sintetis perak metalik mengkilap, kacamata kawat retro oval',
      fabricTexture: 'Kain denim tebal 13oz dengan tekstur washed stone alami dan katun baby-tee yang lentur',
    },
    fullDescription: 'Setelan denim-on-denim retro: jaket denim crop pudar di atas baby-tee katun putih, celana jeans berpotongan lebar (baggy wide-leg) dengan saku klasik, tas bahu perak metalik, dan sneakers platform.',
    tags: ['Y2K', 'Denim on Denim', 'Baggy', 'Streetstyle', 'Retro'],
  },

  // 3. Cafe & Aesthetic Minimalist
  {
    id: 'sage_linen_cafe',
    name: 'Sage Green Linen Blouse & Wide Trousers',
    category: 'aesthetic_cafe',
    categoryLabel: 'Kafe & Estetik',
    description: 'Gaya santai kafe sore: blouse linen kerah V warna sage green, celana kulot broken white, dan tas rotan anyaman.',
    details: {
      top: 'Blouse linen santai leher V berpotongan longgar warna sage green dengan kancing batok kelapa alami',
      bottom: 'Celana kulot lebar bahan katun linen warna broken white dengan lipit depan halus',
      outer: 'Tanpa luaran, kain jatuh alami menyerap keringat',
      shoes: 'Sandal mules kulit warna tan cokelat muda dengan hak datar nyaman',
      bagAndAccessories: 'Tas bundar anyaman rotan tradisional dengan tali kulit cokelat, cincin perak minimalis',
      fabricTexture: 'Serat tenun linen berpori halus yang bernapas dengan lipatan alami pakaian santai',
    },
    fullDescription: 'Blouse linen longgar leher V warna sage green lembut yang jatuh anggun, celana kulot katun linen warna putih gading dengan lipatan alami yang sejuk, dipadukan tas rotan bundar dan sandal mules kulit cokelat muda.',
    tags: ['Linen', 'Sage Green', 'Cafe', 'Earth Tone', 'Natural'],
  },
  {
    id: 'earthy_knit_polo',
    name: 'Caramel Knit Polo & Cream Chino Trousers',
    category: 'aesthetic_cafe',
    categoryLabel: 'Kafe & Estetik',
    description: 'Nuansa hangat coffee shop: kaos polo rajut warna karamel madu, celana chino lurus krem, dan sepatu mules kulit.',
    details: {
      top: 'Atasan polo rajut berkerah terbuka (open-collar polo shirt) warna karamel madu (honey caramel knit)',
      bottom: 'Celana chino katun twill berpotongan lurus (straight fit) warna krem gandum',
      outer: 'Sweater tipis diikatkan menyilang di pundak secara kasual',
      shoes: 'Sepatu flat mules kulit cokelat tua dengan ujung runcing tumpul (soft almond toe)',
      bagAndAccessories: 'Tote bag kulit cokelat lentur berukuran sedang, kacamata optik bingkai kawat tipis',
      fabricTexture: 'Rajutan katun berongga mikro yang lembut dan elastis, kain chino kokoh bertekstur twill halus',
    },
    fullDescription: 'Kaos polo rajut kerah terbuka warna karamel madu hangat, celana chino warna krem gandum dengan potongan lurus rapi, dipadukan tas jinjing kulit cokelat lembut dan sepatu flat mules.',
    tags: ['Warm Tones', 'Knit Polo', 'Chino', 'Coffee Shop', 'Smart Minimalist'],
  },
  {
    id: 'black_slip_dress_linen',
    name: 'Monochrome Black Slip Dress & Breezy Linen Outer',
    category: 'aesthetic_cafe',
    categoryLabel: 'Kafe & Estetik',
    description: 'Estetika kontras monokrom: midi slip dress hitam sutra satin dipadu outer kemeja linen transparan putih gading.',
    details: {
      top: 'Midi slip dress satin sutra warna hitam pekat dengan tali spaghetti tipis dan lekukan leher cowl lembut',
      bottom: 'Bawahan terusan midi dengan belahan samping halus setinggi lutut',
      outer: 'Kemeja linen putih gading berpotongan longgar tipis transparan dipakai terbuka sebagai luaran',
      shoes: 'Sandal tali tipis minimalis (barely-there strappy sandals) warna hitam dengan sol tipis',
      bagAndAccessories: 'Shoulder bag kulit hitam mengkilap berukuran mungil, anting hoop emas kecil',
      fabricTexture: 'Kilau lembut sutra satin berpadu kontras dengan tekstur serat kasar alami kemeja linen tipis',
    },
    fullDescription: 'Midi slip dress satin sutra hitam dengan drape lembut di area dada dan pinggang, dibalut kemeja linen putih gading berpotongan longgar yang tersampir santai di bahu, sandal tali hitam tipis, dan tas bahu mungil.',
    tags: ['Monochrome', 'Slip Dress', 'Linen Shirt', 'Classy', 'Aesthetic'],
  },

  // 4. Smart Casual & Workwear
  {
    id: 'smart_casual_navy_blazer',
    name: 'Navy Tailored Blazer & Silk Camisole',
    category: 'smart_casual',
    categoryLabel: 'Smart Casual & Kantor',
    description: 'Gaya wanita karier modern: blazer navy berpotongan rapi, kamisol sutra renda broken white, celana tailored abu.',
    details: {
      top: 'Kamisol sutra warna broken white dengan detail renda halus di garis leher V',
      bottom: 'Celana bahan tailored warna abu-abu arang (charcoal grey) berpotongan pipa lurus bergaris lipatan tajam',
      outer: 'Blazer tailored single-breasted warna biru dongker gelap (navy blue) berkerah lapel ramping rapi',
      shoes: 'Sepatu block heels kulit hitam hak rendah 4 cm yang kokoh dan elegan',
      bagAndAccessories: 'Tas kerja structured tote bag kulit saffiano warna hitam, jam tangan rantai perak tipis',
      fabricTexture: 'Bahan wool-blend blazer halus tanpa kerut, sutra licin lembut, dan kain wol celana berserat rapat',
    },
    fullDescription: 'Blazer navy berpotongan tailored rapi di atas kamisol sutra warna broken white lembut, celana bahan panjang tailored bergaris lipatan presisi warna abu-abu arang, sepatu block heels kulit hitam, dan tas kerja terstruktur.',
    tags: ['Smart Casual', 'Blazer', 'Workwear', 'Office Chic', 'Profesional'],
  },
  {
    id: 'camel_trench_coat',
    name: 'Classic Camel Trench Coat & Turtleneck Chic',
    category: 'smart_casual',
    categoryLabel: 'Smart Casual & Kantor',
    description: 'Siluet elegan metropolitan: trench coat klasik warna camel, sweater turtleneck hitam, dan celana ankle fit.',
    details: {
      top: 'Sweater rajut turtleneck tipis lengan panjang warna hitam pekat pas badan',
      bottom: 'Celana panjang berpotongan mata kaki (ankle pants) warna hitam pekat berpinggang tinggi',
      outer: 'Trench coat klasik warna camel/beige panjang sebetis dengan kancing ganda dan ikat pinggang santai',
      shoes: 'Sepatu ankle boots kulit hitam berujung runcing halus (pointed-toe ankle boots)',
      bagAndAccessories: 'Tas kulit selempang model bucket bag warna cokelat tua, payung lipat bergagang kayu',
      fabricTexture: 'Kain katun gabardine tahan air pada trench coat, rajutan benang wol merino halus pada turtleneck',
    },
    fullDescription: 'Trench coat klasik warna camel/beige berpotongan panjang elegan dibiarkan terbuka, memperlihatkan sweater rajut turtleneck hitam pas badan yang menonjolkan lekuk tubuh, celana ankle pants hitam rapi, dan ankle boots kulit hitam.',
    tags: ['Trench Coat', 'Turtleneck', 'Autumn', 'Metropolitan', 'Chic'],
  },

  // 5. Indonesian Heritage Modern
  {
    id: 'kebaya_encim_modern',
    name: 'Modern Kebaya Encim & High-Waist Denim',
    category: 'heritage',
    categoryLabel: 'Indonesia Heritage Modern',
    description: 'Kombinasi tradisi dan modern: kebaya encim katun putih bordir bunga pastel dipadu celana jeans vintage.',
    details: {
      top: 'Kebaya encim katun warna putih bersih dengan bordiran kerawang bunga mawar pastel halus di tepi keliman dan lengan',
      bottom: 'Celana jeans berpotongan straight-leg berpinggang tinggi (high-waisted vintage denim) warna biru klasik',
      outer: 'Bros perak antik berbentuk bunga melati menyemat kebaya di bagian dada tengah',
      shoes: 'Sandal selop kulit bordir modern warna nude pink dengan hak rendah runcing manis',
      bagAndAccessories: 'Tas anyaman jali-jali mini warna pastel modern, anting mutiara air tawar alami',
      fabricTexture: 'Katun mori halus dengan sulaman benang sutra timbul berpadu kontras dengan kain denim tebal klasik',
    },
    fullDescription: 'Kebaya encim katun putih bersih bersulam kerawang bunga pastel yang anggun dan pas di tubuh, dipadukan secara kontras dengan celana jeans high-waist berpotongan lurus warna biru klasik, bros perak antik, dan sandal selop kulit bernuansa feminin.',
    tags: ['Kebaya Encim', 'Heritage', 'Batik Modern', 'Denim', 'Indonesia Modern'],
  },
  {
    id: 'batik_kimono_outer',
    name: 'Indigo Batik Parang Kimono & Halter Inner',
    category: 'heritage',
    categoryLabel: 'Indonesia Heritage Modern',
    description: 'Koleksi busana etnik kontemporer: outer kimono panjang motif batik parang warna indigo, halter top hitam, kulot pasir.',
    details: {
      top: 'Atasan halter neck tanpa lengan bahan katun ribbed warna hitam pekat',
      bottom: 'Celana kulot katun tenun warna pasir pantai (sand beige) yang lebar dan ringan',
      outer: 'Kimono outer panjang motif batik parang kontemporer pewarna alam warna biru indigo dan cokelat sogan',
      shoes: 'Sandal kulit gladiator bertali warna cokelat gelap tenun tangan',
      bagAndAccessories: 'Kalung tali etnik dengan liontin kayu dan tembaga buatan perajin lokal, tas selempang tenun ikat',
      fabricTexture: 'Kain katun prima batik tulis bertekstur malam lilin alami, katun tenun bertekstur slub pada celana kulot',
    },
    fullDescription: 'Outer kimono panjang motif batik parang kontemporer bernuansa biru indigo dan sogan yang melambai tertiup angin, di atas atasan halter neck hitam dan celana kulot katun warna pasir pantai, dipadu kalung etnik artisanal.',
    tags: ['Batik Parang', 'Kimono', 'Indigo', 'Etnik Modern', 'Heritage'],
  },

  // 6. Summer & Resort / Beach
  {
    id: 'floral_summer_sundress',
    name: 'Ditsy Floral Sundress & Straw Boater Hat',
    category: 'summer_resort',
    categoryLabel: 'Summer & Liburan',
    description: 'Suasana liburan pantai cerah: sundress katun bermotif bunga liar mikro warna pastel, topi anyaman jerami, sandal tali.',
    details: {
      top: 'Sundress terusan midi bahan katun lembut motif bunga-bunga kecil (ditsy floral) warna latar kuning pastel lembut',
      bottom: 'Rok gaun berpotongan A-line dengan belahan samping manis dan keliman renda mikro',
      outer: 'Cardigan rajut jaring tipis putih diikatkan longgar di pinggang',
      shoes: 'Sandal strappy kulit warna cokelat tan dengan lilitan halus di pergelangan kaki',
      bagAndAccessories: 'Topi anyaman jerami pinggiran lurus (straw boater hat) berpita pita hitam, kacamata hitam cat-eye',
      fabricTexture: 'Kain katun rayon ringan melambai yang sejuk, anyaman serat jerami alami pada topi',
    },
    fullDescription: 'Sundress midi katun motif bunga ditsy floral warna pastel dengan tali spaghetti dan garis leher manis, rok terusan melambai sejuk tertiup angin pantai, dilengkapi topi jerami boater hat dan sandal tali kulit.',
    tags: ['Sundress', 'Floral', 'Beach', 'Resort', 'Summer Vacation'],
  },
  {
    id: 'crochet_top_linen_shorts',
    name: 'Boho Crochet Crop Top & Terracotta Linen Shorts',
    category: 'summer_resort',
    categoryLabel: 'Summer & Liburan',
    description: 'Gaya bohemian resort: atasan rajut crochet beige motif jaring terbuka, celana pendek linen terakota, sandal espadrille.',
    details: {
      top: 'Atasan crop top rajut crochet motif geometris warna beige/ecru dengan pola renda berpori alami',
      bottom: 'Celana pendek berpinggang tinggi (high-waisted shorts) bahan linen warna merah bata terakota dengan ikat pinggang kain',
      outer: 'Kemeja katun tipis putih terbuka yang melindungi pundak dari sinar matahari',
      shoes: 'Sandal espadrilles berujung sol rami alami dengan tali kanvas krem',
      bagAndAccessories: 'Kacamata hitam tortoise shell retro, gelang manik-manik kayu dan kerang kecil',
      fabricTexture: 'Tekstur rajutan benang katun crochet yang tebal berpori, dan kain linen terakota dengan kerutan lembut',
    },
    fullDescription: 'Atasan rajut crochet warna beige motif geometris berongga di atas bralette senada, dipadukan celana pendek linen warna terakota hangat yang menonjolkan kaki jenjang, sandal espadrille bertali rami, dan kacamata tortoise.',
    tags: ['Crochet', 'Bohemian', 'Linen Shorts', 'Resort', 'Summer Vibe'],
  },

  // 7. Sporty & Athleisure
  {
    id: 'seamless_olive_activewear',
    name: 'Dusty Olive Seamless Gym Set & Running Shoes',
    category: 'sporty',
    categoryLabel: 'Sporty & Athleisure',
    description: 'Pakaian olahraga modis: set sports bra racerback dan biker shorts seamless warna dusty olive green, sneakers lari.',
    details: {
      top: 'Sports bra berpotongan racerback bahan seamless elastis warna dusty olive green berdaya topang nyaman',
      bottom: 'Celana biker shorts seamless berpinggang tinggi (high-waisted) warna senada sepanjang pertengahan paha',
      outer: 'Jaket windbreaker parasut crop warna abu-abu transparan diikatkan di pinggang',
      shoes: 'Sepatu lari running shoes modern warna putih-hijau mint dengan bantalan udara tebal',
      bagAndAccessories: 'Botol minum stainless steel matte di tangan, smartwatch dengan strap silikon abu-abu, kaus kaki gym putih',
      fabricTexture: 'Kain rajut nilon-spandeks rib micro seamless dengan kemampuan kompresi lentur dan kilap matte teknis',
    },
    fullDescription: 'Set pakaian olahraga dua potong (two-piece athletic set) warna dusty olive green: sports bra ribbed yang pas menopang dan biker shorts seamless berpinggang tinggi, sepatu lari running shoes putih bersih dengan kaus kaki crew putih, dan smartwatch di pergelangan tangan.',
    tags: ['Activewear', 'Athleisure', 'Gym', 'Seamless', 'Biker Shorts'],
  },
  {
    id: 'oversized_vintage_hoodie',
    name: 'Heather Grey Vintage Hoodie & Spandex Shorts',
    category: 'sporty',
    categoryLabel: 'Sporty & Athleisure',
    description: 'Gaya santai ala streetwear sporty: hoodie katun fleece oversized warna abu-abu, biker shorts hitam, chunky dad sneakers.',
    details: {
      top: 'Hoodie katun fleece tebal berpotongan oversized warna heather grey dengan tali serut tebal dan saku kanguru',
      bottom: 'Celana pendek spandeks hitam ketat (black biker shorts) yang terlihat sedikit di bawah keliman hoodie',
      outer: 'Hoodie tebal hangat dipakai sebagai atasan utama',
      shoes: 'Sepatu chunky dad sneakers warna putih bernuansa retro 90-an dengan kaus kaki tabung tebal',
      bagAndAccessories: 'Topi baseball cap warna hitam dengan bordiran huruf kecil putih, headphone over-ear di leher',
      fabricTexture: 'Bahan katun fleece bagian dalam berbulu lembut hangat dengan permukaan luar berserat abu-abu klasik',
    },
    fullDescription: 'Hoodie katun fleece tebal oversized warna abu-abu heather yang jatuh longgar dan nyaman, dipadu celana biker shorts hitam, topi baseball cap katun hitam, headphone over-ear melingkar santai di leher, dan chunky retro sneakers.',
    tags: ['Hoodie', 'Oversized', 'Streetwear', 'Sporty Casual', 'Cozy'],
  },

  // 8. Cozy Home & Loungewear
  {
    id: 'waffle_knit_loungewear',
    name: 'Oatmeal Waffle Knit Lounge Set & Wool Socks',
    category: 'cozy',
    categoryLabel: 'Rumahan & Loungewear',
    description: 'Suasana santai kamar tidur: piyama atasan kancing waffle knit warna oatmeal, celana santai panjang, kaus kaki wol.',
    details: {
      top: 'Atasan lengan panjang piyama santai bahan katun waffle knit warna oatmeal dengan kancing henley di dada',
      bottom: 'Celana panjang tidur santai bahan waffle knit berpinggang elastis longgar dengan tali serut katun senada',
      outer: 'Selimut rajut wol tebal disampirkan di lengan sofa',
      shoes: 'Kaus kaki rajut wol tebal bertekstur hangat warna krem tanpa alas sepatu (barefoot on rug/socks)',
      bagAndAccessories: 'Cangkir keramik buatan tangan berisi minuman hangat di tangan, jepit rambut jedai di rambut belakang',
      fabricTexture: 'Anyaman kain berongga tekstur waffle kotak-kotak kecil katun organik yang sangat empuk dan bernapas',
    },
    fullDescription: 'Set pakaian santai rumah (cozy loungewear set) bahan katun waffle knit warna oatmeal lembut: atasan henley berkancing dada dan celana panjang berkaret longgar, dipadukan kaus kaki rajut wol tebal warna krem dan cangkir keramik hangat.',
    tags: ['Loungewear', 'Waffle Knit', 'Home', 'Cozy', 'Pajamas'],
  },
];

export const OUTFIT_CATEGORIES: {
  id: OutfitReferencePreset['category'];
  label: string;
}[] = [
  { id: 'casual', label: 'Kasual Sehari-hari' },
  { id: 'korean_street', label: 'Korean & Streetwear' },
  { id: 'aesthetic_cafe', label: 'Kafe & Estetik' },
  { id: 'smart_casual', label: 'Smart Casual' },
  { id: 'heritage', label: 'Indonesia Modern' },
  { id: 'summer_resort', label: 'Summer & Liburan' },
  { id: 'sporty', label: 'Sporty & Gym' },
  { id: 'cozy', label: 'Rumahan & Loungewear' },
];

export const DEFAULT_OUTFIT_CONFIG: OutfitReferenceConfig = {
  enabled: false,
  priority: 'balanced',
  presetId: 'anya_signature_oatmeal',
  presetName: 'Oatmeal Knit & Light-Wash Denim (Signature)',
  category: 'casual',
  itemDetails: {
    top: 'Fitted ribbed cotton tanktop warna putih bersih dengan leher scoop proporsional',
    bottom: 'Celana denim jeans panjang warna biru pudar berpotongan relaxed straight-leg',
    outer: 'Cardigan rajut warna oatmeal lembut bertekstur rajutan wol-katun tebal',
    shoes: 'Sneakers kanvas putih bersih low-top bertali katun',
    bagAndAccessories: 'Kacamata optik bingkai logam tipis gunmetal, tote bag katun kanvas krem polos',
    fabricTexture: 'Serat rajut chunky oatmeal, tekstur ribbed katun 100%, dan anyaman denim twill klasik',
  },
  fullDescription: 'Cardigan rajut warna oatmeal lembut bertekstur rajutan halus terbuka santai di pundak, tanktop katun ribbed putih pas badan di bagian dalam, celana jeans panjang berpotongan relaxed straight leg warna biru muda pudar dengan aksen lipatan natural di pergelangan kaki, serta sneakers kanvas putih bersih bertali katun.',
  referenceImages: [],
};

export function getOutfitPresetById(id: string): OutfitReferencePreset | undefined {
  return OUTFIT_REFERENCE_PRESETS.find(p => p.id === id);
}

export function getOutfitPresetsByCategory(category?: string): OutfitReferencePreset[] {
  if (!category || category === 'all') return OUTFIT_REFERENCE_PRESETS;
  return OUTFIT_REFERENCE_PRESETS.filter(p => p.category === category);
}

export function searchOutfitPresets(query: string): OutfitReferencePreset[] {
  const q = query.toLowerCase().trim();
  if (!q) return OUTFIT_REFERENCE_PRESETS;
  return OUTFIT_REFERENCE_PRESETS.filter(p => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.details.top.toLowerCase().includes(q) ||
      p.details.bottom.toLowerCase().includes(q)
    );
  });
}
