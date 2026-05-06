import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Funcionario } from '../types/models/Funcionario'
import { NivelPermissao } from '../types/enums/NivelPermissao'
import { CREDENTIALS } from '../data/mocks/credenciais'
import { FUNCIONARIOS } from '../data/mocks/funcionarios'

interface AuthContextType {
    user: Funcionario | null
    login: (usuario: string, senha: string) => boolean
    logout: () => void
    isAdmin: boolean
    isEngenheiro: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Funcionario | null>(null)

    const login = (usuario: string, senha: string): boolean => {
        const cred = CREDENTIALS[usuario]
        if (!cred || cred.senha !== senha) return false
        const funcionario = FUNCIONARIOS.find(f => f.id === cred.funcionarioId)
        if (!funcionario) return false
        setUser(funcionario)
        return true
    }

    const logout = () => setUser(null)

    const isAdmin = user?.nivelPermissao === NivelPermissao.ADMINISTRADOR
    const isEngenheiro = user?.nivelPermissao === NivelPermissao.ENGENHEIRO || isAdmin

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin, isEngenheiro }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}