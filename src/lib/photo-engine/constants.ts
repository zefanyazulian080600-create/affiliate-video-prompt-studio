import { FaceLockConfig, BodyLockConfig, PhotoGeneratorInput, PhotoPresetType } from '@/types/photo';

export const ANYA_PITALOKA_FACE_LOCK: FaceLockConfig = {
  enabled: true,
  priority: 'strict',
  characterName: 'Anya Pitaloka',
  ethnicityAndAge: 'Wanita muda Indonesia-Asia Timur (usia 22-24 tahun)',
  facialStructure:
    'Bentuk wajah oval lembut dengan pipi yang sedikit berisi sehat (soft full cheeks) dan meruncing halus ke dagu yang membulat proporsional. Garis rahang (jawline) terlihat tegas namun lembut, dagu sejajar harmonis dengan bibir. Ekspresi tenang, hangat, dengan senyum tipis tertutup yang sangat natural (subtle closed-lip pleasant smile).',
  skinDetail:
    'Warna kulit kuning langsat hangat (warm fair-light skin tone). Tekstur kulit asli manusia tanpa riasan tebal (bare-faced no-makeup): pori-pori mikro terlihat di area pipi dan hidung, taburan bintik-bintik alami (natural light freckles) menyebar samar di punggung hidung dan kedua pipi atas. Ciri khas spesifik: satu tahi lalat kecil (tiny beauty mark/mole) di pipi kanan bawah serta bintik pigmen mikro di area rahang. Sedikit bayangan lipatan bawah mata alami (natural tear troughs), 100% anti-plastik, tanpa airbrush, bukan CGI.',
  eyesAndBrows:
    'Sepasang mata berbentuk almond yang bulat lembut dan ekspresif, bola mata cokelat gelap pekat (deep dark brown irises) dengan pantulan cahaya hidup. Kelopak mata ganda alami (natural tapered double eyelids) dengan aegyo-sal lembut. Alis hitam kecokelatan alami berbentuk lurus melengkung halus di ujung (soft straight-arched brows), helaian rambut alis tampak nyata.',
  noseProfile:
    'Hidung mancung natural khas Asia yang proporsional. Tampak depan: batang hidung lurus lembut dengan ujung hidung membulat halus (softly rounded bulbous tip). Profil samping: batang hidung melengkung mulus dengan ujung sedikit terangkat manis (subtle upturned nose tip) bertabur bintik freckles halus.',
  lipsDetail:
    'Bibir penuh alami dan lembut (naturally plump lips) berwarna merah muda koral pucat (natural muted coral-pink lip tone), tekstur permukaan bibir matte-lembap dengan garis-garis vertikal mikro alami (natural vertical lip creases) dan lekukan Cupid\'s bow yang jelas.',
  glasses:
    'Kacamata optik berbingkai logam tipis (thin dark bronze/gunmetal wire-rimmed glasses) berbentuk bulat-oval geometris (boston/aviator frame), bantalan hidung transparan menempel nyata, kaca jernih dengan pantulan optik tipis realistis.',
  hairAndFlyaways:
    'Rambut panjang berwarna hitam kecokelatan espresso sangat gelap (natural dark espresso brown-black hair), belah tengah alami (natural center part). Bagian atas jatuh lurus lembut membingkai pelipis dan pipi, bergelombang longgar bervolume alami (loose effortless beach waves) dari sebatas telinga ke bawah. Terdapat helaian anak rambut halus (natural flyaways & baby hairs) di sekitar pelipis dan puncak kepala.',
  customNotes:
    'Pertahankan 100% konsistensi fitur wajah berdasarkan 4-view Face Lock (Depan, Samping, 3/4, Belakang). Jangan mengubah struktur tulang pipi, jangan menghilangkan kacamata gunmetal atau tahi lalat pipi kanan bawah.',
  referenceImages: [
    {
      id: 'anya-face-sheet',
      url: '/references/anya-face-lock.jpg',
      view: 'general',
      caption: 'Anya Pitaloka — 4 Views Face Lock (Depan, Samping, 3/4, Belakang)',
    },
  ],
};

