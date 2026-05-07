import { Link } from 'react-router-dom'
import { Plane, Wrench, FlaskConical, Users, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useAuth } from '../hooks/useAuth'
import { useAeronaves } from '../hooks/useAeronaves'
import { StatCard } from '../components/ui/StatCard'
import { StatusEtapaBadge, TipoAeronaveBadge } from '../components/ui/Badge'
import { StatusEtapa } from '../types/enums/StatusEtapa'
import { StatusPeca } from '../types/enums/StatusPeca'
import { ResultadoTeste } from '../types/enums/ResultadoTeste'

const chartData = [
    { mes: 'Jan', comercial: 2, militar: 1 },
    { mes: 'Fev', comercial: 3, militar: 2 },
    { mes: 'Mar', comercial: 1, militar: 3 },
    { mes: 'Abr', comercial: 4, militar: 1 },
    { mes: 'Mai', comercial: 3, militar: 4 },
    { mes: 'Jun', comercial: 5, militar: 2 },
]

export function DashboardPage() {
    const { user } = useAuth()
    const { aeronaves } = useAeronaves()

    const emProducao = aeronaves.filter(a =>
        a.etapas.some(e => e.status === StatusEtapa.ANDAMENTO)
    ).length

    const pecasProntas = aeronaves.reduce((acc, a) =>
        acc + a.pecas.filter(p => p.status === StatusPeca.PRONTA).length
        , 0)

    const testesAprovados = aeronaves.reduce((acc, a) =>
        acc + a.testes.filter(t => t.resultado === ResultadoTeste.APROVADO).length
        , 0)

    const recentes = aeronaves.slice(0, 5)

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="section-title">
                    Olá, {user?.nome.split(' ')[0]}!
                </h1>
                <p className="section-subtitle mt-1">
                    Painel geral do sistema de produção de aeronaves
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
                <StatCard
                    label="Total de aeronaves"
                    value={aeronaves.length}
                    icon={<Plane size={16} />}
                />
                <StatCard
                    label="Aeronaves em produção"
                    value={emProducao}
                    icon={<Clock size={16} />}
                />
                <StatCard
                    label="Peças prontas"
                    value={pecasProntas}
                    icon={<Wrench size={16} />}
                />
                <StatCard
                    label="Testes aprovados"
                    value={testesAprovados}
                    icon={<CheckCircle size={16} />}
                />
            </div>

            {/* Table + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Aeronaves recentes */}
                <div className="lg:col-span-3 card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-semibold text-foreground">Aeronaves recentes</h2>
                        <Link to="/aeronaves" className="flex items-center gap-1 text-xs text-primary hover:underline">
                            Ver aeronaves <ArrowRight size={12} />
                        </Link>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="table-header text-left pb-2 px-2">Código</th>
                                <th className="table-header text-left pb-2 px-2">Tipo</th>
                                <th className="table-header text-left pb-2 px-2">Situação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentes.map(a => {
                                const etapaAtual = a.etapas.find(e => e.status === StatusEtapa.ANDAMENTO)
                                    || a.etapas[a.etapas.length - 1]
                                return (
                                    <tr key={a.codigo} className="table-row">
                                        <td className="table-cell">
                                            <Link to={`/aeronaves/${a.codigo}`} className="text-primary font-medium hover:underline">
                                                {a.codigo}
                                            </Link>
                                            <span className="text-xs text-muted-foreground ml-2">{a.modelo}</span>
                                        </td>
                                        <td className="table-cell">
                                            <TipoAeronaveBadge tipo={a.tipo} />
                                        </td>
                                        <td className="table-cell">
                                            {etapaAtual
                                                ? <StatusEtapaBadge status={etapaAtual.status} />
                                                : <span className="text-xs text-muted-foreground">—</span>
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Chart */}
                <div className="lg:col-span-2 card">
                    <h2 className="text-base font-semibold text-foreground mb-4">Gráfico de progresso</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={chartData} barSize={12}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 22%)" />
                            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'hsl(215 20% 55%)' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: 'hsl(215 20% 55%)' }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    background: 'hsl(220 18% 14%)',
                                    border: '1px solid hsl(220 12% 22%)',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                }}
                                cursor={{ fill: 'hsl(220 12% 22%)' }}
                            />
                            <Bar dataKey="comercial" fill="hsl(217 91% 58%)" radius={[3, 3, 0, 0]} />
                            <Bar dataKey="militar" fill="hsl(217 91% 38%)" radius={[3, 3, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Quick access */}
            <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Acesso rápido
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 stagger">
                    {[
                        { to: '/aeronaves', icon: Plane, label: 'Aeronaves', sub: `${aeronaves.length} cadastradas` },
                        { to: '/funcionarios', icon: Users, label: 'Funcionários', sub: '5 ativos' },
                        { to: '/testes', icon: FlaskConical, label: 'Testes', sub: `${testesAprovados} aprovados` },
                        { to: '/relatorios', icon: AlertCircle, label: 'Relatórios', sub: 'Exportar dados' },
                    ].map(({ to, icon: Icon, label, sub }) => (
                        <Link key={to} to={to} className="card hover:border-primary/40 transition-colors group">
                            <Icon size={20} className="text-primary mb-2" />
                            <p className="text-sm font-medium text-foreground">{label}</p>
                            <p className="text-xs text-muted-foreground">{sub}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}