'use client';

import React, { useState } from 'react';
import { LOCALIZED_HELPLINES, STATES, TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { Phone, Info, MapPin, ExternalLink, ShieldAlert } from 'lucide-react';

export const EmergencySection: React.FC<{ lang: Language }> = ({ lang }) => {
  const [selectedState, setSelectedState] = useState('All India');

  const t = TRANSLATIONS[lang];
  const helplines = LOCALIZED_HELPLINES[lang];

  const filteredHelplines = helplines.filter(h =>
    selectedState === 'All India' || h.state === selectedState || !h.state
  );

  return (
    <div className="p-4 md:p-8 bg-white/20 min-h-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-red-900 italic uppercase">{t.emergencyTitle}</h2>
            <p className="text-red-600 text-sm md:text-base font-bold">{t.emergencySubtitle}</p>
          </div>
          <div className="p-4 bg-red-100 rounded-3xl shadow-lg rotate-6">
            <ShieldAlert className="text-red-500" size={40} />
          </div>
        </div>

        <div className="mb-10 bg-white p-5 md:p-6 rounded-[2rem] shadow-xl border-4 border-red-50 max-w-md">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block px-2">{t.locationLabel}</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" size={20} />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full pl-12 pr-10 py-4 bg-red-50 border-none rounded-2xl text-red-900 font-black focus:ring-4 focus:ring-red-100 appearance-none cursor-pointer text-lg shadow-inner"
            >
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-red-400">▼</div>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {filteredHelplines.map((h, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-xl border-b-8 border-transparent hover:border-red-400 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1.5 rounded-xl mb-4 inline-block shadow-sm">
                  {h.category}
                </span>
                <h3 className="font-black text-xl text-gray-900">{h.name}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed font-bold">{h.description}</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="text-2xl md:text-3xl font-black text-red-600 tracking-tighter">
                  {h.number}
                </div>
                <a
                  href={`tel:${h.number}`}
                  className="bg-red-500 text-white p-5 rounded-2xl shadow-[0_8px_0_rgb(153,27,27)] transition-all flex items-center justify-center shrink-0"
                >
                  <Phone size={28} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-100/50 p-6 md:p-8 rounded-[2.5rem] border-4 border-blue-200 shadow-lg relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <ShieldAlert size={120} />
          </div>
          <h3 className="font-black text-xl md:text-2xl text-blue-900 mb-4 flex items-center">
            <Info size={24} className="mr-3 text-blue-600" /> {t.legalAidTitle}
          </h3>
          <p className="text-sm md:text-base text-blue-800 leading-relaxed mb-6 font-bold max-w-2xl">
            {t.legalAidText}
          </p>
          <button className="w-full md:w-auto bg-white text-blue-600 font-black py-4 px-8 rounded-2xl shadow-md border-b-4 border-blue-200 transition-all flex items-center justify-center text-sm md:text-base">
            {t.visitNalsa} <ExternalLink size={16} className="ml-2" />
          </button>
        </div>

        <div className="mt-10 bg-gray-100/50 p-5 rounded-2xl text-[11px] md:text-xs text-gray-400 text-center font-bold">
          {t.disclaimer}
        </div>
      </div>
    </div>
  );
};
