import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    mode : string;
    setMode : (mode: string) => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children : React.ReactNode})=>{
    const [mode, setMode] = useState("");

    const handelThemeChnage = ()=>{
        if(localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-schemee: dark)").matches)){
            setMode('dark');
            document.documentElement.classList.add('dark');
        } else {
            setMode('light');
            document.documentElement.classList.remove('dark');
        }
    }

    //wromg ha
    //const value = useMemo(()=>{mode,setMode},[mode]);

    useEffect(()=>{
        handelThemeChnage();
    },[mode])
    return (
        <ThemeContext.Provider value={{mode, setMode}}>
            {children}
        </ThemeContext.Provider>
    )
}


export const useTheme = ()=>{
    const context = useContext(ThemeContext);

    if(!context){
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}