import React, { createContext, useEffect } from "react";

interface ThemeContextProps {
    mode: boolean;
    setMode: (theme: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({children}:{children:React.ReactNode})=>{
    const [mode,setMode] = React.useState<boolean>(()=>{
        const theme = localStorage.getItem("theme");

        if(theme){
            return theme === "dark"
        } else {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
    });

    useEffect(()=>{
        if(mode){
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme","dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme","light");
        }
    },[mode]);

    return (
        <ThemeContext.Provider value={{mode,setMode}}>
            {children}
        </ThemeContext.Provider>
    )
};

//hook
export const useTheme = ()=>{
    const context = React.useContext(ThemeContext);
    if(!context){
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};