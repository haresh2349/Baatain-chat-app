import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
    isLoggedIn : boolean;
    login:() => void;
    logout:() => void
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn:localStorage.getItem("accessToken") ? true : false,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem("accessToken") ? true : false);
    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return <AuthContext.Provider value={{isLoggedIn,login,logout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)