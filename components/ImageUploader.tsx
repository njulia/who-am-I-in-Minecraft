
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#7f7f7f] bg-opacity-80 p-8 border-4 border-[#5a5a5a] rounded-lg shadow-lg text-center">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center w-full h-64 border-4 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-yellow-400 bg-gray-600/50' : 'border-gray-400 hover:border-gray-300'}`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="w-12 h-12 mb-3 text-gray-300" />
          <p className="mb-2 text-sm text-gray-200">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400">PNG, JPG, or WEBP</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      </label>
    </div>
  );
};
