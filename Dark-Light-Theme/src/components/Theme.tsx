import { useState } from "react";
import Box from "./Box";
import { useTheme } from "../context/ThemeContext";

const Theme = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {mode} = useTheme();
    const onClick = () => {
        setIsOpen(!isOpen);
    }
  return (
    <div>
        <button onClick={onClick} className=" w-fit relative bg-purple-400 px-3 rounded-xl cursor-pointer">
            {mode === "light" ? (
                <span>🌙✨</span>
            ) : (
                <span>☀️</span>
            )}
        </button>
        {/* content */}
        {isOpen && (
            <Box close={() => setIsOpen(false)}/>
        )}
    </div>
  )
}

export default Theme;