import { useState } from 'react'
import { Plus, Pencil, Trash2, Mail, Phone, ShieldAlert } from 'lucide-react'
import { NivelBadge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { useFuncionarios } from '../hooks/useFuncionarios'
import { useAuth } from '../hooks/useAuth'
import { NivelPermissao } from '../types/enums/NivelPermissao'
import type { Funcionario } from '../types/models/Funcionario'

const EMPTY_FORM = {
    nome: '', email: '', telefone: '', endereco: '',
    usuario: '', nivelPermissao: NivelPermissao.OPERADOR,
}

export function FuncionariosPage() {
    const { funcionarios, addFuncionario, updateFuncionario, deleteFuncionario } = useFuncionarios()
    const { isAdmin, user } = useAuth()

    const [modalOpen, setModalOpen] = useState(false)
    const [editTarget, setEditTarget] = useState<Funcionario | null>(null)
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
    const [form, setForm] = useState({ ...EMPTY_FORM })
    const [error, setError] = useState('')

    const openCreate = () => {
        setEditTarget(null)
        setForm({ ...EMPTY_FORM })
        setError('')
        setModalOpen(true)
    }

    const openEdit = (f: Funcionario) => {
        setEditTarget(f)
        setForm({
            nome: f.nome, email: f.email, telefone: f.telefone,
            endereco: f.endereco, usuario: f.usuario, nivelPermissao: f.nivelPermissao,
        })
        setError('')
        setModalOpen(true)
    }

    const handleSave = () => {
        if (!form.nome.trim() || !form.usuario.trim() || !form.email.trim()) {
            setError('Nome, usuário e e-mail são obrigatórios.')
            return
        }
        const duplicate = funcionarios.find(f =>
            f.usuario === form.usuario.trim() && f.id !== editTarget?.id
        )
        if (duplicate) { setError('Esse nome de usuário já está em uso.'); return }

        if (editTarget) {
            updateFuncionario(editTarget.id, { ...form })
        } else {
            addFuncionario({
                id: `F${Date.now()}`,
                ...form,
                nome: form.nome.trim(),
                usuario: form.usuario.trim(),
                email: form.email.trim(),
            })
        }
        setModalOpen(false)
    }

    const handleDelete = (id: string) => {
        if (id === user?.id) { setConfirmDelete(null); return }
        deleteFuncionario(id)
        setConfirmDelete(null)
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="section-title">Funcionários</h1>
                    <p className="section-subtitle mt-1">{funcionarios.length} funcionários cadastrados</p>
                </div>
                {isAdmin && (
                    <button onClick={openCreate} className="btn-primary flex items-center gap-2">
                        <Plus size={15} /> Novo funcionário
                    </button>
                )}
            </div>

            {!isAdmin && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted border border-border rounded-md px-3 py-2">
                    <ShieldAlert size={14} />
                    Somente administradores podem criar, editar ou remover funcionários.
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
                {funcionarios.map(f => (
                    <div key={f.id} className="card hover:border-border/80 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {f.nome[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">{f.nome}</p>
                                <p className="text-xs text-muted-foreground">@{f.usuario}</p>
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

                        {/* Ações (admin only) */}
                        {isAdmin && (
                            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                                <button onClick={() => openEdit(f)} className="btn-ghost flex items-center gap-1 text-xs">
                                    <Pencil size={12} /> Editar
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(f.id)}
                                    disabled={f.id === user?.id}
                                    className="btn-ghost flex items-center gap-1 text-xs text-destructive hover:bg-destructive/10 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <Trash2 size={12} /> Remover
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar funcionário' : 'Novo funcionário'}>
                <div className="flex flex-col gap-4">
                    {error && (
                        <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded px-3 py-2">{error}</p>
                    )}
                    {[
                        { label: 'Nome completo', key: 'nome', placeholder: 'Ana Souza' },
                        { label: 'E-mail', key: 'email', placeholder: 'ana@aerocode.com.br' },
                        { label: 'Usuário', key: 'usuario', placeholder: 'ana.souza' },
                        { label: 'Telefone', key: 'telefone', placeholder: '(11) 99999-0000' },
                        { label: 'Endereço', key: 'endereco', placeholder: 'Rua das Flores, 250 – SP' },
                    ].map(({ label, key, placeholder }) => (
                        <div key={key}>
                            <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">{label}</label>
                            <input className="input" placeholder={placeholder}
                                value={(form as Record<string, string>)[key]}
                                onChange={e => { setError(''); setForm(p => ({ ...p, [key]: e.target.value })) }} />
                        </div>
                    ))}
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Nível de acesso</label>
                        <select className="input" value={form.nivelPermissao}
                            onChange={e => setForm(p => ({ ...p, nivelPermissao: e.target.value as NivelPermissao }))}>
                            <option value={NivelPermissao.ADMINISTRADOR}>Administrador</option>
                            <option value={NivelPermissao.ENGENHEIRO}>Engenheiro</option>
                            <option value={NivelPermissao.OPERADOR}>Operador</option>
                        </select>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button onClick={handleSave} className="btn-primary flex-1">
                            {editTarget ? 'Salvar alterações' : 'Cadastrar'}
                        </button>
                        <button onClick={() => setModalOpen(false)} className="btn-secondary flex-1">Cancelar</button>
                    </div>
                </div>
            </Modal>

            <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirmar exclusão" size="sm">
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-foreground">
                        Tem certeza que deseja remover este funcionário? Esta ação não pode ser desfeita.
                    </p>
                    <div className="flex gap-2">
                        <button onClick={() => handleDelete(confirmDelete!)} className="btn-danger flex-1">Remover</button>
                        <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1">Cancelar</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}