export const ANYA_PITALOKA_BODY_LOCK: BodyLockConfig = {
  enabled: true,
  priority: 'strict',
  heightAndWeight: 'Tinggi 169 cm, berat 56 kg',
  bodySilhouette:
    'Siluet jam pasir feminin alami (soft voluptuous hourglass). Tubuh ramping berisi, bertekstur lembut dan kenyal, SAMA SEKALI TIDAK BEROTOT, tanpa definisi otot keras, memiliki gravitasi jaringan tubuh manusia nyata (soft tissue weight).',
  skinTexture:
    'Kulit tubuh asli wanita Indonesia (kuning langsat hangat), tekstur organik dari leher hingga kaki dengan pori-pori mikro, bulu halus tipis (vellus hair), dan lipatan kulit asli di persendian. Bebas kilau lilin, bebas efek CGI.',
  neckAndShoulders:
    'Pangkal leher jenjang dengan tulang selangka (collarbone) manis alami. Bahu terbuka ramping membulat lembut tanpa tonjolan otot. Lengan mulus dan lembut feminin tanpa otot bisep/trisep menonjol.',
  bustDetail:
    'Ukuran payudara 42 yang sangat penuh, padat, dan lembut dengan bentuk jatuh alami mengikuti gravitasi (natural teardrop shape and real soft tissue weight).',
  waistAndMidriff:
    'Pinggang sangat kecil dan ramping melengkung mulus ke dalam (slim feminine cinched waist, lingkar 60 cm). Permukaan perut rata, mulus, dan lembut alami tanpa kotak otot (no sixpack/no abs), dengan pusar vertikal natural.',
  hipsAndGlutes:
    'Pinggang kecil langsung melebar mulus ke pinggul yang bulat, lebar, dan penuh (wide soft feminine hips) dengan siluet bokong bulat kenyal dan lengkungan punggung bawah (feminine S-curve) yang seksi.',
  legsAndThighs:
    'Kaki jenjang 169 cm terekspos proporsional. Paha bagian atas berisi lembut, bulat mulus, dan sensual (soft thick-slender thighs) tanpa tonjolan otot kaku, menyambung ke lutut dengan lipatan natural dan betis ramping.',
  customNotes:
    'Pertahankan proporsi tubuh jam pasir alami 169cm / 56kg dengan bust 42 dan pinggang 60cm. Jangan membuat tubuh berotot keras, pertahankan kelembutan alami jaringan kulit.',
  referenceImages: [
    {
      id: 'anya-body-sheet',
      url: '/references/anya-body-lock.jpg',
      view: 'general',
      caption: 'Anya Pitaloka — 4 Views Body Lock v6 (Depan, Samping, Belakang, 3/4)',
    },
  ],
};

