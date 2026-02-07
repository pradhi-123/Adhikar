'use client';

import Link from 'next/link';
import { BookOpen, ShieldCheck, Siren, ChevronRight, Users, BadgeCheck, Zap, MessageSquareWarning } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Background Decor (Soft Blobs) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/20 -z-10 transition-colors duration-300"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-[100px] -z-10 animate-pulse transition-colors duration-300"></div>
      <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-[80px] -z-10 transition-colors duration-300"></div>
      <style jsx>{`
        .dot-pattern {
            background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
            background-size: 24px 24px;
        }
        :global(.dark) .dot-pattern {
            background-image: radial-gradient(#1e293b 1px, transparent 1px);
        }
        .holo-gradient-border {
            position: relative;
            background: white;
            border-radius: 1.5rem;
            z-index: 1;
        }
        :global(.dark) .holo-gradient-border {
            background: #0f172a;
        }
        .holo-gradient-border::before {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: 1.6rem;
            background: linear-gradient(45deg, #ff00cc, #3333ff, #00ccff, #ff00cc);
            background-size: 400%;
            z-index: -1;
            animation: section-animation 10s linear infinite;
        }
        @keyframes section-animation {
            0% {background-position: 0 0;}
            50% {background-position: 400% 0;}
            100% {background-position: 0 0;}
        }
      `}</style>
      <div className="absolute inset-0 dot-pattern opacity-40 dark:opacity-20 -z-20 pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="p-6 md:p-10 max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2 transition-colors duration-300">
              {t('dash.welcome')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{user?.name?.split(' ')[0] || 'Citizen'}</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg transition-colors duration-300">{t('dash.gateway')}</p>
          </div>
          <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-blue-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md hover:scale-105 cursor-default">
            <BadgeCheck className="text-blue-500 dark:text-blue-400 fill-blue-50 dark:fill-slate-900" size={20} />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('dash.verified')}</span>
          </div>
        </div>

        {/* Hero Section: Situation Analysis */}
        <div className="mb-12 animate-in fade-in zoom-in-95 duration-700 delay-100">
          <div className="holo-gradient-border p-[3px]">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[1.5rem] p-8 md:p-10 shadow-2xl shadow-blue-100 dark:shadow-none relative overflow-hidden group transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-3xl -z-10 opacity-60 group-hover:scale-110 transition-transform duration-700"></div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-2xl transition-colors duration-300">
                      <MessageSquareWarning size={28} />
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-xs">{t('dash.ai_assistant')}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight transition-colors duration-300">
                    {t('dash.hero_title')} <br />
                    <span className="text-slate-400 dark:text-slate-500">{t('dash.hero_subtitle')}</span>
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg leading-relaxed transition-colors duration-300">
                    {t('dash.hero_desc')}
                  </p>
                  <Link href="/situation" className="inline-flex items-center gap-3 bg-slate-900 dark:bg-white hover:bg-blue-600 dark:hover:bg-blue-400 text-white dark:text-slate-900 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 group-btn">
                    {t('dash.analyze_btn')} <ChevronRight size={18} className="group-btn-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Graphic Area */}
                <div className="hidden md:block relative w-64 h-64">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-full animate-pulse opacity-50 blur-2xl transition-colors duration-300"></div>
                  <div className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 transform rotate-3 hover:rotate-0 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3 border-b border-slate-100 dark:border-slate-700 pb-2 transition-colors duration-300">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 transition-colors duration-300"></div>
                      <div className="h-2 w-20 bg-slate-100 dark:bg-slate-700 rounded-full transition-colors duration-300"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full transition-colors duration-300"></div>
                      <div className="h-2 w-4/5 bg-slate-100 dark:bg-slate-700 rounded-full transition-colors duration-300"></div>
                      <div className="h-2 w-3/4 bg-blue-100 dark:bg-slate-700 rounded-full mt-4 transition-colors duration-300"></div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-2xl shadow-lg transition-colors duration-300">
                      <Zap size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Laws */}
          <Link href="/laws" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-blue-200/20 dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 group block">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <BookOpen size={24} />
              </div>
            </div>
            <h3 className="text-4xl font-black text-slate-800 dark:text-white mb-1 transition-colors">{t('nav.laws').split(' ')[0]}</h3>
            <p className="text-slate-400 dark:text-slate-500 font-medium text-sm transition-colors">{t('dash.laws_card')}</p>
          </Link>

          {/* Card 2: Schemes */}
          <Link href="/schemes" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-emerald-200/20 dark:hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-300 group block">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShieldCheck size={24} />
              </div>
            </div>
            <h3 className="text-4xl font-black text-slate-800 dark:text-white mb-1 transition-colors">12+</h3>
            <p className="text-slate-400 dark:text-slate-500 font-medium text-sm transition-colors">{t('dash.schemes_card')}</p>
          </Link>

          {/* Card 3: Legal Aid Directory */}
          <Link href="/legal-aid" className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-500/20 dark:shadow-none relative overflow-hidden group block hover:scale-[1.01] transition-transform">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/30 transition-colors"></div>
            <div className="relative z-10 flex items-center justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold mb-1">{t('dash.legal_aid')}</h3>
                <p className="text-blue-100 text-sm font-medium">{t('dash.legal_aid_sub')}</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors">
                <Users size={28} className="text-white" />
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Links / Modules */}
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 transition-colors">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500"></span> {t('dash.quick_modules')}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-24">
          <Link href="/laws" className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all text-center">
            <div className="w-14 h-14 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
              <BookOpen size={24} />
            </div>
            <h4 className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors uppercase text-[10px] tracking-widest">{t('nav.laws')}</h4>
          </Link>

          <Link href="/schemes" className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-all text-center">
            <div className="w-14 h-14 mx-auto bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors uppercase text-[10px] tracking-widest">{t('nav.schemes')}</h4>
          </Link>

          <Link href="/emergency" className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-700 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-all text-center">
            <div className="w-14 h-14 mx-auto bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
              <Siren size={24} />
            </div>
            <h4 className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors uppercase text-[10px] tracking-widest">{t('nav.emergency')}</h4>
          </Link>

          <Link href="/profile" className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-700 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all text-center">
            <div className="w-14 h-14 mx-auto bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
              <Users size={24} />
            </div>
            <h4 className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors uppercase text-[10px] tracking-widest">{t('nav.profile')}</h4>
          </Link>

          {/* File Complaint - External Link */}
          <a href="https://eservices.tnpolice.gov.in/CCTNSNICSDC/ComplaintRegistrationPage?6" target="_blank" rel="noopener noreferrer" className="md:col-span-4 bg-red-600 hover:bg-red-700 p-4 rounded-2xl text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 group mt-4">
            <div className="p-2 bg-white/20 rounded-full group-hover:rotate-12 transition-transform">
              <Siren size={20} className="animate-pulse" />
            </div>
            <span className="font-bold text-lg tracking-wide">File an Official Police Complaint</span>
          </a>
        </div>

      </div>
    </main>
  );
}
