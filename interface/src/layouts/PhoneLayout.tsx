import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';
import { TopBar } from '../components/TopBar';
import { usePlayStore } from '../hooks/usePlayStore';
import phoneShell from './../assets/s20.png';
import { PhoneSettings } from '../apps/PhoneSettings';
import { Phone } from '../apps/Phone';

export function PhoneLayout() {
  // State for the settings panel
  const [showSettings, setShowSettings] = useState(false);

  // Get the current location from React Router
  const location = useLocation();

  // State for phone background
  const [phoneBackground, setPhoneBackground] = useState("");

  // State for installed apps
  const { apps: installedApps } = usePlayStore();

  // Side effects for setting the phone background based on the current location
  useEffect(() => {
    const currentApp = installedApps.find(app => app.routePath === location.pathname);

    setPhoneBackground(
      location.pathname === '/home'
        ? "bg-[url('https://i.pinimg.com/736x/c1/9d/79/c19d7964360a0144b39a0e4b67ca2cfb.jpg')]"
        : currentApp?.background || 'bg-neutral-900'
    );
  }, [installedApps, location.pathname]);

  // State and functions for customization options
  const [background, setBackground] = useState('default');
  const [customRingtone, setCustomRingtone] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [language, setLanguage] = useState('en');

  // Functions for handling customization options
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
  <div className="relative select-none">
        <img src={phoneShell} draggable="false" />

        <div className="w-full h-full p-4 absolute inset-0 flex flex-col items-center justify-between">
          <TopBar />

          {/* Phone screen */}
          <div className="grow h-full w-full">
            <div
              className={`absolute h-full w-full ${phoneBackground} bg-no-repeat bg-cover inset-0 -z-10 rounded-[4rem]`}
            />
            <Outlet /> {/* This will render the corresponding app based on the current route */}
          </div>

          <NavigationBar />
        </div>
      </div>
  );
}
