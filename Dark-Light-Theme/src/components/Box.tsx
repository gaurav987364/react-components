import { themes } from "../constants"
import { useTheme } from "../context/ThemeContext";

interface Props{
    close:() => void
}
const Box = ({close}:Props) => {
    const {mode, setMode} = useTheme();
    // console.log(mode);
    
    const getValue = (value:string)=>{
        setMode(value);
        close();

        if(value !== "system"){
            localStorage.theme = value;
        } else{
            localStorage.removeItem("theme");
        }
    }
  return (
    <div className=" absolute  w-[100px] h-[100px] border border-black bg-white mt-2">
       {themes?.map((theme)=>(
        <span key={theme?.label} onClick={()=>getValue(theme?.value)} className={` flex flex-col px-2 py-1 border-b border-black cursor-pointer hover:bg-purple-400 transition-opacity ${mode === theme.value ? "font-semibold bg-purple-400" : "bg-white"}`}>
            {theme.label}
        </span>
       ))}
    </div>
  )
}

export default Box;