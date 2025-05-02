import React from 'react'
import Letter from './Letter';

interface Props {
    word:string;
    correctWord:string;
    correctLetterObj:Record<string,number>;
    revealed:boolean
}
const WordLine:React.FC<Props> = ({
    word = "",
    correctLetterObj = {},
    correctWord = "",
    revealed = false
}) => {
  return (
    <div className=' flex flex-row space-x-1 p-0.5'>
        {word?.split("").map((letter,index)=>{
            return (
                <Letter
                 letter={letter}
                 key={index}
                />
            )
        })}
    </div>
  )
}

export default WordLine;