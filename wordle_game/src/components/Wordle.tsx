import React, { useEffect, useState } from 'react';
import WordLine from './WordLine';
import Keyboard, { KeyStatus } from './Keyboard';

const WORD_LENGTH = 5;
const TOTAL_GUESS = 6;
interface HandleAlphabatesProps {
  key: string;
}
const API = "https://api.datamuse.com/words?sp=?????&max=1000";
type LetterObjectType = Record<string,number>;

const Wordle: React.FC = () => {
  const [guessedWords, setGuessedWords] = useState<string[]>(
    new Array(TOTAL_GUESS).fill('     ')
  );
  const [correctWord,setCorrectWord] = useState<string>("");
  const [correctLetterObj,setCorrectLetterObj] = useState({});

  const [currentWord,setCurrentWord] = useState("     ");
  //? Note: word count means one line
  const [wordCount, setWordCount] = useState<number>(0);
  //? Note letter count means one LetterBox ok 
  const [letterCount, setLetterCount] = useState<number>(0);
  const [gameOver,setGameOver] = useState<boolean>(false);

  // Keyboard state
  const [keyStatuses, setKeyStatuses] = useState<Record<string, KeyStatus>>({});

  // Handle key presses
  const handleKeyPress = (key: string) => {
    if (gameOver) return;
  
    // Handle keyboard input
    if (key === "Enter") {
      handleEnter();
    } else if (key === "Backspace") {
      handleBackSpace();
    } else if (/^[A-Za-z]$/.test(key)) {
      handleAlphabates(key.toUpperCase());
    }
  };

    
  const getWords = async () => {
    try {
        const res = await fetch(API);
        const data = await res.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const baseWord = data[randomIndex].word;
        const word = baseWord.toUpperCase(); // Convert to uppercase here
        console.log(word)

        const letterObject: LetterObjectType = {};
        for (const letter of word) {
            letterObject[letter] = (letterObject[letter] || 0) + 1;
        }

        setCorrectWord(word);
        setCorrectLetterObj(letterObject);
    } catch (error) {
        console.error(error);
    }
};
      

  //handle enter
  const handleEnter = ()=>{
    // Convert to uppercase and trim spaces
    const submittedWord = currentWord.replace(/ /g, '').toUpperCase();
    if (submittedWord.length !== WORD_LENGTH) {
      alert("Word must be 5 letters");
      return;
    }
  
    if (submittedWord === correctWord.toUpperCase()) {
        setGameOver(true);
        alert("You won!");
        return
    }

    if (wordCount === TOTAL_GUESS - 1) {
        setGameOver(true);
        alert(`You lose! Correct word was: ${correctWord}`);
        return;
    }
   
    setGuessedWords((prev)=>{
      const updatedGuessWordArray = [...prev];
      //when user hit enter we have to add the current word to guesswed word array at first index for first line
      updatedGuessWordArray[wordCount] = submittedWord.padEnd(5, " ") 
      return updatedGuessWordArray;
    });

    //update things
    //word count ke index ko increse kr rhe hai
    setWordCount(now => now+1);
    //agar 0 nhi krege to next line work ni kregi
    setLetterCount(0);
    //againset empty so next input of line liya ja sake
    setCurrentWord("     ");
  };

  //handle alphabates
  const handleAlphabates = (key: HandleAlphabatesProps['key']): void => {
    //if user is write 5 letter or he is on the end box;
    if (letterCount === WORD_LENGTH) {
      return;
    }

    setCurrentWord((prev: string): string => {
      const currentWordArray: string[] = prev.split("");
      //this line just add the values to array on indexs ok
      currentWordArray[letterCount] = key
      //convert array back to string
      const newWord: string = currentWordArray.join("");
      return newWord;
    });

    //we have to update lettercount
    setLetterCount(prev => prev+1);
  };

  const handleBackSpace = ()=>{
    if(letterCount === 0){
      return;
    }

    setCurrentWord((prev:string):string => {
      const prevWordArray:string[] = prev.split("");
      prevWordArray[letterCount-1] = " ";
      const newWord:string = prevWordArray.join("")
      return newWord;
    });

    setLetterCount(prev => prev-1);
  };

  //reset game
  const resetGame = ()=>{
    setGuessedWords(new Array(TOTAL_GUESS).fill("     "))
    setWordCount(0)
    getWords()
    setLetterCount(0)
    setCurrentWord("     ")
    setGameOver(false)
    setKeyStatuses({})
  }


  //update things
  useEffect(()=>{
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Enter") {
        handleEnter();
      } else if(e.key === "Backspace"){
        handleBackSpace()
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
  },[gameOver,handleEnter,handleAlphabates]);

  useEffect(()=>{
    getWords();
  },[]);

  //for keyboard
  // Add this useEffect in Wordle component
  useEffect(() => {
    if (wordCount === 0) return;
  
    const newStatuses = { ...keyStatuses };
    const lastGuess = guessedWords[wordCount - 1].toUpperCase();
  
    lastGuess.split('').forEach((letter, index) => {
      const correctLetter = correctWord.toUpperCase()[index];
      
      if (letter === correctLetter) {
        newStatuses[letter] = 'correct';
      } else if (
        correctWord.toUpperCase().includes(letter) && 
        newStatuses[letter] !== 'correct'
      ) {
        newStatuses[letter] = 'present';
      } else if (!newStatuses[letter]) {
        newStatuses[letter] = 'absent';
      }
    });
  
    setKeyStatuses(newStatuses);
  }, [wordCount, guessedWords, correctWord]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <header className="w-full py-2 bg-gray-100 dark:bg-gray-800 shadow-md">
        <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
          Wordle Clone
        </h1>
      </header>

      <main className="flex-1 w-full max-w-md px-16 py-6">
        <div className="flex flex-col space-y-0.5">
          {guessedWords.map((word, index) => {
            //if we type on same line 
            if(index === wordCount){
              return (
                <WordLine
                  key={index}
                  word={currentWord}
                  correctWord={correctWord}
                  correctLetterObj={correctLetterObj}
                  revealed={false}
                />
              )
            }
            return (
              <WordLine
                key={index}
                word={word}
                correctWord={correctWord}
                correctLetterObj={correctLetterObj}
                revealed={true}
              />
            )
          })}
        </div>

        {/* Placeholder for result */}
        <div className="mt-4 text-center text-gray-700 dark:text-gray-300">
          {/* Display result messages here */}
        </div>

        <button className=" px-3 py-2 bg-blue-500 rounded-lg text-gray-50 text-md font-semibold cursor-pointer"
        onClick={(e) => {resetGame(); (e.target as HTMLButtonElement).blur()}}>
        Reset Game
        </button>
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
