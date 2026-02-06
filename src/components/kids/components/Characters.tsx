
import React from 'react';

type Emotion = 'happy' | 'sad' | 'surprised' | 'neutral';

interface CharacterProps {
  name: 'Aru' | 'Maya';
  emotion: Emotion;
  size?: 'sm' | 'md' | 'lg';
}

export const Character: React.FC<CharacterProps> = ({ name, emotion, size = 'md' }) => {
  const dimensions = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-40 h-40'
  }[size];

  const colors = name === 'Aru' ? { primary: '#facc15', secondary: '#854d0e' } : { primary: '#c084fc', secondary: '#581c87' };

  return (
    <div className={`${dimensions} relative flex items-center justify-center transition-all duration-300`}>
      {/* Face Base */}
      <div 
        className="w-full h-full rounded-full border-4 border-gray-800 shadow-lg relative overflow-hidden"
        style={{ backgroundColor: '#ffedd5' }}
      >
        {/* Hair */}
        <div 
          className="absolute top-0 w-full h-1/3"
          style={{ backgroundColor: colors.secondary, borderRadius: '50% 50% 0 0' }}
        ></div>
        
        {/* Eyes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-6">
          <div className="w-3 h-3 bg-gray-800 rounded-full">
            {emotion === 'surprised' && <div className="w-5 h-5 -m-1 border-2 border-gray-800 rounded-full animate-ping"></div>}
          </div>
          <div className="w-3 h-3 bg-gray-800 rounded-full">
             {emotion === 'surprised' && <div className="w-5 h-5 -m-1 border-2 border-gray-800 rounded-full animate-ping"></div>}
          </div>
        </div>

        {/* Mouth */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          {emotion === 'happy' && <div className="w-8 h-4 border-b-4 border-gray-800 rounded-full"></div>}
          {emotion === 'sad' && <div className="w-8 h-4 border-t-4 border-gray-800 rounded-full"></div>}
          {emotion === 'surprised' && <div className="w-6 h-6 border-4 border-gray-800 rounded-full"></div>}
          {emotion === 'neutral' && <div className="w-6 h-1 bg-gray-800 rounded-full"></div>}
        </div>
      </div>
      
      {/* Name Tag */}
      <div className="absolute -bottom-2 bg-white px-2 py-0.5 rounded-full border-2 border-gray-800 text-[10px] font-bold">
        {name}
      </div>
    </div>
  );
};