export const DEFAULT_PHOTO_PRESET: PhotoGeneratorInput = {
  mode: 'quick',
  preset: 'candid_street',
  characterName: 'Anya Pitaloka',
  faceLock: ANYA_PITALOKA_FACE_LOCK,
  bodyLock: ANYA_PITALOKA_BODY_LOCK,
  characterDescription: 'Wanita muda ramah dan anggun, pembawaan tenang bersahaja dengan gaya casual aesthetic.',
  location: 'Jalanan pedestrian asri di daerah Kebayoran Baru, Jakarta Selatan, dengan pepohonan rindang dan kafe di latar belakang',
  timeOfDay: 'Sore hari pukul 16:45 WIB menjelang golden hour',
  lightingCondition: 'Cahaya matahari sore hangat menyinari dari sudut 45 derajat (soft golden hour sidelight) dengan bayangan lembut alami di tanah',
  bodyPose: 'Berdiri santai memiringkan badan sedikit ke arah kamera, satu tangan memegang tali totebag kain, bahu rileks, berat badan tertumpu santai pada satu kaki',
  facialExpression: 'Senyum manis tipis tertutup yang ramah, tatapan mata hidup menatap langsung ke arah lensa smartphone',
  gazeDirection: 'Melihat langsung ke arah lensa kamera iPhone 13',
  outfit: 'Cardigan rajut warna oatmeal lembut setengah terbuka di satu bahu, tanktop katun ribbed putih pas badan di bagian dalam, celana jeans panjang berpotongan relaxed straight leg warna biru muda pudar, dan sepatu sneakers kanvas putih',
  accessories: 'Kacamata optik bingkai logam tipis gunmetal, tas jinjing totebag kain katun kanvas krem polos di bahu kanan',
  cameraDevice: 'iphone13_main_back',
  cameraAngle: 'eye_level',
  cameraDistance: 'three_quarter',
  composition: 'Subjek berdiri di sepertiga kanan bingkai (rule of thirds), latar belakang jalanan kota dan dedaunan menciptakan kedalaman ruang alami tanpa blur berlebihan',
  aspectRatio: '4:5',
  realismIntensity: 'raw_unretouched',
  creativityLevel: 0.7,
  additionalDetails: 'Nuansa foto candid realistis seperti diambil oleh teman menggunakan iPhone 13 asli, detail serat kain katun dan rajut cardigan terlihat nyata',
};

export const PHOTO_PRESET_TEMPLATES: Record<
  PhotoPresetType,
  {
    label: string;
    description: string;
    defaultLocation: string;
    defaultLighting: string;
    defaultPose: string;
    defaultOutfit: string;
    defaultCamera: PhotoGeneratorInput['cameraDevice'];
    defaultDistance: PhotoGeneratorInput['cameraDistance'];
  }
