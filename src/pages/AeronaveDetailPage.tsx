import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, FileText } from 'lucide-react'
import { useAeronaves } from '../hooks/useAeronaves'
import { useAuth } from '../hooks/useAuth'
import { StatusPecaBadge, StatusEtapaBadge, ResultadoBadge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { FUNCIONARIOS } from '../data/mocks/funcionarios'
import { TipoPeca } from '../types/enums/TipoPeca'
import { TipoTeste } from '../types/enums/TipoTeste'
import { ResultadoTeste } from '../types/enums/ResultadoTeste'
import { StatusPeca } from '../types/enums/StatusPeca'
import { StatusEtapa } from '../types/enums/StatusEtapa'


type Tab = 'pecas' | 'etapas' | 'funcionarios' | 'testes'

export function AeronaveDetailPage() {
    const { codigo } = useParams<{ codigo: string }>()
    const { getAeronave, updatePecaStatus, addEtapa, avancarEtapa, addTeste, addPeca } = useAeronaves()
    const { isEngenheiro } = useAuth()
    const navigate = useNavigate()

    const aeronave = getAeronave(codigo!)
    const [tab, setTab] = useState<Tab>('pecas')

    // Modais
    const [modalPeca, setModalPeca] = useState(false)
    const [modalEtapa, setModalEtapa] = useState(false)
    const [modalTeste, setModalTeste] = useState(false)

    // Forms
    const [formPeca, setFormPeca] = useState({ nome: '', tipo: TipoPeca.NACIONAL, fornecedor: '', status: StatusPeca.EM_PRODUCAO })
    const [formEtapa, setFormEtapa] = useState({ nome: '', prazo: '' })
    const [formTeste, setFormTeste] = useState({ tipo: TipoTeste.ELETRICO, resultado: ResultadoTeste.APROVADO })

    if (!aeronave) return (
        <div className="text-center py-20 text-muted-foreground">
            Aeronave não encontrada.{' '}
            <Link to="/aeronaves" className="text-primary hover:underline">Voltar</Link>
        </div>
    )

    const tabs: { id: Tab; label: string; count: number }[] = [
        { id: 'pecas', label: 'Peças', count: aeronave.pecas.length },
        { id: 'etapas', label: 'Etapas', count: aeronave.etapas.length },
        { id: 'funcionarios', label: 'Funcionários', count: 0 },
        { id: 'testes', label: 'Testes', count: aeronave.testes.length },
    ]

    const allFuncionarios = aeronave.etapas.flatMap(e => e.funcionarios)
    const uniqueFuncIds = [...new Set(allFuncionarios)]
    const funcDaAeronave = FUNCIONARIOS.filter(f => uniqueFuncIds.includes(f.id))

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <button onClick={() => navigate('/aeronaves')} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <ArrowLeft size={14} /> Aeronaves
                </button>
                <span>/</span>
                <span className="text-foreground font-medium">{aeronave.codigo}</span>
            </div>

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="section-title">
                        {aeronave.codigo} / {aeronave.modelo} / {aeronave.tipo}
                    </h1>
                    <p className="section-subtitle mt-1">
                        Capacidade: {aeronave.capacidade} pax · Alcance: {aeronave.alcance} km
                        {aeronave.cliente && ` · Cliente: ${aeronave.cliente}`}
                    </p>
                </div>
                <Link to={`/relatorios/${aeronave.codigo}`} className="btn-primary flex items-center gap-2">
                    <FileText size={14} /> Gerar relatório
                </Link>
            </div>

            {/* Tabs */}
            <div className="border-b border-border flex gap-1">
                {tabs.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-150 -mb-px ${tab === t.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {t.label}
                        {t.count > 0 && (
                            <span className="ml-1.5 text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm">
                                {t.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* ── Peças ── */}
            {tab === 'pecas' && (
                <div className="space-y-4 animate-fade-in">
                    {isEngenheiro && (
                        <button onClick={() => setModalPeca(true)} className="btn-secondary flex items-center gap-2">
                            <Plus size={14} /> Adicionar peça
                        </button>
                    )}
                    <div className="card p-0 overflow-hidden">
                        <table className="w-full">
                            <thead className="border-b border-border">
                                <tr>
                                    {['Nome', 'Tipo', 'Fornecedor', 'Status', isEngenheiro ? 'Ação' : ''].map(h => (
                                        <th key={h} className="table-header text-left py-3 px-4">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {aeronave.pecas.length === 0 ? (
                                    <tr><td colSpan={5} className="table-cell text-center text-muted-foreground py-8">Nenhuma peça cadastrada.</td></tr>
                                ) : aeronave.pecas.map(p => (
                                    <tr key={p.id} className="table-row">
                                        <td className="table-cell font-medium">{p.nome}</td>
                                        <td className="table-cell text-xs text-muted-foreground">{p.tipo}</td>
                                        <td className="table-cell text-xs">{p.fornecedor}</td>
                                        <td className="table-cell"><StatusPecaBadge status={p.status} /></td>
                                        {isEngenheiro && (
                                            <td className="table-cell">
                                                <select
                                                    className="input text-xs py-1 px-2 w-36"
                                                    value={p.status}
                                                    onChange={e => updatePecaStatus(aeronave.codigo, p.id, e.target.value as StatusPeca)}
                                                >
                                                    <option value={StatusPeca.EM_PRODUCAO}>Em produção</option>
                                                    <option value={StatusPeca.EM_TRANSPORTE}>Em transporte</option>
                                                    <option value={StatusPeca.PRONTA}>Pronta</option>
                                                </select>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Etapas ── */}
            {tab === 'etapas' && (
                <div className="space-y-4 animate-fade-in">
                    {isEngenheiro && (
                        <button onClick={() => setModalEtapa(true)} className="btn-secondary flex items-center gap-2">
                            <Plus size={14} /> Adicionar etapa
                        </button>
                    )}
                    <div className="space-y-3">
                        {aeronave.etapas.length === 0 && (
                            <p className="text-muted-foreground text-sm">Nenhuma etapa cadastrada.</p>
                        )}
                        {aeronave.etapas.map((e, idx) => (
                            <div key={e.id} className="card flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                                        {idx + 1}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{e.nome}</p>
                                        <p className="text-xs text-muted-foreground">Prazo: {e.prazo}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <StatusEtapaBadge status={e.status} />
                                    {isEngenheiro && e.status !== StatusEtapa.CONCLUIDA && (
                                        <button
                                            onClick={() => avancarEtapa(aeronave.codigo, e.id)}
                                            className="btn-secondary text-xs py-1 px-2"
                                        >
                                            {e.status === StatusEtapa.PENDENTE ? 'Iniciar' : 'Finalizar'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Funcionários ── */}
            {tab === 'funcionarios' && (
                <div className="space-y-3 animate-fade-in">
                    {funcDaAeronave.length === 0 && (
                        <p className="text-muted-foreground text-sm">Nenhum funcionário associado a etapas ainda.</p>
                    )}
                    {funcDaAeronave.map(f => (
                        <div key={f.id} className="card flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                {f.nome[0]}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">{f.nome}</p>
                                <p className="text-xs text-muted-foreground">{f.email}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{f.nivelPermissao}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Testes ── */}
            {tab === 'testes' && (
                <div className="space-y-4 animate-fade-in">
                    {isEngenheiro && (
                        <button onClick={() => setModalTeste(true)} className="btn-secondary flex items-center gap-2">
                            <Plus size={14} /> Registrar teste
                        </button>
                    )}
                    <div className="card p-0 overflow-hidden">
                        <table className="w-full">
                            <thead className="border-b border-border">
                                <tr>
                                    {['Tipo', 'Resultado', 'Data'].map(h => (
                                        <th key={h} className="table-header text-left py-3 px-4">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {aeronave.testes.length === 0 ? (
                                    <tr><td colSpan={3} className="table-cell text-center text-muted-foreground py-8">Nenhum teste registrado.</td></tr>
                                ) : aeronave.testes.map(t => (
                                    <tr key={t.id} className="table-row">
                                        <td className="table-cell font-medium">{t.tipo}</td>
                                        <td className="table-cell"><ResultadoBadge resultado={t.resultado} /></td>
                                        <td className="table-cell text-xs text-muted-foreground">{t.data}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Modais ── */}
            <Modal open={modalPeca} onClose={() => setModalPeca(false)} title="Adicionar peça">
                <div className="flex flex-col gap-4">
                    {[
                        { label: 'Nome', key: 'nome', placeholder: 'Asa Principal' },
                        { label: 'Fornecedor', key: 'fornecedor', placeholder: 'Embraer' },
                    ].map(({ label, key, placeholder }) => (
                        <div key={key}>
                            <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">{label}</label>
                            <input className="input" placeholder={placeholder}
                                value={(formPeca as Record<string, string>)[key]}
                                onChange={e => setFormPeca(p => ({ ...p, [key]: e.target.value }))} />
                        </div>
                    ))}
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Tipo</label>
                        <select className="input" value={formPeca.tipo} onChange={e => setFormPeca(p => ({ ...p, tipo: e.target.value as TipoPeca }))}>
                            <option value={TipoPeca.NACIONAL}>Nacional</option>
                            <option value={TipoPeca.IMPORTADA}>Importada</option>
                        </select>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button onClick={() => {
                            addPeca(aeronave.codigo, { id: `P${Date.now()}`, ...formPeca })
                            setModalPeca(false)
                        }} className="btn-primary flex-1">Adicionar</button>
                        <button onClick={() => setModalPeca(false)} className="btn-secondary flex-1">Cancelar</button>
                    </div>
                </div>
            </Modal>

            <Modal open={modalEtapa} onClose={() => setModalEtapa(false)} title="Adicionar etapa">
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Nome</label>
                        <input className="input" placeholder="Montagem da Fuselagem"
                            value={formEtapa.nome} onChange={e => setFormEtapa(p => ({ ...p, nome: e.target.value }))} />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Prazo</label>
                        <input type="date" className="input" value={formEtapa.prazo} onChange={e => setFormEtapa(p => ({ ...p, prazo: e.target.value }))} />
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button onClick={() => {
                            addEtapa(aeronave.codigo, { id: `E${Date.now()}`, ...formEtapa, status: StatusEtapa.PENDENTE, funcionarios: [] })
                            setModalEtapa(false)
                        }} className="btn-primary flex-1">Adicionar</button>
                        <button onClick={() => setModalEtapa(false)} className="btn-secondary flex-1">Cancelar</button>
                    </div>
                </div>
            </Modal>

            <Modal open={modalTeste} onClose={() => setModalTeste(false)} title="Registrar teste">
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Tipo</label>
                        <select className="input" value={formTeste.tipo} onChange={e => setFormTeste(p => ({ ...p, tipo: e.target.value as TipoTeste }))}>
                            <option value={TipoTeste.ELETRICO}>Elétrico</option>
                            <option value={TipoTeste.HIDRAULICO}>Hidráulico</option>
                            <option value={TipoTeste.AERODINAMICO}>Aerodinâmico</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Resultado</label>
                        <select className="input" value={formTeste.resultado} onChange={e => setFormTeste(p => ({ ...p, resultado: e.target.value as ResultadoTeste }))}>
                            <option value={ResultadoTeste.APROVADO}>Aprovado</option>
                            <option value={ResultadoTeste.REPROVADO}>Reprovado</option>
                        </select>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button onClick={() => {
                            addTeste(aeronave.codigo, { id: `T${Date.now()}`, ...formTeste, data: new Date().toISOString().slice(0, 10) })
                            setModalTeste(false)
                        }} className="btn-primary flex-1">Registrar</button>
                        <button onClick={() => setModalTeste(false)} className="btn-secondary flex-1">Cancelar</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}