import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
    const {mode,setMode} = useTheme();

    const handleToggle = ()=>{
        setMode(!mode);
    };
  return (
    <div className=' absolute w-full h-12 border-b border-black dark:border-gray-200 flex items-center justify-between px-5'>
        <span className=' flex items-center gap-1'>
            <strong className=' text-xl dark:text-neutral-100'>Theme</strong>
        </span>
        <button 
            type='button' 
            role='button'
            onClick={handleToggle}
            className=' w-9 h-9 flex justify-center items-center rounded-full bg-amber-500 text-neutral-950 shadow-lg hover:bg-amber-600 transition-colors'
        >
            {mode ? <IoIosSunny  size={24}/> : <IoIosMoon  size={24}/>}
        </button>
    </div>
  )
}

export default Header;