> = {
  mirror_selfie: {
    label: 'Mirror Selfie',
    description: 'Foto selfie di cermin dengan pantulan ponsel iPhone 13 terlihat di tangan',
    defaultLocation: 'Kamar tidur minimalis bernuansa estetik dengan cermin berdiri kayu panjang (full-length mirror)',
    defaultLighting: 'Pencahayaan lampu kamar tidur hangat (warm ambient lamp) dipadu sedikit cahaya jendela sore',
    defaultPose: 'Berdiri menghadap cermin memegang iPhone 13 setinggi dada dengan satu tangan, kepala sedikit miring dengan senyum tipis manis',
    defaultOutfit: 'Fitted black ribbed crop tank top dan celana pendek santai katun abu-abu',
    defaultCamera: 'iphone13_mirror_back',
    defaultDistance: 'half_body',
  },
  casual_selfie: {
    label: 'Casual Selfie',
    description: 'Selfie santai sudut dekat kamera depan dengan distorsi optik alami ponsel',
    defaultLocation: 'Di dalam mobil saat berhenti di lampu merah atau area parkir terbuka',
    defaultLighting: 'Cahaya luar alami masuk melalui kaca jendela mobil, merata dan lembut di wajah',
    defaultPose: 'Memegang ponsel agak ke atas dengan sudut lengan rileks, kepala sedikit miring ke kanan, tatapan hangat ke lensa',
    defaultOutfit: 'Kaos katun putih leher bulat berpotongan santai dengan kalung rantai tipis',
    defaultCamera: 'iphone13_front_truedepth',
    defaultDistance: 'close_up',
  },
  candid_street: {
    label: 'Candid Street Photography',
    description: 'Foto jalanan spontan menangkap momen berjalan santai di lingkungan perkotaan',
    defaultLocation: 'Trotoar pedestrian kota dengan pepohonan rindang dan ruko estetik di latar belakang',
    defaultLighting: 'Cahaya matahari sore hangat (golden hour) dari samping, menciptakan bayangan panjang alami',
    defaultPose: 'Sedang berjalan santai, menoleh ke arah kamera dengan ekspresi spontan dan senyum ramah natural',
    defaultOutfit: 'Cardigan rajut oatmeal, tanktop katun putih, celana jeans relaxed cut, sneakers putih, dan tote bag',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'three_quarter',
  },
  lifestyle: {
    label: 'Lifestyle Photography',
    description: 'Potret aktivitas sehari-hari yang autentik dan bercerita',
    defaultLocation: 'Toko buku independen yang tenang dengan rak-rak kayu dipenuhi buku',
    defaultLighting: 'Pencahayaan interior lembut dari lampu gantung warm white dan jendela kaca toko',
    defaultPose: 'Berdiri di samping lorong rak buku, kedua tangan memegang buku yang sedang dibuka, melirik ramah ke samping kamera',
    defaultOutfit: 'Kemeja flanel longgar warna earthy tone di atas kaos polos dan celana bahan chino',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'half_body',
  },
  indoor_portrait: {
    label: 'Indoor Natural Portrait',
    description: 'Potret dalam ruangan dengan pencahayaan jendela lembut',
    defaultLocation: 'Ruang tamu apartemen modern dengan jendela kaca besar dan tirai tipis transparan',
    defaultLighting: 'Soft daylight masuk dari jendela besar samping (side window lighting), bayangan lembut di lekuk wajah',
    defaultPose: 'Duduk di tepi sofa santai, siku bersandar di sandaran sofa, kedua kaki ditekuk anggun',
    defaultOutfit: 'Sweater rajut turtleneck tipis warna krem dengan celana kulot katun santai',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'half_body',
  },
  outdoor_portrait: {
    label: 'Outdoor Portrait',
    description: 'Potret luar ruangan dengan pemandangan alam atau taman asri',
    defaultLocation: 'Taman kota yang rimbun dengan hamparan rumput hijau dan dedaunan segar',
    defaultLighting: 'Cahaya langit berawan tipis (soft overcast light) yang menyebarkan cahaya merata tanpa bayangan tajam',
    defaultPose: 'Berdiri di dekat batang pohon rindang, angin lembut mengibarkan ujung rambut secara alami',
    defaultOutfit: 'Dress kasual katun bermotif bunga lembut dengan jaket denim tipis tersampir di pundak',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'full_length',
  },
  cafe: {
    label: 'Cafe Photography',
    description: 'Momen santai nongkrong di kafe dengan cangkir kopi dan meja kayu',
    defaultLocation: 'Meja kafe kayu dekat jendela besar dengan cangkir latte hangat dan piring pastry kecil',
    defaultLighting: 'Kombinasi cahaya siang dari jendela kaca dan lampu bohlam Edison hangat di atas meja',
    defaultPose: 'Duduk santai di kursi kafe, kedua tangan bertumpu di atas meja memegang cangkir keramik, memandang santai ke arah kamera',
    defaultOutfit: 'Blouse katun linen leher V warna sage green dengan perhiasan kalung minimalis',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'half_body',
  },
  travel: {
    label: 'Travel Photography',
    description: 'Dokumentasi perjalanan liburan dengan latar belakang landmark atau pemandangan khas',
    defaultLocation: 'Jalanan batu kuno dengan latar belakang arsitektur klasik dan bunga gantung di balkon',
    defaultLighting: 'Cahaya pagi hari cerah yang bersih dan segar (crisp morning sunlight)',
    defaultPose: 'Berpose santai di tengah jalan setapak sambil menoleh ke belakang melewati pundak dengan ekspresi ceria kagum',
    defaultOutfit: 'Pakaian travel nyaman: jaket windbreaker tipis, kaos breathable, celana cargo santai, dan kacamata hitam di atas kepala',
    defaultCamera: 'iphone13_ultra_wide',
    defaultDistance: 'full_length',
  },
  daily_activity: {
    label: 'Daily Activity',
    description: 'Aktivitas harian yang riil dan tidak dibuat-buat',
    defaultLocation: 'Dapur rumah yang rapi dengan peralatan masak modern dan meja counter marmer',
    defaultLighting: 'Pencahayaan alami pagi hari dari jendela ventilasi dapur dipadu lampu plafon',
    defaultPose: 'Sedang menuangkan air hangat ke dalam cangkir teh, ekspresi tenang fokus yang natural',
    defaultOutfit: 'Kaos oblong katun oversized rumahan yang nyaman dan celana kulot katun santai',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'half_body',
  },
  full_body: {
    label: 'Full-Body Portrait',
    description: 'Foto seluruh badan dari kepala hingga ujung kaki dengan proporsi realistis',
    defaultLocation: 'Halaman terbuka berlantai paving block di depan dinding bata ekspos bergaya kontemporer',
    defaultLighting: 'Cahaya sore hari merata tanpa bayangan ekstrem, memperjelas siluet tubuh proporsional',
    defaultPose: 'Berdiri tegak santai dengan siluet jam pasir alami, satu tangan di saku celana, kedua kaki lurus menapak lantai dengan stabil',
    defaultOutfit: 'Atasan pas badan katun ribbed dan celana panjang berpotongan lurus, memperlihatkan tinggi badan 169 cm secara proporsional',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'full_length',
  },
  half_body: {
    label: 'Half-Body Portrait',
    description: 'Potret setengah badan fokus pada ekspresi, pakaian, dan proporsi dada-pinggang',
    defaultLocation: 'Balkon lantai atas dengan latar belakang pemandangan kota di sore hari',
    defaultLighting: 'Golden hour hangat dari samping menyinari rambut dan tepi wajah',
    defaultPose: 'Bersandar santai di pagar pembatas balkon, memandang hangat ke arah lensa',
    defaultOutfit: 'Cardigan rajut lembut terbuka memperlihatkan atasan crop top dan lekuk pinggang',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'half_body',
  },
  close_up: {
    label: 'Close-Up Portrait',
    description: 'Fokus detail mikro wajah, mata, bibir, kacamata, dan tekstur kulit pori-pori nyata',
    defaultLocation: 'Studio pencahayaan alami dengan latar belakang polos abu-abu netral (plain grey background)',
    defaultLighting: 'Pencahayaan difus studio yang lembut dan merata, memperlihatkan catchlights di mata tanpa bayangan keras',
    defaultPose: 'Wajah menghadap langsung ke kamera (head-and-shoulders), ekspresi tenang bersahaja dengan senyum tipis tertutup',
    defaultOutfit: 'Atasan leher scoop putih polos sederhana tanpa distraksi motif',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'close_up',
  },
  fashion_casual: {
    label: 'Fashion Casual',
    description: 'Tampilan OOTD santai modern yang stylish namun tidak terkesan kaku',
    defaultLocation: 'Area plaza terbuka di pusat seni modern dengan garis arsitektur minimalis',
    defaultLighting: 'Cahaya sore seimbang dengan refleksi terang dari dinding gedung putih di sekitarnya',
    defaultPose: 'Pose model santai: satu kaki melangkah ke depan, tangan memainkan tali tas selempang, pandangan percaya diri',
    defaultOutfit: 'Kombinasi blazer kasual oversized di atas crop top katun dan celana wide-leg denim',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'three_quarter',
  },
  formal: {
    label: 'Formal Portrait',
    description: 'Foto profil semi-formal atau profesional dengan kesan bersih dan rapi',
    defaultLocation: 'Lobi kantor modern dengan interior kayu hangat dan kaca marmer berkelas',
    defaultLighting: 'Pencahayaan arsitektural indoor yang elegan dan profesional',
    defaultPose: 'Berdiri tegak percaya diri, kedua tangan terlipat santai di depan pinggang, senyum profesional hangat',
    defaultOutfit: 'Blazer tailored rapi warna navy gelap di atas kemeja sutra putih berkerah',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'half_body',
  },
  custom: {
    label: 'Custom Scene Bebas',
    description: 'Adegan bebas yang sepenuhnya dapat Anda tentukan sendiri',
    defaultLocation: 'Lokasi kustom pilihan pengguna',
    defaultLighting: 'Pencahayaan alami sesuai situasi adegan',
    defaultPose: 'Pose natural yang realistis dan anatomis',
    defaultOutfit: 'Pakaian pilihan pengguna',
    defaultCamera: 'iphone13_main_back',
    defaultDistance: 'three_quarter',
  },
};

