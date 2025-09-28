
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center bg-[#6e4523] bg-opacity-80 p-6 border-4 border-[#3c2614] rounded-lg shadow-lg" style={{ textShadow: '2px 2px #3c2614' }}>
      <h1 className="text-3xl sm:text-5xl font-bold text-yellow-300 tracking-wider">
        Minecraft Me
      </h1>
      <p className="text-sm sm:text-base text-gray-200 mt-2">
        Find your blocky doppelgänger!
      </p>
    </header>
  );
};
