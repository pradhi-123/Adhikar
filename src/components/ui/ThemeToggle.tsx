'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-[100] p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-yellow-400 transition-all hover:scale-110 active:scale-95 group"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon size={20} className="group-hover:-rotate-12 transition-transform duration-300" />
            ) : (
                <Sun size={20} className="group-hover:rotate-45 transition-transform duration-300" />
            )}
        </button>
    );
}
