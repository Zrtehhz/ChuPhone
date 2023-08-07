import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';
import { TopBar } from '../components/TopBar';
import { usePlayStore } from '../hooks/usePlayStore';
import phoneShell from './../assets/s20.png';
import { PhoneSettings } from '../apps/Settings';

export function PhoneLayout() {
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const [phoneBackground, setPhoneBackground] = useState("");
  const { apps: installedApps } = usePlayStore();

  useEffect(() => {
    const currentApp = installedApps.find(app => app.routePath === location.pathname);

    setPhoneBackground(location.pathname === '/home' ? "bg-[url('https://i.pinimg.com/736x/c1/9d/79/c19d7964360a0144b39a0e4b67ca2cfb.jpg')]" : currentApp?.background || 'bg-neutral-900');
  }, [location.pathname])

  // États et fonctions pour les options de personnalisation
  const [background, setBackground] = useState('default');
  const [customRingtone, setCustomRingtone] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [language, setLanguage] = useState('en');

  // Fonctions de gestion des options
  const handleChangeBackground = (backgroundOption) => {
    setBackground(backgroundOption);
  };

  const handleCustomRingtoneSelect = (ringtoneFile) => {
    setCustomRingtone(ringtoneFile);
  };

  const handleChangeZoomLevel = (zoomLevel) => {
    setZoomLevel(zoomLevel);
  };

  const handleChangeVolumeLevel = (volumeLevel) => {
    setVolumeLevel(volumeLevel);
  };

  const handleChangeLanguage = (language) => {
    setLanguage(language);
  };

  return (
    <div className="h-screen w-screen flex bg-neutral-900">
      <div className="h-full w-4/5 bg-neutral-700 p-4">
        {/* Ajoutez le composant Phone ici avec les options de personnalisation */}
        <Phone
          background={background}
          customRingtone={customRingtone}
          zoomLevel={zoomLevel}
          volumeLevel={volumeLevel}
          language={language}
        />
      </div>
      <div className="h-full w-1/5 bg-neutral-900 p-4">
        {showSettings && (
          <PhoneSettings
            background={background}
            customRingtone={customRingtone}
            zoomLevel={zoomLevel}
            volumeLevel={volumeLevel}
            language={language}
            onChangeBackground={handleChangeBackground}
            onCustomRingtoneSelect={handleCustomRingtoneSelect}
            onChangeZoomLevel={handleChangeZoomLevel}
            onChangeVolumeLevel={handleChangeVolumeLevel}
            onChangeLanguage={handleChangeLanguage}
          />
        )}
        <button
          className="mt-4 bg-blue-500 text-white rounded-lg p-2 w-full"
          onClick={() => setShowSettings((prev) => !prev)}
        >
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>
      </div>
      <div className='relative select-none'>
        <img src={phoneShell} draggable="false" />

        <div className='w-full h-full p-4 absolute inset-0 flex flex-col items-center justify-between'>
          <TopBar />

          <div className="grow h-full w-full">
            <div className={`absolute h-full w-full ${phoneBackground} bg-no-repeat bg-cover inset-0 -z-10 rounded-[4rem]`} />
            <Outlet />
          </div>

          <NavigationBar />
        </div>

      </div>
    </div>
  );
}
