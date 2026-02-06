'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquareWarning, BookOpen, ShieldCheck, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function BottomNav() {
    const pathname = usePathname();
    const { t } = useLanguage();

    const navItems = [
        { href: '/', icon: Home, label: t('nav.dashboard') },
        { href: '/situation', icon: MessageSquareWarning, label: 'Ask' }, // Could use t('nav.situation') but 'Ask' is shorter for mobile
        { href: '/laws', icon: BookOpen, label: t('nav.laws').split(' ')[0] },
        { href: '/schemes', icon: ShieldCheck, label: t('nav.schemes').split(' ')[0] },
        { href: '/profile', icon: User, label: t('nav.profile').split(' ')[0] }
    ];

    return (
        <nav className="floating-nav dark:bg-slate-900/90 dark:border-slate-700 transition-all">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-item ${isActive
                            ? 'active text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                        title={item.label}
                    >
                        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    </Link>
                );
            })}
        </nav>
    );
}
