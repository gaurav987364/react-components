import { Dispatch, SetStateAction } from "react";
import { mode } from "../Game2";

interface Props {
    mode: mode;
    setMode: Dispatch<SetStateAction<mode>>;
}
const Tabbaar = ({mode, setMode} : Props) => {
  return (
    <div className="tab-bar w-60 h-12 border mx-auto mt-2 rounded-xl overflow-hidden flex items-center justify-evenly gap-1"> 
        <span onClick={() => setMode("game")} className={`tab-item w-1/2 py-3 text-center cursor-pointer text-lg font-semibold ${mode === "game" ? "active" : ""}`} >
            Game 
        </span>  
        <span onClick={() => setMode("settings")} className={`tab-item w-1/2 py-3 text-center cursor-pointer text-lg font-semibold ${mode === "settings" ? "active" : ""}`} > 
            Settings
        </span> 
    </div> 
  )
}

export default Tabbaar