'use client';

import React, { useState, useEffect } from 'react';
import { laws } from '@/lib/data/laws';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Section } from '@/types';

export default function LawsPage() {
    const { t, language } = useLanguage();
    const [activeBookTitle, setActiveBookTitle] = useState<string>('');
    const [activeBookChapter, setActiveBookChapter] = useState<string>('');
    const [activeSections, setActiveSections] = useState<Section[]>([]);

    // Auto-load First Law (Constitution) on mount
    useEffect(() => {
        const defaultLaw = laws.find(l => l.id === 'const-india') || laws[0];
        if (defaultLaw) {
            setActiveBookTitle(defaultLaw.title[language] || defaultLaw.title['en']);
            setActiveBookChapter(t('laws.important_provisions'));
            setActiveSections(defaultLaw.sections);
        }
    }, [language, t]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 md:pb-0">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 pt-6 mb-4 flex items-center gap-4">
                <Link href="/" className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-all border border-slate-100 dark:border-slate-700 group">
                    <ArrowLeft size={20} className="text-slate-500 group-hover:text-blue-600 transition-colors" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{t('laws.title')}</h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('laws.subtitle')}</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 h-[calc(100vh-140px)] flex flex-col gap-6">

                {/* Law Selection Grid */}
                <div className="shrink-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-x-auto pb-2 no-scrollbar md:overflow-visible">
                        {laws.map((law) => {
                            const title = law.title[language] || law.title['en'];
                            return (
                                <button
                                    key={law.id}
                                    onClick={() => {
                                        setActiveBookTitle(title);
                                        setActiveSections(law.sections);
                                        setActiveBookChapter(t('laws.important_provisions'));
                                    }}
                                    className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-start text-left gap-2 group shrink-0 w-[160px] md:w-auto ${activeBookTitle === title
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-none translate-y-[-4px]'
                                            : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-blue-400'
                                        }`}
                                >
                                    <div className={`p-2 rounded-xl transition-colors ${activeBookTitle === title ? 'bg-white/20' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600'
                                        }`}>
                                        <BookOpen size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-[11px] leading-tight line-clamp-2 uppercase tracking-tighter">
                                            {title}
                                        </h3>
                                        <p className={`text-[9px] mt-1 font-bold opacity-60 ${activeBookTitle === title ? 'text-white' : 'text-slate-400'}`}>
                                            {law.year} • {law.sections.length} {t('laws.important_provisions').toUpperCase()}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Interactive Reader Area */}
                <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 shadow-2xl overflow-hidden rounded-[3rem] border border-slate-100 dark:border-slate-800">
                    {/* Reader Header */}
                    <div className="px-8 py-5 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-xs font-black text-blue-600 dark:text-blue-400 whitespace-nowrap uppercase tracking-widest">{activeBookTitle}</span>
                            <span className="text-slate-300">/</span>
                            <span className="text-xs font-bold text-slate-500 truncate">{activeBookChapter}</span>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar scroll-smooth">
                        {activeSections.length > 0 ? (
                            <>
                                {activeSections.map((section, index) => {
                                    const text = section.text[language] || section.text['en'];
                                    const simplified = section.simplified[language] || section.simplified['en'];
                                    const cases = section.cases[language] || section.cases['en'] || [];

                                    return (
                                        <div key={index} className="group relative pl-6 border-l-4 border-slate-200 dark:border-slate-700 hover:border-blue-600 transition-colors">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-blue-600 transition-colors"></div>

                                            <div className="flex items-baseline gap-3 mb-3">
                                                <span className="text-xl font-black text-slate-300 group-hover:text-blue-600 transition-colors select-none">
                                                    {section.number}
                                                </span>
                                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">
                                                    {text}
                                                </h3>
                                            </div>

                                            <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify mt-3 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 shadow-sm">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
                                                    <span>{t('laws.simplified_meaning')}</span>
                                                    <div className="h-[1px] flex-1 bg-blue-100 dark:bg-blue-900/40"></div>
                                                </div>
                                                {simplified}
                                            </div>

                                            {cases.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {cases.map((c, i) => (
                                                        <span key={i} className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                                                            {c}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Action Guide & Authority (Dynamic) */}
                                {laws.find(l => (l.title[language] || l.title['en']) === activeBookTitle) && (
                                    <div className="mt-16 pt-16 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-8 pb-10">
                                        {(() => {
                                            const law = laws.find(l => (l.title[language] || l.title['en']) === activeBookTitle);
                                            const steps = law?.actionGuide?.[language] || law?.actionGuide?.['en'] || [];
                                            const authName = law?.authority?.name[language] || law?.authority?.name['en'];

                                            return (
                                                <>
                                                    {steps.length > 0 && (
                                                        <div className="bg-green-50 dark:bg-green-900/10 p-8 rounded-[3rem] border border-green-100 dark:border-green-800/30">
                                                            <h4 className="text-green-700 dark:text-green-400 font-black text-xl mb-6 flex items-center gap-3">
                                                                <span className="text-2xl">🚀</span> {t('laws.action_guide')}
                                                            </h4>
                                                            <ul className="space-y-4">
                                                                {steps.map((step, i) => (
                                                                    <li key={i} className="flex items-start gap-4 text-slate-700 dark:text-slate-300 font-bold text-sm leading-relaxed">
                                                                        <span className="w-6 h-6 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center text-[10px] text-green-700 dark:text-green-300 shrink-0 mt-0.5">{i + 1}</span>
                                                                        {step}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {authName && (
                                                        <div className="bg-blue-600 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group/card transform transition-all hover:scale-[1.01]">
                                                            <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12 transition-transform group-hover/card:scale-110">
                                                                <BookOpen size={160} />
                                                            </div>
                                                            <h4 className="font-black text-xl mb-2">{t('laws.authority_assistance')}</h4>
                                                            <p className="font-bold opacity-70 text-xs mb-6 uppercase tracking-widest">{t('laws.authority_connect')}</p>

                                                            <div className="space-y-4 relative z-10">
                                                                <div>
                                                                    <p className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-1">{t('laws.authority_name')}</p>
                                                                    <p className="font-black text-2xl tracking-tighter">{authName}</p>
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <p className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-1">{t('laws.helpline')}</p>
                                                                        <p className="font-black text-xl text-blue-100">{law?.authority?.contact}</p>
                                                                    </div>
                                                                    {law?.authority?.email && (
                                                                        <div>
                                                                            <p className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-1">{t('laws.email')}</p>
                                                                            <p className="font-bold text-xs truncate text-blue-200">{law?.authority?.email}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </div>
                                )}

                                <div className="h-24 flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <div className="w-12 h-[1px] bg-slate-200 dark:bg-slate-800 mb-4"></div>
                                    {t('laws.end_collection')}
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-10 py-24">
                                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-800">
                                    <BookOpen size={48} className="text-slate-200 dark:text-slate-800" />
                                </div>
                                <h3 className="text-xl font-black text-slate-300 dark:text-slate-800 uppercase tracking-tighter">{t('laws.select_law')}</h3>
                                <p className="text-slate-400 dark:text-slate-700 text-xs font-bold mt-2 max-w-[200px] mx-auto uppercase tracking-widest">Select a law above.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
