import { useParams, Link } from 'react-router-dom'
import { formatDate } from '../utils/date'
import { useAeronaves } from '../hooks/useAeronaves'
import { StatCard } from '../components/ui/StatCard'
import { ResultadoBadge, StatusEtapaBadge, StatusPecaBadge } from '../components/ui/Badge'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Download, Printer, FileText } from 'lucide-react'
import { StatusPeca } from '../types/enums/StatusPeca'
import { ResultadoTeste } from '../types/enums/ResultadoTeste'

export function RelatoriosPage() {
    const { aeronaves } = useAeronaves()
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="section-title">Relatórios</h1>
                <p className="section-subtitle mt-1">Selecione uma aeronave para exportar o relatório</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
                {aeronaves.map(a => (
                    <Link key={a.codigo} to={`/relatorios/${a.codigo}`}
                        className="card hover:border-primary/40 transition-colors group">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText size={18} className="text-primary" />
                            <div>
                                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {a.codigo}
                                </p>
                                <p className="text-xs text-muted-foreground">{a.modelo} · {a.tipo}</p>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                            {a.etapas.length} etapas · {a.pecas.length} peças · {a.testes.length} testes
                        </p>
                        {a.cliente && <p className="text-xs text-muted-foreground">Cliente: {a.cliente}</p>}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export function RelatorioDetailPage() {
    const { codigo } = useParams<{ codigo: string }>()
    const { getAeronave } = useAeronaves()
    const aeronave = getAeronave(codigo!)

    if (!aeronave) return (
        <div className="text-center py-20 text-muted-foreground">
            Aeronave não encontrada. <Link to="/relatorios" className="text-primary hover:underline">Voltar</Link>
        </div>
    )

    const etapasConcluidas = aeronave.etapas.filter(e => e.status === 'CONCLUIDA').length
    const pecasProntas = aeronave.pecas.filter(p => p.status === StatusPeca.PRONTA).length
    const testesAprovados = aeronave.testes.filter(t => t.resultado === ResultadoTeste.APROVADO).length

    const chartData = aeronave.etapas.map(e => ({
        nome: e.nome.length > 14 ? e.nome.slice(0, 14) + '…' : e.nome,
        valor: e.status === 'CONCLUIDA' ? 3 : e.status === 'ANDAMENTO' ? 2 : 1,
    }))

    const handleExport = (format: string) => {
        if (format === 'txt') {
            const content = [
                '=== RELATÓRIO AEROCODE ===',
                `Código: ${aeronave.codigo}`,
                `Modelo: ${aeronave.modelo}`,
                `Tipo: ${aeronave.tipo}`,
                `Capacidade: ${aeronave.capacidade} pax`,
                `Alcance: ${aeronave.alcance} km`,
                `Cliente: ${aeronave.cliente || '—'}`,
                `Data de entrega: ${formatDate(aeronave.dataEntrega)}`,
                '',
                '--- ETAPAS ---',
                ...aeronave.etapas.map(e => `${e.nome}: ${e.status} (prazo: ${e.prazo})`),
                '',
                '--- PEÇAS ---',
                ...aeronave.pecas.map(p => `${p.nome} | ${p.tipo} | ${p.fornecedor} | ${p.status}`),
                '',
                '--- TESTES ---',
                ...aeronave.testes.map(t => `${t.tipo}: ${t.resultado} (${formatDate(t.data)})`),
                '',
                `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
            ].join('\n')

            const blob = new Blob([content], { type: 'text/plain' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url; a.download = `relatorio-${aeronave.codigo}.txt`; a.click()
            URL.revokeObjectURL(url)
        } else if (format === 'print') {
            window.print()
        }
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="section-title">{aeronave.codigo} / {aeronave.modelo} / {aeronave.tipo}</h1>
                    <p className="section-subtitle mt-1">
                        {aeronave.cliente && `Cliente: ${aeronave.cliente}`}
                        {aeronave.dataEntrega && ` · Entrega: ${formatDate(aeronave.dataEntrega)}`}
                    </p>
                </div>
                {/* Export buttons */}
                <div className="flex gap-2 flex-wrap">
                    <button onClick={() => handleExport('txt')} className="btn-secondary flex items-center gap-2 text-xs">
                        <Download size={13} /> TXT
                    </button>
                    <button onClick={() => handleExport('print')} className="btn-secondary flex items-center gap-2 text-xs">
                        <Printer size={13} /> Imprimir
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
                <StatCard label="Etapas finalizadas" value={etapasConcluidas} />
                <StatCard label="Funcionários" value={[...new Set(aeronave.etapas.flatMap(e => e.funcionarios))].length} />
                <StatCard label="Peças prontas" value={pecasProntas} />
                <StatCard label="Testes aprovados" value={testesAprovados} />
            </div>

            {/* Chart + Testes */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 card">
                    <h2 className="text-sm font-semibold text-foreground mb-4">Gráfico de progresso — etapas</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={chartData} barSize={18}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 22%)" />
                            <XAxis dataKey="nome" tick={{ fontSize: 10, fill: 'hsl(215 20% 55%)' }} axisLine={false} tickLine={false} />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ background: 'hsl(220 18% 14%)', border: '1px solid hsl(220 12% 22%)', borderRadius: '8px', fontSize: '12px' }}
                                cursor={{ fill: 'hsl(220 12% 22%)' }}
                                formatter={(v) => [['Pendente', 'Em andamento', 'Concluída'][(v as number) - 1] ?? '—', 'Status']}
                            />
                            <Bar dataKey="valor" fill="hsl(217 91% 58%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="lg:col-span-2 card space-y-3">
                    <h2 className="text-sm font-semibold text-foreground">Resultados dos testes</h2>
                    {aeronave.testes.length === 0
                        ? <p className="text-xs text-muted-foreground">Nenhum teste registrado.</p>
                        : aeronave.testes.map(t => (
                            <div key={t.id} className="flex items-center justify-between">
                                <span className="text-xs text-foreground">{t.tipo}</span>
                                <ResultadoBadge resultado={t.resultado} />
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Etapas */}
            <div className="card">
                <h2 className="text-sm font-semibold text-foreground mb-4">Etapas realizadas</h2>
                <table className="w-full">
                    <thead><tr>
                        {['Etapa', 'Prazo', 'Status'].map(h => <th key={h} className="table-header text-left pb-2 px-2">{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {aeronave.etapas.map(e => (
                            <tr key={e.id} className="table-row">
                                <td className="table-cell px-2">{e.nome}</td>
                                <td className="table-cell px-2 text-xs text-muted-foreground">{e.prazo}</td>
                                <td className="table-cell px-2"><StatusEtapaBadge status={e.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Peças */}
            <div className="card">
                <h2 className="text-sm font-semibold text-foreground mb-4">Peças utilizadas</h2>
                <table className="w-full">
                    <thead><tr>
                        {['Nome', 'Tipo', 'Fornecedor', 'Status'].map(h => <th key={h} className="table-header text-left pb-2 px-2">{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {aeronave.pecas.map(p => (
                            <tr key={p.id} className="table-row">
                                <td className="table-cell px-2">{p.nome}</td>
                                <td className="table-cell px-2 text-xs text-muted-foreground">{p.tipo}</td>
                                <td className="table-cell px-2 text-xs">{p.fornecedor}</td>
                                <td className="table-cell px-2"><StatusPecaBadge status={p.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}