import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    theme:"light" | "dark";
    toggleTheme:() => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider : React.FC<{children:ReactNode}> = ({children}) => {
    const [theme,setTheme] = useState<"light" | "dark">(() => {
        return (localStorage.getItem("theme") as "light" | "dark") || "light"
    })

    const toggleTheme = () => {
        setTheme((prevTheme) =>{
            console.log(prevTheme,"prevTheme")
            return prevTheme === "light" ? "dark" : "light"
        });
    };

    useEffect(() => {
        console.log(theme,"theme432")
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    },[theme])
    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () : ThemeContextType => {
    const context = useContext(ThemeContext);
    console.log(context,"context")
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}