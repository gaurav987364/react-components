import React, { memo } from 'react';

interface Props {
  letter:string;
  green?:boolean;
  yellow?:boolean;
};


const Letter:React.FC<Props>  = ({
  letter = '',
  green = false,
  yellow = false,
}) => {
  return (
    <div className={`w-14 h-14 flex items-center justify-center border-2 rounded 
      border-gray-400 text-xl font-semibold
      ${green ? '!bg-green-500' : ''} 
      ${yellow ? '!bg-yellow-500' : ''}`}>
      {letter.trim()}
    </div>
  )
}

export default memo(Letter);