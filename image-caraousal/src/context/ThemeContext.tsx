import { createContext } from "react";
interface ContextProps{
    mode:boolean;
    setMode:React.Dispatch<React.SetStateAction<boolean>>;
};
export const ThemeContext = createContext<ContextProps | undefined>(undefined);