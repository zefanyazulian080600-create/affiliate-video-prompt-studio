'use client';

import React from 'react';
import { CameraDeviceType, CameraAngleType, CameraDistanceType, PhotoAspectRatio } from '@/types/photo';
import { IPHONE13_CAMERA_DETAILS } from '@/lib/photo-engine/constants';
import { Camera, Smartphone, Layers, ShieldCheck, Sparkles } from 'lucide-react';

interface IPhone13CameraSelectorProps {
  cameraDevice: CameraDeviceType;
  cameraAngle: CameraAngleType;
  cameraDistance: CameraDistanceType;
  aspectRatio: PhotoAspectRatio;
  realismIntensity: 'natural_iphone' | 'raw_unretouched' | 'subtle_warmth';
  onChange: (fields: Partial<{
    cameraDevice: CameraDeviceType;
    cameraAngle: CameraAngleType;
    cameraDistance: CameraDistanceType;
    aspectRatio: PhotoAspectRatio;
    realismIntensity: 'natural_iphone' | 'raw_unretouched' | 'subtle_warmth';
  }>) => void;
}

export const IPhone13CameraSelector: React.FC<IPhone13CameraSelectorProps> = ({
  cameraDevice,
  cameraAngle,
  cameraDistance,
  aspectRatio,
  realismIntensity,
  onChange,
}) => {
  const currentDetails = IPHONE13_CAMERA_DETAILS[cameraDevice];

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            Apple iPhone 13 Photography Realism Engine
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60">
              SMARTPHONE OPTICS
            </span>
          </h3>
          <p className="text-[11px] text-neutral-400">
            Karakteristik lensa, depth-of-field alami sensor, dan distorsi optik nyata
          </p>
        </div>
      </div>

      {/* Camera Lens Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-300 block">
          Pilih Kamera / Lensa iPhone 13:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {(
            [
              'iphone13_main_back',
              'iphone13_ultra_wide',
              'iphone13_front_truedepth',
              'iphone13_mirror_back',
              'iphone13_mirror_front',
              'auto',
            ] as CameraDeviceType[]
          ).map(key => {
            const item = IPHONE13_CAMERA_DETAILS[key];
            const isSelected = cameraDevice === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onChange({ cameraDevice: key })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-950/40 text-white shadow-sm ring-1 ring-blue-500/50'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>{item.name}</span>
                  <span className="text-[9px] font-mono text-blue-400">{item.aperture}</span>
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 line-clamp-2">
                  {item.lensPerspective}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Camera Controls (Angle, Distance, Aspect Ratio, Realism Intensity) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {/* Sudut Kamera */}
        <div>
          <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
            Sudut Kamera (Angle):
          </label>
          <select
            value={cameraAngle}
            onChange={e => onChange({ cameraAngle: e.target.value as CameraAngleType })}
            className="w-full bg-neutral-950 border border-neutral-700 focus:border-blue-500 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="eye_level">Eye Level (Sejajar Mata)</option>
            <option value="low_angle">Low Angle (Sedikit Rendah)</option>
            <option value="high_angle">High Angle (Sedikit Tinggi)</option>
            <option value="slight_tilt">Slight Tilt (Kemiringan Kasual)</option>
            <option value="candid_overhead">Candid Overhead (Dari Atas)</option>
          </select>
        </div>

        {/* Jarak Kamera / Framing */}
        <div>
          <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
            Jarak Framing (Distance):
          </label>
          <select
            value={cameraDistance}
            onChange={e => onChange({ cameraDistance: e.target.value as CameraDistanceType })}
            className="w-full bg-neutral-950 border border-neutral-700 focus:border-blue-500 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="close_up">Close-Up (Dada ke Atas)</option>
            <option value="medium_shot">Medium Shot (Pinggang ke Atas)</option>
            <option value="half_body">Half Body (Paha ke Atas)</option>
            <option value="three_quarter">Three Quarter (Lutut ke Atas)</option>
            <option value="full_length">Full Length (Seluruh Badan)</option>
          </select>
        </div>

        {/* Aspek Rasio */}
        <div>
          <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
            Rasio Aspek Foto:
          </label>
          <div className="grid grid-cols-4 gap-1">
            {(['4:5', '9:16', '1:1', '16:9'] as PhotoAspectRatio[]).map(ratio => (
              <button
                key={ratio}
                type="button"
                onClick={() => onChange({ aspectRatio: ratio })}
                className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  aspectRatio === ratio
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Intensitas Realisme */}
        <div>
          <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
            Karakter Realisme Kulit:
          </label>
          <select
            value={realismIntensity}
            onChange={e =>
              onChange({
                realismIntensity: e.target.value as 'natural_iphone' | 'raw_unretouched' | 'subtle_warmth',
              })
            }
            className="w-full bg-neutral-950 border border-neutral-700 focus:border-blue-500 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="raw_unretouched">Raw Unretouched (100% Asli)</option>
            <option value="natural_iphone">Natural iPhone Smart HDR</option>
            <option value="subtle_warmth">Subtle Warmth (Golden Tone)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
