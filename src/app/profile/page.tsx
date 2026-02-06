'use client';

import { User, LogOut, MapPin, Smartphone, CreditCard, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const { t } = useLanguage();

    if (!user) return null;

    return (
        <div className="space-y-8 animate-enter pb-24 md:pb-10 mt-6 lg:mt-0 max-w-2xl mx-auto">
            <header className="py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/" className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700">
                        <ArrowLeft size={18} className="text-slate-500" />
                    </Link>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{t('nav.profile')}</h1>
                </div>
                <button onClick={logout} className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-2xl hover:bg-red-100 transition-colors border border-red-100 dark:border-red-900/30 shadow-sm">
                    <LogOut size={20} />
                </button>
            </header>

            {/* ID Card Style */}
            <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 dark:bg-slate-800 p-10 text-white shadow-2xl border border-slate-800 dark:border-slate-700">
                {/* Pattern Overlay */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 opacity-10 rounded-full blur-[100px] -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 opacity-10 rounded-full blur-[100px] translate-y-20 -translate-x-20"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative mb-6">
                        <div className="w-28 h-28 rounded-full border-4 border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-2xl overflow-hidden">
                            <User size={56} className="text-white/80" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-xl shadow-lg border-2 border-slate-900">
                            <ShieldCheck size={16} />
                        </div>
                    </div>

                    <h2 className="text-3xl font-black tracking-tight">{user.name}</h2>
                    <p className="text-blue-400 font-black uppercase text-[10px] tracking-[0.3em] mb-8">{user.profession || 'Citizen'}</p>

                    <div className="flex gap-4 w-full px-4">
                        <div className="flex-1 px-6 py-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Age</p>
                            <p className="text-lg font-black">{user.age}</p>
                        </div>
                        <div className="flex-1 px-6 py-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Gender</p>
                            <p className="text-lg font-black">{user.gender}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details List */}
            <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] px-4">Personal Details</h3>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">

                    <dl className="divide-y divide-slate-50 dark:divide-slate-800">
                        <div className="flex items-center gap-6 p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <dt className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Aadhaar ID</dt>
                                <dd className="text-lg font-black text-slate-800 dark:text-white tracking-tighter">{user.aadhaarId}</dd>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                <Smartphone size={24} />
                            </div>
                            <div>
                                <dt className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Mobile Number</dt>
                                <dd className="text-lg font-black text-slate-800 dark:text-white tracking-tighter">+91 {user.mobile}</dd>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <dt className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Location</dt>
                                <dd className="text-lg font-black text-slate-800 dark:text-white tracking-tighter">{user.district}, {user.state}</dd>
                            </div>
                        </div>
                    </dl>
                </div>
            </div>

            {/* Logout Button (Alternative Bottom) */}
            <div className="px-4 pt-4">
                <button
                    onClick={logout}
                    className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-3xl shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                    <LogOut size={20} />
                    {t('nav.logout')}
                </button>
            </div>
        </div>
    );
}
