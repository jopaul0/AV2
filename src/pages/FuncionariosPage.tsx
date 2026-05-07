import { FUNCIONARIOS } from '../data/mocks/funcionarios'
import { NivelBadge } from '../components/ui/Badge'
import { Mail, Phone } from 'lucide-react'

export function FuncionariosPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="section-title">Funcionários</h1>
                <p className="section-subtitle mt-1">{FUNCIONARIOS.length} funcionários cadastrados</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
                {FUNCIONARIOS.map(f => (
                    <div key={f.id} className="card hover:border-border/80 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {f.nome[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">{f.nome}</p>
                                <p className="text-xs text-muted-foreground">{f.usuario}</p>
                            </div>
                            <NivelBadge nivel={f.nivelPermissao} />
                        </div>
                        <div className="space-y-1.5 pt-3 border-t border-border">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail size={12} /> {f.email}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Phone size={12} /> {f.telefone}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}