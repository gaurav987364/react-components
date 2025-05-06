import React from 'react';
import Letter from './Letter';

interface Props {
    word: string;
    correctWord: string;
    correctLetterObj: Record<string, number>;
    revealed: boolean;
}

const WordsLine:React.FC<Props> = ({
    word = "",
    correctWord = "",
    correctLetterObj = {},
    revealed = false,
}) => {
    const guess = word.padEnd(5,' ').toUpperCase();
    const target = correctWord.padEnd(5,' ').toUpperCase();
    const statuses = new Array(5).fill('gray');
    const availableLetters = {...correctLetterObj};

    if(revealed){
        //green check
     guess?.split("").forEach((letter,index)=>{
        if(letter === target[index]){
            statuses[index] = "green";
            availableLetters[letter]--;
        }
     }) 

     //yellow check
     guess?.split("").forEach((letter,index)=>{
        //phle se green hai to return
        if(statuses[index] === "green") return;
        //agar maanlo koi letter ya charcter ek se jyda bar hai to ye yellow hoga
        if(availableLetters[letter] > 0){
            statuses[index] = "yellow";
            availableLetters[letter]--;
        }
     })
    }
  return (
    <div className={`flex flex-row space-x-1 p-0.5`}>
        {guess.split('').map((letter,index) => {
            return (
                <Letter
                 letter={letter}
                 key={index}
                 green={statuses[index] === "green"}
                 yellow={statuses[index] === "yellow"}
                />
            )
        })}
    </div>
  )
}

export default WordsLine