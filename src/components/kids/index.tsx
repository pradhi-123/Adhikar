'use client';

import React, { useState, useEffect } from 'react';
import { AIAssistant } from './components/AIAssistant';
import { AdventureMode } from './components/AdventureMode';
import { EmergencySection } from './components/EmergencySection';
import { Language } from './types';
import { TRANSLATIONS } from './constants';
import { MessageCircle, Map as MapIcon, PhoneCall, Languages, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'adventures' | 'emergency'>('assistant');
  const [lang, setLang] = useState<Language>('en');
  const { logout } = useAuth();

  // Update root class to change font family globally
  useEffect(() => {
    const langClass = `lang-${lang}`;
    document.body.classList.remove('lang-en', 'lang-hi', 'lang-ta');
    document.body.classList.add(langClass);
  }, [lang]);

  const toggleLang = () => {
    const sequence: Language[] = ['en', 'hi', 'ta'];
    const next = sequence[(sequence.indexOf(lang) + 1) % sequence.length];
    setLang(next);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen w-full bg-[#fef9c3] flex items-center justify-center p-0 md:p-4 lg:p-8 overflow-hidden">
      <div className="w-full max-w-5xl h-screen md:h-[90vh] bg-white flex flex-col shadow-2xl md:rounded-[3rem] overflow-hidden font-bold border-0 md:border-8 border-white transition-all">
        {/* Top Header */}
        <header className="bg-white px-6 py-5 flex items-center justify-between border-b-4 border-blue-100 shrink-0 shadow-sm z-20">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-2xl shadow-lg rotate-3">
              <Shield size={28} />
            </div>
            <h1 className="text-3xl md:text-4xl text-blue-900 cartoon-logo">{t.logo}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center space-x-2 bg-blue-50 px-3 md:px-4 py-2 rounded-2xl text-blue-600 font-black text-xs md:text-sm border-4 border-blue-100 hover:bg-blue-100 transition-all active:scale-95 shadow-sm"
            >
              <Languages size={20} />
              <span className="uppercase">{lang}</span>
            </button>
            <button
              onClick={logout}
              className="bg-red-50 p-2 md:p-2 rounded-2xl text-red-500 border-4 border-red-100 hover:bg-red-100 transition-all active:scale-95 shadow-sm"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white/40 shadow-inner relative z-10">
          {activeTab === 'assistant' && <AIAssistant lang={lang} />}
          {activeTab === 'adventures' && <AdventureMode lang={lang} />}
          {activeTab === 'emergency' && <EmergencySection lang={lang} />}
        </main>

        {/* Navigation - Bottom bar on mobile, centered dock on larger screens */}
        <nav className="bg-white border-t-4 border-blue-50 px-2 md:px-6 py-4 shrink-0 flex items-center justify-around shadow-[0_-10px_30px_-5px_rgba(59,130,246,0.1)] z-20">
          <NavButton
            active={activeTab === 'assistant'}
            onClick={() => setActiveTab('assistant')}
            icon={<MessageCircle size={28} />}
            label={t.assistant}
          />
          <NavButton
            active={activeTab === 'adventures'}
            onClick={() => setActiveTab('adventures')}
            icon={<MapIcon size={28} />}
            label={t.adventures}
          />
          <NavButton
            active={activeTab === 'emergency'}
            onClick={() => setActiveTab('emergency')}
            icon={<PhoneCall size={28} />}
            label={t.emergency}
            danger={activeTab === 'emergency'}
          />
        </nav>
      </div>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label, danger }) => {
  const activeColor = danger ? 'text-red-600 bg-red-50 border-red-200' : 'text-blue-600 bg-blue-50 border-blue-200';
  const inactiveColor = 'text-gray-400 hover:text-blue-400 border-transparent';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center px-4 py-3 rounded-3xl transition-all duration-300 min-w-[70px] md:min-w-[120px] border-b-4 ${active ? activeColor + ' shadow-lg translate-y-[-4px]' : inactiveColor}`}
    >
      <div className={`mb-1 transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`}>
        {icon}
      </div>
      <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-tight ${active ? 'opacity-100' : 'opacity-60'}`}>
        {label}
      </span>
    </button>
  );
};

export default App;
