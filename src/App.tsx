/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WeddingConfig } from './types/wedding';
import { DEFAULT_WEDDING_CONFIG } from './defaultData';
import { testConnection } from './lib/firebase';
import { getWeddingConfig, saveWeddingConfig } from './services/weddingService';
import { BackgroundAtmosphere } from './components/animated/BackgroundAtmosphere';
import { CoverEnvelope } from './components/invitation/CoverEnvelope';
import { HeroSection } from './components/invitation/HeroSection';
import { CoupleSection } from './components/invitation/CoupleSection';
import { EventScheduleSection } from './components/invitation/EventScheduleSection';
import { LoveStorySection } from './components/invitation/LoveStorySection';
import { DigitalGiftSection } from './components/invitation/DigitalGiftSection';
import { RsvpGuestbookSection } from './components/invitation/RsvpGuestbookSection';
import { MusicPlayer } from './components/invitation/MusicPlayer';
import { Footer } from './components/invitation/Footer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [config, setConfig] = useState<WeddingConfig>(DEFAULT_WEDDING_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  const [guestName, setGuestName] = useState<string>('');
  const [isOpenInvitation, setIsOpenInvitation] = useState<boolean>(false);
  const [audioTrigger, setAudioTrigger] = useState<boolean>(false);

  // Admin CMS State
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);

  // Initialize data & check URL params
  useEffect(() => {
    // 1. Test Firestore connection on boot
    testConnection();

    // 2. Fetch live configuration from Cloud Firestore
    getWeddingConfig()
      .then((data) => {
        if (data) setConfig(data);
      })
      .catch((err) => {
        console.warn('Using local default config due to Firestore offline or initial state:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // 3. Parse URL query params
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const toParam = urlParams.get('to');
      if (toParam) {
        setGuestName(toParam);
      }

      // Check for ?autostart=1 (for testability)
      if (urlParams.get('autostart') === '1') {
        setIsOpenInvitation(true);
      }

      // Check for ?admin=1 or #admin (useful for mobile without physical keyboard)
      if (urlParams.get('admin') === '1' || window.location.hash === '#admin') {
        setIsAdminLoginOpen(true);
      }
    }

    // Secret hidden shortcut: Ctrl + Shift + 89
    let secretBuffer = '';
    let bufferTimeout: any = null;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      if (isCtrlOrMeta && e.shiftKey) {
        const isEight = e.key === '8' || e.key === '*' || e.code === 'Digit8';
        const isNine = e.key === '9' || e.key === '(' || e.code === 'Digit9';

        if (isEight) {
          secretBuffer = '8';
          if (bufferTimeout) clearTimeout(bufferTimeout);
          bufferTimeout = setTimeout(() => {
            secretBuffer = '';
          }, 3000);
        } else if (isNine && secretBuffer === '8') {
          secretBuffer = '';
          if (bufferTimeout) clearTimeout(bufferTimeout);
          setIsAdminLoginOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (bufferTimeout) clearTimeout(bufferTimeout);
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsOpenInvitation(true);
    setAudioTrigger(true);
    // Smooth scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveConfig = async (newConfig: WeddingConfig) => {
    await saveWeddingConfig(newConfig);
    setConfig(newConfig);
  };

  const handleResetDefault = async () => {
    await saveWeddingConfig(DEFAULT_WEDDING_CONFIG);
    setConfig(DEFAULT_WEDDING_CONFIG);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-amber-300 space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
        <p className="text-xs font-serif-luxury tracking-widest uppercase">
          Mempersiapkan Undangan Pernikahan...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-stone-100 overflow-x-hidden selection:bg-amber-400 selection:text-stone-950">
      {/* 3D Dynamic Background with Animated Couple Holding Hands */}
      <BackgroundAtmosphere themeId={config.theme} />

      {/* Luxury Opening Cover Envelope */}
      <CoverEnvelope
        config={config}
        guestName={guestName}
        isOpen={isOpenInvitation}
        onOpenInvitation={handleOpenInvitation}
      />

      {/* Main Wedding Invitation Frame (Mobile-First Luxury Container) */}
      <div className="relative z-10 max-w-lg md:max-w-xl mx-auto shadow-2xl min-h-screen flex flex-col backdrop-blur-[1px]">
        {/* Hero Section with Couple & Live Countdown */}
        <HeroSection config={config} />

        {/* Couple Profile Section */}
        <CoupleSection config={config} />

        {/* Event Schedule (Akad & Resepsi) Section */}
        <EventScheduleSection config={config} />

        {/* Love Story Journey Timeline */}
        <LoveStorySection config={config} />

        {/* Amplop Digital & Kado Section */}
        <DigitalGiftSection config={config} />

        {/* RSVP Form & Live Wishes Wall */}
        <RsvpGuestbookSection config={config} defaultGuestName={guestName} />

        {/* Footer with DexxDigital branding, TikTok, Shopee, Instagram & discreet admin trigger */}
        <Footer
          config={config}
          onOpenAdmin={() => setIsAdminLoginOpen(true)}
        />
      </div>

      {/* Floating Music Player */}
      <MusicPlayer music={config.music} autoPlayTrigger={audioTrigger} />

      {/* Secret Admin Login Modal */}
      <AdminLoginModal
        correctPin={config.adminSettings.pin}
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminDashboardOpen(true);
        }}
      />

      {/* Full-Featured Hidden Admin CMS Dashboard */}
      {isAdminDashboardOpen && (
        <AdminDashboard
          config={config}
          onSaveConfig={handleSaveConfig}
          onClose={() => setIsAdminDashboardOpen(false)}
          onResetDefault={handleResetDefault}
        />
      )}
    </div>
  );
}
