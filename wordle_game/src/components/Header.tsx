import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
    const {mode,setMode} = useTheme();

    const handleToggle = ()=>{
        setMode(!mode);
    };
  return (
    <div className=' absolute w-full h-12 bg-[#1DCD9F] dark:bg-[#3a975b] flex items-center justify-between px-5'>
        <span className=' flex items-center gap-1'>
            <strong className=' text-xl text-white dark:text-gray-200'>Theme</strong>
        </span>
        <button 
            type='button' 
            role='button'
            onClick={handleToggle}
            className=' w-9 h-9 flex justify-center items-center rounded-full bg-slate-800 dark:bg-white text-white dark:text-neutral-950 shadow-lg hover:bg-slate-600 transition-colors'
        >
            {mode ? <IoIosSunny  size={24}/> : <IoIosMoon  size={24}/>}
        </button>
    </div>
  )
}

export default Header;