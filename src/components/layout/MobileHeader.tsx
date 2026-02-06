
'use client';

import Link from 'next/link';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useAuth } from '@/context/AuthContext';

export default function MobileHeader() {
    const { user } = useAuth();

    return (
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-40">
            {/* Brand */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-blue-500/30">A</div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Adhikar</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <div className="w-auto">
                    <LanguageToggle />
                </div>
                {user && (
                    <Link href="/profile" className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                        {user.name?.charAt(0) || 'U'}
                    </Link>
                )}
            </div>
        </header>
    );
}
