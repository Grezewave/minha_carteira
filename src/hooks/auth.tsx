import React, { createContext, useState, useContext } from 'react';


interface IAuthContext {
    signIn(email: string, password: string): void;
    signOut(): void;
    logged: boolean;
}

export interface IAuthProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const loggedSaved = localStorage.getItem('@minha-carteira:logged');

        return !!loggedSaved;
    });

    const signIn = (email: string, password: string) => {
        if (email === 'vitor@email.com' && password === '678'){
            localStorage.setItem('@minha-carteira:logged', 'logged');
            setLogged(true);
        }else{
            alert('Senha ou usuário inválido');
        }
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{ logged, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context
}

export {AuthProvider, useAuth};