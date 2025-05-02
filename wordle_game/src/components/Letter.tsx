import React from 'react'

interface Props {
  letter:string;
  green?:boolean;
  yellow?:boolean
}
const Letter:React.FC<Props>  = ({
  letter,
  green,
  yellow
}) => {
  return (
    <div className={` w-14 h-14 border-2 rounded border-gray-400 bg-white text-black text-4xl ${green ? "bg-[#1DCD9F]" : yellow ? "bg-amber-400" :" bg-gray-300"}`}>
      {letter}
    </div>
  )
}

export default Letter