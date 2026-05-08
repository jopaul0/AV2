import { MessageCircle, Mail, FolderGit2, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const FAQ = [
    { q: 'Como faço login no sistema?', a: 'Use o usuário e senha fornecidos pelo seu administrador. Para demonstração, use "gerson" / "1234" com nível Administrador.' },
    { q: 'Não consigo iniciar uma etapa. Por quê?', a: 'O sistema permite apenas uma etapa em andamento por aeronave. Se já existe uma etapa com status "Em andamento", finalize-a antes de iniciar outra.' },
    { q: 'Posso exportar o relatório de entrega?', a: 'Sim. Na página de Relatórios, selecione uma aeronave e use os botões "⬇ TXT" para exportar como arquivo de texto ou "Imprimir" para imprimir diretamente.' },
    { q: 'Quem pode criar ou remover funcionários?', a: 'Somente usuários com nível de acesso Administrador podem criar, editar ou remover funcionários.' },
    { q: 'O sistema salva dados permanentemente?', a: 'Nesta versão de protótipo, os dados são mantidos em memória durante a sessão. Ao recarregar a página, os dados retornam ao estado inicial de demonstração.' },
    { q: 'Como atualizo o status de uma peça?', a: 'Na aba "Peças" de uma aeronave, engenheiros e administradores podem selecionar o novo status diretamente no dropdown da coluna "Ação".' },
]

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border border-border rounded-lg overflow-hidden">
            <button onClick={() => setOpen(p => !p)}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
                {q}
                {open ? <ChevronUp size={15} className="text-muted-foreground shrink-0" /> : <ChevronDown size={15} className="text-muted-foreground shrink-0" />}
            </button>
            {open && <div className="px-4 pb-3 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">{a}</div>}
        </div>
    )
}

export function SuportePage() {
    return (
        <div className="space-y-10 animate-fade-in max-w-3xl mx-auto">
            <div>
                <h1 className="section-title">Suporte</h1>
                <p className="section-subtitle mt-1">Encontre respostas rápidas ou entre em contato com nossa equipe.</p>
            </div>

            {/* Canais */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { icon: Mail, title: 'E-mail', desc: 'suporte@aerocode.com.br', sub: 'Resposta em até 24h' },
                    { icon: FolderGit2, title: 'GitHub', desc: 'github.com/jopaul0/AV2', sub: 'Issues e pull requests' },
                    { icon: Clock, title: 'Horário', desc: 'Seg–Sex, 08h–18h', sub: 'Horário de Brasília' },
                ].map(({ icon: Icon, title, desc, sub }) => (
                    <div key={title} className="card text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                            <Icon size={18} className="text-primary" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">{title}</p>
                        <p className="text-xs text-primary">{desc}</p>
                        <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                ))}
            </div>

            {/* FAQ */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                    <MessageCircle size={16} className="text-primary" />
                    <h2 className="text-base font-semibold text-foreground">Perguntas frequentes</h2>
                </div>
                {FAQ.map(item => <FAQItem key={item.q} {...item} />)}
            </div>

            {/* Contato */}
            <div className="card space-y-4">
                <h2 className="text-base font-semibold text-foreground">Enviar mensagem</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Nome</label>
                        <input className="input" placeholder="Seu nome" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">E-mail</label>
                        <input className="input" placeholder="seu@email.com" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">Mensagem</label>
                    <textarea className="input min-h-24 resize-none" placeholder="Descreva sua dúvida ou problema..." />
                </div>
                <button className="btn-primary">Enviar mensagem</button>
            </div>
        </div>
    )
}