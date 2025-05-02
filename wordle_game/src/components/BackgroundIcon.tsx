// BackgroundIcons.tsx
import React from 'react';
import { BiSolidGame } from 'react-icons/bi';
import { DiAndroid, DiCssTricks } from 'react-icons/di';
import { FaGamepad, FaKeyboard, FaPuzzlePiece } from 'react-icons/fa';
import { SiRockstargames } from 'react-icons/si';

const icons = [
    FaGamepad, FaKeyboard, FaPuzzlePiece,SiRockstargames,BiSolidGame,DiAndroid,DiCssTricks,
    FaGamepad, FaKeyboard, FaPuzzlePiece,SiRockstargames,BiSolidGame,DiAndroid,DiCssTricks,
];

const BackgroundIcon: React.FC = () => {
  return (
    <div className="absolute max-w-full max-h-full overflow-hidden inset-0 pointer-events-none">
      {icons.map((Icon, index) => (
        <Icon
          key={index}
          className="text-[#1DCD9F] opacity-30 absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 3 + 2}rem`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundIcon;
