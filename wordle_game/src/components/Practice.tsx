import React, { useEffect, useState } from 'react'

const NumberOfGuesses = 6;
const TotalAttempts = 5;
const Practice = () => {
    const [guessedWord,setGuessesWord] = useState(new Array(NumberOfGuesses).fill('     '));
    const [currentWord, setCurrentWord] = useState<string>('     ');

    const [correctWord,setCorrectWord] = useState('');

    const [wordCount,setWordCount] = useState(0);
    const [letterCount,setLetterCount] = useState(0);

    const handelEnter = ()=>{
        const submitWord = currentWord?.replace(/ /gi,"").toUpperCase();

        setGuessesWord((prev)=>{
            const prevWordArr = [...prev];
            prevWordArr[wordCount] = submitWord?.padEnd(5,' ')
            return prevWordArr;
        })

        setWordCount(prev => prev+1);
        setLetterCount(0)
        setCurrentWord('     ');
    };

    const handleKeyPress = (key)=>{
        if(letterCount === TotalAttempts) return;

        setCurrentWord(prev => {
            const currentWordArr = prev?.split('');
            currentWordArr[letterCount] = key;
            return currentWordArr?.join('');
        })
        setLetterCount(prev => prev+1);
    };

    useEffect(()=>{
        const handleKeyDown = (e:KeyboardEvent)=>{
            console.log(e.key)
            if(e.key === "Enter"){
                handelEnter()
            } else if(/[a-zA_Z]/.test(e.key)){
                handleKeyPress(e.key)
            } else {
                return
            }
        }

        window.addEventListener('keydown',handleKeyDown);

        return ()=>{
            window.removeEventListener('keydown',handleKeyDown);
        }
    },[handelEnter,handleKeyPress]);
  return (
    <div>
        {guessedWord?.map((word, index) => {
          if(index === wordCount){
            return (
                 <Wordline currentWord={correctWord} word={currentWord} key={index} revealed={false}/>
            )
          } 
          return (
            <Wordline currentWord={correctWord} word={word} key={index} revealed={true}/>
          )
        })}
    </div>
  )
}

export default Practice


//wordline 
const Wordline = ({word,letterObj,correctWord,revealed}:any)=>{
    const guess = word?.padEnd(5,' ').toUpperCase();
    return (
      <div className={`flex flex-row space-x-1 p-0.5 ${revealed ? '' : ''}`}>
        {guess?.split('')?.map((letter:string,index:number) => (
          <Letter letter={letter} key={index} />
        ))}
      </div>
    )
};


const Letter = ({letter}:any)=>{
    return (
        <div className='w-14 h-14 flex items-center justify-center border-2 rounded 
      border-gray-400 text-xl font-semibold'>
        {letter?.trim()}
      </div>
    )
};