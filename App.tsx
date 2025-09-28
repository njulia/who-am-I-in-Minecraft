
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { matchCharacter, createOutfitImage } from './services/geminiService';
import type { MinecraftCharacter } from './types';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageMimeType, setUploadedImageMimeType] = useState<string | null>(null);
  const [matchedCharacter, setMatchedCharacter] = useState<MinecraftCharacter | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progressMessage, setProgressMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const resetState = () => {
    setUploadedImage(null);
    setUploadedImageMimeType(null);
    setMatchedCharacter(null);
    setFinalImage(null);
    setIsLoading(false);
    setProgressMessage('');
    setError(null);
  };

  const handleImageUpload = useCallback(async (file: File) => {
    resetState();
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = (reader.result as string).split(',')[1];
      const mimeType = (reader.result as string).split(';')[0].split(':')[1];

      setUploadedImage(reader.result as string);
      setUploadedImageMimeType(mimeType);
      setIsLoading(true);
      setError(null);

      try {
        setProgressMessage('Finding your Minecraft twin...');
        const character = await matchCharacter(base64Image, mimeType);
        setMatchedCharacter(character);

        setProgressMessage('Crafting your new look...');
        const generatedImage = await createOutfitImage(base64Image, mimeType, character.name);
        setFinalImage(generatedImage);

      } catch (err) {
        console.error(err);
        setError('An error occurred while crafting your Minecraft look. Please try again.');
      } finally {
        setIsLoading(false);
        setProgressMessage('');
      }
    };
    reader.onerror = () => {
        setError('Failed to read the image file.');
        setIsLoading(false);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black bg-opacity-50 text-white p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          {!isLoading && !finalImage && <ImageUploader onImageUpload={handleImageUpload} />}
          {isLoading && <Loader message={progressMessage} />}
          {error && <div className="text-center text-red-400 bg-black/50 p-4 rounded-lg border-2 border-red-500">{error}</div>}
          
          {finalImage && uploadedImage && matchedCharacter && !isLoading && (
            <ResultDisplay
              originalImage={uploadedImage}
              finalImage={finalImage}
              character={matchedCharacter}
              onReset={resetState}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
