'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Loader2, PlayCircle } from 'lucide-react';
import { Section } from '@/types';
import { useLanguage, Language } from '@/context/LanguageContext';

interface BookPageProps {
    section?: Section;
    pageNumber: number;
    isCover?: boolean;
    title?: string;
    chapter?: string;
    flipped: boolean;
    zIndex: number;
    onFlip: () => void;
    lang: Language;
}

const Page = ({ section, pageNumber, isCover, title, chapter, flipped, zIndex, onFlip, lang }: BookPageProps) => {
    const text = section ? (section.text[lang] || section.text['en']) : '';
    const simplified = section ? (section.simplified[lang] || section.simplified['en']) : '';
    const cases = section ? (section.cases[lang] || section.cases['en'] || []) : [];

    return (
        <div
            className="absolute top-0 right-0 w-full h-full cursor-pointer origin-left bg-[#fdfbf7] shadow-lg border-l border-slate-200 transition-transform duration-1000 ease-in-out"
            style={{
                transform: flipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
                zIndex: flipped ? 1 : zIndex
            }}
            onClick={onFlip}
        >
            {/* Front Face (Right Page) */}
            <div className="absolute inset-0 flex flex-col p-8 bg-[#fdfbf7]" style={{ backfaceVisibility: 'hidden' }}>
                {!isCover && <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>}

                {isCover ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center border-4 border-yellow-600/30 p-6 m-2">
                        <BookOpen size={64} className="text-yellow-600 mb-6 drop-shadow-md" />
                        <h1 className="text-3xl font-serif font-black text-slate-900 uppercase tracking-widest leading-relaxed">{title}</h1>
                        <div className="w-16 h-1 bg-yellow-600 my-4"></div>
                        <p className="text-slate-500 font-serif italic">{chapter || 'Official Digital Gazette'}</p>
                        <p className="mt-8 text-xs text-slate-400 font-bold tracking-[0.2em] uppercase animate-pulse">Tap to Open</p>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-serif uppercase tracking-widest border-b border-orange-100 pb-2 mb-4">
                            <span>{chapter}</span>
                            <span>{pageNumber}</span>
                        </div>
                        {section ? (
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                <span className="inline-block px-2 py-0.5 bg-red-50 text-red-800 text-[10px] font-bold rounded mb-2 border border-red-100">{section.number}</span>
                                <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 leading-tight text-left">{text}</h2>
                                <p className="font-serif text-slate-600 text-sm leading-relaxed mb-4 text-left">{simplified}</p>
                                {cases.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {cases.map((c, i) => <span key={i} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{c}</span>)}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-slate-300 italic font-serif">End of Chapter</div>
                        )}
                    </>
                )}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/20 to-transparent pointer-events-none mix-blend-multiply"></div>
            </div>

            {/* Back Face (Left Page) */}
            <div
                className="absolute inset-0 bg-[#f4f1ea] flex items-center justify-center shadow-inner border-r border-[#e3dcd2]"
                style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                }}
            >
                <div className="opacity-10 font-serif italic text-4xl text-slate-400 transform -scale-x-100 leading-none text-center px-4">Adhikar Law Library</div>
            </div>
        </div>
    );
};

interface BookViewerProps {
    title: string;
    sections: Section[];
    chapterName: string;
}

export default function BookViewer({ title, sections, chapterName }: BookViewerProps) {
    const { language } = useLanguage();
    const [currentPage, setCurrentPage] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const totalPages = sections.length + 1;
    const autoPlayRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const nextPage = () => {
        setCurrentPage(p => (p < totalPages - 1 ? p + 1 : 0));
    };

    useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(() => {
                nextPage();
            }, 1800);
        } else {
            clearInterval(autoPlayRef.current);
        }
        return () => clearInterval(autoPlayRef.current);
    }, [isAutoPlaying, totalPages]);

    const pages = [
        { isCover: true, pageNumber: 0 },
        ...sections.map((s, i) => ({ section: s, pageNumber: i + 1 }))
    ];

    return (
        <div
            className="flex flex-col items-center justify-center w-full h-full scale-90 origin-top"
            style={{ perspective: '1200px' }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div className="relative w-[300px] md:w-[350px] h-[480px]" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute inset-0 bg-slate-900 rounded-r-xl shadow-2xl translate-z-[-2px]"></div>

                {pages.map((page, index) => (
                    <Page
                        key={index}
                        {...page}
                        title={title}
                        chapter={chapterName}
                        flipped={index < currentPage}
                        zIndex={totalPages - index}
                        lang={language}
                        onFlip={() => {
                            if (index === currentPage) {
                                nextPage();
                                setIsAutoPlaying(false);
                            }
                        }}
                    />
                ))}
            </div>

            <div className="mt-10 flex items-center gap-6 z-10">
                <button onClick={() => { setCurrentPage(0); setIsAutoPlaying(false); }} className="text-xs font-bold text-slate-400 hover:text-blue-500 uppercase tracking-widest">Reset</button>
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all shadow-xl hover:scale-105 active:scale-95 ${isAutoPlaying ? 'bg-blue-600 text-white ring-2 ring-blue-300 border border-blue-500' : 'bg-white text-slate-700'}`}
                >
                    {isAutoPlaying ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />}
                    {isAutoPlaying ? 'Auto-Flipping Active' : 'Play Animation'}
                </button>
            </div>

            <p className="mt-4 text-xs text-slate-400 font-medium animate-pulse">Hover card to pause • Click to turn page</p>
        </div>
    );
}
