import { useState, createContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [perfil, setPerfil] = useState('Operador');

    const alternarPerfil = () => {
        setPerfil(prevPerfil === 'Operador' ? 'Administrador' : 'Operador');
    };

    return (
        <AuthContext.Provider value={{ perfil, alternarPerfil }}>
            {children}
        </AuthContext.Provider>
    );
}