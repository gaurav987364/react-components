// Instruction UI (used in sidebar and large screens)
import { BiSolidCheckbox } from 'react-icons/bi';
const Instructions = () => (
    <div className="space-y-4">
       <div className="flex items-center gap-3">
          <img src="/wordle-icon.svg" alt="Wordle" className="w-10 h-10" />
          <h1 className="text-2xl font-bold uppercase">Wordle!</h1>
        </div>
      <h2 className="text-lg font-bold">How to Play</h2>
      <p className="text-sm leading-relaxed text-gray-300 dark:text-gray-600">
        Get 6 chances to guess a 5-letter word.
      </p>
  
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <BiSolidCheckbox size={22} className="text-green-500" />
          <span>Correct letter and position</span>
        </div>
        <div className="flex items-center gap-2">
          <BiSolidCheckbox size={22} className="text-yellow-400" />
          <span>Correct letter, wrong position</span>
        </div>
        <div className="flex items-center gap-2">
          <BiSolidCheckbox size={22} className="text-gray-500" />
          <span>Letter not in the word</span>
        </div>
      </div>
  
      <div className="mt-2 text-xs text-gray-400 dark:text-gray-600 space-y-1">
        <p>• Type to play.</p>
        <p>• Press <strong>Enter</strong> to submit.</p>
      </div>
    </div>
);

export default Instructions;