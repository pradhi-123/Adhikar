
import React, { useState, useRef, useEffect } from 'react';
import { JusticeBot } from './JusticeBot';
import { Character } from './Characters';
import { getLegalAdvice } from '../services/gemini';
import { AIResponse, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Mic, Send, Loader2, Sparkles } from 'lucide-react';

export const AIAssistant: React.FC<{ lang: Language }> = ({ lang }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response, loading]);

  const handleAsk = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);
    const result = await getLegalAdvice(input, lang);
    setResponse(result);
    setLoading(false);
    setInput('');
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'ta' ? 'ta-IN' : 'en-IN';
    recognition.start();
    setIsListening(true);
    recognition.onresult = (event: any) => {
      setInput(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#fef9c3]/50">
      <div className="p-4 md:p-8 flex-1 overflow-y-auto space-y-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Intro Section */}
          {!response && !loading && (
            <div className="flex flex-col items-center text-center space-y-6 pt-8 animate-in fade-in duration-700">
              <div className="flex items-end -space-x-4 mb-4">
                <Character name="Aru" emotion="neutral" size="md" />
                <div className="z-10"><JusticeBot size="lg" /></div>
                <Character name="Maya" emotion="happy" size="md" />
              </div>
              <div className="comic-bubble p-6 shadow-xl max-w-sm border-blue-400 bg-white mx-auto">
                <p className="text-blue-900 font-bold text-lg md:text-xl">{t.introBubble}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center p-12 space-y-4">
              <JusticeBot size="md" />
              <p className="text-blue-600 font-bold animate-pulse text-center">{t.loadingText}</p>
            </div>
          )}

          {response && (
            <div className="animate-in slide-in-from-bottom duration-500 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="shrink-0"><JusticeBot size="sm" /></div>
                <div className="bg-white rounded-3xl p-5 md:p-6 shadow-lg border-b-4 border-blue-100 flex-1">
                  <p className="text-blue-900 font-bold mb-2">{t.aiIntro}</p>
                  <p className="text-blue-700 leading-relaxed italic">{response.whatIsHappening}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-yellow-400 rounded-3xl p-6 shadow-lg border-b-8 border-yellow-600 transform -rotate-1 h-full">
                    <div className="flex items-center mb-3">
                        <Sparkles className="text-white mr-2" />
                        <h4 className="text-blue-900 font-black text-xl md:text-2xl uppercase tracking-wider">{t.rightsTitle}!</h4>
                    </div>
                    <p className="text-blue-900 font-bold leading-relaxed">{response.yourRight}</p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-lg border-b-4 border-green-200 h-full">
                    <h4 className="text-green-600 font-black text-lg md:text-xl mb-4 flex items-center">
                        🚀 {t.actionTitle}
                    </h4>
                    <div className="space-y-3">
                        {response.whatYouCanDo.map((step, i) => (
                            <div key={i} className="flex items-center bg-green-50 p-3 rounded-2xl border-2 border-green-100 text-blue-900 font-medium text-sm md:text-base">
                                <span className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center mr-3 font-bold text-green-700 shrink-0">{i+1}</span>
                                {step}
                            </div>
                        ))}
                    </div>
                </div>
              </div>

              <div className="bg-purple-600 rounded-3xl p-6 shadow-lg text-white">
                  <h4 className="font-black text-lg md:text-xl mb-4 flex items-center">
                      📞 {t.helpTitle}
                  </h4>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                      {response.needHelp.map((help, i) => (
                          <span key={i} className="bg-white/20 px-4 py-2 rounded-xl font-bold text-white border border-white/30 backdrop-blur-sm text-sm md:text-base">
                              {help}
                          </span>
                      ))}
                  </div>
              </div>

              <div ref={scrollRef} className="h-4" />
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-md border-t-4 border-blue-100">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleAsk} className="flex items-center space-x-3">
            <button
              type="button"
              onClick={startVoiceInput}
              className={`p-4 md:p-5 rounded-full shadow-md transition-all shrink-0 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
            >
              <Mic size={24} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-white border-4 border-blue-100 rounded-full py-4 md:py-5 px-6 text-blue-900 font-bold focus:ring-0 focus:border-blue-400 placeholder:text-blue-200 shadow-inner text-sm md:text-base"
            />
            <button
              disabled={!input.trim() || loading}
              type="submit"
              className="bg-blue-600 text-white p-4 md:p-5 rounded-full shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50 active:scale-95 shrink-0"
            >
              <Send size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
