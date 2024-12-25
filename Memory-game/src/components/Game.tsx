import { useState, useEffect } from 'react';
import { MdFlipCameraAndroid } from 'react-icons/md';
import { data } from '../App';

const Game = () => {
  const [emoji, setEmoji] = useState(suffleArray);
  const [firstClickIndex, setFirstClickIndex] = useState<number | null>(null);
  const [secondClickIndex, setSecondClickIndex] = useState<number | null>(null);
  const [turns, setTurns] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  function suffleArray() {
    const array = [...data, ...data];
    let currentIndex = array.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const handleClick = (index: number) => {
    if (firstClickIndex === null) {
      setFirstClickIndex(index);
    } else if (secondClickIndex === null) {
      setSecondClickIndex(index);
      const firstValue = emoji[firstClickIndex];
      const secondValue = emoji[index];

      if (firstValue === secondValue) {
        setMatchedPairs([...matchedPairs, firstClickIndex, index]);
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 2000);
      }
      setTurns(prevTurns => prevTurns + 1);
    }
  };

  const resetTurns = () => {
    setFirstClickIndex(null);
    setSecondClickIndex(null);
  };

  return (
    <div className="w-[35rem] h-[40rem] flex flex-col items-center justify-center border mx-auto p-2">
      <h2 className="text-xl text-neutral-50 text-center mx-auto mt-2">Memory Game</h2>
      <div className="grid grid-cols-4 gap-2 mt-2">
        {emoji.map((emoji, i) => (
          <div
            key={i}
            data-toggle={i === firstClickIndex || i === secondClickIndex || matchedPairs.includes(i)}
            className="card "
            onClick={() => handleClick(i)}
          >
            <div className="relative w-[70px] h-[80px] bg-pink-200 flex items-center justify-center border hover:border-blue-500">
              {/* Front face (G) */}
              <div className="front transition-transform duration-500 absolute w-full h-full flex items-center justify-center bg-purple-800 text-white text-lg font-bold z-10 cursor-pointer">
                <MdFlipCameraAndroid />
              </div>
              {/* Back face (Emoji) */}
              <div className="back absolute w-full h-full flex items-center justify-center bg-white text-lg font-bold">
                {emoji}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