export const IPHONE13_CAMERA_DETAILS: Record<
  PhotoGeneratorInput['cameraDevice'],
  {
    name: string;
    focalLength: string;
    aperture: string;
    sensorDesc: string;
    lensPerspective: string;
  }
> = {
  iphone13_main_back: {
    name: 'Kamera Belakang Utama (26mm)',
    focalLength: '26mm equivalent focal length',
    aperture: 'f/1.6 aperture',
    sensorDesc: 'Sensor-shift OIS, sensor 1/1.9 inci dengan piksel 1.7µm',
    lensPerspective: 'Perspektif standar lensa smartphone 26mm dengan ketajaman tinggi di bagian tengah, distorsi sudut minimal, dan kedalaman bidang alami khas smartphone (natural sensor rolloff)',
  },
  iphone13_ultra_wide: {
    name: 'Kamera Belakang Ultra-Wide (13mm)',
    focalLength: '13mm equivalent focal length (120° FOV)',
    aperture: 'f/2.4 aperture',
    sensorDesc: 'Sensor 5-element lens',
    lensPerspective: 'Perspektif ultra-lebar 13mm yang ekspansif dengan sedikit distorsi renggang pada sudut tepi frame (subtle corner perspective stretch), sangat cocok untuk latar belakang luas atau foto seluruh badan dramatis',
  },
  iphone13_front_truedepth: {
    name: 'Kamera Depan TrueDepth (23mm)',
    focalLength: '23mm equivalent focal length',
    aperture: 'f/2.2 aperture',
    sensorDesc: 'Kamera selfie TrueDepth 12MP',
    lensPerspective: 'Karakteristik foto selfie jarak satu jangkauan lengan (arm-length distance), sedikit distorsi perspektif dekat yang wajar pada wajah, pencahayaan alami merata, dan ekspresi intim',
  },
  iphone13_mirror_back: {
    name: 'Mirror Selfie (Kamera Belakang)',
    focalLength: '26mm via cermin kaca',
    aperture: 'f/1.6',
    sensorDesc: 'Pantulan cermin nyata dengan ponsel iPhone 13 terlihat dipegang tangan',
    lensPerspective: 'Foto cermin dengan perangkat iPhone 13 terlihat nyata di tangan subjek, pantulan optik cermin dua kali jarak, pencahayaan cermin konsisten dengan ruangan, bayangan tangan dan jari memegang ponsel secara logis',
  },
  iphone13_mirror_front: {
    name: 'Mirror Selfie (Kamera Depan)',
    focalLength: '23mm via cermin kaca',
    aperture: 'f/2.2',
    sensorDesc: 'Kamera depan merekam pantulan cermin',
    lensPerspective: 'Kamera depan dipegang menghadap cermin, menghasilkan komposisi selfie cermin santai dengan sudut pandang dinamis',
  },
  auto: {
    name: 'Otomatis Sesuai Adegan',
    focalLength: '26mm atau 23mm adaptif',
    aperture: 'f/1.6 - f/2.2',
    sensorDesc: 'Dipilih secara cerdas oleh AI berdasarkan jenis foto yang dipilih',
    lensPerspective: 'Konfigurasi lensa iPhone 13 yang dioptimalkan sesuai dengan framing dan jenis foto',
  },
};
