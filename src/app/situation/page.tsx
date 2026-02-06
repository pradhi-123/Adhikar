'use client';

import { useState, useRef, useEffect } from 'react';
import { laws } from '@/lib/data/laws';
import { schemes } from '@/lib/data/schemes';
import { useLanguage } from '@/context/LanguageContext';
import { Section, Law, Scheme } from '@/types';
import Link from 'next/link';
import { ArrowLeft, Send, Scale, Sparkles, AlertTriangle, Info, Zap, Flame, CheckCircle2, Phone, ShieldAlert, Mic, MicOff, Activity } from 'lucide-react';

export default function SituationPage() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<{ relevantLaws: Law[], relevantSchemes: Scheme[] } | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Voice State
    const [isListening, setIsListening] = useState(false);
    const [listeningError, setListeningError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);

    // Audio Visualization State
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Initialize Speech Recognition on Mount
    useEffect(() => {
        if (typeof window !== 'undefined' && !('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            setListeningError("Browser does not support voice input.");
        }

        // Cleanup function for audio context
        return () => {
            stopVisualizer();
            if (recognitionRef.current) recognitionRef.current.abort();
        };
    }, []);

    // --- VISUALIZER LOGIC ---
    const startVisualizer = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const audioCtx = new AudioContext();
            const analyser = audioCtx.createAnalyser();
            const source = audioCtx.createMediaStreamSource(stream);

            analyser.fftSize = 64; // Low FFT size for fewer, chunkier bars
            source.connect(analyser);

            audioContextRef.current = audioCtx;
            analyserRef.current = analyser;
            sourceRef.current = source;

            drawVisualizer();
        } catch (err) {
            console.error("Error accessing mic for visualizer:", err);
            // Don't block speech if visualizer fails, just ignore
        }
    };

    const stopVisualizer = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (sourceRef.current) {
            sourceRef.current.mediaStream.getTracks().forEach(track => track.stop());
            sourceRef.current.disconnect();
        } // Stop the stream
        if (audioContextRef.current) audioContextRef.current.close();

        audioContextRef.current = null;
        analyserRef.current = null;
        sourceRef.current = null;
    };

    const drawVisualizer = () => {
        if (!canvasRef.current || !analyserRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!analyserRef.current) return;

            animationFrameRef.current = requestAnimationFrame(draw);
            analyserRef.current.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2; // Scale down

                // Gradient Bar
                const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
                gradient.addColorStop(0, '#ec4899'); // Pink
                gradient.addColorStop(1, '#8b5cf6'); // Purple

                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 2;
            }
        };

        draw();
    };

    // --- SPEECH RECOGNITION LOGIC ---
    const startListening = () => {
        setListeningError(null);
        if (typeof window === 'undefined') return;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice input is not supported.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        // Continuous Mode enabled as requested
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            startVisualizer(); // Start waves
        };

        recognition.onend = () => {
            // Auto-restart if we didn't explicitly stop (and if user hasn't toggled off)
            // But checking 'isListening' state inside this closure might be stale.
            // For now, we'll let it stop on silence, but visualizer also stops.
            // If user wants "unmuted till I manually mute", we should handle re-start logic.
            // However, browsers often block infinite restart. 
            // We'll trust 'continuous=true' does a good job keeping it open for a long session.

            // Check if we purposefully stopped? 
            // Simplest: Just update state. User can click again if it times out.
            // Trying to force-restart often crashes the browser tab.
            setIsListening(false);
            stopVisualizer();
        };

        recognition.onerror = (event: any) => {
            console.error("Speech Error:", event.error);
            if (event.error === 'not-allowed') {
                setListeningError("Mic Access Denied 🚫");
            }
            // Don't stop explicit listening state immediately on 'no-speech' retry,
            // but for simplicity, we let it flow to onend.
        };

        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            // We append final results. 
            // Warning: React state update in loop. Better to functional update.
            if (finalTranscript) {
                setInput(prev => (prev + ' ' + finalTranscript).trim());
            }
            // We could optionally show interimTranscript in a preview UI.
        };

        try {
            recognition.start();
        } catch (err) {
            console.error(err);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) recognitionRef.current.stop();
        stopVisualizer();
        setIsListening(false);
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const { t, language } = useLanguage();

    const handleAnalyze = async () => {
        if (!input.trim()) return;
        setIsAnalyzing(true);
        setResult(null); // Clear previous results

        try {
            const response = await fetch('/api/analyze-situation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ situation: input, language })
            });

            if (!response.ok) throw new Error('Analysis failed');

            const data = await response.json();
            setResult({ relevantLaws: data.relevantLaws, relevantSchemes: data.relevantSchemes });
        } catch (error) {
            console.error("Analysis Error:", error);
            // Optional: Show error toast
            alert(t('common.error_generic') || "Something went wrong. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 mt-6 lg:mt-0">
            {/* Header */}
            <div className="flex items-center gap-4 pt-2">
                <div className="hidden md:block">
                    <Link href="/" className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-all border border-slate-100 dark:border-slate-700 group">
                        <ArrowLeft size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-pink-600 dark:group-hover:text-pink-400" />
                    </Link>
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 tracking-tight animate-gradient-x">
                        {t('dash.hero_title')}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Zap size={16} className="text-yellow-500 fill-yellow-500" /> {t('dash.ai_assistant')}
                    </p>
                </div>
            </div>

            {/* Input Area */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="holo-gradient-border p-[3px] rounded-[2rem]">
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[1.8rem] p-6 md:p-8 shadow-2xl relative overflow-hidden transition-colors duration-300">
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-pink-200/40 to-purple-200/40 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-cyan-200/40 to-blue-200/40 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full blur-[80px] -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

                        <label className="block text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Sparkles size={18} className="text-purple-500" /> {t('dash.hero_subtitle')}
                        </label>

                        <div className="relative z-10">
                            <textarea
                                className="w-full bg-white/50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700 rounded-2xl p-6 text-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 focus:border-transparent transition-all min-h-[180px] resize-none focus:shadow-[0_0_0_4px_rgba(168,85,247,0.2)]"
                                placeholder={isListening ? "Listening... (Speak now)" : "Type here... or click the mic to speak."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />

                            {/* AUDIO VISUALIZER / MIC BUTTON OVERLAY */}
                            <div className="absolute bottom-4 right-4 flex items-center gap-3">
                                {listeningError && (
                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded animate-pulse">
                                        {listeningError}
                                    </span>
                                )}

                                {isListening && (
                                    <div className="hidden md:block h-10 w-32 bg-slate-900/10 dark:bg-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
                                        <canvas ref={canvasRef} width={128} height={40} className="w-full h-full opacity-80" />
                                    </div>
                                )}

                                <button
                                    onClick={toggleListening}
                                    className={`p-3 rounded-xl transition-all shadow-lg flex items-center justify-center ${isListening
                                        ? 'bg-red-500 text-white animate-pulse shadow-red-500/40 w-12 h-12'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 w-12 h-12'
                                        }`}
                                    title={isListening ? "Stop Listening" : "Start Voice Input"}
                                >
                                    {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                🔒 Secure & Private Analysis
                            </p>
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || !input.trim()}
                                className="w-full md:w-auto bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isAnalyzing ? (
                                    <>Analyzing <span className="animate-spin">⏳</span></>
                                ) : (
                                    <>{t('dash.analyze_btn')} <Send size={18} /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                    <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl shrink-0 shadow-md">
                        <AlertTriangle size={20} className="stroke-[3]" />
                    </div>
                    <div>
                        <h4 className="font-extrabold text-amber-800 dark:text-amber-400 text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                            Legal Disclaimer
                        </h4>
                        <p className="text-sm font-medium text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                            Adhikar AI provides legal information for educational purposes only. It <strong>does not constitute professional legal advice</strong>.
                        </p>
                    </div>
                </div>
            </div>

            {/* RESULTS SECTION */}
            {result && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-700">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white shadow-lg">
                            <Flame size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Analysis Results</h2>
                    </div>

                    <div className="grid gap-8">
                        {result.relevantLaws.map((law, lawIndex) => (
                            law.sections.map((section, sectionIndex) => {
                                const isTopMatch = lawIndex === 0 && sectionIndex === 0;
                                const title = law.title[language] || law.title['en'];
                                const sText = section.text[language] || section.text['en'];
                                const sSimplified = section.simplified[language] || section.simplified['en'];
                                const actionSteps = law.actionGuide?.[language] || law.actionGuide?.['en'] || [];
                                const authName = law.authority?.name[language] || law.authority?.name['en'];

                                return (
                                    <div key={`${law.id}-${section.id}`} className={`group relative rounded-3xl p-6 md:p-8 transition-all duration-300 ${isTopMatch ? 'bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 scale-[1.02] z-10' : 'bg-white dark:bg-slate-900 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-700 shadow-xl shadow-slate-200/50 dark:shadow-none'}`}>
                                        {isTopMatch && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-1.5 rounded-full text-sm font-extrabold uppercase tracking-widest shadow-lg flex items-center gap-2">
                                                    <Sparkles size={16} className="text-yellow-300 animate-pulse" /> Top Recommendation
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 border-2 border-transparent rounded-3xl [background:linear-gradient(white,white)padding-box,linear-gradient(to_right,#ec4899,#8b5cf6,#06b6d4)border-box] dark:[background:linear-gradient(#0f172a,#0f172a)padding-box,linear-gradient(to_right,#ec4899,#8b5cf6,#06b6d4)border-box] opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                                        <div className="flex flex-col md:flex-row gap-8">
                                            <div className="shrink-0 flex flex-col items-center gap-3">
                                                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 transition-transform duration-300">
                                                    <Scale size={32} />
                                                </div>
                                                <span className="bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-700 dark:text-fuchsia-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest text-center">{law.category}</span>
                                            </div>
                                            <div className="flex-1 space-y-5">
                                                <div>
                                                    {/* ACT AND SECTION DISPLAY */}
                                                    <div className="flex flex-col gap-1 mb-3">
                                                        <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                                            {law.id.includes('const') ? 'CONSTITUTION' : 'ACT / LAW'}
                                                        </span>
                                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide border-l-4 border-slate-300 dark:border-slate-600 pl-3">
                                                            {title}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 mb-1">
                                                        {section.number}
                                                    </h3>
                                                    <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-3">{sText}</h4>
                                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{sSimplified}</p>
                                                </div>
                                                <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-xl p-5 border-l-4 border-fuchsia-500">
                                                    <p className="text-sm font-bold text-violet-900 dark:text-violet-300 mb-1 flex items-center gap-2"><Info size={16} className="text-fuchsia-500" /> Key Provision</p>
                                                    <p className="text-sm text-violet-800 dark:text-violet-200 italic">"{sSimplified}"</p>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4 pt-2">
                                                    {actionSteps.length > 0 && (
                                                        <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-800/30">
                                                            <h4 className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-3 flex items-center gap-2"><CheckCircle2 size={16} /> What to do next</h4>
                                                            <ul className="space-y-2">
                                                                {actionSteps.map((step, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900 dark:text-emerald-200 font-medium leading-tight">
                                                                        <span className="w-5 h-5 bg-emerald-200 dark:bg-emerald-800 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">{idx + 1}</span>{step}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {authName && (
                                                        <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-5 border border-red-100 dark:border-red-800/30 flex flex-col justify-between">
                                                            <div>
                                                                <h4 className="text-sm font-extrabold text-red-700 dark:text-red-400 uppercase tracking-wide mb-2 flex items-center gap-2"><ShieldAlert size={16} /> Whom to Contact</h4>
                                                                <p className="text-lg font-bold text-slate-800 dark:text-white mb-1">{authName}</p>
                                                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{law.authority?.email}</p>
                                                            </div>
                                                            <a href={`tel:${law.authority?.contact}`} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-red-500/30"><Phone size={18} /> Call {law.authority?.contact}</a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
