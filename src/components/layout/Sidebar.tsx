'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, ShieldCheck, Siren, User, LogOut, FileText } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

export default function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const { t } = useLanguage();

    const links = [
        { name: t('nav.dashboard'), href: '/', icon: Home },
        { name: t('nav.situation'), href: '/situation', icon: FileText },
        { name: t('nav.laws'), href: '/laws', icon: BookOpen },
        { name: t('nav.schemes'), href: '/schemes', icon: ShieldCheck },
        { name: t('nav.emergency'), href: '/emergency', icon: Siren },
        { name: t('nav.profile'), href: '/profile', icon: User },
    ];

    return (
        <aside className="sidebar hidden md:flex dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
            {/* Brand */}
            <div className="mb-8 px-2">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-500 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg text-white flex items-center justify-center text-lg shadow-lg shadow-blue-500/30">A</div>
                    Adhikar
                </h1>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 pl-1">Civic Empowerment Portal</p>
            </div>

            {/* User Mini Profile */}
            <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name || 'Guest'}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.profession || 'Citizen'}</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${isActive
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-semibold'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                        >
                            <Icon size={20} className={isActive ? "text-blue-600 dark:text-blue-400" : ""} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <LanguageToggle />

                <button
                    onClick={logout}
                    className="nav-link w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    <LogOut size={20} />
                    {t('nav.logout')}
                </button>
            </div>
        </aside>
    );
}
