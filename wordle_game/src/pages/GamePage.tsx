import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { MdClose, MdLightbulb } from 'react-icons/md';
import Instructions from '../components/Instructions';
import Game from '../components/Game';

const GamePage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="min-h-screen bg-black text-teal-400 dark:bg-white dark:text-emerald-700 transition-colors duration-300 overflow-hidden">
  
      {/* Layout */}
      <div className="flex flex-col lg:flex-row h-[100vh]">
        {/* Instructions Sidebar for small screens */}
        {showSidebar && (
          <div className="fixed top-0 left-0 w-72 h-full bg-black dark:bg-white z-50 p-4 shadow-lg transition-transform duration-300">
            <button
              className="text-sm text-red-400 mb-4"
              onClick={() => setShowSidebar(false)}
            >
              <MdClose size={22}/>
            </button>
            <Instructions />
          </div>
        )}

        {/* Left Instructions (only visible on large screen) */}
        <div className="hidden lg:block w-[20%] border-r border-gray-700 dark:border-gray-300 p-4">
          <Instructions />
        </div>

        {/* Main Game Area */}
        <div className="w-full lg:w-[60%] flex flex-col p-4 border-b lg:border-b-0 border-gray-700 dark:border-gray-300">
          {/* Top controls */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <button
              className="text-white dark:text-black transition-all duration-300"
              onClick={() => setShowSidebar(true)}
            >
              <FiMenu size={24} />
            </button>
            <button
              className="flex items-center gap-1 bg-teal-600 dark:bg-emerald-600 text-white px-3 py-1 rounded hover:bg-teal-700 dark:hover:bg-emerald-700"
              onClick={() => setShowHint(prev => !prev)}
            >
              <MdLightbulb size={20} />
              Hint
            </button>
          </div>

          {/* Hint box */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              showHint ? 'max-h-40 mb-4' : 'max-h-0'
            }`}
          >
            <div className="bg-gray-800 dark:bg-gray-100 p-4 rounded-md text-sm text-gray-300 dark:text-gray-800 shadow-lg">
              <p>💡 Try common vowels like A, E, O first.</p>
              <p>💡 Avoid repeating letters until necessary.</p>
            </div>
          </div>

          {/* Game content */}
          <div className="flex-1 flex items-center flex-col space-y-5 justify-center text-lg font-semibold text-gray-300 dark:text-gray-600">
            <Game/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
