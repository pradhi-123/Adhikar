
import React from 'react';

export const JusticeBot: React.FC<{ size?: 'sm' | 'md' | 'lg', sparkly?: boolean }> = ({ size = 'md', sparkly = true }) => {
  const dimensions = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }[size];

  return (
    <div className="relative">
      {sparkly && (
        <>
          <div className="absolute -top-4 -left-4 text-yellow-400 sparkle">✨</div>
          <div className="absolute -bottom-2 -right-2 text-yellow-400 sparkle" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute top-1/2 -right-6 text-blue-400 sparkle" style={{ animationDelay: '1s' }}>💎</div>
        </>
      )}
      <div className={`${dimensions} bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center border-4 border-white relative bounce-gentle shadow-[0_10px_0_rgb(30,58,138)]`}>
        <div className="absolute -top-3 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-sm font-bold text-blue-900">
          ⚖️
        </div>
        <div className="flex flex-col items-center bg-blue-900/20 p-2 rounded-2xl">
          <div className="flex space-x-3">
            <div className="w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_10px_cyan]"></div>
            <div className="w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_10px_cyan]"></div>
          </div>
          <div className="w-10 h-1 bg-cyan-300 rounded-full mt-3 opacity-50"></div>
        </div>
        {/* Antenna */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-6 bg-white rounded-full">
            <div className="absolute top-0 -left-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
