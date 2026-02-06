'use client';

import React, { useState } from 'react';
import { schemes } from '@/lib/data/schemes';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ExternalLink, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function SchemesPage() {
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const [activeFilter, setActiveFilter] = useState('All');

    const recommendedSchemes = user ? schemes.filter(s => {
        if (s.eligibility.gender && s.eligibility.gender !== 'All' && s.eligibility.gender !== user.gender) return false;
        if (s.eligibility.minAge && (user.age || 0) < s.eligibility.minAge) return false;
        return true;
    }) : [];

    const filteredSchemes = activeFilter === 'All'
        ? schemes
        : schemes.filter(s => s.category === activeFilter);

    const categories = [
        { id: 'All', label: t('schemes.filter_all') },
        { id: 'Women', label: t('schemes.filter_women') },
        { id: 'Farmers', label: t('schemes.filter_farmers') },
        { id: 'Education', label: t('schemes.filter_education') },
        { id: 'Health', label: t('schemes.filter_health') },
        { id: 'Finance', label: t('schemes.filter_finance') },
        { id: 'Housing', label: t('schemes.filter_housing') },
        { id: 'Senior Citizens', label: t('schemes.filter_seniors') },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 md:pb-10 transition-colors duration-300">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 pt-8 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-all border border-slate-100 dark:border-slate-700 group">
                        <ArrowLeft size={20} className="text-slate-500 group-hover:text-blue-600 transition-colors" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{t('schemes.title')}</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('app.subtitle')}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 ${activeFilter === cat.id
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none translate-y-[-2px]'
                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Recommended (Only if user has profile) */}
                {user && recommendedSchemes.length > 0 && activeFilter === 'All' && (
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="text-amber-500" size={20} />
                            <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">{t('schemes.curated')}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedSchemes.map((scheme) => (
                                <SchemeCard key={scheme.id} scheme={scheme} isRecommended lang={language as any} t={t} />
                            ))}
                        </div>
                    </div>
                )}

                {/* All Schemes / Filtered Result */}
                <div>
                    <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight mb-6">
                        {activeFilter === 'All' ? t('schemes.filter_all') : activeFilter}
                    </h2>
                    {filteredSchemes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSchemes.map((scheme) => (
                                <SchemeCard key={scheme.id} scheme={scheme} lang={language as any} t={t} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-20 text-center">
                            <p className="text-slate-400 font-bold">{t('schemes.no_schemes')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SchemeCard({ scheme, isRecommended = false, lang, t }: { scheme: any, isRecommended?: boolean, lang: 'en' | 'hi' | 'ta', t: any }) {
    const title = scheme.title[lang] || scheme.title['en'];
    const ministry = scheme.ministry[lang] || scheme.ministry['en'];
    const description = scheme.description[lang] || scheme.description['en'];
    const benefits = scheme.benefits[lang] || scheme.benefits['en'] || [];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col hover:-translate-y-2 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-3xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <BookOpen size={24} />
                </div>
                {isRecommended && (
                    <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                        <Sparkles size={12} />
                        {t('schemes.match')}
                    </div>
                )}
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <div>
                        <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">{ministry}</p>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">{title}</h3>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl text-slate-400 group-hover:text-blue-600 transition-colors">
                        <ExternalLink size={18} />
                    </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">{description}</p>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700/50">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">{t('schemes.benefits')}</h3>
                    <ul className="space-y-2">
                        {benefits.slice(0, 2).map((b: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Link
                href={scheme.portalLink}
                target="_blank"
                className="mt-6 w-full py-4 bg-slate-900 dark:bg-white hover:bg-blue-600 dark:hover:bg-blue-400 text-white dark:text-slate-900 rounded-2xl text-sm font-bold transition-all text-center shadow-lg group-hover:shadow-blue-500/20"
            >
                {t('common.apply_now')}
            </Link>
        </div>
    );
}
