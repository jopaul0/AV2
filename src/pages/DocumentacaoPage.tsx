import { BookOpen, Terminal, Database, Lock, LayoutDashboard, ChevronRight } from 'lucide-react'

const sections = [
    {
        icon: LayoutDashboard,
        title: 'Visão geral',
        id: 'overview',
        content: `O Aerocode é uma SPA (Single Page Application) desenvolvida em React + TypeScript, utilizando Vite como bundler e Tailwind CSS para estilização. O sistema gerencia o ciclo completo de produção de aeronaves, abrangendo cadastro de aeronaves, peças, etapas de produção, funcionários, testes e relatórios.`,
    },
    {
        icon: Terminal,
        title: 'Primeiros passos',
        id: 'getting-started',
        content: `Para rodar o projeto localmente:\n\n1. Clone o repositório: git clone https://github.com/jopaul0/AV2\n2. Instale as dependências: npm install\n3. Inicie o servidor de desenvolvimento: npm run dev\n4. Para build de produção: npm run build\n\nO sistema roda em Windows 10+, Ubuntu 24.04+ e distribuições derivadas do Ubuntu.`,
    },
    {
        icon: Lock,
        title: 'Autenticação',
        id: 'auth',
        content: `O sistema utiliza autenticação baseada em contexto React (sem backend). Os níveis de acesso são:\n\n• Administrador — acesso total: gerencia funcionários, aeronaves, testes e relatórios.\n• Engenheiro — gerencia aeronaves, peças, etapas e testes.\n• Operador — acesso de consulta e atualização de status de peças.\n\nCredenciais de demonstração: usuário "gerson" / senha "1234" (Admin).`,
    },
    {
        icon: Database,
        title: 'Entidades do sistema',
        id: 'entities',
        content: `As principais entidades são:\n\n• Aeronave — código único, modelo, tipo (Comercial/Militar), capacidade, alcance, cliente.\n• Peça — nome, tipo (Nacional/Importada), fornecedor, status (Em produção / Em transporte / Pronta).\n• Etapa — nome, prazo, status (Pendente / Em andamento / Concluída). Regra: apenas 1 etapa em andamento por vez.\n• Funcionário — nome, e-mail, telefone, endereço, usuário, nível de permissão.\n• Teste — tipo (Elétrico / Hidráulico / Aerodinâmico), resultado (Aprovado / Reprovado).\n• Relatório — gerado por aeronave, exportável em TXT ou imprimível.`,
    },
    {
        icon: BookOpen,
        title: 'Regras de negócio',
        id: 'rules',
        content: `Regras principais implementadas:\n\n1. Código de aeronave único — não é possível cadastrar duas aeronaves com o mesmo código.\n2. Sequência de etapas — apenas uma etapa pode estar "Em andamento" por aeronave. Para iniciar a próxima, a atual deve ser finalizada.\n3. Controle de acesso — operações destrutivas (criar/editar/deletar funcionários) são exclusivas do perfil Administrador.\n4. Relatório de entrega — gerado com todas as informações da aeronave: etapas, peças e resultados de testes.`,
    },
]

export function DocumentacaoPage() {
    return (
        <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
            <div className="space-y-2">
                <h1 className="section-title">Documentação</h1>
                <p className="section-subtitle">Guia completo do sistema Aerocode.</p>
            </div>

            <div className="card space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Nesta página</p>
                {sections.map(s => (
                    <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                        <ChevronRight size={13} /> {s.title}
                    </a>
                ))}
            </div>

            {sections.map(({ icon: Icon, title, id, content }) => (
                <div key={id} id={id} className="card space-y-3 scroll-mt-20">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon size={16} className="text-primary" />
                        </div>
                        <h2 className="text-base font-semibold text-foreground">{title}</h2>
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {content}
                    </div>
                </div>
            ))}
        </div>
    )
}