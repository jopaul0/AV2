import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Eye } from 'lucide-react'
import { useAeronaves } from '../hooks/useAeronaves'
import { useAuth } from '../hooks/useAuth'
import { StatusEtapaBadge, TipoAeronaveBadge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { TipoAeronave } from '../types/enums/TipoAeronave'
import { StatusEtapa } from '../types/enums/StatusEtapa'
import type { Aeronave } from '../types/models/Aeronave'

function getEtapaAtual(a: Aeronave) {
  return a.etapas.find(e => e.status === StatusEtapa.ANDAMENTO)
    || a.etapas.find(e => e.status === StatusEtapa.PENDENTE)
    || a.etapas[a.etapas.length - 1]
}

export function AeronavesPage() {
  const { aeronaves, addAeronave } = useAeronaves()
  const { isEngenheiro } = useAuth()

  const [search, setSearch]   = useState('')
  const [tipoFiltro, setTipo] = useState<TipoAeronave | ''>('')
  const [modalOpen, setModal] = useState(false)

  // Form nova aeronave
  const [form, setForm] = useState({
    codigo: '', modelo: '', tipo: TipoAeronave.COMERCIAL,
    capacidade: '', alcance: '', cliente: '',
  })
  const [formError, setFormError] = useState('')

  const filtered = aeronaves.filter(a => {
    const q = search.toLowerCase()
    const matchQ = a.codigo.toLowerCase().includes(q) || a.modelo.toLowerCase().includes(q)
    const matchT = !tipoFiltro || a.tipo === tipoFiltro
    return matchQ && matchT
  })

  const handleAdd = () => {
    if (!form.codigo || !form.modelo) { setFormError('Código e modelo são obrigatórios.'); return }
    if (aeronaves.find(a => a.codigo === form.codigo)) { setFormError('Código já existe.'); return }
    addAeronave({
      codigo:     form.codigo,
      modelo:     form.modelo,
      tipo:       form.tipo,
      capacidade: Number(form.capacidade),
      alcance:    Number(form.alcance),
      cliente:    form.cliente,
      pecas:      [],
      etapas:     [],
      testes:     [],
    })
    setModal(false)
    setForm({ codigo: '', modelo: '', tipo: TipoAeronave.COMERCIAL, capacidade: '', alcance: '', cliente: '' })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Aeronaves</h1>
          <p className="section-subtitle mt-1">{aeronaves.length} aeronaves cadastradas</p>
        </div>
        {isEngenheiro && (
          <button onClick={() => setModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={15} /> Nova aeronave
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="input pl-9"
            placeholder="Buscar por código ou modelo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input w-44"
          value={tipoFiltro}
          onChange={e => setTipo(e.target.value as TipoAeronave | '')}
        >
          <option value="">Todos os tipos</option>
          <option value={TipoAeronave.COMERCIAL}>Comercial</option>
          <option value={TipoAeronave.MILITAR}>Militar</option>
        </select>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr>
              {['Código', 'Modelo', 'Tipo', 'Capacidade', 'Etapa atual', 'Situação', 'Detalhes'].map(h => (
                <th key={h} className="table-header text-left py-3 px-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="table-cell text-center text-muted-foreground py-10">
                  Nenhuma aeronave encontrada.
                </td>
              </tr>
            ) : filtered.map(a => {
              const etapa = getEtapaAtual(a)
              return (
                <tr key={a.codigo} className="table-row">
                  <td className="table-cell font-medium text-primary">{a.codigo}</td>
                  <td className="table-cell">{a.modelo}</td>
                  <td className="table-cell"><TipoAeronaveBadge tipo={a.tipo} /></td>
                  <td className="table-cell">{a.capacidade} pax</td>
                  <td className="table-cell text-xs text-muted-foreground">{etapa?.nome || '—'}</td>
                  <td className="table-cell">
                    {etapa ? <StatusEtapaBadge status={etapa.status} /> : <span className="text-xs text-muted-foreground">—</span>}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <Link to={`/aeronaves/${a.codigo}`} className="btn-ghost p-1.5" title="Ver detalhes">
                        <Eye size={14} />
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Modal nova aeronave */}
      <Modal open={modalOpen} onClose={() => setModal(false)} title="Nova aeronave">
        <div className="flex flex-col gap-4">
          {formError && <p className="text-xs text-destructive">{formError}</p>}
          {[
            { label: 'Código único', key: 'codigo', placeholder: 'ACR-001' },
            { label: 'Modelo', key: 'modelo', placeholder: 'NAVY-A' },
            { label: 'Capacidade (pax)', key: 'capacidade', placeholder: '189' },
            { label: 'Alcance (km)', key: 'alcance', placeholder: '6000' },
            { label: 'Cliente', key: 'cliente', placeholder: 'Nome do cliente' },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">{label}</label>
              <input
                className="input"
                placeholder={placeholder}
                value={(form as Record<string, string>)[key]}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Tipo</label>
            <select
              className="input"
              value={form.tipo}
              onChange={e => setForm(p => ({ ...p, tipo: e.target.value as TipoAeronave }))}
            >
              <option value={TipoAeronave.COMERCIAL}>Comercial</option>
              <option value={TipoAeronave.MILITAR}>Militar</option>
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleAdd} className="btn-primary flex-1">Cadastrar</button>
            <button onClick={() => setModal(false)} className="btn-secondary flex-1">Cancelar</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}