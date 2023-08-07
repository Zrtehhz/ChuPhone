import React from 'react';

interface PhoneSettingsProps {
  background: string;
  customRingtone: string | null;
  zoomLevel: number;
  volumeLevel: number;
  language: 'FR' | 'US';
  onChangeBackground: (option: string) => void;
  onCustomRingtoneSelect: (file: File | null) => void;
  onChangeZoomLevel: (value: number) => void;
  onChangeVolumeLevel: (value: number) => void;
  onChangeLanguage: (value: 'FR' | 'US') => void;
}

export function PhoneSettings({
  background,
  customRingtone,
  zoomLevel,
  volumeLevel,
  language,
  onChangeBackground,
  onCustomRingtoneSelect,
  onChangeZoomLevel,
  onChangeVolumeLevel,
  onChangeLanguage,
}: PhoneSettingsProps) {
  return (
    <div className="p-4 bg-neutral-800 rounded-lg">
      <h2 className="text-xl font-medium mb-4">Phone Settings</h2>

      {/* Option pour changer le fond d'écran */}
      <div className="mt-4">
        <span className="text-lg font-medium">Background:</span>
        <div className="flex gap-2 mt-2">
          <button
            className={`h-8 w-8 rounded-full bg-black ${
              background === 'default' ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => onChangeBackground('default')}
          />
          <button
            className={`h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 ${
              background === 'gradient' ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => onChangeBackground('gradient')}
          />
          {/* Ajoutez d'autres options de fond d'écran si nécessaire */}
        </div>
      </div>

      {/* Affiche le numéro de téléphone */}
      {/* Ajoutez ici l'affichage du numéro de téléphone (dialedNumber) */}

      {/* Custom sonnerie pour les sonneries */}
      <div className="mt-4">
        <span className="text-lg font-medium">Sonnerie personnalisée:</span>
        <input type="file" accept="audio/*" onChange={(e) => onCustomRingtoneSelect(e.target.files?.[0])} className="mt-2" />
        {customRingtone && (
          <audio src={customRingtone} controls className="mt-2" />
        )}
      </div>

      {/* Pouvoir zoomer */}
      <div className="mt-4">
        <span className="text-lg font-medium">Zoom:</span>
        <input
          type="range"
          min={50}
          max={200}
          step={10}
          value={zoomLevel}
          onChange={(e) => onChangeZoomLevel(Number(e.target.value))}
          className="mt-2"
        />
      </div>

      {/* Changer le volume du son */}
      <div className="mt-4">
        <span className="text-lg font-medium">Volume:</span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={volumeLevel}
          onChange={(e) => onChangeVolumeLevel(Number(e.target.value))}
          className="mt-2"
        />
      </div>

      {/* Changer la langue entre FR et US */}
      <div className="mt-4">
        <span className="text-lg font-medium">Langue:</span>
        <select
          value={language}
          onChange={(e) => onChangeLanguage(e.target.value as 'FR' | 'US')}
          className="mt-2"
        >
          <option value="FR">FR</option>
          <option value="US">US</option>
        </select>
      </div>
    </div>
  );
}
