import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Funcionario } from '../types/models/Funcionario'
import { FUNCIONARIOS } from '../data/mocks/funcionarios'

interface FuncionariosContextType {
    funcionarios: Funcionario[]
    addFuncionario: (f: Funcionario) => void
    updateFuncionario: (id: string, data: Partial<Funcionario>) => void
    deleteFuncionario: (id: string) => void
    getFuncionario: (id: string) => Funcionario | undefined
}

const FuncionariosContext = createContext<FuncionariosContextType | null>(null)

export function FuncionariosProvider({ children }: { children: ReactNode }) {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>(FUNCIONARIOS)

    const addFuncionario = (f: Funcionario) =>
        setFuncionarios(prev => [...prev, f])

    const updateFuncionario = (id: string, data: Partial<Funcionario>) =>
        setFuncionarios(prev => prev.map(f => f.id === id ? { ...f, ...data } : f))

    const deleteFuncionario = (id: string) =>
        setFuncionarios(prev => prev.filter(f => f.id !== id))

    const getFuncionario = (id: string) =>
        funcionarios.find(f => f.id === id)

    return (
        <FuncionariosContext.Provider value={{ funcionarios, addFuncionario, updateFuncionario, deleteFuncionario, getFuncionario }}>
            {children}
        </FuncionariosContext.Provider>
    )
}

export function useFuncionarios() {
    const ctx = useContext(FuncionariosContext)
    if (!ctx) throw new Error('useFuncionarios must be inside FuncionariosProvider')
    return ctx
}