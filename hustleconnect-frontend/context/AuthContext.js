import React,{useState, createContext} from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{user, login, logout, isAutheticated: !!user}}>
            {children}
        </AuthContext.Provider>
    );
};
