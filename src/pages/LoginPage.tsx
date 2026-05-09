import { useState, useEffect } from 'react'
import type { SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

import millenniumImg from '../assets/millennium.png'
import vaderImg from '../assets/vader.png'

export function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [showSenha, setShowSenha] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [showEasterEgg, setShowEasterEgg] = useState(false)
    const [showVader, setShowVader] = useState(false)


    useEffect(() => {
        const falconTimer = setTimeout(() => {
            setShowEasterEgg(true)
        }, 20000)

        const vaderTimer = setTimeout(() => {
            setShowVader(true)
        }, 25000)

        return () => {
            clearTimeout(falconTimer)
            clearTimeout(vaderTimer)
        }
    }, [])

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Simula delay de rede
        await new Promise(r => setTimeout(r, 500))

        const ok = login(usuario, senha)
        setLoading(false)
        if (ok) navigate('/')
        else setError('Usuário ou senha inválidos.')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background decorativo */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, hsl(217 91% 58%) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, hsl(217 91% 58%) 0%, transparent 70%)' }}
                />
            </div>

            {showEasterEgg && (
                <img
                    src={millenniumImg}
                    alt="Millennium Falcon"
                    className="absolute top-10 left-0 w-32 z-50 pointer-events-none animate-millennium"
                />
            )}

            {showVader && (
                <div className="absolute bottom-0 right-10 z-50 pointer-events-none animate-vader flex flex-col items-center">
                    <p className="text-[10px] font-bold bg-destructive text-white px-2 py-0.5 rounded-t-md animate-fade-in">
                        Eu sou seu pai!
                    </p>
                    <img
                        src={vaderImg}
                        alt="Darth Vader"
                        className="w-40 h-auto"
                    />
                </div>
            )}

            {/* Card */}
            <div className="w-full max-w-sm mx-4 animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-primary tracking-tight select-none">AEROCODE</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Sistema de gestão de produção de aeronaves
                    </p>
                </div>

                {/* Form */}
                <div className="card border border-border p-6 shadow-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                                Usuário
                            </label>
                            <input
                                type="text"
                                value={usuario}
                                onChange={e => setUsuario(e.target.value)}
                                placeholder="seu.usuario"
                                required
                                className="input"
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    type={showSenha ? 'text' : 'password'}
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="input pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowSenha(p => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showSenha ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-destructive text-xs bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
                                <AlertCircle size={14} />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full justify-center mt-1 h-10 disabled:opacity-50"
                        >
                            {loading ? 'Verificando...' : 'Entrar'}
                        </button>
                    </form>

                    {/* Dica | Remover futuramente */}
                    <div className="mt-4 p-3 rounded-md bg-muted border border-border text-xs text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">Acessos de demonstração:</p>
                        <p><span className="text-primary">gerson</span> / 1234 — Admin</p>
                        <p><span className="text-primary">ana.souza</span> / 1234 — Engenheiro</p>
                        <p><span className="text-primary">beatriz.torres</span> / 1234 — Operador</p>
                    </div>
                </div>
            </div>
        </div>
    )
}