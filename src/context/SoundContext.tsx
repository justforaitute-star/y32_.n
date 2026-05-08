import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';
import useSound from 'use-sound';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const BG_MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3';
const CLICK_SFX_URL = 'https://assets.mixkit.co/sfx/preview/mixkit-simple-click-631.mp3';

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const bgMusic = useRef<Howl | null>(null);

  const [playClick] = useSound(CLICK_SFX_URL, {
    volume: 0.5,
    soundEnabled: !isMuted,
  });

  useEffect(() => {
    bgMusic.current = new Howl({
      src: [BG_MUSIC_URL],
      loop: true,
      volume: 0.2,
      html5: true, // Better for long files
      autoplay: false,
    });

    return () => {
      if (bgMusic.current) {
        bgMusic.current.stop();
        bgMusic.current.unload();
      }
    };
  }, []);

  const toggleMute = () => {
    if (!bgMusic.current) return;

    if (isMuted) {
      bgMusic.current.play();
      setIsMuted(false);
    } else {
      bgMusic.current.pause();
      setIsMuted(true);
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playClick }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within a SoundProvider');
  }
  const { playClick, ...rest } = context;
  
  // Return a safe click wrapper that doesn't throw if called before user interaction
  const safePlayClick = () => {
    try {
      playClick();
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  };

  return { ...rest, playClick: safePlayClick };
};
