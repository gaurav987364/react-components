import React, { useEffect, useState } from 'react';
import { useFetchWord } from '../hooks/useFetchWord';
import WordLine from './WordLine';
import Keyboard, { KeyStatus } from './Keyboard';

const WORD_LENGTH = 5;
const TOTAL_GUESS = 6;
interface HandleAlphabatesProps {
  key: string;
}

const Wordle: React.FC = () => {
  const [guessedWords, setGuessedWords] = useState<string[]>(
    new Array(TOTAL_GUESS).fill('     ')
  );
  const [currentWord,setCurrentWord] = useState("     ");
  const [wordCount, setWordCount] = useState<number>(0);
  const [letterCount, setLetterCount] = useState<number>(0);
  const [gameOver,setGameOver] = useState<boolean>(false);

  // Keyboard state
  const [keyStatuses, setKeyStatuses] = useState<Record<string, KeyStatus>>({});

  // Handle key presses
  const handleKeyPress = (key: string) => {
    console.log(key);
    // Implement game logic here
  };

  // Fetch the correct word and letter object
  const { correctWord, correctLetterObj } = useFetchWord();

  //handle enter
  const handleEnter = ()=>{
    //if current typed word is match to result
    if(currentWord === correctWord){
      setGameOver(true);
      alert("You won.")
      return
    };

    //if currrent typed word not matc & equal to total guess
    if(currentWord !== correctWord && wordCount === TOTAL_GUESS-1){
      setGameOver(true)
      alert("You loose.")
      return;
    }

    //if letter count !== word-length
    if(letterCount !== WORD_LENGTH){
      alert("Word must be 5 letters")
      return
    }

    setGuessedWords((prev)=>{
      const updatedGuessWordArray = [...prev];
      updatedGuessWordArray[wordCount] = currentWord;
      return updatedGuessWordArray;
    });

    //update things
    setWordCount(now => now+1);
    setLetterCount(0);
    setCurrentWord("     ");
  };

  //handle alphabates
  const handleAlphabates = (key: HandleAlphabatesProps['key']): void => {
    if (letterCount === WORD_LENGTH) {
      return;
    }

    setCurrentWord((prev: string): string => {
      const currentWordArray: string[] = prev.split("");
      currentWordArray[letterCount] = key;
      const newWord: string = currentWordArray.join("");
      return newWord;
    });
  };


  //update things
  useEffect(()=>{
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Enter") {
      handleEnter();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
      handleAlphabates(e.key);
      } else {
      return;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    if (gameOver) {
      document.removeEventListener('keydown', handleKeyDown)
    }

    return ()=>{
      document.removeEventListener('keydown', handleKeyDown)
    }
  },[gameOver])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <header className="w-full py-2 bg-gray-100 dark:bg-gray-800 shadow-md">
        <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
          Wordle Clone
        </h1>
      </header>

      <main className="flex-1 w-full max-w-md px-16 py-6">
        <div className="flex flex-col space-y-0.5">
          {guessedWords.map((word, index) => (
            <WordLine
              key={index}
              word={word}
              correctWord={correctWord}
              correctLetterObj={correctLetterObj}
              revealed={true}
            />
          ))}
        </div>

        {/* Placeholder for result */}
        <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
          {/* Display result messages here */}
        </div>
      </main>

      <footer className="w-fit px-8 py-4 bg-gray-100 dark:bg-gray-800 shadow-inner">
        <div className="max-w-md mx-auto px-4">
          <Keyboard 
           keyStatuses={keyStatuses} 
           onKeyPress={handleKeyPress} 
          />
        </div>
      </footer>
    </div>
  );
};

export default Wordle;
