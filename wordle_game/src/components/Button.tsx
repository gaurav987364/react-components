import React from 'react';
import { IoReload } from 'react-icons/io5';

interface Props {
    resetGame: () => void;
}
const Button:React.FC<Props> = ({resetGame}) => {
  return (
    <button onClick={resetGame} role='button' className=' flex items-center gap-1 px-4 py-1 dark:bg-gray-200 dark:hover:bg-gray-300 bg-slate-800 hover:bg-slate-900 rounded-lg mt-1 mx-auto cursor-pointer'>
    Reset<IoReload className='mt-1'/>
    </button>
  )
}

export default Button;