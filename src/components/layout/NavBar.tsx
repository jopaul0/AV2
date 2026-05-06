import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plane, Users, FlaskConical, FileText, LogOut, ChevronDown, User } from 'lucide-react'
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

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
            <div className="mx-auto max-w-screen-xl px-6 h-14 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary tracking-tight select-none">
                    <Plane size={20} />
                    AEROCODE
                </Link>

                {/* Nav links */}
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

                {/* User menu */}
                <div className="relative">
                    <button
                        onClick={() => setDropOpen(p => !p)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-secondary transition-colors duration-150 cursor-pointer"
                    >
                        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                            <User size={14} className="text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground hidden sm:block">
                            {user?.nome.split(' ')[0]}
                        </span>
                        <ChevronDown size={14} className="text-muted-foreground" />
                    </button>

                    {dropOpen && (
                        <div className="absolute right-0 top-full mt-1 w-56 bg-card border border-border rounded-lg shadow-xl py-1 animate-fade-in z-50">
                            <div className="px-4 py-3 border-b border-border">
                                <p className="text-sm font-semibold text-foreground">{user?.nome}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
                                <div className="mt-2">
                                    {user && <NivelBadge nivel={user.nivelPermissao} />}
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
                </div>
            </div>
        </header>
    )
}