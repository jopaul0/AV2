import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plane, Users, FlaskConical, FileText, LogOut, ChevronDown, User, Menu, X, LogIn } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { NivelBadge } from '../ui/Badge'

const NAV_LINKS = [
    { to: '/aeronaves', label: 'Aeronaves', icon: Plane },
    { to: '/funcionarios', label: 'Funcionários', icon: Users },
    { to: '/testes', label: 'Testes', icon: FlaskConical },
    { to: '/relatorios', label: 'Relatórios', icon: FileText },
]

export function Navbar() {
    const { user, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const [dropOpen, setDropOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        setDropOpen(false)
        navigate('/login')
    }

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
            <div className="mx-auto max-w-screen-xl px-6 h-14 flex items-center justify-between">

                {/* Logo e Botão Mobile */}
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary tracking-tight select-none">
                        AEROCODE
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map(({ to, label }) => {
                        const active = location.pathname.startsWith(to)
                        return (
                            <Link
                                key={to}
                                to={to}
                                className={active ? 'nav-item-active' : 'nav-item'}
                            >
                                {label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="relative">
                    {user ? (
                        <>
                            <button
                                onClick={() => setDropOpen(p => !p)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-secondary transition-colors duration-150 cursor-pointer"
                            >
                                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                                    <User size={14} className="text-primary" />
                                </div>
                                <span className="text-sm font-medium text-foreground hidden sm:block">
                                    {user.nome.split(' ')[0]}
                                </span>
                                <ChevronDown size={14} className="text-muted-foreground" />
                            </button>

                            {dropOpen && (
                                <div className="absolute right-0 top-full mt-1 w-56 bg-card border border-border rounded-lg shadow-xl py-1 animate-fade-in z-50">
                                    <div className="px-4 py-3 border-b border-border">
                                        <p className="text-sm font-semibold text-foreground">{user.nome}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
                                        <div className="mt-2">
                                            <NivelBadge nivel={user.nivelPermissao} />
                                        </div>
                                    </div>
                                    <Link
                                        to="/perfil"
                                        onClick={() => setDropOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                                    >
                                        <User size={14} />
                                        Meu perfil
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors"
                                    >
                                        <LogOut size={14} />
                                        Sair da conta
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary flex items-center gap-2 py-1.5 px-4 h-auto">
                            <LogIn size={14} />
                            <span>Entrar</span>
                        </Link>
                    )}
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-card px-6 py-4 space-y-2 animate-fade-in">
                    {NAV_LINKS.map(({ to, label, icon: Icon }) => {
                        const active = location.pathname.startsWith(to)
                        return (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
                                    }`}
                            >
                                <Icon size={16} />
                                {label}
                            </Link>
                        )
                    })}
                </div>
            )}
        </header>
    )
}