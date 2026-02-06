'use client';

import { emergencyContacts } from '@/lib/data/emergency';
import { Phone, MapPin, ArrowLeft, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function EmergencyPage() {
    const { t, language } = useLanguage();

    return (
        <div className="space-y-6 animate-enter pb-24 md:pb-10 mt-6 lg:mt-0">
            <header className="flex items-center justify-between py-4">
                <Link href="/" className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-soft border border-slate-100 dark:border-slate-700">
                    <ArrowLeft size={20} className="text-slate-500" />
                </Link>
                <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
                    <MapPin size={12} />
                    <span>{t('nav.emergency')} {t('dash.verified')}</span>
                </div>
            </header>

            <div className="text-center py-6">
                <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 shadow-lg shadow-red-100 dark:shadow-none">
                    <ShieldAlert size={40} />
                </div>
                <h1 className="text-3xl font-black text-red-600 dark:text-red-500 uppercase tracking-tighter">{t('nav.emergency')} SOS</h1>
                <p className="text-slate-400 dark:text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">{t('app.subtitle')}</p>
            </div>

            <div className="grid gap-4 max-w-xl mx-auto">
                {emergencyContacts.map((contact, i) => (
                    <a href={`tel:${contact.number}`} key={contact.id}
                        className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] flex items-center justify-between border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group active:scale-95 transition-all"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative z-10 flex items-center gap-4 group-hover:text-white transition-colors">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center font-black text-lg group-hover:bg-white/20 group-hover:text-white transition-colors">
                                {contact.number === '100' ? 'P' : contact.number === '102' ? 'A' : 'H'}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-white transition-colors">
                                    {contact.title[language] || contact.title['en']}
                                </h3>
                                <p className="text-[10px] font-black uppercase text-slate-400 group-hover:text-white/80 transition-colors tracking-widest">{contact.type}</p>
                            </div>
                        </div>

                        <div className="relative z-10 text-right">
                            <p className="text-2xl font-black text-red-600 dark:text-red-500 group-hover:text-white transition-colors tracking-tighter">{contact.number}</p>
                            <div className="flex items-center justify-end gap-1 mt-1 text-[10px] font-bold text-slate-300 group-hover:text-white/60 transition-colors uppercase">
                                <Phone size={10} /> Call Now
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="text-center pt-10">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Stay Safe • Adhikar</p>
            </div>
        </div>
    );
}
