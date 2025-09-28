
import React from 'react';
import type { MinecraftCharacter } from '../types';
import { RefreshIcon } from './icons';

interface ResultDisplayProps {
  originalImage: string;
  finalImage: string;
  character: MinecraftCharacter;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, finalImage, character, onReset }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center bg-[#5d8f28] bg-opacity-80 p-6 border-4 border-[#3c5d1a] rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl" style={{ textShadow: '2px 2px #3c5d1a' }}>You are... <span className="text-yellow-300">{character.name}!</span></h2>
        <img src={character.image} alt={character.name} className="mx-auto my-4 w-24 h-24 rounded-full border-4 border-[#3c5d1a] object-cover"/>
        <p className="text-sm text-gray-200 max-w-md mx-auto">{character.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
            <h3 className="text-xl mb-2" style={{ textShadow: '2px 2px #000' }}>Your Photo</h3>
            <img src={originalImage} alt="Original user upload" className="w-full max-w-sm rounded-lg border-4 border-gray-500 shadow-lg object-contain" />
        </div>
        <div className="flex flex-col items-center">
            <h3 className="text-xl mb-2" style={{ textShadow: '2px 2px #000' }}>Your Minecraft Look</h3>
            <img src={finalImage} alt="AI generated Minecraft outfit" className="w-full max-w-sm rounded-lg border-4 border-yellow-400 shadow-lg object-contain" />
        </div>
      </div>
      
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="bg-[#6e4523] hover:bg-[#8a562b] text-white font-bold py-3 px-6 border-b-4 border-[#3c2614] hover:border-[#5a3e1f] rounded-lg text-lg transition-transform transform hover:scale-105"
        >
          <span className="flex items-center justify-center gap-2">
            <RefreshIcon className="w-6 h-6" />
            Try Another Photo
          </span>
        </button>
      </div>
    </div>
  );
};
