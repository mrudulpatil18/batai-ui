import React, { createContext, useState, useContext } from 'react';

interface User {
    username: string;
    // Add other user properties as needed
}

interface AuthResponse {
    user: User;
    token: string;
    // Add other auth response properties as needed
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (authData: AuthResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });

    const login = (authData: AuthResponse) => {
        setUser(authData.user);
        setToken(authData.token);
        localStorage.setItem('user', JSON.stringify(authData.user));
        localStorage.setItem('token', authData.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};