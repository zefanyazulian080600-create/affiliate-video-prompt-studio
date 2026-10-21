import { CameraDeviceType, CameraAngleType, CameraDistanceType, PhotoAspectRatio } from '@/types/photo';
import { IPHONE13_CAMERA_DETAILS } from './constants';

export interface IPhone13OpticsGuidance {
  deviceDescription: string;
  lensSpecs: string;
  depthOfFieldGuidance: string;
  lightingAndSensorRolloff: string;
  mirrorSelfieRules?: string;
  aspectRatioInstruction: string;
}

export function generateIPhone13OpticsGuidance(
  cameraDevice: CameraDeviceType,
  angle: CameraAngleType,
  distance: CameraDistanceType,
  aspectRatio: PhotoAspectRatio,
  lightingCondition: string
): IPhone13OpticsGuidance {
  const actualDevice = cameraDevice === 'auto'
    ? (distance === 'close_up' ? 'iphone13_front_truedepth' : 'iphone13_main_back')
    : cameraDevice;

  const details = IPHONE13_CAMERA_DETAILS[actualDevice];

  // Angle descriptive phrase in Indonesian
  let anglePhrase = 'sudut kamera sejajar mata (eye-level shot)';
  if (angle === 'low_angle') anglePhrase = 'sudut kamera sedikit rendah (subtle low angle looking slightly upwards)';
  else if (angle === 'high_angle') anglePhrase = 'sudut kamera sedikit tinggi dari atas kepala (slight high angle)';
  else if (angle === 'slight_tilt') anglePhrase = 'sudut kamera kasual dengan kemiringan halus (slight candid Dutch angle)';
  else if (angle === 'candid_overhead') anglePhrase = 'sudut pandang atas spontan (overhead candid perspective)';

  // Distance descriptive phrase
  let distancePhrase = 'jarak tiga perempat badan (three-quarter framing)';
  if (distance === 'close_up') distancePhrase = 'framing jarak dekat dari dada ke atas (close-up head and shoulders)';
  else if (distance === 'medium_shot') distancePhrase = 'framing medium shot dari pinggang ke atas';
  else if (distance === 'half_body') distancePhrase = 'framing setengah badan dari paha atas ke kepala';
  else if (distance === 'full_length') distancePhrase = 'framing seluruh badan dari ujung kepala hingga ujung kaki menapak tanah';

  // Realistic Depth of Field (No fake DSLR bokeh!)
  let dofGuidance = '';
  if (actualDevice === 'iphone13_ultra_wide') {
    dofGuidance = 'Kedalaman bidang sangat dalam (deep depth of field), hampir seluruh elemen latar depan dan latar belakang tampak jelas dengan ketajaman merata khas lensa ultra-wide smartphone.';
  } else if (actualDevice === 'iphone13_front_truedepth') {
    dofGuidance = 'Kedalaman bidang natural jarak satu lengan, latar belakang sedikit buram alami tanpa efek blur kecerdasan buatan yang berlebihan atau batas tepi rambut yang terpotong kasar.';
  } else {
    dofGuidance = 'Kedalaman bidang alami sensor smartphone (natural optical falloff), subjek utama sangat tajam dan fokus, sementara latar belakang memiliki kelembutan optik yang halus dan organik, BUKAN bokeh ekstrem kamera DSLR atau blur buatan.';
  }

  // Sensor dynamic range and low-light behavior
  let sensorBehavior = '';
  const isDimOrNight =
    lightingCondition.toLowerCase().includes('malam') ||
    lightingCondition.toLowerCase().includes('redup') ||
    lightingCondition.toLowerCase().includes('dim') ||
    lightingCondition.toLowerCase().includes('indoor');

  if (isDimOrNight) {
    sensorBehavior = 'Pencahayaan realistis kondisi redup: mempertahankan bayangan alami yang masuk akal, dengan sedikit grain sensor tipis yang organik pada area gelap (subtle low-noise filmic sensor grain), tidak dipaksa terang berlebihan secara artifisial.';
  } else {
    sensorBehavior = 'Pencahayaan siang alami: rentang dinamis (dynamic range) seimbang khas pemrosesan Smart HDR iPhone 13, dengan kontras lembut antara area terang dan bayangan, highlight tidak pecah, dan warna kulit tetap hangat autentik.';
  }

  // Mirror selfie rules
  let mirrorRules: string | undefined = undefined;
  if (actualDevice === 'iphone13_mirror_back' || actualDevice === 'iphone13_mirror_front') {
    mirrorRules = `Karakteristik Mirror Selfie iPhone 13 Nyata:
- Terlihat fisik perangkat ponsel pintar iPhone 13 yang dipegang secara alami oleh tangan subjek (posisi jari mencengkeram sisi ponsel secara logis).
- Modul kamera belakang khas iPhone 13 (dua lensa diagonal dalam modul kotak membulat) terlihat menghadap ke arah cermin.
- Pantulan cermin 100% konsisten dengan posisi tubuh, kepala, ekspresi, dan sumber cahaya di ruangan.
- Permukaan cermin memiliki kejernihan kaca realistis dengan sedikit pantulan cahaya ruangan tipis di sudut cermin.`;
  }

  return {
    deviceDescription: `Karakter visual fotografi smartphone Apple iPhone 13 (${details.name}), ${anglePhrase}, ${distancePhrase}.`,
    lensSpecs: `${details.focalLength}, ${details.aperture}, ${details.lensPerspective}.`,
    depthOfFieldGuidance: dofGuidance,
    lightingAndSensorRolloff: sensorBehavior,
    mirrorSelfieRules: mirrorRules,
    aspectRatioInstruction: `Rasio aspek gambar ${aspectRatio} (vertikal/portrait yang optimal untuk layar smartphone).`,
  };
}
