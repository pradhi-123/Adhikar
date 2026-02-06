'use client';

import { useLanguage, Language } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    const toggle = () => {
        if (language === 'en') setLanguage('hi');
        else if (language === 'hi') setLanguage('ta');
        else setLanguage('en');
    };

    const label = {
        'en': 'English',
        'hi': 'हिंदी',
        'ta': 'தமிழ்'
    };

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full"
            title="Switch Language"
        >
            <Globe size={18} className="text-blue-500" />
            <span>{label[language]}</span>
        </button>
    );
}
