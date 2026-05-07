import { useAuth } from '../hooks/useAuth'
import { useAeronaves } from '../hooks/useAeronaves'
import { NivelBadge, StatusEtapaBadge, TipoAeronaveBadge } from '../components/ui/Badge'
import { Mail, Phone, MapPin, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StatusEtapa } from '../types/enums/StatusEtapa'

export function PerfilPage() {
    const { user, logout } = useAuth()
    const { aeronaves } = useAeronaves()
    const navigate = useNavigate()

    const recentActivity = aeronaves.slice(0, 5).map(a => ({
        aeronave: a,
        etapa: a.etapas.find(e => e.status === StatusEtapa.ANDAMENTO) || a.etapas[0],
    })).filter(x => x.etapa)

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="section-title">Meu perfil</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User card */}
                <div className="card flex flex-col items-center text-center gap-4 py-8">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                        {user?.nome[0]}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground">{user?.nome}</h2>
                        <p className="text-sm text-muted-foreground">{user?.usuario}</p>
                        <div className="mt-2">{user && <NivelBadge nivel={user.nivelPermissao} />}</div>
                    </div>
                    <div className="w-full space-y-2 pt-4 border-t border-border text-left">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail size={13} /> {user?.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone size={13} /> {user?.telefone}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin size={13} /> {user?.endereco}
                        </div>
                    </div>
                    <button
                        onClick={() => { logout(); navigate('/login') }}
                        className="btn-danger w-full flex items-center justify-center gap-2 mt-2"
                    >
                        <LogOut size={14} /> Sair da conta
                    </button>
                </div>

                {/* Atividade recente */}
                <div className="lg:col-span-2 card">
                    <h2 className="text-base font-semibold text-foreground mb-4">Atividade recente</h2>
                    <div className="space-y-3">
                        {recentActivity.map(({ aeronave, etapa }) => (
                            <div key={aeronave.codigo} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                <div>
                                    <p className="text-sm font-medium text-foreground">{aeronave.codigo}</p>
                                    <p className="text-xs text-muted-foreground">{aeronave.modelo} · {etapa?.nome}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TipoAeronaveBadge tipo={aeronave.tipo} />
                                    {etapa && <StatusEtapaBadge status={etapa.status} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}