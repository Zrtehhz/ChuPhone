import React, { useState } from 'react';
import { BsVoicemail } from 'react-icons/bs';
import { FiPhoneCall, FiMic, FiMicOff, FiPhoneOff, FiVolume2, FiVolumeX, FiUsers, FiPhone, FiGrid, FiKeyboard } from 'react-icons/fi';
import { HiOutlineBackspace, HiOutlineDotsVertical } from 'react-icons/hi';

interface ICharacter {
  id: number;
  value: string;
  alphanumericValue: string | React.ReactNode;
}

const availableCharacters: ICharacter[] = [
  {
    id: 1,
    value: '1',
    alphanumericValue: <BsVoicemail className='text-lg' />
  },
  {
    id: 2,
    value: '2',
    alphanumericValue: 'ABC'
  },
  {
    id: 3,
    value: '3',
    alphanumericValue: 'DEF'
  },
  {
    id: 4,
    value: '4',
    alphanumericValue: 'GHI'
  },
  {
    id: 5,
    value: '5',
    alphanumericValue: 'JKL'
  },
  {
    id: 6,
    value: '6',
    alphanumericValue: 'MNO'
  },
  {
    id: 7,
    value: '7',
    alphanumericValue: 'PQRS'
  },
  {
    id: 8,
    value: '8',
    alphanumericValue: 'TUV'
  },
  {
    id: 9,
    value: '9',
    alphanumericValue: 'WXYZ'
  },
  {
    id: 10,
    value: '*',
    alphanumericValue: ''
  },
  {
    id: 11,
    value: '0',
    alphanumericValue: '+'
  },
  {
    id: 12,
    value: '#',
    alphanumericValue: ''
  }
];

interface PhoneProps { }

enum CallStatus {
  Idle,
  Calling,
  Connected,
}

export function Phone({ }: PhoneProps) {
  const [dialedNumber, setDialedNumber] = useState<string>('');
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.Idle);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(false);
  const [showContactPage, setShowContactPage] = useState<boolean>(false);

  function handleCharacterClick(character: ICharacter) {
    setDialedNumber((prev) => prev + character.value);
  }

  function handleBackspaceClick() {
    setDialedNumber((prev) => prev.slice(0, -1));
  }

  function handleCallClick() {
    if (callStatus === CallStatus.Idle) {
      setCallStatus(CallStatus.Calling);
      // Simuler un délai d'appel de 3 secondes avant de passer à l'état "Connecté"
      setTimeout(() => {
        setCallStatus(CallStatus.Connected);
      }, 3000);
    } else if (callStatus === CallStatus.Calling) {
      // Annuler l'appel en cours si on clique à nouveau sur le bouton "Appeler"
      setCallStatus(CallStatus.Idle);
    }
  }

  function handleMicClick() {
    setIsMicMuted((prev) => !prev);
  }

  function handleSpeakerClick() {
    setIsSpeakerOn((prev) => !prev);
  }

  function handleContactClick() {
    setShowContactPage(true);
  }

  function handleContactPageClose() {
    setShowContactPage(false);
  }

  if (showContactPage) {
    // Afficher la page de contact lorsque showContactPage est true
    return (
      <div className="h-full w-full px-8 text-neutral-100 py-4 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">Page de Contact</h2>
        {/* Contenu de la page de contact */}
        {/* ... Ajoutez ici le contenu de la page de contact ... */}
        <button
          className="p-3 rounded-lg bg-red-700 text-white mt-4 hover:bg-red-600 transition-all"
          onClick={handleContactPageClose}
        >
          Fermer
        </button>
      </div>
    );
  }

  if (callStatus === CallStatus.Calling) {
    return (
      <div className="h-full w-full px-8 text-neutral-100 py-4 flex flex-col justify-center items-center">
        <span className='text-lg mb-2'>En cours d'appel...</span>
        <button
          className="p-2 rounded-full bg-red-700 text-white hover:bg-red-600 transition-all"
          onClick={handleCallClick}
        >
          <FiPhoneCall className="text-xl" />
        </button>
      </div>
    );
  }

  if (callStatus === CallStatus.Connected) {
    return (
      <div className="h-full w-full px-8 text-neutral-100 py-4 flex flex-col justify-center items-center">
        <div className='flex flex-col items-center gap-4'>
          <span className="text-3xl font-semibold mb-4">{dialedNumber}</span>

          <button
            className={`p-2 rounded-lg ${
              isMicMuted ? 'bg-red-700' : 'bg-green-700'
            } text-white hover:bg-green-600 transition-all`}
            onClick={handleMicClick}
          >
            {isMicMuted ? <FiMicOff className="text-xl" /> : <FiMic className="text-xl" />}
          </button>

          <button
            className="p-2 rounded-lg bg-red-700 text-white hover:bg-red-600 transition-all"
            onClick={() => setCallStatus(CallStatus.Idle)}
          >
            <FiPhoneOff className="text-xl" />
          </button>

          <button
            className={`p-2 rounded-lg ${
              isSpeakerOn ? 'bg-green-700' : 'bg-neutral-800'
            } text-white hover:bg-green-600 hover:text-neutral-100 transition-all`}
            onClick={handleSpeakerClick}
          >
            {isSpeakerOn ? <FiVolume2 className="text-xl" /> : <FiVolumeX className="text-xl" />}
          </button>
        </div>
      </div>
    );
  }

  // État initial : afficher l'interface de numérotation
  return (
    <div className="h-full w-full px-8 text-neutral-100 py-4 flex flex-col justify-between">
      <span className='text-lg'>Telephone</span>

      <div className='flex flex-col items-center gap-4'>
        <div className='w-full flex items-center justify-between'>
          <button
            type='button'
            className='p-2 rounded-lg text-xl text-neutral-500 hover:text-neutral-100 hover:bg-neutral-800 transition-all flex items-center justify-center'
            onClick={handleContactClick}
          >
            <HiOutlineDotsVertical />
          </button>

          <span className='font-medium text-3xl'>{dialedNumber}</span>

          <button
            type='button'
            onClick={handleBackspaceClick}
            className='p-2 rounded-lg text-xl text-neutral-500 hover:text-neutral-100 hover:bg-neutral-800 transition-all flex items-center justify-center'
          >
            <HiOutlineBackspace />
          </button>
        </div>

        <div className="w-full grid grid-cols-3 grid-rows-auto gap-4 pt-2 border-t border-neutral-800">
          {availableCharacters.map(({ id, value, alphanumericValue }) => (
            <button
              type="button"
              onClick={() => handleCharacterClick({ id, value, alphanumericValue })}
              key={id}
              className="flex flex-col justify-center items-center p-2 rounded-lg hover:bg-neutral-800 hover:cursor-pointer"
            >
              <span className="text-3xl font-semibold">{value}</span>
              <span className="text-xs text-neutral-400">{alphanumericValue}</span>
            </button>
          ))}
        </div>

        <button
          className={`w-fit rounded-full ${
            callStatus === CallStatus.Calling ? 'bg-red-700' : 'bg-green-700'
          } text-white flex items-center gap-2 p-4 hover:bg-green-600 transition-all`}
          onClick={handleCallClick}
          disabled={callStatus !== CallStatus.Idle}
        >
          <FiPhoneCall className="text-xl" />
          <span className='font-medium'>
            {callStatus === CallStatus.Calling ? 'Annuler l\'appel' : 'Se connecter'}
          </span>
        </button>
      </div>
    </div>
  );
}
