interface Props {
    mode: string;
    setMode: (mode: string) => void;
}
const Tabbaar = ({mode, setMode} : Props) => {
  return (
    <div className="tab-bar w-80 h-12 border mx-auto mt-2 rounded-xl overflow-hidden flex items-center justify-evenly gap-1"> 
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