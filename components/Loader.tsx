
import React from 'react';

interface LoaderProps {
  message: string;
}

const DiamondPickaxe: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`pixel-art-pickaxe ${className}`}>
        <style>{`
            .pixel-art-pickaxe {
                width: 64px;
                height: 64px;
                background-image:
                    /* Handle */
                    linear-gradient(to right, #6E4523 100%, transparent 0),
                    /* Head - diamond part */
                    linear-gradient(to right, #3a59a7 100%, transparent 0),
                    linear-gradient(to right, #5f87e3 100%, transparent 0),
                    /* Head - stick part */
                    linear-gradient(to right, #6E4523 100%, transparent 0);
                background-repeat: no-repeat;
                background-size: 8px 8px; /* Pixel size */
                /* Handle */
                background-position: 28px 28px, 28px 36px, 28px 44px, 20px 20px, 36px 20px;
                background-size: 8px 8px, 8px 8px, 8px 8px, 8px 8px, 8px 8px;
                animation: spin 2s linear infinite;
                transform-origin: center;
            }

            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `}</style>
         <svg width="64" height="64" viewBox="0 0 64 64" className="w-16 h-16 animate-spin">
            <rect x="28" y="28" width="8" height="24" fill="#6E4523" />
            <rect x="20" y="20" width="24" height="8" fill="#6E4523" />
            <rect x="12" y="12" width="8" height="8" fill="#5f87e3" />
            <rect x="20" y="12" width="8" height="8" fill="#3a59a7" />
            <rect x="12" y="20" width="8" height="8" fill="#3a59a7" />
            <rect x="44" y="12" width="8" height="8" fill="#5f87e3" />
            <rect x="36" y="12" width="8" height="8" fill="#3a59a7" />
            <rect x="44" y="20" width="8" height="8" fill="#3a59a7" />
        </svg>
    </div>
);

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-black bg-opacity-50 p-8 rounded-lg">
      <DiamondPickaxe />
      <p className="text-yellow-300 text-lg text-center" style={{ textShadow: '2px 2px #000' }}>
        {message}
      </p>
    </div>
  );
};
