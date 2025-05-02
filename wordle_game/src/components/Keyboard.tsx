// src/components/Keyboard.tsx
import React, { useEffect } from 'react';

export type KeyStatus = 'correct' | 'present' | 'absent' | 'default';

interface KeyboardProps {
  keyStatuses: Record<string, KeyStatus>;
  onKeyPress: (key: string) => void;
}

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
];

const Keyboard: React.FC<KeyboardProps> = ({ keyStatuses, onKeyPress }) => {
  useEffect(() => {
    const handlePhysicalKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'BACKSPACE' || key === 'ENTER' || /^[A-Z]$/.test(key)) {
        onKeyPress(key);
      }
    };

    window.addEventListener('keydown', handlePhysicalKeyPress);
    return () => window.removeEventListener('keydown', handlePhysicalKeyPress);
  }, [onKeyPress]);

  const getKeyClasses = (key: string): string => {
    const status = keyStatuses[key.toUpperCase()] || 'default';
    const baseClasses =
      'flex items-center justify-center rounded mx-0.5 text-sm sm:text-base md:text-lg font-semibold cursor-pointer select-none transition-colors duration-150';
    const sizeClasses =
      key === 'Enter' || key === 'Backspace'
        ? 'w-16 sm:w-20 h-12'
        : 'w-8 sm:w-10 h-12';

    const statusClasses: Record<KeyStatus, string> = {
      correct: 'bg-green-500 text-white dark:bg-green-600',
      present: 'bg-yellow-500 text-white dark:bg-yellow-600',
      absent: 'bg-gray-500 text-white dark:bg-gray-600',
      default:
        'bg-gray-300 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600',
    };

    return `${baseClasses} ${sizeClasses} ${statusClasses[status]}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row.map((key) => (
            <button
              key={key}
              className={getKeyClasses(key)}
              onClick={() => onKeyPress(key)}
            >
              {key === 'Backspace' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
