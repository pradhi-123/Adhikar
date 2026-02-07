'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { LOCALIZED_SCENARIOS, TRANSLATIONS } from '../constants';
import { JusticeBot } from './JusticeBot';
import { Character } from './Characters';
import { Language, ScenarioRound } from '../types';
import { generateNextAdventureRound, translateScenarioRounds } from '../services/gemini';
import { ArrowRight, Play, Info, Filter, Sparkles, Loader2, Languages } from 'lucide-react';

export const AdventureMode: React.FC<{ lang: Language }> = ({ lang }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [stage, setStage] = useState<'intro' | 'playing' | 'feedback' | 'finished' | 'generating' | 'translating'>('intro');
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [dynamicRounds, setDynamicRounds] = useState<ScenarioRound[]>([]);

  const t = TRANSLATIONS[lang];
  const scenarios = LOCALIZED_SCENARIOS[lang];

  // Dynamically resolve the active scenario from the CURRENT language dictionary
  const scenario = useMemo(() => {
    return scenarios.find(s => s.id === activeScenarioId);
  }, [scenarios, activeScenarioId]);

  // Translate existing dynamic rounds when language changes
  useEffect(() => {
    const handleTranslation = async () => {
      if (dynamicRounds.length > 0 && activeScenarioId) {
        const currentStage = stage;
        setStage('translating');
        try {
          const translated = await translateScenarioRounds(dynamicRounds, lang);
          setDynamicRounds(translated);
          setStage(currentStage === 'translating' ? 'playing' : currentStage);
        } catch (error) {
          console.error("Translation failed", error);
          setStage(currentStage);
        }
      }
    };

    handleTranslation();
  }, [lang]);

  const groups = useMemo(() => {
    const uniqueGroups = Array.from(new Set(scenarios.map(s => s.group)));
    return ['all', ...uniqueGroups];
  }, [scenarios]);

  const filteredScenarios = useMemo(() => {
    if (selectedGroup === 'all') return scenarios;
    return scenarios.filter(s => s.group === selectedGroup);
  }, [scenarios, selectedGroup]);

  // Scenarios that support dynamic AI expansion
  const infiniteScenarios = ['online-scams', 'harassment', 'internship-rights', 'ragging', 'cyberbullying'];

  const allRounds = useMemo(() => {
    if (!scenario) return [];
    return [...scenario.rounds, ...dynamicRounds];
  }, [scenario, dynamicRounds]);

  const startScenario = (id: string) => {
    setActiveScenarioId(id);
    setStage('intro');
    setRoundIndex(0);
    setScore(0);
    setDynamicRounds([]);
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setStage('feedback');
  };

  const handleGenerateNext = async () => {
    if (!scenario) return;
    setStage('generating');

    try {
      const history = allRounds.map(r => r.text);
      const newRound = await generateNextAdventureRound(
        scenario.title,
        scenario.category,
        history,
        lang
      );

      setDynamicRounds(prev => [...prev, newRound]);
      setRoundIndex(prev => prev + 1);
      setStage('playing');
      setSelectedOption(null);
    } catch (error) {
      console.error("Failed to generate round", error);
      setStage('finished');
    }
  };

  const nextStep = () => {
    if (stage === 'intro') {
      setStage('playing');
      return;
    }

    if (stage === 'feedback') {
      const currentRound = allRounds[roundIndex];
      if (selectedOption !== null && currentRound) {
        setScore(prev => prev + currentRound.options[selectedOption].points);
      }

      if (roundIndex < allRounds.length - 1) {
        setRoundIndex(prev => prev + 1);
        setStage('playing');
        setSelectedOption(null);
      }
      else if (activeScenarioId && infiniteScenarios.includes(activeScenarioId)) {
        handleGenerateNext();
      }
      else {
        setStage('finished');
      }
    }
  };

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'cyberbullying': return '💻';
      case 'online-scams': return '🎣';
      case 'harassment': return '🛑';
      case 'internship-rights': return '💼';
      case 'ragging': return '📣';
      case 'police-questioning': return '⚖️';
      default: return '📁';
    }
  };

  if (stage === 'translating') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 animate-in fade-in zoom-in duration-300">
        <div className="relative">
          <JusticeBot size="lg" sparkly={false} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Languages size={48} className="text-white animate-bounce" />
          </div>
        </div>
        <div className="mt-12 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-blue-900">Justice Bot is Translating...</h2>
          <p className="text-blue-500 font-bold italic tracking-wide uppercase text-sm">Switching to {lang === 'hi' ? 'Hindi' : lang === 'ta' ? 'Tamil' : 'English'}</p>
          <div className="flex justify-center mt-6">
            <Loader2 size={32} className="text-blue-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'generating') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 animate-in fade-in zoom-in duration-700">
        <JusticeBot size="lg" />
        <div className="mt-12 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-blue-900 flex items-center justify-center">
            <Sparkles className="mr-3 text-yellow-500 animate-pulse" />
            Justice Bot is Crafting...
          </h2>
          <p className="text-blue-500 font-bold">Designing a new legal challenge for you based on your progress! 📚</p>
          <div className="flex justify-center mt-6">
            <Loader2 size={40} className="text-blue-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!activeScenarioId) {
    return (
      <div className="p-4 md:p-8 bg-[#fef9c3]/30 min-h-full">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg">🚀</div>
              <h2 className="text-2xl md:text-3xl font-black text-blue-900 tracking-tight">{t.adventures}</h2>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <Filter size={18} className="text-blue-400 shrink-0" />
              {groups.map(group => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-black transition-all shrink-0 border-2 ${selectedGroup === group
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-blue-600 border-blue-100 hover:border-blue-300'
                    }`}
                >
                  {t[group]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {filteredScenarios.length > 0 ? filteredScenarios.map(s => (
              <button
                key={s.id}
                onClick={() => startScenario(s.id)}
                className="group bg-white p-6 rounded-[2rem] shadow-xl border-b-8 border-blue-100 hover:border-blue-400 transition-all text-left flex items-center relative overflow-hidden active:scale-95"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Play size={80} />
                </div>
                <div className="bg-blue-50 p-5 rounded-3xl mr-5 text-3xl md:text-4xl shadow-inner border-2 border-blue-100 shrink-0">
                  {getScenarioIcon(s.id)}
                </div>
                <div>
                  <h3 className="font-black text-lg md:text-xl text-blue-900 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                  <p className="text-blue-400 font-bold text-xs md:text-sm mt-1 uppercase tracking-wider">{s.category}</p>
                  {infiniteScenarios.includes(s.id) && (
                    <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-black mt-1 inline-block">AI EXPANDED 🚀</span>
                  )}
                </div>
                <div className="ml-auto bg-blue-600 text-white p-2 rounded-full shadow-lg group-hover:translate-x-1 transition-transform shrink-0">
                  <ArrowRight size={20} />
                </div>
              </button>
            )) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-blue-400 font-bold italic">No adventures here yet! Check another category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'intro' && scenario) {
    return (
      <div className="p-4 md:p-8 h-full flex flex-col items-center justify-center animate-in zoom-in duration-500 overflow-y-auto">
        <div className="max-w-2xl w-full flex flex-col items-center space-y-8 py-8">
          <h2 className="text-3xl md:text-4xl font-black text-blue-900 text-center">{scenario.title}</h2>

          <div className="relative w-full aspect-square md:aspect-video bg-white rounded-[2.5rem] border-8 border-blue-100 shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent"></div>
            <div className="z-10 flex flex-col items-center space-y-6">
              <div className={scenario.group === 'online' ? 'phone-shake' : 'bounce-gentle'}>
                <Character name="Aru" emotion="sad" size="lg" />
              </div>
            </div>
            <div className="z-10 mt-8 comic-bubble p-6 shadow-xl bg-white border-blue-400 max-w-sm">
              <p className="text-blue-900 font-bold text-center leading-relaxed text-sm md:text-base">
                {scenario.intro}
              </p>
            </div>
          </div>
          <button
            onClick={nextStep}
            className="w-full max-w-sm bg-blue-600 text-white font-black py-5 rounded-[2rem] shadow-[0_8px_0_rgb(30,58,138)] transition-all flex items-center justify-center text-xl"
          >
            {t.letsHelp} <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'finished' && scenario) {
    return (
      <div className="p-4 md:p-8 flex flex-col items-center animate-in fade-in zoom-in duration-500 overflow-y-auto min-h-full">
        <div className="max-w-3xl w-full text-center py-8">
          <div className="flex justify-center mb-8 relative">
            <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full flex flex-col items-center justify-center text-6xl md:text-8xl shadow-[0_12px_0_rgb(161,98,7)] border-8 border-white">
              {scenario.badgeIcon}
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-blue-900 mb-2">{t.youDidIt}</h2>
          <p className="text-blue-500 font-bold text-lg mb-8 tracking-wide uppercase">{t.earned} <span className="text-yellow-600">{scenario.badgeName}</span></p>
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl mb-8 text-left border-b-8 border-blue-100">
            <div className="flex items-center space-x-4 mb-6">
              <JusticeBot size="sm" />
              <h3 className="font-black text-xl text-blue-900">{t.whatWeLearned}</h3>
            </div>
            <ul className="space-y-4">
              {allRounds.map((r, i) => (
                <li key={i} className="flex items-start text-blue-700 font-bold bg-blue-50 p-4 rounded-2xl border-2 border-blue-100 text-sm md:text-base">
                  <span className="text-blue-500 mr-3">⭐</span> {r.options.find(o => o.points === 10)?.explanation}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setActiveScenarioId(null)}
            className="w-full max-w-sm bg-blue-600 text-white font-black py-5 rounded-[2rem] shadow-[0_8px_0_rgb(30,58,138)] transition-all text-xl"
          >
            {t.finishAdventure}
          </button>
        </div>
      </div>
    );
  }

  if (scenario) {
    const currentRound = allRounds[roundIndex];
    if (!currentRound) return null;

    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto flex flex-col h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-white/40 p-2 backdrop-blur-sm rounded-full z-10">
          <div className="flex items-center bg-white p-2 pr-6 rounded-full shadow-md border-2 border-blue-100">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black mr-3 shadow-lg">
              {roundIndex + 1}
            </div>
            <div className="h-3 w-20 md:w-48 bg-blue-50 rounded-full overflow-hidden border-2 border-blue-100">
              <div
                className="h-full bg-blue-500 transition-all duration-700"
                style={{ width: `${((roundIndex + 1) / (allRounds.length + (infiniteScenarios.includes(activeScenarioId || '') ? 1 : 0))) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-yellow-400 px-3 md:px-5 py-1 md:py-2 rounded-full font-black text-blue-900 shadow-md border-2 border-white flex items-center text-sm md:text-base">
            ⭐ {score}
          </div>
        </div>

        {stage === 'playing' ? (
          <div className="animate-in slide-in-from-right duration-500 flex-1 flex flex-col items-center">
            <div className="w-full max-w-3xl flex flex-col md:flex-row items-center md:items-end mb-8 space-y-4 md:space-y-0 md:space-x-4">
              <Character name="Aru" emotion="surprised" size="md" />
              <div className="comic-bubble p-6 md:p-8 shadow-xl bg-white border-blue-400 flex-1 w-full">
                {roundIndex >= (scenario?.rounds?.length || 0) && (
                  <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-black mb-2 inline-block">ADVANCED LEVEL 🛡️</span>
                )}
                <p className="text-blue-900 font-black text-lg md:text-2xl leading-snug">{currentRound.text}</p>
              </div>
            </div>
            <div className="grid gap-4 w-full max-w-2xl mt-auto pb-8">
              {currentRound.options?.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(i)}
                  className="bg-white p-5 rounded-[1.5rem] border-4 border-blue-50 hover:border-blue-400 transition-all text-left text-blue-900 font-bold shadow-lg flex items-center"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 shrink-0 text-blue-600 font-black">{i + 1}</div>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom duration-500 flex flex-col items-center max-w-3xl mx-auto w-full">
            <div className="flex -space-x-4 mb-8">
              <Character name="Aru" emotion={selectedOption !== null && currentRound.options[selectedOption].points > 5 ? 'happy' : 'surprised'} size="lg" />
              <JusticeBot size="md" />
            </div>
            <div className={`p-6 md:p-8 rounded-[2.5rem] shadow-xl mb-8 border-b-8 w-full ${selectedOption !== null && currentRound.options[selectedOption].points > 5 ? 'bg-green-100 border-green-600' : 'bg-orange-100 border-orange-600'}`}>
              <p className="font-black text-2xl md:text-3xl text-blue-900 mb-3">
                {selectedOption !== null && currentRound.options[selectedOption].points > 5 ? t.awesome : t.hmm}
              </p>
              <p className="text-blue-900 font-bold mb-6 text-lg md:text-xl">{selectedOption !== null && currentRound.options[selectedOption].feedback}</p>
              <div className="bg-white/60 p-5 rounded-2xl text-blue-800 font-bold flex items-start italic border-2 border-white text-sm md:text-base">
                <Info size={24} className="mr-3 shrink-0 text-blue-600" />
                {selectedOption !== null && currentRound.options[selectedOption].explanation}
              </div>
            </div>
            <button
              onClick={nextStep}
              className="w-full max-w-sm bg-blue-600 text-white font-black py-5 rounded-[2rem] shadow-[0_8px_0_rgb(30,58,138)] transition-all flex items-center justify-center text-xl"
            >
              {roundIndex === allRounds.length - 1 && activeScenarioId && infiniteScenarios.includes(activeScenarioId) ? 'Level Up!' : t.nextStep} <ArrowRight className="ml-2" />
            </button>
          </div>
        )}
      </div>
    );
  }
  return null;
};
