import { createContext, useContext, useState } from 'react'
import { StatusEtapa } from '../types/enums/StatusEtapa'
import { AERONAVES } from '../data/mocks/aeronaves'
import type { ReactNode } from 'react'
import type { Aeronave } from '../types/models/Aeronave'
import type { Etapa } from '../types/models/Etapa'
import type { Peca } from '../types/models/Peca'
import type { Teste } from '../types/models/Teste'

interface AeronavesContextType {
    aeronaves: Aeronave[]
    getAeronave: (codigo: string) => Aeronave | undefined
    addAeronave: (a: Aeronave) => void
    updateAeronave: (codigo: string, data: Partial<Aeronave>) => void
    addPeca: (codigo: string, peca: Peca) => void
    updatePecaStatus: (codigo: string, pecaId: string, status: Peca['status']) => void
    addEtapa: (codigo: string, etapa: Etapa) => void
    avancarEtapa: (codigo: string, etapaId: string) => void
    addTeste: (codigo: string, teste: Teste) => void
}

const AeronavesContext = createContext<AeronavesContextType | null>(null)

export function AeronavesProvider({ children }: { children: ReactNode }) {
    const [aeronaves, setAeronaves] = useState<Aeronave[]>(AERONAVES)

    const getAeronave = (codigo: string) =>
        aeronaves.find(a => a.codigo === codigo)

    const addAeronave = (a: Aeronave) => {
        setAeronaves(prev => [...prev, a])
    }

    const updateAeronave = (codigo: string, data: Partial<Aeronave>) => {
        setAeronaves(prev => prev.map(a => a.codigo === codigo ? { ...a, ...data } : a))
    }

    const addPeca = (codigo: string, peca: Peca) => {
        setAeronaves(prev => prev.map(a =>
            a.codigo === codigo ? { ...a, pecas: [...a.pecas, peca] } : a
        ))
    }

    const updatePecaStatus = (codigo: string, pecaId: string, status: Peca['status']) => {
        setAeronaves(prev => prev.map(a =>
            a.codigo === codigo
                ? { ...a, pecas: a.pecas.map(p => p.id === pecaId ? { ...p, status } : p) }
                : a
        ))
    }

    const addEtapa = (codigo: string, etapa: Etapa) => {
        setAeronaves(prev => prev.map(a =>
            a.codigo === codigo ? { ...a, etapas: [...a.etapas, etapa] } : a
        ))
    }

    const avancarEtapa = (codigo: string, etapaId: string) => {
        setAeronaves(prev => prev.map(a => {
            if (a.codigo !== codigo) return a
            return {
                ...a,
                etapas: a.etapas.map(e => {
                    if (e.id !== etapaId) return e
                    const next: Record<StatusEtapa, StatusEtapa> = {
                        [StatusEtapa.PENDENTE]: StatusEtapa.ANDAMENTO,
                        [StatusEtapa.ANDAMENTO]: StatusEtapa.CONCLUIDA,
                        [StatusEtapa.CONCLUIDA]: StatusEtapa.CONCLUIDA,
                    }
                    return { ...e, status: next[e.status] }
                }),
            }
        }))
    }

    const addTeste = (codigo: string, teste: Teste) => {
        setAeronaves(prev => prev.map(a =>
            a.codigo === codigo ? { ...a, testes: [...a.testes, teste] } : a
        ))
    }

    return (
        <AeronavesContext.Provider value={{
            aeronaves, getAeronave, addAeronave, updateAeronave,
            addPeca, updatePecaStatus, addEtapa, avancarEtapa, addTeste,
        }}>
            {children}
        </AeronavesContext.Provider>
    )
}

export function useAeronaves() {
    const ctx = useContext(AeronavesContext)
    if (!ctx) throw new Error('useAeronaves must be used inside AeronavesProvider')
    return ctx
}