import React, { useEffect, useState } from 'react'
import WordsLine from './WordsLine';
import toast from 'react-hot-toast';
import Button from './Button';
import Keyboard, { KeyStatus } from './Keyboard';
import Modal from './Modal';
import Stats from './Stats';

const TOTAL_GUESSES_ALLOWED = 6;
const WORD_LENGTH = 5;
const API = "https://api.datamuse.com/words?sp=?????&max=100";
interface HandleAlphabatesProps {
    key: string;
}

const Game:React.FC = () => {
    const [guessedWords,setGuessedWords] = useState<string[]>(new Array(TOTAL_GUESSES_ALLOWED).fill('     '));
    const [correctWord,setCorrectWord] = useState<string>('');
    const [letterObject,setLetterObject] = useState<Record<string,number>>({});

    //track current word
    const [currentWord,setCurrentWord] = useState<string>('     ');
    

    //track records
    const [wordCount,setWordCount] = useState<number>(0);
    const [letterCount,setLetterCount] = useState<number>(0);
    const [gameOver,setGameOver] = useState<boolean>(false);

    //shake animtaion state
    const [shakeRow, setShakeRow] = useState<boolean>(false);

    //keyboard state to track key status
    const [keyStatuses,setKeyStatuses] = useState<Record<string,KeyStatus>>({});

    //when user won do many things;
    const [userWon,setUserWon] = useState<boolean>(false);


    const onGoBack = ()=>{
        setGameOver(false);
        setUserWon(false);
        resetGame();
        window.location.href = "/gamepage"
    }
    //handle keyboard
    //handle enter
    //handler backspace
    //handle alphabates
    const handleEnter = () => {
        const submittedWord = currentWord.replace(/ /gi, "").toUpperCase();

        //if user try to submit but with less than 5 letters
        if(submittedWord.length !== WORD_LENGTH){
            toast("Word has to be 5 letters long.",
                {
                    icon: '😲😲😲',
                    style: {
                      borderRadius: '10px',
                      background: '#333',
                      color: '#fff',
                    },
                }
            );
            //setting shake animation
            setShakeRow(true); // Trigger shake
            setTimeout(() => setShakeRow(false), 600); 
            return;
        };

        //if user word is match to correct word
        if(submittedWord === correctWord){
            toast.success("You won!",{
                icon: '🎉🎉🎉',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
            });
            setUserWon(true);
            setGameOver(true);
            return; 
        };

        //if all atempts of user are over
        if(wordCount === TOTAL_GUESSES_ALLOWED - 1){
            toast.error(`You lose! The word was ${correctWord}`,{
                icon: '🥺😭🥺',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
            });
            setGameOver(true);
            return;
        };

        setGuessedWords((prev)=>{
            const prevWordArray:string[] = [...prev];
            prevWordArray[wordCount] = submittedWord.padEnd(5, " ");
            return prevWordArray;
        });

        //?Most important thing to do
        setWordCount(prev => prev+1);
        setLetterCount(0);
        setCurrentWord('     ');
    };


    const handleBackSpace = () => {
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

    const handleAlphabates = (key:HandleAlphabatesProps["key"]):void=> {
      if(letterCount === WORD_LENGTH) return;
      
      setCurrentWord((prev:string):string => {
        const currentWordArray:string[] = prev.split("");
        currentWordArray[letterCount] = key;
        const newWord:string = currentWordArray.join("");
        return newWord;
      });

      setLetterCount(prev => prev+1);
    };
    //reset game
    const resetGame = () => {
        setGuessedWords(Array(TOTAL_GUESSES_ALLOWED).fill('     '));
        setCorrectWord('');
        setLetterObject({});
        setCurrentWord('     ');
        setWordCount(0);
        setLetterCount(0);
        setGameOver(false);
        getWord();  
        setKeyStatuses({});
        setUserWon(false);
    }

    //get word
    const getWord = async () => {
     try {
        const res = await fetch(API);
        const data = await res.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const baseWord = data[randomIndex].word;
        const word = baseWord.toUpperCase();
        console.log(word);

        setCorrectWord(word);

        const letterObject: Record<string,number> = {};
        for(const letter of word){
            letterObject[letter] = (letterObject[letter] || 0) + 1;
        }

        setLetterObject(letterObject);
     } catch (error) {
        console.error(error)
        toast.error("Something went wrong")
     } 
    };

    //handle key press for keyboard
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
    }

    //attach all events
    useEffect(()=>{
        const handleKeyDown = (e: KeyboardEvent) => {
          if(e.key === "Enter"){
            handleEnter();
          } else if(e.key === "Backspace"){
            handleBackSpace();
          } else if(/^[a-zA-Z]$/.test(e.key)){
            handleAlphabates(e.key);
          } else return;
        };
        window.addEventListener('keydown',handleKeyDown);

        if(gameOver){
            return;
        }

        return ()=>{
            window.removeEventListener('keydown',handleKeyDown)
        }
    },[gameOver,handleAlphabates,handleEnter])


    useEffect(()=>{
        getWord();
    },[]);

    //keyboard setup
    useEffect(()=>{
        if(wordCount === 0) return;

        const newStatuses:Record<string,KeyStatus> = {...keyStatuses};
        const lastGuess = guessedWords[wordCount-1].toUpperCase();

        lastGuess.split('').forEach((letter,index)=>{
            const correctLetter = correctWord.toUpperCase()[index];

            if(letter === correctLetter){
                newStatuses[letter] = 'correct';
            } else if(correctWord.toUpperCase().includes(letter) && newStatuses[letter] !== 'correct'){
                newStatuses[letter] = 'present';
            } else if(!newStatuses[letter]){
                newStatuses[letter] = 'absent';
            } 
        });

        setKeyStatuses(newStatuses);
    },[correctWord, guessedWords,wordCount]);

  return (
    <div className='flex flex-col items-center gap-y-5 justify-center'>
    {(gameOver) && (
      <Modal onClose={()=>{}}>
        <Stats />
        <div className="mt-4 text-center">
          {userWon ? (
            <p className="text-green-600 font-semibold">Congratulations! You guessed the word.</p>
          ) : (
            <p className="text-red-600 font-semibold">Oops! The word was <strong>{correctWord}</strong>.</p>
          )}
          <button 
            onClick={onGoBack}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Play Again
          </button>
        </div>
      </Modal>
    )}
  
    <div>
      {guessedWords.map((word, index) => {
        if(index === wordCount && !gameOver){
          return (
            <div 
              key={index} 
              className={`${shakeRow ? "animate-shake animate-duration-500 animate-ease" : ""}`}
            >
              <WordsLine
                word={currentWord}
                correctWord={correctWord}
                correctLetterObj={letterObject}
                revealed={false}
              />
            </div>
          );
        }
        return (
          <WordsLine
            key={index}
            word={word}
            correctWord={correctWord}
            correctLetterObj={letterObject}
            revealed={true}
          />
        );
      })}
    </div>
  
    {!gameOver && <Button resetGame={resetGame} />}
    {!gameOver && (
      <Keyboard
        keyStatuses={keyStatuses}
        onKeyPress={handleKeyPress}
      />
    )}
  </div>
  
  )
}

export default Game;